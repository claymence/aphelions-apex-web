import { defineConfig } from '@pandacss/dev';
import {
	cardRecipe,
	cardTitleRecipe,
	cardContentRecipe,
	buttonRecipe,
	inputRecipe
} from './src/lib/styles/recipes';

export default defineConfig({
	// Whether to use css reset
	preflight: true,

	// Where to look for your css declarations
	include: ['./src/**/*.{js,jsx,ts,tsx,svelte}'],

	// Files to exclude
	exclude: [],

	// Useful for theme customization
	theme: {
		extend: {
			tokens: {
				colors: {
					zinc: {
						50: { value: '#fafafa' },
						100: { value: '#f4f4f5' },
						200: { value: '#e4e4e7' },
						300: { value: '#d4d4d8' },
						400: { value: '#a1a1aa' },
						500: { value: '#71717a' },
						600: { value: '#52525b' },
						700: { value: '#3f3f46' },
						800: { value: '#27272a' },
						900: { value: '#18181b' },
						950: { value: '#09090b' }
					},
					accent: {
						50: { value: '#eff6ff' },
						100: { value: '#dbeafe' },
						200: { value: '#bfdbfe' },
						300: { value: '#93c5fd' },
						400: { value: '#60a5fa' },
						500: { value: '#3b82f6' },
						600: { value: '#2563eb' },
						700: { value: '#1d4ed8' },
						800: { value: '#1e40af' },
						900: { value: '#1e3a8a' },
						950: { value: '#172554' }
					},
					success: { value: '#22c55e' },
					warning: { value: '#eab308' },
					error: { value: '#ef4444' }
				},
				fonts: {
					mono: {
						value: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace'
					}
				},
				fontSizes: {
					// Core font sizes
					xs: { value: '0.75rem' },
					sm: { value: '0.875rem' },
					md: { value: '1rem' },
					lg: { value: '1.125rem' },
					xl: { value: '1.25rem' },
					'2xl': { value: '1.5rem' },
					'3xl': { value: '1.875rem' },
					'4xl': { value: '2.25rem' }
				},
				spacing: {
					// Core spacing scale (1rem = 16px base)
					'1': { value: '0.25rem' },
					'2': { value: '0.5rem' },
					'3': { value: '0.75rem' },
					'4': { value: '1rem' },
					'5': { value: '1.25rem' },
					'6': { value: '1.5rem' },
					'8': { value: '2rem' },
					'10': { value: '2.5rem' },
					'12': { value: '3rem' }
				},
				radii: {
					// Border radius tokens
					sm: { value: '0.25rem' },
					md: { value: '0.375rem' },
					lg: { value: '0.5rem' },
					xl: { value: '0.75rem' }
				},
				sizes: {
					'7xl': { value: '80rem' },
					prose: { value: '65ch' }
				}
			},

			semanticTokens: {
				colors: {
					// Backgrounds - nested by hierarchy
					background: {
						DEFAULT: {
							value: { base: '{colors.zinc.200}', _dark: '{colors.zinc.950}' }
						},
						subtle: {
							value: { base: '{colors.zinc.100}', _dark: '{colors.zinc.900}' }
						},
						muted: { value: { base: '{colors.zinc.300}', _dark: '{colors.zinc.800}' } }
					},

					// Foreground colors - nested by hierarchy
					foreground: {
						DEFAULT: {
							value: { base: '{colors.zinc.800}', _dark: '{colors.zinc.200}' }
						},
						primary: {
							value: { base: '{colors.zinc.950}', _dark: '{colors.zinc.50}' }
						},
						secondary: {
							value: { base: '{colors.zinc.600}', _dark: '{colors.zinc.300}' }
						},
						muted: { value: { base: '{colors.zinc.500}', _dark: '{colors.zinc.400}' } }
					},

					// Borders - nested by hierarchy
					border: {
						DEFAULT: {
							value: { base: '{colors.zinc.200}', _dark: '{colors.zinc.800}' }
						},
						subtle: {
							value: { base: 'rgba(0, 0, 0, 0.1)', _dark: 'rgba(255, 255, 255, 0.1)' }
						},
						hover: {
							value: { base: 'rgba(0, 0, 0, 0.3)', _dark: 'rgba(255, 255, 255, 0.3)' }
						}
					},

					// Primary action colors
					primary: {
						DEFAULT: { value: '{colors.accent.600}' },
						hover: { value: '{colors.accent.700}' },
						active: { value: '{colors.accent.800}' }
					}
				}
			},

			recipes: {
				card: cardRecipe,
				cardTitle: cardTitleRecipe,
				cardContent: cardContentRecipe,
				button: buttonRecipe,
				input: inputRecipe
			}
		}
	},

	// The output directory for your css system
	outdir: 'styled-system',

	// Enable JSX framework for Svelte
	jsxFramework: 'svelte'
});
