var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
/**
 * @attr {'left'|'middle'} [split='left']
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {GlideCoreCheckbox | GlideCoreCheckboxGroup | GlideCoreDropdown | GlideCoreRadioGroup | GlideCoreInput | GlideCoreTextArea}
 */
let GlideCoreFormControlsLayout = class GlideCoreFormControlsLayout extends LitElement {
    constructor() {
        super(...arguments);
        this.version = packageJson.version;
        this.#slotElementRef = createRef();
        this.#split = 'left';
    }
    static { this.shadowRootOptions = {
        ...LitElement.shadowRootOptions,
        mode: shadowRootMode,
    }; }
    static { this.styles = styles; }
    /**
     * @default 'left'
     */
    get split() {
        return this.#split;
    }
    set split(split) {
        this.#split = split;
        if (this.#slotElementRef.value) {
            for (const element of this.#slotElementRef.value.assignedElements()) {
                if ('privateSplit' in element) {
                    element.privateSplit = this.split;
                }
            }
        }
    }
    render() {
        return html `<div class="component">
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
    #slotElementRef;
    #split;
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
};
__decorate([
    property({ reflect: true })
], GlideCoreFormControlsLayout.prototype, "split", null);
__decorate([
    property({ reflect: true })
], GlideCoreFormControlsLayout.prototype, "version", void 0);
GlideCoreFormControlsLayout = __decorate([
    customElement('glide-core-form-controls-layout'),
    final
], GlideCoreFormControlsLayout);
export default GlideCoreFormControlsLayout;
