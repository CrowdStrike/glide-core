---
'@crowdstrike/glide-core': minor
---

All component prefixes were changed from `cs-` to `glide-core-`. Component imports were **not** adjusted. To migrate your existing code to the new format, replace any `<cs-` prefix with `<glide-core-` instead.

```diff
-  <cs-button>Button</cs-button>
+  <glide-core-button>Button</glide-core-button>
```
