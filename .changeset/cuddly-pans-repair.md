---
'@crowdstrike/glide-core-components': patch
---

Updated `<cs-button` to default to a closed shadow root, removing the webdriver workaround.

You can reopen the shadow root in tests if needed:

```ts
// test.ts
import Button from '@crowdstrike/glide-core-components/button.js';
Button.shadowRootOptions.mode = 'open';
```
