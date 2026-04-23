# JWST SvelteKit App

## Quick Start

```bash
# Development
npm run dev

# Build
npm run build
```

## Project Overview

This is a SvelteKit application for browsing and viewing JWST (James Webb Space Telescope) data. The app provides a gallery interface for exploring JWST images and data files.

**Production URL**: [https://aphelions-apex.dev](https://aphelions-apex.dev)

## Architecture

- **Frontend**: SvelteKit with TypeScript
- **Backend**: SvelteKit server routes
- **Data Source**: JWST API (wrapped in `src/lib/server/jwst/`)
- **Deployment**: VPS + PM2 + Nginx

## Key Files

| Path                    | Purpose                             |
| ----------------------- | ----------------------------------- |
| `src/lib/routes/space/` | "Hub" for space (astronomy) content |
| `src/lib/types/jwst.ts` | TypeScript types                    |
| `src/lib/components/`   | Reusable UI components              |
| `+page.server.ts`       | Data loading (always use this)      |

## Context Files

See `.agents/**` for detailed conventions and rules:

- **Context**: Architecture, conventions, and data flow
    - `styling.md` - Panda CSS styling patterns and tokens
- **Rules**: Security, API patterns, and code standards
- **Skills**: JWST querying and MCP usage guides

## Quick Reference

- **Data loading**: Always use `+page.server.ts` (never `+page.ts`)
- **Environment vars**: Use `$env/dynamic/private` only
- **API calls**: Must go through `src/lib/server/jwst/index.ts`
- **Images**: Always add `loading="lazy" decoding="async"`
- **Pagination**: Use "Load More" pattern with `hasMore` boolean
- **Styling**: Use Panda CSS with design tokens (see Styling guide)
