---
'@crowdstrike/glide-core': patch
---

- Accordion respects the user's system preference for reduced motion.
- Accordion waits to dispatch "toggle" on open until its animation is complete.
- Accordion animates when `open` is set programmatically.
- Accordion's "toggle" event bubbles.
- Accordion's `open` property is set to `true` when Accordion is opened via click.
- Accordion has a `click()` method.
- Setting Accordion's `open` property to `false` closes Accordion.
