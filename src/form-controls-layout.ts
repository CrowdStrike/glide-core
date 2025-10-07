import { html, LitElement } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property } from 'lit/decorators.js';
import packageJson from '../package.json' with { type: 'json' };
import Checkbox from './checkbox.js';
import CheckboxGroup from './checkbox-group.js';
import Dropdown from './dropdown.js';
import Input from './input.js';
import RadioGroup from './radio-group.js';
import Slider from './slider.js';
import TextArea from './textarea.js';
import styles from './form-controls-layout.styles.js';
import assertSlot from './library/assert-slot.js';
import final from './library/final.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-form-controls-layout': FormControlsLayout;
  }
}

/**
 * @attr {'left'|'middle'|'right'} [split='left']
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {Checkbox | CheckboxGroup | Dropdown | Input | RadioGroup | Slider | TextArea}
 */
@customElement('glide-core-form-controls-layout')
@final
export default class FormControlsLayout extends LitElement {
  /* v8 ignore start */
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: window.navigator.webdriver ? 'open' : 'closed',
  };
  /* v8 ignore stop */

  static override styles = styles;

  /**
   * @default 'left'
   */
  @property({ reflect: true })
  get split(): 'left' | 'middle' | 'right' {
    return this.#split;
  }

  set split(split: 'left' | 'middle' | 'right') {
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
  readonly version: string = packageJson.version;

  override render() {
    return html`<div class="component">
      <slot
        @slotchange=${this.#onSlotChange}
        ${assertSlot([
          Checkbox,
          CheckboxGroup,
          Dropdown,
          Input,
          RadioGroup,
          Slider,
          TextArea,
        ])}
        ${ref(this.#slotElementRef)}
      >
        <!-- @type {Checkbox | CheckboxGroup | Dropdown | Input | RadioGroup | Slider | TextArea} -->
      </slot>
    </div>`;
  }

  #slotElementRef = createRef<HTMLSlotElement>();

  #split: 'left' | 'middle' | 'right' = 'left';

  #onSlotChange() {
    if (this.#slotElementRef.value) {
      for (const element of this.#slotElementRef.value.assignedElements()) {
        if ('privateSplit' in element) {
          element.privateSplit = this.split;
        }

        if ('orientation' in element && element.orientation !== 'horizontal') {
          throw new TypeError('Only horizontal controls are supported.');
        }
      }
    }
  }
}
