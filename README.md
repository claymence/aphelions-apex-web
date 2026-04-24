# Aphelions's Apex

Web application for exploring API data from astronomy.

Currently featuring JWST (James Webb Space Telescope) imagery and data through an interactive gallery interface.

## Tech Stack

- **Framework**: SvelteKit 5 with TypeScript
- **Build Tool**: Vite
- **Runtime**: Node.js
- **Testing**: Vitest + Playwright
- **Process Manager**: PM2 (production)
- **Web Server**: Nginx

## Deployment

- **Hosting**: VPS (Ubuntu 24.04)
- **SSL**: Let's Encrypt (HTTPS)
- **Process Management**: PM2 ecosystem config (no `.env` files in production)
- **Deployment Script**: `deploy.sh`
- **Production URL**: [https://aphelions-apex.dev](https://aphelions-apex.dev)

## API Integration

- **Data Source**: JWST API (jwstapi.com)
- **Pattern**: Server-side wrappers with normalization pipeline - raw API data is fetched, cached, normalized, and passed to the UI as typed, validated items
- **Validation**: All filters validated server-side before external calls
- **Caching**: In-memory cache with TTL (5 minutes) based on filter parameters
- **Rendering**: Server-side via `+page.server.ts` (no client-side data fetching)
- **State**: URL-based filters and pagination ("Load More" pattern)

## Styling System

- **Engine**: Panda CSS (build-time atomic CSS)
- **Tokens**: Semantic design tokens for colors, spacing, typography, and radius
- **Layouts**: Centralized primitives in `src/lib/styles/layout.ts` (shell, header, contained, fullBleed)
- **Recipes**: Reusable component recipes (button, card, input) in `src/lib/styles/recipes/`
- **Patterns**: Built-in flex/grid utilities (`stack`, `hstack`, `grid`)
- **Rules**: No inline Tailwind classes, no `<style>` blocks, zero runtime CSS

## License

Code is licensed under [MIT](./LICENSE). Original artwork and graphics in
`/src/assets/` are © 2026 Clemens Wähner — all rights reserved.
Third-party assets are subject to their respective licenses.
