# @crowdstrike/glide-core-styles

## 0.2.1

### Patch Changes

- [#77](https://github.com/CrowdStrike/glide-core/pull/77) [`84d6fee`](https://github.com/CrowdStrike/glide-core/commit/84d6feecbe539c426669a9b6a7ec79d37bf275d0) Thanks [@clintcs](https://github.com/clintcs)! - Exclude dotfiles from published package

- [#88](https://github.com/CrowdStrike/glide-core/pull/88) [`720dd83`](https://github.com/CrowdStrike/glide-core/commit/720dd83c3798fb48748e38bfbd0f7f5e80778f55) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Adds status CSS variables

## 0.2.0

### Minor Changes

- [#30](https://github.com/CrowdStrike/glide-core/pull/30) [`286786c`](https://github.com/CrowdStrike/glide-core/commit/286786c48b565337b33cca34c89783e6b929f733) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Updated CSS Variables in `@glide-core-styles` to align with Figma.

  - Removed `--cs-icon-display`.
  - Added `--cs-icon-active`, `--cs-icon-primary-hover`, and `--cs-icon-tertiary-disabled`.
  - Updated `--cs-icon-default` and `--cs-icon-primary` color values.

  Added the `<cs-icon-button>` component.

## 0.1.1

### Patch Changes

- [#9](https://github.com/CrowdStrike/glide-core/pull/9) [`8f0a126`](https://github.com/CrowdStrike/glide-core/commit/8f0a1260cee0d6875a67f38c4ee45ded45832ea5) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Update [`engines`](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#engines) in the `package.json` files to allow for a wider range for `node` and `pnpm`.

## 0.1.0

### Minor Changes

- [#2](https://github.com/CrowdStrike/glide-core/pull/2) [`60d206e`](https://github.com/CrowdStrike/glide-core/commit/60d206e70baa2df869f60760960875f3427e1fe2) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Initial release of packages. To use these packages:

  Add the packages as dependencies in your project:

  ```bash
  pnpm i --save @crowdstrike/glide-core-styles @crowdstrike/glide-core-components
  ```

  Import the styles in your project:

  ```js
  import '@crowdstrike/glide-core-styles';
  ```

  Import the component you'd like to render:

  ```js
  import '@crowdstrike/glide-core-components/button.js';
  ```

  Render the component in your markup:

  ```html
  <cs-button size="small">Button</cs-button>
  ```
