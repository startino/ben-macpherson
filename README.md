# Persona Intelligence Demo (startino.github.io)

A dark, minimal React + TypeScript + Vite demo using Tailwind and shadcn-style tokens to showcase the persona intelligence workflow with mocked data. Deployed via GitHub Pages user site.

## Tech
- React + TypeScript + Vite
- Tailwind CSS (dark mode class strategy) + shadcn tokens
- Recharts for charts
- React Router for navigation
- Papaparse for CSV export

## Local Development
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
# outputs to dist/ and copies index.html -> 404.html (for GH Pages routing)
```

## Deploy (GitHub Pages)
- Push to `main`; GitHub Actions workflow `.github/workflows/deploy.yml` builds and deploys to Pages.
- Repo name must be `startino.github.io` for user-site URL `https://startino.github.io/`.

## Structure
- `src/main.tsx`: Router + pages
- `src/App.tsx`: App shell (header/nav + outlet)
- `src/data/mock/*`: Mock datasets (personas, timeseries, creative)
- `src/lib/export.ts`: CSV/JSON download helpers

## Pages
- Landing: Value proposition
- Inputs: Connections + survey + guardrails (placeholder)
- Persona Intelligence: Overview (placeholder)
- Creative & Strategy: Briefs/copy/prompts (placeholder)
- Dashboard: Persona share over time (Recharts)
- Exports: Download CSV/JSON (personas)

## Notes
- Minimal CSS via Tailwind; tokens compatible with shadcn components if you add them later.
- For more components, you can bring in shadcn/ui component files or add your own in `src/components/ui/`.
