---
'@crowdstrike/glide-core': patch
---

- Tooltip's `placement` attribute is now reflected.
- Tooltip now has a `screenreader-hidden` attribute for cases where text is truncated and the full text is shown in a tooltip.
  Screenreaders are able to read the entirety of the truncated text without the help of a tooltip if the text is truncated using CSS.
  Use this attribute to hide the tooltip from screenreaders so its text isn't read in duplicate.
