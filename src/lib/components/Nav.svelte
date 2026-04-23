<script lang="ts">
	import { css } from 'styled-system/css';
	import { resolve } from '$app/paths';

	let { class: className = '' }: { class?: string } = $props();

	const nav = css({
		display: 'flex',
		alignItems: 'center'
	});

	const navList = css({
		display: 'flex',
		alignItems: 'center',
		gap: '6',
		listStyle: 'none',
		margin: 0,
		padding: 0
	});

	const navLink = css({
		color: 'foreground.secondary',
		textDecoration: 'none',
		transition: 'color 0.2s',
		'&:hover': {
			color: 'foreground.primary'
		}
	});
</script>

<nav class="{nav} {className}" aria-label="Main navigation">
	<ul class={navList}>
		<li><a href={resolve('/space')} class={navLink}>Space</a></li>
		<li><a href={resolve('/')} class={navLink}>Home</a></li>
	</ul>
</nav>
