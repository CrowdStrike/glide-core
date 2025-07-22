---
'@crowdstrike/glide-core': minor
---

Menu can no longer be opened by setting its `open` attribute via the "click" handler of an element outside Menu.
If you need to open this way, you can call `click()` on Menu's target in your handler.
This change was made to support the ability to open sub-Menu targets programmatically by calling `click()`.
