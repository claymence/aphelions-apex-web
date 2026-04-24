<script lang="ts">
	import { contained } from '$lib/styles/layout';

	function constructEmail(node: HTMLElement) {
		const user = node.getAttribute('data-user');
		const domain = node.getAttribute('data-domain');
		if (user && domain) {
			const email = `${user}@${domain}`;
			const link = document.createElement('a');
			link.href = `mailto:${email}`;
			link.textContent = email;
			node.replaceChildren(link);
		}
	}
</script>

<div class={contained}>
	<h1>Contact</h1>

	<p>
		Questions or feedback? Contact me at:
		<!-- Email obfuscated to prevent spam -->
		<span class="underline" data-user="clay" data-domain="aphelions-apex.dev" use:constructEmail
			>clay [at] aphelions-apex.dev</span
		>
	</p>
</div>
