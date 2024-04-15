import { LitElement, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
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

  @property({ attribute: 'variant', reflect: true })
  variant: 'primary' | 'secondary' | 'tertiary' = 'primary';

  @property({ attribute: 'size', reflect: true })
  size: 'large' | 'small' = 'large';

  get form() {
    return this.#internals.form;
  }

  override render() {
    return html`<button
      class=${classMap({
        button: true,
        primary: this.variant === 'primary',
        secondary: this.variant === 'secondary',
        tertiary: this.variant === 'tertiary',
        large: this.size === 'large',
        small: this.size === 'small',
        'has-prefix': this.hasPrefixSlot,
        'has-suffix': this.hasSuffixSlot,
      })}
      type=${this.type}
      ?disabled=${this.disabled}
      @click=${this.#handleClick}
    >
      <slot
        name="prefix"
        @slotchange=${this.#onPrefixSlotChange}
        ${ref(this.#prefixSlotElement)}
      ></slot>
      <slot></slot>
      <slot
        name="suffix"
        @slotchange=${this.#onSuffixSlotChange}
        ${ref(this.#suffixSlotElement)}
      ></slot>
    </button>`;
  }

  constructor() {
    super();
    this.#internals = this.attachInternals();
  }

  @state()
  private hasPrefixSlot = false;

  @state()
  private hasSuffixSlot = false;

  #internals: ElementInternals;

  #prefixSlotElement = createRef<HTMLSlotElement>();

  #suffixSlotElement = createRef<HTMLSlotElement>();

  #handleClick() {
    if (this.type === 'button') {
      return;
    }

    if (this.type === 'submit') {
      this.form?.requestSubmit();
      return;
    }

    if (this.type === 'reset') {
      this.form?.reset();
      return;
    }
  }

  #onPrefixSlotChange() {
    const assignedNodes = this.#prefixSlotElement.value?.assignedNodes();

    this.hasPrefixSlot =
      assignedNodes && assignedNodes.length > 0 ? true : false;
  }

  #onSuffixSlotChange() {
    const assignedNodes = this.#suffixSlotElement.value?.assignedNodes();

    this.hasSuffixSlot =
      assignedNodes && assignedNodes.length > 0 ? true : false;
  }
}
