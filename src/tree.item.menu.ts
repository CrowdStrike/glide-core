import './icon-button.js';
import './menu.js';
import './menu.options.js';
import { LitElement, html } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { when } from 'lit/directives/when.js';
import GlideCoreIconButton from './icon-button.js';
import GlideCoreMenuButton from './menu.button.js';
import GlideCoreMenuLink from './menu.link.js';
import ow, { owSlot, owSlotType } from './library/ow.js';
import styles from './tree.item.menu.styles.js';
import type { Placement } from '@floating-ui/dom';
import type GlideCoreMenu from './menu.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-tree-item-menu': GlideCoreTreeItemMenu;
  }
}

/**
 * @slot - One or more of `<glide-core-menu-button>` or `<glide-core-menu-link>`.
 * @slot icon - An icon.
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

  override click() {
    ow(
      this.#iconButtonElementRef.value,
      ow.object.instanceOf(GlideCoreIconButton),
    );

    this.#iconButtonElementRef.value.click();
  }

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
        ${ref(this.#menuElementRef)}
      >
        <glide-core-menu-options>
          <slot
            @slotchange=${this.#onDefaultSlotChange}
            ${ref(this.#defaultSlotElementRef)}
          ></slot>
        </glide-core-menu-options>

        <glide-core-icon-button
          data-test="icon-button"
          slot="target"
          variant="tertiary"
          label=${this.label}
          ${ref(this.#iconButtonElementRef)}
        >
          <slot
            name="icon"
            @slotchange=${this.#onIconSlotChange}
            ${ref(this.#iconSlotElementRef)}
          ></slot>

          ${when(!this.hasCustomIcon, () => icons.dots)}
        </glide-core-icon-button>
      </glide-core-menu>
    `;
  }

  @state()
  private hasCustomIcon = false;

  #defaultSlotElementRef = createRef<HTMLSlotElement>();

  #iconButtonElementRef = createRef<GlideCoreIconButton>();

  #iconSlotElementRef = createRef<HTMLSlotElement>();

  #menuElementRef = createRef<GlideCoreMenu>();

  #onDefaultSlotChange() {
    owSlot(this.#defaultSlotElementRef.value);

    owSlotType(this.#defaultSlotElementRef.value, [
      GlideCoreMenuButton,
      GlideCoreMenuLink,
    ]);
  }

  #onIconSlotChange() {
    const assignedNodes = this.#iconSlotElementRef.value?.assignedNodes();
    this.hasCustomIcon = Boolean(assignedNodes && assignedNodes.length > 0);
  }
}

const icons = {
  dots: html`
    <svg
      aria-hidden="true"
      style=${styleMap({
        height: '0.875rem',
        width: '0.25rem',
      })}
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
  `,
};
