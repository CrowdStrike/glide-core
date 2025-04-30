---
'@crowdstrike/glide-core': patch
---

Dropdown and Menu now have a `loading` attribute that shows a skeleton with a fixed number of rows. Add the attribute whenever you asynchronously update Dropdown's default slot. Remove it after the slot has been updated.
