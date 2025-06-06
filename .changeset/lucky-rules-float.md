---
'@crowdstrike/glide-core': patch
---

Dropdown now supports adding new options when filtering.

When the `add-button` attribute is present, an Add button will appear when the user's filter query doesn't match the `label` of an existing Dropdown Option.

Dropdown will dispatch an "add" event when the button is clicked. The event's `detail` property will be set to the user's filter query. Listen for "add" and, in its handler, add a new selected Dropdown Option based on the filter query to Dropdown's default slot.
