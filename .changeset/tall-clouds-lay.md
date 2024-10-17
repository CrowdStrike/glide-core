---
'@crowdstrike/glide-core': patch
---

Checkbox, Checkbox Group, Dropdown, Input, Radio Group, and Textarea now support [`setValidity()`](https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals/setValidity) and [`setCustomValidity()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/setCustomValidity) methods like their native counterparts to allow for triggering validation with user-provided error messages.

```js
const input = document.querySelector('glide-core-input');

// `setCustomValidity()` sets the validity message on the element
// and places the element in an invalid state.
input.setCustomValidity(
  'Please enter a name that is greater than 1 character.',
);

// The element is now marked as invalid.
// Returns `false`.
input.checkValidity();

// Displays the validity message to the user.
// Returns `false`.
input.reportValidity();

// Like native, provide an empty string to change
// the validity state to valid.
input.setCustomValidity('');
```

```js
const input = document.querySelector('glide-core-input');

// `setValidity()` accepts ValidityStateFlags as the first
// argument and a string for the validity message as the second
// argument
input.setValidity(
  { customError: true },
  'Please enter a name that is greater than 1 character.',
);

// The element is now marked as invalid.
// Returns `false`.
input.checkValidity();

// Displays the validity message to the user.
// Returns `false`.
input.reportValidity();

// Like native, provide an empty object for ValidityStateFlags
// to change the validity state to valid.
input.setValidity({});
```
