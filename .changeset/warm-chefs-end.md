---
'@crowdstrike/glide-core': patch
---

Dropdown automatically becomes filterable when it contains more than 10 options. Previously, however, Dropdown became unfilterable if its options were reduced to 10 or fewer after initial render. Dropdown now remains filterable or unfilterable throughout its lifecycle based on the number of options present on first render. You can still force Dropdown to be filterable, regardless of options, using the `filterable` attribute.
