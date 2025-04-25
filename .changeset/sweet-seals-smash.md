---
'@crowdstrike/glide-core': minor
---

Dropdown Option, Menu Button, and Menu Link's `id` attribute is now read-only. `id` has always been set internally by these components for accessibility. So we've marked it as read-only to reflect that it shouldn't be changed.
