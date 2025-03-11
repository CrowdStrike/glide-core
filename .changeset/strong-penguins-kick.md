---
'@crowdstrike/glide-core': minor
---

Our CSS custom properties have been updated to follow a new semantic token format:

```
--glide-core-{collection}-{category*}-{scope*}-{property}-{variant*}--{state*}
```

`*` = optional

All components have been updated to use these new tokens. Some components have visual updates that are worth mentioning:

- Button secondary and tertiary states have been redesigned
- Button colors in dark mode have been changed to different values
- Icon Button was updated to follow Button's changes
- Checkbox when indeterminate and disabled has a new visual design
- Split Button was visually redesigned
