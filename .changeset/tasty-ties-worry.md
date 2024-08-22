---
'@crowdstrike/glide-core': patch
---

Accessibility improvements to Tree:

- Removes the ability to focus on a Tree Item Menu or Tree Item Icon Button unless the tree item is focused
- Stops event propagation on click or keyboard events when originating from Tree Item Menu or Tree Item Icon Button
- Added a `label` attribute to Tree Item Icon Button and Tree Item Menu for accessibility
- Prevent keyboard navigation to selected tree item if collapsed
