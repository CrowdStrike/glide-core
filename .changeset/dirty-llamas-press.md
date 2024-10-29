---
'@crowdstrike/glide-core': patch
---

- Tag's background color when disabled has been updated to improve Tag's visibility when placed on another disabled component.

- `@crowdstrike/glide-core/styles/variables.css` has been updated with the latest from Figma:

  ## Light

  ```diff
  - --glide-core-surface-primary-disabled: #1d7afc26;
  + --glide-core-surface-primary-disabled: #d7e7ff;

  + --glide-core-generic-border-active: #6d6d6d;
  + --glide-core-surface-tag-default: #00000012;
  ```

  ## Dark

  ```diff
  + --glide-core-generic-border-active: #6d6d6d;
  + --glide-core-surface-tag-default: #ffffff1a;
  ```

  ## System

  ```diff
  + --glide-core-number-14: 0.875rem;
  + --glide-core-number-16: 1rem;
  ```
