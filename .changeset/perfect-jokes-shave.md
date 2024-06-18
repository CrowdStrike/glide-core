---
'@crowdstrike/glide-core': minor
---

Updated all CSS custom properties to have a `--glide-core-` prefix rather than `--cs-` to align with our latest naming conventions.

```diff
-  background-color: var(--cs-surface-primary)
+  background-color: var(--glide-core-surface-primary);
```
