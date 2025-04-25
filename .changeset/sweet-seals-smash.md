---
'@crowdstrike/glide-core': minor
---

Dropdown Option, Menu Button, and Menu Link's `id` attribute has always been set internally by these components for accessibility. It's now marked as read-only to reflect that it shouldn't be changed. We've also marked `role` and `tabindex` as read-only for the same reason.
