<script lang="ts">
	import type { JWSTItem } from '$lib';
	import { css } from 'styled-system/css';
	import { card } from 'styled-system/recipes';
	import { flex } from 'styled-system/patterns';

	interface Props {
		items: JWSTItem[];
	}

	let { items = [] }: Props = $props();

	function isImage(fileType: string): boolean {
		const imageTypes = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg'];
		return imageTypes.includes(fileType.toLowerCase());
	}

	// Gallery grid: 1 col mobile, 2 col tablet, 3 col desktop
	const galleryGrid = css({
		display: 'grid',
		gridTemplateColumns: 'repeat(1, 1fr)',
		gap: '4',
		marginTop: '8',
		sm: {
			gridTemplateColumns: 'repeat(2, 1fr)'
		},
		lg: {
			gridTemplateColumns: 'repeat(3, 1fr)'
		}
	});

	const image = css({
		width: 'full',
		height: 'auto',
		borderRadius: 'md',
		display: 'block'
	});

	const info = flex({
		direction: 'column',
		gap: '1',
		marginTop: '2',
		paddingX: '1'
	});

	const meta = css({
		fontSize: 'xs',
		color: 'foreground.secondary'
	});

	const description = css({
		fontSize: 'xs',
		color: 'foreground.secondary',
		display: 'block'
	});

	const filePlaceholder = flex({
		direction: 'column',
		justify: 'center',
		align: 'center',
		gap: '2',
		padding: '4',
		textAlign: 'center',
		aspectRatio: '1',
		backgroundColor: 'background.muted',
		borderRadius: 'md'
	});

	const fileType = css({
		fontSize: 'sm',
		color: 'foreground.muted',
		fontWeight: 'medium'
	});

	const fileMessage = css({
		fontSize: 'xs',
		color: 'foreground.muted'
	});

	const fileDownload = css({
		fontSize: 'sm',
		color: 'primary',
		textDecoration: 'none',
		marginTop: '1',
		_hover: {
			textDecoration: 'underline'
		}
	});
</script>

{#if items.length === 0}
	<p>No images found.</p>
{:else}
	<div class={galleryGrid}>
		{#each items as item (item.id)}
			<article class={card()}>
				{#if item.url}
					{#if isImage(item.fileType)}
						<img
							src={item.url}
							alt={item.id}
							loading="lazy"
							decoding="async"
							class={image}
						/>
					{:else}
						<div class={filePlaceholder}>
							<span class={fileType}>📄 {item.fileType.toUpperCase()} file</span>
							<span class={fileMessage}>Preview not available</span>
							<a
								href={item.url}
								class={fileDownload}
								download
								rel="external"
								aria-label="Download {item.fileType.toUpperCase()} file for {item.observationId ||
									item.id}"
							>
								Download
							</a>
						</div>
					{/if}
				{:else if item.thumbnailUrl}
					<img
						src={item.thumbnailUrl}
						alt={item.id}
						loading="lazy"
						decoding="async"
						class={image}
					/>
				{/if}
				<div class={info}>
					{#if item.observationId}
						<p class={meta}><strong>Observation ID:</strong> {item.observationId}</p>
					{/if}
					{#if item.program}
						<p class={meta}><strong>Program ID:</strong> {item.program}</p>
					{/if}
					{#if item.instruments}
						<p class={meta}><strong>Instruments:</strong> {item.instruments}</p>
					{/if}
					{#if item.suffix}
						<p class={meta}><strong>Suffix:</strong> {item.suffix}</p>
					{/if}
					{#if item.fileType}
						<p class={meta}><strong>File type:</strong> {item.fileType}</p>
					{/if}
					{#if item.description}
						<p class={description}>
							<strong>Description:</strong>
							{item.description}
						</p>
					{/if}
				</div>
			</article>
		{/each}
	</div>
{/if}
