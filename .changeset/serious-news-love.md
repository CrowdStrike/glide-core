---
"@crowdstrike/glide-core-components": minor
"@crowdstrike/glide-core-styles": minor
---

Initial release of packages. To use these packages, do the following:

Add the packages as dependencies in your project:

```bash
pnpm i @crowdstrike/glide-core-styles @crowdstrike/glide-core-components
```

Import the styles in your project:

```js
import "@crowdstrike/glide-core-styles";
```

Explicitly import the component you'd like to render:

```js
import "@crowdstrike/glide-core-components/button.js";
```

Render the component in your markup

```html
<cs-button size="small">Button</cs-button>
```
