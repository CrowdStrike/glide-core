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
import packageJson from '../package.json' with { type: 'json' };
import styles from './icon-button.styles.js';
import assertSlot from './library/assert-slot.js';
import shadowRootMode from './library/shadow-root-mode.js';
import final from './library/final.js';
import required from './library/required.js';
/**
 * @attr {string} label
 * @attr {string|null} [aria-controls=null]
 * @attr {'true'|'false'|null} [aria-expanded=null]
 * @attr {'true'|'false'|'menu'|'listbox'|'tree'|'grid'|'dialog'|null} [aria-haspopup=null]
 * @attr {boolean} [disabled=false]
 * @attr {'primary'|'secondary'|'tertiary'} [variant='primary']
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {Element} - An icon
 */
let GlideCoreIconButton = class GlideCoreIconButton extends LitElement {
    constructor() {
        super(...arguments);
        this.ariaControls = null;
        this.ariaExpanded = null;
        this.ariaHasPopup = null;
        this.disabled = false;
        this.variant = 'primary';
        this.version = packageJson.version;
        this.#buttonElementRef = createRef();
        this.#defaultSlotElementRef = createRef();
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
    render() {
        return html `
      <button
        aria-controls=${ifDefined(this.ariaControls ?? undefined)}
        aria-expanded=${ifDefined(this.ariaExpanded ?? undefined)}
        aria-haspopup=${ifDefined(this.ariaHasPopup ?? undefined)}
        aria-label=${ifDefined(this.label)}
        class=${classMap({
            component: true,
            primary: this.variant === 'primary',
            secondary: this.variant === 'secondary',
            tertiary: this.variant === 'tertiary',
        })}
        data-test="button"
        type="button"
        ?disabled=${this.disabled}
        ${ref(this.#buttonElementRef)}
      >
        <slot ${assertSlot()} ${ref(this.#defaultSlotElementRef)}>
          <!--
            An icon
            @required
            @type {Element}
          -->
        </slot>
      </button>
    `;
    }
    #buttonElementRef;
    #defaultSlotElementRef;
};
__decorate([
    property({ attribute: 'aria-controls', reflect: true })
], GlideCoreIconButton.prototype, "ariaControls", void 0);
__decorate([
    property({ attribute: 'aria-expanded', reflect: true })
], GlideCoreIconButton.prototype, "ariaExpanded", void 0);
__decorate([
    property({ attribute: 'aria-haspopup', reflect: true })
], GlideCoreIconButton.prototype, "ariaHasPopup", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], GlideCoreIconButton.prototype, "disabled", void 0);
__decorate([
    property(),
    required
], GlideCoreIconButton.prototype, "label", void 0);
__decorate([
    property({ reflect: true })
], GlideCoreIconButton.prototype, "variant", void 0);
__decorate([
    property({ reflect: true })
], GlideCoreIconButton.prototype, "version", void 0);
GlideCoreIconButton = __decorate([
    customElement('glide-core-icon-button'),
    final
], GlideCoreIconButton);
export default GlideCoreIconButton;
