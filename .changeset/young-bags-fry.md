---
'@crowdstrike/glide-core': minor
---

The `sticky` attribute for Tab Group wasn't fully thought through. It was decided it is safe to remove it in favor of making the Tab Panel scroll when needed instead.

```diff
- <glide-core-tab-group sticky>
+ <glide-core-tab-group>
```

```html
<glide-core-tab-panel style="overflow-y: auto"></glide-core-tab-panel>
```
