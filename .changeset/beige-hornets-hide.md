---
'@crowdstrike/glide-core': patch
---

Add `@crowdstrike/glide-core/styles/fonts.css` containing a `@font-face` rule and inlined Nunito for easier inclusion.

If your project added the Nunito font manually, you can replace it with a single import:

```
@import '@crowdstrike/glide-core/styles/fonts.css';
```
