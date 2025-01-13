import { html, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { owSlot } from './library/ow.js';
import styles from './icon-button.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-icon-button': GlideCoreIconButton;
  }
}

/**
 * @slot - An icon.
 */
@customElement('glide-core-icon-button')
export default class GlideCoreIconButton extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
    mode: 'closed',
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

  override click() {
    this.#buttonElementRef.value?.click();
  }

  override firstUpdated() {
    owSlot(this.#defaultSlotElementRef.value);
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
        <slot
          @slotchange=${this.#onDefaultSlotChange}
          ${ref(this.#defaultSlotElementRef)}
        ></slot>
      </button>
    `;
  }

  #buttonElementRef = createRef<HTMLButtonElement>();

  #defaultSlotElementRef = createRef<HTMLSlotElement>();

  #onDefaultSlotChange() {
    owSlot(this.#defaultSlotElementRef.value);
  }
}
