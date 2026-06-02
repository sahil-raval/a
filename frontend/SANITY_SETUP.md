# Sanity CMS Setup Guide

This project is integrated with **Sanity CMS** for managing all website content and SEO.

The site continues to render with the original hardcoded copy until Sanity is connected — so there's nothing to break. Once you add your credentials and seed the dataset, Sanity values automatically take over.

---

## Step 1 — Create a Sanity Project (5 minutes)

1. Go to **<https://www.sanity.io/manage>** and sign up / sign in.
2. Click **"Create new project"**.
   - Name: `APM Energy` (or anything you like)
   - Choose the free plan.
3. After creation, copy the **Project ID** (looks like `abc1234d`).
4. The default **Dataset** is `production` — keep it.

## Step 2 — Create an API Token with WRITE access

1. Inside your project on sanity.io/manage → **API → Tokens**.
2. Click **"Add API token"**.
3. Name: `apm-energy-write` — permissions: **Editor** (or **Write**).
4. Copy the token. **Save it somewhere safe — it is shown only once.**

## Step 3 — Configure CORS for the Studio

Still in **sanity.io/manage → API → CORS Origins**, click **"Add CORS origin"** and add:

- `http://localhost:3000` (Allow credentials = ✅)
- Your production / preview URL (e.g. `https://headless-content-hub.preview.emergentagent.com`) (Allow credentials = ✅)
- `https://apmenergy.com.au` (when you go live)

## Step 4 — Fill in `.env`

Open **`/app/frontend/.env`** and fill in:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=abc1234d          # ← from Step 1
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-10-01
SANITY_API_READ_TOKEN=                          # leave empty (we use public published data)
SANITY_API_WRITE_TOKEN=skXXXXXXXXXXXXXXXXXXXXXX # ← from Step 2 — KEEP SECRET
NEXT_PUBLIC_SITE_URL=https://apmenergy.com.au
```

Then restart the frontend:

```bash
sudo supervisorctl restart frontend
```

## Step 5 — Seed the existing content into Sanity

Run the one-shot seed command. It uses the current hardcoded copy (every line, heading, paragraph, service entry, NETCC content, complaints process, contact info, testimonials, etc.) and pushes it into your Sanity dataset:

```bash
cd /app/frontend
yarn seed
```

You should see:

```
→ Seeding Sanity project xxxx / dataset production
  ✓ Site Settings
  ✓ Navigation
  ✓ Footer
  ✓ Home Page
  ✓ About Page
  ✓ Contact Page
  ✓ How We Work Page
  ✓ Service: Solar and Battery
  ✓ Service: Maintenance
  ...
✅ Seed complete!
```

> **Re-running is safe** — the script uses deterministic document IDs (`siteSettings`, `homePage`, `service-solar-and-battery`, …) and `createOrReplace`, so existing documents are simply overwritten on next run.

## Step 6 — Open the Studio

Visit **`/studio`** on your site (e.g. `https://your-site/studio`).

You'll be asked to log in with the same Sanity account. Once in, you'll see:

- **Site Settings** — logo, company name, contact info, social links, default SEO
- **Navigation** — header links + Services mega-menu
- **Footer** — link columns, description, copyright
- **Home Page** — hero, services overview, energy globe, features, testimonials, CTA
- **About Page** — hero, approach, "Who we are", stats, CTA
- **How We Work Page** — 9-step process, business systems, complaints handling, NETCC
- **Contact Page** — hero, contact blocks, service dropdown, success popup copy
- **Services** (collection of 6 services) — short/long descriptions, nav copy, images, per-service SEO
- **Legal Pages** — Privacy Policy & Terms of Service (Portable Text body)

Edit any field and click **"Publish"**. The change appears on the public site within **30 seconds** (revalidation window).

---

## SEO Features Available out-of-the-box

Every page exposes:

- **Meta Title** + **Meta Description** (per-page override or Site Settings default)
- **Keywords** (per-page or default)
- **Open Graph image** (per-page or default — recommended 1200×630)
- **Open Graph + Twitter Card metadata** generated automatically
- **`<link rel="canonical">`** for each page
- **`/sitemap.xml`** — auto-generated, includes all static pages + every Sanity service
- **`/robots.txt`** — auto-generated, links to the sitemap, blocks `/studio`
- **"Hide from search engines"** toggle on every page (per-page `noindex`)

The icon (`/icon.png`) and OG image (`/opengraph.jpg`) live in `/app/frontend/public/` — you can replace them at any time.

---

## How the Fallback System Works

The data layer in `src/sanity/queries.ts` always merges fetched Sanity data over a default fallback object (`src/sanity/fallbacks.ts`). This means:

- If **Sanity isn't configured** → site shows the original hardcoded content.
- If **Sanity is configured but a field is empty** → that field falls back to the default.
- If **Sanity returns a value** → it wins.

So you can edit one line in the CMS without worrying about other content disappearing.

---

## Where the code lives

| File | Purpose |
| --- | --- |
| `src/sanity/env.ts` | Reads env vars |
| `src/sanity/client.ts` | Sanity client + safe fetch wrapper |
| `src/sanity/image.ts` | Image URL builder |
| `src/sanity/icons.ts` | lucide-react icon name → component map |
| `src/sanity/fallbacks.ts` | Default content used when Sanity is empty |
| `src/sanity/queries.ts` | All GROQ queries + `generateMetadata` helpers |
| `src/sanity/schemas/` | All document & object schemas |
| `src/sanity/structure.ts` | Studio sidebar structure |
| `sanity.config.ts` | Studio configuration |
| `src/app/studio/[[...tool]]/page.tsx` | Embedded Studio route |
| `scripts/seed-sanity.ts` | One-shot content seeder |

## Adding a NEW service via the Studio

1. Open **/studio** → click **Services** in the sidebar.
2. Click the **➕** button.
3. Fill in title, slug (auto), icon name (e.g. `Sun`, `Wrench`, `Zap` — any lucide-react icon), short/long description, image (upload or paste an external URL).
4. Click **Publish**.

The service appears on the home page services grid, in the `/services` index, and in the navigation mega-menu — automatically.
