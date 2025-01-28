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

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-icon-button': GlideCoreIconButton;
  }
}

/**
 * @slot - An icon.
 */
@customElement('glide-core-icon-button')
@final
export default class GlideCoreIconButton extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
    mode: shadowRootMode,
  };

  static override styles = styles;

  @property({ attribute: 'aria-controls', reflect: true })
  ariaControls: string | null = null;

  @property({ attribute: 'aria-expanded', reflect: true })
  override ariaExpanded: 'true' | 'false' | null = null;

  @property({ attribute: 'aria-haspopup', reflect: true })
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

  @property()
  label = '';

  @property({ reflect: true })
  variant: 'primary' | 'secondary' | 'tertiary' = 'primary';

  @property({ reflect: true })
  readonly version = packageJson.version;

  override click() {
    this.#buttonElementRef.value?.click();
  }

  override render() {
    return html`
      <button
        aria-controls=${ifDefined(this.ariaControls ?? undefined)}
        aria-expanded=${ifDefined(this.ariaExpanded ?? undefined)}
        aria-haspopup=${ifDefined(this.ariaHasPopup ?? undefined)}
        aria-label=${this.label}
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
        <slot ${assertSlot()} ${ref(this.#defaultSlotElementRef)}></slot>
      </button>
    `;
  }

  #buttonElementRef = createRef<HTMLButtonElement>();

  #defaultSlotElementRef = createRef<HTMLSlotElement>();
}
