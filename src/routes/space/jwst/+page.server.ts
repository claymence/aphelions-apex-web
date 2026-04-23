import { queryJWST, type JWSTFilters } from '$lib';
import { validateFilters } from '$lib/server/jwst/validation';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const program = url.searchParams.get('program') || undefined;
	const suffix = url.searchParams.get('suffix') || undefined;
	const observationId = url.searchParams.get('observationId') || undefined;
	const fileTypeFromUrl = url.searchParams.get('fileType') || url.searchParams.get('type');

	const fileType = fileTypeFromUrl || (!program && !suffix && !observationId ? 'jpg' : undefined);

	const filters: JWSTFilters = {
		program,
		suffix,
		fileType,
		observationId,
		page: Number(url.searchParams.get('page') || '1'),
		perPage: Number(url.searchParams.get('perPage') || '3')
	};

	// Validate filters before querying
	const validation = validateFilters(filters);
	if (!validation.valid) {
		return {
			success: false,
			error: validation.error,
			items: [],
			page: filters.page ?? 1,
			perPage: filters.perPage ?? 3,
			hasMore: false,
			filters
		};
	}

	const result = await queryJWST(filters);

	if (result.success === false) {
		return {
			success: false,
			error: result.error,
			items: [],
			page: filters.page ?? 1,
			perPage: filters.perPage ?? 3,
			hasMore: false,
			filters
		};
	}

	return {
		success: true,
		items: result.items,
		page: result.page,
		perPage: result.perPage,
		hasMore: result.hasMore,
		filters
	};
};
