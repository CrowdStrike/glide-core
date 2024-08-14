---
'@crowdstrike/glide-core': patch
---

- Tooltip reliably breaks out of containers that have `overflow: hidden`.
- Tooltip's `:host` is now `display: inline-block` by default so the tooltip remains aligned with its target when its target is less than the full width of its container.
- There's no longer a small gap between Tooltip's arrow and the tooltip itself when the target is near the edge of the viewport.
- To better match the mockups, Tooltip's arrow is rounded and larger. And the space between the tooltip and its target has increased.
