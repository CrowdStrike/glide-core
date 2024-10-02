---
'@crowdstrike/glide-core': patch
---

- Dropdown Option's optional icon is now limited in height and width to 16 pixels.
- Dropdown now has an "icon:\<value\>" slot for showing an icon in Dropdown's button when an option is selected.
  "\<value\>" should be equal to the `value` of each option.
  Dropdown will show the correct icon in its button based on which option is selected.
  See [Storybook](https://glide-core.crowdstrike-ux.workers.dev/?path=/story/dropdown--with-icons) for a live example.

  ```html
  <glide-core-dropdown label="Label" placeholder="Placeholder">
    <svg slot="icon:edit">Edit</svg>
    <svg slot="icon:move">Move</svg>
    <svg slot="icon:share">Share</svg>

    <glide-core-dropdown-option label="Edit" value="edit">
      <svg slot="icon">Edit</svg>
    </glide-core-dropdown-option>

    <glide-core-dropdown-option label="Move" value="move">
      <svg slot="icon">Move</svg>
    </glide-core-dropdown-option>

    <glide-core-dropdown-option label="Share" value="share">
      <svg slot="icon">Share</svg>
    </glide-core-dropdown-option>
  </glide-core-dropdown>
  ```
