# @crowdstrike/glide-core-components

## 0.2.0

### Minor Changes

- [#47](https://github.com/CrowdStrike/glide-core/pull/47) [`986c359`](https://github.com/CrowdStrike/glide-core/commit/986c3593de9487eb1a4c854cdde1182b655d1d46) Thanks [@clintcs](https://github.com/clintcs)! - Add Checkbox

- [#20](https://github.com/CrowdStrike/glide-core/pull/20) [`253ef2e`](https://github.com/CrowdStrike/glide-core/commit/253ef2e5f8579d6d7d88e3bbc83b424fecbe39ea) Thanks [@clintcs](https://github.com/clintcs)! - Reflect Button's `ariaExpanded` and `ariaHasPopup` properties.

- [#19](https://github.com/CrowdStrike/glide-core/pull/19) [`a7cdf8e`](https://github.com/CrowdStrike/glide-core/commit/a7cdf8e13c0e16fc50cd564b019c08cb960e4d2c) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Close the shadow root for cs-button.

### Patch Changes

- [#32](https://github.com/CrowdStrike/glide-core/pull/32) [`e389618`](https://github.com/CrowdStrike/glide-core/commit/e3896182fc45b12fb1cd19a84e460bd99a2857f5) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Added transitions to `<cs-button>` to match `<cs-icon-button>`.

- [#35](https://github.com/CrowdStrike/glide-core/pull/35) [`d921857`](https://github.com/CrowdStrike/glide-core/commit/d9218570a8d3eec817d523819fd15382ea534c6c) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Added the `<cs-accordion>` component.

  ```html
  <cs-accordion label="Accordion Label"> Inner content </cs-accordion>
  ```

- [#53](https://github.com/CrowdStrike/glide-core/pull/53) [`58c7a9a`](https://github.com/CrowdStrike/glide-core/commit/58c7a9af364b18276217be3b9cf812418b050f6b) Thanks [@clintcs](https://github.com/clintcs)! - Add Dropdown

- [#25](https://github.com/CrowdStrike/glide-core/pull/25) [`338e64b`](https://github.com/CrowdStrike/glide-core/commit/338e64b48daedc7b7a4c6086567c4c43bcd38838) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Updated `<cs-button` to default to a closed shadow root, removing the webdriver workaround.

  You can reopen the shadow root in tests if needed:

  ```ts
  // test.ts
  import Button from '@crowdstrike/glide-core-components/button.js';
  Button.shadowRootOptions.mode = 'open';
  ```

- [#30](https://github.com/CrowdStrike/glide-core/pull/30) [`286786c`](https://github.com/CrowdStrike/glide-core/commit/286786c48b565337b33cca34c89783e6b929f733) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Updated CSS Variables in `@glide-core-styles` to align with Figma.

  - Removed `--cs-icon-display`.
  - Added `--cs-icon-active`, `--cs-icon-primary-hover`, and `--cs-icon-tertiary-disabled`.
  - Updated `--cs-icon-default` and `--cs-icon-primary` color values.

  Added the `<cs-icon-button>` component.

- [#26](https://github.com/CrowdStrike/glide-core/pull/26) [`b04fdfa`](https://github.com/CrowdStrike/glide-core/commit/b04fdfa536bbb5fd6b212b673f50499c15f477ba) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Added the `<cs-drawer` component.

  The Drawer can be opened via the `open` method:

  ```html
  <script>
    const drawer = context.canvasElement.querySelector('cs-drawer');
    drawer?.open();
  </script>

  <cs-drawer>Content</cs-drawer>
  ```

  It is closed via the `close` method:

  ```html
  <script>
    const drawer = context.canvasElement.querySelector('cs-drawer');
    drawer?.close();
  </script>

  <cs-drawer>Content</cs-drawer>
  ```

  A custom width can be set via the `--cs-drawer-width` CSS custom property:

  ```html
  <cs-drawer style="--cs-drawer-width: 20rem;">Content</cs-drawer>
  ```

- [#28](https://github.com/CrowdStrike/glide-core/pull/28) [`91b51bc`](https://github.com/CrowdStrike/glide-core/commit/91b51bcdb715a524ec39791568bc7c64c6ccb69a) Thanks [@danwenzel](https://github.com/danwenzel)! - Added the `<cs-menu>` component.

  ```html
  <cs-menu>
    <cs-menu-link label="One" url="/one"> </cs-menu-link>
    <cs-menu-link label="Two" url="/two"> </cs-menu-link>
    <!--
      If an option does not have an associated url,
      you can use <cs-menu-button> and provide your own click handler
    -->
    <cs-menu-button label="Three"> </cs-menu-button>

    <cs-button slot="target" variant="secondary">Target</cs-button>
  </cs-menu>
  ```

- [#33](https://github.com/CrowdStrike/glide-core/pull/33) [`efff38b`](https://github.com/CrowdStrike/glide-core/commit/efff38bbe3190dcf6e68ff698217a31ca1ff236e) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Added `delegatesFocus: true` to both button components.

- [#39](https://github.com/CrowdStrike/glide-core/pull/39) [`df88685`](https://github.com/CrowdStrike/glide-core/commit/df88685e521f87ae925032289061ba4d65bacb51) Thanks [@danwenzel](https://github.com/danwenzel)! - Add Tree

## 0.1.3

### Patch Changes

- [#15](https://github.com/CrowdStrike/glide-core/pull/15) [`a5de76b`](https://github.com/CrowdStrike/glide-core/commit/a5de76be2bafb4b2a276fe84075f9fd1fb1943f2) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Updated `<cs-button` to properly participate in forms when `type="submit"` or `type="reset"`.

## 0.1.2

### Patch Changes

- [#9](https://github.com/CrowdStrike/glide-core/pull/9) [`8f0a126`](https://github.com/CrowdStrike/glide-core/commit/8f0a1260cee0d6875a67f38c4ee45ded45832ea5) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Update [`engines`](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#engines) in the `package.json` files to allow for a wider range for `node` and `pnpm`.

## 0.1.1

### Patch Changes

- [#5](https://github.com/CrowdStrike/glide-core/pull/5) [`e3154d5`](https://github.com/CrowdStrike/glide-core/commit/e3154d5efdb4b24bede0bbaf8336a99308e2fb16) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Updated the `package.json` to include `files: ["dist"]` so that it gets included in publishing.

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
