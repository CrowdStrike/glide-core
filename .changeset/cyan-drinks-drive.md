---
'@crowdstrike/glide-core': minor
---

Refactored `max-character-count` to `maxlength` for Input and Textarea to align closer to the platform's `maxlength` attribute.

```diff
-  <glide-core-input max-character-count="20"></glide-core-input>
-  <glide-core-textarea max-character-count="20"></glide-core-textarea>
+  <glide-core-input maxlength="20"></glide-core-input>
+  <glide-core-textarea maxlength="20"></glide-core-textarea>
```
