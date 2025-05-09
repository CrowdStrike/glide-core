import { html, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property } from 'lit/decorators.js';
import { nanoid } from 'nanoid';
import packageJson from '../package.json' with { type: 'json' };
import styles from './menu.button.styles.js';
import shadowRootMode from './library/shadow-root-mode.js';
import final from './library/final.js';
import required from './library/required.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-menu-button': MenuButton;
  }
}

/**
 * @attr {string} label
 * @attr {boolean} [disabled=false]
 *
 * @readonly
 * @attr {string} [id]
 *
 * @readonly
 * @attr {string} [role='menuitem']
 *
 * @readonly
 * @attr {number} [tabindex=-1]
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {Element} [icon]
 */
@customElement('glide-core-menu-button')
@final
export default class MenuButton extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: shadowRootMode,
  };

  static override styles = styles;

  @property({ reflect: true })
  @required
  label?: string;

  /**
   * @default false
   */
  @property({ reflect: true, type: Boolean })
  get disabled(): boolean {
    return this.#isDisabled;
  }

  set disabled(isDisabled: boolean) {
    this.#isDisabled = isDisabled;

    if (isDisabled && this.privateActive) {
      this.dispatchEvent(new Event('private-disabled', { bubbles: true }));
    }
  }

  // On the host instead of inside the shadow DOM so screenreaders can find it when
  // Menu uses it with `aria-activedescendant`.
  @property({ reflect: true })
  override readonly id: string = nanoid();

  // A button is considered active when it's interacted with via keyboard or
  // hovered. Private because it's only meant to be used internally and by Menu.
  @property({ type: Boolean })
  privateActive = false;

  @property({ reflect: true })
  override readonly role = 'menuitem';

  @property({ attribute: 'tabindex', reflect: true, type: Number })
  override readonly tabIndex = -1;

  @property({ reflect: true })
  readonly version: string = packageJson.version;

  override click() {
    this.#componentElementRef.value?.click();
  }

  override render() {
    return html`<button
      class=${classMap({
        component: true,
        active: this.privateActive,
        disabled: this.disabled,
      })}
      ?disabled=${this.disabled}
      data-test="component"
      type="button"
      ${ref(this.#componentElementRef)}
    >
      <slot name="icon">
        <!-- @type {Element} -->
      </slot>

      ${this.label}
    </button>`;
  }

  #componentElementRef = createRef<HTMLButtonElement>();

  #isDisabled = false;
}
