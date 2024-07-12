import './checkbox.js';
import './dropdown.option.js';
import './label.js';
import { LitElement, html } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property } from 'lit/decorators.js';
import { owSlot, owSlotType } from './library/ow.js';
import GlideCoreCheckbox from './checkbox.js';
import GlideCoreCheckboxGroup from './checkbox-group.js';
import GlideCoreDropdown from './dropdown.js';
import GlideCoreInput from './input.js';
import GlideCoreRadioGroup from './radio-group.js';
import GlideCoreTextArea from './textarea.js';
import styles from './form-layout.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-form-layout': GlideCoreFormLayout;
  }
}

/**
 * @description TODO: A dropdown with optional description and tooltip. Participates in forms and validation via `FormData` and various methods.
 *
 * @slot - One or more Glide Core form controls.
 */
@customElement('glide-core-form-layout')
export default class GlideCoreFormLayout extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: 'closed',
  };

  static override styles = styles;

  @property({ reflect: true })
  get split() {
    return this.#split;
  }

  set split(split: 'left' | 'middle') {
    this.#split = split;

    const assignedElements = this.#slotElementRef.value?.assignedElements();

    if (assignedElements) {
      for (const element of assignedElements) {
        if ('privateSplit' in element) {
          element.privateSplit = this.split;
        }
      }
    }
  }

  override firstUpdated() {
    owSlot(this.#slotElementRef.value);

    owSlotType(this.#slotElementRef.value, [
      GlideCoreCheckbox,
      GlideCoreCheckboxGroup,
      GlideCoreDropdown,
      GlideCoreInput,
      GlideCoreRadioGroup,
      GlideCoreTextArea,
    ]);
  }

  override render() {
    return html`<div class="component">
      <slot
        @slotchange=${this.#onSlotChange}
        ${ref(this.#slotElementRef)}
      ></slot>
    </div>`;
  }

  #slotElementRef = createRef<HTMLSlotElement>();

  #split: 'left' | 'middle' = 'left';

  #onSlotChange() {
    owSlot(this.#slotElementRef.value);

    owSlotType(this.#slotElementRef.value, [
      GlideCoreCheckbox,
      GlideCoreCheckboxGroup,
      GlideCoreDropdown,
      GlideCoreInput,
      GlideCoreRadioGroup,
      GlideCoreTextArea,
    ]);

    const assignedElements = this.#slotElementRef.value?.assignedElements();

    if (assignedElements) {
      for (const element of assignedElements) {
        if ('privateSplit' in element) {
          element.privateSplit = this.split;
        }
      }
    }
  }
}
