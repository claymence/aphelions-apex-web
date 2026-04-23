# /space Topic Routes

## Overview

The `/space/*` routes organize space-related content and data. Each sub-route is a "topic" that may include:

- **Single API sources** (e.g., JWST gallery from jwstapi.com)
- **Combined API sources** (merging data from multiple APIs)
- **Non-API content** (static pages, curated collections)

## Route Structure

```
/space/           # Topic overview page
/space/jwst/      # JWST gallery (jwstapi.com)
/space/{topic}/   # Future topics
```

## Topic Overview Page (`/space/`)

The root `/space/` page serves as a directory:

- Links to all available topic sub-pages
- Brief description of each topic
- Optional featured content

Implementation: Standard SvelteKit page at `src/routes/space/+page.svelte`

## Topic Sub-Pages (`/space/{topic}/`)

Each topic follows standard SvelteKit patterns:

```
src/routes/space/{topic}/
├── +page.server.ts    # Data loading
├── +page.svelte       # Topic UI
└── [components]       # Topic-specific components (optional)
```

### Data Loading Pattern

```typescript
// +page.server.ts
export const load = async ({ url }) => {
	// Parse filters from URL
	const filters = {
		/* ... */
	};

	// Call API wrapper(s)
	const result = await queryAPI(filters);

	return {
		...result,
		filters
	};
};
```

### Filter State

All filter state must be URL-based:

- Page number: `?page=2`
- Active filter: `?fileType=jpg` or `?program=1234`
- Optional filters: `?keyword=nrca1`

See [conventions.md](conventions.md) for detailed filter patterns.

## API Integration

Topics that use external APIs should:

1. **Follow the wrapper pattern**: `src/lib/server/{api-name}/`
2. **Document in skills**: `.agents/skills/{api-name}/SKILL.md`
3. **Return normalized data**: Never expose raw API shapes to UI

### Single API Example

JWST gallery uses only jwstapi.com:

- Wrapper: `src/lib/server/jwst/`
- Skill: [jwst-api](../skills/jwst-api/SKILL.md)

### Combined API Example

Future topic could merge JWST + NExSci data:

- Query both APIs in `+page.server.ts`
- Merge/normalize results server-side
- UI receives unified dataset

## Creating New Topics

1. Create route directory: `src/routes/space/{topic}/`
2. Implement `+page.server.ts` for data loading
3. Create `+page.svelte` for UI
4. Add to topic overview page (`/space/`)
5. Document any new APIs in `.agents/skills/`
