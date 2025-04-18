---
'@crowdstrike/glide-core': patch
---

- Modal Icon Button's `label` attribute is now reflected.
- Icon Button's `label` attribute is now reflected.
- Input's `clearable`, `hide-label`, `password-toggle`, and `readonly` attributes are now reflected.
- Textarea's `placeholder` attribute is now `undefined` by default instead of an empty string, matching our other components.
- All component attributes whose value is a primitive no longer reflect their values when they're at their default, matching native.
