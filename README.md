<div align="center">
  <p align="center">
    <a href="https://glide-core.crowdstrike-ux.workers.dev">
      <picture alt="Glide Core Logo">
        <source srcset="/.github/logos/light.png?raw=true" media="(prefers-color-scheme: light)" />
        <source srcset="/.github/logos/dark.png?raw=true" media="(prefers-color-scheme: dark)" />
        <img src="/.github/logos/light.png?raw=true" width="500" />
      </picture>
    </a>
  </p>

A Web Component design system

[![Code coverage](https://img.shields.io/badge/coverage%20-%20100%25%20-%20yellowgreen)](/src)
[![Build status](https://img.shields.io/github/check-runs/crowdstrike/glide-core/main)](https://github.com/CrowdStrike/glide-core/actions?query=branch%3Amain)
[![NPM version](https://img.shields.io/npm/v/%40crowdstrike%2Fglide-core)](https://www.npmjs.com/package/@crowdstrike/glide-core)

</div>

## Usge

### 1. Install the dependencies

```bash
pnpm install @crowdstrike/glide-core lit
```

### 2. Import the fonts and variables

```css
@import '@crowdstrike/glide-core/styles/fonts.css';
@import '@crowdstrike/glide-core/styles/variables.css';
```

### 3. Import your component

```js
import '@crowdstrike/glide-core/button.js';
```

### 4. Render your component

```html
<glide-core-button label="Button"></glide-core-button>
```
