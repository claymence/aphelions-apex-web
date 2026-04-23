<script>
	import { contained } from '$lib/styles/layout';
	import { css } from 'styled-system/css';
	import { stack } from 'styled-system/patterns';
	import { resolve } from '$app/paths';

	const pageTitle = css({
		fontSize: '4xl',
		marginBottom: '4',
		color: 'foreground.primary'
	});

	const description = css({
		fontSize: 'xl',
		color: 'foreground.secondary',
		marginBottom: '8',
		maxWidth: '600px'
	});

	const cardTitle = css({
		fontSize: 'xl',
		marginBottom: '2',
		color: 'foreground.primary'
	});

	const cardText = css({
		fontSize: 'md',
		color: 'foreground.secondary',
		margin: 0,
		lineHeight: 'relaxed'
	});

	const linkCard = css({
		backgroundColor: 'background.subtle',
		borderRadius: 'lg',
		padding: '6',
		transition: 'background-color 0.2s',
		cursor: 'pointer',
		_hover: {
			backgroundColor: 'background.muted'
		}
	});
</script>

<div class={contained}>
	<div class={stack({ gap: '6', padding: '8' })}>
		<h1 class={pageTitle}>Space</h1>

		<p class={description}>
			Explore data from various space missions and astronomical sources.
		</p>

		<a href={resolve('/space/jwst')} class={linkCard}>
			<h2 class={cardTitle}>James Webb Space Telescope (JWST)</h2>
			<p class={cardText}>Browse images and data made with the James Webb Space Telescope.</p>
		</a>
	</div>
</div>
