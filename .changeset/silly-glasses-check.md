---
'@crowdstrike/glide-core': patch
---

- Popover no longer dispatches a "toggle" event when disabled and opened programmatically.
- Popover no longer sets its `open` attribute when disabled and its target is clicked.
- Popover now sets `aria-expanded="false"` on its target both when initially open but disabled and when initially closed and enabled.
