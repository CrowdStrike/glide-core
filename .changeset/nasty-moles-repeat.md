---
'@crowdstrike/glide-core': patch
---

- Menu's target now emits a "click" event when clicked.
- Menu's active option remains active after being clicked and Menu is reopened.
- Button emits a "click" event on Enter.
- Buttons with `type="button"` no longer reset forms.
- Button's `click()` method now submits or resets the form when `type="submit"` or `type="reset"`.
