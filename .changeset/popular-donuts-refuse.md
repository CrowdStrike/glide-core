---
'@crowdstrike/glide-core': patch
---

Dropdown now has a `filterable` attribute.
Use it to force Dropdown to be filterable when there are fewer than 11 options.
When there are 11 or more options, Dropdown will be filterable regardless of `filterable`.
