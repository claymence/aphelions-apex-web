export function GET() {
	const baseUrl = 'https://aphelions-apex.dev';

	const pages = [
		{ path: '/', priority: '1.0' },
		{ path: '/space', priority: '0.8' },
		{ path: '/space/jwst', priority: '0.8' },
		{ path: '/about', priority: '0.5' },
		{ path: '/contact', priority: '0.5' },
		{ path: '/legal', priority: '0.3' }
	];

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
	.map(
		(p) => `  <url>
    <loc>${baseUrl}${p.path}</loc>
    <priority>${p.priority}</priority>
  </url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(xml.trim(), {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=3600'
		}
	});
}
