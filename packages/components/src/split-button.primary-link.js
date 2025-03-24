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
 * @attr {string} url
 * @attr {boolean} [disabled=false]
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {Element} [icon] - An icon before the label
 */
let GlideCoreSplitButtonPrimaryLink = class GlideCoreSplitButtonPrimaryLink extends LitElement {
    constructor() {
        super(...arguments);
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
        if (this.disabled) {
            return html `<span
        aria-disabled="true"
        class=${classMap({
                component: true,
                disabled: true,
                [this.privateVariant]: true,
                [this.privateSize]: true,
            })}
        role="link"
      >
        <slot name="icon">
          <!--
            An icon before the label
            @type {Element}
          -->
        </slot>

        ${this.label}
      </span>`;
        }
        return html `<a
      class=${classMap({
            component: true,
            [this.privateVariant]: true,
            [this.privateSize]: true,
        })}
      data-test="component"
      href=${ifDefined(this.url)}
    >
      <slot name="icon">
        <!-- @type {Element} -->
      </slot>

      ${this.label}
    </a>`;
    }
};
__decorate([
    property({ reflect: true, type: Boolean })
], GlideCoreSplitButtonPrimaryLink.prototype, "disabled", void 0);
__decorate([
    property({ reflect: true }),
    required
], GlideCoreSplitButtonPrimaryLink.prototype, "label", void 0);
__decorate([
    property({ reflect: true }),
    required
], GlideCoreSplitButtonPrimaryLink.prototype, "url", void 0);
__decorate([
    property()
], GlideCoreSplitButtonPrimaryLink.prototype, "privateSize", void 0);
__decorate([
    property()
], GlideCoreSplitButtonPrimaryLink.prototype, "privateVariant", void 0);
__decorate([
    property({ reflect: true })
], GlideCoreSplitButtonPrimaryLink.prototype, "version", void 0);
GlideCoreSplitButtonPrimaryLink = __decorate([
    customElement('glide-core-split-button-primary-link'),
    final
], GlideCoreSplitButtonPrimaryLink);
export default GlideCoreSplitButtonPrimaryLink;
