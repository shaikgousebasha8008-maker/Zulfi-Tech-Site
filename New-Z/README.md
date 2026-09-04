# ZulfiTech Website — Node.js + React

A dynamic web application. Deployed via **Git-connected Cloudflare Pages**,
which is the reliable, fully-supported way to run Cloudflare Pages Functions
(the "Upload static files" direct-upload flow does NOT support Functions,
even via the legacy Pages workflow — confirmed by testing).

**No VPS needed.** Cloudflare hosts the static site AND runs the
`client/functions/api/quote.js` function as serverless compute automatically.

---

## Project structure

```
zulfitech-app/
  client/           React app (Vite) - THIS is what gets deployed to Cloudflare
    functions/      Cloudflare Pages Function (quote form -> email via Resend)
    public/         _redirects (so React Router paths work on Cloudflare)
    src/            Components, pages, styles
  server/           Optional alternative: traditional Express+Nodemailer backend,
                    only needed if you ever want to self-host on a VPS instead.
                    NOT used in the Cloudflare deployment - safe to ignore.
```

---

## Deploying via GitHub + Cloudflare Pages (recommended)

### 1. Push this project to GitHub

```bash
cd zulfitech-app
git init
git add .
git commit -m "Initial commit"
```

Create a new empty repository on github.com (no README/license, just empty),
then:

```bash
git remote add origin https://github.com/YOUR_USERNAME/zulfitech-site.git
git branch -M main
git push -u origin main
```

### 2. Connect it in Cloudflare Pages

1. Cloudflare dashboard → Workers & Pages → Create application → **Pages** tab → **Connect to Git**
2. Authorize GitHub, select your `zulfitech-site` repository
3. Build settings:
   - **Root directory**: `client` (important - this is a monorepo, the actual app lives in the client subfolder)
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
4. Click **Save and Deploy**

Cloudflare will automatically detect the `functions/` folder inside `client/`
and deploy it as a serverless function - no extra config needed for that part.

### 3. Add environment variables

In the project's **Settings → Environment variables**, add:
- `RESEND_API_KEY` = your API key from resend.com
- `TO_EMAIL` = `shaikgousebasha8008@gmail.com`

Redeploy if prompted.

### 4. Connect your domain

**Custom domains** tab → add `zulfi-tech.com`.

### 5. Every future update

Just `git push` to the `main` branch - Cloudflare automatically rebuilds and
redeploys within a minute or two. No manual zip/upload ever again.

---

## Before going live — fill in the placeholders

- **WhatsApp number**: in `client/src/components/Contact.jsx`, replace
  `WHATSAPP_NUMBER_HERE` with your number (country code, no + or spaces).
- **Tawk.to live chat**: sign up at tawk.to, get your embed code, add it to
  `client/src/components/Footer.jsx` (instructions already commented there).

---

## Local development

```bash
cd client
npm install
npm run dev
```
Opens on http://localhost:5173. Note: the `/api/quote` function won't work
in plain `npm run dev` mode since that's Cloudflare-specific - to test
functions locally, use `npx wrangler pages dev -- npm run dev` instead from
inside the `client` folder, which emulates Cloudflare's environment locally.

---

## Alternative: traditional VPS deployment (server/ folder)

If you ever want to move away from Cloudflare Functions to a traditional
always-on Node server instead, the `server/` folder has a complete
Express + Nodemailer backend ready to go - see the comments in
`server/server.js` and `.env.example`. Not needed for the Cloudflare path above.
