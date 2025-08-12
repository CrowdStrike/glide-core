import './tooltip.js';
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
    'glide-core-button': Button;
  }
}

/**
 * @attr {string} label
 * @attr {string|null} [aria-description=null]
 * @attr {boolean} [disabled=false]
 * @attr {string} [name='']
 * @attr {'large'|'small'} [size='large']
 * @attr {string} [tooltip]
 * @attr {'button'|'submit'|'reset'} [type='button']
 * @attr {string} [value='']
 * @attr {'primary'|'secondary'|'tertiary'|'link'} [variant='primary']
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {Element} [prefix-icon] - An icon before the label
 * @slot {Element} [suffix-icon] - An icon after the label
 *
 * @readonly
 * @prop {HTMLFormElement | null} form
 */
@customElement('glide-core-button')
@final
export default class Button extends LitElement {
  static formAssociated = true;

  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
    mode: shadowRootMode,
  };

  static override styles = styles;

  @property({ reflect: true })
  @required
  label?: string;

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

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ reflect: true, useDefault: true })
  name = '';

  @property({ reflect: true, useDefault: true })
  size: 'large' | 'small' = 'large';

  @property({ reflect: true })
  tooltip?: string;

  @property({ reflect: true, useDefault: true })
  type: 'button' | 'submit' | 'reset' = 'button';

  @property({ reflect: true, useDefault: true })
  value = '';

  @property({ reflect: true, useDefault: true })
  variant: 'primary' | 'secondary' | 'tertiary' | 'link' = 'primary';

  @property({ reflect: true })
  readonly version: string = packageJson.version;

  get form(): HTMLFormElement | null {
    return this.#internals.form;
  }

  override click() {
    this.#buttonElementRef.value?.click();
  }

  override firstUpdated() {
    if (this.#buttonElementRef.value && this.ariaDescription) {
      this.#buttonElementRef.value.ariaDescription = this.ariaDescription;
    }
  }

  override render() {
    return html`<glide-core-tooltip
      label=${this.tooltip ?? ''}
      ?disabled=${!this.disabled || !this.tooltip}
    >
      <button
        aria-disabled=${this.disabled ? 'true' : 'false'}
        class=${classMap({
          component: true,
          primary: this.variant === 'primary',
          secondary: this.variant === 'secondary',
          tertiary: this.variant === 'tertiary',
          link: this.variant === 'link',
          large: this.size === 'large',
          small: this.size === 'small',
          disabled: this.disabled,
          'prefix-icon': this.hasPrefixIcon,
          'suffix-icon': this.hasSuffixIcon,
        })}
        slot="target"
        @click=${this.#onClick}
        ${ref(this.#buttonElementRef)}
      >
        <slot
          class=${classMap({
            'prefix-icon-slot': true,
            hidden: this.variant === 'link',
          })}
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
          class=${classMap({
            'suffix-icon-slot': true,
            hidden: this.variant === 'link',
          })}
          name="suffix-icon"
          @slotchange=${this.#onSuffixIconSlotChange}
          ${ref(this.#suffixIconSlotElementRef)}
        >
          <!--
            An icon after the label
            @type {Element}
          -->
        </slot>
      </button>
    </glide-core-tooltip>`;
  }

  constructor() {
    super();
    this.#internals = this.attachInternals();
  }

  @state()
  private hasPrefixIcon = false;

  @state()
  private hasSuffixIcon = false;

  #ariaDescription: string | null = null;

  #buttonElementRef = createRef<HTMLButtonElement>();

  #internals: ElementInternals;

  #prefixIconSlotElementRef = createRef<HTMLSlotElement>();

  #suffixIconSlotElementRef = createRef<HTMLSlotElement>();

  #onClick(event: PointerEvent) {
    if (this.disabled) {
      event.stopPropagation();
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

  /* v8 ignore start */
  #onPrefixIconSlotChange() {
    const assignedNodes = this.#prefixIconSlotElementRef.value?.assignedNodes();
    this.hasPrefixIcon = Boolean(assignedNodes && assignedNodes.length > 0);
  }
  /* v8 ignore end */

  /* v8 ignore start */
  #onSuffixIconSlotChange() {
    const assignedNodes = this.#suffixIconSlotElementRef.value?.assignedNodes();
    this.hasSuffixIcon = Boolean(assignedNodes && assignedNodes.length > 0);
  }
  /* v8 ignore end */
}
