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
  - `/` — Full homepage (hero, credibility, what we do, buyer pathways, featured diamonds, mastery, why choose us, heritage, innovation, enquiry CTA, footer)
  - `/diamonds` — Diamond inventory with filters and "Request Price" modals
  - `/jewellery` — Jewellery collections grid
  - `/trade` — B2B trade partnership page
  - `/investment` — Investment-grade diamond page
  - `/journal` — Industry articles/blog listing
  - `/contact` — Contact form + info (Surat, India)
- **Content**: Sourced from FLX brand documents — Babu Vekariya story, IF→FL expertise, 47 years combined experience, KGK/Venus/Excell references
- **Target users**: Diamond traders, jewellery business owners, managing directors, investor-type buyers
