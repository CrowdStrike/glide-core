var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import './menu.options.js';
import { html, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import packageJson from '../package.json' with { type: 'json' };
import GlideCoreMenu from './menu.js';
import GlideCoreMenuButton from './menu.button.js';
import GlideCoreMenuLink from './menu.link.js';
import chevronIcon from './icons/chevron.js';
import styles from './split-button.secondary-button.styles.js';
import assertSlot from './library/assert-slot.js';
import shadowRootMode from './library/shadow-root-mode.js';
import final from './library/final.js';
import required from './library/required.js';
/**
 * @attr {string} label
 * @attr {boolean} [disabled=false]
 * @attr {boolean} [menu-open=false]
 * @attr {'bottom-end'|'top-end'} [menu-placement='bottom-end']
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {GlideCoreMenuButton | GlideCoreMenuLink}
 */
let GlideCoreSplitButtonSecondaryButton = class GlideCoreSplitButtonSecondaryButton extends LitElement {
    constructor() {
        super(...arguments);
        this.disabled = false;
        this.menuOpen = false;
        this.menuPlacement = 'bottom-end';
        this.privateActive = false;
        this.privateSize = 'large';
        this.privateVariant = 'primary';
        this.version = packageJson.version;
        this.#buttonElementRef = createRef();
        this.#menuElementRef = createRef();
    }
    static { this.shadowRootOptions = {
        ...LitElement.shadowRootOptions,
        delegatesFocus: true,
        mode: shadowRootMode,
    }; }
    static { this.styles = styles; }
    click() {
        this.#buttonElementRef.value?.click();
    }
    firstUpdated() {
        // A "click" handler on Menu would suffice for checking Menu's `open` property
        // and synchronizing it with `menuOpen` if Menu didn't close itself on `document`
        // click and when focus is lost.
        //
        // Thus an observer. Which only assumes that `open` is reflected and doesn't
        // depend on knowledge of Menu's internals.
        const observer = new MutationObserver(() => {
            if (this.#menuElementRef.value) {
                this.menuOpen = this.#menuElementRef.value.open;
            }
        });
        if (this.#menuElementRef.value) {
            observer.observe(this.#menuElementRef.value, {
                attributes: true,
                attributeFilter: ['open'],
            });
        }
    }
    render() {
        return html `
      <glide-core-menu
        placement=${this.menuPlacement}
        size=${this.privateSize}
        ?open=${this.menuOpen}
        ${ref(this.#menuElementRef)}
      >
        <button
          aria-label=${ifDefined(this.label)}
          class=${classMap({
            component: true,
            active: this.menuOpen,
            disabled: this.disabled,
            [this.privateVariant]: true,
            [this.privateSize]: true,
        })}
          data-test="button"
          slot="target"
          type="button"
          ?disabled=${this.disabled}
          ${ref(this.#buttonElementRef)}
        >
          ${chevronIcon}
        </button>

        <glide-core-menu-options>
          <slot ${assertSlot([GlideCoreMenuButton, GlideCoreMenuLink])}>
            <!-- @type {GlideCoreMenuButton | GlideCoreMenuLink} -->
          </slot>
        </glide-core-menu-options>
      </glide-core-menu>
    `;
    }
    #buttonElementRef;
    #menuElementRef;
};
__decorate([
    property({ reflect: true, type: Boolean })
], GlideCoreSplitButtonSecondaryButton.prototype, "disabled", void 0);
__decorate([
    property({ reflect: true }),
    required
], GlideCoreSplitButtonSecondaryButton.prototype, "label", void 0);
__decorate([
    property({ attribute: 'menu-open', reflect: true, type: Boolean })
], GlideCoreSplitButtonSecondaryButton.prototype, "menuOpen", void 0);
__decorate([
    property({ attribute: 'menu-placement', reflect: true })
], GlideCoreSplitButtonSecondaryButton.prototype, "menuPlacement", void 0);
__decorate([
    property({ type: Boolean })
], GlideCoreSplitButtonSecondaryButton.prototype, "privateActive", void 0);
__decorate([
    property()
], GlideCoreSplitButtonSecondaryButton.prototype, "privateSize", void 0);
__decorate([
    property()
], GlideCoreSplitButtonSecondaryButton.prototype, "privateVariant", void 0);
__decorate([
    property({ reflect: true })
], GlideCoreSplitButtonSecondaryButton.prototype, "version", void 0);
GlideCoreSplitButtonSecondaryButton = __decorate([
    customElement('glide-core-split-button-secondary-button'),
    final
], GlideCoreSplitButtonSecondaryButton);
export default GlideCoreSplitButtonSecondaryButton;
