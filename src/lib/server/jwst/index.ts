import { jwstFetch } from './client';
import { JWSTEndpoints } from './endpoints';
import { normalizeJWSTItems } from './mapper';
import { cache, CACHE_TTL, generateCacheKey } from './cache';
import type { JWSTFilters, JWSTQueryResponse, JWSTApiItemRaw } from './types';

// Re-export types for use in components and other modules
export type { JWSTItem, JWSTFilters, JWSTQueryResponse } from './types';

const DEFAULT_PER_PAGE = 6;
const DEFAULT_PAGE = 1;

/**
 * Determine which endpoint to use based on filters
 * Priority: observationId > program > suffix > fileType
 */
function getEndpoint(filters: JWSTFilters): string {
	const { program, suffix, fileType, observationId } = filters;

	if (observationId) {
		return JWSTEndpoints.byObservation(observationId);
	}
	if (program) {
		return JWSTEndpoints.byProgram(program);
	}
	if (suffix) {
		return JWSTEndpoints.bySuffix(suffix);
	}
	return JWSTEndpoints.allByType(fileType || 'jpg');
}

/**
 * Unified query function for JWST data
 *
 * Simple approach:
 * 1. Pick best endpoint based on filters
 * 2. Fetch single page from API
 * 3. Return results with hasMore flag
 */
export async function queryJWST(filters: JWSTFilters = {}): Promise<JWSTQueryResponse> {
	const { page = DEFAULT_PAGE, perPage = DEFAULT_PER_PAGE } = filters;

	try {
		const endpoint = getEndpoint(filters);

		// Check cache for this query
		const cacheKey = generateCacheKey({ ...filters });
		const cached = cache.get<JWSTQueryResponse>(cacheKey);
		if (cached) {
			return cached;
		}

		// Fetch single page from API
		const params = { page: String(page), perPage: String(perPage) };
		const response = await jwstFetch(endpoint, params);

		if (!Array.isArray(response.body)) {
			return {
				success: false,
				error: 'Unexpected response format from JWST API',
				items: [],
				page,
				perPage,
				hasMore: false
			};
		}

		const items = response.body as JWSTApiItemRaw[];
		const hasMore = items.length === perPage;

		const normalizedItems = normalizeJWSTItems(items);

		const result: JWSTQueryResponse = {
			success: true,
			items: normalizedItems,
			page,
			perPage,
			hasMore
		};

		// Cache the response
		cache.set(cacheKey, result, CACHE_TTL.QUERY_RESULTS);

		return result;
	} catch (error) {
		const errorMessage =
			error instanceof Error
				? error.message
				: 'Unknown error occurred while fetching JWST data';

		console.error('[jwst] Query failed:', errorMessage, error);

		return {
			success: false,
			error: errorMessage,
			items: [],
			page: filters.page ?? DEFAULT_PAGE,
			perPage: filters.perPage ?? DEFAULT_PER_PAGE,
			hasMore: false
		};
	}
}
