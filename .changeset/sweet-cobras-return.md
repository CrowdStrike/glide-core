---
'@crowdstrike/glide-core': patch
---

Prevent components from throwing `window.crypto.randomUUID is not a function` when they're served through HTTP instead of HTTPS.
