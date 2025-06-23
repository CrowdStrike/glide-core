---
'@crowdstrike/glide-core': minor
---

`@crowdstrike/glide-core/styles/variables.css` has been updated with the latest from Figma:

### Rounding

Existing usages of `--glide-core-rounding-base-radius-xs` should be updated to `--glide-core-rounding-base-radius-xxs` to maintain the same rounding.

```diff
+ --glide-core-rounding-base-radius-xxs: 0.25rem;

- --glide-core-rounding-base-radius-xs: 0.25rem;
+ --glide-core-rounding-base-radius-xs: 0.375rem;
```

### Duration

```diff
+ --glide-core-duration-fast-01: 40ms;
+ --glide-core-duration-fast-02: 75ms;
+ --glide-core-duration-moderate-01: 150ms;
+ --glide-core-duration-moderate-02: 250ms;
+ --glide-core-duration-slow-01: 400ms;
+ --glide-core-duration-slow-02: 900ms;
```

### Animation

```diff
+ --glide-core-animation-swoop: cubic-bezier(0.5, 0, 0, 1);
+ --glide-core-animation-swoop-in: cubic-bezier(0.05, 0.5, 0.15, 1);
+ --glide-core-animation-swoop-out: cubic-bezier(0.45, 0.1, 0.9, 0.5);
+ --glide-core-animation-linear: cubic-bezier(0, 0, 1, 1);
+ --glide-core-animation-bounce: cubic-bezier(0, 0.4, 0, 1.4);
+ --glide-core-animation-smooth: cubic-bezier(0.8, 0.05, 0.25, 0.95);
```
