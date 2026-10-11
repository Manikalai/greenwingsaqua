# Green Wings Aqua — Website

Public website for **Green Wings Aqua Sales and Service** (Sivaganga, Tamil Nadu),
live at https://greenwingsaqua.com.

Built with [Astro](https://astro.build) and React, styled with Tailwind CSS. Pages
are plain, fast HTML; only the product filter and the enquiry form run React.

## Structure

```
src/pages/            index, products, services, amc, contact  (URLs stay /products.html etc.)
src/data/site.ts      phone numbers, address, social links — change them here once
src/data/products.ts  the catalogue; add a product here and drop its photo in src/assets/products
src/data/services.ts  services and the AMC "how it works" steps
src/components/       header, footer, waves, product catalogue, enquiry form
public/               CNAME, icons, og-image, robots.txt, sitemap.xml
```

## Run locally

    npm install
    npm run dev       # http://localhost:4321
    npm run build     # static site into dist/

## Deploy

Every push to `main` builds and publishes through GitHub Actions
(`.github/workflows/deploy.yml`). One-time setting: **Settings → Pages → Source →
GitHub Actions**.

## Enquiries

The contact form opens WhatsApp with the message ready **and** saves the enquiry
as a lead in the staff dashboard (`submit_enquiry` in the greenwings-app database,
migration 018). The key in `EnquiryForm.tsx` is the public anon key and can do
nothing but submit one enquiry.

## AMC prices

Not published yet — each plan shows "Price on request". Set `price` on a plan in
`src/pages/amc.astro` (e.g. `price: '₹1,999'`) to show it.
