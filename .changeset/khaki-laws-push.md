---
'@crowdstrike/glide-core': patch
---

- Multiselect Dropdown no longer adds duplicate values to `value` when `value` is set programmatically and the options corresponding to those values are already selected.
- Filterable single-select Dropdown now sets the value of its input field to the `label` of the selected option on first render.
- Filterable Dropdown now clears its input field when `multiple` is set programmatically and an option is selected.
