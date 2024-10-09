---
'@crowdstrike/glide-core': minor
---

Button's "prefix" and "suffix" slots have been renamed to "prefix-icon" and "suffix-icon".

```diff
<glide-core-button label="Label">
  <glide-core-example-icon
-   slot="prefix"
+   slot="prefix-icon"
    name="calendar"
  ></glide-core-example-icon>
  <glide-core-example-icon
-   slot="suffix"
+   slot="suffix-icon"
    name="edit"
  ></glide-core-example-icon>
</glide-core-button>
```

Button Group Button's "prefix" slot has been renamed to "icon".

```diff
<glide-core-button-group label="Label">

  <glide-core-button-group-button label="One">
    <glide-core-example-icon
-     slot="prefix"
+     slot="icon"
      name="calendar"
    ></glide-core-example-icon>
  </glide-core-button-group-button>
</glide-core-button-group>
```

Accordion's "prefix" and "suffix" slots have been renamed to "prefix-icon" and "suffix-icons".

```diff
<glide-core-accordion label="Label">
  Content

  <glide-core-example-icon
-   slot="prefix"
+   slot="prefix-icon"
    name="share"
  ></glide-core-example-icon>
  <glide-core-example-icon
-   slot="suffix"
+   slot="suffix-icons"
    name="edit"
  ></glide-core-example-icon>
  <glide-core-example-icon
-   slot="suffix"
+   slot="suffix-icons"
    name="settings"
  ></glide-core-example-icon>
</glide-core-accordion>
```

Accordion no longer dispaches a custom event. Accordion's state, which was available via the custom event's `detail` property, can be accessed via the `open` property.

```diff
- $0.addEventListener('toggle', (e) => console.log(e.detail.newState === 'open'))
+ $0.addEventListener('toggle', (e) => console.log(e.target.open))
```
