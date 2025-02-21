import './menu.js';
import './menu.options.js';
import { html, LitElement } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { when } from 'lit/directives/when.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import packageJson from '../package.json' with { type: 'json' };
import styles from './tree.item.menu.styles.js';
import GlideCoreIconButton from './icon-button.js';
import GlideCoreMenuLink from './menu.link.js';
import GlideCoreMenuButton from './menu.button.js';
import type GlideCoreMenu from './menu.js';
import assertSlot from './library/assert-slot.js';
import shadowRootMode from './library/shadow-root-mode.js';
import final from './library/final.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-tree-item-menu': GlideCoreTreeItemMenu;
  }
}

/**
 * @attr {string} [label]
 * @attr {'bottom-start'|'top-start'} [placement='bottom-start']
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {GlideCoreMenuButton | GlideCoreMenuLink}
 * @slot {Element} [icon]
 */
@customElement('glide-core-tree-item-menu')
@final
export default class GlideCoreTreeItemMenu extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: shadowRootMode,
  };

  static override styles = styles;

  @property({ reflect: true })
  placement: 'bottom-start' | 'top-start' = 'bottom-start';

  @property()
  label?: string;

  @property({ reflect: true })
  readonly version: string = packageJson.version;

  override click() {
    this.#iconButtonElementRef.value?.click();
  }

  override render() {
    return html`
      <glide-core-menu
        class="component"
        placement=${this.placement}
        ${ref(this.#menuElementRef)}
      >
        <glide-core-menu-options>
          <slot ${assertSlot([GlideCoreMenuButton, GlideCoreMenuLink])}>
            <!-- @type {GlideCoreMenuButton | GlideCoreMenuLink} -->
          </slot>
        </glide-core-menu-options>

        <glide-core-icon-button
          data-test="icon-button"
          slot="target"
          variant="tertiary"
          label=${ifDefined(this.label)}
          ${ref(this.#iconButtonElementRef)}
        >
          <slot
            name="icon"
            @slotchange=${this.#onIconSlotChange}
            ${ref(this.#iconSlotElementRef)}
          >
            <!-- @type {Element} -->
          </slot>

          ${when(!this.hasCustomIcon, () => icons.dots)}
        </glide-core-icon-button>
      </glide-core-menu>
    `;
  }

  @state()
  private hasCustomIcon = false;

  #iconButtonElementRef = createRef<GlideCoreIconButton>();

  #iconSlotElementRef = createRef<HTMLSlotElement>();

  #menuElementRef = createRef<GlideCoreMenu>();

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
