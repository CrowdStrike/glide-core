---
'@crowdstrike/glide-core': patch
---

Ensure correct gap between Tree Item prefix icon and label

We were previously targeting the slotted element,
which wasn't working if that slotted element had `display:contents`
