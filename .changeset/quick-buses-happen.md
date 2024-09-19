---
'@crowdstrike/glide-core': minor
---

- Split Container, Split Button, and Split Link have been renamed and should now imported as:

  - `@crowdstrike/split-button-container.js`
  - `@crowdstrike/split-button-container.button.js`
  - `@crowdstriike/split-button-container.link.js`

- Split Button Container's `menulabel` property is now `menuLabel`.
- Split Button Container's `placement` property is now `menuPlacement`, matching the attribute name.
- Split Button Container's `open` property is now `menuOpen` for consistency with `menuLabel` and `menuPlacement`.
- Split Button Container's `placement` attribute is now limited to `"bottom-end"` and `"top-end"` to align with design requirements.

- Split Button Container Button and Link's `disabled`, `size`, and `variant` attributes weren't meant to be public and have been removed.
- Split Button Container Button and Link's default slots have been removed in favor of a `label` attribute to restrict content to promote design consistency.
- Split Button Container Button and Link's "prefix" slots have been renamed to "icon" for clarity.
