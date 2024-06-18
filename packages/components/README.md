# Glide Core Components

This package contains Web Components built with [Lit](https://lit.dev/).

## Installation

### 1. Add Lit as a dependency

```bash
pnpm i @crowdstrike/glide-core lit
```

### 2. Import the fonts and variables

```css
@import '@crowdstrike/glide-core/styles/fonts.css';
@import '@crowdstrike/glide-core/styles/variables.css';
```

### 3. Import the component you want to use

```js
import '@crowdstrike/glide-core/button.js';
```

### 4. Render your component

```html
<glide-core-button size="small">Button</glide-core-button>
```

## Adding CSS Custom Properties

Glide Core uses scripts from [@crowdstrike/design-tokens](https://www.npmjs.com/package/@crowdstrike/design-tokens) to import variables from Figma and transform them into CSS custom properties.
This allows us to maintain a single source of truth for color, typography, spacing, etc.

To get new or updated custom properties:

```bash
pnpm start:production:figma
```
