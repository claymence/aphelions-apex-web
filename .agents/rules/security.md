# Security Rules

## Secrets

- **Never** hardcode API keys or sensitive data.
- **Always** use:
    ```typescript
    import { env } from '$env/dynamic/private';
    const apiKey = env.API_NAME_API_KEY;
    ```

## API Access

- All external API calls **must** go through the server-side wrapper (`src/lib/server/{api-name}/index.ts`).
- **Never** expose internal API logic to unauthenticated users.
- **All data loading** must happen in `+page.server.ts` (not `+page.ts` or components).

## Endpoint Security

- **Do not** expose REST API endpoints at `/api/*` unless specifically needed.
- **Prefer** server-side rendering via `+page.server.ts` for data fetching.
- If REST endpoints are required, validate requests appropriately.

## Headers

- **Required headers** (enforced in `hooks.server.ts`):
    - `Content-Security-Policy`
    - `Strict-Transport-Security`

## Input Validation

**All user inputs must be validated server-side in `+page.server.ts` before processing.**

### Requirements

- Create a `validation.ts` file in `src/lib/server/{api-name}/`
- Validate ALL query parameters from `url.searchParams`
- Return early with error message if validation fails (don't call external APIs)
- Use whitelists for enumerated values (file types, categories, etc.)
- Apply length limits and format restrictions
- Validate numeric ranges for pagination (page, perPage)

### Validation Pattern

```typescript
// src/lib/server/{api-name}/validation.ts
export interface ValidationResult {
    valid: boolean;
    error?: string;
}

export function validateProgram(program: string): ValidationResult {
    if (program.length > 100) {
        return { valid: false, error: 'Program ID too long' };
    }
    if (!/^\d+$/.test(program)) {
        return { valid: false, error: 'Program ID must be numeric' };
    }
    return { valid: true };
}

export function validateFilters(filters: ApiFilters): ValidationResult {
    if (filters.program) {
        return validateProgram(filters.program);
    }
    // ... validate other filter types
    return { valid: true };
}
```

### Usage in +page.server.ts

```typescript
import { validateFilters } from '$lib/server/{api-name}/validation';

export const load: PageServerLoad = async ({ url }) => {
    const filters = { /* ... */ };
    
    const validation = validateFilters(filters);
    if (!validation.valid) {
        return {
            success: false,
            error: validation.error,
            items: [],
            // ... other fields
        };
    }
    
    const result = await queryAPI(filters);
    // ...
};
```

### Why Server-Side?

- Client-side validation can be bypassed
- SvelteKit's HTML escaping prevents XSS but not injection attacks
- External APIs may not handle malformed inputs gracefully
- Validation errors should display below filters, not crash the app
