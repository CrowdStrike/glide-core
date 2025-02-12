<p align="center">
  <a href="https://glide-core.crowdstrike-ux.workers.dev">
    <picture alt="Glide Core Logo">
      <source srcset="https://github.com/CrowdStrike/glide-core/blob/main/.github/logos/light.png?raw=true" media="(prefers-color-scheme: light)" />
      <source srcset="https://github.com/CrowdStrike/glide-core/blob/main/.github/logos/dark.png?raw=true" media="(prefers-color-scheme: dark)" />
      <img src="https://github.com/CrowdStrike/glide-core/blob/main/.github/logos/light.png?raw=true" width="500" />
    </picture>
  </a>
</p>

<p align="center"> 
  A Web Component design system from CrowdStrike.
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
