# API Patterns

## Data Flow

**Golden Rule: UI must NEVER consume raw API responses**

All external API data must flow through server-side wrappers:

```
src/lib/server/{api-name}/index.ts
```

**Normalization Pipeline:**

```
External API → {api}Fetch → normalize{Api}Items → {Api}QueryResponse → UI
                                  ↑                              ↓
                                  └──────── Cache Layer ←────────┘
```

**Example (JWST):**

```
JWST API → jwstFetch → normalizeJWSTItems → JWSTQueryResponse → UI
                              ↑                          ↓
                              └────── cache.get/set ←────┘
```

---

## Filter Validation

### Requirements

- **All filters** must be validated before endpoint construction
- **Whitelist allowed values** when applicable:
    - Example: `jpg`, `png`, `ecsv`, `fits`, `json` for file types
- **Invalid filters** must return:
    ```typescript
    { success: false, error: "Invalid file type" }
    ```

---

## Pagination

### Implementation

When API doesn't provide total counts:

```typescript
interface QueryResponse {
	success: boolean;
	items: Item[];
	hasMore: boolean; // Not totalPages!
	page: number;
	perPage: number;
}
```

- **Do NOT** estimate `totalPages` unless the API provides it
- **Use**: `{ hasMore: boolean }` based on whether a full page was returned

**Example (JWST):**

```typescript
hasMore = items.length === perPage;
```

### Anti-Patterns

- ❌ Fake metadata (e.g., client-side total estimation)
- ❌ Loading entire datasets into the browser

---

## Extensibility

### Adding Endpoints

1. Add to `{Api}Endpoints` (e.g., `JWSTEndpoints.allByType('jpg')`)
2. Update `normalize{Api}Items` if the API shape changes
3. Update cache key generation in `cache.ts` if filters change
4. **Never** leak raw API shapes to the UI

---

## Anti-Patterns

### Backend

- ❌ Call external API directly from frontend
- ❌ Construct endpoints manually (use `{Api}Endpoints`)
- ❌ Expose raw API fields to UI
- ❌ Bypass internal API layer (`src/lib/server/{api}/index.ts`)
- ❌ Expose REST API routes at `/api/*` (use `+page.server.ts` instead)

### Frontend

- ❌ Fetch data in `+page.ts` (use `+page.server.ts`)
- ❌ Store filters in client-only state (use URL query params)
- ❌ Assume API response structure (always use normalized types)
- ❌ Parse API response fields inline
- ❌ Auto-submit text inputs (use Enter key)
