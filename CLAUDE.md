# githzweb demo: Demo Hardware Co.

A fictional hardware supplier's catalogue website that githzweb uses to demo all its services. Plan: `docs/PLAN.md` (kept local, not in git).

## Stack
Next.js 16 (App Router; it has breaking changes, so check `node_modules/next/dist/docs/` before using Next.js APIs) + TypeScript + Tailwind CSS 4 + Sanity (free plan, Studio at `/studio`) + Netlify (free plan).

## Commands
- `npm run dev` for the local site at http://localhost:3200
- `npm run build` before every commit
- `npm run lint`

## Rules
- It must always be obvious this is a demo: keep `DemoBanner` on every public page, and keep `noindex` (metadata robots, `X-Robots-Tag` header, `robots.ts`).
- All products, brands, model numbers and prices are invented. Never use real brand names, real businesses or GNS data.
- Every WhatsApp/quote button goes to githzweb via `demoWhatsApp()` in `lib/site.ts`.
- Free tiers only, and no paid AI APIs. Tools run in the browser or at build time.
- Public name is "Githan Raj", never the nickname.
- Secrets: `SANITY_WRITE_TOKEN` lives only in `.env.local` (git-ignored) and is used by scripts only. Never put it in code that runs in the browser or in a `NEXT_PUBLIC_` variable.
