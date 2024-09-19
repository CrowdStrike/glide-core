---
'@crowdstrike/glide-core': minor
---

- Tag's default slot has been replaced by a `label` attribute to restrict its content to enforce visual consistency.
- Tag's `removable-label` attribute has been renamed to `removable` and is now boolean.
  Tag will use `label` instead to describe its removal button to screenreaders.
- Tag's "prefix" slot has been renamed "icon".
