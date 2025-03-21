---
'@crowdstrike/glide-core': patch
---

- Multiselect Dropdown no longer deselects initially selected options on first render.
- Single-select Dropdown now only shows a checkmark for the last selected option if multiple are selected. Dropdown already only includes in its `value` the `value` of the last selected option. This change brings what the user sees as selected in line with what's submitted with the form.
