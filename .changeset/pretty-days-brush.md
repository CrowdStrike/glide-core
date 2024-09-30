---
'@crowdstrike/glide-core': patch
---

- Dropdown's optional icons are now limited in height and width to 16 pixels.
- Dropdown now has an "icon" slot for showing an icon in Dropdown's button when an option is selected.

```html
<!-- prettier-ignore -->
<glide-core-dropdown label="Label" placeholder="Placeholder">
  ${choose(this.selectedValue,
    [
      ['edit', () => html`<svg slot="icon"> Edit </svg>`],
      ['move', () => html`<svg slot="icon"> Move </svg>`],
      ['share', () => html`<svg slot="icon"> Share </svg>`],
    ],
    () => nothing,
  )}

  <glide-core-dropdown-option label="Edit">
    <svg slot="icon"> Edit </svg>
  </glide-core-dropdown-option>

  <glide-core-dropdown-option label="Move">
    <svg slot="icon"> Move </svg>
  </glide-core-dropdown-option>

  <glide-core-dropdown-option label="Share">
    <svg slot="icon"> Share </svg>
  </glide-core-dropdown-option>
</glide-core-dropdown>
```
