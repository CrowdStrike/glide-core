---
'@crowdstrike/glide-core': minor
---

Menu's `open` attribute is no longer updated before "toggle" is emitted to support cancellation of "toggle". If you need to know in your "toggle" handler if Menu is about to open or close, you can simply invert the value of `open`:

```ts
document
  .querySelector('glide-core-menu')
  .addEventListener('toggle', (event: Event) => {
    const isOpen = !event.target.open;
    console.log(isOpen);
  });
```
