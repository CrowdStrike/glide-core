var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import packageJson from '../package.json' with { type: 'json' };
import styles from './button-group.button.styles.js';
import assertSlot from './library/assert-slot.js';
import shadowRootMode from './library/shadow-root-mode.js';
import final from './library/final.js';
import required from './library/required.js';
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
let GlideCoreButtonGroupButton = class GlideCoreButtonGroupButton extends LitElement {
    constructor() {
        super(...arguments);
        this.disabled = false;
        // `value` is used by consumers to identify selections based on something other
        // than the label.
        this.value = '';
        // Private because it's only meant to be used by Button Group.
        this.privateOrientation = 'horizontal';
        this.version = packageJson.version;
        this.hasIcon = false;
        this.#componentElementRef = createRef();
        this.#iconSlotElementRef = createRef();
        this.#isSelected = false;
    }
    static { this.shadowRootOptions = {
        ...LitElement.shadowRootOptions,
        mode: shadowRootMode,
    }; }
    static { this.styles = styles; }
    /**
     * @default false
     */
    get selected() {
        return this.#isSelected;
    }
    set selected(isSelected) {
        this.#isSelected = isSelected;
        this.dispatchEvent(new Event('private-selected', { bubbles: true }));
    }
    click() {
        this.#componentElementRef.value?.click();
    }
    focus(options) {
        this.#componentElementRef.value?.focus(options);
    }
    privateSelect() {
        this.selected = true;
        this.dispatchEvent(new Event('selected', { bubbles: true, composed: true }));
    }
    render() {
        return html `<div
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
    #componentElementRef;
    #iconSlotElementRef;
    #isSelected;
    #onIconSlotChange() {
        const assignedNodes = this.#iconSlotElementRef.value?.assignedNodes();
        this.hasIcon = Boolean(assignedNodes && assignedNodes.length > 0);
    }
};
__decorate([
    property({ reflect: true }),
    required
], GlideCoreButtonGroupButton.prototype, "label", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], GlideCoreButtonGroupButton.prototype, "selected", null);
__decorate([
    property({ type: Boolean, reflect: true })
], GlideCoreButtonGroupButton.prototype, "disabled", void 0);
__decorate([
    property({ reflect: true })
], GlideCoreButtonGroupButton.prototype, "value", void 0);
__decorate([
    property()
], GlideCoreButtonGroupButton.prototype, "privateOrientation", void 0);
__decorate([
    property()
], GlideCoreButtonGroupButton.prototype, "privateVariant", void 0);
__decorate([
    property({ reflect: true })
], GlideCoreButtonGroupButton.prototype, "version", void 0);
__decorate([
    state()
], GlideCoreButtonGroupButton.prototype, "hasIcon", void 0);
GlideCoreButtonGroupButton = __decorate([
    customElement('glide-core-button-group-button'),
    final
], GlideCoreButtonGroupButton);
export default GlideCoreButtonGroupButton;
