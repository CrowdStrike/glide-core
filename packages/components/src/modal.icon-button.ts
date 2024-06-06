import './icon-button.js';
import { LitElement, html } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { owSlot } from './library/ow.js';
import styles from './modal.icon-button.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'cs-modal-icon-button': CsModalIconButton;
  }
}

/**
 * @description A Modal Icon Button. Should be used only in the "header-actions" slot of a Modal.
 *
 * @slot - The content of the button. Should only be a cs-icon. The icon should also leverage the
 *         "label" attribute for accessibility so that it is read to screenreaders.
 *
 * @example
 * <cs-modal-icon-button slot="header-actions">
 *   <!-- icon here -->
 * </cs-modal-icon-button>
 */
@customElement('cs-modal-icon-button')
export default class CsModalIconButton extends LitElement {
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
      <cs-icon-button label=${ifDefined(this.label)} variant="tertiary">
        <slot
          @slotchange=${this.#onDefaultSlotChange}
          ${ref(this.#defaultSlotElementRef)}
        ></slot>
      </cs-icon-button>
    `;
  }

  #defaultSlotElementRef = createRef<HTMLSlotElement>();

  #onDefaultSlotChange() {
    owSlot(this.#defaultSlotElementRef.value);
  }
}
