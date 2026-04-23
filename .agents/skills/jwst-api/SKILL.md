---
name: jwst-api
description: How to query JWST data from jwstapi.com
compatibility: opencode
metadata:
    audience: developer
    workflow: api handling
---

# Querying JWST Data

## Overview

The JWST API (jwstapi.com) provides access to James Webb Space Telescope observation data. This skill covers the specific implementation patterns for this API.

## Standard Pattern

```typescript
import { queryJWST } from '$lib/server/jwst';
import type { JWSTFilters } from '$lib/server/jwst';

const filters: JWSTFilters = { fileType: 'jpg', page: 1 };
const result = await queryJWST(filters);

if (result.success) {
	// Use result.items, result.hasMore
} else {
	// Handle result.error
}
```

## Available Filters

| Field           | Allowed Values                       | Example                                                    |
| --------------- | ------------------------------------ | ---------------------------------------------------------- |
| `fileType`      | `jpg`, `png`, `ecsv`, `fits`, `json` | `fileType: 'fits'`                                         |
| `program`       | String program ID                    | `program: "2734"`                                          |
| `suffix`        | String (e.g., `_cal`, `_i2d`)        | `suffix: "_cal"`                                           |
| `observationId` | Full observation ID                  | `observationId: "jw02731002001_02107_00004_mirimage_o002"` |
| `keyword`       | String (searches filename parts)     | `keyword: "nrca1"`                                         |
| `page`          | Number (default: 1)                  | `page: 2`                                                  |
| `perPage`       | Number (default: 12)                 | `perPage: 20`                                              |

**Note**: Only ONE of `fileType`, `program`, `suffix`, or `observationId` can be active at a time (API limitation). The `keyword` filter can be combined with any of these.

## Keyword Search

The keyword filter searches within filenames for parts enclosed by underscores:

**Example**: `keyword: "nrca1"` matches `jw02731001002_02101_00005_nrca1_o001_crf_thumb.jpg` because it contains `_nrca1_`.

**Implementation**: The server scans up to 20 API pages to find matching items, then paginates results.

## Response Shape

```typescript
interface JWSTQueryResponse {
	success: boolean;
	items: JWSTItem[];
	page: number;
	perPage: number;
	hasMore: boolean; // Not total count - API doesn't provide it
	error?: string;
}
```

## File Structure

```
src/lib/server/jwst/
  ├── index.ts           # Main wrapper (queryJWST)
  ├── endpoints.ts       # Endpoint URL builders
  ├── client.ts          # HTTP client with auth
  ├── mapper.ts          # Response normalization
  ├── types.ts           # TypeScript interfaces
  └── cache.ts           # In-memory caching with TTL
```

## Endpoint Selection

The wrapper automatically selects the best endpoint based on filters:

```
Priority: observationId > program > suffix > fileType

observationId  → /observation/{id}
program        → /program/id/{id}
suffix         → /all/suffix/{suffix}
fileType       → /all/type/{fileType}
```

## JWST-Specific Patterns

### Pagination: hasMore

The JWST API doesn't return total counts. Use `hasMore` instead:

```typescript
// hasMore is true if we received a full page
hasMore = items.length === perPage;
```

### Filename Keyword Matching

Keywords match parts of the filename (split by underscores):

```typescript
// filename: jw02731001002_02101_00005_nrca1_o001_crf_thumb.jpg
// keyword: "nrca1" matches because "nrca1" is a filename part
// keyword: "crf" also matches
```

## Common Suffixes

Popular suffixes to filter by:

- `_cal` - Calibrated exposure
- `_i2d` - Rectified 2D image
- `_thumb` - Thumbnail image
- `_rate` - Count rate (L2a)
- `_x1d` - 1D extracted spectrum

## Caching

Query results are cached using an in-memory cache with the following behavior:

- **TTL**: 5 minutes (`CACHE_TTL.QUERY_RESULTS`)
- **Cache Key**: Generated from filter parameters via `generateCacheKey(filters)`
- **Pattern**: Cache check → API fetch (on miss) → Normalize → Cache store → Return

```typescript
// In src/lib/server/jwst/index.ts
const cacheKey = generateCacheKey({ ...filters });
const cached = cache.get<JWSTQueryResponse>(cacheKey);
if (cached) {
	return cached; // Return cached result
}

// ... fetch and normalize ...

cache.set(cacheKey, result, CACHE_TTL.QUERY_RESULTS);
```

## Error Handling

Errors return `{ success: false, error: string, items: [] }` - never throw to the UI.

Common errors:

- Invalid suffix → "Unexpected response format from JWST API"
- Network issues → Error message from fetch

**UI Pattern**: Show "No results" below filters, don't replace the entire UI.
