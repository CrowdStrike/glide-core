---
'@crowdstrike/glide-core': patch
---

- When filterable and an option is selected, Dropdown now sets the underlying `<input>`'s `value` instead of `placeholder` to match the updated interaction specification.
- Pressing `Meta` + `Backspace` when the insertion point is at the beginning of a filterable Dropdown now removes every non-overflowing, selected option.
- Dropdown now has a `click()` method.
- Dropdown no longer shows an empty menu when opened after every option have been filtered out.
