import adapter from '@sveltejs/adapter-node';

export default {
	kit: {
		adapter: adapter(),
		alias: {
			'styled-system': './styled-system'
		}
	}
};
