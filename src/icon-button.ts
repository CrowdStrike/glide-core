import { html, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import packageJson from '../package.json' with { type: 'json' };
import styles from './icon-button.styles.js';
import assertSlot from './library/assert-slot.js';
import shadowRootMode from './library/shadow-root-mode.js';
import final from './library/final.js';
import required from './library/required.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-icon-button': IconButton;
  }
}

/**
 * @attr {string} label - For screenreaders
 * @attr {string|null} [aria-controls=null]
 * @attr {string|null} [aria-description=null]
 * @attr {'true'|'false'|null} [aria-expanded=null]
 * @attr {'true'|'false'|'menu'|'listbox'|'tree'|'grid'|'dialog'|null} [aria-haspopup=null]
 * @attr {boolean} [disabled=false]
 * @attr {'primary'|'secondary'|'tertiary'} [variant='primary']
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {Element} - An icon
 */
@customElement('glide-core-icon-button')
@final
export default class IconButton extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
    mode: shadowRootMode,
  };

  static override styles = styles;

  /**
   * For screenreaders
   **/
  @property({ reflect: true })
  @required
  label?: string;

  @property({ attribute: 'aria-controls', reflect: true, useDefault: true })
  ariaControls: string | null = null;

  // A getter and setter because Lit Analzyer doesn't recognize "aria-description"
  // as a valid attribute on the `<button>` and doesn't provide a way to selectively
  // disable rules.
  /**
   * @default null
   */
  @property({ attribute: 'aria-description', reflect: true })
  override get ariaDescription(): string | null {
    return this.#ariaDescription;
  }

  override set ariaDescription(description: string | null) {
    this.#ariaDescription = description;

    if (this.#buttonElementRef.value) {
      this.#buttonElementRef.value.ariaDescription = description;
    }
  }

  @property({ attribute: 'aria-expanded', reflect: true, useDefault: true })
  override ariaExpanded: 'true' | 'false' | null = null;

  @property({ attribute: 'aria-haspopup', reflect: true, useDefault: true })
  override ariaHasPopup:
    | 'true'
    | 'false'
    | 'menu'
    | 'listbox'
    | 'tree'
    | 'grid'
    | 'dialog'
    | null = null;

  @property({ type: Boolean, reflect: true }) disabled = false;

  @property({ reflect: true, useDefault: true })
  variant: 'primary' | 'secondary' | 'tertiary' = 'primary';

  @property({ reflect: true })
  readonly version: string = packageJson.version;

  override click() {
    this.#buttonElementRef.value?.click();
  }

  override firstUpdated() {
    if (this.#buttonElementRef.value && this.ariaDescription) {
      this.#buttonElementRef.value.ariaDescription = this.ariaDescription;
    }
  }

  override render() {
    return html`
      <button
        aria-controls=${ifDefined(this.ariaControls ?? undefined)}
        aria-expanded=${ifDefined(this.ariaExpanded ?? undefined)}
        aria-haspopup=${ifDefined(this.ariaHasPopup ?? undefined)}
        aria-label=${ifDefined(this.label)}
        class=${classMap({
          component: true,
          primary: this.variant === 'primary',
          secondary: this.variant === 'secondary',
          tertiary: this.variant === 'tertiary',
        })}
        data-test="button"
        type="button"
        ?disabled=${this.disabled}
        ${ref(this.#buttonElementRef)}
      >
        <slot
          class="default-slot"
          ${assertSlot()}
          ${ref(this.#defaultSlotElementRef)}
        >
          <!--
            An icon
            @required
            @type {Element}
          -->
        </slot>
      </button>
    `;
  }

  #ariaDescription: string | null = null;

  #buttonElementRef = createRef<HTMLButtonElement>();

  #defaultSlotElementRef = createRef<HTMLSlotElement>();
}
