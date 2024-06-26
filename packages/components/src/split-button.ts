import './menu.js';
import { LitElement, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
import { owSlot, owSlotType } from './library/ow.js';
import styles from './split-button.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-split-button': GlideCoreSplitButton;
  }
}

/**
 * @description A button to be used in the `main-action` slot of `glide-core-split-container`.
 *
 * @slot prefix - An optional icon slot to display before the label.
 * @slot - A label for the contents of the button.
 */
@customElement('glide-core-split-button')
export default class GlideCoreSplitButton extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
    mode: 'closed',
  };

  static override styles = styles;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ reflect: true })
  variant: 'primary' | 'secondary' = 'primary';

  @property({ reflect: true })
  size: 'large' | 'small' = 'large';

  override firstUpdated() {
    owSlot(this.#defaultSlotElementRef.value);

    owSlotType(this.#defaultSlotElementRef.value, [Text]);
  }

  override render() {
    return html`<button
      type="button"
      class=${classMap({
        component: true,
        disabled: this.disabled,
        [this.variant]: true,
        [this.size]: true,
        'has-prefix': this.hasPrefixSlot,
      })}
      ?disabled=${this.disabled}
      data-test="split-button"
    >
      <slot
        name="prefix"
        @slotchange=${this.#onPrefixSlotChange}
        ${ref(this.#prefixSlotElementRef)}
        data-test="prefix-slot"
      ></slot>
      <slot
        @slotchange=${this.#onDefaultSlotChange}
        ${ref(this.#defaultSlotElementRef)}
        data-test="default-slot"
      ></slot>
    </button>`;
  }

  @state()
  private hasPrefixSlot = false;

  #defaultSlotElementRef = createRef<HTMLSlotElement>();

  #prefixSlotElementRef = createRef<HTMLSlotElement>();

  #onDefaultSlotChange() {
    owSlot(this.#defaultSlotElementRef.value);

    owSlotType(this.#defaultSlotElementRef.value, [Text]);
  }

  #onPrefixSlotChange() {
    const assignedNodes = this.#prefixSlotElementRef.value?.assignedNodes();

    this.hasPrefixSlot =
      assignedNodes && assignedNodes.length > 0 ? true : false;
  }
}
