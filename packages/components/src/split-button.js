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
import GlideCoreSplitButtonPrimaryButton from './split-button.primary-button.js';
import GlideCoreSplitButtonPrimaryLink from './split-button.primary-link.js';
import GlideCoreSplitButtonSecondaryButton from './split-button.secondary-button.js';
import styles from './split-button.styles.js';
import assertSlot from './library/assert-slot.js';
import shadowRootMode from './library/shadow-root-mode.js';
import final from './library/final.js';
/**
 * @attr {'large'|'small'} [size='large']
 * @attr {'primary'|'secondary'} [variant='primary']
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {GlideCoreSplitButtonPrimaryButton | GlideCoreSplitButtonPrimaryLink}
 * @slot {GlideCoreSplitButtonSecondaryButton} [secondary-button]
 */
let GlideCoreSplitButton = class GlideCoreSplitButton extends LitElement {
    constructor() {
        super(...arguments);
        this.version = packageJson.version;
        this.#defaultSlotElementRef = createRef();
        this.#secondaryButtonSlotElementRef = createRef();
        this.#size = 'large';
        this.#variant = 'primary';
    }
    static { this.shadowRootOptions = {
        ...LitElement.shadowRootOptions,
        mode: shadowRootMode,
    }; }
    static { this.styles = styles; }
    /**
     * @default 'large'
     */
    get size() {
        return this.#size;
    }
    set size(size) {
        this.#size = size;
        if (this.primaryButtonElement) {
            this.primaryButtonElement.privateSize = size;
        }
        if (this.secondaryButtonElement) {
            this.secondaryButtonElement.privateSize = size;
        }
    }
    /**
     * @default 'primary'
     */
    get variant() {
        return this.#variant;
    }
    set variant(variant) {
        this.#variant = variant;
        if (this.primaryButtonElement) {
            this.primaryButtonElement.privateVariant = variant;
        }
        if (this.secondaryButtonElement) {
            this.secondaryButtonElement.privateVariant = variant;
        }
    }
    get secondaryButtonElement() {
        const element = this.#secondaryButtonSlotElementRef.value
            ?.assignedElements()
            .at(0);
        if (element instanceof GlideCoreSplitButtonSecondaryButton) {
            return element;
        }
    }
    get primaryButtonElement() {
        const element = this.#defaultSlotElementRef.value?.assignedElements().at(0);
        if (element instanceof GlideCoreSplitButtonPrimaryButton ||
            element instanceof GlideCoreSplitButtonPrimaryLink) {
            return element;
        }
    }
    render() {
        return html `
      <div class="component">
        <slot
          @slotchange=${this.#onDefaultSlotChange}
          ${assertSlot([
            GlideCoreSplitButtonPrimaryButton,
            GlideCoreSplitButtonPrimaryLink,
        ])}
          ${ref(this.#defaultSlotElementRef)}
        >
          <!-- @type {GlideCoreSplitButtonPrimaryButton | GlideCoreSplitButtonPrimaryLink} -->
        </slot>

        <slot
          name="secondary-button"
          @slotchange=${this.#onSecondaryButtonSlotChange}
          ${assertSlot([GlideCoreSplitButtonSecondaryButton])}
          ${ref(this.#secondaryButtonSlotElementRef)}
        >
          <!-- @type {GlideCoreSplitButtonSecondaryButton} -->
        </slot>
      </div>
    `;
    }
    #defaultSlotElementRef;
    #secondaryButtonSlotElementRef;
    #size;
    #variant;
    #onDefaultSlotChange() {
        if (this.primaryButtonElement) {
            this.primaryButtonElement.privateSize = this.size;
            this.primaryButtonElement.privateVariant = this.variant;
        }
    }
    #onSecondaryButtonSlotChange() {
        if (this.secondaryButtonElement) {
            this.secondaryButtonElement.privateSize = this.size;
            this.secondaryButtonElement.privateVariant = this.variant;
        }
    }
};
__decorate([
    property({ reflect: true })
], GlideCoreSplitButton.prototype, "size", null);
__decorate([
    property({ reflect: true })
], GlideCoreSplitButton.prototype, "variant", null);
__decorate([
    property({ reflect: true })
], GlideCoreSplitButton.prototype, "version", void 0);
GlideCoreSplitButton = __decorate([
    customElement('glide-core-split-button'),
    final
], GlideCoreSplitButton);
export default GlideCoreSplitButton;
