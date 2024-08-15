---
'@crowdstrike/glide-core': minor
---

Multiple adjustments to Input were added:

- Breaking Change: The `clear-icon` slot was removed, as consumers should not be adjusting the clear icon themselves.
- Input now properly updates validity when set as `required` if `value` is updated programmatically.
- Input now property updates validity and its visual error state when `required` is removed programmatically.
