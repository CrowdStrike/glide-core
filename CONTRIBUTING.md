# Contributing

- [Development](#development)
  - [Forking the repository](#forking-the-repository)
  - [Don't reference internal systems, issues, or links](#dont-reference-internal-systems-issues-or-urls)
  - [Getting started](#getting-started)
  - [Adding a release note](#adding-a-release-note)
  - [Updating style variables](#updating-style-variables)
  - [Localization](#localization)
- [Documentation](#documentation)
  - [Components](#components)
- [Best practices](#best-practices)
  - [CSS](#css)
    - [Animate conditionally](#animate-conditionally)
    - [Avoid styling `:host`](#avoid-styling-host)
    - [Prefer `rem`](#prefer-rem)
    - [Styling a component's top-level element](#styling-a-components-top-level-element)
    - [Style slots directly](#style-slots-directly)
  - [JavaScript](#javascript)
    - [Avoid custom events](#avoid-custom-events)
    - [Avoid exposing `part`s](#avoid-exposing-parts)
    - [Avoid `@query` decorators](#avoid-query-decorators)
    - [Avoid side effects in setters](#avoid-side-effects-in-setters)
    - [Bubble and compose events](#bubble-and-compose-events)
    - [Close your shadow roots](#close-your-shadow-roots)
    - [Override and decorate inherited properties used in templates](#override-and-decorate-inherited-properties-used-in-templates)
    - [Prefer JavaScript's `#` over TypeScript's `private`](#prefer-javascripts--over-typescripts-private)
    - [Prefer native conventions](#prefer-native-conventions)
    - [Prefix event handlers with "on"](#prefix-event-handlers-with-on)
    - [Throw when required properties are missing](#throw-when-required-properties-are-missing)
    - [Throw when slotted content is missing or the wrong type](#throw-when-slotted-content-is-missing-or-the-wrong-type)
    - [Typing @property decorators](#typing-property-decorators)
  - [Testing](#testing)
    - [Separate your test files](#separate-your-test-files)
  - [Storybook](#storybook)
    - [Don't add controls for properties and methods inherited from `HTMLElement` or `Element`](#dont-add-controls-for-properties-and-methods-inherited-from-htmlelement-or-element)
    - [Only give required attributes a value](#only-give-required-attributes-a-value)
    - [Prefer controls over stories](#prefer-controls-over-stories)
    - [Proceed with caution when upgrading](#proceed-with-caution-when-upgrading)
- [Questions](#questions)
  - [What is `per-env`?](#what-is-per-env)

## Development

### Forking the repository

If you are a member of the CrowdStrike GitHub organization, you can branch off of `main`.
For those not in the organization, you can [fork](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo) this repository as you would any other open source project on GitHub.

### Don't reference internal systems, issues, or URLs

> [!WARNING]
> When writing commit messages, creating branch names, providing Pull Request feedback, and creating Pull Request descriptions, one must take caution in what is written.
> This content **cannot** contain references to internal systems, proprietary images or source code, or anything else that could harm CrowdStrike or any other organization or individual contributing to this repository.
> Use common sense. If you're unsure, please ask the team for guidance.

### Getting started

We use PNPM and recommend using [Corepack](https://pnpm.io/installation#using-corepack) to manage it.

```bash
pnpm install
pnpm start
```

If you have `ignore-scripts=true` in your `~/.npmrc`, also run `pnpm prepare` to install the Git hooks.

### Adding a release note

We use [Changesets](https://github.com/changesets/changesets) for release notes.
Include a changeset in your Pull Request if you made a change consumers should know about:

```bash
pnpm changeset
```

1. Select the type of change according to [Semantic Versioning](https://semver.org).
1. Add a concise but comprehensive description.

### Updating style variables

1. Generate a Figma [personal access token](https://help.figma.com/hc/en-us/articles/8085703771159-Manage-personal-access-tokens).
1. `FIGMA_TOKEN=<token> pnpm start:production:figma`

### Localization

Most of the strings our components render are provided by consumers and should be translated by them.
But we do have some internal strings, largely for screenreaders, that require translation.
To localize a string:

1. Update the type definition at [`src/library/localize.ts`](https://github.com/CrowdStrike/glide-core/blob/main/src/library/localize.ts) to include your new string.
1. Add the new string directly to [`src/translations/en.ts`](https://github.com/CrowdStrike/glide-core/blob/main/src/translations/en.ts). This is what will be used in code.
1. Add the new string in the JSON format to [`src/translations/en.json`](https://github.com/CrowdStrike/glide-core/blob/main/src/translations/en.json).
1. Copy the additions from `src/translations/en.ts` and `src/translations/en.json` to the other language files.

The non-English languages will fallback to English until they are translated.
The `src/translations/en.json` will be sent to our translation team and returned for each language we support.
When a new file is received from the translators, please update all `src/translations/*.json` and `src/translations/*.ts` files with the updated strings.

## Documentation

### Components

Each component has a JSDoc comment above it generated from the [elements manifest](https://github.com/CrowdStrike/glide-core/blob/main/custom-elements.json).
So no need to write one yourself.
It'll get overwritten when you run `pnpm start`.

If you need to get information into the comment—such as an attribute description—simply add a comment above the attribute:

```ts
/**
 * Description
 **/
@property({ reflect: true })
label?: string;
```

Similar for slots:

```html
<slot>
  <!-- Description -->
</slot>
```

If a slot is required, add a `@required` tag:

```html
<slot>
  <!--
    Description
    @required
  -->
</slot>
```

## Best practices

### CSS

#### Animate conditionally

The [`prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) media query is used to detect if a user wants to minimize inessential motion.
Our accessibility team recommends only enabling animations when the user has that setting turned off.

```css
/* ✅ — GOOD */
.animation {
  transform: translateX(100%);

  @media (prefers-reduced-motion: no-preference) {
    transition: transform 1s;
  }
}
```

```css
/* ❌ — BAD */
.animation {
  transform: translateX(100%);
  transition: transform 1s;
}
```

#### Avoid styling `:host`

Styling `:host` exposes styles to consumers—allowing internal styles to be overridden.
Style element classes directly instead:

```css
/* ✅ — GOOD */
.button {
  display: flex;
}
```

```css
/* ❌ — BAD */
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

#### Prefer `rem`

Use `rem` units for [better](https://www.joshwcomeau.com/css/surprising-truth-about-pixels-and-accessibility) accessibility except in certain cases—borders, box shadows, drop shadows, blurs.

```css
/* ✅ — GOOD */
button {
  min-width: 1rem;
}
```

```css
/* ❌ — BAD */
button {
  min-width: 16px;
}
```

#### Styling a component's top-level element

For the sake of consistency, style components' top-level elements using a `.component` class.

```ts
// ✅ — GOOD
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
// ❌ — BAD
css`
  .container {
    display: flex;
  }
`;

render() {
  return html`<div class="container"></div>`;
}
```

#### Style slots directly

Slots have a user agent style of `display: contents`.
But there's nothing wrong with styling them or changing their `display`—especially if the alternative is to create a wrapping element.

```html
<!-- ✅ — GOOD -->
<slot class="default-slot"></slot>
```

```html
<!-- ❌ — BAD -->
<div class="default-slot-container">
  <slot></slot>
</div>
```

### JavaScript

#### Avoid custom events

Custom events are often unncessary because the value of the event's `detail` property is available or can be made available elsewhere more naturally.

Before using a custom event, see if the value is already available externally via a component attribute.
Or, if the value is an element, consider simply dispatching the event from the element and letting consumers retrieve it from `event.target`.

#### Avoid exposing `part`s

[Parts](https://developer.mozilla.org/en-US/docs/Web/CSS/::part) expose tags within components to arbitrary styling by consumers.
We don't currently have a reason to allow arbitrary styling.
Until we do, use custom properties to allow only certain styles to be overridden.

```ts
// ✅ — GOOD
@customElement('glide-core-example')
export default class Component extends LitElement {
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
// ❌ — BAD
@customElement('glide-core-example')
export default class Component extends LitElement {
  override render() {
    return html` <button part="component">Button</button>`;
  }
}
```

#### Avoid `@query` decorators

Avoid `@query`, `@queryAll`, and the like.
We think [refs](https://lit.dev/docs/templates/directives/#ref) are more natural—especially for those coming from React.
And, [unlike](https://github.com/lit/lit/issues/4020#issuecomment-1743735312) decorators, refs can be made private.
So we can be sure they're only used internally.

When you can't use a ref because you need an element in a component's light DOM, use `this.querySelector` or `this.querySelectorAll`.
If you need elements from a specific slot, use [assignedElements()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLSlotElement/assignedElements).

#### Avoid side effects in setters

Side effects in setters aren't inherently bad.
They're sometimes the cleanest, most consistent, or only way to do something.
But more often they indicate a larger architectural issue that, when corrected, makes the side effect unnecessary.

One case where they're unavoidable is when you need to trigger an event after a consumer sets a property or attribute programmatically.
The `selected` setter in `dropdown.option.ts` is a good example.

#### Bubble and compose events

Bubbling is what consumers expect because most events bubble.
Bubbling also lets consumers use our components more flexibly by allowing [event delegation](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#event_delegation).
And composing events means events can bubble through nested shadow roots.

```ts
// ✅ — GOOD
this.dispatchEvent(new Event('selected', { bubbles: true, composed: true }));
```

```ts
// ❌ — BAD
this.dispatchEvent(new Event('selected');
```

#### Close your shadow roots

The shadow DOM prevents styles from leaking into components.
But programmatic access to a component's DOM—including its styles—is still allowed if its shadow root is open.

Our components extend `LitElement`, whose shadow root is open by default.
Use `shadowRootMode` to close their shadow roots while keeping them open in tests.
Opening shadow roots in tests facilitates querying elements and accessibility assertions.

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

#### Override and decorate inherited properties used in templates

Properties inherited from `Element` or `HTMLElement` aren't fully reactive.

When a consumer changes an inherited property, Lit handles reactivity via `attributeChangedCallback`.
But when one is changed internally—say, via a click handler—the change won't be reflected in the template.

Many components don't change inherited properties internally.
However, a subtle bug may emerge if a property is made to change after a component is initially written.
So it's best to always override and decorate (using `@property`) inherited properties used in templates.

#### Prefer JavaScript's `#` over TypeScript's `private`

TypeScript's `private` modifier [isn't going](https://github.com/microsoft/TypeScript/issues/31670#issuecomment-497370201) anywhere.
But there's little reason to use it now that JavaScript natively supports privacy via `#`.
Unlike TypeScript's `private`, JavaScript's `#` is private at runtime.

```ts
// ✅ — GOOD
#onInputChange() {}

override render() {
  return html`<input @change=${this.#onInputChange} />`;
}
```

```ts
// ❌ — BAD
private onInputChange() {}

override render() {
  return html`<input @change=${this.onInputChange} />`;
}
```

One exception is Lit's `@state()` decorator, which doesn't support JavaScript privacy.
So we have to use TypeScript's `private` keyword with it.

```ts
// ✅ — GOOD
@customElement('glide-core-example')
export default class Component extends LitElement {
  @state()
  private open = false;
}
```

```ts
// ❌ — BAD
@customElement('glide-core-example')
export default class Component extends LitElement {
  @state()
  #open = false;
}
```

#### Prefer native conventions

A native element is one is provided by the platform—such as `<input>`.
We are adding to this set of elements when we build Web Components.
We should thus try to follow conventions set by them—both for consistency and familiarity.

An example is attribute reflection.
Attributes should generally be reflected.
However, native form controls do not reflect attributes that serve as an initial value.

`<input>`, for example, does not reflect its `value` attributes:

```ts
// ✅ — GOOD
@property({ reflect: true })
label?: string;

@property()
value = '';
```

```ts
// ❌ — BAD
@property({ reflect: true })
label?: string

@property({ reflect: true })
value = '';
```

#### Prefix event handlers with "on"

```ts
// ✅ — GOOD
@customElement('glide-core-example')
export default class Component extends LitElement {
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
// ❌ — BAD
@customElement('glide-core-example')
export default class Component extends LitElement {
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

#### Throw when required properties are missing

Some properties are required for accessibility or because a component needs them to function.
When a property is required, use the `@required` decorator to assert it.

```ts
import required from './library/required.js';

@customElement('glide-core-example')
export default class Component extends LitElement {
  @property()
  @required
  label?: string;
}
```

#### Throw when slotted content is missing or the wrong type

Invalid state let to propagate through a component is hard to discover and debug.
When a slot is required, use the `assertSlot()` directive to assert the existence or type of slotted content—or both.

```ts
import assertSlot from './library/assert-slot.js';

@customElement('glide-core-example')
export default class Component extends LitElement {
  override render() {
    return html`<slot ${assertSlot([HTMLButtonElement])}></slot>`;
  }
}
```

#### Typing `@property` [decorators](https://lit.dev/docs/api/decorators)

We've enabled TypeScript's [`strict`](https://www.typescriptlang.org/tsconfig#strict) flag throughout the repository.
`strict` enables a handful of other flags, including [`strictPropertyInitialization`](https://www.typescriptlang.org/tsconfig#strictPropertyInitialization), which raises an error when a property is declared without a default value:

```bash
Property [...] has no initializer and is not definitely assigned in the constructor.ts(2564)
```

You'll most commonly see the error when you use one of Lit's property decorators.
It can be resolved using TypeScripts _non-null assertion operator_ (`!`).
However, to avoid a runtime error if the property is accessed before it's defined, make sure you correctly type it.
When in doubt, log the property to confirm its value before assigning it a type.

```ts
@property()
label?: string;
```

> Required properties must, unfortunately, be typed as optional so they're typesafe throughout the component's lifecycle.

### Storybook

#### Don't add controls for properties and methods inherited from `HTMLElement` or `Element`

Our components extend `LitElement`, which extends `HTMLElement`—which extends `Element`.

So our components can be assumed to implement properties and methods inherited from those classes.
Ideally, we'd document everything.
But Storybook's controls table would quickly become cluttered.
And adding and maintaining controls isn't free.

One exception is `addEventListener()`.
It's inherited.
But which events it supports isn't obvious.
Document `addEventListener()` if your component dispatches events that aren't universal—like `"change"`, `"input"`, or `"toggle"`.

Another is `value` with certain form controls.
People using Storybook often interact with a control and inspect its `value` using DevTools.
However, without a `value` on each Checkbox, for example, Checkbox Group's `value` will be an empty string, leading to confusion or a bug report.

If you're unsure where a property or method comes from, TypeScript's [Playground](https://www.typescriptlang.org/play) can help.
So can your editor and [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes).

#### Only give required attributes a value

It's useful to present components in their full form.
But we think there's more value in providing minimal code examples so consumers don't copy more than they need.
Only giving required attributes a value also gives us a simple rule to follow when writing stories.

#### Prefer controls over stories

We can't write a story for every state of a component.
Stories are costly to write and maintain—and too many of them clutters Storybook's sidebar.
So we have a simple rule, which is the only kind likely to be followed:
only write stories for component states that can't reasonably be changed via a control.

A story showing the use of an optional slot that requires specific markup is one example.
A story showing an error state triggered by a form submission is another.

#### Proceed with caution when upgrading

We [override](https://github.com/CrowdStrike/glide-core/blob/main/.storybook/overrides.css) a number of internal Storybook styles to improve Storybook's appearance.
Storybook, of course, [does not](https://storybook.js.org/docs/configure/user-interface/theming#css-escape-hatches) guarantee they won't break our overrides with a new release.
So be sure to verify and adjust the overrides as necessary when upgrading Storybook.
Don't forget dark mode.

### Testing

#### Separate your test files

Use separate files for grouping related tests rather than `describe` blocks.
There's less mental overhead when you look at the file system and see the general idea for a group of tests rather than having to jump in a potentially massive test file and scroll through separate blocks.

```bash
# ✅ — GOOD
src/
├─ checkbox.test.basics.ts
```

```js
// ❌ — BAD
describe('Checkbox Basics', () => {});
```

## Questions

### What is [`per-env`](https://github.com/ericclemmons/per-env)?

`per-env` handles switching between different `package.json` scripts based on `NODE_ENV`.
It helps clarify how different scripts are used in different contexts.
It also neatly abstracts away specific script names from CI configuration.

In general, think of `*:development:*` scripts as long-running (`--serve`, `--watch`) and mutative (`--fix`, `--write`) and `*:production:*` scripts as neither.

### Why are `assets` and `baseline-screenshots` protected branches on GitHub?

All of our code is deployed to a single Cloudflare R2 bucket.
Each branch is [deployed](https://github.com/CrowdStrike/glide-core/blob/main/.github/workflows/on-pull-request-opened-and-synchronize.yml#L126) to a directory based on the branch name.
And artifacts from our latest publish are [deployed](https://github.com/CrowdStrike/glide-core/blob/main/.github/workflows/on-merge-branch-changeset-release-main.yml#L95) to the top level of the bucket.
It's a simple setup.
But it means we can't have branch names that conflict and thus overwrite top-level directories that contain artifacts.
