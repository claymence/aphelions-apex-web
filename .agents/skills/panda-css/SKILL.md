# Panda CSS

CSS-in-JS with build-time atomic CSS generation. Type-safe, zero runtime.

## Layout Primitives (Centralized)

**All layout patterns live in `src/lib/styles/layout.ts`.** Import from there, never define inline.

```typescript
// src/lib/styles/layout.ts
export const shell = css({...})      // Root app wrapper
export const header = css({...})     // Navigation bar
export const contained = css({...})  // Max-width container
export const fullBleed = css({...})  // Full viewport width
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
	<h1>Page Title</h1>
</div>
```

---

## Component Styling Patterns

### 1. Panda Patterns (For Layouts)

Use built-in patterns for flex/grid layouts within components:

```svelte
<script>
  import { stack, hstack, grid } from 'styled-system/patterns';
</script>

<!-- Vertical stack -->
<div class={stack({ gap: '6' })}>

<!-- Horizontal row -->
<div class={hstack({ gap: '4', justify: 'between' })}>

<!-- Grid -->
<div class={grid({ columns: 3, gap: '4' })}>
```

### 2. Recipes (Reusable Components)

```svelte
<script>
	import { button, card, input } from 'styled-system/recipes';
</script>

<button class={button({ variant: 'primary', size: 'md' })}>Click</button>
<div class={card({ size: 'md' })}>Content</div>
<input class={input({ size: 'lg' })} />
```

### 3. css() - Component Local Styles ONLY

**Rule:** Use `css()` only for styles that won't be reused elsewhere.

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

**❌ Never do this:**

```svelte
<!-- Don't define common layouts inline -->
const header = css({ display: 'flex', padding: '6' })  // Move to layout.ts!
```

---

## Design Tokens

### Semantic Colors

```typescript
backgroundColor: 'background'; // Page background
backgroundColor: 'background-subtle'; // Cards
backgroundColor: 'background-muted'; // Inputs

color: 'foreground-primary'; // Headings
color: 'foreground'; // Body
color: 'foreground-secondary'; // Secondary text
color: 'foreground-muted'; // Disabled

borderColor: 'border';
borderColor: 'border-subtle';
borderColor: 'border-hover';

backgroundColor: 'primary';
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

## Responsive & States

```typescript
css({
	padding: '4',
	sm: { padding: '6' },
	lg: { padding: '8' }
});

css({
	color: 'foreground',
	_hover: { color: 'primary' },
	_focus: { outline: '2px solid', outlineColor: 'primary' }
});
```

---

## Anti-Patterns

```svelte
<!-- ❌ NEVER -->
<div class="flex gap-4 p-6">              <!-- Tailwind classes -->
<div style="background: #27272a">         <!-- Inline styles -->
<style> .x { padding: 16px } </style>    <!-- Style blocks -->

<!-- ❌ AVOID: Inline css() for common patterns -->
<script>
  const stack = css({ display: 'flex', flexDirection: 'column', gap: '6' })
</script>

<!-- ✅ USE: Panda patterns or layout.ts -->
<script>
  import { stack } from 'styled-system/patterns';
  // or import { contained } from '$lib/styles/layout';
</script>
<div class={stack({ gap: '6' })}>
```

---

## File Structure

```
src/lib/styles/
├── layout.ts           # Layout primitives (shell, header, contained, fullBleed)
├── recipes/
│   ├── button.ts       # Button recipe
│   ├── card.ts         # Card recipe
│   └── input.ts        # Input recipe
```

---

## When to Use What

| Pattern                       | Use For                     | Import From                |
| ----------------------------- | --------------------------- | -------------------------- |
| `layout.ts`                   | Page layouts, shell, header | `'$lib/styles/layout'`     |
| `stack()` `hstack()` `grid()` | Component internal layouts  | `'styled-system/patterns'` |
| `button()` `card()` `input()` | UI components               | `'styled-system/recipes'`  |
| `css()`                       | One-off component styles    | `'styled-system/css'`      |

---

## Tools Available

- `panda-mcp_get_tokens` - All design tokens
- `panda-mcp_get_recipes` - Component recipes
- `panda-mcp_get_patterns` - Layout patterns
- `panda-mcp_get_conditions` - Breakpoints, pseudo-classes

## Documentation

- **Panda LLMs.txt**: https://panda-css.com/llms.txt
- **Project styling rules**: See `.agents/context/styling.md`
