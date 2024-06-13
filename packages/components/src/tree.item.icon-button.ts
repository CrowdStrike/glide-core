import './icon-button.js';
import { LitElement, html } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement } from 'lit/decorators.js';
import { owSlot } from './library/ow.js';
import styles from './tree.item.icon-button.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'cs-tree-item-icon-button': CsTreeItemIconButton;
  }
}

/**
 * @description An icon button that can be used inside of a tree item.
 * Provides correct color styling based on tree item state
 *
 * @slot - Reserved for the icon to display inside of the button.
 */
@customElement('cs-tree-item-icon-button')
export default class CsTreeItemIconButton extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: 'closed',
  };

  static override styles = styles;

  override firstUpdated() {
    owSlot(this.#defaultSlotElementRef.value);
  }

  override render() {
    return html`
      <cs-icon-button class="component" variant="tertiary">
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
