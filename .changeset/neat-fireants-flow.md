---
'@crowdstrike/glide-core': patch
---

- Toasts now emit a "dismiss" event when dismissed by the user or because their duration has expired.
- Toasts now scroll when they would otherwise overflow the viewport.
- Toasts have tweaked animation they enter and leave the viewport.
- Toast widths are now overall narrower.
- Toast font sizes and weights have been tweaked.
- The focus order of Toast dismiss buttons is no longer reversed.
- Modal's back button now reads as "close" to screenreaders instead of "dismiss", matching Modal's "X" button.
