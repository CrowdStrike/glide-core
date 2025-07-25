---
'@crowdstrike/glide-core': minor
---

Popover can no longer be opened by setting its `open` attribute via the "click" handler of an element outside Popover. If you need Popover to open this way, you can call `click()` on Popover's target in that handler.
