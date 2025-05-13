---
'@crowdstrike/glide-core': minor
---

Tab Panel and Tab's `id` and `role` attributes have always been set internally by those components for accessibility. Both attributes are now typed as read-only to signal they shouldn't be changed externally.
