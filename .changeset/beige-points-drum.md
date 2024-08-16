---
'@crowdstrike/glide-core': patch
---

Fixed a bug with Input where if it were `disabled` or `readonly` and the value exceeded `maxlength`, it would be invalid. This is a valid state because the user cannot interact with the element.
