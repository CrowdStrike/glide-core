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

## Adding CSS custom properties

Glide Core uses scripts from [@crowdstrike/design-tokens](https://www.npmjs.com/package/@crowdstrike/design-tokens) to import variables from Figma and transform them into CSS custom properties.
This allows us to maintain a single source of truth for color, typography, spacing, etc.

To get new or updated custom properties:

```bash
pnpm start:production:figma
```

## Running visual regression tests

Visual regression tests are written with [Playwright](https://playwright.dev/).

When developing, run your tests using the following script:

```bash
pnpm test:production:playwright
```

If a change is made that affects the visuals of a component, Playwright will detect those changes and fail one or more tests. When this occurs, it is up to the developer to decide if the change is expected or not. If the change **is** expected, you can update the existing baseline images by running the following:

```bash
pnpm test:production:playwright:update
```

> [!NOTE]
>
> Playwright does not yet support watch mode, so it must be restarted manually via the command line whenever visual changes are added.
