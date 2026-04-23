/**
 * Button recipe - reusable button component styles
 *
 * Usage:
 *   <button class={button({ variant: 'primary' })}>
 *     Click me
 *   </button>
 */

import { defineRecipe } from '@pandacss/dev';

export const buttonRecipe = defineRecipe({
	className: 'button',
	base: {
		paddingX: '4',
		paddingY: '2',
		borderRadius: 'md',
		fontFamily: 'mono',
		fontSize: 'sm',
		cursor: 'pointer',
		border: 'none',
		transition: 'all 0.2s',
		_display: 'inline-flex',
		alignItems: 'center',
		justifyContent: 'center',
		gap: '2'
	},
	variants: {
		variant: {
			primary: {
				backgroundColor: 'primary',
				color: 'foreground.primary',
				_hover: {
					backgroundColor: 'primary.hover'
				},
				_active: {
					backgroundColor: 'primary.active',
					transform: 'translateY(1px)'
				}
			},
			secondary: {
				backgroundColor: 'background.muted',
				color: 'foreground',
				_hover: {
					backgroundColor: 'background.subtle'
				},
				_active: {
					backgroundColor: 'background',
					transform: 'translateY(1px)'
				}
			},
			accent: {
				backgroundColor: 'primary',
				color: 'foreground.primary',
				_hover: {
					backgroundColor: 'primary.hover'
				},
				_active: {
					backgroundColor: 'primary.active',
					transform: 'translateY(1px)'
				}
			},
			ghost: {
				backgroundColor: 'transparent',
				color: 'foreground.secondary',
				_hover: {
					backgroundColor: 'background.muted',
					color: 'foreground'
				}
			}
		},
		size: {
			sm: {
				paddingX: '3',
				paddingY: '1.5',
				fontSize: 'xs'
			},
			md: {
				paddingX: '4',
				paddingY: '2',
				fontSize: 'sm'
			},
			lg: {
				paddingX: '6',
				paddingY: '3',
				fontSize: 'md'
			}
		}
	},
	defaultVariants: {
		variant: 'primary',
		size: 'md'
	}
});
