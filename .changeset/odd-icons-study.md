---
'@crowdstrike/glide-core': patch
---

2 new attributes have been added to Tree Item:

- Allow tree items without an expand icon to have that indentation removed via the `remove-indentation` attribute.
- Added a `non-collapsible` attribute for tree item. For such tree items:
  - Child tree items remain expanded
  - Expand/collapse caret will not be shown
  - Clicking on the parent will select it
