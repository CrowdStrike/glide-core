---
'@crowdstrike/glide-core': patch
---

Updated Input to set itself as invalid when the `value` exceeds `maxlength`.

Many accessibility enhancements to Input:

- The invalid state is now announced to screenreaders.
- The character count information is now announced to screenreaders in a more accessible format.
- The clear button is added as a tab stop to clear the input value.
