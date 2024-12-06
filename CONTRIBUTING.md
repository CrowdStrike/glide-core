# Contributing Guidelines

- [Development setup](#development-setup)
- [Forking the repository](#forking-the-repository)
- [Don't reference internal systems, issues, or links](#dont-reference-internal-systems-issues-or-links)
- [Versioning a package](#versioning-a-package)
- [Best practices](#best-practices)
  - [Proceed with caution when upgrading Storybook](#proceed-with-caution-when-upgrading-storybook)
  - [Prefer controls over stories](#prefer-controls-over-stories)
  - [Don't add Storybook controls for properties and methods inherited from `HTMLElement` or `Element`](#dont-add-storybook-controls-for-properties-and-methods-inherited-from-htmlelement-or-element)
  - [Only set required attributes in stories](#only-set-required-attributes-in-stories)
  - [Prefer encapsulation](#prefer-encapsulation)
    - [Avoid styling `:host`](#avoid-styling-host)
    - [Avoid exposing `part`s](#avoid-exposing-parts)
    - [Prefer JavaScript's `#` over TypeScript's `private`](#prefer-javascripts--over-typescripts-private)
    - [Prefer a closed shadow root](#prefer-a-closed-shadow-root)
    - [Prefer using a `ref` for querying a single element/node](#prefer-using-a-ref-for-querying-a-single-elementnode)
    - [Prefer using animations only when the user has no reduced motion preference](#prefer-using-animations-only-when-the-user-has-no-reduced-motion-preference)
  - [Prefer `rem`s](#prefer-rems)
  - [Prefer assertions to narrow types](#prefer-assertions-to-narrow-types)
  - [Prefer throwing to letting invalid state propagate](#prefer-throwing-to-letting-invalid-state-propagate)
  - [Prefer conventions set by built-in elements](#prefer-conventions-set-by-built-in-elements)
  - [Prefer separate test files](#prefer-separate-test-files)
  - [Typing property decorators](#typing-property-decorators)
  - [Avoid side effects in setters](#avoid-side-effects-in-setters)
  - [Prefer `.component` for the root element CSS selector](#prefer-component-for-the-root-element-css-selector)
  - [Bubble and compose events](#bubble-and-compose-events)
  - [Avoid custom events](#avoid-custom-events)
  - [Override and decorate inherited properties used in templates](#override-and-decorate-inherited-properties-used-in-templates)
  - [Translations and static strings](#translations-and-static-strings)
- [Questions](#questions)
  - [What is `per-env`?](#what-is-per-env)

## Development

Follow the instructions in [README](./README.md) to set up your machine for development.

## Forking the repository

If you are a member of the CrowdStrike GitHub organization, you can branch off of `main`.
For those not in the organization, you can [fork the repository](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo) and contribute as if you were contributing to any other open source project on GitHub.

## Don't reference internal systems, issues, or links

When writing commit messages, providing Pull Request feedback, and creating Pull Request descriptions, one must take caution in what is written.
This content **cannot** contain references to internal systems, proprietary images or source code, or anything else that could harm CrowdStrike or any other organization or individual contributing to this repository.
Use common sense. If you're unsure, please ask the team for guidance.

## Versioning a package

We use [changesets](https://github.com/changesets/changesets) to manage our release notes.
Include a changeset with your Pull Request if the change you made is one that consumers should know about:

```bash
pnpm changeset
```

You'll be prompted to select the type of change according to [Semantic Versioning](https://semver.org).
You'll also be prompted for a description.
Descriptions are used in our release notes for consumers.
So be sure to be as descriptive and helpful as possible.

## Best practices

### Proceed with caution when upgrading Storybook

We [override](https://github.com/CrowdStrike/glide-core/blob/main/.storybook/overrides.css) a number of internal Storybook styles to improve Storybook's presentation.
Storybook, of course, [does not](https://storybook.js.org/docs/configure/user-interface/theming#css-escape-hatches) guarantee they won't break our overrides with a new release.
So be sure to verify and adjust the overrides as necessary when upgrading Storybook.

### Prefer controls over stories

We can't write a story for every state of a component.
Stories are costly to write and maintain—and too many of them clutters the sidebar.
So we follow a simple rule, which is the only kind likely to be followed:
only write stories for component states that can't reasonably be changed via a control.

A story showing the use of an optional slot that requires specific markup is one example.
A story showing an error state triggered by a form submission is another.

### Don't add Storybook controls for properties and methods inherited from `HTMLElement` or `Element`

Our components extend `LitElement`, which extends `HTMLElement`—which extends `Element`.
So our components can be assumed to implement properties and methods inherited from those classes.
Ideally, we'd document everything.
But Storybook's controls table would quickly become cluttered.
And adding and maintaining controls isn't free.

One exception is `addEventListener()`.
It is inherited.
But which events it supports isn't obvious.
Document `addEventListener()` if your component dispatches events that aren't universal—like `"change"`, `"input"`, or `"toggle"`.

Another is `value` with certain form controls.
People using Storybook often interact with a control and inspect its `value` using DevTools.
However, without a `value` on each Checkbox, for example, Checkbox Group's `value` will be an empty string, leading to confusion or a bug report.

If you're unsure where a property or method comes from, TypeScript's [Playground](https://www.typescriptlang.org/play) can help.
So can your editor and [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes).

### Only set required attributes in stories

While it's useful to present components in their full form, we think there's more value in providing minimal code examples so consumers don't copy more code than they need.
Only giving required attributes a value also gives us a simple rule to follow when writing stories.

### Prefer encapsulation

A major advantage of Web Components is that their internals can be encapsulated.
This makes components less brittle.
It also reduces the degree to which consumers can meddle with component design and behavior.
Embrace encapsulation wherever you can.

#### Avoid styling `:host`

Styling `:host` exposes the styles to consumers—allowing internal styles to be overridden.
Due to that, we do not recommend styling `:host` in our components, but rather using CSS variables targeting the tag directly or using a class name.

```css
/* ✅ -- GOOD */
/* Target the button tag directly */
button {
  background-color: var(--button-background-color);
}

/* Or use a class name <button class="button" */
.button {
  background-color: var(--button-background-color);
}
```

```css
/* ❌ -- BAD */
/* Consumers can override via */
/* <cool-button style="background-color: red" which */
/* may not be your intention */
:host {
  background-color: #4095bf;
}
```

If you have styles or style variables that apply to the whole component, consider styling a containing element instead.
If your component doesn't have a single containing element, you can add one:

```ts
// checkbox.ts
render() {
  return html`<div class="component"></div>`
}
```

```ts
// checkbox.styles.ts
import { css } from 'lit';

export default css`
  .component {
  }
`;
```

#### Avoid exposing `part`s

[`Part`s](https://developer.mozilla.org/en-US/docs/Web/CSS/::part) expose areas of your UI that consumers can target with CSS, which allows them to customize it to their needs.
Presently, we have no use case for exposing a `part`.
Instead, we should stick with exposing styles via CSS variables until the need arises.

```ts
// ✅ -- GOOD
@customElement('glide-core-example')
export default class GlideCoreExample extends LitElement {
  static override styles = css`
    .summary {
      font-weight: var(--font-weight-bold);
    }
  `;

  override render() {
    return html`
      <details>
        <!-- We style the summary directly ourselves -->
        <summary class="summary">Details</summary>
        <div><slot></slot></div>
      </details>
    `;
  }
}
```

```ts
// ❌ -- BAD
@customElement('glide-core-example')
export default class GlideCoreExample extends LitElement {
  override render() {
    return html`
      <details>
        <!-- We do not want to expose a part -->
        <summary part="summary">Details</summary>
        <div><slot></slot></div>
      </details>
    `;
  }
}
```

#### Prefer JavaScript's `#` over TypeScript's `private`

TypeScript's `private` modifier [isn't going](https://github.com/microsoft/TypeScript/issues/31670#issuecomment-497370201) anywhere.
But there's little reason to use it now that JavaScript natively supports member privacy via `#`.
Unlike TypeScript's `private`, JavaScript's `#` is private at _runtime_.
Which means consumers won't be able to access properties and methods they shouldn't.

When building a component, think about which methods should be exposed to consumers.
If a method should not be exposed to a consumer, use JavaScript's `#`.

```ts
// ✅ -- GOOD
// In this example, `onInputChange` contains custom logic that is
// specific to Glide Core internally handling state within the
// component.
//
// We don't want consumers to be able to call
// `inputElement.onInputChange()` directly.
//
// Due to that, we should use JavaScript's private `#` instead.
#onInputChange(event: Event) {}

override render() {
  return html`<input @change=${this.#onInputChange} />`;
}
```

```ts
// ❌ -- BAD
// In this case, nothing stops a consumer who is using JavaScript
// from calling `inputElement.onInputChange()`.
//
// As mentioned above, the logic in `onInputChange` is
// for internal use only, so this would be an anti-pattern.
//
// We should instead use JavaScript's `#`.
private onInputChange(event: Event) {}

override render() {
  return html`<input @change=${this.onInputChange} />`;
}
```

The caveat to this is when using the `@state()` decorator in Lit.
In this particular case, we still need to use TypeScript's `private`.

```ts
// ✅ -- GOOD
@customElement('glide-core-example')
export default class GlideCoreExample extends LitElement {
  @state()
  // OK to use `private` in TS here
  private open = false;
}
```

```ts
// ❌ -- BAD
@customElement('glide-core-example')
export default class GlideCoreExample extends LitElement {
  @state()
  // This doesn't work!
  #open = false;
}
```

#### Prefer a [closed](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/mode) shadow root

The shadow DOM prevents styles from leaking into a component.
However, programmatic access to a component's DOM—including its styles—is still allowed if the component's shadow root is open.
Our components extend `LitElement`, whose shadow root is open by default.
We recommend closing it:

```ts
// component.ts
static shadowRootOptions: ShadowRootInit = {
  ...LitElement.shadowRootOptions,
  mode:'closed',
};
```

You can reopen the shadow root in tests if needed:

```ts
// test.ts
import Component from './component.js';
Component.shadowRootOptions.mode = 'open';
```

Closing the shadow root does mean that Lit will no longer attach it the host (`this`).
That's what we want.
But you may still need to access it from within your component.
If so, you can implement `createRenderRoot` and attach `shadowRoot` privately to the host:

```ts
// component.ts
#shadowRoot?: ShadowRoot;

override createRenderRoot() {
  this.#shadowRoot = super.createRenderRoot() as ShadowRoot;
  return this.#shadowRoot;
}
```

#### Prefer using a `ref` for querying a single element/node

When building components, sometimes you need a reference to an underlying element.
One may reach for [`query`](https://lit.dev/docs/api/decorators/#query); however, we believe [`ref`s](https://lit.dev/docs/templates/directives/#ref) are a bit more natural.

```ts
// ✅ -- GOOD
// Use a `ref` when accessing an element.
import { createRef, ref } from 'lit/directives/ref.js';

@customElement('glide-core-example')
export default class GlideCoreExample extends LitElement {
  #onClick(Event: MouseEvent) {
    console.log('click');
  }

  override render() {
    return html`
      <button @click=${this.#onClick} ${ref(this.#buttonElement)}>
        <slot></slot>
      </button>
    `;
  }
}
```

```ts
// ❌ -- BAD
// Don't use `query` when accessing a single element.
import { query } from 'lit/decorators.js';

@customElement('glide-core-example')
export default class GlideCoreExample extends LitElement {
  #onClick(Event: MouseEvent) {
    console.log('click');
  }

  override render() {
    return html`
      <button @click=${this.#onClick}>
        <slot></slot>
      </button>
    `;
  }
}
```

#### Prefer using animations only when the user has no reduced motion preference

The [`prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) media query is used to detect if a user has enabled a setting on their device to minimize non-essential motion.
Our accessibility team recommends only enabling animations when the user doesn't prefer reduced motion.

```css
/* ✅ -- GOOD */
.animation {
  background-color: purple;

  @media (prefers-reduced-motion: no-preference) {
    animation: pulse 1s linear infinite both;
  }
}
```

```css
/* ❌ -- BAD */
.animation {
  animation: pulse 1s linear infinite both;
  background-color: purple;
}
```

### Prefer `rem`s

When writing CSS, we prefer using `rem`s for [accessibility reasons](https://www.joshwcomeau.com/css/surprising-truth-about-pixels-and-accessibility/); however, there are some cases where `px` is preferred.
Cases where pixels are preferred include borders, box shadows, drop shadow values, blur values, etc.

```css
/* ✅ -- GOOD */
button {
  min-width: 2rem;
}
```

```css
/* ❌ -- BAD */
button {
  min-width: 32px;
}
```

### Prefer assertions to narrow types

Assert using `ow` to narrow instead of conditional when you're certain of a thing's type but nonetheless need to appease the typesystem.
The difference in readability is often minor as it is below.
But it can be significant when replacing big blocks wrapped in a conditional.

```ts
// ✅ -- GOOD
ow(this.#inputElementRef.value, ow.object.instanceOf(HTMLInputElement));
this.value = this.#inputElementRef.value.value;
this.dispatchEvent(new Event(event.type, event));
```

```ts
// ❌ -- BAD
if (this.#inputElementRef.value && event.target instanceof HTMLInputElement) {
  this.value = this.#inputElementRef.value?.value;
  this.dispatchEvent(new Event(event.type, event));
}
```

> Be sure to import `ow` from `./library/ow.js`, which exports a modified `ow` that only throws locally.

### Prefer throwing to letting invalid state propagate

Invalid state let to propagate through a component is hard to discover and debug.
Throw as soon as you can—using `ow`, our assertion library.

When a slot is required, for example, use `owSlot` to assert the existence of slotted content.
You can also use `owSlotType` to assert the content type.

```ts
import ow, { owSlot, owSlotType } from './library/ow';

@customElement('glide-core-example')
export default class GlideCoreExample extends LitElement {
  override firstUpdated() {
    owSlot(this.#defaultSlotElementRef.value);
    owSlotType(this.#defaultSlotElementRef.value, [HTMLButtonElement]);
  }

  override render() {
    return html`<slot @slotchange=${this.#onDefaultSlotChange}></slot>`;
  }

  #onDefaultSlotChange() {
    owSlot(this.#defaultSlotElementRef.value);
    owSlotType(this.#defaultSlotElementRef.value, [HTMLButtonElement]);
  }
}
```

For non-slot assertions, which should be rare, use the [default export](https://github.com/sindresorhus/ow) of `'./library/ow'`:

```ts
import ow from './library/ow';
```

### Prefer conventions set by built-in elements

A built-in element is one that is provided by the platform, such as `<input />`.
We are adding to this set of elements when we build Web Components.
We should thus try to follow conventions set by them—both for consistency and familiarity.

An example is attribute reflection.
Attributes should generally be reflected.
However, built-in form control elements do not reflect attributes that serve as an initial value.
`<input>`, for example, does not reflect its `value` attributes.

```ts
// ✅ -- GOOD
@property({ reflect: true })
label?: string

@property()
value?: string
```

```ts
// ❌ -- BAD
@property({ reflect: true })
label?: string

@property({ reflect: true })
value?: string
```

### Prefer separate test files

Due to our current file structure, we prefer using separate files for grouping related tests rather than using the `describe` block.
There's less mental overhead when you look at the file system and see the general idea for a group of tests rather than having to jump in a potentially massive test file and scroll through separate blocks.

```bash
# ✅ -- GOOD
src/
├─ checkbox.test.basics.ts
├─ checkbox.test.events.ts
├─ checkbox.test.focus.ts
├─ checkbox.test.form.ts
├─ checkbox.test.states.ts
├─ checkbox.test.validity.ts
```

```js
// ❌ -- BAD
describe('Checkbox Basics', () => {});
describe('Checkbox Events', () => {});
describe('Checkbox Focus', () => {});
describe('Checkbox Form', () => {});
describe('Checkbox States', () => {});
describe('Checkbox Validity', () => {});
```

### Prefer prefixing event handlers with "on"

```ts
// ✅ -- GOOD
@customElement('glide-core-example')
export default class GlideCoreExample extends LitElement {
  #onClick(Event: MouseEvent) {
    console.log('click');
  }

  override render() {
    return html`
      <button @click=${this.#onClick}>
        <slot></slot>
      </button>
    `;
  }
}
```

```ts
// ❌ -- BAD
@customElement('glide-core-example')
export default class GlideCoreExample extends LitElement {
  #handleClick(Event: MouseEvent) {
    console.log('click');
  }

  override render() {
    return html`
      <button @click=${this.#handleClick}>
        <slot></slot>
      </button>
    `;
  }
}
```

### Typing property [decorators](https://lit.dev/docs/api/decorators)

We've enabled TypeScript's [`strict`](https://www.typescriptlang.org/tsconfig#strict) flag throughout the repository.
`strict` enables a handful of other flags, including [`strictPropertyInitialization`](https://www.typescriptlang.org/tsconfig#strictPropertyInitialization), which raises an error when a property is declared without a default value:

```bash
Property [...] has no initializer and is not definitely assigned in the constructor.ts(2564)
```

You'll most commonly see the error when you use one of Lit's property decorators.
It can be resolved using TypeScripts _non-null assertion operator_ (`!`).
However, to avoid a runtime error if the property is accessed before it's defined, make sure you correctly type it.
When in doubt, log the property to confirm its value before assigning it a type.
A few examples of correctly typed decorators:

#### `@queryAll`

```ts
@queryAll('input')
inputElements!: NodeListOf<HTMLInputElement>
```

#### `@queryAssignedElements`

```ts
@queryAssignedElements()
assignedElements!: Array<HTMLElement>;
```

#### `@property`

```ts
@property()
label?: string;
```

> Required properties must, unfortunately, be typed as optional so they're typesafe throughout the component's lifecycle.

### Avoid side effects in setters

Side effects in setters aren't inherently bad.
They're sometimes the cleanest, most consistent, or only way to do something.
But more often they indicate a larger architectural issue that, when corrected, makes the side effect unnecessary.

One case where they're unavoidable is when you need to trigger an event after a consumer sets a property or attribute programmatically.
The `selected` setter in `dropdown.option.ts` is a good example.

### Prefer `.component` for the root element CSS selector

There are many ways to target the root element of a component in CSS; however, we recommend using the `component` class name.

```ts
// ✅ -- GOOD
css`
  .component {
    background-color: red;
  }
`;

render() {
  return html`<div class="component"></div>`;
}
```

```ts
// ❌ -- BAD
css`
  div {
    background-color: red;
  }
`;

render() {
  return html`<div></div>`;
}
```

### Bubble and compose events

Bubbling is what consumers expect because most events bubble.
Bubbling also lets consumers use our components more flexibly by allowing [event delegation](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#event_delegation).
And composing events means they can bubble through nested shadow roots.

```ts
// ✅ -- GOOD
this.dispatchEvent(new Event('selected', { bubbles: true, composed: true }));
```

```ts
// ❌ -- BAD
this.dispatchEvent(new Event('selected');
```

There are some exceptions such as Modal, whose "close" event doesn't bubble to match `<dialog>`.
When deciding to bubble, consider whether the native's equivalent event bubbles.
Same when composing them.
Native's "close" event isn't composed.
Neither is "change".

We're open to bubbling and composing any event if a use case presents itself.
But our starting point is to follow native.

### Avoid custom events

Custom events are often unncessary because the value of the event's `detail` property is available or can be made available elsewhere more naturally.

Before using a custom event, see if the value is already available externally via a component attribute.
Or, if the value is an element, consider simply dispatching the event from the element and letting consumers retrieve it from `event.target`.

### Override and decorate inherited properties used in templates

Properties inherited from `Element` or `HTMLElement` aren't fully reactive.

When a consumer changes an inherited property, Lit handles reactivity via `attributeChangedCallback`.
But when one is changed internally—say, via a click handler—the change won't be reflected in the template.

Many components don't change inherited properties internally.
However, if one is made to after the fact, it may result in a subtle bug.
So it's best to always override and decorate (using `@property`) inherited properties used in templates.

### Translations and static strings

Most of the text we render is provided by the consumer directly; however, we do have a few cases where we have static strings in place.
In particular, static strings are helpful for screenreaders so that our components can provide additional context for accessibility.

The process for adding static strings is as follows:

1. Update the type definition at [`src/library/localize.ts`](https://github.com/CrowdStrike/glide-core/blob/main/src/library/localize.ts) to include your new string.
2. Add the new string directly to [`src/translations/en.ts`](https://github.com/CrowdStrike/glide-core/blob/main/src/translations/en.ts). This is what will be used in code.
3. Add the new string in the JSON format to [`src/translations/en.json`](https://github.com/CrowdStrike/glide-core/blob/main/src/translations/en.json).
4. Copy the additions from `src/translations/en.ts` and `src/translations/en.json` to the other language files.

The non-English languages will fallback to English until they are translated.
The `src/translations/en.json` will be sent to our translation team and returned for each language we support.
When a new file is received from the translators, please update all `src/translations/*.json` and `src/translations/*.ts` files with the updated strings.

## Questions

### What is [`per-env`](https://github.com/ericclemmons/per-env)?

`per-env` handles switching between different `package.json` scripts based on `NODE_ENV`.
It helps clarify how different scripts are used in different contexts.
It also neatly abstracts away specific script names from CI configuration.

In general, think of `:development` scripts as either long-running (`--serve`, `--watch`) or mutative (`--fix`, `--write`) and `:production` scripts as neither of those things.
