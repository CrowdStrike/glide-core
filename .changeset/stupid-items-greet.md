---
'@crowdstrike/glide-core': minor
---

- The default slot of Tab has been removed in favor of a `label` attribute.
- Tab Group now throws if a Tab is added without a corresponding Tab Panel and vice versa.
- `glide-core-tab-panel` has been renamed to `glide-core-tab-group-panel`.
  - Imports of `@crowdstrike/glide-core/tab.panel.js` will need updated to `@crowdstrike/glide-core/tab-group.panel.js`.
- `glide-core-tab` has been renamed to `glide-core-tab-group-tab`.
  - Imports of `@crowdstrike/glide-core/tab.js` will need updated to `@crowdstrike/glide-core/tab-group.tab.js`.
