---
'@crowdstrike/glide-core': minor
---

- Checkbox Group's `value` is no longer reflected to match native.
- Checkbox Group now removes from its `value` the `value` of a checked Checkbox that is disabled. This also works in reverse. If a disabled but checked Checkbox is enabled, it's `value` is added to Checkbox Group's `value`.
