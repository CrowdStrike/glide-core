---
'@crowdstrike/glide-core': patch
---

- Option now dispatches "enabled" and "disabled" events when programmatically enabled or disabled.
- Option now dispatches "selected" and "deselected" events when programmatically selected or deselected.
- Options now dispatches a "slotchange" event when the contents of its default slot have changed.

You probably don't need to listen for these events. But they may come in handy if you're abstracting over Menu to add functionality to it.
