<div align="center">
  <a href="https://glide-core.crowdstrike-ux.workers.dev">
    <picture alt="Glide Core Logo">
      <source srcset="https://github.com/CrowdStrike/glide-core/blob/main/.github/logos/light.png?raw=true" media="(prefers-color-scheme: light)" />
      <source srcset="https://github.com/CrowdStrike/glide-core/blob/main/.github/logos/dark.png?raw=true" media="(prefers-color-scheme: dark)" />
      <img src="https://github.com/CrowdStrike/glide-core/blob/main/.github/logos/light.png?raw=true" width="500" />
    </picture>

  </a>

  <p align="center"> 
    A Web Component design system from CrowdStrike.
  </p>
</div>

## Usage

### 1. Install the dependencies

```bash
$ pnpm install @crowdstrike/glide-core lit
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

## Development

### Getting started

```bash
$ pnpm install
$ pnpm start
```

- Follow our [contribution guidelines](./CONTRIBUTING.md) before opening a pull request.
- We recommend using [Corepack](https://pnpm.io/installation#using-corepack) to manage PNPM.
- If you have `ignore-scripts=true` in your `~/.npmrc`, also run `pnpm prepare` to install the Git hooks.

### Updating style variables

1. Generate a Figma [personal access token](https://help.figma.com/hc/en-us/articles/8085703771159-Manage-personal-access-tokens).
1. `$ FIGMA_TOKEN=<token> pnpm start:production:figma`
