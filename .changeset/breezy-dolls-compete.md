---
'@crowdstrike/glide-core': patch
---

- Button supports `aria-controls`.
- Button's `ariaExpanded` and `ariaHasPopup` properties are correctly reflected as `aria-expanded` and `aria-haspopup` instead of `ariaexpanded` and `ariahaspopup`.
- All three attributes are passed to the underlying `<button>` for better compatibility with screen readers.
