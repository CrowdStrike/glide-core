---
'@crowdstrike/glide-core': patch
---

2 new shadows have been added to `@crowdstrike/glide-core/styles/variables.css`, `shadow-footer` and `shadow-nav`:

## Light

```diff
+ --glide-core-effects-shadow-footer-blur: 0.5rem;
+ --glide-core-effects-shadow-footer-fill: #b5b5b540;
+ --glide-core-effects-shadow-footer-spread: -0.5rem;
+ --glide-core-effects-shadow-footer-x: 0rem;
+ --glide-core-effects-shadow-footer-y: -0.5rem;

+ --glide-core-effects-shadow-nav-background-blur: 6.25rem;
+ --glide-core-effects-shadow-nav-blur: 0.25rem;
+ --glide-core-effects-shadow-nav-fill: #00000040;
+ --glide-core-effects-shadow-nav-spread: 0rem;
+ --glide-core-effects-shadow-nav-x: 0rem;
+ --glide-core-effects-shadow-nav-y: 0.25rem;
```

## Dark

```diff
+ --glide-core-effects-shadow-footer-background-blur: 1rem;
+ --glide-core-effects-shadow-footer-blur: 0.5rem;
+ --glide-core-effects-shadow-footer-fill: #b5b5b540;
+ --glide-core-effects-shadow-footer-spread: -0.5rem;
+ --glide-core-effects-shadow-footer-x: 0rem;
+ --glide-core-effects-shadow-footer-y: -0.5rem;

+ --glide-core-effects-shadow-nav-background-blur: 6.25rem;
+ --glide-core-effects-shadow-nav-blur: 0.25rem;
+ --glide-core-effects-shadow-nav-fill: #00000040;
+ --glide-core-effects-shadow-nav-spread: 0rem;
+ --glide-core-effects-shadow-nav-x: 0rem;
+ --glide-core-effects-shadow-nav-y: 0.25rem;
```
