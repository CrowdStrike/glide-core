---
'@crowdstrike/glide-core': patch
---

- Dropdown Options are now editable via the `editable` attribute, which will add a button with a pencil icon to the option.
  An "edit" event, which you can use to show a modal, is emitted when the button is clicked.

- Multiselect Dropdown no longer submits its form when Enter is pressed on a tag removal button.
- Multiselect Dropdown's tags can no longer be removed when Dropdown is disabled or read-only.
