<script lang="ts">
	import JwstGallery from '$lib/components/jwst/JwstGallery.svelte';
	import JwstFilters from '$lib/components/jwst/JwstFilters.svelte';
	import JwstPagination from '$lib/components/jwst/JwstPagination.svelte';
	import JwstDataAttribution from '$lib/components/jwst/JwstDataAttribution.svelte';
	import { contained } from '$lib/styles/layout';
	import { css } from 'styled-system/css';

	let { data } = $props();

	const noResults = css({
		textAlign: 'center',
		padding: '12',
		color: 'foreground.muted'
	});

	const noResultsText = css({
		margin: '2',
		fontSize: 'lg'
	});

	const errorDetail = css({
		fontSize: 'sm',
		color: 'foreground.muted'
	});

	const pageTitle = css({
		fontSize: '3xl',
		marginBottom: '6',
		color: 'foreground.primary'
	});
</script>

<div class={contained}>
	<h1 class={pageTitle}>JWST Gallery</h1>

	<JwstFilters filters={data.filters} />

	{#if data.success === false}
		<div class={noResults}>
			<p class={noResultsText}>No results found</p>
			{#if data.error}
				<p class={errorDetail}>{data.error}</p>
			{/if}
		</div>
	{:else if data.items.length === 0}
		<div class={noResults}>
			<p class={noResultsText}>No results found</p>
		</div>
	{:else}
		<JwstGallery items={data.items} />
		<JwstPagination page={data.page} hasMore={data.hasMore} perPage={data.perPage} />
	{/if}

	<JwstDataAttribution />
</div>
