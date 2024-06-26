import './menu.js';
import { LitElement, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { owSlot, owSlotType } from './library/ow.js';
import styles from './split-button.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-split-link': GlideCoreSplitLink;
  }
}

/**
 * @description - A link to be used in the `main-action` slot of `glide-core-split-container`.
 *
 * @slot prefix - An optional icon slot to display before the label.
 * @slot - A label for the contents of the link.
 */
@customElement('glide-core-split-link')
export default class GlideCoreSplitLink extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
    mode: 'closed',
  };

  static override styles = styles;

  @property({ reflect: true })
  url?: string;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ reflect: true })
  variant: 'primary' | 'secondary' = 'primary';

  @property({ reflect: true })
  size: 'large' | 'small' = 'large';

  override firstUpdated() {
    owSlot(this.#defaultSlotElementRef.value);

    owSlotType(this.#defaultSlotElementRef.value, [Text]);
  }

  override render() {
    return html`<a
      href=${ifDefined(this.url)}
      class=${classMap({
        component: true,
        disabled: this.disabled,
        [this.variant]: true,
        [this.size]: true,
        'has-prefix': this.hasPrefixSlot,
      })}
      tabindex=${this.disabled ? -1 : 0}
      @keydown=${this.#onKeydownLink}
      data-test="split-link"
    >
      <slot
        name="prefix"
        @slotchange=${this.#onPrefixSlotChange}
        ${ref(this.#prefixSlotElementRef)}
        data-test="prefix-slot"
      ></slot>
      <slot
        @slotchange=${this.#onDefaultSlotChange}
        ${ref(this.#defaultSlotElementRef)}
        data-test="default-slot"
      ></slot>
    </a>`;
  }

  @state()
  private hasPrefixSlot = false;

  #defaultSlotElementRef = createRef<HTMLSlotElement>();

  #prefixSlotElementRef = createRef<HTMLSlotElement>();

  #onDefaultSlotChange() {
    owSlot(this.#defaultSlotElementRef.value);

    owSlotType(this.#defaultSlotElementRef.value, [Text]);
  }

  // Keydown event handler so that the link button behaves similar to `glide-core-split-button`
  #onKeydownLink(event: KeyboardEvent) {
    if (event.key === ' ' && this.url?.length) {
      window.open(this.url);
    }
  }

  #onPrefixSlotChange() {
    const assignedNodes = this.#prefixSlotElementRef.value?.assignedNodes();

    this.hasPrefixSlot =
      assignedNodes && assignedNodes.length > 0 ? true : false;
  }
}
