/**
 * Layout primitives - Panda CSS based
 *
 * Usage:
 *   <script>
 *     import { shell, header, contained, fullBleed } from '$lib/styles/layout';
 *   </script>
 *
 *   <!-- App shell (root layout) -->
 *   <div class={shell}>
 *     <header class={header}>
 *       <!-- nav -->
 *     </header>
 *     <!-- content -->
 *   </div>
 *
 *   <!-- Contained layout (max-width, centered) -->
 *   <div class={contained}>
 *     <h1>Title</h1>
 *   </div>
 *
 *   <!-- Full bleed layout - home page -->
 *   <div class={fullBleed}>
 *     <ClockWidget />
 *   </div>
 */

import { css } from 'styled-system/css';

// Skip link - accessibility
export const skipLink = css({
	position: 'absolute',
	left: '0',
	padding: '2',
	backgroundColor: 'primary',
	color: 'background',
	textDecoration: 'none',
	zIndex: '100',
	transform: 'translateY(-100%)',
	transition: 'transform 0.3s',
	_focus: {
		transform: 'translateY(0)'
	}
});

// App shell - root layout wrapper
export const shell = css({
	display: 'flex',
	flexDirection: 'column',
	minHeight: 'screen',
	fontFamily: 'mono',
	fontSize: 'xl',
	position: 'relative',
	color: 'foreground'
});

// Container - max-width, centered, with padding
export const contained = css({
	maxWidth: '6xl',
	mx: 'auto',
	px: '6',
	width: 'full'
});

// Full bleed - full viewport width
export const fullBleed = css({
	width: '100vw',
	marginLeft: 'calc(50% - 50vw)',
	minHeight: '100%'
});

// Header - navigation bar layout
export const header = css({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: '6',
	position: 'relative',
	zIndex: '10'
});

// Main content area - grows to push footer down
export const mainContent = css({
	flex: '1'
});

// Footer - minimal footer layout
export const footer = css({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	gap: '4',
	padding: '6'
});

// Filter Menu - collapsible filter panel for galleries/data interfaces
export const filterMenu = css({
	display: 'flex',
	flexDirection: 'column',
	gap: '6',
	marginBottom: '8',
	padding: '4',
	borderRadius: 'lg',
	backgroundColor: 'background.subtle'
});

export const filterSection = css({
	display: 'flex',
	gap: '4',
	flexWrap: 'wrap',
	alignItems: 'flex-end'
});

export const filterLabel = css({
	display: 'flex',
	flexDirection: 'column',
	gap: '1',
	fontSize: 'sm',
	color: 'foreground.muted'
});
