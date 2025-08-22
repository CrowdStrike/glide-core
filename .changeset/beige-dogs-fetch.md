---
'@crowdstrike/glide-core': minor
---

Menu now throws when its target has an existing `aria-description` attribute. It throws because Menu will overwrite `aria-description` when Menu's `loading` attribute is set.
