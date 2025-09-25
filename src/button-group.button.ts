import { html, LitElement } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import packageJson from '../package.json' with { type: 'json' };
import styles from './button-group.button.styles.js';
import assertSlot from './library/assert-slot.js';
import final from './library/final.js';
import required from './library/required.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-button-group-button': ButtonGroupButton;
  }
}

/**
 * @attr {string} label
 * @attr {boolean} [disabled=false]
 * @attr {boolean} [selected=false]
 * @attr {string} [value='']
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {Element} [icon]
 *
 * @fires {Event} selected
 */
@customElement('glide-core-button-group-button')
@final
export default class ButtonGroupButton extends LitElement {
  /* v8 ignore start */
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: window.navigator.webdriver ? 'open' : 'closed',
  };
  /* v8 ignore stop */

  static override styles = styles;

  @property({ reflect: true })
  @required
  label?: string;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  // Private because it's only meant to be used by Button Group.
  @property()
  privateOrientation: 'horizontal' | 'vertical' = 'horizontal';

  // Private because it's only meant to be used by Button Group.
  @property()
  privateVariant?: 'icon-only';

  /**
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  get selected(): boolean {
    return this.#isSelected;
  }

  set selected(isSelected: boolean) {
    this.#isSelected = isSelected;
    this.dispatchEvent(new Event('private-selected', { bubbles: true }));
  }

  // `value` is used by consumers to identify a selected based on something
  // other than its label.
  @property({ reflect: true, useDefault: true })
  value = '';

  @property({ reflect: true })
  readonly version: string = packageJson.version;

  override click() {
    this.#componentElementRef.value?.click();
  }

  override focus(options?: FocusOptions) {
    this.#componentElementRef.value?.focus(options);
  }

  privateSelect() {
    this.selected = true;

    this.dispatchEvent(
      new Event('selected', { bubbles: true, composed: true }),
    );
  }

  override render() {
    return html`<div
      aria-checked=${this.selected}
      aria-disabled=${this.disabled}
      class=${classMap({
        component: true,
        selected: this.selected,
        disabled: this.disabled,
        [this.privateOrientation]: true,
        icon: this.hasIcon,
        'icon-only': this.privateVariant === 'icon-only',
      })}
      data-test="radio"
      role="radio"
      tabindex=${!this.selected || this.disabled ? -1 : 0}
      ${ref(this.#componentElementRef)}
    >
      <slot
        name="icon"
        @slotchange=${this.#onIconSlotChange}
        ${assertSlot(null, this.privateVariant !== 'icon-only')}
        ${ref(this.#iconSlotElementRef)}
      >
        <!-- @type {Element} -->
      </slot>

      <div
        class=${classMap({
          label: true,
          'visually-hidden': this.privateVariant === 'icon-only',
        })}
      >
        ${this.label}
      </div>
    </div>`;
  }

  @state()
  private hasIcon = false;

  #componentElementRef = createRef<HTMLElement>();

  #iconSlotElementRef = createRef<HTMLSlotElement>();

  #isSelected = false;

  #onIconSlotChange() {
    const assignedNodes = this.#iconSlotElementRef.value?.assignedNodes();
    this.hasIcon = Boolean(assignedNodes && assignedNodes.length > 0);
  }
}
