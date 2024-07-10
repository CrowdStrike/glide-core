---
'@crowdstrike/glide-core': patch
---

- Icon Button support for `aria-controls`.
- Icon Button's `ariaExpanded` and `ariaHasPopup` properties are correctly reflected as `aria-expanded` and `aria-haspopup` instead of `ariaexpanded` and `ariahaspopup`.
- Split Button support for `aria-controls`, `aria-expanded`, and `aria-haspopup`.
- All three attributes are passed to each component's underlying `<button>` for better compatibility with screen readers.
