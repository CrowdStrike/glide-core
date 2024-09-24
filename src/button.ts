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
 * @slot - A label.
 * @slot prefix-icon - An optional icon before the label.
 * @slot suffix-icon - An optional icon after the label.
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

  @property({ type: Boolean, reflect: true }) override autofocus = false;

  @property({ type: Boolean, reflect: true }) disabled = false;

  @property({ attribute: 'formaction', reflect: true }) formAction = '';

  @property({ attribute: 'formenctype', reflect: true }) formEncType:
    | ''
    | 'application/x-www-form-urlencoded'
    | 'multipart/form-data'
    | 'text/plain' = '';

  @property({ attribute: 'formmethod', reflect: true }) formMethod:
    | ''
    | 'dialog'
    | 'get'
    | 'post' = '';

  @property({ attribute: 'formnovalidate', type: Boolean, reflect: true })
  formNoValidate = false;

  @property({ attribute: 'formtarget', reflect: true }) formTarget:
    | ''
    | '_blank'
    | '_parent'
    | '_self'
    | '_top' = '';

  @property({ reflect: true }) name = '';

  @property({ attribute: 'popovertarget', reflect: true })
  popoverTarget?: string;

  @property({ attribute: 'popovertargetaction', reflect: true })
  popoverTargetAction: '' | 'hide' | 'show' | 'toggle' = '';

  @property({ reflect: true })
  size: 'large' | 'small' = 'large';

  @property({ reflect: true }) type: 'button' | 'submit' | 'reset' = 'button';

  @property({ reflect: true }) value = '';

  @property({ reflect: true })
  variant: 'primary' | 'secondary' | 'tertiary' = 'primary';

  get form() {
    return this.#internals.form;
  }

  override click() {
    this.#buttonElementRef.value?.click();
  }

  override firstUpdated() {
    owSlot(this.#defaultSlotElementRef.value);
  }

  override render() {
    return html`<button
      aria-controls=${ifDefined(this.ariaControls ?? undefined)}
      aria-expanded=${ifDefined(this.ariaExpanded ?? undefined)}
      aria-haspopup=${ifDefined(this.ariaHasPopup ?? undefined)}
      ?autofocus=${this.autofocus}
      class=${classMap({
        component: true,
        primary: this.variant === 'primary',
        secondary: this.variant === 'secondary',
        tertiary: this.variant === 'tertiary',
        large: this.size === 'large',
        small: this.size === 'small',
        'prefix-icon': this.hasPrefixIcon,
        'suffix-icon': this.hasSuffixIcon,
      })}
      ?disabled=${this.disabled}
      @click=${this.#onClick}
      ${ref(this.#buttonElementRef)}
    >
      <slot
        name="prefix-icon"
        @slotchange=${this.#onPrefixIconSlotChange}
        ${ref(this.#prefixIconSlotElementRef)}
      ></slot>

      <slot
        @slotchange=${this.#onDefaultSlotChange}
        ${ref(this.#defaultSlotElementRef)}
      ></slot>

      <slot
        name="suffix-icon"
        @slotchange=${this.#onSuffixIconSlotChange}
        ${ref(this.#suffixIconSlotElementRef)}
      ></slot>
    </button>`;
  }

  constructor() {
    super();
    this.#internals = this.attachInternals();
  }

  @state()
  private hasPrefixIcon = false;

  @state()
  private hasSuffixIcon = false;

  #buttonElementRef = createRef<HTMLButtonElement>();

  #defaultSlotElementRef = createRef<HTMLSlotElement>();

  #internals: ElementInternals;

  #prefixIconSlotElementRef = createRef<HTMLSlotElement>();

  #suffixIconSlotElementRef = createRef<HTMLSlotElement>();

  #onClick() {
    if (this.type === 'submit') {
      this.form?.requestSubmit();
      return;
    }

    if (this.type === 'reset') {
      this.form?.reset();
      return;
    }
  }

  #onDefaultSlotChange() {
    owSlot(this.#defaultSlotElementRef.value);
  }

  #onPrefixIconSlotChange() {
    const assignedNodes = this.#prefixIconSlotElementRef.value?.assignedNodes();
    this.hasPrefixIcon = Boolean(assignedNodes && assignedNodes.length > 0);
  }

  #onSuffixIconSlotChange() {
    const assignedNodes = this.#suffixIconSlotElementRef.value?.assignedNodes();
    this.hasSuffixIcon = Boolean(assignedNodes && assignedNodes.length > 0);
  }
}
