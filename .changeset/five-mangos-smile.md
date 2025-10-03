---
'@crowdstrike/glide-core': patch
---

- On submit and when `reportValidity()` is called, Checkbox Group now focuses its first enabled Checkbox instead of its first Checkbox.

- Radio Group now supports a slot in its default slot.

- When Radio Group's form is reset, Radio Group now reverts the `checked` property of Radio Group Radios to their `checked` attributes.

- Radio Group no longer dispatches an "invalid" event when a Radio Group Radio is checked and `reportValidity()` is called.

- Radio Group now focuses its first enabled Radio Group Group on submit and when `reportValidity()` is called.

- Radio Group Radio no longer incorrectly dispatches "input" and "change" events when its `checked` property is changed programmatically.

- On first render, Radio Group no longer unchecks a Radio Group Radio whose `value` is an empty string.

- Radio Group, when required, is no longer invalid when required and the `value` of its checked Radio Group Radio is an empty string. Radio Group is also no longer invalid when its own `value` is an empty string. Instead, Radio Group is only invalid when no Radio Group Radio is checked.
