---
'@crowdstrike/glide-core-components': patch
---

Adjust types order defined in the package.json exports to come first. The "exports" field is order-based. For example, a scenario where both the "types" and "import" condition could be active, "types" should be first so that it matches and returns a .d.ts file, rather than a .js file from the "import" condition.
