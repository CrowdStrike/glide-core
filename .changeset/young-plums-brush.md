---
'@crowdstrike/glide-core': minor
---

- Dropdown Option's `selected` attribute is no longer reflected to match native and to resolve a bug when `reset()` is called on its form. This may be a breaking change for you if you have a mutation observer or CSS selector that targets `selected`—or if you call `getAttribute('selected')` or `setAttribute('selected')` on Dropdown Options.
