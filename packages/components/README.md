# Glide Core Components

This package contains web components built with [Lit](https://lit.dev/).

## Installation

Add the Glide Core components package and Lit as a dependency in your project:

```bash
pnpm i @crowdstrike/glide-core-components lit
```

To get the most out of Glide, you'll also want to install the `@crowdstrike/glide-core-styles` package. [Follow the instructions](https://github.com/crowdstrike/glide-core/blob/main/packages/styles/README.md) for that package and then return to the steps below.

## Import a component

Explicitly import the component you'd like to render:

```js
import '@crowdstrike/glide-core-components/button.js';
```

## Render the component

Now render the component:

```html
<cs-button size="small">Button</cs-button>
```
