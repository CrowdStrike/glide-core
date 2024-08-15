---
'@crowdstrike/glide-core': patch
---

Multiple adjustments to Input were added:

- Input now properly updates validity when set as `required` if `value` is updated programmatically.
- Input now property updates validity and its visual error state when `required` is removed programmatically.
- The password toggle is now keyboard accessible.
