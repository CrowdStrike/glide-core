# @crowdstrike/glide-core

## 0.4.6

### Patch Changes

- [#174](https://github.com/CrowdStrike/glide-core/pull/174) [`bba992f`](https://github.com/CrowdStrike/glide-core/commit/bba992fbb9f9a580affc8c38fc3ac40b5ceaec84) Thanks [@danwenzel](https://github.com/danwenzel)! - Ensure tooltip remains open when hovered

## 0.4.5

### Patch Changes

- [#181](https://github.com/CrowdStrike/glide-core/pull/181) [`fe08a0e`](https://github.com/CrowdStrike/glide-core/commit/fe08a0ec01a08d9d1aa64f9a6106278f8bdc8368) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Adjust types order defined in the package.json exports to come first. The "exports" field is order-based. For example, a scenario where both the "types" and "import" condition could be active, "types" should be first so that it matches and returns a .d.ts file, rather than a .js file from the "import" condition.

## 0.4.4

### Patch Changes

- [#179](https://github.com/CrowdStrike/glide-core/pull/179) [`507a5ed`](https://github.com/CrowdStrike/glide-core/commit/507a5ed0c9e72cca435538c0bae1c74869ab8125) Thanks [@ynotdraw](https://github.com/ynotdraw)! - After an accessibility audit of Accordion, it was determined that `aria-labelledby`, `role="region"`, and `tabindex="0"` could be removed from the inner content area. These attributes were removed.

- [#169](https://github.com/CrowdStrike/glide-core/pull/169) [`aa63ea1`](https://github.com/CrowdStrike/glide-core/commit/aa63ea1217efa04e431d63b28fbc2003f2ecbd04) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Adjusted padding of cs-button

- [#151](https://github.com/CrowdStrike/glide-core/pull/151) [`f45c9d5`](https://github.com/CrowdStrike/glide-core/commit/f45c9d53fd88de4107fd4f10f6baea4379d99896) Thanks [@dylankcrwd](https://github.com/dylankcrwd)! - Adds `cs-radio-group` and `cs-radio`.

## 0.4.3

### Patch Changes

- [#176](https://github.com/CrowdStrike/glide-core/pull/176) [`77f5727`](https://github.com/CrowdStrike/glide-core/commit/77f57273254bfe50ecc545655e94936194ac2f37) Thanks [@clintcs](https://github.com/clintcs)! - Fix Checkbox, Checkbox Group, and Dropdown not resetting with their form.

- [#175](https://github.com/CrowdStrike/glide-core/pull/175) [`a3460e3`](https://github.com/CrowdStrike/glide-core/commit/a3460e344e40f80fadce56d3623a4c7a6b372df6) Thanks [@clintcs](https://github.com/clintcs)! - Allow Dropdown and Menu's default slots to contain only whitespace to accommodate asychronously rendered options.

- [#157](https://github.com/CrowdStrike/glide-core/pull/157) [`aa7d760`](https://github.com/CrowdStrike/glide-core/commit/aa7d7602c85845fd80f4b48a421120e6b6623c61) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Adjusted color variables for Button, Button Group Button, Dropdown, Input, Tab, and Textarea.

- [#173](https://github.com/CrowdStrike/glide-core/pull/173) [`abb0914`](https://github.com/CrowdStrike/glide-core/commit/abb0914ebfa673dbcf61039ecbe80ba77618c72d) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Remove `display: flex;` from the Modal body content to default to `display: block;` instead.

- [#168](https://github.com/CrowdStrike/glide-core/pull/168) [`32fcac8`](https://github.com/CrowdStrike/glide-core/commit/32fcac8934983b939d5e6bb9995c7695f2acf0da) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Fixed a bug in Modal where a mousedown event would happen somewhere inside the modal, but the mouseup event would occur outside of the Modal. This would cause the Modal to close, which is not the expected behavior. By switching from a click event to a mousedown event, we get the expected behavior of remaining open.

- [#171](https://github.com/CrowdStrike/glide-core/pull/171) [`e8eba6b`](https://github.com/CrowdStrike/glide-core/commit/e8eba6b73e03425e0f43a00ed714aedd9fab4922) Thanks [@clintcs](https://github.com/clintcs)! - Input and Textarea now expand to the full width of their container.

## 0.4.2

### Patch Changes

- [#145](https://github.com/CrowdStrike/glide-core/pull/145) [`c8a8dfe`](https://github.com/CrowdStrike/glide-core/commit/c8a8dfee3b3b9068d8008552a3d7c8d5bea1caee) Thanks [@danwenzel](https://github.com/danwenzel)! - Add Toasts

- [#160](https://github.com/CrowdStrike/glide-core/pull/160) [`a3f9a47`](https://github.com/CrowdStrike/glide-core/commit/a3f9a47ea751ba213d620e9e60a43b3f2e548ba8) Thanks [@clintcs](https://github.com/clintcs)! - Checkbox Group error feedback no longer shows when the control is valid.

- [#164](https://github.com/CrowdStrike/glide-core/pull/164) [`11ee00c`](https://github.com/CrowdStrike/glide-core/commit/11ee00cc0ba191a38648b48aa87505578f36cfa1) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Update ifDefined, ref, and when imports to be from lit rather than lit-html

- [#166](https://github.com/CrowdStrike/glide-core/pull/166) [`b6f6e42`](https://github.com/CrowdStrike/glide-core/commit/b6f6e42db3ff94339a6a75baad5d1e575c8b7a4e) Thanks [@clintcs](https://github.com/clintcs)! - Don't throw when Dropdown's default slot is empty so options can be provided asynchronously.

- [#160](https://github.com/CrowdStrike/glide-core/pull/160) [`a3f9a47`](https://github.com/CrowdStrike/glide-core/commit/a3f9a47ea751ba213d620e9e60a43b3f2e548ba8) Thanks [@clintcs](https://github.com/clintcs)! - Add a `hide-label` attribute to Checkbox, Checkbox Group, and Toggle.

- [#159](https://github.com/CrowdStrike/glide-core/pull/159) [`9db6539`](https://github.com/CrowdStrike/glide-core/commit/9db65395ec064e64f6e42c04fd72eac2b721f0f1) Thanks [@clintcs](https://github.com/clintcs)! - Use "not-allowed" cursor consistently with form controls when disabled.

- [#162](https://github.com/CrowdStrike/glide-core/pull/162) [`c266dcb`](https://github.com/CrowdStrike/glide-core/commit/c266dcbbd6e55234a20f8864414523dc8bb9bcbb) Thanks [@clintcs](https://github.com/clintcs)! - Menu no longer opens then closes immediately when used in another web component.

- [#156](https://github.com/CrowdStrike/glide-core/pull/156) [`80802c9`](https://github.com/CrowdStrike/glide-core/commit/80802c9712ae9884e7999376cd1ccc9ba3b65847) Thanks [@clintcs](https://github.com/clintcs)! - Don't render Toggle summary when empty.

## 0.4.1

### Patch Changes

- [#154](https://github.com/CrowdStrike/glide-core/pull/154) [`eae9f49`](https://github.com/CrowdStrike/glide-core/commit/eae9f49b958440986e54427a43b09982a3597068) Thanks [@clintcs](https://github.com/clintcs)! - Dropdown no longer opens then closes immediately when used in another web component.

## 0.4.0

### Minor Changes

- [#153](https://github.com/CrowdStrike/glide-core/pull/153) [`73cc661`](https://github.com/CrowdStrike/glide-core/commit/73cc6611499a7b728741f8b8742ba3ef639bb50d) Thanks [@clintcs](https://github.com/clintcs)! - Rename Textarea's `label-position` attribute to `orientation` to match other components.

- [#150](https://github.com/CrowdStrike/glide-core/pull/150) [`3dfee94`](https://github.com/CrowdStrike/glide-core/commit/3dfee94fd0494ba158d276d6ac1dd7cf3fb1eba8) Thanks [@clintcs](https://github.com/clintcs)! - Rename Input's `label-position` attribute to `orientation` to match other components.

- [#144](https://github.com/CrowdStrike/glide-core/pull/144) [`17d9c34`](https://github.com/CrowdStrike/glide-core/commit/17d9c34960b8ea6fe2c242460d2b3d65840d6d4d) Thanks [@clintcs](https://github.com/clintcs)! - Throw with all components when slots are missing or invalid.

- [#139](https://github.com/CrowdStrike/glide-core/pull/139) [`cee64b3`](https://github.com/CrowdStrike/glide-core/commit/cee64b35e8584398d5fec98509b1099223b267c1) Thanks [@clintcs](https://github.com/clintcs)! - Replace Dropdown's `setCustomValidity` method and validation message, shown when Dropdown is invalid, with a "description" slot shown always.

- [#140](https://github.com/CrowdStrike/glide-core/pull/140) [`0c91037`](https://github.com/CrowdStrike/glide-core/commit/0c9103766f67397706c58174f3691ac5ba08b50f) Thanks [@clintcs](https://github.com/clintcs)! - Dialog's "close" and Accordion's "toggle" event no longer bubble.

### Patch Changes

- [#136](https://github.com/CrowdStrike/glide-core/pull/136) [`36f832f`](https://github.com/CrowdStrike/glide-core/commit/36f832f58b9ef04996a75bd966d9ef6780e83543) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Minor color adjustments to cs-tag and cs-tree.item components

- [#149](https://github.com/CrowdStrike/glide-core/pull/149) [`f616b0b`](https://github.com/CrowdStrike/glide-core/commit/f616b0b882f15a5be4535640c39eac7ba55e33e5) Thanks [@clintcs](https://github.com/clintcs)! - Fix Tooltip not being announced by VoiceOver.

- [#107](https://github.com/CrowdStrike/glide-core/pull/107) [`50e40d6`](https://github.com/CrowdStrike/glide-core/commit/50e40d6afa27d74b373e47798bbe00815848df37) Thanks [@dylankcrwd](https://github.com/dylankcrwd)! - Adds `cs-modal`.

## 0.3.3

### Patch Changes

- [#121](https://github.com/CrowdStrike/glide-core/pull/121) [`b1f0bcb`](https://github.com/CrowdStrike/glide-core/commit/b1f0bcb4db5d4517763f8f75ed4f317e241559de) Thanks [@danwenzel](https://github.com/danwenzel)! - Switch to a fixed position strategy for tooltip

- [#130](https://github.com/CrowdStrike/glide-core/pull/130) [`b30a9f3`](https://github.com/CrowdStrike/glide-core/commit/b30a9f3128e05ddcbee835d4f39380f11c84e3af) Thanks [@clintcs](https://github.com/clintcs)! - Add Tooltip support to Textarea.

- [#124](https://github.com/CrowdStrike/glide-core/pull/124) [`1515e64`](https://github.com/CrowdStrike/glide-core/commit/1515e645a3e4b69036f64510d57936afa343b37a) Thanks [@clintcs](https://github.com/clintcs)! - Prevent Tooltip from getting a line height.

- [#91](https://github.com/CrowdStrike/glide-core/pull/91) [`a5cb2ea`](https://github.com/CrowdStrike/glide-core/commit/a5cb2ea928b8c9854f0fb77c72cb35cbad182da0) Thanks [@danwenzel](https://github.com/danwenzel)! - Add menu to Tree Item

- [#110](https://github.com/CrowdStrike/glide-core/pull/110) [`bd69ab8`](https://github.com/CrowdStrike/glide-core/commit/bd69ab8a0ce9a1ea7ce9fc690df439662c3632c4) Thanks [@clintcs](https://github.com/clintcs)! - Add Checkbox Group.

- [#127](https://github.com/CrowdStrike/glide-core/pull/127) [`52c1234`](https://github.com/CrowdStrike/glide-core/commit/52c12346d6863a682a5bdd17e5c7cf64a79a9050) Thanks [@clintcs](https://github.com/clintcs)! - Add Tooltip support to Input.

## 0.3.2

### Patch Changes

- [#119](https://github.com/CrowdStrike/glide-core/pull/119) [`fc9bfeb`](https://github.com/CrowdStrike/glide-core/commit/fc9bfeb473c96061ba9de25348cf839cdd489e99) Thanks [@clintcs](https://github.com/clintcs)! - Fixes for Tooltip for an overflowing "target" and a misaligned tooltip.

- [#114](https://github.com/CrowdStrike/glide-core/pull/114) [`da5e41e`](https://github.com/CrowdStrike/glide-core/commit/da5e41e8bf9b8a5b54b6df706e16d0fc431d74f9) Thanks [@clintcs](https://github.com/clintcs)! - Expose Menu's `placement` as an attribute.

- [#116](https://github.com/CrowdStrike/glide-core/pull/116) [`79ebcf0`](https://github.com/CrowdStrike/glide-core/commit/79ebcf00150ca36df447fd12b9b5b8339fd2a24b) Thanks [@clintcs](https://github.com/clintcs)! - Don't run Floating UI when Tooltip is hidden.

- [#120](https://github.com/CrowdStrike/glide-core/pull/120) [`2b269d8`](https://github.com/CrowdStrike/glide-core/commit/2b269d83f829ef9bce4eca969c9192769b04399a) Thanks [@dylankcrwd](https://github.com/dylankcrwd)! - Fixes styling issue with button-group-button

- [#122](https://github.com/CrowdStrike/glide-core/pull/122) [`31c7791`](https://github.com/CrowdStrike/glide-core/commit/31c7791d5d48ac7ae9c2ce3e127d75a2e87fa138) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Adds a fix preventing cs-menu options from wrapping

## 0.3.1

### Patch Changes

- [#112](https://github.com/CrowdStrike/glide-core/pull/112) [`abef2fb`](https://github.com/CrowdStrike/glide-core/commit/abef2fbe4d0f4ebdd9b804a6b4c5e4ebe6a97478) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Resolved a bug preventing input from being imported in projects

## 0.3.0

### Minor Changes

- [#99](https://github.com/CrowdStrike/glide-core/pull/99) [`24967eb`](https://github.com/CrowdStrike/glide-core/commit/24967eb95dc6501eea23c22607a31ea87f4603dc) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Renamed cs-drawer's `--cs-drawer-width` CSS property to `--width`.

  ```diff
  -    <cs-drawer style="--cs-drawer-width: 20rem;">
  +    <cs-drawer style="--width: 20rem;">
        <div style="padding: 0.5rem">Width of 20rem</div>
      </cs-drawer>
  ```

- [#87](https://github.com/CrowdStrike/glide-core/pull/87) [`c9b5e87`](https://github.com/CrowdStrike/glide-core/commit/c9b5e87a9f4c7a8538d4331752ed05e70752cf64) Thanks [@clintcs](https://github.com/clintcs)! - Disallow importing from `library/` and `styles/`.

- [#89](https://github.com/CrowdStrike/glide-core/pull/89) [`529c963`](https://github.com/CrowdStrike/glide-core/commit/529c96396b8a0d73d4012cf8baa1142957e2efce) Thanks [@clintcs](https://github.com/clintcs)! - `tree-item.js` → `tree.item.js`

### Patch Changes

- [#79](https://github.com/CrowdStrike/glide-core/pull/79) [`df8203e`](https://github.com/CrowdStrike/glide-core/commit/df8203e2efbe28de7487933a15dc4c8aa06af43e) Thanks [@clintcs](https://github.com/clintcs)! - Components now throw in development when slots contain unsupported elements or required slots are missing.

- [#52](https://github.com/CrowdStrike/glide-core/pull/52) [`2f3dbc3`](https://github.com/CrowdStrike/glide-core/commit/2f3dbc36535cefdd07485ca7ceff784c75a7d899) Thanks [@dylankcrwd](https://github.com/dylankcrwd)! - Adds cs-button-group and cs-button-group-button

- [#97](https://github.com/CrowdStrike/glide-core/pull/97) [`752e1a1`](https://github.com/CrowdStrike/glide-core/commit/752e1a14ef2092458827deed72e442900aff8419) Thanks [@gfig-cs](https://github.com/gfig-cs)! - Button a11y fixes

- [#106](https://github.com/CrowdStrike/glide-core/pull/106) [`558e01e`](https://github.com/CrowdStrike/glide-core/commit/558e01e47c6b304d189e6f0974b72ec914a00c03) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Adjusted the height of the cs-button for both large and small variants.

- [#81](https://github.com/CrowdStrike/glide-core/pull/81) [`2525e41`](https://github.com/CrowdStrike/glide-core/commit/2525e418b899962e7e738c5d0cc5caebd482c82e) Thanks [@dylankcrwd](https://github.com/dylankcrwd)! - Adds cs-tag

- [#94](https://github.com/CrowdStrike/glide-core/pull/94) [`663115f`](https://github.com/CrowdStrike/glide-core/commit/663115f7a6166a0d3bc79350fb114d568e9ee77a) Thanks [@dylankcrwd](https://github.com/dylankcrwd)! - Adds a "size" css variable to ExampleIcon and is applied in Tag

- [#96](https://github.com/CrowdStrike/glide-core/pull/96) [`6835819`](https://github.com/CrowdStrike/glide-core/commit/68358195c97f6fba8f2d46931f729e069866d4c0) Thanks [@clintcs](https://github.com/clintcs)! - Add Dropdown `variant?: "quiet"` and `hide-label: boolean` arguments.

- [#104](https://github.com/CrowdStrike/glide-core/pull/104) [`7fc9e90`](https://github.com/CrowdStrike/glide-core/commit/7fc9e903a6536859634b7ed82ece2b98db24d755) Thanks [@danwenzel](https://github.com/danwenzel)! - Add Textarea

- [#90](https://github.com/CrowdStrike/glide-core/pull/90) [`e58d27f`](https://github.com/CrowdStrike/glide-core/commit/e58d27f4926efc1f7ffc4271526d9a661ceaabab) Thanks [@gfig-cs](https://github.com/gfig-cs)! - Checkbox a11y fixes

- [#78](https://github.com/CrowdStrike/glide-core/pull/78) [`85215fa`](https://github.com/CrowdStrike/glide-core/commit/85215facfac5fd5e8506cd76954ca65cea8fb922) Thanks [@clintcs](https://github.com/clintcs)! - Add Toggle

- [#48](https://github.com/CrowdStrike/glide-core/pull/48) [`4bc3b10`](https://github.com/CrowdStrike/glide-core/commit/4bc3b10d2095557c372a914e1c1f5ca1ded9fd4b) Thanks [@dylankcrwd](https://github.com/dylankcrwd)! - Adds cs-tab, cs-tab-panel, and cs-tab-group

- [#88](https://github.com/CrowdStrike/glide-core/pull/88) [`720dd83`](https://github.com/CrowdStrike/glide-core/commit/720dd83c3798fb48748e38bfbd0f7f5e80778f55) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Adds cs-status-indicator

- [#83](https://github.com/CrowdStrike/glide-core/pull/83) [`a21640c`](https://github.com/CrowdStrike/glide-core/commit/a21640cf6d020227a46d710f069ee3b4532c26aa) Thanks [@danwenzel](https://github.com/danwenzel)! - Add Input

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
