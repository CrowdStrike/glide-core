---
'@crowdstrike/glide-core': patch
---

`@crowdstrike/glide-core/styles/variables.css` has been updated with the latest from Figma:

## Light

### Added

```diff
+ --glide-core-effects-shadow-small-blur: 0.5rem;
+ --glide-core-effects-shadow-small-fill: #b5b5b540;
+ --glide-core-effects-shadow-small-spread: 0rem;
+ --glide-core-effects-shadow-small-x: 0rem;
+ --glide-core-effects-shadow-small-y: 0.125rem;
```

## Dark

### Added

```diff
+ --glide-core-effects-shadow-small-blur: 0.5rem;
+ --glide-core-effects-shadow-small-fill: #00000040;
+ --glide-core-effects-shadow-small-spread: 0rem;
+ --glide-core-effects-shadow-small-x: 0rem;
+ --glide-core-effects-shadow-small-y: 0.125rem;
```

## Miscellaneous

### Changed

```diff
- --glide-core-shadow-sm: 0px 2.275px 8.342px 0px rgba(181, 181, 181, 0.25);
+ --glide-core-shadow-sm: var(--glide-core-effects-shadow-small-x) var(--glide-core-effects-shadow-small-y) var(--glide-core-effects-shadow-small-blur) var(--glide-core-effects-shadow-small-spread) var(--glide-core-effects-shadow-small-fill);
```
