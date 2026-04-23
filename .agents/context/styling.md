# Styling with Panda CSS

This codebase uses **Panda CSS** for styling. Panda is a build-time CSS-in-JS solution that generates atomic CSS classes at build time.

## Philosophy

- **Centralized layouts** - All layout primitives in `src/lib/styles/layout.ts`
- **Design tokens** - Use semantic tokens for colors, spacing, typography
- **Type-safe styles** - Full autocomplete and type checking
- **Zero runtime** - CSS generated at build time

---

## Layout Primitives (layout.ts)

**All layouts are centralized in `src/lib/styles/layout.ts`.** Never define layout CSS inline.

### Available Layouts

```typescript
// Import from '$lib/styles/layout'
shell; // Root app wrapper (flex column, background, fonts)
header; // Navigation bar layout
contained; // Max-width centered container (72rem)
fullBleed; // Full viewport width
```

### Usage in +layout.svelte

```svelte
<script>
	import { shell, header } from '$lib/styles/layout';
</script>

<div class={shell}>
	<header class={header}>
		<Nav />
	</header>
	{@render children()}
</div>
```

### Usage in Pages

```svelte
<script>
	import { contained } from '$lib/styles/layout';
</script>

<div class={contained}>
	<h1>Page Content</h1>
</div>
```

---

## Design Tokens

All styling uses design tokens from `panda.config.ts`. **Never hardcode values.**

### Semantic Colors

```typescript
backgroundColor: 'background'; // Page background
backgroundColor: 'background-subtle'; // Cards, panels
backgroundColor: 'background-muted'; // Inputs

color: 'foreground-primary'; // Headings
color: 'foreground'; // Body text
color: 'foreground-secondary'; // Secondary text
color: 'foreground-muted'; // Muted/disabled

borderColor: 'border';
borderColor: 'border-subtle';
borderColor: 'border-hover';

backgroundColor: 'primary'; // Primary buttons/links
backgroundColor: 'primary-hover';
backgroundColor: 'primary-active';
```

### Scale Tokens

```typescript
// Spacing (1 = 4px): 1, 2, 3, 4, 5, 6, 8, 10, 12
padding: '4'; // 16px
gap: '6'; // 24px

// Sizes: xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl, 7xl
maxWidth: '6xl'; // 72rem

// Radius: sm, md, lg, xl
borderRadius: 'lg'; // 8px

// Font sizes: xs, sm, md, lg, xl, 2xl, 3xl, 4xl
fontSize: 'lg';
```

---

## Styling Patterns

### Pattern 1: Panda Patterns (Component Layouts)

Use built-in patterns for flex/grid layouts within components:

```svelte
<script>
	import { stack, hstack, grid } from 'styled-system/patterns';
</script>

<!-- Vertical stack -->
<div class={stack({ gap: '6' })}>
	<h1>Title</h1>
	<p>Content</p>
</div>

<!-- Horizontal row -->
<div class={hstack({ gap: '4', justify: 'between' })}>
	<button>Cancel</button>
	<button>Save</button>
</div>

<!-- Grid -->
<div class={grid({ columns: 3, gap: '4' })}>
	{#each items as item}
		<Card {item} />
	{/each}
</div>
```

### Pattern 2: Recipes (Reusable Components)

```svelte
<script>
	import { button, card, input } from 'styled-system/recipes';
</script>

<button class={button({ variant: 'primary', size: 'md' })}>Click</button>

<div class={card({ size: 'md' })}>
	<h3>Card Title</h3>
	<p>Card content</p>
</div>

<input class={input({ size: 'lg' })} placeholder="Type here..." />
```

**Available recipes:**

- `button` - variants: primary, secondary, accent, ghost; sizes: sm, md, lg
- `card` - sizes: sm, md, lg
- `input` - sizes: sm, md, lg

### Pattern 3: Component-local Styles (css())

**Use `css()` only for styles that won't be reused.**

```svelte
<script>
	import { css } from 'styled-system/css';

	// ✅ OK: Truly one-off component style
	const pageTitle = css({
		fontSize: '3xl',
		marginBottom: '6',
		color: 'foreground-primary'
	});
</script>

<h1 class={pageTitle}>Title</h1>
```

**❌ Never define common layouts with css():**

```svelte
<!-- Don't do this - move to layout.ts! -->
<script>
	const header = css({ display: 'flex', padding: '6' });
</script>
```

---

## File Structure

```
src/lib/styles/
├── layout.ts              # Layout primitives (shell, header, contained, fullBleed)
├── recipes/
│   ├── index.ts           # Recipe exports
│   ├── button.ts          # Button recipe
│   ├── card.ts            # Card recipe
│   └── input.ts           # Input recipe
```

---

## Best Practices

### ✅ DO

- Import layouts from `'$lib/styles/layout'`
- Use Panda patterns (`stack`, `hstack`, `grid`) for component layouts
- Use semantic tokens: `background-subtle`, `foreground-primary`, `border`
- Define component styles with `css()` only if truly local
- Use responsive modifiers: `sm:`, `lg:`

```svelte
<script>
	import { contained } from '$lib/styles/layout';
	import { stack } from 'styled-system/patterns';
	import { css } from 'styled-system/css';

	const title = css({
		fontSize: '2xl',
		sm: { fontSize: '3xl' },
		lg: { fontSize: '4xl' }
	});
</script>

<div class={contained}>
	<div class={stack({ gap: '6' })}>
		<h1 class={title}>Responsive Title</h1>
	</div>
</div>
```

### ❌ DON'T

- Never define layout CSS inline in components
- Never use utility class strings: `class="flex gap-4 p-6"`
- Never hardcode values: `color: '#333'`, `padding: '16px'`
- Never use `<style>` blocks in components

```svelte
<!-- ❌ WRONG -->
<div class="flex gap-4 p-6 bg-zinc-900 rounded-lg">

<!-- ❌ WRONG -->
<style>
  div { padding: 16px; color: #333; }
</style>

<!-- ❌ WRONG -->
<script>
  const header = css({ display: 'flex', padding: '6' });  // Move to layout.ts!
</script>

<!-- ✅ CORRECT -->
<script>
  import { shell, header } from '$lib/styles/layout';
</script>
<div class={shell}>
  <header class={header}>...</header>
</div>
```

---

## Decision Tree

```
Is it a page-level layout?
├── YES → Use layout.ts (shell, header, contained, fullBleed)
│
└── NO → Is it a component internal layout?
          ├── YES → Use Panda patterns (stack, hstack, grid)
          │
          └── NO → Is it a reusable UI component?
                    ├── YES → Create a recipe
                    │
                    └── NO → Use css() for one-off styles
```

---

## Configuration Files

**`panda.config.ts`** - Theme tokens and recipes

- Add tokens to `theme.extend.tokens`
- Register recipes in `theme.extend.recipes`

**`src/app.css`** - CSS entry point

```css
@layer reset, base, tokens, recipes, utilities;
@import 'styled-system/styles.css';
```

---

## Troubleshooting

**Styles not updating in dev?**

- Stop and restart `npm run dev`
- Clear browser cache

**Classes not applied?**

- Check that `app.css` imports `styled-system/styles.css`
- Verify CSS file is being loaded (Network tab in DevTools)

**Import errors?**

- Run `npx svelte-kit sync` to update TypeScript paths
