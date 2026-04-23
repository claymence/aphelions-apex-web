import { env } from '$env/dynamic/private';
import type { JWSTApiResponseRaw } from './types';

const JWST_API_KEY = env.JWST_API_KEY;
const JWST_API_BASE = 'https://api.jwstapi.com';

/**
 * Raw API client - only responsible for fetching and error handling
 * Never knows about UI or business logic
 */
export async function jwstFetch(
	endpoint: string,
	params?: Record<string, string | number>
): Promise<JWSTApiResponseRaw> {
	if (!JWST_API_KEY) {
		throw new Error('JWST_API_KEY environment variable is not set');
	}

	const url = new URL(`${JWST_API_BASE}${endpoint}`);

	if (params) {
		Object.entries(params).forEach(([key, value]) => {
			if (value !== undefined && value !== null) {
				url.searchParams.set(key, String(value));
			}
		});
	}

	const response = await fetch(url.toString(), {
		headers: {
			'X-API-KEY': JWST_API_KEY
		}
	});

	if (!response.ok) {
		throw new Error(`JWST API request failed: ${response.status} ${response.statusText}`);
	}

	const data = (await response.json()) as JWSTApiResponseRaw;

	if (data.statusCode !== 200) {
		throw new Error(`JWST API returned error: ${data.error ?? 'Unknown error'}`);
	}

	return data;
}
