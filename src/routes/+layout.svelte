<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import { shell, skipLink, header, footer, mainContent } from '$lib/styles/layout';
	import { page } from '$app/stores';
	import { css } from 'styled-system/css';
	import { hstack } from 'styled-system/patterns';

	let { children } = $props();

	const siteTitle = "Aphelion's Apex";

	const title = $derived.by(() => {
		const path = $page.url.pathname;
		if (path === '/') return siteTitle;
		if (path.startsWith('/space/jwst')) return `JWST Gallery | ${siteTitle}`;
		if (path.startsWith('/space')) return `Space | ${siteTitle}`;
		if (path.startsWith('/about')) return `About | ${siteTitle}`;
		return siteTitle;
	});
</script>

<svelte:head>
	<title>{title}</title>
	<link rel="canonical" href="https://aphelions-apex.dev{$page.url.pathname}" />
	<link rel="icon" href={favicon} />
	<link rel="apple-touch-icon" href={favicon} />
	<meta
		name="description"
		content="A new web app that lets you browse images and data made with the James Webb Space Telescope."
	/>
	<link rel="me" href="https://social.tchncs.de/@clay" />
	<script>
		(function () {
			const theme = localStorage.getItem('theme') || 'dark';
			document.documentElement.classList.toggle('dark', theme === 'dark');
		})();
	</script>
</svelte:head>

<div class={shell}>
	<a href="#main" class={skipLink}>Skip to content</a>
	<header class={header}>
		<div class={hstack({ gap: '6', justify: 'flex-end' })}>
			<Nav />
			<ThemeToggle />
		</div>
	</header>

	<main id="main" class={mainContent}>
		{@render children()}
	</main>

	<Footer class={footer} />
</div>
