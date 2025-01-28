---
'@crowdstrike/glide-core': patch
---

Form control labels truncate with a tooltip when they overflow. The contents of that tooltip previously didn't reflect changes to form controls' `label` attribute. Now if you change a form control's `label` after initial render you'll see the new `label` in the truncation tooltip.
