---
'@crowdstrike/glide-core': patch
---

## Menu

- No longer overwrites the `id` attribute of its target.
- No longer scrolls the page horizontally when open and the right or left arrow keys are pressed.
- No longer activates an arbitrary option when opened on smaller screens.
- Now opens on Enter or Space when its target is an SVG.
- Now remains open or closed when you listen for and cancel clicks on Menu's host.
- Now allows arbitrary content in its default slot.
- Now ignores navigation via arrow keys when its `loading` attribute is present.
- Now adds `role="button"` to its target when its target is an SPAN or DIV.
- Now adds `role="button"` and `tabindex="0"` to its target when its target is an SVG.
- Now supports submenus:

```html
<glide-core-menu>
  <button slot="target">Target</button>

  <glide-core-options>
    <glide-core-option label="Label">
      <glide-core-menu slot="submenu">
        <span slot="target">Target</span>

        <glide-core-options>
          <glide-core-option label="Label"></glide-core-option>
        </glide-core-options>
      </glide-core-menu>
    </glide-core-option>
  </glide-core-options>
</glide-core-menu>
```

## Options (formerly Menu Options)

- Now supports a mix of Option(s) and slots with Option(s).

## Option (formerly Menu Button and Menu Link)

- Now has a `description` attribute.
- Now allows arbitrary content via its default slot.
- Now has a maximum width of 350 pixels.
- Now truncates with an ellipsis and tooltip when it would otherwise overflow.
- Now has a slightly less round border radius.
