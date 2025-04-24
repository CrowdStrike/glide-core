---
'@crowdstrike/glide-core': minor
---

Toasts has a new API that's markup-first and more flexible.

Previously, to show a notification you would render `<glide-core-toasts></glide-core-toasts>` somewhere in the document. You'd then query for that element and call its `add()` method. This design worked well enough. But it had a couple major drawbacks:

1. The `add()` method supported descriptions. But, because it's a method, the description had to be a string. That meant you'd first have to serialize any markup you wanted to appear in a notification's description.
2. Only one instance of Toasts was allowed per page. There's a case to be made for centralizing notifications at the page or application level. But that's a decision for application owners, and probably not one a component should force on its consumers.

To eliminate those drawbacks, we've removed Toasts and replaced it with Toast. When you want to show a notification, simply add `<glide-core-toast>` anywhere on the page. You can add as many as you need. As with Toasts, Toast will remove itself from the page when dismissed or when its `duration` has expired.

Let us know what you think!

```ts
import '@crowdstrike/glide-core/toast.js';
```

```html
<glide-core-toast label="Label" duration="10000" variant="success">
  Description

  <glide-core-link label="Label" href="/"></glide-core-link>
</glide-core-toast>
```
