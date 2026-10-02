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
import { leadEmail, ackEmail } from "./emails.js";

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

  const { name, email, details } = body || {};

  if (!name || !email || !details) {
    return json({ error: "Name, email, and details are all required." }, 400);
  }
  if (String(name).length > 120 || String(email).length > 200 || String(details).length > 5000 || !isValidEmail(email)) {
    return json({ error: "Please check your name, email and details." }, 400);
  }

  // Contact.jsx sends "[Interested in: <service>]\n<message>".
  const m = /^\[Interested in: ([^\]\n]{1,60})\]\s*/.exec(String(details));
  const service = m ? m[1].trim() : "";
  const message = m ? String(details).slice(m[0].length) : String(details);
  const ip = request.headers.get("CF-Connecting-IP") || "";
  const country = request.cf?.country || "";
  const to = email.trim().toLowerCase();

  // Every request is kept in D1, and limits stop the form being used to flood inboxes.
  await ensureQuoteTable(env);
  const hourAgo = Date.now() - 3600_000;
  const dayAgo = Date.now() - 86400_000;
  const perIp = await env.DB.prepare("SELECT COUNT(*) AS n FROM quote_requests WHERE ip = ? AND created_at > ?").bind(ip, hourAgo).first();
  if (ip && perIp.n >= 3) {
    return json({ error: "You've sent a few requests already. Please wait an hour or email us directly." }, 429);
  }
  const acksToday = await env.DB.prepare("SELECT COUNT(*) AS n FROM quote_requests WHERE email = ? AND ack_sent = 1 AND created_at > ?").bind(to, dayAgo).first();

  const from = env.QUOTE_FROM || "ZulfiTech <no-reply@zulfi-tech.com>";
  const owner = env.TO_EMAIL || "shaikgousebasha8008@gmail.com";
  const lead = leadEmail({ name, email: to, service, message, ip, country });

  // Own-domain sender first; resend.dev only if the domain isn't verified for this key (owner copy only).
  let sent = await sendEmail(env, { from, to: owner, reply_to: to, ...lead });
  let domainOk = sent.ok;
  if (!sent.ok) sent = await sendEmail(env, { from: "ZulfiTech Website <onboarding@resend.dev>", to: owner, reply_to: to, ...lead });

  let ackSent = 0;
  if (domainOk && acksToday.n < 2) {
    const firstName = String(name).trim().split(/\s+/)[0].replace(/[^\p{L}\p{M}'-]/gu, "").slice(0, 30);
    const ack = await sendEmail(env, { from, to, reply_to: owner, ...ackEmail({ firstName, service }) });
    ackSent = ack.ok ? 1 : 0;
  }

  await env.DB.prepare(
    "INSERT INTO quote_requests (created_at, name, email, service, message, ip, country, owner_sent, ack_sent) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
  ).bind(Date.now(), String(name).slice(0, 120), to, service, message.slice(0, 5000), ip, country, sent.ok ? 1 : 0, ackSent).run();

  if (!sent.ok) {
    return json({ error: "Failed to send. Please try again or email us directly." }, 500);
  }
  return json({ success: true });
}

async function sendEmail(env, payload) {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) console.error("Resend error:", payload.from, res.status, await res.text());
    return { ok: res.ok };
  } catch (err) {
    console.error("Resend fetch failed:", err);
    return { ok: false };
  }
}

let quoteTableReady = false;
async function ensureQuoteTable(env) {
  if (quoteTableReady) return;
  await env.DB.batch([
    env.DB.prepare(`CREATE TABLE IF NOT EXISTS quote_requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT, created_at INTEGER NOT NULL, name TEXT, email TEXT, service TEXT,
      message TEXT, ip TEXT, country TEXT, owner_sent INTEGER DEFAULT 0, ack_sent INTEGER DEFAULT 0)`),
    env.DB.prepare("CREATE INDEX IF NOT EXISTS quote_requests_ip ON quote_requests (ip, created_at)"),
    env.DB.prepare("CREATE INDEX IF NOT EXISTS quote_requests_email ON quote_requests (email, created_at)"),
  ]);
  quoteTableReady = true;
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
