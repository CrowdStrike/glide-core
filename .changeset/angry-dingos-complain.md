---
'@crowdstrike/glide-core-components': patch
---

After an accessibility audit of Accordion, it was determined that `aria-labelledby`, `role="region"`, and `tabindex="0"` could be removed from the inner content area. These attributes were removed.
