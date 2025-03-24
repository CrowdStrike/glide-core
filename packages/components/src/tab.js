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
import styles from './tab.styles.js';
import shadowRootMode from './library/shadow-root-mode.js';
import final from './library/final.js';
import required from './library/required.js';
/**
 * @attr {string} panel
 * @attr {boolean} [disabled=false]
 * @attr {boolean} [selected=false]
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {Element | string} - A label
 * @slot {Element} [icon]
 *
 * @fires {Event} selected
 */
let GlideCoreTab = class GlideCoreTab extends LitElement {
    constructor() {
        super(...arguments);
        this.disabled = false;
        this.version = packageJson.version;
        this.#id = nanoid();
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
        const hasChanged = isSelected !== this.#isSelected;
        this.#isSelected = isSelected;
        if (isSelected && hasChanged) {
            this.dispatchEvent(new Event('selected', {
                bubbles: true,
                composed: true,
            }));
        }
    }
    firstUpdated() {
        this.setAttribute('role', 'tab');
        this.id = this.#id;
    }
    render() {
        return html `<div
      class=${classMap({
            component: true,
            disabled: this.disabled,
        })}
    >
      <div class="container">
        <slot name="icon">
          <!--
            @type {Element}
          -->
        </slot>

        <slot>
          <!--
            A label
            @type {Element | string}
          -->
        </slot>
      </div>
    </div> `;
    }
    updated(changes) {
        if (changes.has('selected')) {
            this.setAttribute('aria-selected', this.selected ? 'true' : 'false');
        }
        if (changes.has('disabled')) {
            if (this.disabled) {
                this.setAttribute('aria-disabled', 'true');
                this.setAttribute('tabindex', '-1');
            }
            else {
                this.removeAttribute('aria-disabled');
            }
        }
    }
    #id;
    #isSelected;
};
__decorate([
    property({ reflect: true }),
    required
], GlideCoreTab.prototype, "panel", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], GlideCoreTab.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], GlideCoreTab.prototype, "selected", null);
__decorate([
    property({ reflect: true })
], GlideCoreTab.prototype, "version", void 0);
GlideCoreTab = __decorate([
    customElement('glide-core-tab'),
    final
], GlideCoreTab);
export default GlideCoreTab;
