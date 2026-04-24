<script lang="ts">
	import { contained } from '$lib/styles/layout';
	import { resolve } from '$app/paths';
	import { css } from 'styled-system/css';
	import { stack } from 'styled-system/patterns';

	const section = stack({ gap: '2' });
	const spacer = css({ height: '4' });

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
	<h1>Legal Notice & Privacy</h1>

	<div class={section}>
		<p>Information pursuant to § 5 DDG (Digitale-Dienste-Gesetz)</p>

		<p>Clemens-Benjamin Wähner</p>

		<p>
			c/o IP-Management #9852<br />
			Ludwig-Erhard-Straße 18<br />
			20459 Hamburg<br />
			Germany
		</p>
	</div>

	<div class={spacer}></div>

	<div class={section}>
		<p><strong>Contact</strong></p>

		<p>
			Email:
			<!-- Email obfuscated to prevent spam -->
			<span
				class="underline"
				data-user="clay"
				data-domain="aphelions-apex.dev"
				use:constructEmail>clay [at] aphelions-apex.dev</span
			>
		</p>
	</div>

	<div class={spacer}></div>
	<div class={spacer}></div>

	<h2>Privacy Policy</h2>

	<div class={section}>
		<p><strong>Controller</strong></p>

		<p>Clemens-Benjamin Wähner</p>

		<p>
			c/o IP-Management #9852<br />
			Ludwig-Erhard-Straße 18<br />
			20459 Hamburg<br />
			Germany
		</p>

		<p>
			Email:
			<!-- Email obfuscated to prevent spam -->
			<span
				class="underline"
				data-user="clay"
				data-domain="aphelions-apex.dev"
				use:constructEmail>clay [at] aphelions-apex.dev</span
			>
		</p>
	</div>

	<div class={spacer}></div>

	<div class={section}>
		<p><strong>1. Server Log Files</strong></p>

		<p>
			When you visit this website, the hosting provider automatically collects and stores
			information in server log files that your browser transmits. This includes:
		</p>

		<ul>
			<li>IP address</li>
			<li>Date and time of the request</li>
			<li>Requested URL / page</li>
			<li>HTTP status code</li>
			<li>Referrer URL</li>
			<li>User agent (browser type, operating system)</li>
			<li>Amount of data transferred</li>
		</ul>

		<p>
			This data is not merged with other data sources. Processing is based on Art. 6(1)(f)
			GDPR (legitimate interest). The legitimate interest lies in ensuring the stable and
			secure operation of the website. Log files are deleted after 14 days unless retention is
			required for security investigation purposes.
		</p>
	</div>

	<div class={spacer}></div>

	<div class={section}>
		<p><strong>2. Cookies</strong></p>

		<p>This website does not use cookies.</p>
	</div>

	<div class={spacer}></div>

	<div class={section}>
		<p><strong>3. Third-Party Services</strong></p>

		<p>
			This website queries the JWST API (jwstapi.com), a third-party service providing James
			Webb Space Telescope data. API requests are made server-side and do not expose your data
			to the API provider.
		</p>

		<p>
			However, telescope images/files are loaded directly by your browser from a content
			delivery network operated by the API provider (digitaloceanspaces.com, USA). When
			viewing JWST images, your IP address and browser information are transmitted to this
			server. Images are only loaded when you navigate to pages containing JWST content.
		</p>

		<p>Further information: <a href="https://jwstapi.com">https://jwstapi.com</a></p>

		<p>
			This constitutes a data transfer to a third country (USA) pursuant to Art. 49(1)(a)
			GDPR.
		</p>

		<p>
			All other assets (fonts, scripts, stylesheets) are self-hosted. This website does not
			use analytics, tracking, or advertising services.
		</p>
	</div>

	<div class={spacer}></div>

	<div class={section}>
		<p><strong>4. Contact Form</strong></p>

		<p>
			If you contact me via the contact form or email, the data you provide (name, email
			address, message content) will be stored for the purpose of processing your inquiry.
			This data is processed based on Art. 6(1)(f) GDPR (legitimate interest in responding to
			your inquiry). Your data will be deleted once your inquiry has been resolved, unless
			retention is required by law.
		</p>
	</div>

	<div class={spacer}></div>

	<div class={section}>
		<p><strong>5. Your Rights</strong></p>

		<p>Under the GDPR, you have the following rights:</p>

		<ul>
			<li>Right of access (Art. 15 GDPR)</li>
			<li>Right to rectification (Art. 16 GDPR)</li>
			<li>Right to erasure (Art. 17 GDPR)</li>
			<li>Right to restriction of processing (Art. 18 GDPR)</li>
			<li>Right to data portability (Art. 20 GDPR)</li>
			<li>Right to object to processing (Art. 21 GDPR)</li>
			<li>Right to lodge a complaint with a supervisory authority (Art. 77 GDPR)</li>
		</ul>

		<p>The competent supervisory authority is:</p>

		<p>
			Der Hamburgische Beauftragte für Datenschutz und Informationsfreiheit<br />
			Ludwig-Erhard-Str. 22<br />
			20459 Hamburg<br />
			Germany
		</p>

		<p>
			<a href="https://datenschutz-hamburg.de">https://datenschutz-hamburg.de</a>
		</p>
	</div>
</div>
