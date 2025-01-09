---
'@crowdstrike/glide-core': minor
---

- Drawers's `show()` and `close()` methods have been removed.
  Drawer's `open` attribute can be used instead.
  `open` has the functionality of both methods and is easier to use in templates.

- Drawer no longer dispatches a "close" event on close.
  It instead dispatches a "toggle" event on open and close.
