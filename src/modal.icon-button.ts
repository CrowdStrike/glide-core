import './icon-button.js';
import { html, LitElement } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { owSlot } from './library/ow.js';
import styles from './modal.icon-button.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-modal-icon-button': GlideCoreModalIconButton;
  }
}

/**
 * @slot - The content of the button. Should only be an icon. The icon should also use the
 *         "label" attribute for accessibility.
 */
@customElement('glide-core-modal-icon-button')
export default class GlideCoreModalIconButton extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: 'closed',
  };

  static override styles = styles;

  @property()
  label? = '';

  override firstUpdated() {
    owSlot(this.#defaultSlotElementRef.value);
  }

  override render() {
    return html`
      <glide-core-icon-button label=${ifDefined(this.label)} variant="tertiary">
        <slot
          @slotchange=${this.#onDefaultSlotChange}
          ${ref(this.#defaultSlotElementRef)}
        ></slot>
      </glide-core-icon-button>
    `;
  }

  #defaultSlotElementRef = createRef<HTMLSlotElement>();

  #onDefaultSlotChange() {
    owSlot(this.#defaultSlotElementRef.value);
  }
}
