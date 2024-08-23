---
'@crowdstrike/glide-core': patch
---

Checkbox and Toggle can now be forced checked or unchecked.

To do this, add a "change" or "input" listener that sets `checked` to the
desired state after waiting for the component to update so your `checked`
change isn't reverted after the update completes:

```ts
document
  .querySelector('glide-core-toggle')
  .addEventListener('change', async (event) => {
    await event.target.updateComplete;
    event.target.checked = false;
  });
```
