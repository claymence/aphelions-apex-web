# Architecture Overview

## Infrastructure

### Stack

- **Hosting**: VPS (Ubuntu 24.04)
- **Runtime**: Node.js + PM2 (process manager)
- **Web Server**: Nginx (HTTPS termination, static files)
- **Environment**: `$env/dynamic/private` (PM2 ecosystem config)
- **Production URL**: [https://aphelions-apex.dev](https://aphelions-apex.dev)

### Deployment

- **Script**: `deploy.sh` (do not modify unless instructed)
- **PM2**: Manages Node processes; `.env` files are **not used** in production

### Security

- **HTTPS**: Let's Encrypt certificates
- **CSP**: Enforced in `hooks.server.ts`

---

## External API Integration Pattern

### Pipeline

```
External API → {api}Fetch → normalize{Api}Items → {Api}QueryResponse → +page.server.ts → UI
                                  ↑                              ↓
                                  └──────── Cache Layer ←────────┘
```

1. **External API**: Raw data (unstructured, variable fields)
2. **Server Wrapper** (`src/lib/server/{api-name}/index.ts`):
    - Checks cache first (via `cache.get()` with filter-based key)
    - Fetches data via `{api}Fetch` only on cache miss
    - Normalizes responses with normalization functions
    - Stores result in cache (via `cache.set()` with TTL)
3. **Cache Layer** (`src/lib/server/{api}/cache.ts`):
    - In-memory cache with TTL (time-to-live)
    - Cache key generated from filter parameters
    - Default TTL: 5 minutes for query results
4. **Structured Response** (`{Api}QueryResponse`):
    - Typed, paginated, and validated
5. **UI Consumption**:
    - Components receive only normalized items (never raw API shapes)
    - Server-side rendering via `+page.server.ts`

### Example: JWST API

See [jwst-api skill](../skills/jwst-api/SKILL.md) for specific implementation.

### Key Files (Generic Pattern)

| File Pattern                        | Purpose                        |
| ----------------------------------- | ------------------------------ |
| `src/lib/server/{api}/`             | API wrappers and normalization |
| `src/lib/server/{api}/index.ts`     | Core query function            |
| `src/lib/server/{api}/endpoints.ts` | Endpoint URL builders          |
| `src/lib/server/{api}/types.ts`     | TypeScript interfaces          |
| `src/lib/server/{api}/cache.ts`     | In-memory caching with TTL     |

---

## Adding New APIs

When integrating a new external API:

1. Create `src/lib/server/{api-name}/` directory
2. Implement the wrapper pattern (see api-patterns.md)
3. Add skill documentation in `.agents/skills/{api-name}/`
4. Create route at `/space/{topic}/` (see space-topics.md)

### Naming Conventions

- Directory: `src/lib/server/{api-name}/` (lowercase, hyphens)
- Types: `{ApiName}Item`, `{ApiName}Filters`, `{ApiName}QueryResponse`
- Main function: `query{ApiName}()`
