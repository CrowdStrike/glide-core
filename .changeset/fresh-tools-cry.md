---
'@crowdstrike/glide-core': patch
---

Add popover attribute to Toasts

Ensures that toasts will appear at the top layer,
avoiding the need to play z-index wars with other elements

Also, toasts now get picked up by screenreaders properly
