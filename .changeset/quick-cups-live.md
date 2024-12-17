---
'@crowdstrike/glide-core': minor
---

Button no longer supports `aria-controls`, `aria-expanded`, `aria-haspopup`, `formaction`, `formenctype`, `formmethod`, `formnovalidate`, `formtarget`, `popovertarget`, and `popovertargetaction`.
We added these attributes to match native.
But we suspect they won't be used.
And they visually complicate Storybook's controls table.

Let us know if you have a use case for one.
We're happy to add them back as needed.
