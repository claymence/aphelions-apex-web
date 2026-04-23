<script lang="ts">
	import { onMount } from 'svelte';
	import { css } from 'styled-system/css';

	let time = $state(new Date());

	onMount(() => {
		const interval = setInterval(() => {
			time = new Date();
		}, 1000);

		return () => clearInterval(interval);
	});

	const clockStyle = css({
		fontFamily: 'mono',
		fontSize: '4xl',
		letterSpacing: 'widest',
		color: 'foreground.secondary'
	});
</script>

<div class={clockStyle}>
	{time.toLocaleTimeString()}
</div>
