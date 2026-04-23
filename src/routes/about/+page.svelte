<script lang="ts">
	import { contained } from '$lib/styles/layout';

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	let { data } = $props();

	function constructEmail(node: HTMLElement) {
		const user = node.getAttribute('data-user');
		const domain = node.getAttribute('data-domain');
		if (user && domain) {
			const email = `${user}@${domain}`;
			const link = document.createElement('a');
			link.href = `mailto:${email}`;
			link.textContent = email;
			node.appendChild(link);
		}
	}
</script>

<div class={contained}>
	<h1>About</h1>

	<div>
		<p>This is a private project (work in progress).</p>

		<p>
			Questions or feedback? Contact me at:
			<!-- Email obfuscated to prevent spam -->
			<span class="underline" data-user="clay" data-domain="aphelions-apex.dev" use:constructEmail
			></span>
		</p>
	</div>
</div>
