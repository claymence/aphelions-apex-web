import type { JWSTApiItemRaw, JWSTItem } from './types';

/**
 * Get description from details object
 */
function getDescription(details: unknown): string | null {
	if (!details || typeof details !== 'object') return null;
	return ((details as Record<string, unknown>).description as string | null) ?? null;
}

/**
 * Get instruments from details object
 */
function getInstruments(details: unknown): string | null {
	if (!details || typeof details !== 'object') return null;
	const instruments = (details as Record<string, unknown>).instruments;
	if (!Array.isArray(instruments)) return null;
	return (
		instruments
			.map((inst: unknown) => {
				if (typeof inst === 'object' && inst !== null) {
					return (inst as Record<string, unknown>).instrument;
				}
				return inst;
			})
			.filter(Boolean)
			.join(', ') || null
	);
}

/**
 * Get suffix from details object
 */
function getSuffix(details: unknown): string | null {
	if (details && typeof details === 'object') {
		return ((details as Record<string, unknown>).suffix as string | null) ?? null;
	}
	return null;
}

/**
 * Normalize raw API response items to unified internal model
 */
export function normalizeJWSTItem(raw: JWSTApiItemRaw): JWSTItem | null {
	if (!raw.id) return null;

	const fileType = raw.file_type ?? 'unknown';
	const url = raw.location ?? '';
	if (!url) return null;

	const observationId = raw.observation_id ?? raw.id ?? null;
	const program = raw.program ?? null;
	const instrument = raw.instrument ?? null;
	const thumbnailUrl = raw.thumbnail ?? null;

	// Extract suffix, description, and instruments from details object
	const suffix = getSuffix(raw.details);
	const description = getDescription(raw.details);
	const instruments = getInstruments(raw.details);

	return {
		id: raw.id,
		program,
		instrument,
		observationId,
		suffix,
		fileType,
		url,
		thumbnailUrl,
		details: raw.details,
		description,
		instruments
	};
}

/**
 * Normalize array of raw items
 */
export function normalizeJWSTItems(rawItems: JWSTApiItemRaw[]): JWSTItem[] {
	return rawItems.map(normalizeJWSTItem).filter((item): item is JWSTItem => item !== null);
}
