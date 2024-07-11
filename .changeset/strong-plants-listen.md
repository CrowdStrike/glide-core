---
'@crowdstrike/glide-core': minor
---

Menu's target button is now accessibly associated with its options.
To make the association possible, Menu options must now be wrapped in `<glide-core-menu-options>`
so that the ID of Menu's target is available to the options (`aria-labelledby`) and vice versa (`aria-controls`).

```diff
<glide-core-menu>
 <glide-core-button slot="target"></glide-core-button>

- <glide-core-menu-link></glide-core-menu-link>
- <glide-core-menu-link></glide-core-menu-link>
+ <glide-core-menu-options>
+    <glide-core-menu-link></glide-core-menu-link>
+    <glide-core-menu-link></glide-core-menu-link>
+  </glide-core-menu.options>
</glide-core-menu>
```
