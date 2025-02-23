# Contributing

- [Development](#development)
  - [Forking the repository](#forking-the-repository)
  - [Don't reference internal systems, issues, or links](#dont-reference-internal-systems-issues-or-links)
  - [Getting started](#getting-started)
  - [Adding a release note](#adding-a-release-note)
  - [Updating style variables](#updating-style-variables)
  - [Translations and static strings](#translations-and-static-strings)
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
    - [Avoid Lit's `@query` decorators](#avoid-lits-query-decorators)
    - [Prefer using animations only when the user has no reduced motion preference](#prefer-using-animations-only-when-the-user-has-no-reduced-motion-preference)
  - [Prefer `rem`s](#prefer-rems)
  - [Throw when slotted content is missing or the wrong type](#throw-when-slotted-content-is-missing-or-the-wrong-type)
  - [Throw when required properties are missing](#throw-when-required-properties-are-missing)
  - [Prefer conventions set by built-in elements](#prefer-conventions-set-by-built-in-elements)
  - [Prefer separate test files](#prefer-separate-test-files)
  - [Typing property decorators](#typing-property-decorators)
  - [Avoid side effects in setters](#avoid-side-effects-in-setters)
  - [Prefer `.component` for the root element CSS selector](#prefer-component-for-the-root-element-css-selector)
  - [Bubble and compose events](#bubble-and-compose-events)
  - [Avoid custom events](#avoid-custom-events)
  - [Override and decorate inherited properties used in templates](#override-and-decorate-inherited-properties-used-in-templates)
- [Questions](#questions)
  - [What is `per-env`?](#what-is-per-env)

## Development

### Forking the repository

If you are a member of the CrowdStrike GitHub organization, you can branch off of `main`.
For those not in the organization, you can [fork the repository](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo) and contribute as if you were contributing to any other open source project on GitHub.

### Don't reference internal systems, issues, or URLs

> [!WARNING]
> When writing commit messages, creating branch names, providing Pull Request feedback, and creating Pull Request descriptions, one must take caution in what is written.
> This content **cannot** contain references to internal systems, proprietary images or source code, or anything else that could harm CrowdStrike or any other organization or individual contributing to this repository.
> Use common sense. If you're unsure, please ask the team for guidance.

### Getting started

We recommend using [Corepack](https://pnpm.io/installation#using-corepack) to manage PNPM.

```bash
pnpm install
pnpm start
```

- If you have `ignore-scripts=true` in your `~/.npmrc`, also run `pnpm prepare` to install the Git hooks.

Read through the remainder of this document before opening a pull request.

### Adding a release note

We use [Changesets](https://github.com/changesets/changesets) for release notes.
Include one with your Pull Request if you made a change consumers should know about:

```bash
pnpm changeset
```

1. Select the type of change according to [Semantic Versioning](https://semver.org).
1. Add a concise but comprehensive description.

### Updating style variables

1. Generate a Figma [personal access token](https://help.figma.com/hc/en-us/articles/8085703771159-Manage-personal-access-tokens).
1. `FIGMA_TOKEN=<token> pnpm start:production:figma`

### Translations and static strings

Most of the text we render is provided by the consumer directly; however, we do have a few cases where we have static strings in place.
In particular, static strings are helpful for screenreaders so that our components can provide additional context for accessibility.

The process for adding static strings is as follows:

1. Update the type definition at [`src/library/localize.ts`](https://github.com/CrowdStrike/glide-core/blob/main/src/library/localize.ts) to include your new string.
1. Add the new string directly to [`src/translations/en.ts`](https://github.com/CrowdStrike/glide-core/blob/main/src/translations/en.ts). This is what will be used in code.
1. Add the new string in the JSON format to [`src/translations/en.json`](https://github.com/CrowdStrike/glide-core/blob/main/src/translations/en.json).
1. Copy the additions from `src/translations/en.ts` and `src/translations/en.json` to the other language files.

The non-English languages will fallback to English until they are translated.
The `src/translations/en.json` will be sent to our translation team and returned for each language we support.
When a new file is received from the translators, please update all `src/translations/*.json` and `src/translations/*.ts` files with the updated strings.

## Best practices

### Proceed with caution when upgrading Storybook

We [override](https://github.com/CrowdStrike/glide-core/blob/main/.storybook/overrides.css) a number of internal Storybook styles to improve Storybook's presentation.
Storybook, of course, [does not](https://storybook.js.org/docs/configure/user-interface/theming#css-escape-hatches) guarantee they won't break our overrides with a new release.
So be sure to verify and adjust the overrides as necessary when upgrading Storybook.
Don't forget dark mode.

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

Styling `:host` exposes styles to consumers—allowing internal styles to be overridden.
Style classes directly instead:

```css
/* ✅ -- GOOD */
.button {
  display: flex;
}
```

```css
/* ❌ -- BAD */
:host {
  display: flex;
}
```

If you have styles or style variables that apply to the whole component, consider styling a containing element instead.
If your component doesn't have a single containing element, simply add one:

```ts
// component.ts
render() {
  return html`<div class="component"></div>`
}
```

```ts
// component.styles.ts
import { css } from 'lit';

export default css`
  .component {
  }
`;
```

#### Avoid exposing `part`s

[Parts](https://developer.mozilla.org/en-US/docs/Web/CSS/::part) expose tags within components to arbitrary styling by consumers.
We don't currently have a reason to allow arbitrary styling.
Until we do, use custom properties to allow only certain styles to be overridden.

```ts
// ✅ -- GOOD
@customElement('glide-core-example')
export default class GlideCoreExample extends LitElement {
  static override styles = css`
    :host {
      --font-weight: 700;
    }

    .component {
      font-weight: var(--font-weight);
    }
  `;

  override render() {
    return html`<button class="component">Button</button>`;
  }
}
```

```ts
// ❌ -- BAD
@customElement('glide-core-example')
export default class GlideCoreExample extends LitElement {
  override render() {
    return html` <button part="component">Button</button>`;
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

The shadow DOM prevents styles from leaking into components.

However, programmatic access to a component's DOM—including its styles—is still allowed if its shadow root is open.
Our components extend `LitElement`, whose shadow root is open by default.
Use `shadowRootMode` to close shadow roots except in tests.
Opening the shadow root in tests facilitates querying elements and accessibility assertions:

```ts
import shadowRootMode from './src/library/shadow-root-mode.ts';

static shadowRootOptions: ShadowRootInit = {
  ...LitElement.shadowRootOptions,
  mode: shadowRootMode,
};
```

Closing the shadow root does mean that Lit will no longer attach it the host (`this`).
That's what we want.
But you may need to access it from within your component.
If so, you can implement `createRenderRoot` and attach `shadowRoot` privately to the host:

```ts
#shadowRoot?: ShadowRoot;

override createRenderRoot() {
  this.#shadowRoot = super.createRenderRoot() as ShadowRoot;
  return this.#shadowRoot;
}
```

#### Avoid Lit's `@query` decorators

Avoid `@query`, `@queryAll`, and the like.
We think [refs](https://lit.dev/docs/templates/directives/#ref) are more natural—especially for those coming from React.
And, [unlike](https://github.com/lit/lit/issues/4020#issuecomment-1743735312) decorators, refs can be made private.
So we can be sure they're only used internally.

When you can't use a ref because you need an element in a component's light DOM, use `this.querySelector` or `this.querySelectorAll`.
If you need elements from a specific slot, use [assignedElements()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLSlotElement/assignedElements).

#### Prefer using animations only when the user has no reduced motion preference

The [`prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) media query is used to detect if a user has enabled a setting on their device to minimize inessential motion.
Our accessibility team recommends only enabling animations when the user has that setting turned off.

```css
/* ✅ -- GOOD */
.animation {
  transform: translateX(100%);

  @media (prefers-reduced-motion: no-preference) {
    transition: transform 1s;
  }
}
```

```css
/* ❌ -- BAD */
.animation {
  transform: translateX(100%);
  transition: transform 1s;
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

### Throw when slotted content is missing or the wrong type

Invalid state let to propagate through a component is hard to discover and debug.
When a slot is required, use the `assertSlot()` directive to assert the existence or type of slotted content—or both.

```ts
import assertSlot from './library/assert-slot.js';

@customElement('glide-core-example')
export default class GlideCoreExample extends LitElement {
  override render() {
    return html`<slot ${assertSlot([HTMLButtonElement])}></slot>`;
  }
}
```

### Throw when required properties are missing

Some properties are required for accessibility or ensure proper functionality.
When a property is required, use the `@required` decorator to assert its existence.

```ts
import required from './library/required.js';

@customElement('glide-core-example')
export default class GlideCoreExample extends LitElement {
  @property()
  @required
  name: string;
}
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
label?: string;

@property()
value = '';
```

```ts
// ❌ -- BAD
@property({ reflect: true })
label?: string

@property({ reflect: true })
value = '';
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
    display: flex;
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
    display: flex;
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

## Questions

### What is [`per-env`](https://github.com/ericclemmons/per-env)?

`per-env` handles switching between different `package.json` scripts based on `NODE_ENV`.
It helps clarify how different scripts are used in different contexts.
It also neatly abstracts away specific script names from CI configuration.

In general, think of `*:development:*` scripts as long-running (`--serve`, `--watch`) and mutative (`--fix`, `--write`) and `*:production:*` scripts as neither.
