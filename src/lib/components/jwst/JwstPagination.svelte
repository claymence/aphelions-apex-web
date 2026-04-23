<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { SvelteURLSearchParams } from 'svelte/reactivity';
	import { css } from 'styled-system/css';
	import { button, input } from 'styled-system/recipes';

	interface Props {
		page: number;
		hasMore: boolean;
		perPage: number;
	}

	let { page: currentPageNum, hasMore, perPage }: Props = $props();

	// Local state for input values - initialized from props, then user-controlled
	// svelte-ignore state_referenced_locally
	let localPage = $state(String(currentPageNum));
	// svelte-ignore state_referenced_locally
	let localPerPage = $state(String(perPage));

	// Sync with props when they change (e.g., back/forward navigation)
	$effect(() => {
		localPage = String(currentPageNum);
		localPerPage = String(perPage);
	});

	function navigateToPage(newPage: number, newPerPage?: number) {
		// Get current URL params from $app/state
		const params = new SvelteURLSearchParams(page.url.searchParams.toString());

		// Update page
		if (newPage > 1) {
			params.set('page', String(newPage));
		} else {
			params.delete('page');
		}

		// Update perPage if provided
		if (newPerPage && newPerPage !== 3) {
			params.set('perPage', String(newPerPage));
		} else if (newPerPage === 3) {
			params.delete('perPage');
		}

		// eslint-disable-next-line svelte/no-navigation-without-resolve
		void goto(`?${params.toString()}`, { keepFocus: true });
	}

	function goToPreviousPage() {
		if (currentPageNum > 1) {
			navigateToPage(currentPageNum - 1);
		}
	}

	function goToNextPage() {
		navigateToPage(currentPageNum + 1);
	}

	function handlePageInput(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			event.preventDefault();
			const pageNum = parseInt(localPage, 10);
			if (!isNaN(pageNum) && pageNum >= 1) {
				navigateToPage(pageNum);
			}
		}
	}

	function handlePerPageInput(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			event.preventDefault();
			const newPerPage = parseInt(localPerPage, 10);
			if (!isNaN(newPerPage) && newPerPage >= 1 && newPerPage <= 100) {
				// Reset to page 1 when changing items per page
				navigateToPage(1, newPerPage);
			}
		}
	}

	const pagination = css({
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		gap: '4',
		marginTop: '8',
		padding: '4'
	});

	const controls = css({
		display: 'flex',
		gap: '4',
		alignItems: 'center'
	});

	const inputGroup = css({
		display: 'flex',
		alignItems: 'center',
		gap: '2'
	});

	const label = css({
		fontSize: 'sm',
		color: 'foreground.secondary'
	});

	const numberInput = css({
		width: '16',
		textAlign: 'center'
	});

	const noMore = css({
		color: 'foreground.muted',
		fontStyle: 'italic'
	});

	const navigationButtons = css({
		display: 'flex',
		gap: '2'
	});

	const arrowButton = css({
		minWidth: '12',
		fontSize: 'xl',
		fontWeight: 'bold'
	});
</script>

<div class={pagination}>
	<div class={controls}>
		<div class={navigationButtons}>
			<button
				onclick={goToPreviousPage}
				type="button"
				disabled={currentPageNum <= 1}
				class={`${button({ variant: 'secondary', size: 'sm' })} ${arrowButton}`}
			>
				←
			</button>

			<div class={inputGroup}>
				<span class={label}>Page</span>
				<input
					type="number"
					min="1"
					class={`${input({ size: 'sm' })} ${numberInput}`}
					bind:value={localPage}
					onkeydown={handlePageInput}
				/>
			</div>

			<button
				onclick={goToNextPage}
				type="button"
				disabled={!hasMore}
				class={`${button({ variant: 'secondary', size: 'sm' })} ${arrowButton}`}
			>
				→
			</button>
		</div>

		<div class={inputGroup}>
			<span class={label}>Show</span>
			<input
				type="number"
				min="1"
				max="100"
				class={`${input({ size: 'sm' })} ${numberInput}`}
				bind:value={localPerPage}
				onkeydown={handlePerPageInput}
			/>
			<span class={label}>per page</span>
		</div>
	</div>

	{#if !hasMore}
		<span class={noMore}>No more items</span>
	{/if}
</div>
