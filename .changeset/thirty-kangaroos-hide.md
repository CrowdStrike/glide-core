---
'@crowdstrike/glide-core': minor
---

Tag's default slot has been replaced by a `label` attribute to restrict its content to enforce visual consistency.

```diff
- <glide-core-tag>Label</glide-core-tag>
+ <glide-core-tag label="Label"></glide-core-tag>
```

Tag's `removable-label` attribute has been renamed to `removable` and is now boolean. Tag will use `label` instead to describe its removal button to screenreaders.

```diff
- <glide-core-tag removable-label="remove">Tag</glide-core-tag>
+ <glide-core-tag label="Label" removable></glide-core-tag>
```

Tag's "prefix" slot has been renamed "icon".

```diff
<glide-core-tag label="Label">
  <glide-core-example-icon
    name="drag-dots"
-   slot="prefix"
+   slot="icon"
  ></glide-core-example-icon>
</glide-core-tag>
```
