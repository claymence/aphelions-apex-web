<script lang="ts">
	import { css } from 'styled-system/css';
	import { resolve } from '$app/paths';

	let { class: className = '' }: { class?: string } = $props();

	const footerLink = css({
		color: 'foreground.secondary',
		textDecoration: 'none',
		fontSize: 'md',
		transition: 'color 0.2s',
		'&:hover': {
			color: 'foreground.primary'
		}
	});
</script>

<footer class={className} aria-label="Footer">
	<a href={resolve('/about')} class={footerLink}>About</a>
</footer>
