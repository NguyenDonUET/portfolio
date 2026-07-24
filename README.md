# Developer Portfolio

A modern, production-ready personal portfolio built with the Next.js App Router. It presents a developer's work through a fast, animated, and fully responsive single-page experience — with light/dark theming, scroll-synced navigation, and accessible interactive project detail modals.

The site is content-driven: everything you see is rendered from a single typed data module, so you can make it your own by editing one file — no component changes required.

## Highlights

- **Polished, motion-first UI** — subtle, GPU-accelerated animations (Framer Motion) with staggered section reveals and refined hover states, all respecting `prefers-reduced-motion`.
- **Light & dark mode** — class-based theme toggle with no flash on load, persisted to `localStorage`.
- **Interactive project cards** — each project opens an accessible modal (Base UI Dialog) detailing the full description and the candidate's responsibilities.
- **Scroll-synced navigation** — the side/mobile nav highlights the active section as you scroll, including the last section at the bottom of the page.
- **Accessible by default** — semantic landmarks, ARIA labels, visible focus states, and WCAG-minded color contrast in both themes.
- **Mobile-first & responsive** — fluid layouts from small screens up, with a drawer-style mobile menu.
- **Strictly typed** — TypeScript in strict mode with domain types shared across data and UI.

## Stack

- Next.js App Router + React 19 + TypeScript (strict)
- Tailwind CSS v4 with design tokens + `clsx` + `tailwind-merge`
- Framer Motion for animation
- Base UI for accessible primitives (Dialog, Tooltip)
- Lucide React for icons

## Getting Started

```bash
pnpm install
pnpm dev      # start the dev server at http://localhost:3000
pnpm build    # production build
pnpm start    # serve the production build
pnpm lint     # run ESLint
```

## Project Structure

```
src/
  app/                 # Root layout, home page, globals
  components/ui/        # Primitives: Button, Card, Badge, Dialog, Tooltip, Container, ...
  components/sections/ # Hero, About, Projects, ProjectCard, Experience, Skills, Contact, Footer
  components/common/   # Navbar, SideNav, MobileMenu, ThemeToggle
  data/                # portfolioData.ts — all site content
  types/               # portfolio.ts — shared domain types
  hooks/               # useScrollSpy, useHeaderScroll
  lib/                 # cn() helper
```

## Customizing Content

All content — personal info, projects (with per-project responsibilities), experience, and skills — lives in `src/data/portfolioData.ts`, typed against `src/types/portfolio.ts`. Update that file to personalize the portfolio; the UI stays in sync automatically.
