---
'@crowdstrike/glide-core': patch
---

- When Radio Group's form is reset, Radio Group now reverts the `checked` property of Radio Group Radios to the initial value of their `checked` attributes.
- Radio Group no longer dispatches an "invalid" event when a Radio Group Radio is checked and `reportValidity()` is called.
- On initial render, Radio Group no longer unchecks a Radio Group Radio whose `value` is an empty string.
- Radio Group is no longer invalid when required when its the `value` of its checked Radio Group Radio is an empty string. It's also no longer invalid when its own `value` is an empty string as long as a Radio Group Radio is checked.
