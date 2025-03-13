---
'@crowdstrike/glide-core': minor
---

- To match native, Radio Group now sets its `value` to that of its checked Radio even if that Radio is disabled.
- To match native, Radio Group now sets its `value` to that of the last checked Radio instead of the first.
- When `value` is set initially and a Radio is checked, Radio Group now defers to the checked Radio and overwrites its own initial `value`.
- When `value` is set initially and a Dropdown Option is selected, Dropdown now defers to the selected Dropdown Option and overwrites its own initial `value`.
