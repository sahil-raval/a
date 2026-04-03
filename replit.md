# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Artifacts

### FLX Diamond Website (`artifacts/flx-diamond`)
- **Type**: React + Vite (presentation-first, no backend)
- **Preview path**: `/`
- **Purpose**: Premium B2B diamond sourcing platform for FLXDIAMONDS
- **Brand**: Navy (#02274A) + Teal (#1CA9C9) + White — Cormorant Garamond serif headings + Inter body
- **Pages**:
  - `/` — Full homepage: CSS-animated ocean wave hero, interactive buyer qualifier (4 cards), IF→FL 3-step process, credibility strip, craft video, 3 service cards, featured inventory, trust pillars, Babu heritage section, ocean quote closing, inline enquiry form
  - `/diamonds` — Diamond inventory with filters and "Request Price" modals
  - `/jewellery` — Jewellery collections grid
  - `/trade` — B2B trade partnership page
  - `/investment` — Investment-grade diamond page with IF→FL section
  - `/about` — Babu Vekariya biography, brand story, B2B partnerships
  - `/journal` — Industry articles/blog listing
  - `/contact` — Contact form + info (Geelong, Victoria, Australia)
- **Hero**: CSS keyframe animated ocean waves (3 SVG layers with rolling animation), deep navy→teal gradient, floating light particles — no external video dependency
- **Qualifier Section**: 4 interactive buyer-type cards (IF upgrade / supply / invest / B2B partner) with AnimatePresence answer reveal + CTA to relevant page
- **Location**: Geelong, Victoria, Australia — never Surat, India
- **Contact**: help@flxdiamond.com | +91 91042 90971 | +91 99982 17496
- **Content**: Sourced from FLX brand documents — Babu Vekariya story, IF→FL expertise, 47 years combined experience, KGK/Venus/Excell references
- **Target users**: Diamond traders, jewellery business owners, managing directors, investor-type buyers
