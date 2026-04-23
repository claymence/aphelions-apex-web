# SvelteKit Conventions

## Routing & Data Loading

### Server-Side Data Fetching

- **Always** use `+page.server.ts` for data loading (never `+page.ts` or components)
- **Example**:
    ```typescript
    // +page.server.ts
    export const load = async ({ url }) => {
    	const filters = extractFilters(url.searchParams);
    	return await queryJWST(filters);
    };
    ```

### URL Query Params

- All filtering/pagination **must** update the URL
- Components **must not** use client-only state for page/filters

### File Structure

- `+page.server.ts`: Data loading logic
- `+page.svelte`: UI rendering only
- Reusable UI components: `src/lib/components`

---

## TypeScript

### Strict Typing

**Required for API responses:**

- `{Api}QueryResponse` (discriminated union with `success` boolean)
- `{Api}Filters` interface
- `{Api}Item` normalized item type

**Rule**: No `any` unless explicitly justified

### API Responses

- UI components **only** receive normalized item arrays (never raw API shapes)
- See specific API skill for response structure details

---

## UX & Performance

### Gallery/List Components

- **Pagination**: "Load More" button (not page numbers) when API doesn't provide totals
- **Text Input Filters**: Submit on Enter key (not auto-submit/debounce)
- **Filter State**: Show "No results" below filters (don't replace UI with error)
- **Images**:
    - `loading="lazy"` and `decoding="async"` for all `<img>`
    - Placeholder while loading

### Filter Patterns

**Single Active Filter** (when API doesn't support combinations):

- Dropdown to select filter type (fileType, program, suffix, etc.)
- Show only the selected filter's input field
- Optional secondary filter (e.g., keyword search) always visible

**URL Structure**:

```
?fileType=jpg&page=2           # File type filter
?suffix=_cal&keyword=nrca1     # Suffix + keyword
```

### Performance Targets

- **Avoid**: Loading entire datasets client-side
- **Target**: <2s for initial load (paginated)

---

## Separation of Concerns

- **Components**: Render UI only (no API logic or business logic)
- **Server Layer**: Handles all data fetching, transformation, and error handling
- **Filters**: State in URL, minimal client-side logic

### Future Considerations

**Charts:**

- If added, transform data in the server layer
- UI receives pre-shaped chart data (e.g., `{ labels: string[], values: number[] }`)
