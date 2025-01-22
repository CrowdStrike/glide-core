# @crowdstrike/glide-core

## 0.18.0

### Minor Changes

- [#607](https://github.com/CrowdStrike/glide-core/pull/607) [`798a268`](https://github.com/CrowdStrike/glide-core/commit/798a26814223c63d49f02ec67efc7e502e51dc2c) Thanks [@clintcs](https://github.com/clintcs)! - Tree Item Menu's `placement` attribute now only supports two values to better align with design requirements: `"bottom-start"` and `"top-start"`.

- [#608](https://github.com/CrowdStrike/glide-core/pull/608) [`8a6c19d`](https://github.com/CrowdStrike/glide-core/commit/8a6c19d7d2e2d8f0d1acdfd7ea0df44d3ae83785) Thanks [@clintcs](https://github.com/clintcs)! - `<glide-core-radio>` has been renamed to `<glide-core-radio-group-radio>` to match the naming of other subcomponents like `<glide-core-button-group-button>`;

- [#610](https://github.com/CrowdStrike/glide-core/pull/610) [`934338a`](https://github.com/CrowdStrike/glide-core/commit/934338ac0e84414d0cf010c1f4653aad147b5801) Thanks [@clintcs](https://github.com/clintcs)! - Tooltip's default slot has been changed to a `label` attribute to improve accessibility and increase design consistency by restricting usage.

  As part of this change, make sure you're using an appropriate element as Tooltip's target.
  If using a `<span>`, add `role="button"` to it or simply use a `<button>`.
  Otherwise, if you're using an element without an implicit role, make sure to add the appropriate `role` to it.

### Patch Changes

- [#604](https://github.com/CrowdStrike/glide-core/pull/604) [`f9372f2`](https://github.com/CrowdStrike/glide-core/commit/f9372f2a7d29799e171e907fc35fe8c5eef721a2) Thanks [@clintcs](https://github.com/clintcs)! - Added a read-only `version` attribute to every component to help with debugging.

- [#606](https://github.com/CrowdStrike/glide-core/pull/606) [`8678c71`](https://github.com/CrowdStrike/glide-core/commit/8678c71b998486c5f08ffb8c5587a27bf1492f2e) Thanks [@clintcs](https://github.com/clintcs)! - Textarea now submits its form on Command + Enter or Control + Enter.

- [#603](https://github.com/CrowdStrike/glide-core/pull/603) [`1d37881`](https://github.com/CrowdStrike/glide-core/commit/1d3788187a8755b35c1593607d87859cc30ace4d) Thanks [@clintcs](https://github.com/clintcs)! - Filterable Dropdown's input field is now cleared when Dropdown is closed.

- [#613](https://github.com/CrowdStrike/glide-core/pull/613) [`5831b8b`](https://github.com/CrowdStrike/glide-core/commit/5831b8b5a7774dcea8a50555b8e43b0fba1871fb) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Checkbox Group, Checkbox, Dropdown, Input, Radio Group, and Textarea now expose `resetValidityFeedback()`. This method can be used to remove the error styling and validity message from a component while maintaining the state of its `validity` property.

- [#622](https://github.com/CrowdStrike/glide-core/pull/622) [`b18550e`](https://github.com/CrowdStrike/glide-core/commit/b18550e589bfa22dcb2dd58742f2500f7fc86e60) Thanks [@clintcs](https://github.com/clintcs)! - Dropdown no longer adds duplicate values to its `value` when an option is already selected and Select All is clicked.

- [#614](https://github.com/CrowdStrike/glide-core/pull/614) [`6577381`](https://github.com/CrowdStrike/glide-core/commit/6577381d7248b6c724267b222cca6cd3d767aab5) Thanks [@clintcs](https://github.com/clintcs)! - - Filterable Dropdown no longer sets the value of its input field to "Select All" when no options are provided.

  - Dropdown no longer opens when no options are provided.

- [#600](https://github.com/CrowdStrike/glide-core/pull/600) [`05e018c`](https://github.com/CrowdStrike/glide-core/commit/05e018c906ee09b1590dd714765366ed68be085e) Thanks [@clintcs](https://github.com/clintcs)! - Safari no longer logs an error about an invalid attribute on a `<rect>` in Accordion, Dropdown, Split Button Secondary Button, Tab Group, or Tree Item.

- [#623](https://github.com/CrowdStrike/glide-core/pull/623) [`c3a1eb4`](https://github.com/CrowdStrike/glide-core/commit/c3a1eb4c65208795d8f0088c775197f8001af4be) Thanks [@clintcs](https://github.com/clintcs)! - Dropdown's input field no longer has a minimum width, allowing it contract when its container is sized-constrained.
  Dropdown as a whole still has a total minimum width of 150 pixels.

- [#611](https://github.com/CrowdStrike/glide-core/pull/611) [`3737e3d`](https://github.com/CrowdStrike/glide-core/commit/3737e3db6425665e62c512c4e0175e86ce1e195a) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Updated Drawer to ensure that higher contrast content behind it no longer bleeds through.

- [#605](https://github.com/CrowdStrike/glide-core/pull/605) [`32c8aa0`](https://github.com/CrowdStrike/glide-core/commit/32c8aa0140ecde754a5ac47f05250421d80bcba1) Thanks [@clintcs](https://github.com/clintcs)! - - Tree's `focusedItem`, `privateTabIndex`, and `selectedItem` properties are now marked as `private`.

  - Tab Group's `selectedTab`, `isAfterFirstUpdated`, `isDisableOverflowStartButton`, `isDisableOverflowEndButton`, and `isShowOverflowButtons` properties are now marked as `private`.

- [#610](https://github.com/CrowdStrike/glide-core/pull/610) [`934338a`](https://github.com/CrowdStrike/glide-core/commit/934338ac0e84414d0cf010c1f4653aad147b5801) Thanks [@clintcs](https://github.com/clintcs)! - - Tooltip's `placement` attribute is now reflected.

  - Tooltip now has a `screenreader-hidden` attribute for cases where text is truncated and the full text is shown in a tooltip.
    Screenreaders are able to read the entirety of the truncated text without the help of a tooltip if the text is truncated using CSS.
    Use this attribute to hide the tooltip from screenreaders so its text isn't read in duplicate.

- [#617](https://github.com/CrowdStrike/glide-core/pull/617) [`d98dbd6`](https://github.com/CrowdStrike/glide-core/commit/d98dbd6d657a035de045e9dac7396496bf14db88) Thanks [@clintcs](https://github.com/clintcs)! - Modal no longer closes when `click()` is called on a slotted element.

- [#601](https://github.com/CrowdStrike/glide-core/pull/601) [`15f31c4`](https://github.com/CrowdStrike/glide-core/commit/15f31c403c881eb1f1a45a01843f68201faa8278) Thanks [@clintcs](https://github.com/clintcs)! - Internal Dropdown "toggle" events no longer propagate.

## 0.17.1

### Patch Changes

- [#598](https://github.com/CrowdStrike/glide-core/pull/598) [`b248269`](https://github.com/CrowdStrike/glide-core/commit/b2482697372f012f01601b62000cc9a7ee7d27cb) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Update internal usages of Glide Core Modal Icon Buttons to pass accessibility checks.

## 0.17.0

### Minor Changes

- [#592](https://github.com/CrowdStrike/glide-core/pull/592) [`1517005`](https://github.com/CrowdStrike/glide-core/commit/1517005995abc0c028d200ee2e70d760f98edf71) Thanks [@clintcs](https://github.com/clintcs)! - "change" events are now composed for every component.
  This is unlikely a breaking change for you but may be if you're using event delegation with a "change" listener.

- [#577](https://github.com/CrowdStrike/glide-core/pull/577) [`c2f8678`](https://github.com/CrowdStrike/glide-core/commit/c2f86783e3fcf8dc9733dafc292c42a729442b87) Thanks [@clintcs](https://github.com/clintcs)! - The values in Checkbox Group's `value` attribute now appear in the order they were selected.

- [#586](https://github.com/CrowdStrike/glide-core/pull/586) [`b1a5203`](https://github.com/CrowdStrike/glide-core/commit/b1a520325688e4b5d8a653470b4362d75c2a26d4) Thanks [@clintcs](https://github.com/clintcs)! - - Modal's `showModal()` and `close()` methods have been replaced by an `open` attribute to make Modal easier to use and to align with our other components.

  - Modal no longer dispatches a "close" event on close. It instead dispatches a "toggle" event on open and close.

- [#587](https://github.com/CrowdStrike/glide-core/pull/587) [`c0e6911`](https://github.com/CrowdStrike/glide-core/commit/c0e69111c55014a395c20c9e324d3f0fa4579c70) Thanks [@clintcs](https://github.com/clintcs)! - - Drawers's `show()` and `close()` methods have been removed.
  Drawer's `open` attribute can be used instead.
  `open` has the functionality of both methods and is easier to use in templates.

  - Drawer no longer dispatches a "close" event on close.
    It instead dispatches a "toggle" event on open and close.

- [#582](https://github.com/CrowdStrike/glide-core/pull/582) [`8802391`](https://github.com/CrowdStrike/glide-core/commit/8802391927cc7a9f4208780fb3d305c94b110ea0) Thanks [@clintcs](https://github.com/clintcs)! - Radio Group no longer has a `description` property, which was unused internally and undocumented.
  Radio Group still has a "description" slot you can use to add a description.

### Patch Changes

- [#587](https://github.com/CrowdStrike/glide-core/pull/587) [`c0e6911`](https://github.com/CrowdStrike/glide-core/commit/c0e69111c55014a395c20c9e324d3f0fa4579c70) Thanks [@clintcs](https://github.com/clintcs)! - Drawer's `label` and `pinned` attributes are now reflected.

- [#579](https://github.com/CrowdStrike/glide-core/pull/579) [`dee76c0`](https://github.com/CrowdStrike/glide-core/commit/dee76c0e9c3df1b79ed9c8d473fa477d0836ba0a) Thanks [@clintcs](https://github.com/clintcs)! - Arrowing through Tree no longer scrolls the page.

- [#582](https://github.com/CrowdStrike/glide-core/pull/582) [`8802391`](https://github.com/CrowdStrike/glide-core/commit/8802391927cc7a9f4208780fb3d305c94b110ea0) Thanks [@clintcs](https://github.com/clintcs)! - - Form control tooltip focus outlines now hug their "ⓘ" icons.

  - Tab Group's overflow buttons are now vertically centered.

- [#586](https://github.com/CrowdStrike/glide-core/pull/586) [`b1a5203`](https://github.com/CrowdStrike/glide-core/commit/b1a520325688e4b5d8a653470b4362d75c2a26d4) Thanks [@clintcs](https://github.com/clintcs)! - - Modal now closes on "click" instead of "mousedown" when its backdrop is clicked.

  - Modal's close button is now vertically aligned.
  - Modal now has a focus outline when opened via keyboard.

- [#589](https://github.com/CrowdStrike/glide-core/pull/589) [`0b8a7ae`](https://github.com/CrowdStrike/glide-core/commit/0b8a7ae356d82235aa24b27e840a0b1a62763e9c) Thanks [@clintcs](https://github.com/clintcs)! - - Dropdown, Menu, Popover, Split Button, and Tooltip now dispatch a "toggle" event when opened and closed.
  - Accordion's "toggle" event is now composed.

## 0.16.0

### Minor Changes

- [#553](https://github.com/CrowdStrike/glide-core/pull/553) [`ebd5137`](https://github.com/CrowdStrike/glide-core/commit/ebd5137935e74361d444d8177c230663af8ef7c3) Thanks [@clintcs](https://github.com/clintcs)! - - Tab Group's `panelElements` and `tabElements` properties have been removed.

  - Tree's `slotElements` property has been removed.
  - Tree Item's `slotElements` and `suffixSlotAssignedElements` properties have been removed.

  These properties were used internally and undocumented.
  So your code should continue to work without any changes.

- [#541](https://github.com/CrowdStrike/glide-core/pull/541) [`4c8ab62`](https://github.com/CrowdStrike/glide-core/commit/4c8ab62609222cc3e1fa306e1e492af951c61caa) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Radio's import path has been updated to match our subcomponent naming conventions elsewhere.

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

- [#543](https://github.com/CrowdStrike/glide-core/pull/543) [`4ace46d`](https://github.com/CrowdStrike/glide-core/commit/4ace46d98d5e90c44273b78ebbaf0165723d92f7) Thanks [@clintcs](https://github.com/clintcs)! - - Button Group Button, to match Tab Group and Tree, now emits a "selected" event instead of "change" and "input" events.

  - Button Group Button, to match native, no longer emits a "selected" event when selected programmatically.
  - Button Group Button no longer emits an event when already selected and space is pressed.

- [#544](https://github.com/CrowdStrike/glide-core/pull/544) [`376e6c3`](https://github.com/CrowdStrike/glide-core/commit/376e6c39806ce03771ab2110e44fde4d191a4782) Thanks [@clintcs](https://github.com/clintcs)! - Button no longer supports `aria-controls`, `aria-expanded`, `aria-haspopup`, `formaction`, `formenctype`, `formmethod`, `formnovalidate`, `formtarget`, `popovertarget`, and `popovertargetaction`.
  We added these attributes to match native.
  But we suspect they won't be used.
  And they visually complicate Storybook's controls table.

  Let us know if you have a use case for one.
  We're happy to add them back as needed.

### Patch Changes

- [#546](https://github.com/CrowdStrike/glide-core/pull/546) [`ca1412f`](https://github.com/CrowdStrike/glide-core/commit/ca1412f9881e255843f7f2b51872cbc9c45ed37c) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Toggle no longer appears unchecked when both checked and disabled.

- [#550](https://github.com/CrowdStrike/glide-core/pull/550) [`55915f7`](https://github.com/CrowdStrike/glide-core/commit/55915f766e16674cce914fcb0c711f0d30b5add3) Thanks [@clintcs](https://github.com/clintcs)! - Filterable Dropdown's input field's bottom padding has been removed to match non-filterable Dropdown.

- [#542](https://github.com/CrowdStrike/glide-core/pull/542) [`48bda6c`](https://github.com/CrowdStrike/glide-core/commit/48bda6c5982140d7429bb16a1ed785bd77920b4b) Thanks [@ynotdraw](https://github.com/ynotdraw)! - - Drawer, Inline Alert, Tag, Toast, and Tree Item now respect reduced motion preferences.

  - Drawer now respects the `open` attribute on initial render.

- [#537](https://github.com/CrowdStrike/glide-core/pull/537) [`5d03c7d`](https://github.com/CrowdStrike/glide-core/commit/5d03c7dbf3323923784aed7df33df6ad3b60a024) Thanks [@clintcs](https://github.com/clintcs)! - Added a Popover component.

  Popover, unlike an upcoming version of Tooltip, allows for arbitrary content.
  It also has a distinct visual design, opens on click instead of hover, and doesn't support a `shortcut` attribute.
  Check with Design if you're unsure which component to use.

## 0.15.1

### Patch Changes

- [#539](https://github.com/CrowdStrike/glide-core/pull/539) [`c426ff3`](https://github.com/CrowdStrike/glide-core/commit/c426ff3714cb1a7c7e405be54fd07b15536c4c17) Thanks [@danwenzel](https://github.com/danwenzel)! - The background color for a pinned Drawer now has a slightly less transparent background.

- [#538](https://github.com/CrowdStrike/glide-core/pull/538) [`bc6ed78`](https://github.com/CrowdStrike/glide-core/commit/bc6ed78eb2b99dea37587a739754a49c6919794c) Thanks [@danwenzel](https://github.com/danwenzel)! - 2 new shadows have been added to `@crowdstrike/glide-core/styles/variables.css`, `shadow-footer` and `shadow-nav`:

  ## Light

  ```diff
  + --glide-core-effects-shadow-footer-blur: 0.5rem;
  + --glide-core-effects-shadow-footer-fill: #b5b5b540;
  + --glide-core-effects-shadow-footer-spread: -0.5rem;
  + --glide-core-effects-shadow-footer-x: 0rem;
  + --glide-core-effects-shadow-footer-y: -0.5rem;

  + --glide-core-effects-shadow-nav-background-blur: 6.25rem;
  + --glide-core-effects-shadow-nav-blur: 0.25rem;
  + --glide-core-effects-shadow-nav-fill: #00000040;
  + --glide-core-effects-shadow-nav-spread: 0rem;
  + --glide-core-effects-shadow-nav-x: 0rem;
  + --glide-core-effects-shadow-nav-y: 0.25rem;
  ```

  ## Dark

  ```diff
  + --glide-core-effects-shadow-footer-background-blur: 1rem;
  + --glide-core-effects-shadow-footer-blur: 0.5rem;
  + --glide-core-effects-shadow-footer-fill: #b5b5b540;
  + --glide-core-effects-shadow-footer-spread: -0.5rem;
  + --glide-core-effects-shadow-footer-x: 0rem;
  + --glide-core-effects-shadow-footer-y: -0.5rem;

  + --glide-core-effects-shadow-nav-background-blur: 6.25rem;
  + --glide-core-effects-shadow-nav-blur: 0.25rem;
  + --glide-core-effects-shadow-nav-fill: #00000040;
  + --glide-core-effects-shadow-nav-spread: 0rem;
  + --glide-core-effects-shadow-nav-x: 0rem;
  + --glide-core-effects-shadow-nav-y: 0.25rem;
  ```

- [#532](https://github.com/CrowdStrike/glide-core/pull/532) [`f5ee762`](https://github.com/CrowdStrike/glide-core/commit/f5ee762c0d82a20b18be478d04fdbae648588c16) Thanks [@clintcs](https://github.com/clintcs)! - - Multiselect Dropdown no longer adds duplicate values to `value` when `value` is set programmatically and the options corresponding to those values are already selected.
  - Filterable single-select Dropdown now sets the value of its input field to the `label` of the selected option on first render.
  - Filterable Dropdown now clears its input field when `multiple` is set programmatically and an option is selected.

## 0.15.0

### Minor Changes

- [#506](https://github.com/CrowdStrike/glide-core/pull/506) [`e16d257`](https://github.com/CrowdStrike/glide-core/commit/e16d257b2e4083e18f99d94e207d32f7605f5f87) Thanks [@clintcs](https://github.com/clintcs)! - Checkbox's `isReportValidityOrSubmit` property has been renamed to `privateIsReportValidityOrSubmit` to deter external use.

- [#515](https://github.com/CrowdStrike/glide-core/pull/515) [`f330380`](https://github.com/CrowdStrike/glide-core/commit/f330380ac6a190998ed0fc1360da6c4defe28d3d) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Tab Group and Tab Panel are now set to 100% height. There aren't any use cases at the moment where this doesn't make sense, so if you find one, let us know!

- [#517](https://github.com/CrowdStrike/glide-core/pull/517) [`8b5ab64`](https://github.com/CrowdStrike/glide-core/commit/8b5ab64d3eb830f41363505e9fb97a8184822a02) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Tab Panel's `isSelected` property has been renamed to `privateIsSelected` to deter external use.

- [#483](https://github.com/CrowdStrike/glide-core/pull/483) [`9fd8263`](https://github.com/CrowdStrike/glide-core/commit/9fd8263606a1818e9fae12db039180614cc197b9) Thanks [@clintcs](https://github.com/clintcs)! - - Tab's `active` attribute has been renamed to `selected` to align with Tree Item.

  - Tab Group no longer dispatches a "tab-show" event.
    It instead dispatches a bubbling "selected" event from the activated Tab.
    The event's `target` property is set to that Tab.

    ```diff
    - tabGroup.addEventListener('tab-show', (event) => {
    -   console.log(event.detail.panel)
    - })

    + tabGroup.addEventListener('selected', (event) => {
    +   console.log(event.target)
    + })
    ```

  - Tree no longer dispatches an "item-selected" event.
    It instead dispatches a bubbling "selected" event from the selected Tree Item.
    The event's `target` property is set to that Tree Item.

    ```diff
    - tree.addEventListener('item-selected', (event) => {
    -   console.log(event.detail.item)
    - })

    + tree.addEventListener('selected', (event) => {
    +   console.log(event.target)
    + })
    ```

- [#500](https://github.com/CrowdStrike/glide-core/pull/500) [`b2e1619`](https://github.com/CrowdStrike/glide-core/commit/b2e1619545a5b69276dc194eb492f6bc387a0160) Thanks [@clintcs](https://github.com/clintcs)! - - Input no longer dispatches a "clear" event when cleared. It now dispatches an ordinary "input" event instead.
  - Input's `hasClearButton` and `isClearButtonVisible` fields are now private.

### Patch Changes

- [#518](https://github.com/CrowdStrike/glide-core/pull/518) [`e9b489f`](https://github.com/CrowdStrike/glide-core/commit/e9b489f8f061dc60c4db72d83c08aa33b2dab982) Thanks [@clintcs](https://github.com/clintcs)! - - Filterable Dropdown no longer closes when its input field is clicked.
  This prevents Dropdown from closing when the user is selecting text in the field.

  - Filterable Dropdown's insertion point no longer jumps around in certain cases when the user is editing the input field.

- [#512](https://github.com/CrowdStrike/glide-core/pull/512) [`8417f84`](https://github.com/CrowdStrike/glide-core/commit/8417f8454ff32aa2610b9cb100cb28d589f5fdf7) Thanks [@clintcs](https://github.com/clintcs)! - - Filterable single-select Dropdown now shows a tooltip when its input field is hovered and the selected option's label is overflowing.

  - Filterable Dropdown's magnifying glass icon is now vertically centered.
  - Tag's `label` no longer wraps.

- [#483](https://github.com/CrowdStrike/glide-core/pull/483) [`9fd8263`](https://github.com/CrowdStrike/glide-core/commit/9fd8263606a1818e9fae12db039180614cc197b9) Thanks [@clintcs](https://github.com/clintcs)! - Most component events are now [`composed`](https://developer.mozilla.org/en-US/docs/Web/API/Event/composed).
  "change", "close", and "toggle" events are still not composed to match native.
  We're happy to deviate from native and make them composed.
  Let us know if you have a use case.

- [#522](https://github.com/CrowdStrike/glide-core/pull/522) [`58507c4`](https://github.com/CrowdStrike/glide-core/commit/58507c422ff41fbd23f9b7062b33e9b3d88550f8) Thanks [@ynotdraw](https://github.com/ynotdraw)! - `@crowdstrike/glide-core/styles/variables.css` has been updated with the latest from Figma:

  ## Light

  ### Changed

  ```diff
  - --glide-core-status-warning-low: #607d8b;
  + --glide-core-status-warning-low: #6d6d6d;
  ```

  ## Dark

  ### Changed

  ```diff
  - --glide-core-icon-tertiary-disabled: #ffffff8c;
  + --glide-core-icon-tertiary-disabled: #ffffff33;

  - --glide-core-status-unknown: #686868;
  + --glide-core-status-unknown: #6d6d6d;

  - --glide-core-status-warning-low: #607c89;
  + --glide-core-status-warning-low: #6d6d6d;
  ```

- [#505](https://github.com/CrowdStrike/glide-core/pull/505) [`f735a31`](https://github.com/CrowdStrike/glide-core/commit/f735a318692bc32872f178f2d092fc89fa165bdf) Thanks [@clintcs](https://github.com/clintcs)! - - Dropdown Options now support a `disabled` attribute.

  - Dropdown now dispatches "input" events before "change" to match native.

- [#496](https://github.com/CrowdStrike/glide-core/pull/496) [`c7af097`](https://github.com/CrowdStrike/glide-core/commit/c7af097b3cf383d8c82c7869d839bc2d105d10b1) Thanks [@mayuri-todkar](https://github.com/mayuri-todkar)! - Added the Inline Alert component.

- [#514](https://github.com/CrowdStrike/glide-core/pull/514) [`115dafb`](https://github.com/CrowdStrike/glide-core/commit/115dafb20f5734f0235b57bd79ebe040474976a9) Thanks [@clintcs](https://github.com/clintcs)! - - Menu Button and Menu Link now support a `disabled` attribute.
  - Menu no longer closes when the border or padding around its menu is clicked.

## 0.14.1

### Patch Changes

- [#507](https://github.com/CrowdStrike/glide-core/pull/507) [`26f48e0`](https://github.com/CrowdStrike/glide-core/commit/26f48e02501a9d9842a097ac0d299b3f764df890) Thanks [@dylankcrwd](https://github.com/dylankcrwd)! - Addresses an issue where Drawer could have an incorrect open or closed state.

## 0.14.0

### Minor Changes

- [#493](https://github.com/CrowdStrike/glide-core/pull/493) [`5b81698`](https://github.com/CrowdStrike/glide-core/commit/5b81698cc27af4aed07d59b6f713351c9c65f5e5) Thanks [@ynotdraw](https://github.com/ynotdraw)! - The following CSS variables were renamed:

  ```diff
  - --glide-core-background-fill
  + --glide-core-surface-background-image

  - --glide-core-border-radius-none
  + --glide-core-border-radius-zero

  - --glide-core-border-width-none
  + --glide-core-border-width-zero
  ```

- [#493](https://github.com/CrowdStrike/glide-core/pull/493) [`5b81698`](https://github.com/CrowdStrike/glide-core/commit/5b81698cc27af4aed07d59b6f713351c9c65f5e5) Thanks [@ynotdraw](https://github.com/ynotdraw)! - `@crowdstrike/glide-core/styles/variables.css` has been updated with the latest from Figma:

  ## Light

  ### Added

  ```diff
  + --glide-core-border-attention: #f8f0d1;
  + --glide-core-border-error: #ffdcda;
  + --glide-core-border-informational: #d7e7ff;
  + --glide-core-border-warning: #ffebce;

  + --glide-core-effects-shadow-small-blur: 0.5rem;
  + --glide-core-effects-shadow-small-fill: #b5b5b540;
  + --glide-core-effects-shadow-small-spread: 0rem;
  + --glide-core-effects-shadow-small-x: 0rem;
  + --glide-core-effects-shadow-small-y: 0.125rem;

  + --glide-core-effects-shadow-switcher-blur: 0.125rem;
  + --glide-core-effects-shadow-switcher-fill: #ffffff59;
  + --glide-core-effects-shadow-switcher-spread: 0rem;
  + --glide-core-effects-shadow-switcher-x: 0.0625rem;
  + --glide-core-effects-shadow-switcher-y: 0.0625rem;

  +  --glide-core-surface-background-image: #00000000;
  ```

  ### Removed

  ```diff
  - --glide-core-background-fill: #15141400;
  - --glide-core-generic-border-active: #6d6d6d;
  ```

  ## Dark

  ### Added

  ```diff
  + --glide-core-border-attention: #f8f0d1;
  + --glide-core-border-error: #ffdcda;
  + --glide-core-border-informational: #d7e7ff;
  + --glide-core-border-warning: #ffebce;

  + --glide-core-effects-shadow-small-blur: 0.5rem;
  + --glide-core-effects-shadow-small-fill: #00000040;
  + --glide-core-effects-shadow-small-spread: 0rem;
  + --glide-core-effects-shadow-small-x: 0rem;
  + --glide-core-effects-shadow-small-y: 0.125rem;

  + --glide-core-effects-shadow-switcher-blur: 0.125rem;
  + --glide-core-effects-shadow-switcher-fill: #0000000d;
  + --glide-core-effects-shadow-switcher-spread: 0rem;
  + --glide-core-effects-shadow-switcher-x: 0.0625rem;
  + --glide-core-effects-shadow-switcher-y: 0.0625rem;

  + --glide-core-surface-background-image: #151414f7;
  ```

  ### Removed

  ```diff
  - --glide-core-background-fill: #151414f7;
  - --glide-core-generic-border-active: #6d6d6d;
  ```

  ### Changed

  ```diff
  - --glide-core-effects-shadow-large-blur: 3.125rem;
  + --glide-core-effects-shadow-large-blur: 0.75rem;

  - --glide-core-effects-shadow-large-y: 0.625rem;
  + --glide-core-effects-shadow-large-y: 0.125rem;
  ```

  ## System

  ### Added

  ```diff
  + --glide-core-border-radius-zero: 0rem;
  + --glide-core-border-width-zero: 0rem;
  ```

  ### Removed

  ```diff
  - --glide-core-border-radius-none: 0rem;
  - --glide-core-border-width-none: 0rem;
  - --glide-core-number-14: 0.875rem;
  - --glide-core-page-size-details-panel: 27.375rem;
  ```

  ## Miscellaneous

  ### Changed

  ```diff
  - --glide-core-shadow-sm: 0px 2.275px 8.342px 0px rgba(181, 181, 181, 0.25);
  + --glide-core-shadow-sm: var(--glide-core-effects-shadow-small-x) var(--glide-core-effects-shadow-small-y) var(--glide-core-effects-shadow-small-blur) var(--glide-core-effects-shadow-small-spread) var(--glide-core-effects-shadow-small-fill);
  ```

### Patch Changes

- [#493](https://github.com/CrowdStrike/glide-core/pull/493) [`5b81698`](https://github.com/CrowdStrike/glide-core/commit/5b81698cc27af4aed07d59b6f713351c9c65f5e5) Thanks [@ynotdraw](https://github.com/ynotdraw)! - `@crowdstrike/glide-core/styles/variables.css` has been updated with the `data-viz` colors from Figma:

  ## Light

  ### Added

  ```diff
  + --glide-core-data-viz-cobalt-cobalt: #5183df;
  + --glide-core-data-viz-cyan-cyan: #299ed1;
  + --glide-core-data-viz-gold-gold: #cc8519;
  + --glide-core-data-viz-gray-dark: #424242;
  + --glide-core-data-viz-gray-darker: #212121;
  + --glide-core-data-viz-gray-default: #6d6d6d;
  + --glide-core-data-viz-gray-light: #8a8a8a;
  + --glide-core-data-viz-gray-lighter: #c9c9c9;
  + --glide-core-data-viz-gray-lightest: #f0f0f0;
  + --glide-core-data-viz-gray-x-lighter: #e3e3e3;
  + --glide-core-data-viz-indigo-indigo: #6563d9;
  + --glide-core-data-viz-lilac-lilac: #ce66e5;
  + --glide-core-data-viz-magenta-magenta: #f9338b;
  + --glide-core-data-viz-moss-moss: #959328;
  + --glide-core-data-viz-olive-olive: #7f994d;
  + --glide-core-data-viz-red-red: #db2d24;
  + --glide-core-data-viz-rose-rose: #ea5da3;
  + --glide-core-data-viz-teal-teal: #39a288;
  + --glide-core-data-viz-turquoise-turqoise: #339da3;
  + --glide-core-data-viz-violet-violet: #af52de;
  ```

  ## Dark

  ### Added

  ```diff
  + --glide-core-data-viz-cobalt-cobalt: #6e8ec4;
  + --glide-core-data-viz-cyan-cyan: #4b98b9;
  + --glide-core-data-viz-gold-gold: #b98d4b;
  + --glide-core-data-viz-gray-dark: #424242;
  + --glide-core-data-viz-gray-darker: #212121;
  + --glide-core-data-viz-gray-default: #6d6d6d;
  + --glide-core-data-viz-gray-light: #8a8a8a;
  + --glide-core-data-viz-gray-lighter: #c9c9c9;
  + --glide-core-data-viz-gray-lightest: #000000e5;
  + --glide-core-data-viz-gray-x-lighter: #e3e3e3;
  + --glide-core-data-viz-indigo-indigo: #7574e5;
  + --glide-core-data-viz-lilac-lilac: #b37cc5;
  + --glide-core-data-viz-magenta-magenta: #c2678f;
  + --glide-core-data-viz-moss-moss: #949151;
  + --glide-core-data-viz-olive-olive: #7a845c;
  + --glide-core-data-viz-red-red: #db4743;
  + --glide-core-data-viz-rose-rose: #be7e9f;
  + --glide-core-data-viz-teal-teal: #5c9d8c;
  + --glide-core-data-viz-turquoise-turqoise: #639d9f;
  + --glide-core-data-viz-violet-violet: #a66dc3;
  ```

- [#487](https://github.com/CrowdStrike/glide-core/pull/487) [`208f8fb`](https://github.com/CrowdStrike/glide-core/commit/208f8fbcdf32a0545d678fb6b2c5e642476d9ac2) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Dropdown, Input, and Textarea now follow the same design patterns when in the `readonly` state by removing inline-start padding, removing the border, and having a transparent background.

- [#497](https://github.com/CrowdStrike/glide-core/pull/497) [`37df083`](https://github.com/CrowdStrike/glide-core/commit/37df083e1fa27c8496bb0f624e42479f84d43613) Thanks [@dylankcrwd](https://github.com/dylankcrwd)! - Drawer now supports an `open` attribute.

- [#498](https://github.com/CrowdStrike/glide-core/pull/498) [`39af7af`](https://github.com/CrowdStrike/glide-core/commit/39af7afc5e97d9e203b4f2147327c3ac830f61be) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Toast now supports an `error` variant.

- [#493](https://github.com/CrowdStrike/glide-core/pull/493) [`5b81698`](https://github.com/CrowdStrike/glide-core/commit/5b81698cc27af4aed07d59b6f713351c9c65f5e5) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Tree Item's selected hover background color was updated for more contrast.

- [#504](https://github.com/CrowdStrike/glide-core/pull/504) [`a2d8bc8`](https://github.com/CrowdStrike/glide-core/commit/a2d8bc827c1ba015725822dc9944274ddf3c9ec6) Thanks [@danwenzel](https://github.com/danwenzel)! - Minor visual updates to Drawer:

  - Background color's opacity slightly increased
  - backdrop-filter blur reduced by 50%

- [#493](https://github.com/CrowdStrike/glide-core/pull/493) [`5b81698`](https://github.com/CrowdStrike/glide-core/commit/5b81698cc27af4aed07d59b6f713351c9c65f5e5) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Dropdown's visual design for "select all" and "add" were reverted back to the previous state after additional design review.

## 0.13.1

### Patch Changes

- [#485](https://github.com/CrowdStrike/glide-core/pull/485) [`8791ada`](https://github.com/CrowdStrike/glide-core/commit/8791ada86e7b97af838b939fddce7b9990ba4e07) Thanks [@ynotdraw](https://github.com/ynotdraw)! - `@crowdstrike/glide-core/styles/variables.css` has been updated with the latest from Figma:

  ## Dark

  ### Changed

  ```diff
  - --glide-core-surface-primary-disabled: #3989da99
  + --glide-core-surface-primary-disabled: #3888d999;

  - --glide-core-text-link-table: #73b2f3;
  + --glide-core-text-link-table: #93c4f6;

  - --glide-core-text-placeholder: #c9c9c9;
  + --glide-core-text-placeholder: #9e9e9e;
  ```

- [#485](https://github.com/CrowdStrike/glide-core/pull/485) [`8791ada`](https://github.com/CrowdStrike/glide-core/commit/8791ada86e7b97af838b939fddce7b9990ba4e07) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Dropdown, Input, and Textarea placeholder states were updated to use a new placeholder variable.

## 0.13.0

### Minor Changes

- [#461](https://github.com/CrowdStrike/glide-core/pull/461) [`52a9255`](https://github.com/CrowdStrike/glide-core/commit/52a9255505af271dc18062f4f75084216f15d141) Thanks [@ynotdraw](https://github.com/ynotdraw)! - We've adopted the latest iteration of Dark Mode in all of our components and styles including:

  - Accordion received border and box-shadow visual adjustments.
  - Checkbox received a border when hovering and a box-shadow visual adjustment.
  - Dropdown's "select all" and "add" functionality has been updated to use a border rather than background-color.
  - Menu now has a lighter border around the popover to match Dropdown.
  - Consumers previously using `--glide-core-surface-base-lightest` for app backgrounds should switch to `--glide-core-background-fill` instead.

- [#463](https://github.com/CrowdStrike/glide-core/pull/463) [`7017a73`](https://github.com/CrowdStrike/glide-core/commit/7017a73cffb9088bfa95b73921ebe42e70d54b5e) Thanks [@clintcs](https://github.com/clintcs)! - Dropdown no longer dispatches a `"filter"` event when filtering.

  The `"filter"` event wasn't fully thought through and had a few shortcomings:

  - There was no way for consumers to override Dropdown's default and synchronous filtering predicate.
  - It required consumers to add and remove options from the DOM on `"filter"`.
    And the removal of a selected option when filtering a multiselect Dropdown meant the option's corresponding tag was also removed.

  Replacing the event is `filter()` and its default implementation:

  ```ts
  async filter(query: string): Promise<GlideCoreDropdownOption[]> {
    const options = [...this.querySelectorAll('glide-core-dropdown-option')];

    return options.filter(({ label }) => {
      return label.toLowerCase().includes(query.toLowerCase().trim()),
    });
  }
  ```

  - You can override `filter()` with whatever filtering logic you need.
  - The options you return in `filter()` will be shown. All others will be hidden.
  - `filter()` must return a promise.
    Dropdown will wait for it to resolve before showing and hiding options in case you're fetching them or your filtering logic lives on the server.

- [#476](https://github.com/CrowdStrike/glide-core/pull/476) [`16db0bd`](https://github.com/CrowdStrike/glide-core/commit/16db0bd82d824dde3aa4bea7050851e9253e18f9) Thanks [@danwenzel](https://github.com/danwenzel)! - CSS flex attributes for Tab Group have been moved to the host element.

  Having a separate, intermediate flex container inside the closed shadow root made it difficult to impossible for consumers to control their flex layout.

- [#468](https://github.com/CrowdStrike/glide-core/pull/468) [`97d8c20`](https://github.com/CrowdStrike/glide-core/commit/97d8c200ad215301a659e4175ec5fd2a59a34d2b) Thanks [@clintcs](https://github.com/clintcs)! - `@crowdstrike/glide-core/styles/variables.css` has been updated with the latest from Figma:

  ## Light

  ### Removed

  ```diff
  -  --glide-core-surface-tag-default: #00000012;
  ```

  ### Added

  ```diff
  +  --glide-core-surface-base-gray-lightest: #00000008;
  ```

  ### Changed

  ```diff
  - --glide-core-surface-base-gray-lighter: #00000008;
  + --glide-core-surface-base-gray-lighter: #0000000d;
  ```

  ## Dark

  ### Removed

  ```diff
  -  --glide-core-surface-tag-default: #ffffff1a;
  ```

  ### Changed

  ```diff
  -  --glide-core-surface-white-1percent: #000000e5;
  +  --glide-core-surface-white-1percent: #ffffff03;
  ```

  ## System

  ### Removed

  ```diff
  -  --glide-core-page-size-height: 46.875rem;
  ```

- [#475](https://github.com/CrowdStrike/glide-core/pull/475) [`7ccebe3`](https://github.com/CrowdStrike/glide-core/commit/7ccebe3fe972efb1b0a79cfaf8426f4d2aabb130) Thanks [@clintcs](https://github.com/clintcs)! - Button Group's "change" event's `target` property is now set to the selected button.

- [#464](https://github.com/CrowdStrike/glide-core/pull/464) [`fd6c79d`](https://github.com/CrowdStrike/glide-core/commit/fd6c79d1c5ed244e766f23966293704e526e4191) Thanks [@ynotdraw](https://github.com/ynotdraw)! - The `sticky` attribute for Tab Group wasn't fully thought through. It was decided it is safe to remove it in favor of making the Tab Panel scroll when needed instead.

  ```diff
  - <glide-core-tab-group sticky>
  + <glide-core-tab-group>
  ```

  ```html
  <glide-core-tab-panel style="overflow-y: auto"></glide-core-tab-panel>
  ```

### Patch Changes

- [#477](https://github.com/CrowdStrike/glide-core/pull/477) [`054ae33`](https://github.com/CrowdStrike/glide-core/commit/054ae33bf7f593dab2a42b22d04617654d0ba0d1) Thanks [@clintcs](https://github.com/clintcs)! - Safari no longer leaves full screen on Escape in Menu, Modal, and Split Button.

- [#469](https://github.com/CrowdStrike/glide-core/pull/469) [`634ce71`](https://github.com/CrowdStrike/glide-core/commit/634ce717afc680871a841ac53140192800a02351) Thanks [@clintcs](https://github.com/clintcs)! - The duration of Tag's animation when it is added or removed has been reduced from 200 to 100 milliseconds.

- [#466](https://github.com/CrowdStrike/glide-core/pull/466) [`603fc71`](https://github.com/CrowdStrike/glide-core/commit/603fc71dec440225ab721dc4ab4e8a88eca483f8) Thanks [@clintcs](https://github.com/clintcs)! - Filterable Dropdown now relays to screenreaders the number of results upon filtering.

- [#461](https://github.com/CrowdStrike/glide-core/pull/461) [`52a9255`](https://github.com/CrowdStrike/glide-core/commit/52a9255505af271dc18062f4f75084216f15d141) Thanks [@ynotdraw](https://github.com/ynotdraw)! - `@crowdstrike/glide-core/styles/variables.css` has been updated with the latest from Figma:

  ## Light

  ### Added

  ```diff
  + --glide-core-background-fill: #15141400;
  + --glide-core-effects-shadow-large-background-blur: 12.5rem;
  + --glide-core-effects-shadow-large-blur: 0.875rem;
  + --glide-core-effects-shadow-large-fill: #00000040;
  + --glide-core-effects-shadow-large-spread: 0rem;
  + --glide-core-effects-shadow-large-x: 0rem;
  + --glide-core-effects-shadow-large-y: 0.25rem;
  + --glide-core-effects-shadow-xlarge-background-blur: 6.25rem;
  + --glide-core-effects-shadow-xlarge-blur: 3.75rem;
  + --glide-core-effects-shadow-xlarge-fill: #adadad;
  + --glide-core-effects-shadow-xlarge-spread: 0rem;
  + --glide-core-effects-shadow-xlarge-x: 0rem;
  + --glide-core-effects-shadow-xlarge-y: 0.25rem;
  ```

  ## Dark

  ### Added

  ```diff
  + --glide-core-background-fill: #151414f7;
  + --glide-core-effects-shadow-large-background-blur: 12.5rem;
  + --glide-core-effects-shadow-large-blur: 3.125rem;
  + --glide-core-effects-shadow-large-fill: #00000080;
  + --glide-core-effects-shadow-large-spread: 0rem;
  + --glide-core-effects-shadow-large-x: 0rem;
  + --glide-core-effects-shadow-large-y: 0.625rem;
  + --glide-core-effects-shadow-xlarge-background-blur: 0rem;
  + --glide-core-effects-shadow-xlarge-blur: 4rem;
  + --glide-core-effects-shadow-xlarge-fill: #000000f7;
  + --glide-core-effects-shadow-xlarge-spread: 0rem;
  + --glide-core-effects-shadow-xlarge-x: 0rem;
  + --glide-core-effects-shadow-xlarge-y: 0.25rem;
  + --glide-core-surface-base-gray-lightest: #ffffff0d;
  ```

  ### Changed

  ```diff
  - --glide-core-border-action: #0073e6;
  + --glide-core-border-action: #3989da;

  - --glide-core-border-base: #6d6d6d;
  + --glide-core-border-base: #585858;

  - --glide-core-border-base-dark: #c9c9c9;
  + --glide-core-border-base-dark: #8a8a8a;

  - --glide-core-border-base-darker: #e3e3e3;
  + --glide-core-border-base-darker: #424242;

  - --glide-core-border-base-light: #212121;
  + --glide-core-border-base-light: #424242;

  - --glide-core-border-base-lighter: #212121;
  + --glide-core-border-base-lighter: #424242;

  - --glide-core-border-base-lightest: #424242;
  + --glide-core-border-base-lightest: #c9c9c9;

  - --glide-core-border-base-transparent: #0000001a;
  + --glide-core-border-base-transparent: #ffffff1a;

  - --glide-core-border-focus: #0073e6;
  + --glide-core-border-focus: #3989da;

  - --glide-core-border-primary: #ffffff;
  + --glide-core-border-primary: #424242;

  - --glide-core-border-primary-hover: #0461cf;
  + --glide-core-border-primary-hover: #3989da;

  - --glide-core-icon-active: #0073e6;
  + --glide-core-icon-active: #3989da;

  - --glide-core-icon-default: #ffffff;
  + --glide-core-icon-default: #f0f0f0;

  - --glide-core-icon-default2: #212121;
  + --glide-core-icon-default2: #8a8a8a;

  - --glide-core-icon-display: #ffffff;
  + --glide-core-icon-display: #f0f0f0;

  - --glide-core-icon-display-light: #d7e7ff;
  + --glide-core-icon-display-light: #8a8a8a;

  - --glide-core-icon-primary: #ffffff;
  + --glide-core-icon-primary: #73b2f3;

  - --glide-core-icon-primary-hover: #d7e7ff;
  + --glide-core-icon-primary-hover: #4d99e7;

  - --glide-core-icon-secondary-disabled: #d7e7ff;
  + --glide-core-icon-secondary-disabled: #c9c9c9;

  - --glide-core-icon-selected: #ffffff;
  + --glide-core-icon-selected: #f0f0f0;

  - --glide-core-icon-selected-disabled: #eef5ff;
  + --glide-core-icon-selected-disabled: #c9c9c9;

  - --glide-core-icon-selected2: #424242;
  + --glide-core-icon-selected2: #f0f0f0;

  - --glide-core-icon-tertiary-disabled: #6d6d6d;
  + --glide-core-icon-tertiary-disabled: #ffffff8c;

  - --glide-core-status-error: #ff3b30;
  + --glide-core-status-error: #db4743;

  - --glide-core-status-expired: #ff3b30;
  + --glide-core-status-expired: #db4743;

  - --glide-core-status-failed: #ff3b30;
  + --glide-core-status-failed: #db4743;

  - --glide-core-status-in-progress: #ffcc00;
  + --glide-core-status-in-progress: #fad232;

  - --glide-core-status-queued: #5ac8fa;
  + --glide-core-status-queued: #63a8c7;

  - --glide-core-status-scheduled: #af52de;
  + --glide-core-status-scheduled: #ae73cd;

  - --glide-core-status-success: #34c759;
  + --glide-core-status-success: #51bc6f;

  - --glide-core-status-unknown: #6d6d6d;
  + --glide-core-status-unknown: #686868;

  - --glide-core-status-warning-critical: #ff3b30;
  + --glide-core-status-warning-critical: #db4743;

  - --glide-core-status-warning-high: #ff9500;
  + --glide-core-status-warning-high: #e3901d;

  - --glide-core-status-warning-informational: #0073e6;
  + --glide-core-status-warning-informational: #3989da;

  - --glide-core-status-warning-low: #607d8b;
  + --glide-core-status-warning-low: #607c89;

  - --glide-core-status-warning-medium: #ffcc00;
  + --glide-core-status-warning-medium: #fad232;

  - --glide-core-surface-active: #ffffff;
  + --glide-core-surface-active: #ffffffe5;

  - --glide-core-surface-base: #424242;
  + --glide-core-surface-base: #ffffff26;

  - --glide-core-surface-base-dark: #f0f0f0;
  + --glide-core-surface-base-dark: #625c5c;

  - --glide-core-surface-base-gray: #00000066;
  + --glide-core-surface-base-gray: #ffffff1a;

  - --glide-core-surface-base-gray-dark: #ffffff8c;
  + --glide-core-surface-base-gray-dark: #ffffff1a;

  - --glide-core-surface-base-gray-light: #00000066;
  + --glide-core-surface-base-gray-light: #ffffff12;

  - --glide-core-surface-base-gray-lighter: #ffffff1a;
  + --glide-core-surface-base-gray-lighter: #ffffff0d;

  - --glide-core-surface-base-light: #0000008c;
  + --glide-core-surface-base-light: #ffffff08;

  - --glide-core-surface-base-lighter: #000000bf;
  + --glide-core-surface-base-lighter: #ffffff12;

  - --glide-core-surface-base-lightest: #000000cc;
  + --glide-core-surface-base-lightest: #ffffff0d;

  - --glide-core-surface-base-xlightest: #000000e5;
  + --glide-core-surface-base-xlightest: #333030;

  - --glide-core-surface-disabled: #424242;
  + --glide-core-surface-disabled: #6d6d6d;

  - --glide-core-surface-focus: #0073e6;
  + --glide-core-surface-focus: #3989da;

  - --glide-core-surface-hover: #0461cf;
  + --glide-core-surface-hover: #567a9e75;

  - --glide-core-surface-modal: #151515;
  + --glide-core-surface-modal: #464242;

  - --glide-core-surface-primary: #0073e6;
  + --glide-core-surface-primary: #3989da;

  - --glide-core-surface-primary-disabled: #6d6d6d;
  + --glide-core-surface-primary-disabled: #3989da99;

  - --glide-core-surface-selected: #0073e6;
  + --glide-core-surface-selected: #3989da;

  - --glide-core-surface-selected-disabled: #8a8a8a;
  + --glide-core-surface-selected-disabled: #c9c9c9;

  - --glide-core-surface-selected-hover: #054fb9;
  + --glide-core-surface-selected-hover: #256db7;

  - --glide-core-surface-unselected-disabled: #e3e3e3;
  + --glide-core-surface-unselected-disabled: #6d6d6d;

  - --glide-core-text-body-1: #ffffff;
  + --glide-core-text-body-1: #f0f0f0;

  - --glide-core-text-body-light: #ffffff;
  + --glide-core-text-body-light: #f0f0f0;

  - --glide-core-text-body-lighter: #8a8a8a;
  + --glide-core-text-body-lighter: #f0f0f0;

  - --glide-core-text-disabled: #f0f0f0;
  + --glide-core-text-disabled: #c9c9c9;

  - --glide-core-text-header-1: #ffffff;
  + --glide-core-text-header-1: #f0f0f0;

  - --glide-core-text-header-2: #d7e7ff;
  + --glide-core-text-header-2: #f0f0f0;

  - --glide-core-text-link: #8babf1;
  + --glide-core-text-link: #73b2f3;

  - --glide-core-text-link-dark-surface: #8babf1;
  + --glide-core-text-link-dark-surface: #73b2f3;

  - --glide-core-text-link-table: #d0e8f2;
  + --glide-core-text-link-table: #73b2f3;

  - --glide-core-text-primary: #ffffff;
  + --glide-core-text-primary: #73b2f3;

  - --glide-core-text-primary-hover: #d7e7ff;
  + --glide-core-text-primary-hover: #4d99e7;

  - --glide-core-text-secondary: #8babf1;
  + --glide-core-text-secondary: #3989da;

  - --glide-core-text-selected: #ffffff;
  + --glide-core-text-selected: #f0f0f0;

  - --glide-core-text-selected-2: #424242;
  + --glide-core-text-selected-2: #f0f0f0;

  - --glide-core-text-tertiary: #ffffff;
  + --glide-core-text-tertiary: #f0f0f0;

  - --glide-core-text-tertiary-disabled: #6d6d6d;
  + --glide-core-text-tertiary-disabled: #ffffff8c;
  ```

  ## Miscellaneous

  ### Added

  ```diff
  + --glide-core-shadow-checkbox: 0px 0px 7px 0px #5ba4ee;
  + --glide-core-shadow-md: 0px 3px 8px 0px rgba(0, 0, 0, 0.15), 0px 3px 1px 0px rgba(0, 0, 0, 0.06);
  ```

  ### Changed

  ```diff
  - --glide-core-shadow-lg: 0px 4px 14px 0px #00000040;
  + --glide-core-shadow-lg: var(--glide-core-effects-shadow-large-x) var(--glide-core-effects-shadow-large-y) var(--glide-core-effects-shadow-large-blur) var(--glide-core-effects-shadow-large-spread) var(--glide-core-effects-shadow-large-fill);
  - --glide-core-shadow-xl: 0px 4px 60px 0px #adadad;

  + --glide-core-shadow-xl: var(--glide-core-effects-shadow-xlarge-x) var(--glide-core-effects-shadow-xlarge-y) var(--glide-core-effects-shadow-xlarge-blur) var(--glide-core-effects-shadow-xlarge-spread) var(--glide-core-effects-shadow-xlarge-fill);
  ```

  ## System

  ## Removed

  ```diff
  - --glide-core-page-size-width: 83.3125rem;
  ```

- [#474](https://github.com/CrowdStrike/glide-core/pull/474) [`eb20733`](https://github.com/CrowdStrike/glide-core/commit/eb20733924d5df9ebd40139fd774882355f865c4) Thanks [@dylankcrwd](https://github.com/dylankcrwd)! - Adds `type="date"` support to Input.

- [#478](https://github.com/CrowdStrike/glide-core/pull/478) [`06c022a`](https://github.com/CrowdStrike/glide-core/commit/06c022af3767c03e647860473b3a25c8dc9014ef) Thanks [@clintcs](https://github.com/clintcs)! - Dropdown and Input now appear hovered visually when their labels are hovered.

- [#471](https://github.com/CrowdStrike/glide-core/pull/471) [`66d7164`](https://github.com/CrowdStrike/glide-core/commit/66d7164c31fccaecc00076c696cf8a0aca426fc1) Thanks [@clintcs](https://github.com/clintcs)! - Dropdown's menu icons are now horizontally aligned with the icon of the selected option that's in Dropdown's button.

- [#467](https://github.com/CrowdStrike/glide-core/pull/467) [`22c8479`](https://github.com/CrowdStrike/glide-core/commit/22c847910ebf401d81aff41d1902bc82c06320c6) Thanks [@clintcs](https://github.com/clintcs)! - - Single-select Dropdown now reliably unhides every option when reopened after filtering.
  - Dropdown now falls back to "No Results Found" if every option has been filtered out.

## 0.12.3

### Patch Changes

- [#456](https://github.com/CrowdStrike/glide-core/pull/456) [`72ebc6f`](https://github.com/CrowdStrike/glide-core/commit/72ebc6fd497674a2e11f846a51bbf2a8d8714571) Thanks [@clintcs](https://github.com/clintcs)! - Multiselect Dropdown now correctly applies focus to the next tag when its corresponding option doesn't have a `value`.

- [#451](https://github.com/CrowdStrike/glide-core/pull/451) [`f186857`](https://github.com/CrowdStrike/glide-core/commit/f18685758c8a3c08b060efd08cc2b95d8ca4fb89) Thanks [@clintcs](https://github.com/clintcs)! - - Filterable Dropdown no longer clears its filter when a tag is removed.

  - Dropdown has a new `add-button-label` attribute for labeling and adding a button to the bottom of Dropdown's menu.
    An "add" event, which you can use to show a modal, is emitted when the button is clicked.

- [#459](https://github.com/CrowdStrike/glide-core/pull/459) [`2f31b54`](https://github.com/CrowdStrike/glide-core/commit/2f31b54fe282d31a415b7620c2c22e9c95a915d6) Thanks [@clintcs](https://github.com/clintcs)! - Single-select Dropdown now truncates the selected option's label when it would otherwise overflow.

## 0.12.2

### Patch Changes

- [#453](https://github.com/CrowdStrike/glide-core/pull/453) [`196a880`](https://github.com/CrowdStrike/glide-core/commit/196a880a6ef594b6fad5b9caabd5ae396a723770) Thanks [@clintcs](https://github.com/clintcs)! - - Menu nows reacts to options added dynamically to Menu Options.

  - Menu no longer activates the first option when another option is already active and a new option is dynamically added.

- [#454](https://github.com/CrowdStrike/glide-core/pull/454) [`d6f150f`](https://github.com/CrowdStrike/glide-core/commit/d6f150f34bccfc111e6c7511fad664d949cd3f59) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Tab Group supports the following CSS custom properties:

  - `--panel-padding-inline-end`
  - `--panel-padding-inline-start`
  - `--tabs-padding-block-end`
  - `--tabs-padding-block-start`
  - `--tabs-padding-inline-end`
  - `--tabs-padding-inline-start`

- [#437](https://github.com/CrowdStrike/glide-core/pull/437) [`dd67616`](https://github.com/CrowdStrike/glide-core/commit/dd67616fbcef143a8f58b0615d6622041ff585d0) Thanks [@clintcs](https://github.com/clintcs)! - - Dropdown Options are now editable via the `editable` attribute, which will add a button with a pencil icon to the option.
  An "edit" event, which you can use to show a modal, is emitted when the button is clicked.

  - Multiselect Dropdown no longer submits its form when Enter is pressed on a tag removal button.
  - Multiselect Dropdown's tags can no longer be removed when Dropdown is disabled or read-only.

## 0.12.1

### Patch Changes

- [#449](https://github.com/CrowdStrike/glide-core/pull/449) [`505d9da`](https://github.com/CrowdStrike/glide-core/commit/505d9da591ad48e061b8115a462117177fb7c32c) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Tab Group sets the background-color only when it is provided with the `sticky` attribute to prevent content from bleeding into the background while a user scrolls.

## 0.12.0

### Minor Changes

- [#443](https://github.com/CrowdStrike/glide-core/pull/443) [`5d6a013`](https://github.com/CrowdStrike/glide-core/commit/5d6a01314780a2bf8e061e74de268219cc9e2b6b) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Checkbox's `setValidity()` no longer accepts a third `anchor` argument due to it not being utilized. The anchor is automatically set to itself.

- [#443](https://github.com/CrowdStrike/glide-core/pull/443) [`5d6a013`](https://github.com/CrowdStrike/glide-core/commit/5d6a01314780a2bf8e061e74de268219cc9e2b6b) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Input and Textarea are no longer invalid when maxlength is exceeded to match native's behavior.

### Patch Changes

- [#440](https://github.com/CrowdStrike/glide-core/pull/440) [`deeca7a`](https://github.com/CrowdStrike/glide-core/commit/deeca7a0f9600d5aa4195f92466b32da0e29fec0) Thanks [@clintcs](https://github.com/clintcs)! - Menu now has an `offset` attribute for changing the distance between its menu and target.

- [#446](https://github.com/CrowdStrike/glide-core/pull/446) [`5746d95`](https://github.com/CrowdStrike/glide-core/commit/5746d95ba49be442e908bb371aa3a7204ed5d728) Thanks [@clintcs](https://github.com/clintcs)! - - Tag's background color when disabled has been updated to improve Tag's visibility when placed on another disabled component.

  - `@crowdstrike/glide-core/styles/variables.css` has been updated with the latest from Figma:

    ## Light

    ```diff
    - --glide-core-surface-primary-disabled: #1d7afc26;
    + --glide-core-surface-primary-disabled: #d7e7ff;

    + --glide-core-generic-border-active: #6d6d6d;
    + --glide-core-surface-tag-default: #00000012;
    ```

    ## Dark

    ```diff
    + --glide-core-generic-border-active: #6d6d6d;
    + --glide-core-surface-tag-default: #ffffff1a;
    ```

    ## System

    ```diff
    + --glide-core-number-14: 0.875rem;
    + --glide-core-number-16: 1rem;
    ```

- [#444](https://github.com/CrowdStrike/glide-core/pull/444) [`b6d24ce`](https://github.com/CrowdStrike/glide-core/commit/b6d24ce35410274ddd76f9b467e0cb4714410e81) Thanks [@clintcs](https://github.com/clintcs)! - Dropdown now opens and closes when any part of it is clicked. Previously, it would only close from a click outside of itself or one on the button with the caret icon.

- [#443](https://github.com/CrowdStrike/glide-core/pull/443) [`5d6a013`](https://github.com/CrowdStrike/glide-core/commit/5d6a01314780a2bf8e061e74de268219cc9e2b6b) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Input now supports a `pattern` attribute like the [native](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/pattern) input element. Unlike native, pattern validation occurs independently of the required attribute, allowing optional fields to be marked invalid if the pattern isn't matched.

  ```html
  <glide-core-input label="Label" pattern="[a-z]{4,8}"></glide-core-input>
  ```

  ```js
  // Returns `false`.
  document.querySelector('glide-core-input').checkValidity();
  ```

- [#443](https://github.com/CrowdStrike/glide-core/pull/443) [`5d6a013`](https://github.com/CrowdStrike/glide-core/commit/5d6a01314780a2bf8e061e74de268219cc9e2b6b) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Updated Checkbox so that removing the `required` attribute returns it to a valid state.

- [#441](https://github.com/CrowdStrike/glide-core/pull/441) [`a6d3e61`](https://github.com/CrowdStrike/glide-core/commit/a6d3e6156ada39f80f9e663501e3193a16a48401) Thanks [@clintcs](https://github.com/clintcs)! - Menu now supports `<span>`s and `<div>`s as its target.
  If you're currently using a `<span>` or `<div>` and are handling keyboard events from it or setting `tabindex` on it, you can remove that code.

- [#443](https://github.com/CrowdStrike/glide-core/pull/443) [`5d6a013`](https://github.com/CrowdStrike/glide-core/commit/5d6a01314780a2bf8e061e74de268219cc9e2b6b) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Checkbox, Checkbox Group, Dropdown, Input, Radio Group, and Textarea now support [`setValidity()`](https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals/setValidity) and [`setCustomValidity()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/setCustomValidity) methods like their native counterparts to allow for triggering validation with user-provided error messages.

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

- [#445](https://github.com/CrowdStrike/glide-core/pull/445) [`a219f5a`](https://github.com/CrowdStrike/glide-core/commit/a219f5a35006f60b342fb9471bbeaa52a1482aa7) Thanks [@clintcs](https://github.com/clintcs)! - Single-select Dropdown now closes when an already selected option is clicked.

## 0.11.0

### Minor Changes

- [#435](https://github.com/CrowdStrike/glide-core/pull/435) [`438afa2`](https://github.com/CrowdStrike/glide-core/commit/438afa2a4c43095f9e3e01d77789490785967843) Thanks [@clintcs](https://github.com/clintcs)! - Tag no longer has a `textContent` getter. You can use Tag's `label` attribute instead.

### Patch Changes

- [#436](https://github.com/CrowdStrike/glide-core/pull/436) [`4cc7003`](https://github.com/CrowdStrike/glide-core/commit/4cc7003c00cc3cbb0f1844d040c0c90abc007047) Thanks [@clintcs](https://github.com/clintcs)! - Dropdown now emits a custom "filter" event when filtering. The event's `detail` property is the value filtered.

- [#433](https://github.com/CrowdStrike/glide-core/pull/433) [`a73866c`](https://github.com/CrowdStrike/glide-core/commit/a73866c00a9a1f26e16988aa9f33d0dc82960e06) Thanks [@clintcs](https://github.com/clintcs)! - When an option is selected and that option's `label` is changed programmatically, Dropdown now updates the label of its button when single-select, the label of its tags when multiselect, and the value of its input field when filterable.

- [#439](https://github.com/CrowdStrike/glide-core/pull/439) [`a57249b`](https://github.com/CrowdStrike/glide-core/commit/a57249b68af6a8ae4ff6c9500edf66734b096284) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Tooltip was updated to have a higher contrast in dark mode.

- [#428](https://github.com/CrowdStrike/glide-core/pull/428) [`42d162f`](https://github.com/CrowdStrike/glide-core/commit/42d162f112b3ac10ab0e0976b0b335e30338159d) Thanks [@danwenzel](https://github.com/danwenzel)! - Allow custom target icon for Tree Item Menu.

- [#432](https://github.com/CrowdStrike/glide-core/pull/432) [`38b7c7d`](https://github.com/CrowdStrike/glide-core/commit/38b7c7da05e771b6dbf3371d230976b1b9a19c11) Thanks [@clintcs](https://github.com/clintcs)! - Checkbox Group no longer unchecks Checkboxes whose `value` is changed programmatically.

- [#438](https://github.com/CrowdStrike/glide-core/pull/438) [`79c4cce`](https://github.com/CrowdStrike/glide-core/commit/79c4cce6c310ae375d34780e5e1d95821841cff9) Thanks [@clintcs](https://github.com/clintcs)! - Tag now has a `disabled` attribute that changes its color and disables its removal button.

- [#439](https://github.com/CrowdStrike/glide-core/pull/439) [`a57249b`](https://github.com/CrowdStrike/glide-core/commit/a57249b68af6a8ae4ff6c9500edf66734b096284) Thanks [@ynotdraw](https://github.com/ynotdraw)! - `@crowdstrike/glide-core/styles/variables.css` has been updated with the latest from Figma:

  ## System

  ```diff
  + --glide-core-page-size-details-panel: 27.375rem;
  + --glide-core-page-size-height: 46.875rem;
  + --glide-core-page-size-width: 83.3125rem;
  ```

  ## Dark

  ```diff
  - --glide-core-surface-base-dark: #212121;
  + --glide-core-surface-base-dark: #f0f0f0;
  ```

- [#435](https://github.com/CrowdStrike/glide-core/pull/435) [`438afa2`](https://github.com/CrowdStrike/glide-core/commit/438afa2a4c43095f9e3e01d77789490785967843) Thanks [@clintcs](https://github.com/clintcs)! - Dropdown no longer shows a tooltip on the first option when it has overflowing text and Dropdown is opened via click.
  Dropdown still shows a tooltip when the option is arrowed to or hovered.

- [#431](https://github.com/CrowdStrike/glide-core/pull/431) [`42c6b45`](https://github.com/CrowdStrike/glide-core/commit/42c6b454deac0260c2206ade042faeb48236882d) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Tab Group now supports a `sticky` attribute, enabling the group to remain fixed at the top of the panel even when the panel content is scrolled.

## 0.10.0

### Minor Changes

- [#392](https://github.com/CrowdStrike/glide-core/pull/392) [`01b3c80`](https://github.com/CrowdStrike/glide-core/commit/01b3c80448d156120cc4db98a7b3f29849ddab09) Thanks [@clintcs](https://github.com/clintcs)! - Split Button Container has a new API to accommodate a new design requirement for its buttons to disabled independently of one another.
  See Storybook for the full API.

  ### Before

  ```html
  <script>
    import '@crowdstrike/glide-core/split-container.js';
    import '@crowdstrike/glide-core/split-button.js';
    import '@crowdstrike/glide-core/menu.link.js';
    import '@crowdstrike/glide-core/menu.button.js';
  </script>

  <glide-core-split-container
    menu-label="Label"
    menu-placement="top-end"
    open
    disabled
  >
    <glide-core-split-button slot="primary-action">
      Button
      <glide-core-example-icon slot="prefix"></glide-core-example-icon>
    </glide-core-split-button>

    <glide-core-menu-button label="Label"></glide-core-menu-button>
  </glide-core-split-container>
  ```

  ### After

  ```html
  <script>
    import '@crowdstrike/glide-core/split-button.js';
    import '@crowdstrike/glide-core/split-button.primary-button.js';
    import '@crowdstrike/glide-core/split-button.secondary-button.js';
    import '@crowdstrike/glide-core/menu.button.js';
  </script>

  <glide-core-split-button>
    <glide-core-split-button-primary-button label="Label" disabled>
      <glide-core-example-icon slot="icon"></glide-core-example-icon>
    </glide-core-split-button-primary-button>

    <glide-core-split-button-secondary-button
      slot="secondary-button"
      label="Label"
      menu-placement="top-end"
      disabled
      menu-open
    >
      <glide-core-menu-button label="Label"></glide-core-menu-button>
    </glide-core-split-button-secondary-button>
  </glide-core-split-button>
  ```

- [#413](https://github.com/CrowdStrike/glide-core/pull/413) [`6abae27`](https://github.com/CrowdStrike/glide-core/commit/6abae27f3e1a123105366576dd4bd08c2e10616d) Thanks [@clintcs](https://github.com/clintcs)! - Input's "prefix" and "suffix" slots have been renamed to "prefix-icon" and "suffix-icon".

  ```diff
  <glide-core-input label="Label" placeholder="Placeholder">
    <glide-core-example-icon
  -   slot="prefix"
  +   slot="prefix-icon"
      name="edit"
    ></glide-core-example-icon>
    <glide-core-example-icon
  -   slot="suffix"
  +   slot="suffix-icon"
      name="share"
    ></glide-core-example-icon>
  </glide-core-input>
  ```

- [#400](https://github.com/CrowdStrike/glide-core/pull/400) [`ee0aa37`](https://github.com/CrowdStrike/glide-core/commit/ee0aa3704f75c598bac8a190850c69a3c991f67c) Thanks [@clintcs](https://github.com/clintcs)! - Tooltip's default slot no longer supports a shortcut.
  Use the new `shortcut` attribute instead.
  This change is to support a new design requirement restricting the width of non-shortcut content.

  ```html
  <glide-core-tooltip shortcut='["CMD","K"]'> Tooltip </glide-core-tooltip>
  ```

- [#407](https://github.com/CrowdStrike/glide-core/pull/407) [`c9d9655`](https://github.com/CrowdStrike/glide-core/commit/c9d96554b0591828faf0e226990d8143a00f04dc) Thanks [@clintcs](https://github.com/clintcs)! - `@crowdstrike/glide-core/styles/variables.css` has been updated with the latest from Figma:

  ## Light

  ```diff
  - --glide-core-text-syntax-blue: #0000ff;
  - --glide-core-text-syntax-dark: #151515;
  - --glide-core-text-syntax-green: #116644;
  - --glide-core-text-syntax-purple: #770088;
  - --glide-core-text-syntax-red-dark: #95150e;
  - --glide-core-text-syntax-red-light: #ee4400;

  - --glide-core-text-body-lighter: #c9c9c9;
  + --glide-core-text-body-lighter: #8a8a8a;

  + --glide-core-border-base-transparent: #0000001a;
  + --glide-core-surface-table-row-hover: #1d7afc26;
  ```

  ## Dark

  ```diff
  - --glide-core-text-syntax-blue: #0000ff;
  - --glide-core-text-syntax-dark: #ffffff;
  - --glide-core-text-syntax-green: #116644;
  - --glide-core-text-syntax-purple: #770088;
  - --glide-core-text-syntax-red-dark: #95150e;
  - --glide-core-text-syntax-red-light: #ee4400;

  - --glide-core-text-body-lighter: #c9c9c9;
  + --glide-core-text-body-lighter: #8a8a8a;

  - --glide-core-text-placeholder: #d7e7ff;
  + --glide-core-text-placeholder: #c9c9c9;

  + --glide-core-border-base-transparent: #0000001a;
  + --glide-core-surface-table-row-hover: #1d7afc26;
  ```

- [#401](https://github.com/CrowdStrike/glide-core/pull/401) [`7231487`](https://github.com/CrowdStrike/glide-core/commit/7231487e0e152042ccb8991781a264e963ba9d8c) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Removed Status Indicator. It was only used by Toast. Moved it to the consuming application.

- [#387](https://github.com/CrowdStrike/glide-core/pull/387) [`37841e9`](https://github.com/CrowdStrike/glide-core/commit/37841e91edfae1d8926221e97d81669274f80601) Thanks [@clintcs](https://github.com/clintcs)! - Modal's `show-back-button` attribute has been renamed to `back-button` for brevity.

  ```diff
  - <glide-core-modal label="Label" show-back-button>
  + <glide-core-modal label="Label" back-button>
  ```

  Drawer's `open()` method has been renamed to `show()` to match [`<dialog>`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/show).

  ```diff
  const drawer = document.querySelector('glide-core-modal');

  - drawer.open();
  + drawer.show();
  ```

  Modal no longer emits an "open" event on open to match `<dialog>`. You can instead listen for a "click" event on the button that opens your Modal.

- [#385](https://github.com/CrowdStrike/glide-core/pull/385) [`b3e8efd`](https://github.com/CrowdStrike/glide-core/commit/b3e8efde561412f821fbba7f6e2dc24b31610cf4) Thanks [@clintcs](https://github.com/clintcs)! - Menu no longer offers a `focus()` method, which focused its target. Simply call `focus()` on your target directly.

- [#388](https://github.com/CrowdStrike/glide-core/pull/388) [`5a0f3a2`](https://github.com/CrowdStrike/glide-core/commit/5a0f3a22cf3104d7974e114d4e7960deb65b44db) Thanks [@clintcs](https://github.com/clintcs)! - Button's "prefix" and "suffix" slots have been renamed to "prefix-icon" and "suffix-icon".

  ```diff
  <glide-core-button label="Label">
    <glide-core-example-icon
  -   slot="prefix"
  +   slot="prefix-icon"
      name="calendar"
    ></glide-core-example-icon>
    <glide-core-example-icon
  -   slot="suffix"
  +   slot="suffix-icon"
      name="edit"
    ></glide-core-example-icon>
  </glide-core-button>
  ```

  Button Group Button's "prefix" slot has been renamed to "icon".

  ```diff
  <glide-core-button-group label="Label">

    <glide-core-button-group-button label="One">
      <glide-core-example-icon
  -     slot="prefix"
  +     slot="icon"
        name="calendar"
      ></glide-core-example-icon>
    </glide-core-button-group-button>
  </glide-core-button-group>
  ```

  Accordion's "prefix" and "suffix" slots have been renamed to "prefix-icon" and "suffix-icons".

  ```diff
  <glide-core-accordion label="Label">
    Content

    <glide-core-example-icon
  -   slot="prefix"
  +   slot="prefix-icon"
      name="share"
    ></glide-core-example-icon>
    <glide-core-example-icon
  -   slot="suffix"
  +   slot="suffix-icons"
      name="edit"
    ></glide-core-example-icon>
    <glide-core-example-icon
  -   slot="suffix"
  +   slot="suffix-icons"
      name="settings"
    ></glide-core-example-icon>
  </glide-core-accordion>
  ```

  Accordion no longer dispaches a custom event. Accordion's state, which was available via the custom event's `detail` property, can be accessed via the `open` property.

  ```diff
  - $0.addEventListener('toggle', (e) => console.log(e.detail.newState === 'open'))
  + $0.addEventListener('toggle', (e) => console.log(e.target.open))
  ```

- [#377](https://github.com/CrowdStrike/glide-core/pull/377) [`a3381d8`](https://github.com/CrowdStrike/glide-core/commit/a3381d81e52b50e90c00bc3cb7511feb2165faf2) Thanks [@clintcs](https://github.com/clintcs)! - Tag's default slot has been replaced by a `label` attribute to restrict its content to enforce visual consistency.

  ```diff
  - <glide-core-tag>Label</glide-core-tag>
  + <glide-core-tag label="Label"></glide-core-tag>
  ```

  Tag's `removable-label` attribute has been renamed to `removable` and is now boolean. Tag will use `label` instead to describe its removal button to screenreaders.

  ```diff
  - <glide-core-tag removable-label="remove">Tag</glide-core-tag>
  + <glide-core-tag label="Label" removable></glide-core-tag>
  ```

  Tag's "prefix" slot has been renamed "icon".

  ```diff
  <glide-core-tag label="Label">
    <glide-core-example-icon
      name="drag-dots"
  -   slot="prefix"
  +   slot="icon"
    ></glide-core-example-icon>
  </glide-core-tag>
  ```

- [#397](https://github.com/CrowdStrike/glide-core/pull/397) [`efe4812`](https://github.com/CrowdStrike/glide-core/commit/efe481216031d771aa6abb3b57ac0cb5eb16b8da) Thanks [@clintcs](https://github.com/clintcs)! - Button now has a `label` attribute instead of a default slot to restrict its content to increase design consistency.

  ```diff
  - <glide-core-button>Label</glide-core-button>
  + <glide-core-button label="Label"></glide-core-button>
  ```

- [#386](https://github.com/CrowdStrike/glide-core/pull/386) [`1438848`](https://github.com/CrowdStrike/glide-core/commit/1438848734003181ddec472d9c299c02b052c064) Thanks [@clintcs](https://github.com/clintcs)! - The order of the values in Dropdown's `value` array no longer changes when the `value` of a selected Dropdown Option is changed programmatically.

### Patch Changes

- [#430](https://github.com/CrowdStrike/glide-core/pull/430) [`26e0a8e`](https://github.com/CrowdStrike/glide-core/commit/26e0a8ed315d29c8dca1328fbbbd0513c9ca1b60) Thanks [@clintcs](https://github.com/clintcs)! - - When inside another web component and open, Menu now closes when its target is clicked.

  - Dropdown can now be navigated using ArrowUp and ArrowDown when opened via click.

- [#400](https://github.com/CrowdStrike/glide-core/pull/400) [`ee0aa37`](https://github.com/CrowdStrike/glide-core/commit/ee0aa3704f75c598bac8a190850c69a3c991f67c) Thanks [@clintcs](https://github.com/clintcs)! - Tooltips with a shortcut now display the shortcut on the left when their tooltip is positioned to the left of its target.

- [#408](https://github.com/CrowdStrike/glide-core/pull/408) [`be4a2f4`](https://github.com/CrowdStrike/glide-core/commit/be4a2f45bf1cffd80ff07544e80f9381a96c2aa2) Thanks [@clintcs](https://github.com/clintcs)! - Toggle's focus outline offset has been reduced.

- [#399](https://github.com/CrowdStrike/glide-core/pull/399) [`5b95fa2`](https://github.com/CrowdStrike/glide-core/commit/5b95fa23a2ee97d4cef2be164f26b4eabebe18ac) Thanks [@danwenzel](https://github.com/danwenzel)! - Design updates to Checkbox and Checkbox Group:

  - More prominent background and border colors for disabled checkboxes
  - Increased vertical spacing between Checkbox Group Checkboxes
  - A Checkbox Group in error state now shows red border around the group, rather than a red border for each individual checkbox

- [#421](https://github.com/CrowdStrike/glide-core/pull/421) [`2f5875c`](https://github.com/CrowdStrike/glide-core/commit/2f5875c73a03fa03ab80b805daa5094077e85921) Thanks [@clintcs](https://github.com/clintcs)! - Multiselect Dropdown previously moved selected option tags into an overflow menu when they exceeded 3.
  It now dynamically adds tags to the overflow menu based on available space.

- [#427](https://github.com/CrowdStrike/glide-core/pull/427) [`6b0451d`](https://github.com/CrowdStrike/glide-core/commit/6b0451d4445837f3f68ec270f8f59b4478297eb5) Thanks [@danwenzel](https://github.com/danwenzel)! - Ensure correct gap between Tree Item prefix icon and label

  We were previously targeting the slotted element, which wasn't working if that slotted element had `display:contents`.

- [#413](https://github.com/CrowdStrike/glide-core/pull/413) [`6abae27`](https://github.com/CrowdStrike/glide-core/commit/6abae27f3e1a123105366576dd4bd08c2e10616d) Thanks [@clintcs](https://github.com/clintcs)! - - Input and Textarea now have an `autocomplete` attribute.

  - Input's `autocapitalize`, `disabled`, `label`, `maxlength`, and `placeholder` attributes are now reflected.
  - Textareas's `autocapitalize`, `disabled`, `hide-label`, `label`, `maxlength`, `placeholder`, `readonly`, `required`, and `spellcheck` attributes are now reflected.

- [#420](https://github.com/CrowdStrike/glide-core/pull/420) [`f0fe466`](https://github.com/CrowdStrike/glide-core/commit/f0fe4669bb2353787cc676dbf917b17eb39ab32a) Thanks [@clintcs](https://github.com/clintcs)! - When disabled, Toggle's background color is now darker in a light theme and lighter in a dark theme.

- [#391](https://github.com/CrowdStrike/glide-core/pull/391) [`d2b0278`](https://github.com/CrowdStrike/glide-core/commit/d2b027866bedd02e7cbf954563880edcdd64a9e9) Thanks [@dylankcrwd](https://github.com/dylankcrwd)! - - Button icon slots no longer have negative margins, and Button horizontal padding is slightly decreased when icons are present. This resolves an issue where negative margins caused horizontal overflow in the parent container.

- [#411](https://github.com/CrowdStrike/glide-core/pull/411) [`d435fe5`](https://github.com/CrowdStrike/glide-core/commit/d435fe57a035240cd17af2a410e0e6d9fd70a583) Thanks [@clintcs](https://github.com/clintcs)! - Dropdown Option's label is now vertically centered and shorter when Dropdown's `size` is `"small"`.

- [#395](https://github.com/CrowdStrike/glide-core/pull/395) [`4bfde01`](https://github.com/CrowdStrike/glide-core/commit/4bfde012b5deae00b8ab26b101ba6a4e473432b5) Thanks [@clintcs](https://github.com/clintcs)! - - Accordion respects the user's system preference for reduced motion.

  - Accordion waits to dispatch "toggle" on open until its animation is complete.
  - Accordion animates when `open` is set programmatically.
  - Accordion's "toggle" event bubbles.
  - Accordion's `open` property is set to `true` when Accordion is opened via click.
  - Accordion has a `click()` method.
  - Setting Accordion's `open` property to `false` closes Accordion.

- [#393](https://github.com/CrowdStrike/glide-core/pull/393) [`cb66eba`](https://github.com/CrowdStrike/glide-core/commit/cb66ebaa54dbfac2c836709c2b35ab1b1902c430) Thanks [@danwenzel](https://github.com/danwenzel)! - Fixes a bug where programmatically-added tree items weren't correctly indented.

- [#419](https://github.com/CrowdStrike/glide-core/pull/419) [`241f21f`](https://github.com/CrowdStrike/glide-core/commit/241f21ff7239b454eb1e0ff673a1e739790c70d6) Thanks [@clintcs](https://github.com/clintcs)! - - Tooltip no longer has extraneous inner whitespace when it's without a shortcut.

  - Dropdown Option now supports icons when Dropdown is multiselect.
  - Dropdown's "icon:\<value\>" slot is now supported when multiselect.

- [#377](https://github.com/CrowdStrike/glide-core/pull/377) [`a3381d8`](https://github.com/CrowdStrike/glide-core/commit/a3381d81e52b50e90c00bc3cb7511feb2165faf2) Thanks [@clintcs](https://github.com/clintcs)! - Tag's "remove" event now bubbles.

- [#429](https://github.com/CrowdStrike/glide-core/pull/429) [`53bbba4`](https://github.com/CrowdStrike/glide-core/commit/53bbba49836cd14d516ef50bf5817d71fc4229cf) Thanks [@ynotdraw](https://github.com/ynotdraw)! - The Modal header buttons are now vertically centered with the surrounding content.

- [#426](https://github.com/CrowdStrike/glide-core/pull/426) [`53641cb`](https://github.com/CrowdStrike/glide-core/commit/53641cb9d5768993a62a350dc8fd5306d5dc9aa0) Thanks [@clintcs](https://github.com/clintcs)! - When inside another web component, multiselect Dropdown no longer closes when an option is selected.

- [#414](https://github.com/CrowdStrike/glide-core/pull/414) [`13642b7`](https://github.com/CrowdStrike/glide-core/commit/13642b7826e632635926ddc6310b07aea6687902) Thanks [@clintcs](https://github.com/clintcs)! - Dropdown no longer prevents the user from setting the insertion point inside the input field.

- [#406](https://github.com/CrowdStrike/glide-core/pull/406) [`a87e11c`](https://github.com/CrowdStrike/glide-core/commit/a87e11c9ba57e94327797905c728f46d9f0ed992) Thanks [@clintcs](https://github.com/clintcs)! - Form controls no longer have a small amount of extra whitespace below them when they lack a description.

- [#416](https://github.com/CrowdStrike/glide-core/pull/416) [`4ff8874`](https://github.com/CrowdStrike/glide-core/commit/4ff8874a20f07a05e6813d667eb281e25a98c44c) Thanks [@clintcs](https://github.com/clintcs)! - - Dropdown Option's optional icon is now limited in height and width to 16 pixels.

  - Dropdown now has an "icon:\<value\>" slot for showing an icon in Dropdown's button when an option is selected.
    "\<value\>" should be equal to the `value` of each option.
    Dropdown will show the correct icon in its button based on which option is selected.
    See [Storybook](https://glide-core.crowdstrike-ux.workers.dev/?path=/story/dropdown--with-icons) for a live example.

    ```html
    <glide-core-dropdown label="Label" placeholder="Placeholder">
      <svg slot="icon:edit">Edit</svg>
      <svg slot="icon:move">Move</svg>
      <svg slot="icon:share">Share</svg>

      <glide-core-dropdown-option label="Edit" value="edit">
        <svg slot="icon">Edit</svg>
      </glide-core-dropdown-option>

      <glide-core-dropdown-option label="Move" value="move">
        <svg slot="icon">Move</svg>
      </glide-core-dropdown-option>

      <glide-core-dropdown-option label="Share" value="share">
        <svg slot="icon">Share</svg>
      </glide-core-dropdown-option>
    </glide-core-dropdown>
    ```

- [#380](https://github.com/CrowdStrike/glide-core/pull/380) [`7df50b6`](https://github.com/CrowdStrike/glide-core/commit/7df50b6bf049a83f513f5519ecd8405c6a16f954) Thanks [@dylankcrwd](https://github.com/dylankcrwd)! - Button Group Button no longer has a hover style when selected.

- [#361](https://github.com/CrowdStrike/glide-core/pull/361) [`96a441b`](https://github.com/CrowdStrike/glide-core/commit/96a441b650050ec6fa10259acdca58d2ac568171) Thanks [@clintcs](https://github.com/clintcs)! - - Tree Item's properties are now reflected.

  - Split Container (now Split Button) supports dynamic replacement of Split Button Primary Button with Split Button Primary Link and vice versa.
  - Split Button Secondary Button's `menu-open` attribute and `menuOpen` property are synchronized with the state of the underlying Menu.
  - Split Button Secondary Button retains its visual hover state on click.

- [#378](https://github.com/CrowdStrike/glide-core/pull/378) [`4ceeda8`](https://github.com/CrowdStrike/glide-core/commit/4ceeda8a27fae3c47c32db4e1380824e3fd6a83e) Thanks [@dylankcrwd](https://github.com/dylankcrwd)! - Tree Items now have a fixed line-height to address an issue where they'd inherit different line-heights leading to unexpected sizing issues.

- [#405](https://github.com/CrowdStrike/glide-core/pull/405) [`1d27913`](https://github.com/CrowdStrike/glide-core/commit/1d27913ac2428a856e25f01526bdaf0a7a391484) Thanks [@clintcs](https://github.com/clintcs)! - - Radio Group's `name` attribute is now reflected.

  - Checkbox, Checkbox Group, Dropdown, Input, and Textarea's `name` attribute is now an empty string by default to match native.

- [#410](https://github.com/CrowdStrike/glide-core/pull/410) [`882cfb3`](https://github.com/CrowdStrike/glide-core/commit/882cfb32b79bc1c928d70166d1a22e0cefc43c33) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Tertiary slotted content in a Modal now properly vertically center-aligns itself.

- [#422](https://github.com/CrowdStrike/glide-core/pull/422) [`bfc4073`](https://github.com/CrowdStrike/glide-core/commit/bfc4073fc8e8b7dddf6e8dd8cd2452396ffe8ed1) Thanks [@clintcs](https://github.com/clintcs)! - - Dropdown when filterable and multiselect now clears its input field when an option is selected.

  - Dropdown now unhides previously filtered options when the `filterable` attribute is removed.
  - Single-select dropdown now sets the value of its input field to the label of the selected option when the `filterable` attribute is added.

- [#382](https://github.com/CrowdStrike/glide-core/pull/382) [`4b95507`](https://github.com/CrowdStrike/glide-core/commit/4b95507dc8aac673d6a027cc7c52c24c12f55b34) Thanks [@clintcs](https://github.com/clintcs)! - Menu Link now navigates when selected via Space or Enter.

- [#386](https://github.com/CrowdStrike/glide-core/pull/386) [`1438848`](https://github.com/CrowdStrike/glide-core/commit/1438848734003181ddec472d9c299c02b052c064) Thanks [@clintcs](https://github.com/clintcs)! - - Checkbox Group's `value` property is no longer read-only.

  - Checkbox Group now updates its `value` when the `value` of an underlying Checkbox has changed.

- [#392](https://github.com/CrowdStrike/glide-core/pull/392) [`01b3c80`](https://github.com/CrowdStrike/glide-core/commit/01b3c80448d156120cc4db98a7b3f29849ddab09) Thanks [@clintcs](https://github.com/clintcs)! - - Split Button's "primary" variant has a refreshed visual design.

  - Split Button's secondary button has an "active" visual treatment when its menu is open.

- [#385](https://github.com/CrowdStrike/glide-core/pull/385) [`b3e8efd`](https://github.com/CrowdStrike/glide-core/commit/b3e8efde561412f821fbba7f6e2dc24b31610cf4) Thanks [@clintcs](https://github.com/clintcs)! - - Accordion now has a `focus()` method.
  - Icon Button now has a `click()` method.

## 0.9.6

### Patch Changes

- [#374](https://github.com/CrowdStrike/glide-core/pull/374) [`2906848`](https://github.com/CrowdStrike/glide-core/commit/2906848b371ebbdeb5eeded6ff5a9bf407980b2d) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Tooltip now inserts line breaks into long strings to allow wrapping and prevent overflow.

## 0.9.5

### Patch Changes

- [#372](https://github.com/CrowdStrike/glide-core/pull/372) [`b7167c3`](https://github.com/CrowdStrike/glide-core/commit/b7167c3516c6310e8dba54c291460799525f5a34) Thanks [@clintcs](https://github.com/clintcs)! - Dropdown when filterable and single-select now sets the value of its `<input>` when an option is selected on initial render.

## 0.9.4

### Patch Changes

- [#362](https://github.com/CrowdStrike/glide-core/pull/362) [`16e14de`](https://github.com/CrowdStrike/glide-core/commit/16e14dea806cbef07fbd659478eae448ef386fe9) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Updated Dropdown's placeholder color to align with Input and Textarea. This is improves Dark Mode support.

- [#366](https://github.com/CrowdStrike/glide-core/pull/366) [`739dc82`](https://github.com/CrowdStrike/glide-core/commit/739dc825546f72c5b6c8dd28fc368955494171fc) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Updated Dropdown to use the proper font when filtering.

- [#352](https://github.com/CrowdStrike/glide-core/pull/352) [`57d3b26`](https://github.com/CrowdStrike/glide-core/commit/57d3b26f2549cea42ad2fecb312e5c0db4ee58f4) Thanks [@clintcs](https://github.com/clintcs)! - - Tooltip's content is now shown in two columns to better support the appearance of keyboard shortcuts when non-shortcut content wraps.

  - The font size of Tooltip's content has been slightly reduced.
  - The gap between Tooltip's shortcut content and non-shortcut content has been slightly reduced.

- [#360](https://github.com/CrowdStrike/glide-core/pull/360) [`8c7841c`](https://github.com/CrowdStrike/glide-core/commit/8c7841c6b8f299a94e9f7bb5b2a108cd931c1957) Thanks [@dylankcrwd](https://github.com/dylankcrwd)! - Button Group Buttons are now rounded in Safari.

- [#357](https://github.com/CrowdStrike/glide-core/pull/357) [`03e30d6`](https://github.com/CrowdStrike/glide-core/commit/03e30d6c284347f36fc40f5c6d705bb6dbaa09d6) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Updated `--glide-core-surface-base-gray`'s color value to have better Dark Mode support.

- [#356](https://github.com/CrowdStrike/glide-core/pull/356) [`bd2696e`](https://github.com/CrowdStrike/glide-core/commit/bd2696e005547d469a526cf88863d86f3da31bdc) Thanks [@clintcs](https://github.com/clintcs)! - Dropdown now has a `filterable` attribute.
  Use it to force Dropdown to be filterable when there are fewer than 11 options.
  When there are 11 or more options, Dropdown will be filterable regardless of `filterable`.

## 0.9.3

### Patch Changes

- [#350](https://github.com/CrowdStrike/glide-core/pull/350) [`68fa69b`](https://github.com/CrowdStrike/glide-core/commit/68fa69b5f966ee248d77906b8415107f554d0e83) Thanks [@clintcs](https://github.com/clintcs)! - The weight of Dropdown's button font is no longer bold when `variant="quiet"`.

- [#351](https://github.com/CrowdStrike/glide-core/pull/351) [`cda0918`](https://github.com/CrowdStrike/glide-core/commit/cda0918ef8d9dbe02a39062d96f461d6c4323120) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Updated Dropdown and Menu open animations to align with Tooltip.

- [#345](https://github.com/CrowdStrike/glide-core/pull/345) [`c7d13aa`](https://github.com/CrowdStrike/glide-core/commit/c7d13aa740e4951e3103501ca9f79fc9ad7afb17) Thanks [@clintcs](https://github.com/clintcs)! - Dropdown Option's checkmark icon is now on the right to match new design requirements.

- [#354](https://github.com/CrowdStrike/glide-core/pull/354) [`0cc1af3`](https://github.com/CrowdStrike/glide-core/commit/0cc1af34d1380802157031336ac88688d0d740e2) Thanks [@dylankcrwd](https://github.com/dylankcrwd)! - `glide-core-tab-group` active tab indicator is reevaluated on tab slot changes.

- [#338](https://github.com/CrowdStrike/glide-core/pull/338) [`c72aa3f`](https://github.com/CrowdStrike/glide-core/commit/c72aa3fd4ac0344786c14036b03f247d55e023e8) Thanks [@clintcs](https://github.com/clintcs)! - - Button's `type` attribute is now reflected.
  - Button now supports the full set of native `<button>` attributes such as `formenctype`, `name`, `popovertarget`, and others.

## 0.9.2

### Patch Changes

- [#344](https://github.com/CrowdStrike/glide-core/pull/344) [`4a23547`](https://github.com/CrowdStrike/glide-core/commit/4a23547a3b7c569ddf849db965df5f93bd900e97) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Design Tokens were synced with Figma.

  - `--glide-core-surface-base-gray-lighter` was added.
  - `--glide-core-surface-white-1percent`'s value was updated for Dark Mode to add an opacity.

- [#337](https://github.com/CrowdStrike/glide-core/pull/337) [`5a13414`](https://github.com/CrowdStrike/glide-core/commit/5a13414322c8a9e53b4c3bc91cdfaa1d97641860) Thanks [@clintcs](https://github.com/clintcs)! - Form controls except Textarea now submit their form on Enter to match native controls and to improve accessibility.

- [#335](https://github.com/CrowdStrike/glide-core/pull/335) [`18567fb`](https://github.com/CrowdStrike/glide-core/commit/18567fb762ef1fb05d1294d1eb11b1df09ee977a) Thanks [@dylankcrwd](https://github.com/dylankcrwd)! - - Updates `glide-core-tab-group` to align with new design changes relating to overflow button behavior and styling.

- [#333](https://github.com/CrowdStrike/glide-core/pull/333) [`1ee4297`](https://github.com/CrowdStrike/glide-core/commit/1ee429777e4e90a1a8d452e11565b611104327fc) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Checkbox's checkmark now animates. The animation is disabled when the relevant reduced motion system preference is enabled.

- [#343](https://github.com/CrowdStrike/glide-core/pull/343) [`ddd3103`](https://github.com/CrowdStrike/glide-core/commit/ddd3103310484a656dab73094f6de937b7b4e29b) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Textarea's resize handle was removed when the component is in the readonly state to align with the latest designs.

- [#339](https://github.com/CrowdStrike/glide-core/pull/339) [`28c0b34`](https://github.com/CrowdStrike/glide-core/commit/28c0b347a7881b4c234b927bdb1189dfe617a97d) Thanks [@clintcs](https://github.com/clintcs)! - - Menu's target now emits a "click" event when clicked.

  - Menu's active option remains active after being clicked and Menu is reopened.
  - Button emits a "click" event on Enter.
  - Buttons with `type="button"` no longer reset forms.
  - Button's `click()` method now submits or resets the form when `type="submit"` or `type="reset"`.

- [#319](https://github.com/CrowdStrike/glide-core/pull/319) [`2f03a51`](https://github.com/CrowdStrike/glide-core/commit/2f03a5176c8d19c3b4d93da87c8019b1099980da) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Menu and Dropdown now animate when opening. The animations are disabled when the relevant reduced motion system preference is enabled.

- [#336](https://github.com/CrowdStrike/glide-core/pull/336) [`03e795a`](https://github.com/CrowdStrike/glide-core/commit/03e795aceab5e224a3fdf672d1f7876e05570e9d) Thanks [@clintcs](https://github.com/clintcs)! - Drawer's "open" and "close" events now bubble.

- [#332](https://github.com/CrowdStrike/glide-core/pull/332) [`d02058e`](https://github.com/CrowdStrike/glide-core/commit/d02058e03b063fa4ddb11bdd6877290d287df717) Thanks [@danwenzel](https://github.com/danwenzel)! - Add newly-translated Japanese and French strings

- [#328](https://github.com/CrowdStrike/glide-core/pull/328) [`784d455`](https://github.com/CrowdStrike/glide-core/commit/784d455285be15804b59cee5b11d091227963943) Thanks [@danwenzel](https://github.com/danwenzel)! - Add intellisense info for `Toasts.add()` `toast.duration` param

- [#334](https://github.com/CrowdStrike/glide-core/pull/334) [`8e9c233`](https://github.com/CrowdStrike/glide-core/commit/8e9c233055f8c10c0517783cb34f9023d60a6feb) Thanks [@clintcs](https://github.com/clintcs)! - Clicking a Dropdown option's icon now selects the option.

- [#340](https://github.com/CrowdStrike/glide-core/pull/340) [`0fc9fa5`](https://github.com/CrowdStrike/glide-core/commit/0fc9fa53fd46e0786b827a262fe43852109baa38) Thanks [@ynotdraw](https://github.com/ynotdraw)! - The latest Toast message appears at the top of the list rather than the bottom.

- [#308](https://github.com/CrowdStrike/glide-core/pull/308) [`289ba3d`](https://github.com/CrowdStrike/glide-core/commit/289ba3d8af7abc52479290ffb2532128d46bb9d4) Thanks [@dylankcrwd](https://github.com/dylankcrwd)! - - Adds an animated active tab indicator to `glide-core-tab-group` that respects `prefers-reduced-motion`.

  - Aligns the width of the active tab indicator to the width of the tab's text.
  - Slightly decreases the height of the tab bar.

- [#342](https://github.com/CrowdStrike/glide-core/pull/342) [`d18df39`](https://github.com/CrowdStrike/glide-core/commit/d18df398326a75cdb4a6cf44c0387686e92e54da) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Subtle hover transitions were added to Dropdown, Dropdown Option, Menu Button, Menu Link, and Tree components.

- [#330](https://github.com/CrowdStrike/glide-core/pull/330) [`986976d`](https://github.com/CrowdStrike/glide-core/commit/986976dc19e91eaa63e88dd71bef431d5b1cf1b4) Thanks [@clintcs](https://github.com/clintcs)! - - When filterable and an option is selected, Dropdown now sets the underlying `<input>`'s `value` instead of `placeholder` to match the updated interaction specification.

  - Pressing `Meta` + `Backspace` when the insertion point is at the beginning of a filterable Dropdown now removes every non-overflowing, selected option.
  - Dropdown now has a `click()` method.
  - Dropdown no longer shows an empty menu when opened after every option have been filtered out.

- [#341](https://github.com/CrowdStrike/glide-core/pull/341) [`a9ccc70`](https://github.com/CrowdStrike/glide-core/commit/a9ccc70a88ed85eee022d6ef006919129db52c4e) Thanks [@clintcs](https://github.com/clintcs)! - - The height of Dropdown when `variant="quiet"` has been greatly reduced.

  - Dropdown no longer has a focus outline on focus. Its border color changes instead.

- [#331](https://github.com/CrowdStrike/glide-core/pull/331) [`1db87d8`](https://github.com/CrowdStrike/glide-core/commit/1db87d8d78969e70ac470c129746191d95106b87) Thanks [@danwenzel](https://github.com/danwenzel)! - Border color updates to Input, Textarea, and Dropdown:

  - Default border color updated to a darker gray
  - When hovering, border changes to a more prominent blue color

## 0.9.1

### Patch Changes

- [#322](https://github.com/CrowdStrike/glide-core/pull/322) [`c577f7d`](https://github.com/CrowdStrike/glide-core/commit/c577f7d20afb155247f1d09a7e4255008c003786) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Updated Button Group Button's background color to no longer be transparent so that the background won't bleed through the component.

- [#318](https://github.com/CrowdStrike/glide-core/pull/318) [`b4bedc4`](https://github.com/CrowdStrike/glide-core/commit/b4bedc4a54f1f7ac6b4b5daea5ac5b27f5d37450) Thanks [@danwenzel](https://github.com/danwenzel)! - Add click method to Tree Item Menu, allowing programmatic opening of the menu

- [#324](https://github.com/CrowdStrike/glide-core/pull/324) [`83174ce`](https://github.com/CrowdStrike/glide-core/commit/83174ce65da370f31168d1cc48b2307c6aea832a) Thanks [@clintcs](https://github.com/clintcs)! - Checkbox and Toggle can now be forced checked or unchecked.

  To do this, add a "change" or "input" listener that sets `checked` to the
  desired state after waiting for the component to update so your `checked`
  change isn't reverted after the update completes:

  ```ts
  document
    .querySelector('glide-core-toggle')
    .addEventListener('change', async (event) => {
      await event.target.updateComplete;
      event.target.checked = false;
    });
  ```

- [#318](https://github.com/CrowdStrike/glide-core/pull/318) [`b4bedc4`](https://github.com/CrowdStrike/glide-core/commit/b4bedc4a54f1f7ac6b4b5daea5ac5b27f5d37450) Thanks [@danwenzel](https://github.com/danwenzel)! - Accessibility improvements to Tree:

  - Removes the ability to focus on a Tree Item Menu or Tree Item Icon Button unless the tree item is focused
  - Stops event propagation on click or keyboard events when originating from Tree Item Menu or Tree Item Icon Button
  - Added a `label` attribute to Tree Item Icon Button and Tree Item Menu for accessibility
  - Prevent keyboard navigation to selected tree item if collapsed

- [#320](https://github.com/CrowdStrike/glide-core/pull/320) [`2d1c7f4`](https://github.com/CrowdStrike/glide-core/commit/2d1c7f4d278c6394ba003324e8af1d056c88d5cc) Thanks [@clintcs](https://github.com/clintcs)! - - Input's `spellcheck` property is now reflected.

  - Form Controls Layout no longer overflows slightly when `split="middle"`.
  - Radio's `label` is now `undefined` by default instead of an empty string to match other components.

- [#321](https://github.com/CrowdStrike/glide-core/pull/321) [`69723ab`](https://github.com/CrowdStrike/glide-core/commit/69723abc4488ad142505ba4dfcdd2af6b9947662) Thanks [@clintcs](https://github.com/clintcs)! - Menu buttons and links now emit "click" events when selected via Space or Enter.

## 0.9.0

### Minor Changes

- [#309](https://github.com/CrowdStrike/glide-core/pull/309) [`ffc70d1`](https://github.com/CrowdStrike/glide-core/commit/ffc70d19d135b72ddfd5ac8063421c4833a4510c) Thanks [@ynotdraw](https://github.com/ynotdraw)! - - Breaking Change: The `clear-icon` slot for Input was removed, as consumers should not be adjusting the clear icon themselves.

- [#307](https://github.com/CrowdStrike/glide-core/pull/307) [`bb18490`](https://github.com/CrowdStrike/glide-core/commit/bb184902bdf535d3301ce2910f40eb8713c2ffa0) Thanks [@clintcs](https://github.com/clintcs)! - - Tooltip's `setContainingBlock` method was removed.

  - `library/set-containing-block.js` was removed.

- [#296](https://github.com/CrowdStrike/glide-core/pull/296) [`b1cb732`](https://github.com/CrowdStrike/glide-core/commit/b1cb73210d0d8504fc936ebedd3cd27713f4b16b) Thanks [@clintcs](https://github.com/clintcs)! - Menu, Tree, Tree Item, and Tree Item Menu no longer offer a `setContainingBlock` method.
  Each component's menu now positions itself correctly without `setContainingBlock`.

- [#289](https://github.com/CrowdStrike/glide-core/pull/289) [`500ae69`](https://github.com/CrowdStrike/glide-core/commit/500ae69b80aa99975e532182415e017984f2b92e) Thanks [@clintcs](https://github.com/clintcs)! - - Button Group's `ButtonGroupVariant` and `ButtonGroupOrientation` types are not exported.
  - Button Group Button has a `label` attribute instead of a default slot to restrict arbitrary content.
  - Button Group instead of Button Group Button emits "change" and "input" events.
  - Button Group Button's `variant` attribute was renamed to `privateVariant` and should not be used.
  - Button Group Button's `vertical` renamed to `privateOrientation` and should not be used.
  - Button Group throws if it only contains one Button Group Button.
  - Button Group dispatches an `Event` instead of a `CustomEvent`

### Patch Changes

- [#314](https://github.com/CrowdStrike/glide-core/pull/314) [`2364551`](https://github.com/CrowdStrike/glide-core/commit/2364551a9698aa584c03d2956af11770a8413c9f) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Fixed a bug with Input where if it were `disabled` or `readonly` and the value exceeded `maxlength`, it would be invalid. This is a valid state because the user cannot interact with the element.

- [#314](https://github.com/CrowdStrike/glide-core/pull/314) [`2364551`](https://github.com/CrowdStrike/glide-core/commit/2364551a9698aa584c03d2956af11770a8413c9f) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Multiple adjustments to Textarea were added:

  - Resolved a bug where if a description was not provided, but `maxlength` was, the character counter would be in the incorrect position.
  - Textarea now properly updates validity when set as `required` if `value` is updated programmatically.
  - Textarea now properly updates validity and its visual error state when `required` is removed programmatically.
  - Fixed a bug where if Textarea was `disabled` or `readonly` and the value exceeded `maxlength`, it would be invalid. This is a valid state because the user cannot interact with the element.

- [#303](https://github.com/CrowdStrike/glide-core/pull/303) [`9f1ad06`](https://github.com/CrowdStrike/glide-core/commit/9f1ad06e7f4bad2a9a4888b8b76a3f86fc2a6758) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Radio's checked state is now animated and properly respects the user's `prefers-reduced-motion` browser preference.

- [#291](https://github.com/CrowdStrike/glide-core/pull/291) [`e8e5799`](https://github.com/CrowdStrike/glide-core/commit/e8e57991a72b7158dabfae9fe95e9bd6c88a73af) Thanks [@ynotdraw](https://github.com/ynotdraw)! - - Removed the opacity from the Modal background so that content no longer bleeds into it.

  - Modal is now given a maximum width to prevent it from colliding with the horizontal edges of the browser window as the screen width adjusts.

- [#294](https://github.com/CrowdStrike/glide-core/pull/294) [`107cc02`](https://github.com/CrowdStrike/glide-core/commit/107cc0248e923f00ccf48fb26d17af41c2518dc8) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Decrease the max-width of Modal.

- [#307](https://github.com/CrowdStrike/glide-core/pull/307) [`bb18490`](https://github.com/CrowdStrike/glide-core/commit/bb184902bdf535d3301ce2910f40eb8713c2ffa0) Thanks [@clintcs](https://github.com/clintcs)! - - Tooltip reliably breaks out of containers that have `overflow: hidden`.

  - Tooltip's `:host` is now `display: inline-block` by default so the tooltip remains aligned with its target when its target is less than the full width of its container.
  - There's no longer a small gap between Tooltip's arrow and the tooltip itself when the target is near the edge of the viewport.
  - To better match the mockups, Tooltip's arrow is rounded and larger. And the space between the tooltip and its target has increased.

- [#302](https://github.com/CrowdStrike/glide-core/pull/302) [`ec6a1f8`](https://github.com/CrowdStrike/glide-core/commit/ec6a1f81c41c049594c1c7390e978f89d0e83da7) Thanks [@clintcs](https://github.com/clintcs)! - - Checkbox Group's `focus()` method now focuses the first checkbox that isn't `disabled`.

  - Menu and Tree Item's `focus()` methods now accept a `FocusOptions` argument.

- [#311](https://github.com/CrowdStrike/glide-core/pull/311) [`0a1c3ad`](https://github.com/CrowdStrike/glide-core/commit/0a1c3ade4b70816fc1f89ffde6874eab5ba9b346) Thanks [@ynotdraw](https://github.com/ynotdraw)! - CSS variables were updated to align with the latest designs.

  - Updated the color values for `--glide-core-icon-primary`, `--glide-core-surface-base-gray`, `--glide-core-surface-selected-disabled`, and `--glide-core-surface-unselected-disabled` to be more dark mode friendly.
  - `--glide-core-border-radius-lg` was added.

- [#312](https://github.com/CrowdStrike/glide-core/pull/312) [`b3605ab`](https://github.com/CrowdStrike/glide-core/commit/b3605ab685ae5e0ed8b261122021b7d8a62b0966) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Textarea now has a progressive enhancement where it'll grow in height as needed up to a maximum of 5 lines in browsers that support [`field-sizing`](https://caniuse.com/mdn-css_properties_field-sizing).

- [#310](https://github.com/CrowdStrike/glide-core/pull/310) [`ba94241`](https://github.com/CrowdStrike/glide-core/commit/ba94241f4db951270a1ad69b4577184cea5dfb7b) Thanks [@danwenzel](https://github.com/danwenzel)! - Add popover attribute to Toasts

  Ensures that toasts will appear at the top layer,
  avoiding the need to play z-index wars with other elements

  Also, toasts now get picked up by screenreaders properly

- [#296](https://github.com/CrowdStrike/glide-core/pull/296) [`b1cb732`](https://github.com/CrowdStrike/glide-core/commit/b1cb73210d0d8504fc936ebedd3cd27713f4b16b) Thanks [@clintcs](https://github.com/clintcs)! - - Menu opens when `open` and its target is enabled programmatically.

  - Menu more reliably breaks out of containers with `overflow: hidden`.

- [#288](https://github.com/CrowdStrike/glide-core/pull/288) [`5828515`](https://github.com/CrowdStrike/glide-core/commit/58285156c08af07d126c3af280619f1ad612ce3a) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Many accessibility enhancements to Textarea:

  - The invalid state is now announced to screenreaders.
  - The character count information is now announced to screenreaders in a more accessible format.

- [#292](https://github.com/CrowdStrike/glide-core/pull/292) [`9e3fdff`](https://github.com/CrowdStrike/glide-core/commit/9e3fdff1152887e7b3d8a58211e545eff0cb9b93) Thanks [@clintcs](https://github.com/clintcs)! - - Dropdown no longer dispatches "change" or "input" events when an option is selected or deselected programmatically.

  - Dropdown no longer closes when Select All is clicked after an option is clicked.
  - Dropdown no longer deselects options on Enter or Space when single-select, matching its behavior on click.
  - Dropdown no longer dispatches "change" and "input" events when single-select and an already selected option is clicked.
  - Dropdown no longer immediately closes when initially open with an option selected.
  - Dropdown no longer dispatches "input" events on input when filtering.
  - Dropdown's `focus()` method accepts an `options` object.
  - Dropdown Option's `selected` and `value` properties are reflected.

- [#295](https://github.com/CrowdStrike/glide-core/pull/295) [`a69b0ed`](https://github.com/CrowdStrike/glide-core/commit/a69b0edd764ead711fc9a0caecf43c77cf2f5871) Thanks [@dylankcrwd](https://github.com/dylankcrwd)! - - Fixes incorrect values for `aria-controls` and `aria-labelledby` for `glide-core-tab` and `glide-core-tab-panel`, respectively

  - Tabbing to the tablist now lands only on the active tab.
  - `glide-core-tab-panel` is tabbable

- [#299](https://github.com/CrowdStrike/glide-core/pull/299) [`bd5c143`](https://github.com/CrowdStrike/glide-core/commit/bd5c143006b5cd311866fff99de1d2d7f738997b) Thanks [@clintcs](https://github.com/clintcs)! - - Dropdown now breaks out of Modal instead of expanding it.

  - Dropdown now closes when `open` and disabled and opens when `open` and enabled.
  - Dropdown now waits to open until its menu has been positioned, preventing a flicker in some cases.

- [#288](https://github.com/CrowdStrike/glide-core/pull/288) [`5828515`](https://github.com/CrowdStrike/glide-core/commit/58285156c08af07d126c3af280619f1ad612ce3a) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Updated Input to set itself as invalid when the `value` exceeds `maxlength`.

  Many accessibility enhancements to Input:

  - The invalid state is now announced to screenreaders.
  - The character count information is now announced to screenreaders in a more accessible format.
  - The clear button is added as a tab stop to clear the input value.

- [#280](https://github.com/CrowdStrike/glide-core/pull/280) [`ca0faec`](https://github.com/CrowdStrike/glide-core/commit/ca0faeccdd857f6a051ad92905e5f6d0db18d043) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Tooltip only appears when hovered for 300ms.

- [#309](https://github.com/CrowdStrike/glide-core/pull/309) [`ffc70d1`](https://github.com/CrowdStrike/glide-core/commit/ffc70d19d135b72ddfd5ac8063421c4833a4510c) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Multiple adjustments to Input were added:

  - Input now properly updates validity when set as `required` if `value` is updated programmatically.
  - Input now properly updates validity and its visual error state when `required` is removed programmatically.
  - The password toggle is now keyboard accessible.

- [#315](https://github.com/CrowdStrike/glide-core/pull/315) [`3bb3ffc`](https://github.com/CrowdStrike/glide-core/commit/3bb3ffca287124b705b9633ae7d3bc55fa9398d0) Thanks [@clintcs](https://github.com/clintcs)! - - Tooltip now supports an `offset` attribute for adjusting the space between the tooltip and its target.

  - Tooltip now supports an `open` attribute to force its visibility.
  - Dropdown now scrolls when it contains more than nine options.
  - Dropdown options now truncate with an ellipsis and tooltip when they exceed a certain width.

- [#314](https://github.com/CrowdStrike/glide-core/pull/314) [`2364551`](https://github.com/CrowdStrike/glide-core/commit/2364551a9698aa584c03d2956af11770a8413c9f) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Input now transitions its border-color to align with Textarea.

- [#317](https://github.com/CrowdStrike/glide-core/pull/317) [`1acb546`](https://github.com/CrowdStrike/glide-core/commit/1acb546275d4ef6a8d11b95d3c07025657fb6935) Thanks [@clintcs](https://github.com/clintcs)! - Dropdown's input field now expands to fill the available space.

- [#289](https://github.com/CrowdStrike/glide-core/pull/289) [`500ae69`](https://github.com/CrowdStrike/glide-core/commit/500ae69b80aa99975e532182415e017984f2b92e) Thanks [@clintcs](https://github.com/clintcs)! - - Button Group reacts to default slot changes.

  - Button Group's `label`, `orientation`, and `variant` are reflected.
  - Button Group Buttons are not misaligned when vertical with an icon.
  - Button Group Buttons have a `click()` method.
  - Button Group Button's `value` is reflected.

- [#303](https://github.com/CrowdStrike/glide-core/pull/303) [`9f1ad06`](https://github.com/CrowdStrike/glide-core/commit/9f1ad06e7f4bad2a9a4888b8b76a3f86fc2a6758) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Modal now properly respects the user's `prefers-reduced-motion` browser preference.

- [#316](https://github.com/CrowdStrike/glide-core/pull/316) [`9a53f3b`](https://github.com/CrowdStrike/glide-core/commit/9a53f3b1e4abd1a6e7db9f793f12330f47e8f4f3) Thanks [@clintcs](https://github.com/clintcs)! - - Dropdown's label and tooltip are now left-aligned instead of right-aligned when Dropdown is vertical.
  - Dropdown's button now maintains its minimum width instead of shrinking when Dropdown is width-constrained.
  - Form Controls Layout's columns no longer shrink when `split="middle"` when width-constrained.
  - Form Controls Layout's label column is now right-aligned instead of left-aligned.

## 0.8.0

### Minor Changes

- [#253](https://github.com/CrowdStrike/glide-core/pull/253) [`51f14b0`](https://github.com/CrowdStrike/glide-core/commit/51f14b0344f27e1caf518c66b36daeade47f3eb5) Thanks [@dylankcrwd](https://github.com/dylankcrwd)! - Adjustments were made to the Tab components to remove all existing variants in favor of a single design. Overflow buttons are added to `glide-core-tab-group` when the tabs overflow their container.

  See the example below.

  ```diff
  + <glide-core-tab-group>
  - <glide-core-tab-group variant="secondary">
  ```

- [#290](https://github.com/CrowdStrike/glide-core/pull/290) [`e2bf2ff`](https://github.com/CrowdStrike/glide-core/commit/e2bf2ff4d359666f9fe564faaf403a9ccec3e3b7) Thanks [@clintcs](https://github.com/clintcs)! - Dropdown doesn't dispatch events when `value` is changed programmatically.

### Patch Changes

- [#282](https://github.com/CrowdStrike/glide-core/pull/282) [`7441afb`](https://github.com/CrowdStrike/glide-core/commit/7441afbc9b24697105295ac1cdf9e20cb1d51e8f) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Checkbox's indeterminate state works with both light and dark modes.

- [#286](https://github.com/CrowdStrike/glide-core/pull/286) [`1ace9d0`](https://github.com/CrowdStrike/glide-core/commit/1ace9d08f229524b516ec64ad453a115959673f7) Thanks [@clintcs](https://github.com/clintcs)! - Checkbox no longer throws locally on render.

- [#290](https://github.com/CrowdStrike/glide-core/pull/290) [`e2bf2ff`](https://github.com/CrowdStrike/glide-core/commit/e2bf2ff4d359666f9fe564faaf403a9ccec3e3b7) Thanks [@clintcs](https://github.com/clintcs)! - Dropdown's `readonly` attribute is reflected.

## 0.7.0

### Minor Changes

- [#232](https://github.com/CrowdStrike/glide-core/pull/232) [`e7538c0`](https://github.com/CrowdStrike/glide-core/commit/e7538c0cd4db5f7d4c899a7b5d0c5a4a107da2f2) Thanks [@danwenzel](https://github.com/danwenzel)! - Change form elements to start validating on blur

### Patch Changes

- [#250](https://github.com/CrowdStrike/glide-core/pull/250) [`d76b8d3`](https://github.com/CrowdStrike/glide-core/commit/d76b8d3e56c1a3589f123623a3a5cd5b53516b97) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Adjusted the open and closing animations to use a cubic ease out timing function for Drawer to better align with designs.

- [#281](https://github.com/CrowdStrike/glide-core/pull/281) [`b06705c`](https://github.com/CrowdStrike/glide-core/commit/b06705c3c5695989bc1aaa3cf44d21f55671a0c8) Thanks [@clintcs](https://github.com/clintcs)! - Dropdown no longer steals focus when an option is selected.

- [#284](https://github.com/CrowdStrike/glide-core/pull/284) [`fb8ff76`](https://github.com/CrowdStrike/glide-core/commit/fb8ff76b8538f827da0ad9d3cab63a0273d5ae9b) Thanks [@danwenzel](https://github.com/danwenzel)! - 2 new attributes have been added to Tree Item:

  - Allow tree items without an expand icon to have that indentation removed via the `remove-indentation` attribute.
  - Added a `non-collapsible` attribute for tree item. For such tree items:
    - Child tree items remain expanded
    - Expand/collapse caret will not be shown
    - Clicking on the parent will select it

- [#283](https://github.com/CrowdStrike/glide-core/pull/283) [`b41d20d`](https://github.com/CrowdStrike/glide-core/commit/b41d20d2dff2dc62d591c95906d7179186a44da7) Thanks [@clintcs](https://github.com/clintcs)! - Dropdown now emits "change" and "input" events after `value` is changed programmatically.

## 0.6.5

### Patch Changes

- [#277](https://github.com/CrowdStrike/glide-core/pull/277) [`cc02368`](https://github.com/CrowdStrike/glide-core/commit/cc023682c63b3059991ee33a3b76fa54e0bb8952) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Updated the Icon Button secondary variant background color to be transparent.

## 0.6.4

### Patch Changes

- [#275](https://github.com/CrowdStrike/glide-core/pull/275) [`0ae63be`](https://github.com/CrowdStrike/glide-core/commit/0ae63be383389a6c25fdbccce297b40f0150100d) Thanks [@clintcs](https://github.com/clintcs)! - Prevent Form Controls Layout from throwing on rerender.

## 0.6.3

### Patch Changes

- [#243](https://github.com/CrowdStrike/glide-core/pull/243) [`c2ad82b`](https://github.com/CrowdStrike/glide-core/commit/c2ad82bd74fdb21faff7d4ae2e70b8c8250fe4f8) Thanks [@clintcs](https://github.com/clintcs)! - Remove the left margin on Button when a prefix icon is present to improve visual balancing.

- [#243](https://github.com/CrowdStrike/glide-core/pull/243) [`c2ad82b`](https://github.com/CrowdStrike/glide-core/commit/c2ad82bd74fdb21faff7d4ae2e70b8c8250fe4f8) Thanks [@clintcs](https://github.com/clintcs)! - Form control labels now truncate with an ellipsis when too long, and they show a tooltip when the truncated label is hovered.

- [#273](https://github.com/CrowdStrike/glide-core/pull/273) [`007e4ad`](https://github.com/CrowdStrike/glide-core/commit/007e4ad454874362e9d05412f20c84c3e3f2de5d) Thanks [@clintcs](https://github.com/clintcs)! - Menu no longer opens, showing an empty menu, when no options are provided.

- [#261](https://github.com/CrowdStrike/glide-core/pull/261) [`e6f5415`](https://github.com/CrowdStrike/glide-core/commit/e6f541501d51ac03006c0f0c018e891ff1db9a66) Thanks [@clintcs](https://github.com/clintcs)! - Menu no longer opens when its target is disabled programmatically.

- [#243](https://github.com/CrowdStrike/glide-core/pull/243) [`c2ad82b`](https://github.com/CrowdStrike/glide-core/commit/c2ad82bd74fdb21faff7d4ae2e70b8c8250fe4f8) Thanks [@clintcs](https://github.com/clintcs)! - Add a Form Controls Layout component.

  Form Controls Layout accepts any number of Glide Core form controls in its default slot.
  It supports a single attribute, `split`, whose value can be `"left"` or `"middle"`:

  - `"left"`, the default, puts the controls' labels into a one-third column and the controls themselves into a two-thirds column.
  - `"middle"` puts the controls' labels and controls into two equal-width columns.

  ```html
  <glide-core-form-controls-layout split="left">
    <glide-core-input label="Label" placeholder="Placeholder" />
    <glide-core-checkbox label="Label" />
  </glide-core-form-controls-layout>
  ```

- [#243](https://github.com/CrowdStrike/glide-core/pull/243) [`c2ad82b`](https://github.com/CrowdStrike/glide-core/commit/c2ad82bd74fdb21faff7d4ae2e70b8c8250fe4f8) Thanks [@clintcs](https://github.com/clintcs)! - Add a `disabled` attribute to Tooltip.

- [#243](https://github.com/CrowdStrike/glide-core/pull/243) [`c2ad82b`](https://github.com/CrowdStrike/glide-core/commit/c2ad82bd74fdb21faff7d4ae2e70b8c8250fe4f8) Thanks [@clintcs](https://github.com/clintcs)! - Prevent Checkbox's checkbox from shrinking when its summary wraps.

- [#270](https://github.com/CrowdStrike/glide-core/pull/270) [`16e5625`](https://github.com/CrowdStrike/glide-core/commit/16e5625dd0c90fed4b9b77ee020da8b31219a009) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Adjusted the padding of Dropdown to match Input and Textarea.

- [#269](https://github.com/CrowdStrike/glide-core/pull/269) [`281628c`](https://github.com/CrowdStrike/glide-core/commit/281628cf7dfd99fb63f9fa51f96cfaa5c0f35e59) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Updated the color value of `--glide-core-icon-display-light` for improved dark mode support. Increased the rounding value of `--glide-core-border-radius-round` which adjusted the Tag's border radius.

- [#272](https://github.com/CrowdStrike/glide-core/pull/272) [`86a012a`](https://github.com/CrowdStrike/glide-core/commit/86a012a10f16533faca022a26eed6d1d83484f45) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Added `position: relative` to the Split Container component so that the menu is properly positioned.

- [#271](https://github.com/CrowdStrike/glide-core/pull/271) [`8f1859d`](https://github.com/CrowdStrike/glide-core/commit/8f1859d52227747b92803a6de3ee97841eb35ce4) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Updated the set-containing-block export so that it can be imported properly by consumers.

  ```js
  import { setContainingBlock } from '@crowdstrike/glide-core/library/set-containing-block.js';
  ```

## 0.6.2

### Patch Changes

- [#267](https://github.com/CrowdStrike/glide-core/pull/267) [`b2c6e25`](https://github.com/CrowdStrike/glide-core/commit/b2c6e25c6e48cfe8fb0d516118bd8e204be28c2e) Thanks [@clintcs](https://github.com/clintcs)! - Dropdown no longer dispatches multiple "change" and "input" events when `value` is changed programmatically.

- [#266](https://github.com/CrowdStrike/glide-core/pull/266) [`a8c7aa7`](https://github.com/CrowdStrike/glide-core/commit/a8c7aa747c50a4ef762c6d0a2046c0b056af5b38) Thanks [@danwenzel](https://github.com/danwenzel)! - Allow setting the placement of tree item menu

- [#264](https://github.com/CrowdStrike/glide-core/pull/264) [`e2d5f7c`](https://github.com/CrowdStrike/glide-core/commit/e2d5f7c7eda7cb85acdce532193d804e533c0b71) Thanks [@clintcs](https://github.com/clintcs)! - Fix Menu options not responding to hover and closing without calling the target's click handler.

## 0.6.1

### Patch Changes

- [#262](https://github.com/CrowdStrike/glide-core/pull/262) [`8ec777a`](https://github.com/CrowdStrike/glide-core/commit/8ec777aadf45db94d7f644750f6782384638ff51) Thanks [@clintcs](https://github.com/clintcs)! - Prevent components from throwing `window.crypto.randomUUID is not a function` when they're served through HTTP instead of HTTPS.

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
