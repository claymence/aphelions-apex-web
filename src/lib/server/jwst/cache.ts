// Simple in-memory cache with TTL for server-side data
// Uses SvelteKit's server-side singleton pattern

interface CacheEntry<T> {
	data: T;
	expiresAt: number;
}

class MemoryCache {
	private cache = new Map<string, CacheEntry<unknown>>();
	private maxSize: number;

	constructor(maxSize: number = 1000) {
		this.maxSize = maxSize;
		this.startCleanupInterval();
	}

	get<T>(key: string): T | null {
		const entry = this.cache.get(key);
		if (!entry) return null;

		if (Date.now() > entry.expiresAt) {
			this.cache.delete(key);
			return null;
		}

		// Move to end (most recently used) for LRU behavior
		this.cache.delete(key);
		this.cache.set(key, entry);

		return entry.data as T;
	}

	set<T>(key: string, data: T, ttlMs: number): void {
		// Evict oldest entry if at capacity
		if (this.cache.size >= this.maxSize) {
			const firstKey = this.cache.keys().next().value;
			if (firstKey !== undefined) {
				this.cache.delete(firstKey);
			}
		}

		this.cache.set(key, {
			data,
			expiresAt: Date.now() + ttlMs
		});
	}

	delete(key: string): void {
		this.cache.delete(key);
	}

	clear(): void {
		this.cache.clear();
	}

	// Clean up expired entries
	cleanup(): void {
		const now = Date.now();
		for (const [key, entry] of this.cache.entries()) {
			if (now > entry.expiresAt) {
				this.cache.delete(key);
			}
		}
	}

	// Run cleanup every 10 minutes
	private startCleanupInterval(): void {
		setInterval(() => this.cleanup(), 10 * 60 * 1000);
	}
}

// Singleton instance for server-side caching
export const cache = new MemoryCache();

// Cache TTL values (in milliseconds)
export const CACHE_TTL = {
	QUERY_RESULTS: 5 * 60 * 1000 // 5 minutes - query results
} as const;

// Generate cache key from filters
export function generateCacheKey(filters: Record<string, unknown>): string {
	return JSON.stringify(filters);
}
