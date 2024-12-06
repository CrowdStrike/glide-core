---
'@crowdstrike/glide-core': minor
---

`@crowdstrike/glide-core/styles/variables.css` has been updated with the latest from Figma:

## Light

### Added

```diff
+ --glide-core-border-attention: #f8f0d1;
+ --glide-core-border-error: #ffdcda;
+ --glide-core-border-informational: #d7e7ff;
+ --glide-core-border-warning: #ffebce;

+ --glide-core-effects-shadow-small-blur: 0.5rem;
+ --glide-core-effects-shadow-small-fill: #b5b5b540;
+ --glide-core-effects-shadow-small-spread: 0rem;
+ --glide-core-effects-shadow-small-x: 0rem;
+ --glide-core-effects-shadow-small-y: 0.125rem;

+ --glide-core-effects-shadow-switcher-blur: 0.125rem;
+ --glide-core-effects-shadow-switcher-fill: #ffffff59;
+ --glide-core-effects-shadow-switcher-spread: 0rem;
+ --glide-core-effects-shadow-switcher-x: 0.0625rem;
+ --glide-core-effects-shadow-switcher-y: 0.0625rem;

+  --glide-core-surface-background-image: #00000000;
```

### Removed

```diff
- --glide-core-background-fill: #15141400;
- --glide-core-generic-border-active: #6d6d6d;
```

## Dark

### Added

```diff
+ --glide-core-border-attention: #f8f0d1;
+ --glide-core-border-error: #ffdcda;
+ --glide-core-border-informational: #d7e7ff;
+ --glide-core-border-warning: #ffebce;

+ --glide-core-effects-shadow-small-blur: 0.5rem;
+ --glide-core-effects-shadow-small-fill: #00000040;
+ --glide-core-effects-shadow-small-spread: 0rem;
+ --glide-core-effects-shadow-small-x: 0rem;
+ --glide-core-effects-shadow-small-y: 0.125rem;

+ --glide-core-effects-shadow-switcher-blur: 0.125rem;
+ --glide-core-effects-shadow-switcher-fill: #0000000d;
+ --glide-core-effects-shadow-switcher-spread: 0rem;
+ --glide-core-effects-shadow-switcher-x: 0.0625rem;
+ --glide-core-effects-shadow-switcher-y: 0.0625rem;

+ --glide-core-surface-background-image: #151414f7;
```

### Removed

```diff
- --glide-core-background-fill: #151414f7;
- --glide-core-generic-border-active: #6d6d6d;
```

### Changed

```diff
- --glide-core-effects-shadow-large-blur: 3.125rem;
+ --glide-core-effects-shadow-large-blur: 0.75rem;

- --glide-core-effects-shadow-large-y: 0.625rem;
+ --glide-core-effects-shadow-large-y: 0.125rem;
```

## System

### Added

```diff
+ --glide-core-border-radius-zero: 0rem;
+ --glide-core-border-width-zero: 0rem;
```

### Removed

```diff
- --glide-core-border-radius-none: 0rem;
- --glide-core-border-width-none: 0rem;
- --glide-core-number-14: 0.875rem;
- --glide-core-page-size-details-panel: 27.375rem;
```

## Miscellaneous

### Changed

```diff
- --glide-core-shadow-sm: 0px 2.275px 8.342px 0px rgba(181, 181, 181, 0.25);
+ --glide-core-shadow-sm: var(--glide-core-effects-shadow-small-x) var(--glide-core-effects-shadow-small-y) var(--glide-core-effects-shadow-small-blur) var(--glide-core-effects-shadow-small-spread) var(--glide-core-effects-shadow-small-fill);
```
