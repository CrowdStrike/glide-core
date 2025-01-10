---
'@crowdstrike/glide-core': minor
---

- Modal's `showModal()` and `close()` methods have been replaced by an `open` attribute to make Modal easier to use and to align with our other components.
- Modal no longer dispatches a "close" event on close. It instead dispatches a "toggle" event on open and close.
