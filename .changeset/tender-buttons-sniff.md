---
'@crowdstrike/glide-core': minor
---

All components now use Lit's new [`useDefault`](https://lit.dev/docs/components/properties/#property-options) option with `@property()` decorators. `useDefault` was added to Lit in `3.3.0`. You may encounter a typechecking error resolved by upgrading Lit if your `tsconfig.json` doesn't include `skipLibCheck: true`.
