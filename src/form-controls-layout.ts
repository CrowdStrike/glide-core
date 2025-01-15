import './dropdown.option.js';
import './label.js';
import { html, LitElement } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property } from 'lit/decorators.js';
import packageJson from '../package.json' with { type: 'json' };
import GlideCoreCheckbox from './checkbox.js';
import GlideCoreCheckboxGroup from './checkbox-group.js';
import GlideCoreDropdown from './dropdown.js';
import GlideCoreInput from './input.js';
import GlideCoreTextArea from './textarea.js';
import ow, { owSlot, owSlotType } from './library/ow.js';
import styles from './form-controls-layout.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-form-controls-layout': GlideCoreFormControlsLayout;
  }
}

/**
 * @slot - GlideCoreCheckbox | GlideCoreCheckboxGroup | GlideCoreDropdown | GlideCoreInput | GlideCoreTextArea.
 */
@customElement('glide-core-form-controls-layout')
export default class GlideCoreFormControlsLayout extends LitElement {
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

    if (this.#slotElementRef.value) {
      for (const element of this.#slotElementRef.value.assignedElements()) {
        if ('privateSplit' in element) {
          element.privateSplit = this.split;
        }
      }
    }
  }

  @property({ reflect: true })
  readonly version = packageJson.version;

  override firstUpdated() {
    owSlot(this.#slotElementRef.value);

    owSlotType(this.#slotElementRef.value, [
      GlideCoreCheckbox,
      GlideCoreCheckboxGroup,
      GlideCoreDropdown,
      GlideCoreInput,
      GlideCoreTextArea,
    ]);

    this.#assertHorizontalControls();
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

  #assertHorizontalControls() {
    owSlot(this.#slotElementRef.value);

    for (const element of this.#slotElementRef.value.assignedElements()) {
      if ('orientation' in element) {
        ow(
          element.orientation === 'horizontal',
          ow.boolean.true.message('Only horizontal controls are supported.'),
        );
      }
    }
  }

  #onSlotChange() {
    owSlot(this.#slotElementRef.value);

    owSlotType(this.#slotElementRef.value, [
      GlideCoreCheckbox,
      GlideCoreCheckboxGroup,
      GlideCoreDropdown,
      GlideCoreInput,
      GlideCoreTextArea,
    ]);

    this.#assertHorizontalControls();

    for (const element of this.#slotElementRef.value.assignedElements()) {
      if ('privateSplit' in element) {
        element.privateSplit = this.split;
      }
    }
  }
}
