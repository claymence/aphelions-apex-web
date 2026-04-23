<script lang="ts">
	import { goto } from '$app/navigation';
	import { SvelteURLSearchParams } from 'svelte/reactivity';
	import type { JWSTFilters } from '$lib';
	import { filterMenu, filterSection, filterLabel } from '$lib/styles/layout';
	import { button, input } from 'styled-system/recipes';

	let { filters }: { filters: JWSTFilters } = $props();

	const fileTypes = ['jpg', 'png', 'ecsv', 'fits', 'json'];
	const MIN_SEARCH_LENGTH = 3;

	// Active filter type from URL (read-only, for display purposes)
	const activeFilterType = $derived(
		filters.observationId
			? 'observationId'
			: filters.program
				? 'program'
				: filters.suffix
					? 'suffix'
					: 'fileType'
	);

	// Local state: which filter input is currently visible (user can browse without submitting)
	// Starts as active filter from URL, but user can change it independently
	// eslint-disable-next-line svelte/prefer-writable-derived
	let visibleFilterType = $state('fileType');

	// Sync visible filter with active filter on mount and when URL changes
	$effect(() => {
		visibleFilterType = activeFilterType;
	});

	// Local state for text input values - initialized from URL, then user-controlled
	// These persist when switching filter types so users don't lose their input
	// svelte-ignore state_referenced_locally
	let localProgram = $state(filters.program ?? '');
	// svelte-ignore state_referenced_locally
	let localSuffix = $state(filters.suffix ?? '');
	// svelte-ignore state_referenced_locally
	let localObservationId = $state(filters.observationId ?? '');

	// Sync text inputs when filters change (e.g., back/forward navigation)
	$effect(() => {
		localProgram = filters.program ?? '';
		localSuffix = filters.suffix ?? '';
		localObservationId = filters.observationId ?? '';
	});

	function isValidSearchValue(value: string): boolean {
		return value.length >= MIN_SEARCH_LENGTH;
	}

	function navigateWithFilter(updates: Partial<JWSTFilters>) {
		const params = new SvelteURLSearchParams();

		// Set only the new filter value
		if (updates.fileType) {
			params.set('fileType', updates.fileType);
		} else if (updates.program) {
			params.set('program', updates.program);
		} else if (updates.suffix) {
			params.set('suffix', updates.suffix);
		} else if (updates.observationId) {
			params.set('observationId', updates.observationId);
		}

		// eslint-disable-next-line svelte/no-navigation-without-resolve
		void goto(`?${params.toString()}`, { keepFocus: true });
	}

	function handleFilterTypeChange(newType: string) {
		visibleFilterType = newType;
		// No navigation - user is just browsing the filter UI
	}

	function handleTextSubmit(
		event: KeyboardEvent,
		key: 'program' | 'suffix' | 'observationId',
		value: string
	) {
		if (event.key === 'Enter') {
			event.preventDefault();
			if (isValidSearchValue(value)) {
				navigateWithFilter({ [key]: value });
			}
		}
	}

	// Toggle for showing/hiding filters
	let showFilters = $state(false); // true for showing, false for hiding by default
	function toggleFilters() {
		showFilters = !showFilters;
	}
</script>

<button class={button({ variant: 'secondary', size: 'sm' })} onclick={toggleFilters}>
	{showFilters ? 'Hide Filters' : 'Show Filters'}
</button>

<div class={filterMenu} hidden={!showFilters}>
	<div class={filterSection}>
		<label class={filterLabel}>
			Filter all data by:
			<select
				class={input({ size: 'sm' })}
				value={visibleFilterType}
				onchange={(e) => handleFilterTypeChange(e.currentTarget.value)}
			>
				<option value="fileType">File Type</option>
				<option value="suffix">Suffix</option>
				<option value="program">Program ID</option>
				<option value="observationId">Observation ID</option>
			</select>
		</label>

		{#if visibleFilterType === 'fileType'}
			<label class={filterLabel}>
				Select type:
				<select
					class={input({ size: 'sm' })}
					value={filters.fileType ?? 'jpg'}
					onchange={(e) => navigateWithFilter({ fileType: e.currentTarget.value })}
				>
					{#each fileTypes as type (type)}
						<option value={type}>{type.toUpperCase()}</option>
					{/each}
				</select>
			</label>
		{:else if visibleFilterType === 'program'}
			<label class={filterLabel}>
				Enter Program ID (press Enter):
				<input
					type="text"
					class={input()}
					bind:value={localProgram}
					placeholder="e.g., 2734"
					onkeydown={(e) => handleTextSubmit(e, 'program', localProgram)}
				/>
			</label>
		{:else if visibleFilterType === 'suffix'}
			<label class={filterLabel}>
				Enter Suffix (press Enter):
				<input
					type="text"
					class={input()}
					bind:value={localSuffix}
					placeholder="e.g., _cal, _i2d"
					onkeydown={(e) => handleTextSubmit(e, 'suffix', localSuffix)}
				/>
			</label>
		{:else if visibleFilterType === 'observationId'}
			<label class={filterLabel}>
				Enter Observation ID (press Enter):
				<input
					type="text"
					class={input()}
					bind:value={localObservationId}
					placeholder="e.g., jw02731002001_02107_00004_mirimage_o002"
					onkeydown={(e) => handleTextSubmit(e, 'observationId', localObservationId)}
				/>
			</label>
		{/if}
	</div>
</div>
