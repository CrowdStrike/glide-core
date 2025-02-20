import { html, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
import packageJson from '../package.json' with { type: 'json' };
import styles from './button.styles.js';
import shadowRootMode from './library/shadow-root-mode.js';
import final from './library/final.js';
import required from './library/required.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-button': GlideCoreButton;
  }
}

/**
 * @attr {string} label
 * @attr {boolean} [disabled=false]
 * @attr {string} [name='']
 * @attr {'large'|'small'} [size='large']
 * @attr {'button'|'submit'|'reset'} [type='button']
 * @attr {string} [value='']
 * @attr {'primary'|'secondary'|'tertiary'} [variant='primary']
 *
 * @readonly
 * @attr {0.19.5} [version]
 *
 * @slot {Element} [prefix-icon] - An icon before the label
 * @slot {Element} [suffix-icon] - An icon after the label
 *
 * @readonly
 * @prop {HTMLFormElement | null} form
 */
@customElement('glide-core-button')
@final
export default class GlideCoreButton extends LitElement {
  static formAssociated = true;

  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
    mode: shadowRootMode,
  };

  static override styles = styles;

  @property({ type: Boolean, reflect: true }) disabled = false;

  @property({ reflect: true })
  @required
  label?: string;

  @property({ reflect: true }) name = '';

  @property({ reflect: true })
  size: 'large' | 'small' = 'large';

  @property({ reflect: true })
  type: 'button' | 'submit' | 'reset' = 'button';

  @property({ reflect: true }) value = '';

  @property({ reflect: true })
  variant: 'primary' | 'secondary' | 'tertiary' = 'primary';

  @property({ reflect: true })
  readonly version = packageJson.version;

  get form(): HTMLFormElement | null {
    return this.#internals.form;
  }

  override click() {
    this.#buttonElementRef.value?.click();
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
      >
        <!--
          An icon before the label
          @type {Element}
        -->
      </slot>

      ${this.label}

      <slot
        name="suffix-icon"
        @slotchange=${this.#onSuffixIconSlotChange}
        ${ref(this.#suffixIconSlotElementRef)}
      >
        <!-- 
          An icon after the label  
          @type {Element}
        -->
      </slot>
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

  #onPrefixIconSlotChange() {
    const assignedNodes = this.#prefixIconSlotElementRef.value?.assignedNodes();
    this.hasPrefixIcon = Boolean(assignedNodes && assignedNodes.length > 0);
  }

  #onSuffixIconSlotChange() {
    const assignedNodes = this.#suffixIconSlotElementRef.value?.assignedNodes();
    this.hasSuffixIcon = Boolean(assignedNodes && assignedNodes.length > 0);
  }
}
