---
'@crowdstrike/glide-core': patch
---

- Menu now remains open or closed when you listen for and cancel clicks on Menu's host.
- Menu now opens on Enter or Space when its target is an SVG.
- Menu no longer overwrites the `id` attribute of its target.
- Menu no longer scrolls the page horizontally when open and the right or left arrow keys are pressed.
- Menu's default slot now allows arbitrary content.
- Menu no longer activates an arbitrary option when opened on smaller screens.
- Menu now ignores navigation via arrow keys when its `loading` attribute is present.
- Menu nows adds `role="button"` to its target when it's target is an SPAN or DIV.
- Menu nows adds `tabindex="0"` and `role="button"` to its target when it's target is an SVG.

- Menu now supports submenus:

```html
<glide-core-menu>
  <button slot="target">Target</button>

  <glide-core-options>
    <glide-core-option label="Label">
      <glide-core-menu slot="submenu">
        <button slot="target">Target</button>

        <glide-core-options>
          <glide-core-option label="Label"></glide-core-option>
        </glide-core-options>
      </glide-core-menu>
    </glide-core-option>
  </glide-core-options>
</glide-core-menu>
```
