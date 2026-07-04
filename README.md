# Cloud Ops Control Center — Umang Dakh Portfolio

A personal portfolio website designed as an interactive cloud operations dashboard / production infrastructure control center. Built for engineering managers and recruiters at top tech companies.

**Live Demo:** https://umangdakh.vercel.app

## Features

- **Cloud Ops Dashboard UI** — Metric widgets, status indicators, deployment logs
- **Command Palette** — `⌘K` jump navigation across all sections
- **Boot Sequence** — Simulated cloud platform startup (skippable, respects reduced-motion)
- **Dark/Light Mode** — Persistent theme toggle
- **Interactive Architecture Diagrams** — Animated AWS + CI/CD pipeline visualizations
- **Deployments Feed** — Simulated live log stream
- **Full Keyboard Navigation** — Accessible controls, screen-reader labels
- **Fully Responsive** — Mobile hamburger menu, adaptive layout
- **SEO Optimized** — Metadata, OpenGraph, JSON-LD, sitemap.xml, robots.txt

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Deployment:** Vercel

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── layout.tsx        # Root layout with SEO metadata
│   ├── page.tsx          # Main single-page portfolio
│   ├── globals.css       # Tailwind CSS v4 theme config
│   ├── sitemap.ts        # Dynamic sitemap generation
│   └── robots.ts         # Robots.txt generation
├── components/
│   ├── layout/           # App shell components
│   │   ├── boot-screen.tsx
│   │   ├── command-center.tsx
│   │   ├── command-palette.tsx
│   │   └── deployment-feed.tsx
│   ├── sections/         # Page section components
│   │   ├── home-dashboard.tsx
│   │   ├── about.tsx
│   │   ├── tech-stack.tsx
│   │   ├── experience.tsx
│   │   ├── projects.tsx
│   │   ├── architecture.tsx
│   │   ├── certifications.tsx
│   │   ├── blog.tsx
│   │   ├── resume.tsx
│   │   └── contact.tsx
│   └── ui/               # Reusable UI primitives
│       └── button.tsx
├── data/
│   └── mock-data.ts      # All mock data (metrics, logs, projects, etc.)
├── hooks/
│   ├── useBootSequence.ts
│   └── useTheme.ts
└── lib/
    └── utils.ts          # cn() utility (clsx + tailwind-merge)
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
cd Portfolio
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
npm start
```

## Deployment to Vercel

### Automatic (Recommended)

1. Push the repository to GitHub
2. Go to [vercel.com](https://vercel.com) and import the GitHub repository
3. Vercel auto-detects Next.js — no configuration needed
4. Click **Deploy**

### Manual

```bash
npm i -g vercel
cd Portfolio
vercel --prod
```

### Post-Deployment

1. **Set up custom domain** (optional): Go to Vercel project → Domains → add your domain
2. **Update metadata**: Edit `src/app/layout.tsx` to update the URL to your actual domain
3. **Add resume PDF**: Place your actual ATS-optimized resume as `public/Umang_Dakh_Resume.pdf`
4. **Update GitHub link**: The resume download links point to `https://raw.githubusercontent.com/umangdakh/portfolio/main/public/Umang_Dakh_Resume.pdf` — update if your repo name differs

## Resume PDF

The resume download button points to:
```
https://raw.githubusercontent.com/umangdakh/portfolio/main/public/Umang_Dakh_Resume.pdf
```

To make this work:
1. Upload your actual `Umang_Dakh_Resume.pdf` (from the attached file) as `public/Umang_Dakh_Resume.pdf` in the repo
2. Push to GitHub — the raw URL will be live automatically

## Customization

- **Personal data**: Edit `src/data/mock-data.ts` to update all portfolio content
- **Theme colors**: Edit `src/app/globals.css` for Tailwind color tokens
- **Navigation items**: Add/remove items in the `navItems` array in `src/data/mock-data.ts`
- **Boot sequence**: Edit `src/hooks/useBootSequence.ts`

## Lighthouse Score Targets

The build is optimized for:
- **Performance** >95 (static generation, optimized fonts, no heavy 3D)
- **Accessibility** >95 (ARIA labels, keyboard nav, reduced-motion support)
- **Best Practices** >95 (no console errors, modern standards)
- **SEO** >95 (metadata, OpenGraph, JSON-LD, sitemap)

## License

MIT — feel free to use this as a template for your own cloud engineering portfolio.

---

Built by [Umang Dakh](https://linkedin.com/in/umang-dakh) | Cloud & DevOps Engineer