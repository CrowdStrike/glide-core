import './icon-button.js';
import './menu.js';
import './menu.options.js';
import { LitElement, html } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property } from 'lit/decorators.js';
import { owSlot, owSlotType } from './library/ow.js';
import GlideCoreMenuButton from './menu.button.js';
import GlideCoreMenuLink from './menu.link.js';
import styles from './tree.item.menu.styles.js';
import type { Placement } from '@floating-ui/dom';
import type GlideCoreMenu from './menu.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-tree-item-menu': GlideCoreTreeItemMenu;
  }
}

/**
 * @description A menu built into a tree item. Uses <glide-core-menu>
 *
 * @slot - One or more of <glide-core-menu-link> or <glide-core-menu-button>.
 * @slot target - A focusable element against which Menu will be positioned. Opens and closes Menu when interacted with.
 */
@customElement('glide-core-tree-item-menu')
export default class GlideCoreTreeItemMenu extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: 'closed',
  };

  static override styles = styles;

  @property({ reflect: true })
  placement: Placement = 'bottom-start';

  @property()
  label = '';

  override firstUpdated() {
    owSlot(this.#defaultSlotElementRef.value);

    owSlotType(this.#defaultSlotElementRef.value, [
      GlideCoreMenuButton,
      GlideCoreMenuLink,
    ]);
  }

  override render() {
    return html`
      <glide-core-menu
        class="component"
        placement=${this.placement}
        label=${this.label}
        ${ref(this.#menuElementRef)}
      >
        <glide-core-menu-options>
          <slot
            @slotchange=${this.#onDefaultSlotChange}
            ${ref(this.#defaultSlotElementRef)}
          ></slot>
        </glide-core-menu-options>

        <glide-core-icon-button slot="target" variant="tertiary">
          <!-- 3-dot -->
          <svg
            aria-hidden="true"
            width="4"
            height="14"
            viewBox="0 0 4 18"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              d="M2 15C2.55228 15 3 15.4477 3 16C3 16.5523 2.55228 17 2 17C1.44772 17 1 16.5523 1 16C1 15.4477 1.44772 15 2 15Z"
            />
            <path
              d="M2 8C2.55228 8 3 8.44772 3 9C3 9.55228 2.55228 10 2 10C1.44772 10 1 9.55228 1 9C1 8.44772 1.44772 8 2 8Z"
            />
            <path
              d="M2 1C2.55228 1 3 1.44772 3 2C3 2.55228 2.55228 3 2 3C1.44772 3 1 2.55228 1 2C1 1.44772 1.44772 1 2 1Z"
            />
          </svg>
        </glide-core-icon-button>
      </glide-core-menu>
    `;
  }

  #defaultSlotElementRef = createRef<HTMLSlotElement>();

  #menuElementRef = createRef<GlideCoreMenu>();

  #onDefaultSlotChange() {
    owSlot(this.#defaultSlotElementRef.value);

    owSlotType(this.#defaultSlotElementRef.value, [
      GlideCoreMenuButton,
      GlideCoreMenuLink,
    ]);
  }
}
