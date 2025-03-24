var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
import packageJson from '../package.json' with { type: 'json' };
import styles from './button.styles.js';
import shadowRootMode from './library/shadow-root-mode.js';
import final from './library/final.js';
import required from './library/required.js';
/**
 * @attr {string} label
 * @attr {boolean} [disabled=false]
 * @attr {string} [name='']
 * @attr {'large'|'small'} [size='large']
 * @attr {'button'|'submit'|'reset'} [type='button']
 * @attr {string} [value='']
 * @attr {'primary'|'secondary'|'tertiary'} [variant='primary']
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
let GlideCoreButton = class GlideCoreButton extends LitElement {
    static { this.formAssociated = true; }
    static { this.shadowRootOptions = {
        ...LitElement.shadowRootOptions,
        delegatesFocus: true,
        mode: shadowRootMode,
    }; }
    static { this.styles = styles; }
    get form() {
        return this.#internals.form;
    }
    click() {
        this.#buttonElementRef.value?.click();
    }
    render() {
        return html `<button
      class=${classMap({
            component: true,
            primary: this.variant === 'primary',
            secondary: this.variant === 'secondary',
            tertiary: this.variant === 'tertiary',
            large: this.size === 'large',
            small: this.size === 'small',
            'prefix-icon': this.hasPrefixIcon,
            'suffix-icon': this.hasSuffixIcon,
        })}
      ?disabled=${this.disabled}
      @click=${this.#onClick}
      ${ref(this.#buttonElementRef)}
    >
      <slot
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
        name="suffix-icon"
        @slotchange=${this.#onSuffixIconSlotChange}
        ${ref(this.#suffixIconSlotElementRef)}
      >
        <!-- 
          An icon after the label  
          @type {Element}
        -->
      </slot>
    </button>`;
    }
    constructor() {
        super();
        this.disabled = false;
        this.name = '';
        this.size = 'large';
        this.type = 'button';
        this.value = '';
        this.variant = 'primary';
        this.version = packageJson.version;
        this.hasPrefixIcon = false;
        this.hasSuffixIcon = false;
        this.#buttonElementRef = createRef();
        this.#prefixIconSlotElementRef = createRef();
        this.#suffixIconSlotElementRef = createRef();
        this.#internals = this.attachInternals();
    }
    #buttonElementRef;
    #internals;
    #prefixIconSlotElementRef;
    #suffixIconSlotElementRef;
    #onClick() {
        if (this.type === 'submit') {
            this.form?.requestSubmit();
            return;
        }
        if (this.type === 'reset') {
            this.form?.reset();
            return;
        }
    }
    #onPrefixIconSlotChange() {
        const assignedNodes = this.#prefixIconSlotElementRef.value?.assignedNodes();
        this.hasPrefixIcon = Boolean(assignedNodes && assignedNodes.length > 0);
    }
    #onSuffixIconSlotChange() {
        const assignedNodes = this.#suffixIconSlotElementRef.value?.assignedNodes();
        this.hasSuffixIcon = Boolean(assignedNodes && assignedNodes.length > 0);
    }
};
__decorate([
    property({ type: Boolean, reflect: true })
], GlideCoreButton.prototype, "disabled", void 0);
__decorate([
    property({ reflect: true }),
    required
], GlideCoreButton.prototype, "label", void 0);
__decorate([
    property({ reflect: true })
], GlideCoreButton.prototype, "name", void 0);
__decorate([
    property({ reflect: true })
], GlideCoreButton.prototype, "size", void 0);
__decorate([
    property({ reflect: true })
], GlideCoreButton.prototype, "type", void 0);
__decorate([
    property({ reflect: true })
], GlideCoreButton.prototype, "value", void 0);
__decorate([
    property({ reflect: true })
], GlideCoreButton.prototype, "variant", void 0);
__decorate([
    property({ reflect: true })
], GlideCoreButton.prototype, "version", void 0);
__decorate([
    state()
], GlideCoreButton.prototype, "hasPrefixIcon", void 0);
__decorate([
    state()
], GlideCoreButton.prototype, "hasSuffixIcon", void 0);
GlideCoreButton = __decorate([
    customElement('glide-core-button'),
    final
], GlideCoreButton);
export default GlideCoreButton;
