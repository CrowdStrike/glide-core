---
'@crowdstrike/glide-core': patch
---

- Options (formerly Menu Options) now supports a mix of Option(s) and slots with Option(s) in its default slot:

```html
<glide-core-options>
  <glide-core-option label="Label"></glide-core-option>

  <slot>
    <glide-core-option label="Label"></glide-core-option>
  </slot>
</glide-core-options>
```
