---
'@crowdstrike/glide-core-components': patch
---

Added the `<cs-drawer` component.

The Drawer can be opened via the `open` method:

```html
<script>
  const drawer = context.canvasElement.querySelector('cs-drawer');
  drawer?.open();
</script>

<cs-drawer>Content</cs-drawer>
```

It is closed via the `close` method:

```html
<script>
  const drawer = context.canvasElement.querySelector('cs-drawer');
  drawer?.close();
</script>

<cs-drawer>Content</cs-drawer>
```

A custom width can be set via the `--cs-drawer-width` CSS custom property:

```html
<cs-drawer style="--cs-drawer-width: 20rem;">Content</cs-drawer>
```
