---
'@crowdstrike/glide-core': patch
---

- Dropdown now breaks out of Modal instead of expanding it.
- Dropdown now closes when `open` and disabled and opens when `open` and enabled.
- Dropdown now waits to open until its menu has been positioned, preventing a flicker in some cases.
