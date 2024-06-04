import { LitElement, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property } from 'lit/decorators.js';
import { owSlot } from './library/ow.js';
import styles from './button.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'cs-button': CsButton;
  }
}

/**
 * @slot - A label for the contents of the button.
 * @slot prefix - An optional icon slot to display before the label.
 * @slot suffix - An optional icon slot to display after the label.
 */
@customElement('cs-button')
export default class CsButton extends LitElement {
  static formAssociated = true;

  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
    mode: 'closed',
  };

  static override styles = styles;

  @property({ reflect: true })
  override ariaExpanded: string | null = null;

  @property({ reflect: true })
  override ariaHasPopup: string | null = null;

  @property({ type: Boolean, reflect: true }) disabled = false;

  @property() type: 'button' | 'submit' | 'reset' = 'button';

  @property({ reflect: true })
  variant: 'primary' | 'secondary' | 'tertiary' = 'primary';

  @property({ reflect: true })
  size: 'large' | 'small' = 'large';

  get form() {
    return this.#internals.form;
  }

  override firstUpdated() {
    owSlot(this.#defaultSlotElementRef.value);
  }

  override render() {
    return html`<button
      class=${classMap({
        component: true,
        primary: this.variant === 'primary',
        secondary: this.variant === 'secondary',
        tertiary: this.variant === 'tertiary',
        large: this.size === 'large',
        small: this.size === 'small',
      })}
      type=${this.type}
      ?disabled=${this.disabled}
      @click=${this.#handleClick}
      @keydown=${this.#onKeydown}
    >
      <slot name="prefix"></slot>

      <slot
        @slotchange=${this.#onDefaultSlotChange}
        ${ref(this.#defaultSlotElementRef)}
      ></slot>

      <slot name="suffix"></slot>
    </button>`;
  }

  constructor() {
    super();
    this.#internals = this.attachInternals();
  }

  #defaultSlotElementRef = createRef<HTMLSlotElement>();

  #internals: ElementInternals;

  #handleClick() {
    if (this.type === 'button') {
      return;
    }

    if (this.type === 'submit') {
      this.form?.requestSubmit();
      return;
    }

    this.form?.reset();
    return;
  }

  #onDefaultSlotChange() {
    owSlot(this.#defaultSlotElementRef.value);
  }

  #onKeydown(event: KeyboardEvent) {
    if (['Enter'].includes(event.key)) {
      event.preventDefault();

      this.#handleClick();
    }
  }
}
