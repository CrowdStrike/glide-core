---
'@crowdstrike/glide-core': patch
---

Add a Form Controls Layout component.

Form Controls Layout accepts any number of Glide Core form controls in its default slot.
It supports a single attribute, `split`, whose value can be `"left"` or `"middle"`:

- `"left"`, the default, puts the controls' labels into a one-third column and the controls themselves into a two-thirds column.
- `"middle"` puts the controls' labels and controls into two equal-width columns.

```html
<glide-core-form-controls-layout split="left">
  <glide-core-input label="Label" placeholder="Placeholder" />
  <glide-core-checkbox label="Label" />
</glide-core-form-controls-layout>
```
