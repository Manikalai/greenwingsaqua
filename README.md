# Green Wings Aqua — Website

Public website for **Green Wings Aqua Sales and Service** (Sivaganga, Tamil Nadu). Plain HTML/CSS/JS — no build step, no framework, no hosting cost.

## Structure

```
index.html      Home
services.html   Services (sales, install, repair, filters, AMC, reminders)
amc.html        AMC plan pricing (placeholder — needs confirmed pricing)
contact.html    Contact info, map, WhatsApp enquiry form
css/style.css   All styling
js/main.js      Mobile nav toggle + contact-form → WhatsApp handoff
```

The contact form has no backend — on submit it opens WhatsApp with a pre-filled message to `9944560234`. Zero cost, works immediately.

## Run locally

No build tools needed. Open `index.html` directly in a browser, or serve it:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy for free

**Option A — GitHub Pages**
1. Push this folder to a GitHub repo.
2. Repo Settings → Pages → Deploy from branch → `main` / root.
3. Add a `CNAME` file at the repo root containing `greenwingsaqua.com`.
4. In GoDaddy DNS for `greenwingsaqua.com`, add:
   - `A` record `@` → GitHub Pages IPs (185.199.108.153, .109.153, .110.153, .111.153)
   - `CNAME` record `www` → `<your-github-username>.github.io`

**Option B — Cloudflare Pages**
1. Connect the GitHub repo in Cloudflare Pages, framework preset "None", no build command, output directory `/`.
2. Add `greenwingsaqua.com` as a custom domain in the Pages project and follow the DNS instructions it gives you.

Either option gives free HTTPS automatically.

## Outstanding content (from the original planning conversation)

Replace these placeholders once confirmed by the business owner:

- [ ] Exact working hours (currently a placeholder on `contact.html`)
- [ ] Purifier brands sold/serviced (noted on `services.html`)
- [ ] AMC plan names, pricing, and exact inclusions (all three plans on `amc.html` are placeholders)
- [ ] Service areas / localities within Sivagangai district (noted on `services.html`)
- [ ] Logo and photos (shop front, staff, completed work) — replace the "GW" text mark in the header with a real logo once available
- [ ] Website language — currently English only; add Tamil if needed
- [ ] Real Google Business Profile photos/reviews could be pulled in later

## Not in this phase

Per the phased plan, this covers **Phase 1 (public website) only**. Not included yet:
- Admin dashboard (customer/service/staff management)
- Technician PWA (job assignment, GPS check-in)
- Automated WhatsApp reminders (Meta Cloud API) / SMS fallback (Twilio)
- VPS hosting for the above (the static site above can run on free GitHub/Cloudflare Pages)

These require setting up a VPS, a Meta Business/WhatsApp Cloud API account, and connecting the existing Twilio account — build these once the website is live and those accounts are ready.
