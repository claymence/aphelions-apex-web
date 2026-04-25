<script lang="ts">
	import { contained } from '$lib/styles/layout';
	import { stack } from 'styled-system/patterns';
	import type { ActionData } from './$types';

	export let form: ActionData;

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
	<div class={stack({ gap: '8' })}>
		<h1>Contact</h1>

		<p>
			Questions or feedback? Contact me at
			<!-- Email obfuscated to prevent spam -->
			<span class="underline" data-user="clay" data-domain="aphelions-apex.dev" use:constructEmail
				>clay [at] aphelions-apex.dev</span
			> or use the contact form below.
		</p>

		{#if form?.success}
			<p>Message sent. I'll get back to you soon.</p>
		{:else}
			{@const formData = form as { name?: string; email?: string; message?: string } | null}
			<form method="POST" class={stack({ gap: '4', maxWidth: 'md' })}>
				<label class={stack({ gap: '1' })}>
					<span>Name</span>
					<input type="text" name="name" required value={formData?.name ?? ''} />
				</label>

				<label class={stack({ gap: '1' })}>
					<span>Email</span>
					<input type="email" name="email" required value={formData?.email ?? ''} />
				</label>

				<label class={stack({ gap: '1' })}>
					<span>Message</span>
					<textarea name="message" rows="5" required>{formData?.message ?? ''}</textarea>
				</label>

				<!-- honeypot: hidden from real users, bots fill it -->
				<input
					type="text"
					name="website"
					autocomplete="off"
					tabindex="-1"
					aria-hidden="true"
					style="position: absolute; left: -9999px; opacity: 0;"
				/>

				{#if form?.error}
					<p>{form.error}</p>
				{/if}

				<button type="submit">Send</button>
			</form>
		{/if}
	</div>
</div>
