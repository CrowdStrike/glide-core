---
'@crowdstrike/glide-core': patch
---

- Multiselect Dropdown no longer shows the checkboxes of selected but disabled options as checked. This change brings what the user sees as selected in line with what's submitted with the form. Same change and thinking for single-select Dropdown.
- Dropdown Option now correctly sets `aria-selected` when selected then disabled or enabled programmatically.
