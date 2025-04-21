---
'@crowdstrike/glide-core': minor
---

Glide Core now requires PNPM 9 given 8 is no longer supported by PNPM. You'll get an error when installing this package if you have a version of PNPM older than 9 installed and have `engineStrict=true` in your `.npmrc` or `pnpm-workspace.yaml`.
