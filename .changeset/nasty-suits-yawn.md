---
'@crowdstrike/glide-core': minor
---

Radio's import path has been updated to match our subcomponent naming conventions elsewhere.

```diff
- import '@crowdstrike/glide-core/radio.js';
+ import '@crowdstrike/glide-core/radio-group.radio.js';
```

Radio Group no longer reflects its `value` attribute. To determine the current value of Radio Group, use its `value` property instead.

```diff
- document.querySelector('glide-core-radio-group').getAttribute('value');
+ document.querySelector('glide-core-radio-group').value;
```

Radio's `required` property has been renamed to `privateRequired` to deter external use. Set `required` on the Radio Group directly and it'll apply to all child Radios.

Radio's `invalid` property has been renamed to `privateInvalid` to deter external use. The Radio Group must be marked as invalid using `required`, `setValidity()`, or `setCustomValidity()`.

Additional updates have been made to match existing patterns in our other form elements:

- Radio Group now respects programmatic changes to `value`.
- Radio Group now updates its `value` property when the `checked` attribute of a child Radio changes.
- Radio Group now updates its validity state when `required` is changed programmatically.
- When a Radio's `value` updates, Radio Group's `value` also updates to reflect the newly provided Radio `value`.
