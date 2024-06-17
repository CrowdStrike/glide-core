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

Glide Core uses scripts from the [@crowdstrike/design-tokens](https://www.npmjs.com/package/@crowdstrike/design-tokens) package to import and transform values from Figma to CSS custom properties (aka CSS variables). This workflow allows the Glide Design System team to maintain a single point of truth (SPOT) for color, typography, spacing, etc.

To get new or updated CSS variables:

```bash
pnpm figma:build-css-vars
```
