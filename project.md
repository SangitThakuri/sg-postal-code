# SGPostalCode.com — Project Reference

## Overview

**SGPostalCode.com** is a free Singapore postal code search directory built with Next.js. It covers 121,000+ unique postal codes and 141,000+ buildings across the entire island, serving as a fast, SEO-optimised alternative to SingPost's own lookup tool.

Live domain: `https://www.sgpostalcode.com`  
GitHub: `https://github.com/SangitThakuri/sg-postal-code`

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14.2.5 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3 |
| Maps | Leaflet + react-leaflet (client-side, dynamic import) |
| Search | Fuse.js (fuzzy search over in-memory dataset) |
| Data | 57 MB `buildings.json` (self-hosted copy of Singapore postal data) |
| Deployment | Vercel (via GitHub Actions workflow) |

---

## Project Structure

```
sgpostalcode/
├── public/
│   └── data/
│       └── buildings.json          # 141k building entries (~57 MB), downloaded at build time
├── scripts/
│   └── download-data.js            # Downloads buildings.json from GitHub source
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout: metadata, fonts, Header/Footer
│   │   ├── page.tsx                # Homepage: hero, districts, WebSite + Org JSON-LD
│   │   ├── manifest.ts             # PWA manifest (theme_color, icons, display)
│   │   ├── robots.ts               # robots.txt: allow all except /api/
│   │   ├── opengraph-image.tsx     # Dynamic OG image for the root route
│   │   ├── not-found.tsx           # Custom 404 page
│   │   ├── icon.svg                # Favicon (blue rounded rect + map pin)
│   │   ├── globals.css             # Base styles + Tailwind directives
│   │   │
│   │   ├── search/page.tsx         # Browse/search page; noindex when ?q= is present
│   │   ├── postal/[code]/
│   │   │   ├── page.tsx            # Individual postal code detail page (SSR)
│   │   │   └── opengraph-image.tsx # Dynamic per-code OG image (1200×630)
│   │   │
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── privacy-policy/page.tsx
│   │   ├── terms-of-service/page.tsx
│   │   ├── cookie-policy/page.tsx
│   │   └── disclaimer/page.tsx
│   │
│   │   ├── api/
│   │   │   ├── buildings/route.ts  # GET /api/buildings — streams full 57 MB dataset
│   │   │   └── search/route.ts     # GET /api/search?q= — JSON search results
│   │   │
│   │   ├── sitemap.xml/route.ts    # Master sitemapindex at /sitemap.xml
│   │   ├── sitemap-pages/route.ts  # Child sitemap: 8 static pages
│   │   ├── sitemap-index/route.ts  # 301 → /sitemap.xml (legacy redirect)
│   │   └── postal-sitemap/[page]/route.ts  # Child sitemaps: 40k codes/page (4 pages)
│   │
│   ├── components/
│   │   ├── Header.tsx              # Sticky header, mobile drawer, desktop nav
│   │   ├── Footer.tsx              # 4-col footer: brand, quick links, popular, legal
│   │   ├── SearchBar.tsx           # Controlled search input with router navigation
│   │   ├── PostalCard.tsx          # Card for search results (compact + full variants)
│   │   ├── MapView.tsx             # Leaflet map (dynamic import, client-side only)
│   │   ├── SgPinIcon.tsx           # Map pin SVG using fill-rule=evenodd (transparent hole)
│   │   └── CopyButton.tsx          # Clipboard copy with check animation ("use client")
│   │
│   └── lib/
│       ├── data.ts                 # All data access: getPostalGroup, searchBuildings, districts
│       └── types.ts                # TypeScript types: Building, SearchResult, etc.
│
├── .github/workflows/deploy.yml   # CI/CD: build + deploy to Vercel on push/PR/manual
└── project.md                     # This file
```

---

## Data Source

- **Origin:** `https://raw.githubusercontent.com/xkjyeah/singapore-postal-codes/refs/heads/master/buildings.json`
- **Local copy:** `public/data/buildings.json` (57 MB, ~141,726 entries)
- **Download script:** `scripts/download-data.js` — run automatically in `npm run build` and in CI
- **Self-hosted API:** `GET /api/buildings` — streams the full JSON with caching headers
- **Format:** Array of objects with fields: `SEARCHVAL`, `BLK_NO`, `ROAD_NAME`, `BUILDING`, `ADDRESS`, `POSTAL`, `X`, `Y`, `LATITUDE`, `LONGITUDE`, `LONGTITUDE`

---

## Key Features

### Postal Code Detail Pages (`/postal/[code]`)
- Per-page metadata: title, description, keywords, canonical URL
- JSON-LD structured data: `FAQPage`, `BreadcrumbList`, `Place`
- 12 dynamic FAQs generated from building data
- Prose "About" section for SEO content
- Hero card with copy buttons (postal code + full address)
- Address Details + Location Info cards
- Interactive Leaflet map
- Links to Google Maps, Apple Maps, OpenStreetMap
- 6 nearby postal codes
- SingPost delivery info card
- Dynamic OG image (1200×630) generated via `next/og`

### Search Page (`/search`)
- Fuse.js fuzzy search — searches by postal code, building name, road name, address
- 24 results per page with pagination
- Browse mode (no query): 12 popular areas + all 83 postal sectors
- `robots: noindex` injected when `?q=` is present to avoid thin-content indexing

### Homepage (`/`)
- `WebSite` + `SearchAction` JSON-LD → Google Sitelinks Searchbox eligibility
- `Organization` JSON-LD → brand entity disambiguation
- District browser (28 districts linking to search)

### Sitemap Architecture
```
/sitemap.xml          ← sitemapindex (master)
  /sitemap-pages      ← 8 static pages
  /postal-sitemap/1   ← postal codes 1–40,000
  /postal-sitemap/2   ← postal codes 40,001–80,000
  /postal-sitemap/3   ← postal codes 80,001–120,000
  /postal-sitemap/4   ← postal codes 120,001–end
```

---

## Local Development

```bash
# Install dependencies
npm install

# Download the buildings dataset (~57 MB)
npm run download-data

# Start dev server
npm run dev
# → http://localhost:3000
```

The `buildings.json` file is gitignored. It must be present before the dev server starts (the data layer reads it synchronously at startup).

---

## Deployment (Vercel via GitHub Actions)

### Triggers
- **Push to `main`** → production deploy
- **Pull request** → preview deploy
- **Manual** → `workflow_dispatch` (choose environment: production or preview)

### Required GitHub Secrets
| Secret | Where to get it |
|---|---|
| `VERCEL_TOKEN` | Vercel → Settings → Tokens |
| `VERCEL_ORG_ID` | `.vercel/project.json` after `vercel link` |
| `VERCEL_PROJECT_ID` | `.vercel/project.json` after `vercel link` |

### First-time Vercel setup
```bash
npm install -g vercel
vercel login
vercel link   # creates .vercel/project.json with org/project IDs
```

---

## SEO Checklist

- [x] Per-page `title`, `description`, `keywords` metadata
- [x] Canonical URLs on all pages
- [x] `robots.txt` (allows all, points to sitemap)
- [x] Sitemapindex with 121k+ postal code URLs
- [x] JSON-LD: `FAQPage`, `BreadcrumbList`, `Place` (postal pages)
- [x] JSON-LD: `WebSite` + `SearchAction`, `Organization` (homepage)
- [x] Dynamic OG images: site-wide (root) + per postal code
- [x] `lang="en-SG"` on `<html>`
- [x] OpenGraph + Twitter Card tags
- [x] PWA manifest (`theme_color`, `display: standalone`)
- [x] `noindex` on `/search?q=*` pages (thin content)
- [x] `llms.txt` for AI crawlers
- [ ] Google Search Console verified (needs GSC meta tag)
- [ ] Apple touch icon PNG (iOS requires 180×180 PNG, not SVG)

---

## Important Implementation Notes

### SgPinIcon transparent hole
`SgPinIcon.tsx` uses a compound SVG path with `fill-rule="evenodd"`. The inner circle subpath creates a transparent hole through the pin body — it does NOT use a hardcoded background color. This means the icon adapts correctly on any background (blue hero, dark footer, white card).

### CopyButton is "use client"
`CopyButton.tsx` uses `navigator.clipboard` and `useState`. It is a Client Component imported into server-rendered pages. This is valid in Next.js App Router — client components can be used inside server components.

### MapView dynamic import
`MapView.tsx` is loaded with `dynamic(() => import(...), { ssr: false })` because Leaflet requires `window`. Without this, Leaflet crashes during SSR.

### buildings.json streaming
`/api/buildings` uses Node.js `createReadStream` + `Readable.toWeb()` to stream the 57 MB file without loading it into memory. Do not switch this to `fs.readFileSync` or `Response.json()`.

### Sitemap route handler trick
The directory `src/app/sitemap.xml/` (with a literal `.xml` in the folder name) contains `route.ts`. This makes Next.js serve a Route Handler at the URL `/sitemap.xml`, bypassing the metadata-based `sitemap.ts` convention which has a 50k-URL limit.
