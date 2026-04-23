/**
 * Input recipe - form input styles
 *
 * Usage:
 *   <input class={input()} placeholder="Type here..." />
 *   <select class={input()}>
 *     <option>Option 1</option>
 *   </select>
 */

import { defineRecipe } from '@pandacss/dev';

export const inputRecipe = defineRecipe({
	className: 'input',
	base: {
		padding: '2',
		backgroundColor: 'background-muted',
		color: 'foreground-primary',
		border: '1px solid',
		borderColor: 'border',
		borderRadius: 'md',
		fontSize: 'sm',
		fontFamily: 'mono',
		outline: 'none',
		transition: 'border-color 0.2s',
		width: 'full',
		_focus: {
			borderColor: 'border-hover'
		}
	},
	variants: {
		size: {
			sm: {
				minWidth: '150px',
				padding: '2'
			},
			md: {
				minWidth: '250px',
				padding: '2.5'
			},
			lg: {
				minWidth: '300px',
				padding: '3'
			}
		}
	},
	defaultVariants: {
		size: 'md'
	}
});
