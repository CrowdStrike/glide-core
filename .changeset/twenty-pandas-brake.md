---
'@crowdstrike/glide-core': minor
---

- Tab Panel no longer has an unused static `instanceCount` property.
- Toggle no longer has a `name` property. `name` only applies to form controls and was unused.
- Tree Item's `hasChildTreeItems` and `hasExpandIcon` properties and its `toggleExpand()` method have been marked private.

Additionally, some internal changes we made to facillitate generating documentation programmatically forced us remove a few exported types and rename some custom properties:

- Input no longer exports a `SUPPORTED_TYPES` interface.
- Toasts no longer exports a `Toast` interface.
- Tab Panel's custom properties have been renamed:

  ```diff
  - --panel-padding-inline-end
  + --padding-inline-end

  - --panel-padding-inline-start
  + --padding-inline-start
  ```
