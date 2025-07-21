---
'@crowdstrike/glide-core': minor
---

Menu can no longer be opened by setting its `open` attribute via the "click" handler of an element outside Menu.
If you need to open Menu via the "click" handler of an element outside Menu, you can call `click()` on Menu's target.
This change was made to support opening sub-Menu targets programmatically via `click()`.
