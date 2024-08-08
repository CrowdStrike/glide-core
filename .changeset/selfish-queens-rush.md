---
'@crowdstrike/glide-core': minor
---

Adjustments were made to the Tab components to remove all existing variants in favor of a single design. Overflow buttons are added to `glide-core-tab-group` when the tabs overflow their container.

See the example below.

```diff
+ <glide-core-tab-group>
- <glide-core-tab-group variant="secondary">
```
