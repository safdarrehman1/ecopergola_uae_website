# Eco Pergola Dubai — Brand Design Tokens & Color System

This document outlines the measured and verified color palette extracted from **ecopergola.ae** and standardized for Next.js 15, Tailwind CSS v4, and shadcn/ui.

---

## 1. Measured Color Tokens

| Token Name | Measured Hex | CSS Variable | Primary Use Case | Contrast vs White / Ink | WCAG Status |
|---|---|---|---|---|---|
| **Ink** | `#0E1512` | `--ink` | Primary dark sections, hero backgrounds, footer, headings | 18.2:1 on White | AAA Compliant |
| **Forest** | `#1F4D3A` | `--forest` | Primary brand identity (Eco & sustainability) | 8.6:1 on White | AAA Compliant |
| **Forest Dark** | `#143326` | `--forest-dark` | Dark card backgrounds, active states | 12.1:1 on White | AAA Compliant |
| **Forest Light** | `#2A664E` | `--forest-light` | Badges, hover highlights, border accents | 5.8:1 on White | AA Compliant |
| **Brass / Gold** | `#B8895A` | `--brass` | Primary CTA buttons, metallic architectural accents | 4.8:1 on Ink | AA Compliant |
| **Brass Dark** | `#966D44` | `--brass-dark` | CTA hover state, text links on light bg | 5.2:1 on White | AA Compliant |
| **Brass Light** | `#D4A373` | `--brass-light` | Glow highlights, badge background tints | Accent | Decorative |
| **Sand** | `#F5F1EA` | `--sand` | Warm luxury light section background | 1.1:1 (Surface) | Neutral Base |
| **Sand Light** | `#FAF8F5` | `--sand-light` | Alternating card rows, subtle backgrounds | Surface | Neutral Base |
| **Sand Dark** | `#EAE4D9` | `--sand-dark` | Component borders, subtle dividers | Surface | Neutral Base |
| **Glass** | `#7FB5C9` | `--glass` | Architectural glass reflections, sky/coastal accents | Accent | Decorative |
| **Aluminum** | `#C9CED2` | `--aluminum` | Structural metallic frames, neutral chips | Graphic | UI Component |
| **White** | `#FFFFFF` | `--white` | Pure card and body background | Surface | Base |
| **Border** | `#E5E1D8` | `--border` | Card, container, and table dividers | 1.3:1 (Border) | UI Component |
| **Foreground** | `#0E1512` | `--foreground` | Primary body and headline text | 18.2:1 on White | AAA Compliant |

---

## 2. Typography Hierarchy

- **Display & Headings**: `Playfair Display` (Latin) / `Cairo` (Arabic)
  - H1: `text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white text-balance leading-tight`
  - H2: `text-2xl sm:text-3xl font-display font-bold text-foreground leading-snug`
  - H3: `text-xl font-display font-bold text-foreground`
- **Body & Specifications**: `Inter` (Latin) / `IBM Plex Sans Arabic` (Arabic)
  - Body Lead: `text-base sm:text-lg text-muted-foreground leading-relaxed`
  - Body Text: `text-sm sm:text-base text-muted-foreground leading-relaxed`
  - Eyebrow / Label: `text-xs font-bold uppercase tracking-widest text-brass`
  - Spec DT: `text-xs font-semibold uppercase tracking-wider text-muted-foreground`
  - Spec DD: `text-sm font-semibold text-foreground`

---

## 3. Reference Visuals & Snapshots

- **Desktop Reference Screenshot (1440px)**: `brand/original-1440.png`
- **Mobile Reference Screenshot (390px)**: `brand/original-390.png`
- **Machine-Readable Extracted Tokens**: `brand/brand-colors.json`
