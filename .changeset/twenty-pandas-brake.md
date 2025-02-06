---
'@crowdstrike/glide-core': minor
---

- Toggle no longer has a `name` property. It was unused and only applies to form controls.
- Tree Item's `hasChildTreeItems` and `hasExpandIcon` properties have been made private.
- Tree Item's `toggleExpand()` method has been made private.
- Tab Panel no longer has a static `instanceCount` property.

Some internal we made to facillitate generating documentation programmatically forced us remove a few exported types and rename some custom properties:

- Input no longer exports a `SUPPORTED_TYPES` interface.
- Toast no longer exports a `Toast` interface. TODO: say more.
- Tab Panel's custom properties have been renamed:

  ```diff
  - --panel-padding-inline-end
  + --padding-inline-end

  - --panel-padding-inline-start
  + --padding-inline-start
  ```
