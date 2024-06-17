---
'@crowdstrike/glide-core': minor
---

Refactored `max-character-count` to `maxlength` for Input and Textarea.

```diff
-  <glide-core-input max-character-count="20"></glide-core-input>
-  <glide-core-textarea max-character-count="20"></glide-core-textarea>
+  <glide-core-input maxlength="20"></glide-core-input>
+  <glide-core-textarea maxlength="20"></glide-core-textarea>
```
