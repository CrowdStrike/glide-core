---
'@crowdstrike/glide-core': patch
---

Menu options are now keyboard navigable when the target is wrapped in a Tooltip.

```html
<glide-core-menu>
  <glide-core-tooltip label="Label" slot="target">
    <glide-core-icon-button label="Toggle" slot="target">
      <glide-core-example-icon name="three-dots"></glide-core-example-icon>
    </glide-core-icon-button>
  </glide-core-tooltip>

  <glide-core-options>
    <glide-core-option label="One"></glide-core-option>
    <glide-core-option label="Two"></glide-core-option>
  </glide-core-options>
</glide-core-menu>
```
