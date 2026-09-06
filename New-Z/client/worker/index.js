import {
  hashPassword,
  verifyPassword,
  parseCookies,
  sessionCookie,
  clearSessionCookie,
  createSession,
  getSessionUser,
  deleteSession,
} from "./auth.js";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/quote" && request.method === "POST") {
      return handleQuote(request, env);
    }
    if (url.pathname === "/api/auth/login" && request.method === "POST") {
      return handleLogin(request, env);
    }
    if (url.pathname === "/api/auth/logout" && request.method === "POST") {
      return handleLogout(request, env);
    }
    if (url.pathname === "/api/auth/me" && request.method === "GET") {
      return handleMe(request, env);
    }
    if (url.pathname === "/api/auth/register" && request.method === "POST") {
      return handleRegister(request, env);
    }

    // Everything else - serve the built React static assets
    return env.ASSETS.fetch(request);
  },
};

async function handleQuote(request, env) {
  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid request." }), { status: 400 });
  }

  const { name, email, details } = body;

  if (!name || !email || !details) {
    return new Response(JSON.stringify({ error: "Name, email, and details are all required." }), { status: 400 });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "ZulfiTech Website <onboarding@resend.dev>",
        to: env.TO_EMAIL || "shaikgousebasha8008@gmail.com",
        reply_to: email,
        subject: `Quote request from ${name}`,
        html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Details:</strong></p><p>${details.replace(/\n/g, "<br>")}</p>`,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Resend error:", errText);
      return new Response(JSON.stringify({ error: "Failed to send. Please try again or email us directly." }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Function error:", err);
    return new Response(JSON.stringify({ error: "Failed to send. Please try again or email us directly." }), { status: 500 });
  }
}

function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...headers },
  });
}

function isValidEmail(email) {
  return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function handleLogin(request, env) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  const { email, password } = body;
  if (!isValidEmail(email) || typeof password !== "string" || !password) {
    return json({ error: "Email and password are required." }, 400);
  }

  const user = await env.DB.prepare(
    "SELECT id, email, name, password_hash, password_salt FROM users WHERE email = ?"
  )
    .bind(email.toLowerCase())
    .first();

  if (!user) {
    return json({ error: "Invalid email or password." }, 401);
  }

  const valid = await verifyPassword(password, user.password_salt, user.password_hash);
  if (!valid) {
    return json({ error: "Invalid email or password." }, 401);
  }

  const sessionId = await createSession(env, user.id);
  return json(
    { success: true, user: { id: user.id, email: user.email, name: user.name } },
    200,
    { "Set-Cookie": sessionCookie(sessionId) }
  );
}

async function handleLogout(request, env) {
  const { session } = parseCookies(request);
  await deleteSession(env, session);
  return json({ success: true }, 200, { "Set-Cookie": clearSessionCookie() });
}

async function handleMe(request, env) {
  const { session } = parseCookies(request);
  const user = await getSessionUser(env, session);
  if (!user) return json({ error: "Not authenticated." }, 401);
  return json({ user });
}

// Admin-only: provisions a client account. Not exposed as a public signup form -
// call this yourself (e.g. via curl) when onboarding a new client.
async function handleRegister(request, env) {
  const adminSecret = request.headers.get("X-Admin-Secret");
  if (!env.ADMIN_SEED_SECRET || adminSecret !== env.ADMIN_SEED_SECRET) {
    return json({ error: "Not authorized." }, 401);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  const { email, password, name } = body;
  if (!isValidEmail(email) || typeof password !== "string" || password.length < 8) {
    return json({ error: "Valid email and a password of at least 8 characters are required." }, 400);
  }

  const existing = await env.DB.prepare("SELECT id FROM users WHERE email = ?").bind(email.toLowerCase()).first();
  if (existing) {
    return json({ error: "An account with that email already exists." }, 409);
  }

  const { hash, salt } = await hashPassword(password);
  await env.DB.prepare(
    "INSERT INTO users (email, password_hash, password_salt, name) VALUES (?, ?, ?, ?)"
  )
    .bind(email.toLowerCase(), hash, salt, name || null)
    .run();

  return json({ success: true });
}
