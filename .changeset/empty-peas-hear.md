---
'@crowdstrike/glide-core': minor
---

BREAKING: Set containing blocks via @lit/context

Instead of manually setting containing blocks for tooltip and menu,
we're now using @lit/context to avoid the need for prop drilling.

If you need tooltips or menus inside of an element containing a backdrop-filter,
set the element as the containing block as follows:

```ts
import { containingBlockContext } from '@crowdstrike/glide-core/library/containing-block-context.js';
import { provide } from '@lit/context';

export default class MyElement extends LitElement {
  @provide({ context: containingBlockContext })
  containingBlock?: HTMLElement;

  override firstUpdated() {
    this.containingBlock = this.#myBackdropFilteredElementRef.value;
  }
}
```
