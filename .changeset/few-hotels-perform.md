---
'@crowdstrike/glide-core': patch
---

Input now supports a `pattern` attribute like the [native](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/pattern) input element. Unlike native, pattern validation occurs independently of the required attribute, allowing optional fields to be marked invalid if the pattern isn't matched.

```html
<glide-core-input label="Label" pattern="[a-z]{4,8}"></glide-core-input>
```

```js
// Returns `false`.
document.querySelector('glide-core-input').checkValidity();
```
