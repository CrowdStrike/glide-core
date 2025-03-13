---
'@crowdstrike/glide-core': minor
---

Our CSS custom properties have been updated to follow a new semantic token format:

```
--glide-core-{collection}-{category*}-{scope*}-{property}-{variant*}--{state*}
```

`*` = optional

- **Collection** defines the type of styles such as typography, color, stroke, rounding, spacing, effect, etc.
- **Category** specifies the general purpose such as base, interactive, indent, or the component name in the case of extended styles.
- **Scope** specifies the area of properties or context where a style is applied such as surface, stroke, text, icon, width, etc.
- **Property** gives you the name of the property such as primary, secondary, container, xxs, etc. It’s the only mandatory level after Collection, which means that we should have at least two levels.
- **Variant** specifies the variation of the property such as active, inactive, expanded, etc.
- **State** specifies the state of the token such as idle, hovered, disabled, etc. Used mostly for color tokens, but can be also easily used for stroke, effect, or spacing.

All components have been updated to use these new tokens. Some components have visual updates that are worth calling out:

- Box shadow values have been redesigned.
- Button secondary and tertiary visual states have been redesigned.
  - If you were previously relying on the tertiary Button's included padding for spacing between elements, you'll now need to explicitly set `gap` due to the hover state changes.
- Button colors in dark mode have been changed to different values.
- Checkbox when indeterminate and disabled has a new visual design.
- Explicitly set `line-height`s were removed from most components.
- Icon Button was updated to follow Button's changes.
- Radio's selected, hover, and disabled visuals were updated.
- Split Button was visually redesigned.
- Toast colors in dark mode have been changed to different values.
- Tooltip's background color in dark mode has been updated.
