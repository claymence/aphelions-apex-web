import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const queryString = url.search;
	throw redirect(302, `/space/jwst${queryString ? '?' + url.searchParams.toString() : ''}`);
};
