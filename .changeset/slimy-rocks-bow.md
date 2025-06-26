---
'@crowdstrike/glide-core': patch
---

Modal received a few updates to align with the latest designs:

- A new `description` attribute has been added.
- The internal padding was decreased. Visual tests will report a slightly reduced overall height.
- The width of the Modal has increased:
  - Small increased from 360px to 400px.
  - Medium increased from 560px to 600px.
  - Large increased from 860px to 900px
  - XLarge increased from 1110px 1150px.
- The header remains fixed at the top when the content scrolls.
- The footer remains fixed at the bottom when the content scrolls.
- New visual feedback was added for scrollable content:
  - A shadow appears below the header when the content is scrolled down.
  - A shadow appears above the footer when more content is available below.
  - Shadows automatically hide when reaching their respective scroll boundaries.
