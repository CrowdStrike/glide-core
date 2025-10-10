---
'@crowdstrike/glide-core': minor
---

Our Form Controls Layout component has been removed. To replace Form Controls Layout, a `split` attribute has been added to Checkbox, Checkbox Group, Dropdown, Input, Radio Group, Slider, and Textarea.

The value of each component's `split` attribute matches that of Form Controls Layout: `split` can be `'left"`, `'middle'`, `'right'`, or undefined. You'll need to set `split` on each component in your form—which isn't as convenient. But it does allow form controls to be laid out independent of Form Controls Layout and of each other if desired.

The impetus for these changes is to prepare for Dropdown moving out of Glide Core:

For components to participate in Form Controls Layout, they previously exposed a `privateSplit` property that Form Controls Layout set. When Dropdown is moved out of Glide Core, its contract with Form Controls Layout will no longer be guaranteed.

So Dropdown won't be able to participate in Form Controls Layout, and Form Controls Layout would work with every Glide form control component except Dropdown—leaving Dropdown consumers to manually set `split` on Dropdown.

Rather than oddly have some components that work with Form Controls Layout and some that don't, we decided to remove Form Controls Layout and instead expose `split` on each component.
