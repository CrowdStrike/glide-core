---
'@crowdstrike/glide-core': minor
---

Tooltip's default slot no longer supports a shortcut.
Use the new `shortcut` attribute instead.
This change is to support a new design requirement restricting the width of non-shortcut content.

```html
<glide-core-tooltip shortcut='["CMD","K"]'> Tooltip </glide-core-tooltip>
```
