# Demo Hardware Co. (githzweb service demos)

A complete website for a **made-up** hardware supplier, built by [githzweb](https://githzweb.netlify.app) so business owners can click through exactly what each service delivers. The company, products, brands and prices are invented; the website and tools are real.

**Live:** https://demo-hardware-githzweb.pages.dev (not indexed by Google, shared by link only)

## The demos

| githzweb service | Demo |
|---|---|
| Catalogue website | [The catalogue](https://demo-hardware-githzweb.pages.dev/): 101 products in 6 collections, instant search, filters, product pages with "Ask on WhatsApp", edited in Sanity Studio |
| Automation | [Tools](https://demo-hardware-githzweb.pages.dev/tools): Excel → catalogue importer (SheetJS), quote generator with printable quotes, a rule-based FAQ assistant (English + Malay), and a printable catalogue that updates itself |
| Website move / rebuild | [Before & after](https://demo-hardware-githzweb.pages.dev/rebuild): a deliberately old "before" site next to the rebuild, with real Lighthouse numbers (performance 54 → 95, page weight 13.3 MB → 329 KB) |
| Google setup | [Sample SEO audit](https://demo-hardware-githzweb.pages.dev/seo-report): findings measured with Lighthouse |
| Monthly care | [Sample care report](https://demo-hardware-githzweb.pages.dev/care-report): live product stats from Sanity, example figures clearly labelled |

Every WhatsApp button on the demo goes to githzweb, so the demo doubles as a way to get in touch.

## Stack
Next.js 16 (App Router, static export) · TypeScript · Tailwind CSS 4 · Sanity (free plan, Studio at `/studio`) · Cloudflare Pages (free). Publishing in Studio triggers a rebuild through a Sanity webhook and a Cloudflare deploy hook. Everything runs on free plans with no paid AI APIs: tools run in the browser.

## Run locally
```bash
npm install
npm run dev   # http://localhost:3200
```
You'll need your own Sanity project ID in `.env.local` (see `.env.example`).

---
Built by [Githan Raj](https://www.linkedin.com/in/githan-raj-7b92b62ba/) · [githzweb](https://github.com/githzweb)
