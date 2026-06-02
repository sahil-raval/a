# APM Energy — Run Locally + Connect Sanity CMS

This guide takes you from a fresh download to a fully running site with Sanity CMS connected, in **~10 minutes**.

---

## 1. Prerequisites

Install on your machine:
- **Node.js 20.x or higher** → https://nodejs.org/
- **Yarn** (Classic) → `npm install --global yarn`
- A code editor (VS Code recommended)

Verify:
```bash
node --version    # should print v20.x or higher
yarn --version    # should print 1.22.x
```

---

## 2. Unzip and install

```bash
unzip apm-energy.zip
cd apm-energy/frontend
yarn install
```

This installs Next.js, React, Sanity, and all dependencies (~2 minutes).

---

## 3. Add your Sanity credentials

Open **`frontend/.env`** (already pre-filled with your project ID `4dso2tba`).

You still need to add a **write token**.

### Create an Administrator token (one-time use for seeding)

1. Go to https://www.sanity.io/manage/project/4dso2tba/api/tokens
2. Click **"Add API token"**
3. **Name**: `apm-energy-seed`
4. **Permissions**: select **`Administrator`** from the dropdown ⭐ (this is the key step — Editor on the new Growth Trial does not have `create` permission)
5. Click **Save** → copy the token (starts with `sk...`)

Paste it into `frontend/.env`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=4dso2tba
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-10-01
SANITY_API_READ_TOKEN=
SANITY_API_WRITE_TOKEN=sk...PASTE_YOUR_ADMIN_TOKEN_HERE...
NEXT_PUBLIC_SITE_URL=https://apmenergy.com.au
```

> **Important**: never commit `.env` to a public Git repo. It is already in `.gitignore`.

### Configure CORS for the Studio

So `/studio` can read/write to Sanity from your browser:

1. Go to https://www.sanity.io/manage/project/4dso2tba/api/cors
2. Click **"Add CORS origin"** → add `http://localhost:3000` → enable **Allow credentials** ✅
3. When you deploy, add your production URL the same way.

---

## 4. Seed the existing content into Sanity (one-shot)

This pushes every hardcoded line, heading, paragraph, service, testimonial, etc. into your Sanity dataset:

```bash
cd frontend
yarn seed
```

Expected output:
```
→ Seeding Sanity project 4dso2tba / dataset production
  ✓ Site Settings
  ✓ Navigation
  ✓ Footer
  ✓ Home Page
  ✓ About Page
  ✓ Contact Page
  ✓ How We Work Page
  ✓ Service: Solar and Battery
  ✓ Service: Maintenance
  ✓ Service: Engineering
  ✓ Service: Responsible Recycling
  ✓ Service: Project Management
  ✓ Service: EV Chargers
  ✓ Legal Pages

✅ Seed complete!
```

> **Re-running is safe** — documents use deterministic IDs (`siteSettings`, `homePage`, `service-solar-and-battery`, …) and `createOrReplace`. Run it again any time to reset content back to defaults.

---

## 5. (Optional but recommended) Demote the token

Now that seeding is done, you don't need Administrator access any more. For better security:

1. Go to https://www.sanity.io/manage/project/4dso2tba/api/tokens
2. **Delete** the `apm-energy-seed` token (🗑️ icon)
3. Create a new token named `apm-energy-read` with **`Viewer`** permission (or just leave the field empty — your dataset is public for reads by default)
4. Update `.env` → set `SANITY_API_READ_TOKEN=` to the new viewer token (or leave it blank)
5. Set `SANITY_API_WRITE_TOKEN=` blank — the app itself never writes; only the seed script does.

You can always create a new Administrator token if you want to re-seed.

---

## 6. Run the site

```bash
yarn start
```

This starts Next.js dev server on **http://localhost:3000**.

Open in your browser:
- **`http://localhost:3000`** → the website (now reading from Sanity)
- **`http://localhost:3000/studio`** → the Sanity Studio (your CMS)

Sign in to the Studio with the same Google/email you used for Sanity.

---

## 7. Edit content in Studio

In `/studio` you'll see:

| Document | What you can edit |
| --- | --- |
| **Site Settings** | Logo, company name, ABN, phone, email, address, social links, NETCC badge, default SEO |
| **Navigation** | Header links, Services mega-menu items, CTA button label/link |
| **Footer** | Description, link columns, copyright line |
| **Home Page** | Hero (badge, headlines, CTAs, chips), services intro, energy globe, features, testimonials, CTA banner, SEO |
| **About Page** | Hero, approach, "Who we are", bullet points, stats, CTA, SEO |
| **How We Work Page** | Hero, 9 process steps, business systems, complaints handling, NETCC section, SEO |
| **Contact Page** | Hero, contact block labels/descriptions, service dropdown options, success-popup copy, SEO |
| **Services** (collection) | 6 services — title, slug, icon, descriptions, image, per-service SEO |
| **Legal Pages** | Privacy Policy, Terms of Service (Portable Text bodies + SEO) |

After editing, click **"Publish"** (top-right). The change appears on the live site within **30 seconds** (Next.js revalidate window). For instant updates, restart the dev server.

---

## 8. Build for production

```bash
yarn build
yarn start:prod    # runs the production build on port 3000
```

Make sure to:
- Set `NEXT_PUBLIC_SITE_URL` to your production domain in `.env`
- Add the production domain to Sanity CORS origins
- Add the production domain to `allowedDevOrigins` in `next.config.mjs` (or remove that line for prod-only deploys)

---

## File reference

```
frontend/
├── .env                              ← your Sanity credentials
├── package.json                      ← yarn start, yarn seed, yarn build
├── next.config.mjs                   ← image domains, CORS dev origins
├── sanity.config.ts                  ← Studio config
├── sanity.cli.ts                     ← Sanity CLI config
├── scripts/
│   ├── seed-sanity.ts                ← one-shot content seeder
│   └── tsconfig.json
├── public/                           ← logo, favicons, hero video, NETCC badge
└── src/
    ├── app/
    │   ├── layout.tsx                ← root layout + default SEO
    │   ├── sitemap.ts                ← auto sitemap from Sanity
    │   ├── robots.ts                 ← auto robots.txt
    │   ├── (site)/                   ← public site pages
    │   │   ├── layout.tsx            ← nav + footer wrapper
    │   │   ├── page.tsx              ← Home (reads from Sanity)
    │   │   ├── about/
    │   │   ├── contact/
    │   │   ├── how-we-work/
    │   │   ├── services/             ← /services and /services/[slug]
    │   │   ├── privacy-policy/
    │   │   ├── terms-of-service/
    │   │   └── akshardham/
    │   └── studio/[[...tool]]/       ← /studio embedded Sanity Studio
    ├── components/                   ← all React components
    │   ├── navigation.tsx            ← server component (fetches from Sanity)
    │   ├── navigation-client.tsx     ← interactive nav
    │   ├── footer.tsx
    │   ├── logo.tsx
    │   ├── sections/                 ← hero, services-overview, globe, features, testimonials, etc.
    │   └── ui/                       ← shadcn primitives
    ├── sanity/
    │   ├── env.ts                    ← reads env vars
    │   ├── client.ts                 ← Sanity client + safe fetch wrapper
    │   ├── image.ts                  ← image URL builder
    │   ├── icons.ts                  ← lucide icon name → component map
    │   ├── fallbacks.ts              ← default content (used if Sanity empty)
    │   ├── queries.ts                ← GROQ queries + buildMetadata helpers
    │   ├── structure.ts              ← Studio sidebar
    │   └── schemas/                  ← all document & object schemas
    └── lib/
        └── utils.ts
```

---

## Troubleshooting

**Studio shows a spinner forever**
→ Make sure `NEXT_PUBLIC_SANITY_PROJECT_ID` is set in `.env` and you restarted the dev server.

**`yarn seed` fails with "create permission required"**
→ Your token is not Administrator. Re-create the token with `Administrator` permission (see Step 3).

**Site renders but content is the old hardcoded text**
→ This is the fallback system working as designed. Make sure `yarn seed` completed successfully, then visit `/studio` to confirm data is there. The site auto-revalidates every 30 seconds.

**Images don't load from Sanity**
→ If you upload images directly in Studio they come from `cdn.sanity.io`, which is already whitelisted in `next.config.mjs`.

**Want instant updates instead of 30s revalidate?**
→ In `src/sanity/client.ts`, change `next: { revalidate: 30 }` to `cache: "no-store"`. Slower but live.

---

## What was changed vs your original project

- All page content is now driven by Sanity, with the original copy retained as a fallback in `src/sanity/fallbacks.ts`
- Pages moved to `src/app/(site)/` to allow `/studio` to live outside the nav/footer layout
- New folder `src/sanity/` containing schemas, queries, client, fallbacks
- New file `sanity.config.ts` and `sanity.cli.ts` at project root
- New embedded studio at `src/app/studio/[[...tool]]/page.tsx`
- New SEO helpers: every page exports `generateMetadata`, plus `sitemap.ts` and `robots.ts`
- `next.config.mjs` extended with image remote patterns and `allowedDevOrigins`
- New `yarn seed` script and `yarn start:prod` script
- Components updated to accept Sanity data via props (Hero, Services Overview, Features, Testimonials, Energy Globe, Navigation, Footer, Logo)

**Nothing visual was changed.** The site looks identical to your original — only the data source moved to Sanity.
