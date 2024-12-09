---
'@crowdstrike/glide-core': patch
---

Most component events are now [`composed`](https://developer.mozilla.org/en-US/docs/Web/API/Event/composed).
"change", "close", and "toggle" events are still not composed to match native.
We're happy to deviate from native and make them composed.
Let us know if you have a use case.
