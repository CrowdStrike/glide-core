import { html, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property } from 'lit/decorators.js';
import { nanoid } from 'nanoid';
import packageJson from '../package.json' with { type: 'json' };
import { owSlot, owSlotType } from './library/ow.js';
import GlideCoreMenuButton from './menu.button.js';
import GlideCoreMenuLink from './menu.link.js';
import styles from './menu.options.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-menu-options': GlideCoreMenuOptions;
  }
}

// This component exists because Menu's target and its menu both need to be in
// the light DOM so ARIA attributes can be associated with the IDs they reference.
//
// Tooltip is in a similar situation but has no default slot. So we can simply take
// the value of its `label` attribute, pass it to Tooltip Container, then dump
// Tooltp Container into Tooltip's light DOM for consumers. We can't do the same
// for Menu because it necessarily has a default slot for Menu Buttons and Menu Links.
//
// One alternative solution is to require that consumers wrap their default slot content
// in any element. But doing so would be arguably more awkward than asking them to slot
// an element specifically for that purpose. It would also beget more questions, adding
// to our support load.

/**
 * @slot - One or more of `<glide-core-menu-button>` or `<glide-core-menu-link>`.
 */
@customElement('glide-core-menu-options')
export default class GlideCoreMenuOptions extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: 'closed',
  };

  static override styles = styles;

  @property({ attribute: 'aria-activedescendant', reflect: true })
  ariaActivedescendant = '';

  @property({ attribute: 'aria-labelledby', reflect: true })
  ariaLabelledby = '';

  @property()
  privateSize: 'small' | 'large' = 'large';

  @property({ reflect: true })
  readonly version = packageJson.version;

  override connectedCallback() {
    super.connectedCallback();

    // On the host instead of inside the shadow DOM so screenreaders can find this
    // ID when it's assigned to `aria-controls` by the target.
    this.id = this.#id;

    // These two are likewise on the host due to `aria-controls`. The controlled
    // element must be the one with `role="menu"` and has to be programmatically
    // focusable.
    this.role = 'menu';
    this.tabIndex = -1;
  }

  override firstUpdated() {
    owSlot(this.#slotElementRef.value);

    // `Text` is allowed so slotted content can be rendered asychronously. Think of
    // a case where the only slotted content is a `repeat` whose array is empty
    // at first then populated after a fetch.
    owSlotType(this.#slotElementRef.value, [
      GlideCoreMenuButton,
      GlideCoreMenuLink,
      Text,
    ]);
  }

  override render() {
    return html`<div
      class=${classMap({
        component: true,
        large: this.privateSize === 'large',
        small: this.privateSize === 'small',
      })}
      role="none"
    >
      <slot
        @slotchange=${this.#onSlotChange}
        ${ref(this.#slotElementRef)}
      ></slot>
    </div>`;
  }

  // Established here instead of in `connectedCallback` so the ID remains
  // constant even if this component is removed and re-added to the DOM.
  // If it's not constant, the target's `aria-controls` will immediately
  // point to a non-existent ID when this component is re-added. An edge case
  // for sure. But one we can protect against with little effort.
  #id = nanoid();

  #slotElementRef = createRef<HTMLSlotElement>();

  #onSlotChange() {
    owSlot(this.#slotElementRef.value);

    owSlotType(this.#slotElementRef.value, [
      GlideCoreMenuButton,
      GlideCoreMenuLink,
      Text,
    ]);

    this.dispatchEvent(new Event('private-slot-change', { bubbles: true }));
  }
}
