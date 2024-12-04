---
'@crowdstrike/glide-core': minor
---

- Input no longer dispatches a "clear" event when cleared. It now dispatches an ordinary "input" event instead.
- Input's `hasClearButton` and `isClearButtonVisible` fields are now private.
