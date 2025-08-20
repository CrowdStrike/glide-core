---
'@crowdstrike/glide-core': patch
---

Slot assertions now properly evaluate the slotted contents when wrapped.

```js
@customElement('wrapped-modal')
export default class WrappedModal extends LitElement {
  render() {
    return html`
      <glide-core-modal label="Label">
        <!-- Reslotting the Modal's primary slot. -->
        <slot name="primary" slot="primary"></slot>
      </glide-core-modal>
    `;
  }
}
```

This will no longer produce an error.

```html
<wrapped-modal>
  <glide-core-button label="Submit" slot="primary"></glide-core-button>
</wrapped-modal>
```

But this will, as the element is expected to be a GlideCoreButton.

```html
<wrapped-modal>
  <div slot="primary"></div>
</wrapped-modal>
```

```bash
Uncaught TypeError: Expected Modal to have a slotted element that extends GlideCoreButton. Extends HTMLDivElement instead.
```
