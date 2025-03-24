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
import styles from './tab.panel.styles.js';
import shadowRootMode from './library/shadow-root-mode.js';
import final from './library/final.js';
import required from './library/required.js';
/**
 * @attr {string} name - The corresponding GlideCoreTab should have a `panel` attribute with this name
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {Element | string} - The content of the panel
 *
 * @cssprop [--padding-inline-end=0rem]
 * @cssprop [--padding-inline-start=0rem]
 */
let GlideCoreTabPanel = class GlideCoreTabPanel extends LitElement {
    constructor() {
        super(...arguments);
        this.version = packageJson.version;
        this.#id = nanoid();
        this.#isSelected = false;
    }
    static { this.shadowRootOptions = {
        ...LitElement.shadowRootOptions,
        mode: shadowRootMode,
    }; }
    static { this.styles = styles; }
    // Private because it's only meant to be used by Tab Group.
    get privateIsSelected() {
        return this.#isSelected;
    }
    set privateIsSelected(isSelected) {
        this.setAttribute('aria-hidden', isSelected ? 'false' : 'true');
        this.#isSelected = isSelected;
    }
    firstUpdated() {
        this.setAttribute('role', 'tabpanel');
        this.id = this.#id;
    }
    render() {
        return html `<div
      class=${classMap({
            component: true,
            hidden: !this.privateIsSelected,
            selected: this.privateIsSelected,
        })}
      data-test="tab-panel"
    >
      <slot>
        <!--
          The content of the panel
          @type {Element | string}
        -->
      </slot>
    </div>`;
    }
    #id;
    #isSelected;
};
__decorate([
    property({ reflect: true }),
    required
], GlideCoreTabPanel.prototype, "name", void 0);
__decorate([
    property({ type: Boolean })
], GlideCoreTabPanel.prototype, "privateIsSelected", null);
__decorate([
    property({ reflect: true })
], GlideCoreTabPanel.prototype, "version", void 0);
GlideCoreTabPanel = __decorate([
    customElement('glide-core-tab-panel'),
    final
], GlideCoreTabPanel);
export default GlideCoreTabPanel;
