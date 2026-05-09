# Al Adil Ashrafi — Portfolio

> **The Marketing Alchemist** — A modern, performance-first personal portfolio for Al Adil Ashrafi, digital marketing specialist, co-founder of [Markimist](https://markimist.com), and creator of [Bangla Track](https://banglatrack.com).

Live site: **[adilashrafi.com](https://adilashrafi.com)**

---

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Pages & Routes](#pages--routes)
- [Key Components](#key-components)
- [Data Layer & CMS Integration](#data-layer--cms-integration)
- [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
- [Build & Deployment](#build--deployment)
- [ISR & On-Demand Revalidation](#isr--on-demand-revalidation)
- [Customization Guide](#customization-guide)
- [Contributing](#contributing)
- [Contact](#contact)

---

## Overview

This is the **Next.js 16 frontend** for Al Adil Ashrafi's personal portfolio website. It is a headless frontend that pulls all dynamic data — projects, services, experience, skills, testimonials, and clients — from a **WordPress backend** via a custom REST API (`/wp-json/adil/v1`).

The site is designed around three principles:

- **Speed** — Incremental Static Regeneration (ISR) ensures pages are pre-rendered and served from cache, revalidating every hour without a full rebuild.
- **Design** — A dark, editorial aesthetic with a blue/orange accent palette, three distinct Google Fonts, smooth scroll-reveal animations powered by Framer Motion / IntersectionObserver, and an animated atom SVG as the hero visual.
- **Maintainability** — All content is managed from WordPress; the frontend is purely presentational and never hardcodes content that should be editable.

---

## Architecture

```
WordPress CMS (adilashrafi.com/wp-json/adil/v1)
        │
        │  REST API (JSON)
        ▼
Next.js 16 Frontend  ──── ISR (revalidate: 3600s) ────▶ CDN / Edge
        │
        ├── /                  (homepage — all sections)
        ├── /projects          (project listing)
        ├── /projects/[slug]   (project detail — SSG + ISR)
        └── /resume            (CV page)
```

**On-demand revalidation** is supported via a `POST /api/revalidate` webhook, which the WordPress plugin can call whenever content is published or updated.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Language | TypeScript 6 |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Animation | [Framer Motion 12](https://www.framer-motion.com/) + custom `IntersectionObserver` reveal |
| Fonts | Syne (display), DM Sans (body), Space Mono (mono) via `next/font/google` |
| Data Fetching | Native `fetch` with Next.js `revalidate` caching |
| CMS / Backend | WordPress with a custom REST API plugin |
| Image Optimisation | `next/image` + `sharp` |
| Utility | `clsx`, `tailwind-merge` |
| Build Output | `standalone` (Docker-friendly) |

---

## Project Structure

```
adil-portfolio/
├── public/
│   └── al-adil-ashrafi-saikat.png   # Profile image
├── src/
│   ├── app/
│   │   ├── globals.css               # Global styles, CSS variables, reveal animation
│   │   ├── icon.png                  # Favicon
│   │   ├── layout.tsx                # Root layout — fonts, metadata, ScrollProgress
│   │   ├── not-found.tsx             # Custom 404 page
│   │   ├── page.tsx                  # Homepage (ISR, revalidate: 3600)
│   │   ├── api/
│   │   │   └── revalidate/
│   │   │       └── route.ts          # On-demand ISR revalidation webhook
│   │   ├── projects/
│   │   │   ├── page.tsx              # /projects — full project listing
│   │   │   └── [slug]/
│   │   │       └── page.tsx          # /projects/[slug] — case study detail
│   │   └── resume/
│   │       └── page.tsx              # /resume — CV with skills, work & education
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Nav.tsx               # Sticky navigation bar
│   │   │   └── Footer.tsx            # Site footer
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx       # Full-screen hero with stats & atom SVG
│   │   │   ├── AboutSection.tsx      # About / bio section
│   │   │   ├── ServicesSection.tsx   # Services offered
│   │   │   ├── ExperienceSection.tsx # Timeline of work + skills
│   │   │   ├── ProjectsSection.tsx   # Featured projects grid
│   │   │   ├── ClientsSection.tsx    # Client logo strip
│   │   │   ├── TestimonialsSection.tsx # Client testimonials
│   │   │   └── ContactSection.tsx    # Contact form + social links
│   │   └── ui/
│   │       ├── AtomSvg.tsx           # Animated atom SVG (hero visual)
│   │       ├── FlaskSvg.tsx          # Decorative flask SVG
│   │       ├── RevealWrapper.tsx     # IntersectionObserver scroll-reveal
│   │       ├── ScrollProgress.tsx    # Top-of-page reading progress bar
│   │       └── SectionHeader.tsx     # Reusable section heading with accent
│   └── lib/
│       └── api.ts                    # All data-fetching functions + TypeScript interfaces
├── next.config.js                    # Next.js config (standalone output, image domains)
├── postcss.config.js
├── tsconfig.json
└── package.json
```

---

## Pages & Routes

### `/` — Homepage

The main landing page. Fetches all portfolio data in a single API call (`GET /portfolio`) and passes it down to each section component. Uses ISR with a 1-hour revalidation window.

Sections rendered (in order):
1. **Nav** — Sticky top navigation
2. **Hero** — Name, tagline, stats (4+ years, 30+ brands, 3 products), CTA buttons
3. **About** — Bio and background
4. **Services** — Services offered, sourced from CMS
5. **Experience** — Work/education timeline + skill progress bars
6. **Projects** — Featured project cards with tech tags
7. **Clients** — Client logo strip
8. **Testimonials** — Client quotes carousel/grid
9. **Contact** — Contact form + direct email/social links
10. **Footer**

### `/projects` — Project Listing

Displays all projects fetched from the CMS. Each card links to its detail page.

### `/projects/[slug]` — Project Detail

Dynamically generated at build time via `generateStaticParams()` (SSG), then revalidated hourly (ISR). Displays:
- Badge, name, description
- Role, timeline, and status metadata
- Full HTML content via `dangerouslySetInnerHTML` (from WordPress WYSIWYG)
- Tech stack tags
- Key results sidebar
- Link to live project or "Follow Progress" for in-development projects

### `/resume` — CV Page

Fetches experience (split into work and education) and skills from the CMS. Renders:
- Contact header with email, LinkedIn, location, and availability status
- Skill bars with percentage levels
- Work history timeline
- Education & certifications timeline

### `POST /api/revalidate` — ISR Webhook

Accepts a JSON body `{ path: string; secret: string }`. If the `secret` matches the `REVALIDATE_TOKEN` environment variable, it calls `revalidatePath(path)` to purge and regenerate that page's cache. Intended to be called by the WordPress backend when content is updated.

---

## Key Components

### `RevealWrapper`

A lightweight scroll-reveal wrapper built with the native `IntersectionObserver` API. When the wrapped element enters the viewport, it adds the `visible` CSS class, triggering a fade-in + slide-up transition defined in `globals.css`. Supports an optional `delay` prop (in milliseconds) for staggered animations.

```tsx
<RevealWrapper delay={200}>
  <p>This fades in when scrolled into view.</p>
</RevealWrapper>
```

### `ScrollProgress`

Renders a thin progress bar fixed at the top of the page. Listens to the `scroll` event (passive) and updates its width as a percentage of the total scrollable distance.

### `SectionHeader`

A reusable heading component that renders a labelled section header with a two-tone title (plain + accent colour). Accepts a `centered` prop for centred layouts.

### `AtomSvg`

An animated SVG atom illustration used as the hero visual on desktop. Hidden on mobile (where a subtler, lower-opacity version is shown as a background element via absolute positioning).

---

## Data Layer & CMS Integration

All data fetching is centralised in `src/lib/api.ts`. The base URL defaults to `https://adilashrafi.com/wp-json/adil/v1` but can be overridden via the `NEXT_PUBLIC_WP_API` environment variable.

### TypeScript Interfaces

| Interface | Description |
|---|---|
| `Project` | id, slug, name, badge, description, url, status, featured, tech_tags, image_url, role, timeline, content |
| `Service` | id, num, icon, name, description, order |
| `ExperienceItem` | id, period, role, company, description, type (`work` \| `education`), order |
| `Skill` | id, name, percentage, category, order |
| `Testimonial` | id, quote, author, title, company, avatar_url |
| `Client` | id, name, logo |
| `ContactPayload` | name, email, subject, message, budget |

### API Endpoints Consumed

| Method | Endpoint | Used by |
|---|---|---|
| `GET` | `/portfolio` | Homepage (bulk fetch, single round-trip) |
| `GET` | `/projects` | Projects listing |
| `GET` | `/projects?featured=1` | Homepage featured projects |
| `GET` | `/projects/:slug` | Project detail page |
| `GET` | `/services` | Services section |
| `GET` | `/experience` | Experience section, Resume page |
| `GET` | `/skills` | Experience section, Resume page |
| `GET` | `/testimonials` | Testimonials section |
| `POST` | `/contact` | Contact form submission |

---

## Environment Variables

Create a `.env.local` file at the root of the project:

```env
# Base URL for the WordPress REST API (optional — defaults to https://adilashrafi.com/wp-json/adil/v1)
NEXT_PUBLIC_WP_API=https://your-wordpress-site.com/wp-json/adil/v1

# Secret token for on-demand ISR revalidation (must match the WordPress plugin config)
REVALIDATE_TOKEN=your-secret-token-here
```

`NEXT_PUBLIC_WP_API` is exposed to the browser (prefixed with `NEXT_PUBLIC_`) so it can also be used client-side (e.g., for the contact form POST). `REVALIDATE_TOKEN` is server-only and must be kept secret.

---

## Getting Started

### Prerequisites

- **Node.js** >= 18 (LTS recommended)
- **npm** >= 9

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/aladilashrafi/adil-portfolio.git
cd adil-portfolio

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local and fill in your values
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> **Note:** The development server will still fetch data from the live WordPress API (or your configured `NEXT_PUBLIC_WP_API`). If the API is unreachable, the homepage gracefully falls back to empty arrays so the UI still renders without errors.

### Type Checking

```bash
npm run type-check
```

### Linting

```bash
npm run lint
```

---

## Build & Deployment

### Production Build

```bash
npm run build
npm run start
```

### Standalone / Docker

The project is configured with `output: 'standalone'` in `next.config.js`, which bundles everything needed to run the server into `.next/standalone`. This makes it suitable for Docker or any Node.js hosting environment.

Example Dockerfile snippet:

```dockerfile
FROM node:20-alpine AS runner
WORKDIR /app
COPY .next/standalone ./
COPY .next/static ./.next/static
COPY public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

### Vercel (Recommended)

1. Import the repository on [vercel.com](https://vercel.com).
2. Add the environment variables (`NEXT_PUBLIC_WP_API`, `REVALIDATE_TOKEN`) in the Vercel project settings.
3. Vercel auto-detects Next.js and handles ISR natively — no additional configuration needed.

---

## ISR & On-Demand Revalidation

Pages use **Incremental Static Regeneration** with a 1-hour cache window (`export const revalidate = 3600`). This means:

- Pages are pre-rendered at build time.
- After 1 hour, the next request triggers a background regeneration.
- Stale content is still served while the new page is being generated (stale-while-revalidate).

For **instant updates** (e.g., when a project is published in WordPress), the WordPress plugin can call the revalidation webhook:

```bash
curl -X POST https://adilashrafi.com/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{ "path": "/projects/my-project-slug", "secret": "your-secret-token" }'
```

The webhook validates the token against `REVALIDATE_TOKEN` and calls `revalidatePath()` for the given path.

---

## Customization Guide

### Changing Personal Information

Most visible personal content (name, bio, stats, contact details) is fetched from the WordPress CMS. Update it there and it will reflect on the site within the next revalidation cycle (or immediately via the webhook).

Content that is **hardcoded** in the frontend and requires a code change:

| File | What to change |
|---|---|
| `src/app/layout.tsx` | Site `<title>`, meta description, OpenGraph tags, Twitter card |
| `src/components/sections/HeroSection.tsx` | Hero stats (years, brands, products), tagline, CTA button URLs |
| `src/components/sections/ContactSection.tsx` | Phone number, location, social links, budget ranges |
| `src/lib/api.ts` → `getSiteSettings()` | Fallback email, LinkedIn URL, location, availability label |

### Changing Colours & Fonts

Colours are defined as CSS variables in `src/app/globals.css`. The core accent colours are:

- **Blue** (`--color-blue`): `#019cff` — primary interactive colour
- **Orange** (`--color-orange`): `#fe5401` — secondary accent
- **Dark** backgrounds: `--color-dark`, `--color-dark-2`

Fonts are loaded in `src/app/layout.tsx` via `next/font/google`:
- `--font-syne` → display headings (`font-display`)
- `--font-dm-sans` → body text (`font-body`)
- `--font-space-mono` → monospace labels (`font-mono`)

### Adding a New Section

1. Create a new component in `src/components/sections/`.
2. Add the corresponding data type and fetch function to `src/lib/api.ts`.
3. Include the new endpoint in the `getPortfolioData()` bulk fetch.
4. Import and render the component in `src/app/page.tsx`.

### Allowing New Image Domains

If you add images from a new hostname, add it to `remotePatterns` in `next.config.js`:

```js
remotePatterns: [
  {
    protocol: 'https',
    hostname: 'your-new-domain.com',
    pathname: '/uploads/**',
  },
],
```

---

## Contributing

Contributions, bug reports, and suggestions are welcome.

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "feat: describe your change"`
4. Push to your fork: `git push origin feature/your-feature-name`
5. Open a Pull Request against `main`

Please include a brief description of your changes and, where applicable, screenshots or a screen recording.

---

## Contact

**Al Adil Ashrafi**

- Website: [adilashrafi.com](https://adilashrafi.com)
- Email: [hello@adilashrafi.com](mailto:hello@adilashrafi.com)
- LinkedIn: [linkedin.com/in/al-adil-ashrafi](https://linkedin.com/in/al-adil-ashrafi/)
- GitHub: [@aladilashrafi](https://github.com/aladilashrafi)
- Markimist: [markimist.com](https://markimist.com)
- Bangla Track: [banglatrack.com](https://banglatrack.com)
