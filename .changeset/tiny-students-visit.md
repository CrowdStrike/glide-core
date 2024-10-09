---
'@crowdstrike/glide-core': minor
---

Button now has a `label` attribute instead of a default slot to restrict its content to increase design consistency.

```diff
- <glide-core-button>Label</glide-core-button>
+ <glide-core-button label="Label"></glide-core-button>
```
