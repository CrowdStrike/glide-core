<p align="center">
  <a href="https://glide-core.crowdstrike-ux.workers.dev">
    <picture alt="Glide Core Logo">
      <source srcset="/glide-core/blob/main/.github/logos/light.png?raw=true" media="(prefers-color-scheme: light)" />
      <source srcset="/glide-core/blob/main/.github/logos/dark.png?raw=true" media="(prefers-color-scheme: dark)" />
      <img src="/glide-core/blob/main/.github/logos/light.png?raw=true" width="500" />
    </picture>
  </a>
</p>

<p align="center"> 
  A Web Component design system from CrowdStrike.
</p>

<p>
  <a href="/glide-core/blob/main/LICENSE">
    <img src="https://camo.githubusercontent.com/3fedb1706708c94fa3d5afa55f4021f54f2d3233d346a0ba1bc4d7995e68c692/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f6c2f7376656c74652e737667" alt="license" data-canonical-src="https://img.shields.io/npm/l/svelte.svg">
  </a>
</p>

## Usage

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
