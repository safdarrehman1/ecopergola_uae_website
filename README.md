# Eco Pergola — Premium Aluminum & Glass Fabrication Website

A production-grade, multilingual, high-performance Next.js 15 web application for **Eco Pergola** (Dubai, UAE), featuring custom aluminum pergolas, minimal sliding systems, glass facades, and sustainable architectural fabrication.

---

## Key Features & Tech Stack

- **Framework**: Next.js 15 with App Router, TypeScript (Strict mode), Server Components by default
- **Styling & Design System**: Tailwind CSS v4 with design tokens in CSS variables (`--ink`, `--forest`, `--brass`, `--sand`, `--glass`, `--aluminum`)
- **Component Library**: shadcn/ui (Button, Card, Badge, Accordion, Tabs, Dialog, Sheet, NavigationMenu, Select, Input, Textarea, Tooltip, Sonner Toast)
- **Internationalization**: `next-intl` with full **English**, **Arabic (RTL)**, and **French** support
- **Animations & Smooth Scroll**: Framer Motion + Lenis Smooth Scroll with `prefers-reduced-motion` compliance
- **SEO & Structured Data**:
  - Valid Schema.org JSON-LD for `LocalBusiness` / `HomeAndConstructionBusiness`, `Service`, `Product`, `FAQPage`, `BlogPosting`, and `BreadcrumbList`
  - Dynamic `sitemap.xml` generating 150+ static pages across all locales
  - Dynamic Open Graph social images via Next.js `ImageResponse`
  - Hreflang alternates (`en-AE`, `ar-AE`, `fr`, `x-default`)
- **Forms & Email**: `react-hook-form` + `zod` validation with anti-spam honeypot and API route handlers (`/api/contact`, `/api/newsletter`)

---

## Getting Started

### 1. Prerequisites
- Node.js `20.x` or `22.x+`
- pnpm `10.x+` (or npm / yarn)

### 2. Environment Variables
Create a `.env.local` file in the root directory:

```env
# Contact Email for Quotations & Lead Routing
NEXT_PUBLIC_CONTACT_EMAIL=info@ecopergola.ae

# Resend API Key for Email Delivery (Optional)
RESEND_API_KEY=re_your_api_key_here

# Google Analytics 4 Measurement ID (Optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### 3. Install Dependencies & Approve Scripts
```bash
pnpm install
```

### 4. Run Development Server
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production
```bash
pnpm build
```

---

## Information Architecture & Routes

| Route | Description |
|---|---|
| `/` | Home Page with 11 rich sections (Hero, News, Services, Products, About, 19 Pergola Types, 6 Projects, Testimonials, FAQ, Blog, Contact) |
| `/about` | Company history, manufacturing facility, and strategic vision |
| `/services` | Overview of all 8 specialized architectural services |
| `/services/[slug]` | 8 dynamic service pages with engineering specifications and benefits |
| `/products` | Premium products gallery with interactive lightbox dialogs |
| `/pergola-types` | Interactive catalog with category filters and material comparison table |
| `/pergola-types/[slug]` | 19 dedicated pergola pages with technical specs and photo galleries |
| `/projects` | Case study portfolio with filter chips |
| `/projects/[slug]` | 6 deep-dive project case studies with scope, materials, and gallery |
| `/blog` | Knowledge hub index |
| `/blog/[slug]` | 3 technical in-depth articles with Table of Contents and schema |
| `/faq` | Frequently asked questions with structured data |
| `/contact` | Showroom location, embedded Google Map, and consultation form |
| `/privacy-policy` | Data privacy commitments |
| `/terms` | Commercial and fabrication terms of service |
| `/credits` | Image licensing and photographer attributions |
| `/ar/*` & `/fr/*` | Localized mirror routes with first-class Arabic RTL typography |

---

## Deployment to Vercel

1. Push this repository to GitHub/GitLab.
2. Import the project into **Vercel**.
3. Set the Environment Variables (`NEXT_PUBLIC_CONTACT_EMAIL`, `RESEND_API_KEY`, etc.).
4. Vercel automatically detects Next.js 15 and deploys the static and dynamic edge routes.
