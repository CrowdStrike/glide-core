---
'@crowdstrike/glide-core': patch
---

- Tree Item's properties are now reflected.
- Split Container (now Split Button Container) supports dynamic replacement of Split Button Container Button with Split Button Container Link and vice versa.
- Split Button Container's `menu-open` attribute and `menuOpen` property are now synchronized with the state of the underlying Menu.
- Split Button Container's menu button now retains it hover state on click.

- Split Button Container's `focus()` method now supports an `options.target` property for focusing its menu button instead of its "primary-action" button:

  ```ts
  splitButtonContainer.focus({ target: 'menu-button' });
  ```

- Split Button Container's `click()` method now supports an `options.target` property for clicking its menu button instead of its "primary-action" button:

  ```ts
  splitButtonContainer.click({ target: 'menu-button' });
  ```
