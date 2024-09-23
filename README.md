<p align="center">
  <a href="https://glide-core.crowdstrike-ux.workers.dev">
    <img src="https://github.com/CrowdStrike/glide-core/blob/main/.github/glide-core.png?raw=true" alt="Glide Core logo" width="300" />
  </a>
</p>

<h1 align="center">The Glide Design System from CrowdStrike</h1>

<br>

This package contains Web Components built with [Lit](https://lit.dev/).

## Usage

### 1. Add this package and Lit as dependencies

```bash
pnpm install @crowdstrike/glide-core lit
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
<glide-core-button label="Button" size="small"></glide-core-button>
```

## Development

### Contributing

Follow our [Contribution Guidelines](./CONTRIBUTING.md).

### Getting started

First you'll need to install the dependencies for the repository. We use [PNPM](https://pnpm.io). Run the following command from the root of the repository:

```bash
pnpm install
pnpm dlx playwright install
```

> [!NOTE]
>
> - If you have `ignore-scripts=true` in your `~/.npmrc`, you'll also need to run `pnpm prepare`, which will install some Git hooks for linting, formatting, typechecking, and testing.
> - We recommend using [Corepack](https://pnpm.io/installation#using-corepack) to help manage the version of `pnpm` installed in this repository; however, it is not a requirement.

### Running Storybook

Run the following command from the root of the repository:

```bash
pnpm start
```

After Storybook's build completes, your browser should navigate to the Storybook instance.
If this doesn't happen automatically, a URL will be shown in your terminal for you to browse to.

### Adding CSS Custom Properties

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
