---
'@crowdstrike/glide-core': patch
---

Multiple adjustments to Textarea were added:

- Textarea now properly updates validity when set as `required` if `value` is updated programmatically.
- Textarea now properly updates validity and its visual error state when `required` is removed programmatically.
- Fixed a bug where if Textarea was `disabled` or `readonly` and the value exceeded `maxlength`, it would be invalid. This is a valid state because the user cannot interact with the element.
