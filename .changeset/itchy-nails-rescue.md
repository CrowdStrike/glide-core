---
'@crowdstrike/glide-core-components': patch
---

Added the `<cs-menu>` component.

```html
<cs-menu>
  <cs-menu-link label="One" url="/one"> </cs-menu-link>
  <cs-menu-link label="Two" url="/two"> </cs-menu-link>
  <!--
    If an option does not have an associated url,
    you can use <cs-menu-button> and provide your own click handler
  -->
  <cs-menu-button label="Three"> </cs-menu-button>

  <cs-button slot="target" variant="secondary">Target</cs-button>
</cs-menu>
```
