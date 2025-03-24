var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import packageJson from '../package.json' with { type: 'json' };
import styles from './split-button.primary-button.styles.js';
import shadowRootMode from './library/shadow-root-mode.js';
import final from './library/final.js';
import required from './library/required.js';
/**
 * @attr {string} label
 * @attr {string|null} [aria-controls=null]
 * @attr {'true'|'false'|null} [aria-expanded=null]
 * @attr {'true'|'false'|'menu'|'listbox'|'tree'|'grid'|'dialog'|null} [aria-haspopup=null]
 * @attr {boolean} [disabled=false]
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {Element} [icon] - An icon before the label
 */
let GlideCoreSplitButtonPrimaryButton = class GlideCoreSplitButtonPrimaryButton extends LitElement {
    constructor() {
        super(...arguments);
        this.ariaControls = null;
        this.ariaExpanded = null;
        this.ariaHasPopup = null;
        this.disabled = false;
        this.privateSize = 'large';
        this.privateVariant = 'primary';
        this.version = packageJson.version;
    }
    static { this.shadowRootOptions = {
        ...LitElement.shadowRootOptions,
        delegatesFocus: true,
        mode: shadowRootMode,
    }; }
    static { this.styles = styles; }
    render() {
        return html `<button
      aria-controls=${ifDefined(this.ariaControls ?? undefined)}
      aria-expanded=${ifDefined(this.ariaExpanded ?? undefined)}
      aria-haspopup=${ifDefined(this.ariaHasPopup ?? undefined)}
      class=${classMap({
            component: true,
            disabled: this.disabled,
            [this.privateVariant]: true,
            [this.privateSize]: true,
        })}
      data-test="component"
      type="button"
      ?disabled=${this.disabled}
    >
      <slot name="icon">
        <!-- 
          An icon before the label
          @type {Element}
        -->
      </slot>

      ${this.label}
    </button>`;
    }
};
__decorate([
    property({ attribute: 'aria-controls', reflect: true })
], GlideCoreSplitButtonPrimaryButton.prototype, "ariaControls", void 0);
__decorate([
    property({ attribute: 'aria-expanded', reflect: true })
], GlideCoreSplitButtonPrimaryButton.prototype, "ariaExpanded", void 0);
__decorate([
    property({ attribute: 'aria-haspopup', reflect: true })
], GlideCoreSplitButtonPrimaryButton.prototype, "ariaHasPopup", void 0);
__decorate([
    property({ reflect: true, type: Boolean })
], GlideCoreSplitButtonPrimaryButton.prototype, "disabled", void 0);
__decorate([
    property({ reflect: true }),
    required
], GlideCoreSplitButtonPrimaryButton.prototype, "label", void 0);
__decorate([
    property()
], GlideCoreSplitButtonPrimaryButton.prototype, "privateSize", void 0);
__decorate([
    property()
], GlideCoreSplitButtonPrimaryButton.prototype, "privateVariant", void 0);
__decorate([
    property({ reflect: true })
], GlideCoreSplitButtonPrimaryButton.prototype, "version", void 0);
GlideCoreSplitButtonPrimaryButton = __decorate([
    customElement('glide-core-split-button-primary-button'),
    final
], GlideCoreSplitButtonPrimaryButton);
export default GlideCoreSplitButtonPrimaryButton;
