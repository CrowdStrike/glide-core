---
'@crowdstrike/glide-core': patch
---

- Filterable Dropdown no longer clears its filter when a tag is removed.
- Dropdown has a new `add-button-label` attribute for labeling and adding a button to the bottom of Dropdown's menu.
  An "add" event, which you can use to show a modal, is emitted when the button is clicked.
