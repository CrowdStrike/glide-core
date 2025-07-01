---
'@crowdstrike/glide-core': patch
---

- Input now passes its `aria-controls`, `aria-expanded`, and `aria-haspopup` attributes down to its underlying input field.
- Menu now remains open or closed when you listen for and cancel clicks on Menu itself.
- Menu now opens on Enter or Space when its target is an SVG and its target has focus.
- Menu no longer overwrites the `id` attribute of its target.
- Menu no longer scrolls the page horizontally when open and the right or left arrow keys are pressed.
- Menu's default slot now allows arbitrary content.
- Option (formerly Menu Button and Menu Link) now allows arbitrary content.
- Menu now supports submenus:

```html
<glide-core-menu>
  <button slot="target">Button</button>

  <glide-core-options>
    <glide-core-option label="Label">
      <glide-core-menu slot="submenu">
        <button slot="target">Button</button>

        <glide-core-options>
          <glide-core-option label="Label"></glide-core-option>
        </glide-core-options>
      </glide-core-menu>
    </glide-core-option>
  </glide-core-options>
</glide-core-menu>
```
