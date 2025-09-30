import './options.js';
import { html, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import packageJson from '../package.json' with { type: 'json' };
import Menu from './menu.js';
import chevronIcon from './icons/chevron.js';
import styles from './split-button.secondary-button.styles.js';
import assertSlot from './library/assert-slot.js';
import final from './library/final.js';
import required from './library/required.js';
import Option from './option.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-split-button-secondary-button': SplitButtonSecondaryButton;
  }
}

/**
 * @attr {string} label
 * @attr {boolean} [disabled=false]
 * @attr {boolean} [menu-open=false]
 * @attr {'bottom-end'|'top-end'} [menu-placement='bottom-end']
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {Option}
 */
@customElement('glide-core-split-button-secondary-button')
@final
export default class SplitButtonSecondaryButton extends LitElement {
  /* v8 ignore start */
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
    mode: window.navigator.webdriver ? 'open' : 'closed',
  };
  /* v8 ignore stop */

  static override styles = styles;

  @property({ reflect: true })
  @required
  label?: string;

  @property({ reflect: true, type: Boolean })
  disabled = false;

  @property({ attribute: 'menu-open', reflect: true, type: Boolean })
  menuOpen = false;

  @property({ attribute: 'menu-placement', reflect: true, useDefault: true })
  menuPlacement: 'bottom-end' | 'top-end' = 'bottom-end';

  @property({ type: Boolean })
  privateActive = false;

  @property()
  privateVariant: 'primary' | 'secondary' = 'primary';

  @property({ reflect: true })
  readonly version: string = packageJson.version;

  override click() {
    this.#buttonElementRef.value?.click();
  }

  override render() {
    return html`
      <glide-core-menu
        placement=${this.menuPlacement}
        ?open=${this.menuOpen}
        @toggle=${this.#onMenuToggle}
        ${ref(this.#menuElementRef)}
      >
        <button
          aria-label=${ifDefined(this.label)}
          class=${classMap({
            button: true,
            active: this.menuOpen,
            disabled: this.disabled,
            [this.privateVariant]: true,
          })}
          data-test="button"
          slot="target"
          type="button"
          ?disabled=${this.disabled}
          ${ref(this.#buttonElementRef)}
        >
          ${chevronIcon}
        </button>

        <glide-core-options>
          <slot ${assertSlot([Option])}>
            <!-- @type {Option} -->
          </slot>
        </glide-core-options>
      </glide-core-menu>
    `;
  }

  #buttonElementRef = createRef<HTMLButtonElement>();

  #menuElementRef = createRef<Menu>();

  #onMenuToggle(event: Event) {
    if (event.target instanceof Menu) {
      this.menuOpen = event.target.open;
    }
  }
}
