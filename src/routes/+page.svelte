<script>
	import AstroBG from '$lib/components/AstroBG.svelte';
	import ClockWidget from '$lib/components/ClockWidget.svelte';
	import { fullBleed } from '$lib/styles/layout';
	import { css } from 'styled-system/css';

	const container = css({
		position: 'relative',
		height: 'full',
		width: 'full',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	});

	const clockPosition = css({
		position: 'absolute',
		top: '10',
		left: '15',
		zIndex: '1'
	});

	const backgroundPosition = css({
		position: 'absolute',
		inset: '0',
		opacity: '0.2',
		pointerEvents: 'none',
		zIndex: '0'
	});
</script>

<div class={fullBleed}>
	<div class={container}>
		<div class={clockPosition}>
			<ClockWidget />
		</div>
		<div class={backgroundPosition}>
			<AstroBG />
		</div>
	</div>
</div>
