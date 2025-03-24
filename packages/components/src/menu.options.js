var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property } from 'lit/decorators.js';
import { nanoid } from 'nanoid';
import packageJson from '../package.json' with { type: 'json' };
import GlideCoreMenuButton from './menu.button.js';
import GlideCoreMenuLink from './menu.link.js';
import styles from './menu.options.styles.js';
import assertSlot from './library/assert-slot.js';
import shadowRootMode from './library/shadow-root-mode.js';
import final from './library/final.js';
// This component exists because Menu's target and its menu both need to be in
// the light DOM so ARIA attributes can be associated with the IDs they reference.
//
// Tooltip is in a similar situation but has no default slot. So we can simply take
// the value of its `label` attribute, pass it to Tooltip Container, then dump
// Tooltp Container into Tooltip's light DOM for consumers. We can't do the same
// for Menu because it necessarily has a default slot for Menu Buttons and Menu Links.
//
// One alternative solution is to require that consumers wrap their default slot content
// in any element. But doing so would be arguably more awkward than asking them to slot
// an element specifically for that purpose. It would also beget more questions, adding
// to our support load.
/**
 * @attr {string} [aria-activedescendant='']
 * @attr {string} [aria-labelledby='']
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {GlideCoreMenuButton | GlideCoreMenuLink}
 */
let GlideCoreMenuOptions = class GlideCoreMenuOptions extends LitElement {
    constructor() {
        super(...arguments);
        this.ariaActivedescendant = '';
        this.ariaLabelledby = '';
        this.privateSize = 'large';
        this.version = packageJson.version;
        // Established here instead of in `connectedCallback` so the ID remains
        // constant even if this component is removed and re-added to the DOM.
        // If it's not constant, the target's `aria-controls` will immediately
        // point to a non-existent ID when this component is re-added. An edge case
        // for sure. But one we can protect against with little effort.
        this.#id = nanoid();
    }
    static { this.shadowRootOptions = {
        ...LitElement.shadowRootOptions,
        mode: shadowRootMode,
    }; }
    static { this.styles = styles; }
    connectedCallback() {
        super.connectedCallback();
        // On the host instead of inside the shadow DOM so screenreaders can find this
        // ID when it's assigned to `aria-controls` by the target.
        this.id = this.#id;
        // These two are likewise on the host due to `aria-controls`. The controlled
        // element must be the one with `role="menu"` and has to be programmatically
        // focusable.
        this.role = 'menu';
        this.tabIndex = -1;
    }
    render() {
        return html `<div
      class=${classMap({
            component: true,
            large: this.privateSize === 'large',
            small: this.privateSize === 'small',
        })}
      role="none"
    >
      <slot
        ${assertSlot([GlideCoreMenuButton, GlideCoreMenuLink, Text])}
        @slotchange=${this.#onSlotChange}
      >
        <!-- @type {GlideCoreMenuButton | GlideCoreMenuLink} -->
      </slot>
    </div>`;
    }
    // Established here instead of in `connectedCallback` so the ID remains
    // constant even if this component is removed and re-added to the DOM.
    // If it's not constant, the target's `aria-controls` will immediately
    // point to a non-existent ID when this component is re-added. An edge case
    // for sure. But one we can protect against with little effort.
    #id;
    #onSlotChange() {
        this.dispatchEvent(new Event('private-slot-change', { bubbles: true }));
    }
};
__decorate([
    property({ attribute: 'aria-activedescendant', reflect: true })
], GlideCoreMenuOptions.prototype, "ariaActivedescendant", void 0);
__decorate([
    property({ attribute: 'aria-labelledby', reflect: true })
], GlideCoreMenuOptions.prototype, "ariaLabelledby", void 0);
__decorate([
    property()
], GlideCoreMenuOptions.prototype, "privateSize", void 0);
__decorate([
    property({ reflect: true })
], GlideCoreMenuOptions.prototype, "version", void 0);
GlideCoreMenuOptions = __decorate([
    customElement('glide-core-menu-options'),
    final
], GlideCoreMenuOptions);
export default GlideCoreMenuOptions;
