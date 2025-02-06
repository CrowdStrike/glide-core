import { html, LitElement } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property } from 'lit/decorators.js';
import packageJson from '../package.json' with { type: 'json' };
import GlideCoreCheckbox from './checkbox.js';
import GlideCoreCheckboxGroup from './checkbox-group.js';
import GlideCoreDropdown from './dropdown.js';
import GlideCoreRadioGroup from './radio-group.js';
import GlideCoreInput from './input.js';
import GlideCoreTextArea from './textarea.js';
import styles from './form-controls-layout.styles.js';
import assertSlot from './library/assert-slot.js';
import shadowRootMode from './library/shadow-root-mode.js';
import final from './library/final.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-form-controls-layout': GlideCoreFormControlsLayout;
  }
}

/**
 * @attr {'left'|'middle'} [split='left']
 *
 * @readonly
 * @attr {0.19.1} [version]
 *
 * @slot {GlideCoreCheckbox | GlideCoreCheckboxGroup | GlideCoreDropdown | GlideCoreRadioGroup | GlideCoreInput | GlideCoreTextArea}
 */
@customElement('glide-core-form-controls-layout')
@final
export default class GlideCoreFormControlsLayout extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: shadowRootMode,
  };

  static override styles = styles;

  /**
   * @default 'left'
   */
  @property({ reflect: true })
  get split(): 'left' | 'middle' {
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

  @property({ noAccessor: true, reflect: true })
  readonly version = packageJson.version;

  override render() {
    return html`<div class="component">
      <slot
        @slotchange=${this.#onSlotChange}
        ${assertSlot([
          GlideCoreCheckbox,
          GlideCoreCheckboxGroup,
          GlideCoreDropdown,
          GlideCoreRadioGroup,
          GlideCoreInput,
          GlideCoreTextArea,
        ])}
        ${ref(this.#slotElementRef)}
      >
        <!-- @type {GlideCoreCheckbox | GlideCoreCheckboxGroup | GlideCoreDropdown | GlideCoreRadioGroup | GlideCoreInput | GlideCoreTextArea} -->
      </slot>
    </div>`;
  }

  #slotElementRef = createRef<HTMLSlotElement>();

  #split: 'left' | 'middle' = 'left';

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
