var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property } from 'lit/decorators.js';
import { nanoid } from 'nanoid';
import packageJson from '../package.json' with { type: 'json' };
import styles from './menu.button.styles.js';
import shadowRootMode from './library/shadow-root-mode.js';
import final from './library/final.js';
import required from './library/required.js';
/**
 * @attr {string} label
 * @attr {boolean} [disabled=false]
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {Element} [icon]
 */
let GlideCoreMenuButton = class GlideCoreMenuButton extends LitElement {
    constructor() {
        super(...arguments);
        // A button is considered active when it's interacted with via keyboard or hovered.
        // Private because it's only meant to be used by Menu.
        this.privateActive = false;
        this.version = packageJson.version;
        this.#componentElementRef = createRef();
        // Established here instead of in `connectedCallback` so the ID remains
        // constant even if this component is removed and re-added to the DOM.
        // If it's not constant, Menus's `aria-activedescendant` will immediately
        // point to a non-existent ID when this component is re-added. An edge case
        // for sure. But one we can protect against with little effort.
        this.#id = nanoid();
        this.#isDisabled = false;
    }
    static { this.shadowRootOptions = {
        ...LitElement.shadowRootOptions,
        mode: shadowRootMode,
    }; }
    static { this.styles = styles; }
    /**
     * @default false
     */
    get disabled() {
        return this.#isDisabled;
    }
    set disabled(isDisabled) {
        this.#isDisabled = isDisabled;
        if (isDisabled && this.privateActive) {
            this.dispatchEvent(new Event('private-disabled', { bubbles: true }));
        }
    }
    click() {
        this.#componentElementRef.value?.click();
    }
    connectedCallback() {
        super.connectedCallback();
        // On the host instead of inside the shadow DOM so screenreaders can find this
        // ID when it's assigned to `aria-activedescendant`.
        this.id = this.#id;
        // These two are likewise on the host due to `aria-activedescendant`. The active
        // descendant must be the element with `role` and has to be programmatically
        // focusable.
        this.role = 'menuitem';
        this.tabIndex = -1;
    }
    render() {
        return html `<button
      class=${classMap({
            component: true,
            active: this.privateActive,
            disabled: this.disabled,
        })}
      ?disabled=${this.disabled}
      data-test="component"
      type="button"
      ${ref(this.#componentElementRef)}
    >
      <slot name="icon">
        <!-- @type {Element} -->
      </slot>

      ${this.label}
    </button>`;
    }
    #componentElementRef;
    // Established here instead of in `connectedCallback` so the ID remains
    // constant even if this component is removed and re-added to the DOM.
    // If it's not constant, Menus's `aria-activedescendant` will immediately
    // point to a non-existent ID when this component is re-added. An edge case
    // for sure. But one we can protect against with little effort.
    #id;
    #isDisabled;
};
__decorate([
    property({ reflect: true, type: Boolean })
], GlideCoreMenuButton.prototype, "disabled", null);
__decorate([
    property({ reflect: true }),
    required
], GlideCoreMenuButton.prototype, "label", void 0);
__decorate([
    property({ type: Boolean })
], GlideCoreMenuButton.prototype, "privateActive", void 0);
__decorate([
    property({ reflect: true })
], GlideCoreMenuButton.prototype, "version", void 0);
GlideCoreMenuButton = __decorate([
    customElement('glide-core-menu-button'),
    final
], GlideCoreMenuButton);
export default GlideCoreMenuButton;
