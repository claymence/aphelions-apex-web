/**
 * Card recipe - reusable card component styles
 *
 * Usage:
 *   <div class={card()}>
 *     <h3 class={cardTitle()}>Title</h3>
 *     <p class={cardContent()}>Content</p>
 *   </div>
 */

import { defineRecipe } from '@pandacss/dev';

export const cardRecipe = defineRecipe({
	className: 'card',
	base: {
		backgroundColor: 'background.subtle',
		padding: '2',
		borderRadius: 'lg',
		transition: 'all 0.2s'
	},
	variants: {
		size: {
			sm: { padding: '2' },
			md: { padding: '4' },
			lg: { padding: '6' }
		},
		interactive: {
			true: {
				cursor: 'pointer',
				_hover: {
					backgroundColor: 'background.muted'
				}
			}
		}
	},
	defaultVariants: {
		size: 'sm'
	}
});

export const cardTitleRecipe = defineRecipe({
	className: 'card-title',
	base: {
		fontSize: 'lg',
		fontWeight: 'semibold',
		color: 'foreground.primary',
		marginBottom: '2'
	}
});

export const cardContentRecipe = defineRecipe({
	className: 'card-content',
	base: {
		fontSize: 'sm',
		color: 'foreground.secondary',
		lineHeight: 'relaxed'
	}
});
