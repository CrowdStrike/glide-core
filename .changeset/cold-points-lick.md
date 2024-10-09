---
'@crowdstrike/glide-core': minor
---

Input's "prefix" and "suffix" slots have been renamed to "prefix-icon" and "suffix-icon".

```diff
<glide-core-input label="Label" placeholder="Placeholder">
  <glide-core-example-icon
-   slot="prefix"
+   slot="prefix-icon"
    name="edit"
  ></glide-core-example-icon>
  <glide-core-example-icon
-   slot="suffix"
+   slot="suffix-icon"
    name="share"
  ></glide-core-example-icon>
</glide-core-input>
```
