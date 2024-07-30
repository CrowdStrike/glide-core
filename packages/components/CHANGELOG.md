# @crowdstrike/glide-core

## 0.6.0

### Minor Changes

- [#254](https://github.com/CrowdStrike/glide-core/pull/254) [`a307053`](https://github.com/CrowdStrike/glide-core/commit/a307053006a9346510a29899b2d48e7e4eb6b702) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Removed the `--glide-core-text-link-2` CSS custom property.

- [#230](https://github.com/CrowdStrike/glide-core/pull/230) [`66a529a`](https://github.com/CrowdStrike/glide-core/commit/66a529aed3328624ff1421e094c2dece950c97f5) Thanks [@clintcs](https://github.com/clintcs)! - Menu's target button is now accessibly associated with its options.
  To make the association possible, Menu options must now be wrapped in `<glide-core-menu-options>`
  so that the ID of Menu's target is available to the options (`aria-labelledby`) and vice versa (`aria-controls`).

  ```diff
  <glide-core-menu>
   <glide-core-button slot="target"></glide-core-button>

  - <glide-core-menu-link></glide-core-menu-link>
  - <glide-core-menu-link></glide-core-menu-link>
  + <glide-core-menu-options>
  +    <glide-core-menu-link></glide-core-menu-link>
  +    <glide-core-menu-link></glide-core-menu-link>
  +  </glide-core-menu.options>
  </glide-core-menu>
  ```

### Patch Changes

- [#234](https://github.com/CrowdStrike/glide-core/pull/234) [`eeb727b`](https://github.com/CrowdStrike/glide-core/commit/eeb727b0e49d094ac21ac61a9f4f47bcd66cbe7e) Thanks [@clintcs](https://github.com/clintcs)! - - Icon Button support for `aria-controls`.

  - Icon Button's `ariaExpanded` and `ariaHasPopup` properties are correctly reflected as `aria-expanded` and `aria-haspopup` instead of `ariaexpanded` and `ariahaspopup`.
  - Split Button support for `aria-controls`, `aria-expanded`, and `aria-haspopup`.
  - All three attributes are passed to each component's underlying `<button>` for better compatibility with screen readers.

- [#230](https://github.com/CrowdStrike/glide-core/pull/230) [`66a529a`](https://github.com/CrowdStrike/glide-core/commit/66a529aed3328624ff1421e094c2dece950c97f5) Thanks [@clintcs](https://github.com/clintcs)! - - Button supports `aria-controls`.

  - Button's `ariaExpanded` and `ariaHasPopup` properties are correctly reflected as `aria-expanded` and `aria-haspopup` instead of `ariaexpanded` and `ariahaspopup`.
  - All three attributes are passed to the underlying `<button>` for better compatibility with screen readers.

- [#260](https://github.com/CrowdStrike/glide-core/pull/260) [`a73e56a`](https://github.com/CrowdStrike/glide-core/commit/a73e56a3bfc2a4bff52d61aab4aff742e9c635c4) Thanks [@clintcs](https://github.com/clintcs)! - Fix Dropdown not closing when it loses focus.

- [#256](https://github.com/CrowdStrike/glide-core/pull/256) [`c577453`](https://github.com/CrowdStrike/glide-core/commit/c577453710dbebff5e5cea3ce55a50eb4e8b51bd) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Updated the Tooltip offset to be closer to the target.

- [#231](https://github.com/CrowdStrike/glide-core/pull/231) [`aa2fa81`](https://github.com/CrowdStrike/glide-core/commit/aa2fa816c6ca33a7bfac66687ef01929d350afeb) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Tooltips now have a max-width and overflow wrap the provided text rather than growing for eternity in length.

- [#237](https://github.com/CrowdStrike/glide-core/pull/237) [`9f08a14`](https://github.com/CrowdStrike/glide-core/commit/9f08a1414e4cde4291b35ea31c0b863c07911aad) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Increases the size of the Radio circle from 14px to 16px. Adjusts the spacing between radio elements.

- [#244](https://github.com/CrowdStrike/glide-core/pull/244) [`3657dc7`](https://github.com/CrowdStrike/glide-core/commit/3657dc794a9bdaee2d8e212d1d3cb7c2390b2076) Thanks [@dylankcrwd](https://github.com/dylankcrwd)! - Updates `glide-core-tree-item` text to use ellipses on overflow.

- [#238](https://github.com/CrowdStrike/glide-core/pull/238) [`b436d86`](https://github.com/CrowdStrike/glide-core/commit/b436d866fe0781de9a9d6570035d015f847f3478) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Improves screenreader support for Toggle so that it is announced as a switch rather than a checkbox.

- [#255](https://github.com/CrowdStrike/glide-core/pull/255) [`afd65e9`](https://github.com/CrowdStrike/glide-core/commit/afd65e99af262e4e6fbc86b639fec53ee8bd5caa) Thanks [@danwenzel](https://github.com/danwenzel)! - Fix alignment for tooltips inside backdrop-filter elements

- [#252](https://github.com/CrowdStrike/glide-core/pull/252) [`72fbb47`](https://github.com/CrowdStrike/glide-core/commit/72fbb4718cb9d54d269bad86bc4764f5b4d8690c) Thanks [@danwenzel](https://github.com/danwenzel)! - Add Japanese and French translations

- [#236](https://github.com/CrowdStrike/glide-core/pull/236) [`67be392`](https://github.com/CrowdStrike/glide-core/commit/67be392249ea9be7f71034f93e2de7b664a489a1) Thanks [@clintcs](https://github.com/clintcs)! - Button, Button Group Button, Icon Button, Split Button, Tab, and Radio Group have a "not-allowed" cursor when disabled to match other components.

- [#222](https://github.com/CrowdStrike/glide-core/pull/222) [`32b1d6f`](https://github.com/CrowdStrike/glide-core/commit/32b1d6f9bdccf1db28037b9dd372d224a34f5bde) Thanks [@dylankcrwd](https://github.com/dylankcrwd)! - Updates `glide-core-icon-button` styling.

- [#246](https://github.com/CrowdStrike/glide-core/pull/246) [`ea133fa`](https://github.com/CrowdStrike/glide-core/commit/ea133fa57927ecd32aec94d7fb628d01de3dae28) Thanks [@dylankcrwd](https://github.com/dylankcrwd)! - Updates `glide-core-input` and `glide-core-textarea` styling.

- [#240](https://github.com/CrowdStrike/glide-core/pull/240) [`6746d64`](https://github.com/CrowdStrike/glide-core/commit/6746d64dd92557632b6349b04b72e115e3bd95ab) Thanks [@danwenzel](https://github.com/danwenzel)! - Localize all static strings within glide core

- [#259](https://github.com/CrowdStrike/glide-core/pull/259) [`ea910d6`](https://github.com/CrowdStrike/glide-core/commit/ea910d6db80a3803dea87f1d319504a9d2124f38) Thanks [@danwenzel](https://github.com/danwenzel)! - Apply backdrop-filter fix for all floating components

  Including Menu, and Tree Item Menu

- [#239](https://github.com/CrowdStrike/glide-core/pull/239) [`223fe2b`](https://github.com/CrowdStrike/glide-core/commit/223fe2bd95a5b5aad28418f4492e07bedeee2a63) Thanks [@clintcs](https://github.com/clintcs)! - Improve Dropdown accessibility by setting `aria-activedescendant` to an empty string on close.

- [#255](https://github.com/CrowdStrike/glide-core/pull/255) [`afd65e9`](https://github.com/CrowdStrike/glide-core/commit/afd65e99af262e4e6fbc86b639fec53ee8bd5caa) Thanks [@danwenzel](https://github.com/danwenzel)! - Add `backdrop-filter` to the Modal component as the designs call for to fix the background from bleeding into the Modal content.

- [#254](https://github.com/CrowdStrike/glide-core/pull/254) [`a307053`](https://github.com/CrowdStrike/glide-core/commit/a307053006a9346510a29899b2d48e7e4eb6b702) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Updated CSS custom property values for dark mode to be more accessible.
  Added `--glide-core-icon-display-light`, `--glide-core-text-link-dark-surface`, `--glide-core-text-link-table`, and `--glide-core-text-placeholder`.

- [#249](https://github.com/CrowdStrike/glide-core/pull/249) [`0ad7c77`](https://github.com/CrowdStrike/glide-core/commit/0ad7c77daa8b8c783b3c5d52c0900c1b7b22a57e) Thanks [@dylankcrwd](https://github.com/dylankcrwd)! - Updates `glide-core-dropdown` to be consistent with `glide-core-input` and `glide-core-textarea`.

- [#235](https://github.com/CrowdStrike/glide-core/pull/235) [`6fa171e`](https://github.com/CrowdStrike/glide-core/commit/6fa171e53b918f8b689bbed9c95bd5a7b5873ba9) Thanks [@dylankcrwd](https://github.com/dylankcrwd)! - Updates focus ring styling.

## 0.5.2

### Patch Changes

- [#226](https://github.com/CrowdStrike/glide-core/pull/226) [`94322e6`](https://github.com/CrowdStrike/glide-core/commit/94322e6992c0b078d2bb7d6afe89405f29a84533) Thanks [@clintcs](https://github.com/clintcs)! - Dropdown no longer dispatches multiple "change" and "input" events when Select All is clicked or when single-select and an option is already selected.

- [#221](https://github.com/CrowdStrike/glide-core/pull/221) [`4c7326c`](https://github.com/CrowdStrike/glide-core/commit/4c7326cc0299353dd58a16737984408ca7ebe657) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Add the -webkit prefix for backdrop-filter in Drawer

- [#214](https://github.com/CrowdStrike/glide-core/pull/214) [`74405bc`](https://github.com/CrowdStrike/glide-core/commit/74405bcd80c3f58b13a578487894e7ed0194c895) Thanks [@clintcs](https://github.com/clintcs)! - - Dropdown now has a `readonly` attribute.

  - Dropdown is no longer tabbable when disabled.
  - Dropdown no longer opens on ArrowDown, ArrowUp, and Space when disabled.
  - The background color of the filtering field now matches the rest of Dropdown when disabled.

- [#207](https://github.com/CrowdStrike/glide-core/pull/207) [`b5d9180`](https://github.com/CrowdStrike/glide-core/commit/b5d9180d2478afc3cab80fd81c6c3b7eb504b8c9) Thanks [@dylankcrwd](https://github.com/dylankcrwd)! - Adds `glide-core-split-container`, `glide-core-split-button`, and `glide-core-split-link`.

- [#228](https://github.com/CrowdStrike/glide-core/pull/228) [`2f6fa05`](https://github.com/CrowdStrike/glide-core/commit/2f6fa05777a43f576c5b9cff2960aa7b1787d49c) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Updated Accordion's suffix color to work with dark mode.

- [#216](https://github.com/CrowdStrike/glide-core/pull/216) [`c1e75fa`](https://github.com/CrowdStrike/glide-core/commit/c1e75fae095436cfcdf09ae556a92874e8986e71) Thanks [@clintcs](https://github.com/clintcs)! - Class names are no longer minified in slot error messages.

- [#212](https://github.com/CrowdStrike/glide-core/pull/212) [`6ab566d`](https://github.com/CrowdStrike/glide-core/commit/6ab566dddcd37b6a93e871b162a1d91e512c728b) Thanks [@clintcs](https://github.com/clintcs)! - Dropdown options are now announced and selectable via VoiceOver when Dropdown is filterable.
  Additionally, selected options are announced when Dropdown receives focus.

- [#225](https://github.com/CrowdStrike/glide-core/pull/225) [`3cc3d4d`](https://github.com/CrowdStrike/glide-core/commit/3cc3d4d5bfdedd04fcaee5804c5ebeec9d0e6535) Thanks [@clintcs](https://github.com/clintcs)! - Dropdown's `value` is no longer read-only.

- [#199](https://github.com/CrowdStrike/glide-core/pull/199) [`868f6a2`](https://github.com/CrowdStrike/glide-core/commit/868f6a26493a6d3f7732d1a4e1f4c9ff1be2410a) Thanks [@dylankcrwd](https://github.com/dylankcrwd)! - Refactor `glide-core-drawer` to use `aside` rather than `dialog`.
  Includes a "pinned" attribute to apply styling specific to when the drawer is "pinned".

- [#223](https://github.com/CrowdStrike/glide-core/pull/223) [`045947b`](https://github.com/CrowdStrike/glide-core/commit/045947b9d972dc1c97735c24d0f4abdaf5d95526) Thanks [@clintcs](https://github.com/clintcs)! - - Menu no longer opens when its target is `disabled` or `aria-disabled`.

  - Menu options are now announced and selectable via VoiceOver.

- [#228](https://github.com/CrowdStrike/glide-core/pull/228) [`2f6fa05`](https://github.com/CrowdStrike/glide-core/commit/2f6fa05777a43f576c5b9cff2960aa7b1787d49c) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Updated Toast's text color to work with dark mode.

- [#218](https://github.com/CrowdStrike/glide-core/pull/218) [`a070949`](https://github.com/CrowdStrike/glide-core/commit/a070949fb8febec9a945fa44f22558049f87767c) Thanks [@clintcs](https://github.com/clintcs)! - Dropdown.
  Activate the last initially selected option on first open instead of the first option.
  Activate the first option only if no options are selected.

- [#228](https://github.com/CrowdStrike/glide-core/pull/228) [`2f6fa05`](https://github.com/CrowdStrike/glide-core/commit/2f6fa05777a43f576c5b9cff2960aa7b1787d49c) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Updated the Radio's circle color to work with dark mode.

## 0.5.1

### Patch Changes

- [#208](https://github.com/CrowdStrike/glide-core/pull/208) [`4504393`](https://github.com/CrowdStrike/glide-core/commit/450439333192bb20a68b11e5450ee43b2a8b84cf) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Updated the CSS import paths in the package.json exports field so the CSS files can be imported properly by applications.

- [#211](https://github.com/CrowdStrike/glide-core/pull/211) [`28be29b`](https://github.com/CrowdStrike/glide-core/commit/28be29b9af690b1b4594cd0039e9e0a799014d4d) Thanks [@clintcs](https://github.com/clintcs)! - Prevent Menus from overlapping when two or more are stacked vertically.

- [#210](https://github.com/CrowdStrike/glide-core/pull/210) [`0eb453f`](https://github.com/CrowdStrike/glide-core/commit/0eb453faa4d3b728364d100b08e9d0a36be72a5e) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Adjusted Drawer to contain a blurred backdrop filter.

- [#211](https://github.com/CrowdStrike/glide-core/pull/211) [`28be29b`](https://github.com/CrowdStrike/glide-core/commit/28be29b9af690b1b4594cd0039e9e0a799014d4d) Thanks [@clintcs](https://github.com/clintcs)! - Remove the opacity from Menu's background to match Dropdown.

- [#211](https://github.com/CrowdStrike/glide-core/pull/211) [`28be29b`](https://github.com/CrowdStrike/glide-core/commit/28be29b9af690b1b4594cd0039e9e0a799014d4d) Thanks [@clintcs](https://github.com/clintcs)! - Dropdown Option no longer throws in Ember applications.

## 0.5.0

### Minor Changes

- [#189](https://github.com/CrowdStrike/glide-core/pull/189) [`7bf0fc7`](https://github.com/CrowdStrike/glide-core/commit/7bf0fc7c1e459430f97b63c1424e8ffee4d2a6f3) Thanks [@ynotdraw](https://github.com/ynotdraw)! - All component prefixes were changed from `cs-` to `glide-core-`. Component imports were **not** adjusted. To migrate your existing code to the new format, replace any `<cs-` prefix with `<glide-core-` instead.

  ```diff
  -  <cs-button>Button</cs-button>
  +  <glide-core-button>Button</glide-core-button>
  ```

- [#196](https://github.com/CrowdStrike/glide-core/pull/196) [`49e227d`](https://github.com/CrowdStrike/glide-core/commit/49e227d30bcb67bef185a6b094aa416386fe48e4) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Refactored `max-character-count` to `maxlength` for Input and Textarea to align closer to the platform's `maxlength` attribute.

  ```diff
  -  <glide-core-input max-character-count="20"></glide-core-input>
  -  <glide-core-textarea max-character-count="20"></glide-core-textarea>
  +  <glide-core-input maxlength="20"></glide-core-input>
  +  <glide-core-textarea maxlength="20"></glide-core-textarea>
  ```

- [#188](https://github.com/CrowdStrike/glide-core/pull/188) [`41185e9`](https://github.com/CrowdStrike/glide-core/commit/41185e97eea2c2a290587c2e677ba212ef85a6b6) Thanks [@ynotdraw](https://github.com/ynotdraw)! - The package has been renamed to `@crowdstrike/glide-core` for simplicity. Components and styles are now contained in a single package.

- [#191](https://github.com/CrowdStrike/glide-core/pull/191) [`7ef0db7`](https://github.com/CrowdStrike/glide-core/commit/7ef0db7de9ee0d39b9775bc6a525a6f6b7e7c1fc) Thanks [@clintcs](https://github.com/clintcs)! - Dropdown no longer dispatches "change" and "input" events with a `detail` property to align with Checkbox, Dropdown, Radio Group, and Toggle.

- [#202](https://github.com/CrowdStrike/glide-core/pull/202) [`2d8c562`](https://github.com/CrowdStrike/glide-core/commit/2d8c5621cf97cc3440d4415f54764f98464147ee) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Updated all CSS custom properties to have a `--glide-core-` prefix rather than `--cs-` to align with our latest naming conventions.

  ```diff
  -  background-color: var(--cs-surface-primary)
  +  background-color: var(--glide-core-surface-primary);
  ```

- [#198](https://github.com/CrowdStrike/glide-core/pull/198) [`ceb0363`](https://github.com/CrowdStrike/glide-core/commit/ceb0363247e6753ac4e4f997936597d83c923cab) Thanks [@clintcs](https://github.com/clintcs)! - Removed `.glide-lock-scroll` from `variables.css` and marked it as private.

- [#133](https://github.com/CrowdStrike/glide-core/pull/133) [`b169ae5`](https://github.com/CrowdStrike/glide-core/commit/b169ae538c789a608114b3c1d0e77ff2bc579e9c) Thanks [@clintcs](https://github.com/clintcs)! - Replace `@crowdstrike/glide-core-styles` with `@crowdstrike/glide-core/styles/variables.css`.

  ```diff
  -  import '@crowdstrike/glide-core-styles';
  +  import '@crowdstrike/glide-core/styles/variables.css';
  ```

### Patch Changes

- [#187](https://github.com/CrowdStrike/glide-core/pull/187) [`c43e741`](https://github.com/CrowdStrike/glide-core/commit/c43e74136b3821cd1029bbf52259f14b94393a81) Thanks [@danwenzel](https://github.com/danwenzel)! - Fix up layout of tree item menu

- [#133](https://github.com/CrowdStrike/glide-core/pull/133) [`b169ae5`](https://github.com/CrowdStrike/glide-core/commit/b169ae538c789a608114b3c1d0e77ff2bc579e9c) Thanks [@clintcs](https://github.com/clintcs)! - Add `@crowdstrike/glide-core/styles/fonts.css` containing a `@font-face` rule and inlined Nunito for easier inclusion.

  If your project added the Nunito font manually, you can replace it with a single import:

  ```
  @import '@crowdstrike/glide-core/styles/fonts.css';
  ```

- [#190](https://github.com/CrowdStrike/glide-core/pull/190) [`c7f3f63`](https://github.com/CrowdStrike/glide-core/commit/c7f3f6327d4a8a72b2a9221fb067b125e4627bd8) Thanks [@danwenzel](https://github.com/danwenzel)! - Add tree item icon button

- [#206](https://github.com/CrowdStrike/glide-core/pull/206) [`4293e4c`](https://github.com/CrowdStrike/glide-core/commit/4293e4c87ca771be614c0724ee9c9a728f6d1ad7) Thanks [@clintcs](https://github.com/clintcs)! - Dropdown no longer closes when a tag is removed.

- [#191](https://github.com/CrowdStrike/glide-core/pull/191) [`7ef0db7`](https://github.com/CrowdStrike/glide-core/commit/7ef0db7de9ee0d39b9775bc6a525a6f6b7e7c1fc) Thanks [@clintcs](https://github.com/clintcs)! - Add multiselection and filtering to Dropdown.

- [#152](https://github.com/CrowdStrike/glide-core/pull/152) [`bdc55b2`](https://github.com/CrowdStrike/glide-core/commit/bdc55b2eb5c1ccda94ffd73b7570f7975545eabf) Thanks [@camskene](https://github.com/camskene)! - Our CSS custom properties are now generated from Figma automatically. This change introduced a few underlying color value changes you may notice; however, they now match exactly what design calls for.

- [#205](https://github.com/CrowdStrike/glide-core/pull/205) [`1f5caf2`](https://github.com/CrowdStrike/glide-core/commit/1f5caf209e5240c6883868d04aa7d0d45f610601) Thanks [@clintcs](https://github.com/clintcs)! - Dropdown now expands to fill its container.

- [#195](https://github.com/CrowdStrike/glide-core/pull/195) [`3db2398`](https://github.com/CrowdStrike/glide-core/commit/3db23988d8eea08516e45a0c4fa706d99f7b57aa) Thanks [@danwenzel](https://github.com/danwenzel)! - Remove outline-offset for tertiary icon buttons

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
