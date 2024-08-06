import { LitElement, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
import ow, { owSlot } from './library/ow.js';
import styles from './button-group.button.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-button-group-button': GlideCoreButtonGroupButton;
  }
}

/**
 * @description A button with a label and optional icon for use in a `<glide-core-button-group>`.
 *
 * @event change - Dispatched when the button is selected.
 * @event input - Dispatched when the button is selected.

 * @slot prefix - An icon.
 * @slot - A label.
 */
@customElement('glide-core-button-group-button')
export default class GlideCoreButtonGroupButton extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: 'closed',
  };

  static override styles = styles;

  @property({ reflect: true })
  label? = '';

  @property({ type: Boolean, reflect: true })
  get selected() {
    return this.#isSelected;
  }

  set selected(isSelected: boolean) {
    this.#isSelected = isSelected;
    this.dispatchEvent(new Event('private-selected', { bubbles: true }));
  }

  @property({ type: Boolean, reflect: true })
  disabled = false;

  // `value` is used by consumers to identify selections based on something other
  // than the label.
  @property({ reflect: true })
  value? = '';

  @property()
  privateOrientation: 'horizontal' | 'vertical' = 'horizontal';

  @property()
  privateVariant?: 'icon-only';

  override click() {
    this.#componentElementRef.value?.click();
  }

  override firstUpdated() {
    if (this.privateVariant === 'icon-only') {
      owSlot(this.#prefixSlotElementRef.value);
    }
  }

  override focus(options?: FocusOptions) {
    this.#componentElementRef.value?.focus(options);
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
        prefix: this.hasPrefixSlot,
        'icon-only': this.privateVariant === 'icon-only',
      })}
      role="radio"
      tabindex=${!this.selected || this.disabled ? -1 : 0}
      ${ref(this.#componentElementRef)}
    >
      <slot
        name="prefix"
        @slotchange=${this.#onPrefixSlotChange}
        ${ref(this.#prefixSlotElementRef)}
      ></slot>

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
  private hasPrefixSlot = false;

  #componentElementRef = createRef<HTMLElement>();

  #isSelected = false;

  #prefixSlotElementRef = createRef<HTMLSlotElement>();

  #onPrefixSlotChange() {
    ow(this.#prefixSlotElementRef.value, ow.object.instanceOf(HTMLElement));

    this.hasPrefixSlot =
      this.#prefixSlotElementRef.value?.assignedNodes().length > 0;
  }
}
