---
'@crowdstrike/glide-core': minor
---

- Radio Group no longer unchecks all but the last checked Radio Group Radio when multiple are checked initially.
- Radio Group now sets its `value` to an empty string when disabled.
- Radio Group now sets its `value` to an empty string when its checked Radio Group Radio is disabled.
- When multiple Radio Group Radios are checked and the `value` of one that isn't the last is changed programmatically, Radio Group's `value` remains set to that of the last checked and enabled Radio Group Radio.
