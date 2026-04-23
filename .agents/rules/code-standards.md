# Code Standards

## Styling Standards

### Panda CSS is Mandatory

**Always use Panda CSS for styling. Never use inline Tailwind classes or `<style>` blocks.**

**Import from styled-system:**

```svelte
<script>
	import { css } from 'styled-system/css';
	import { button, card, input } from 'styled-system/recipes';
</script>
```

### Use Design Tokens

**Always use semantic design tokens instead of hardcoded values:**

```typescript
// ✅ CORRECT
const style = css({
	backgroundColor: 'background-subtle', // Semantic token
	color: 'foreground-primary', // Semantic token
	padding: '4', // Token
	borderRadius: 'lg' // Token
});

// ❌ WRONG
const style = css({
	backgroundColor: 'zinc.900', // Direct palette (avoid)
	color: '#fff', // Hardcoded (never)
	padding: '16px', // Hardcoded (never)
	borderRadius: '8px' // Hardcoded (never)
});
```

**Available semantic tokens:**

- **Colors**: `background`, `background-subtle`, `background-muted`, `foreground`, `foreground-primary`, `foreground-secondary`, `foreground-muted`, `border`, `border-subtle`, `primary`, `primary-hover`
- **Spacing**: `1` (4px), `2` (8px), `3` (12px), `4` (16px), `5` (20px), `6` (24px), `8` (32px), `10` (40px), `12` (48px)
- **Radius**: `sm` (4px), `md` (6px), `lg` (8px), `xl` (12px)
- **Font sizes**: `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `4xl`

### File Organization

**Component styles go in `<script>` block:**

```svelte
<script>
	import { css } from 'styled-system/css';

	const container = css({
		display: 'flex',
		gap: '4',
		padding: '6'
	});
</script>

<div class={container}>Content</div>
```

**Reusable patterns go in `src/lib/styles/`:**

- `src/lib/styles/layout.ts` - Layout patterns (contained, fullBleed)
- `src/lib/styles/recipes/*.ts` - Component recipes (button, card, input)

**Never use `<style>` blocks:**

```svelte
<!-- ❌ NEVER DO THIS -->
<style>
	.my-class {
		padding: 16px;
	}
</style>
```

### Component Recipes

**Use recipes for reusable UI components:**

```svelte
<script>
	import { button, card } from 'styled-system/recipes';
</script>

<button class={button({ variant: 'primary', size: 'md' })}> Click me </button>

<div class={card()}>
	<h3>Card Title</h3>
	<p>Card content</p>
</div>
```

**Available recipes:**

- `button({ variant, size })` - variant: primary | secondary | accent | ghost; size: sm | md | lg
- `card({ size, interactive })` - size: sm | md | lg
- `input({ size })` - size: sm | md | lg

### Adding New Tokens

**When you need a new color, spacing, or size:**

1. Add it to `panda.config.ts` in `theme.extend.tokens`
2. Use semantic naming (e.g., `foreground-muted` not `gray-400`)
3. Reference existing tokens where possible: `{ value: '{colors.zinc.400}' }`
4. Regenerate: `npm run prepare`

---

## Environment Variables

### Requirements

**Always use:**

```typescript
import { env } from '$env/dynamic/private';
const apiKey = env.JWST_API_KEY; // or {API_NAME}_API_KEY
```

**NEVER use:**

- `$env/static/private` (incompatible with PM2 runtime injection)
- `process.env` directly
- `.env` files in production

### Security

- API keys **must never** be exposed to the client
- **All external API calls** must go through the server-side wrapper
- **Note**: Production uses PM2 ecosystem config, not `.env` files

---

## Error Handling

### Structure

- Server functions **must never throw** to the UI
- **Always return** discriminated union:
    ```typescript
    {
      success: boolean,
      error?: string,
      items?: Item[]
    }
    ```

### Examples

**Success:**

```typescript
{ success: true, items: JWSTItem[] }
```

**Error:**

```typescript
{ success: false, error: "API timeout", items: [] }
```

### UI Display

- Show filters **always** (even on error)
- Display "No results" message below filters
- Don't replace entire UI with error
