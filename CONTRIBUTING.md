# Contributing Guidelines

- [Overview](#overview)
- [Development setup](#development-setup)
- [Pull request expectations](#pull-request-expectations)
- [Forking the repository](#forking-the-repository)
- [Don't reference internal systems/issues/links](#dont-reference-internal-systemsissueslinks)
- [Versioning a package](#versioning-a-package)
- [Coding Guidelines](#coding-guidelines)
  - [Prefer encapsulation](#prefer-encapsulation)
    - [Avoid styling `:host`](#avoid-styling-host)
    - [Avoid exposing `part`s](#avoid-exposing-parts)
    - [Prefer JavaScript's `#` over TypeScript's `private`](#prefer-javascripts--over-typescripts-private)
    - [Prefer a closed shadow root](#prefer-a-closed-shadow-root)
    - [Prefer using a `ref` for querying a single element/node](#prefer-using-a-ref-for-querying-a-single-elementnode)
  - [Prefer `rem` values](#prefer-rem-values)
  - [Prefer throwing to letting invalid state propagate](#prefer-throwing-to-letting-invalid-state-propagate)
  - [Prefer CSS modifiers over BEM](#prefer-css-modifiers-over-bem)
  - [Prefer following native APIs](#prefer-following-native-apis)
  - [Prefer `padding-inline` and `padding-block`](#prefer-padding-inline-and-padding-block)
  - [Prefer separate test files](#prefer-separate-test-files)
  - [Typing property decorators](#typing-property-decorators)
- [Questions](#questions)
  - [What is `per-env`?](#what-is-per-env)

## Overview

The Glide Core repository is setup as a `pnpm` workspace, containing the following published packages:

- `packages/components` - Glide Design System components built with [Lit](https://lit.dev/)
- `packages/styles` - Glide Design System CSS

The root directory also contains the following directories that are not published as packages:

- `storybook` - Glide Design System Storybook instance for documenting everything in Glide Core

## Development setup

Follow the instructions outlined in the [README](./README.md) to setup your machine to develop in this repository.

## Pull request expectations

For a Pull Request to be approved and merged in the Glide Core repository, the following expectations must be met:

- The Pull Request must go through a Design Review prior to merging. Contact the owners of this repository for information on formally requesting a Design Review.
- The code must be as accessible as possible by using semantic HTML, `role` and `aria` attributes, and other accessibility techniques. Sometimes this requires the developer to research the best ways to make a component accessible. The [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/patterns/) is a great resource to start with. If you are not sure how to make a component accessible, reach out to the team - we'd be happy to help!
- PRs must include tests. If something cannot be tested, it should be documented as to why via code comments.
- New or updated functionality must be documented with Storybook.
- Static strings must be [localized](https://lit.dev/docs/localization/overview/).
- The PR must follow our established patterns under our [Coding Guidelines](#coding-guidelines). Anything that deviates from these patterns must be discussed with the team.

## Forking the repository

If you are a member of the CrowdStrike GitHub organization, you can create branches off of the `main` branch directly.
For those not in the CrowdStrike GitHub organization, you may [fork the repository](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo) and contribute as if you were contributing to any other open source project on GitHub.

## Don't reference internal systems/issues/links

When writing commit messages, providing Pull Request feedback, and creating Pull Request descriptions, one must take caution in what is written.
This content **cannot** contain references to internal systems, proprietary images or source code, or anything else that could harm CrowdStrike or any other organization or individual contributing to this repository.
Use common sense, but if you're unsure, please ask the team for guidance.

## Versioning a package

We use [changesets](https://github.com/changesets/changesets) to help manage releases.
If your PR adds or adjusts functionality in one of our packages, be sure to include a changeset with your Pull Request.
This can be completed by running the following at the root of the repository:

```bash
pnpm changeset
```

Select the packages that include changes and write a meaningful changeset description.
These descriptions are used to generate release notes to consumers, so be sure to be as descriptive and helpful as possible.
Please ensure we are following [semantic versioning](https://semver.org/) when selecting a version bump.

## Coding Guidelines

Below are guidelines that are difficult to enforce with ESLint and prettier.
These rules help us drive consistency; however, they can be tough to automate due to nuances with them.
Instead, we've opted to document our opinions here so that they can be referenced during Pull Request reviews.

### Prefer encapsulation

A major advantage of web components is that their internals can be encapsulated.
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
@customElement('cs-example')
export default class CsExample extends LitElement {
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
@customElement('cs-example')
export default class CsExample extends LitElement {
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
@customElement('cs-example')
export default class CsExample extends LitElement {
  @state()
  // OK to use `private` in TS here
  private open = false;
}
```

```ts
// ❌ -- BAD
@customElement('cs-example')
export default class CsExample extends LitElement {
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

protected createRenderRoot() {
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

@customElement('cs-example')
export default class CsExample extends LitElement {
  #buttonElement = createRef<HTMLButtonElement>();

  #onClick(Event: MouseEvent) {
    this.#buttonElement.value?.classList?.add('clicked');
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

@customElement('cs-example')
export default class CsExample extends LitElement {
  @query('button')
  #buttonElement!: HTMLButtonElement | undefined;

  #onClick(Event: MouseEvent) {
    this.#buttonElement?.classList?.add('clicked');
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

### Prefer `rem` values

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

### Prefer throwing to letting invalid state propagate

Invalid state let to propagate through a component is hard to discover and debug.
Throw as soon as you can—using `ow`, our assertion library.

When a slot is required, for example, use `owSlot` to assert the existence of slotted content.
You can also use `owSlotType` to assert the content type.

```ts
import ow, { owSlot, owSlotType } from './library/ow';

@customElement('cs-example')
export default class CsExample extends LitElement {
  override firstUpdated() {
    owSlot(this.#firstSlotElementRef.value);
    owSlotType(this.#secondSlotElementRef.value, [HTMLButtonElement]);
  }
}
```

For non-slot assertions, which should be rare, use the [default export](https://github.com/sindresorhus/ow) of `'./library/ow'`:

```ts
import ow from './library/ow';
```

### Prefer native conventions

Our components are built on the platform and the closer we can be with the platform, the fewer framework-isms we will add to our components.
Due to that, we should try to operate similar to the native components as much as possible.

Take for example the `open` attribute on a details element.

```ts
// ✅ -- GOOD
@customElement('cs-example')
export default class CsExample extends LitElement {
  // We use an `open` attribute to match the `open` attribute
  // found on the details element: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details#open
  // This is so our component API sticks to native as much as possible
  // so that there aren't any surprises when consumers use our components.
  @property({ type: Boolean, reflect: true }) open = false;

  override render() {
    return html`
      <details ?open=${this.open}>
        <summary>Details</summary>
        <div><slot></slot></div>
      </details>
    `;
  }
}
```

```ts
// ❌ -- BAD
@customElement('cs-example')
export default class CsExample extends LitElement {
  // We would not want to inject "frameworkisms" into our
  // component API by naming this property `is-open`.  It may
  // be more convenient, or we may write it this way in
  // frameworks; however, it would be a surprise to consumers
  // as it would deviate from the native API for the
  // details element.
  @property({ attribute: 'is-open', type: Boolean, reflect: true }) isOpen =
    false;

  override render() {
    return html`
      <details ?open=${this.isOpen}>
        <summary>Details</summary>
        <div><slot></slot></div>
      </details>
    `;
  }
}
```

### Prefer `padding-inline` and `padding-block`

For internationalization, we prefer using [`padding-inline-start`](https://developer.mozilla.org/en-US/docs/Web/CSS/padding-inline-start), [`padding-inline-end`](https://developer.mozilla.org/en-US/docs/Web/CSS/padding-inline-end), [`padding-block-start`](https://developer.mozilla.org/en-US/docs/Web/CSS/padding-block-start), and [`padding-block-end`](https://developer.mozilla.org/en-US/docs/Web/CSS/padding-block-end) over their left, right, top, and bottom counterparts.

```css
/* ✅ -- GOOD */
button {
  padding-inline: var(--cs-spacing-md);
  padding-block: var(--cs-spacing-xs);
}
```

```css
/* ❌ -- BAD */
button {
  padding-left: var(--cs-spacing-md);
  padding-right: var(--cs-spacing-md);
  padding-top: var(--cs-spacing-xs);
  padding-bottom: var(--cs-spacing-xs);
}
```

### Prefer separate test files

Due to our current file structure, we prefer using separate files for grouping related tests rather than using the `describe` block.
There's less mental overhead when you look at the file system and see the general idea for a group of tests rather than having to jump in a potentially massive test file and scroll through separate blocks.
Due to that, we prefer multiple files over `describe`.

```bash
# ✅ -- GOOD
components/
├─ src/
│  ├─ checkbox.test.basics.ts
│  ├─ checkbox.test.events.ts
│  ├─ checkbox.test.focus.ts
│  ├─ checkbox.test.form.ts
│  ├─ checkbox.test.states.ts
│  ├─ checkbox.test.validity.ts
```

```js
// ❌ -- BAD
describe('Checkbox Basics', () => {});
describe('Checkbox Events', () => {});
describe('Checkbox Focus', () => {});
describe('Checkbox Form', () => {});
describe('Checkbox Validity', () => {});
```

### Prefer prefixing event handlers with "on"

```ts
// ✅ -- GOOD
@customElement('cs-example')
export default class CsExample extends LitElement {
  #onClick(Event: MouseEvent) {
    console.log('clicked');
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
@customElement('cs-example')
export default class CsExample extends LitElement {
  // @click handler does not start with `on`
  #handleClick(Event: MouseEvent) {
    console.log('clicked');
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

#### Typing property [decorators](https://lit.dev/docs/api/decorators)

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

##### `@queryAll`

```ts
@queryAll('input')
inputElements!: NodeListOf<HTMLInputElement>
```

##### `@queryAssignedElements`

```ts
@queryAssignedElements()
assignedElements!: Array<HTMLElement>;
```

##### `@property`

```ts
@property()
label?: string;
```

> Unfortunately, properties that must be provided by the consumer must be typed as optional so they're typesafe throughout the component's lifecycle.

## Questions

### What is [`per-env`](https://github.com/ericclemmons/per-env)?

`per-env` handles switching between different `package.json` scripts based on `NODE_ENV`.
It helps clarify how different scripts are used in different contexts.
It also neatly abstracts away specific script names from CI configuration.

In general, think of `:development` scripts as either long-running (`--serve`, `--watch`) or mutative (`--fix`, `--write`) and `:production` scripts as neither of those things.
