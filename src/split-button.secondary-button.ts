import './menu.options.js';
import { html, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import packageJson from '../package.json' with { type: 'json' };
import Menu from './menu.js';
import MenuButton from './menu.button.js';
import MenuLink from './menu.link.js';
import chevronIcon from './icons/chevron.js';
import styles from './split-button.secondary-button.styles.js';
import assertSlot from './library/assert-slot.js';
import shadowRootMode from './library/shadow-root-mode.js';
import final from './library/final.js';
import required from './library/required.js';

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
 * @slot {MenuButton | MenuLink}
 */
@customElement('glide-core-split-button-secondary-button')
@final
export default class SplitButtonSecondaryButton extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
    mode: shadowRootMode,
  };

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

  override firstUpdated() {
    // A "click" handler on Menu would suffice for checking Menu's `open` property
    // and synchronizing it with `menuOpen` if Menu didn't close itself on `document`
    // click and when focus is lost.
    //
    // Thus an observer. Which only assumes that `open` is reflected and doesn't
    // depend on knowledge of Menu's internals.
    const observer = new MutationObserver(() => {
      if (this.#menuElementRef.value) {
        this.menuOpen = this.#menuElementRef.value.open;
      }
    });

    if (this.#menuElementRef.value) {
      observer.observe(this.#menuElementRef.value, {
        attributes: true,
        attributeFilter: ['open'],
      });
    }
  }

  override render() {
    return html`
      <glide-core-menu
        placement=${this.menuPlacement}
        ?open=${this.menuOpen}
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

        <glide-core-menu-options>
          <slot ${assertSlot([MenuButton, MenuLink])}>
            <!-- @type {MenuButton | MenuLink} -->
          </slot>
        </glide-core-menu-options>
      </glide-core-menu>
    `;
  }

  #buttonElementRef = createRef<HTMLButtonElement>();

  #menuElementRef = createRef<Menu>();
}
