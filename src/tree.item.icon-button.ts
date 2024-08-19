import './icon-button.js';
import { LitElement, html } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement } from 'lit/decorators.js';
import { owSlot } from './library/ow.js';
import styles from './tree.item.icon-button.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-tree-item-icon-button': GlideCoreTreeItemIconButton;
  }
}

/**
 * @description An icon button that can be used inside of a tree item.
 * Provides correct color styling based on tree item state
 *
 * @slot - Reserved for the icon to display inside of the button.
 */
@customElement('glide-core-tree-item-icon-button')
export default class GlideCoreTreeItemIconButton extends LitElement {
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
      <glide-core-icon-button
        class="component"
        variant="tertiary"
        tabindex="-1"
      >
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
