---
'@crowdstrike/glide-core': minor
---

Split Button Container has a new API to accommodate a new design requirement for its buttons to disabled independently of one another.
See Storybook for the full API.

### Before

```html
<script>
  import '@crowdstrike/glide-core/split-container.js';
  import '@crowdstrike/glide-core/split-button.js';
  import '@crowdstrike/glide-core/menu.link.js';
  import '@crowdstrike/glide-core/menu.button.js';
</script>

<glide-core-split-container
  menu-label="Label"
  menu-placement="top-end"
  open
  disabled
>
  <glide-core-split-button slot="primary-action">
    Button
    <glide-core-example-icon slot="prefix"></glide-core-example-icon>
  </glide-core-split-button>

  <glide-core-menu-button label="Label"></glide-core-menu-button>
</glide-core-split-container>
```

### After

```html
<script>
  import '@crowdstrike/glide-core/split-button.js';
  import '@crowdstrike/glide-core/split-button.primary-button.js';
  import '@crowdstrike/glide-core/split-button.secondary-button.js';
  import '@crowdstrike/glide-core/menu.button.js';
</script>

<glide-core-split-button>
  <glide-core-split-button-primary-button label="Label" disabled>
    <glide-core-example-icon slot="icon"></glide-core-example-icon>
  </glide-core-split-button-primary-button>

  <glide-core-split-button-secondary-button
    slot="secondary-button"
    label="Label"
    menu-placement="top-end"
    disabled
    menu-open
  >
    <glide-core-menu-button label="Label"></glide-core-menu-button>
  </glide-core-split-button-secondary-button>
</glide-core-split-button>
```
