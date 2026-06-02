# APM Energy + Sanity CMS

This is the APM Energy website with **Sanity CMS** integrated for content management and SEO.

## Quick start

👉 **Open [`RUN_LOCALLY.md`](./RUN_LOCALLY.md)** — step-by-step guide to install, seed Sanity, and run the site.

For deeper detail on the CMS integration see [`SANITY_SETUP.md`](./SANITY_SETUP.md) (also inside `/frontend/`).

## TL;DR

```bash
cd frontend
yarn install
# 1) Edit .env and paste your Sanity Administrator token
yarn seed         # one-shot: pushes all current content into Sanity
yarn start        # http://localhost:3000  (site)
                  # http://localhost:3000/studio  (Sanity CMS)
```

Your Sanity Project ID `4dso2tba` is already pre-filled in `.env`.

The site continues to render its current content even if Sanity is unreachable — every component falls back to a built-in default. Once you seed and edit content in Studio, those values take over automatically (30-second revalidate window).
