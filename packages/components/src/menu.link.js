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
import { ifDefined } from 'lit/directives/if-defined.js';
import { nanoid } from 'nanoid';
import packageJson from '../package.json' with { type: 'json' };
import styles from './menu.link.styles.js';
import shadowRootMode from './library/shadow-root-mode.js';
import final from './library/final.js';
import required from './library/required.js';
/**
 * @attr {string} label
 * @attr {boolean} [disabled=false]
 * @attr {string} [url]
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {Element} [icon]
 */
let GlideCoreMenuLink = class GlideCoreMenuLink extends LitElement {
    constructor() {
        super(...arguments);
        // A link is considered active when it's interacted with via keyboard or hovered.
        // Private because it's only meant to be used by Menu.
        this.privateActive = false;
        this.version = packageJson.version;
        this.#componentElementRef = createRef();
        // Established here instead of in `connectedCallback` so the ID remains
        // constant even if this component is removed and re-added to the DOM.
        // If it's not constant, Dropdown's `aria-activedescendant` will immediately
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
        // Menu sets `#isDisabledLinkClick` in its default slot's "mouseup" handler so
        // its `#onDocumentClick` handler knows to not close Menu. A programmatic click
        // doesn't generate a "mouseup" event. So, without this guard, `#isDisabledLinkClick`
        // would always be `false` and Menu would close when a disabled link is clicked.
        if (!this.disabled) {
            this.#componentElementRef.value?.click();
        }
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
        // `tabindex` is set to "0" and "-1" below based on `this.privateActive`. "0"
        // is to account for when a keyboard user tabs backward to the dropdown button.
        // Tabbing forward from there should move focus to where it was previously,
        // which would be on the option.
        return html `<a
      aria-disabled=${this.disabled}
      class=${classMap({
            component: true,
            active: this.privateActive,
            disabled: this.disabled,
        })}
      data-test="component"
      href=${ifDefined(this.url)}
      @click=${this.#onClick}
      ${ref(this.#componentElementRef)}
    >
      <slot name="icon">
        <!-- @type {Element} -->
      </slot>

      ${this.label}
    </a>`;
    }
    #componentElementRef;
    // Established here instead of in `connectedCallback` so the ID remains
    // constant even if this component is removed and re-added to the DOM.
    // If it's not constant, Dropdown's `aria-activedescendant` will immediately
    // point to a non-existent ID when this component is re-added. An edge case
    // for sure. But one we can protect against with little effort.
    #id;
    #isDisabled;
    #onClick(event) {
        if (this.disabled) {
            event.preventDefault();
            // Consumers listen for "click" events to know when an option is selected.
            // Letting this propagate would result in a false positive event bubbling
            // up to the consumer.
            event.stopPropagation();
        }
    }
};
__decorate([
    property({ reflect: true, type: Boolean })
], GlideCoreMenuLink.prototype, "disabled", null);
__decorate([
    property({ reflect: true }),
    required
], GlideCoreMenuLink.prototype, "label", void 0);
__decorate([
    property({ reflect: true })
], GlideCoreMenuLink.prototype, "url", void 0);
__decorate([
    property({ type: Boolean })
], GlideCoreMenuLink.prototype, "privateActive", void 0);
__decorate([
    property({ reflect: true })
], GlideCoreMenuLink.prototype, "version", void 0);
GlideCoreMenuLink = __decorate([
    customElement('glide-core-menu-link'),
    final
], GlideCoreMenuLink);
export default GlideCoreMenuLink;
