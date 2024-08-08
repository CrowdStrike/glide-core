import { LitElement, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { owSlot } from './library/ow.js';
import styles from './button.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-button': GlideCoreButton;
  }
}

/**
 * @slot - A label for the contents of the button.
 * @slot prefix - An optional icon slot to display before the label.
 * @slot suffix - An optional icon slot to display after the label.
 */
@customElement('glide-core-button')
export default class GlideCoreButton extends LitElement {
  static formAssociated = true;

  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
    mode: 'closed',
  };

  static override styles = styles;

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

  @property({ attribute: 'aria-controls', reflect: true })
  ariaControls: string | null = null;

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
      aria-controls=${ifDefined(this.ariaControls ?? undefined)}
      aria-expanded=${ifDefined(this.ariaExpanded ?? undefined)}
      aria-haspopup=${ifDefined(this.ariaHasPopup ?? undefined)}
      class=${classMap({
        component: true,
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
      @keydown=${this.#onKeydown}
    >
      <slot
        name="prefix"
        @slotchange=${this.#onPrefixSlotChange}
        ${ref(this.#prefixSlotElementRef)}
      ></slot>

      <slot
        @slotchange=${this.#onDefaultSlotChange}
        ${ref(this.#defaultSlotElementRef)}
      ></slot>

      <slot
        name="suffix"
        @slotchange=${this.#onSuffixSlotChange}
        ${ref(this.#suffixSlotElementRef)}
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

  #defaultSlotElementRef = createRef<HTMLSlotElement>();

  #internals: ElementInternals;

  #prefixSlotElementRef = createRef<HTMLSlotElement>();

  #suffixSlotElementRef = createRef<HTMLSlotElement>();

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

  #onPrefixSlotChange() {
    const assignedNodes = this.#prefixSlotElementRef.value?.assignedNodes();

    this.hasPrefixSlot =
      assignedNodes && assignedNodes.length > 0 ? true : false;
  }

  #onSuffixSlotChange() {
    const assignedNodes = this.#suffixSlotElementRef.value?.assignedNodes();

    this.hasSuffixSlot =
      assignedNodes && assignedNodes.length > 0 ? true : false;
  }
}
