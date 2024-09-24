---
'@crowdstrike/glide-core': minor
---

- Button's "prefix" and "suffix" slots have been renamed to "prefix-icon" and "suffix-icon".
- Button Group Button's "prefix" slot has been renamed to "icon".
- Accordion's "prefix" and "suffix" slots have been renamed to "prefix-icon" and "suffix-icons".
- Accordion no longer dispaches a custom event. Accordion's state, which was available via the custom event's `detail` property, can be accessed via the `open` property.
