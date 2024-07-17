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

Prior to running the script, you'll need to follow the steps to [generate a Figma personal access token](https://help.figma.com/hc/en-us/articles/8085703771159-Manage-personal-access-tokens).

Store this access token in your `.zshrc` or `.bashrc` as the following:

```bash
export FIGMA_TOKEN="<your-token-here>"
```

This setup is required only once; however, your access token may expire and require an update now and then. An error will be thrown if this occurs. Review the link above on managing access tokens in Figma if this happens.

After the steps above are completed, to get new or updated custom properties run the following command:

```bash
pnpm start:production:figma
```
