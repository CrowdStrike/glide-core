---
'@crowdstrike/glide-core': minor
---

- Button Group's `ButtonGroupVariant` and `ButtonGroupOrientation` types are not exported.
- Button Group Button has a `label` attribute instead of a default slot to restrict arbitrary content.
- Button Group instead of Button Group Button emits "change" and "input" events.
- Button Group Button's `variant` attribute was renamed to `privateVariant` and should not be used.
- Button Group Button's `vertical` renamed to `privateOrientation` and should not be used.
- Button Group throws if it only contains one Button Group Button.
- Button Group dispatches an `Event` instead of a `CustomEvent`
