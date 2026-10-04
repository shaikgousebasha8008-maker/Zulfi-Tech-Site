// Branded ZulfiTech emails for the contact form. Table layout + inline styles so they render the same
// in Gmail, Outlook and Apple Mail (email clients ignore <style> sheets and block SVG).

const SITE = "https://zulfi-tech.com";
const WORDMARK_IMG = `${SITE}/email/wordmark.png`; // the name with the blade Z as its first letter, 600x130 transparent PNG
const C = { graphite: "#14171D", cream: "#F5F3EF", ink: "#20242B", muted: "#6B6F77", bronze: "#C17F3A", line: "#E4E1DA", tint: "#FBF7F1", tintLine: "#F0E3D2" };
const SERIF = "Georgia, 'Times New Roman', serif";
const SANS = "-apple-system, 'Segoe UI', Helvetica, Arial, sans-serif";

export const esc = (v) => String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const nowIST = () => new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit" });

const button = (label, href) =>
  `<a href="${href}" style="display:inline-block;padding:13px 28px;border-radius:8px;background:${C.bronze};color:${C.graphite};font-family:${SANS};font-size:15px;font-weight:700;text-decoration:none">${label}</a>`;

function layout({ title, preheader, body }) {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><meta name="color-scheme" content="light only" /><title>${esc(title)}</title></head>
<body style="margin:0;padding:0;background:${C.cream};-webkit-text-size-adjust:100%">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent">${esc(preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.cream};padding:32px 12px"><tr><td align="center">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;border-radius:18px;overflow:hidden;background:#ffffff;border:1px solid ${C.line}">
      <tr><td style="background:${C.graphite};padding:28px 24px 24px;text-align:center;border-bottom:3px solid ${C.bronze}">
        <img src="${WORDMARK_IMG}" width="240" height="52" alt="ZulfiTech" style="display:inline-block;border:0" />
        <div style="margin-top:4px;font-family:${SANS};font-size:12px;letter-spacing:2px;color:#A9ADB5">AI · CLOUD · AUTOMATION</div>
      </td></tr>
      <tr><td style="padding:30px 28px 10px;font-family:${SANS};color:${C.ink}">${body}</td></tr>
      <tr><td style="padding:18px 28px 26px;font-family:${SANS};font-size:12px;line-height:1.6;color:${C.muted};text-align:center;border-top:1px solid ${C.line}">
        ZulfiTech · AI &amp; SaaS · Cloud &amp; Bare-Metal · Websites &amp; Automation<br /><a href="${SITE}" style="color:${C.bronze};text-decoration:none">zulfi-tech.com</a>
      </td></tr>
    </table>
  </td></tr></table>
</body></html>`;
}

const row = (label, value) =>
  `<tr><td style="padding:9px 0;border-bottom:1px solid ${C.line};font-size:13px;color:${C.muted};width:120px;vertical-align:top">${label}</td><td style="padding:9px 0;border-bottom:1px solid ${C.line};font-size:14.5px;color:${C.ink}">${value}</td></tr>`;

/** To the ZulfiTech team: a new quote request, with one-click reply. */
export function leadEmail({ name, email, service, message, ip, country }) {
  const subjectName = String(name).replace(/[\r\n]+/g, " ").slice(0, 80);
  const replyHref = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(`Re: your ${service || "project"} request - ZulfiTech`)}`;
  const body = `
    <div style="display:inline-block;padding:5px 12px;border-radius:999px;background:${C.tint};border:1px solid ${C.tintLine};font-size:12px;font-weight:700;letter-spacing:0.5px;color:${C.bronze}">NEW QUOTE REQUEST</div>
    <h1 style="margin:14px 0 6px;font-family:${SERIF};font-size:24px;line-height:1.25;color:${C.graphite}">${esc(subjectName)} wants help with ${esc(service || "a project")}</h1>
    <p style="margin:0 0 18px;font-size:13px;color:${C.muted}">Received ${nowIST()} IST</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-family:${SANS}">
      ${row("Name", esc(name))}
      ${row("Email", `<a href="mailto:${esc(email)}" style="color:${C.bronze};text-decoration:none">${esc(email)}</a>`)}
      ${row("Interested in", esc(service || "Not specified"))}
      ${country ? row("Location", esc(country)) : ""}
    </table>
    <p style="margin:20px 0 8px;font-size:13px;font-weight:700;color:${C.muted};letter-spacing:0.5px">THEIR MESSAGE</p>
    <div style="padding:14px 16px;border-radius:12px;background:${C.tint};border:1px solid ${C.tintLine};font-size:15px;line-height:1.6;color:${C.ink};white-space:pre-wrap">${esc(message)}</div>
    <div style="text-align:center;margin:24px 0 8px">${button(`Reply to ${esc(String(name).split(/\s+/)[0])}`, replyHref)}</div>
    <p style="margin:12px 0 0;font-size:12px;color:${C.muted};text-align:center">Sent from the zulfi-tech.com contact form${ip ? ` · IP ${esc(ip)}` : ""}</p>`;
  return {
    subject: `New quote request: ${subjectName}${service ? ` · ${service}` : ""}`,
    html: layout({ title: "New quote request", preheader: `${subjectName}: ${String(message).slice(0, 90)}`, body }),
    text: `New quote request\n\nName: ${name}\nEmail: ${email}\nInterested in: ${service || "Not specified"}\n\n${message}\n`,
  };
}

/** To the customer: an acknowledgement. Never echoes their message, so the form can't be used to send spam. */
export function ackEmail({ firstName, service }) {
  const hi = firstName ? `Thank you, ${esc(firstName)}` : "Thank you";
  const body = `
    <h1 style="margin:0 0 12px;font-family:${SERIF};font-size:25px;line-height:1.25;color:${C.graphite};text-align:center">${hi}, we've received your request</h1>
    <p style="margin:0 0 18px;font-size:15px;line-height:1.65;color:${C.ink};text-align:center">
      An engineer at ZulfiTech is reviewing your ${service ? `<b>${esc(service)}</b> ` : ""}request and will reply personally with a clear plan and next steps.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.tint};border:1px solid ${C.tintLine};border-radius:12px">
      <tr><td style="padding:16px 18px;font-size:14px;line-height:1.7;color:${C.ink}">
        <b style="color:${C.graphite}">What happens next</b><br />
        1. We read your brief and may ask a few quick questions.<br />
        2. You get a plan, timeline and estimate.<br />
        3. We start when you're ready.
      </td></tr>
    </table>
    <p style="margin:20px 0 6px;font-size:14px;line-height:1.6;color:${C.ink};text-align:center">Something to add? Just reply to this email.</p>
    <div style="text-align:center;margin:18px 0 10px">${button("Explore ZulfiTech", SITE)}</div>`;
  return {
    subject: "We've received your request · ZulfiTech",
    html: layout({ title: "We've received your request", preheader: "An engineer is reviewing it and will reply personally.", body }),
    text: `${firstName ? `Thank you, ${firstName}` : "Thank you"} - we've received your request.\n\nAn engineer at ZulfiTech is reviewing it and will reply personally with a plan and next steps. Something to add? Just reply to this email.\n\nZulfiTech - ${SITE}\n`,
  };
}
