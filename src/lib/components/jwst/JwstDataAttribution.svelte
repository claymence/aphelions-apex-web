<script lang="ts">
	import { css } from 'styled-system/css';

	const attributionContainer = css({
		display: 'flex',
		flexWrap: 'wrap',
		gap: '4',
		textAlign: 'center'
	});

	const attributionContent = css({
		marginTop: '12',
		marginBottom: '6',
		width: 'full',
		paddingX: '8'
	});

	const link = css({
		color: 'primary',
		textDecoration: 'none',
		'&:hover': {
			textDecoration: 'underline',
			color: 'primary.hover'
		}
	});
</script>

<div class={attributionContainer}>
	<div class={attributionContent}>
		The displayed data is provided via API by
		<a href="https://jwstapi.com/" target="_blank" rel="noopener noreferrer" class={link}>
			jwstapi.com</a
		>
		and sourced from
		<a
			href="https://outerspace.stsci.edu/display/MASTDATA/JWST+AWS+Bulk+Download+Scripts"
			target="_blank"
			rel="noopener noreferrer"
			class={link}
		>
			MAST</a
		>.<br />
		This work uses observations made with the NASA/ESA/CSA
		<a
			href="https://www.esa.int/Science_Exploration/Space_Science/Webb"
			target="_blank"
			rel="noopener noreferrer"
			class={link}
		>
			James Webb Space Telescope</a
		>.<br />
		The data were obtained from the
		<a
			href="https://archive.stsci.edu/publishing/mission-acknowledgements"
			target="_blank"
			rel="noopener noreferrer"
			class={link}
		>
			Mikulski Archive for Space Telescopes</a
		>
		at the Space Telescope Science Institute,<br />
		which is operated by the Association of Universities for Research in Astronomy, Inc., under NASA
		contract NAS 5-03127 for JWST.
	</div>
</div>
