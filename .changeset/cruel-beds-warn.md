---
'@crowdstrike/glide-core': patch
---

- Checkbox Group's validity feedback is now hidden when Checkbox Group is required and one of its Checkboxes is checked.

- Checkbox Group now shows validity feedback when its last Checkbox is blurred. Previously Checkbox Group didn't show validity feedback on blur.

- Checkbox Group no longer moves focus to its first enabled Checkbox on submit when another Checkbox has focus. When no Checkbox is focused, Checkbox Group still moves focus to its first enabled Checkbox.

- Checkbox Group now preserves the order of its `value` array both when the `value` of a Checkbox is changed programmatically and when Checkbox Group's default slot is changed to include a new Checkbox with a `checked` attribute.
