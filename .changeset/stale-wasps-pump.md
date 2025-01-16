---
'@crowdstrike/glide-core': minor
---

Tooltip's default slot has been changed to a `label` attribute to improve accessibility and increase design consistency by restricting usage.

As part of this change, make sure you're using an appropriate element as Tooltip's target.
If using a `<span>`, add `role="button"` to it or simply use a `<button>`.
Otherwise, if you're using an element without an implicit role, make sure to add the appropriate `role` to it.
