---
'@crowdstrike/glide-core': patch
---

Accessibility improvements to Tree:

- Removes the ability to focus on a Tree Item Menu or Tree Item Icon Button unless the tree item is focused
- Stops event propagation on click or keyboard events when originating from Tree Item Menu or Tree Item Icon Button
- Adds aria-label to Tree Item Menu, including a reference to its parent Tree Item's label
- Add label property to Tree Item Icon Button
- Prevent keyboard navigation to selected tree item if collapsed
