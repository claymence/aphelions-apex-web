// Unified JWST data types

/**
 * Raw API response structure (varies by endpoint)
 */
export interface JWSTApiResponseRaw {
	statusCode: number;
	body: JWSTApiItemRaw[] | JWSTProgramListRaw | JWSTSuffixListRaw | null;
	error: string | null;
}

/**
 * Raw item from API (varies by endpoint)
 */
export interface JWSTApiItemRaw {
	id: string;
	observation_id?: string;
	program?: string | null;
	details?: unknown;
	file_type?: string;
	thumbnail?: string;
	location?: string;
	instrument?: string;
	suffix?: string;
	[key: string]: unknown; // Allow for endpoint-specific fields
}

/**
 * Program list response
 */
export interface JWSTProgramListRaw {
	programs: string[];
}

/**
 * Suffix list response
 */
export interface JWSTSuffixListRaw {
	suffixes: string[];
}

/**
 * Unified internal JWST item model
 */
export interface JWSTItem {
	id: string;
	program: string | null;
	instrument: string | null;
	observationId: string | null;
	suffix: string | null;
	fileType: string;
	url: string;
	thumbnailUrl: string | null;
	details: unknown;
	description: string | null;
	instruments: string | null;
}

/**
 * Filter options for querying JWST data
 */
export interface JWSTFilters {
	program?: string;
	suffix?: string;
	fileType?: string;
	observationId?: string;
	page?: number;
	perPage?: number;
}

/**
 * Unified query response
 */
export interface JWSTQueryResponse {
	success: boolean;
	error?: string;
	items: JWSTItem[];
	page: number;
	perPage: number;
	hasMore: boolean;
}
