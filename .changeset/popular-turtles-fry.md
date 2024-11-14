---
'@crowdstrike/glide-core': minor
---

CSS flex attributes for Tab Group have been moved to the host element.

Having a separate, intermediate flex container inside the closed shadow root made it difficult to impossible for consumers to control their flex layout.
