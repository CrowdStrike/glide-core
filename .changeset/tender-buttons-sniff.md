---
'@crowdstrike/glide-core': minor
---

All components now use Lit's new [`useDefault`](https://lit.dev/docs/components/properties/#property-options) option with `@property()` decorators. `useDefault` was added to Lit in `3.3.0`. You may encounter a typechecking error resolved by upgrading Lit if your `tsconfig.json` doesn't include `skipLibCheck: true`.

With `useDefault`, attributes whose values are primitives are no longer reflected when they're at their defaults—matching how native behaves. This may be a breaking change for you if you use attribute value selectors, like `[orientation="horizontal"]`, to select components.
