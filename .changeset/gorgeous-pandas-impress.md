---
'@crowdstrike/glide-core': patch
---

- Dropdown no longer dispatches "change" or "input" events when an option is selected or deselected programmatically.
- Dropdown no longer closes when Select All is clicked after an option is clicked.
- Dropdown no longer deselects options on Enter or Space when single-select, matching its behavior on click.
- Dropdown no longer dispatches "change" and "input" events when single-select and an already selected option is clicked.
- Dropdown no longer immediately closes when initially open with an option selected.
- Dropdown no longer dispatches "input" events on input when filtering.
- Dropdown's `focus()` method accepts an `options` object.
- Dropdown Option's `selected` and `value` properties are reflected.
