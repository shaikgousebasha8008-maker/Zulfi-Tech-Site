export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/quote" && request.method === "POST") {
      return handleQuote(request, env);
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
