---
'@crowdstrike/glide-core': minor
---

Modal's `show-back-button` attribute has been renamed to `back-button` for brevity.

```diff
- <glide-core-modal label="Label" show-back-button>
+ <glide-core-modal label="Label" back-button>
```

Drawer's `open()` method has been renamed to `show()` to match [`<dialog>`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/show).

```diff
const drawer = document.querySelector('glide-core-modal');

- drawer.open();
+ drawer.show();
```

Modal no longer emits an "open" event on open to match `<dialog>`. You can instead listen for a "click" event on the button that opens your Modal.
