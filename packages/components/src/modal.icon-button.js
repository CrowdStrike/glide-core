var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import './icon-button.js';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import packageJson from '../package.json' with { type: 'json' };
import styles from './modal.icon-button.styles.js';
import assertSlot from './library/assert-slot.js';
import shadowRootMode from './library/shadow-root-mode.js';
import final from './library/final.js';
import required from './library/required.js';
/**
 * @attr {string} label
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {Element} - An icon
 */
let GlideCoreModalIconButton = class GlideCoreModalIconButton extends LitElement {
    constructor() {
        super(...arguments);
        this.version = packageJson.version;
    }
    static { this.shadowRootOptions = {
        ...LitElement.shadowRootOptions,
        mode: shadowRootMode,
    }; }
    static { this.styles = styles; }
    render() {
        return html `
      <glide-core-icon-button label=${ifDefined(this.label)} variant="tertiary">
        <slot ${assertSlot()}>
          <!-- 
            An icon
            @required
            @type {Element}
          -->
        </slot>
      </glide-core-icon-button>
    `;
    }
};
__decorate([
    property(),
    required
], GlideCoreModalIconButton.prototype, "label", void 0);
__decorate([
    property({ reflect: true })
], GlideCoreModalIconButton.prototype, "version", void 0);
GlideCoreModalIconButton = __decorate([
    customElement('glide-core-modal-icon-button'),
    final
], GlideCoreModalIconButton);
export default GlideCoreModalIconButton;
