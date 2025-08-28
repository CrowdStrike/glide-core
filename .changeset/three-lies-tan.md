---
'@crowdstrike/glide-core': minor
---

Popover now requires its default slot content to be wrapped in a Popover Container.

The reason for the change is so Popover's target and its content can be associated with one another via ARIA attributes, improving accessibility.

```html
<glide-core-popover>
  <button slot="target">Target</button>

  <glide-core-popover-container>Content</glide-core-popover-container
</glide-core-popover>
```
