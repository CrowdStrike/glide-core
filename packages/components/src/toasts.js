var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property } from 'lit/decorators.js';
import packageJson from '../package.json' with { type: 'json' };
import { LocalizeController } from './library/localize.js';
import styles from './toasts.styles.js';
import shadowRootMode from './library/shadow-root-mode.js';
import final from './library/final.js';
import GlideCoreToast from './toasts.toast.js';
/**
 * @readonly
 * @attr {string} [version]
 *
 * @method add
 * @param {{
 *     label: string;
 *     description: string;
 *     variant: 'error' | 'informational' | 'success';
 *     duration?: number; // Defaults to 5000. Set to `Infinity` to make the toast persist until dismissed.
 *   }} toast
 * @returns GlideCoreToast
 */
let GlideCoreToasts = class GlideCoreToasts extends LitElement {
    constructor() {
        super(...arguments);
        this.version = packageJson.version;
        this.#componentElementRef = createRef();
        this.#localize = new LocalizeController(this);
    }
    static { this.shadowRootOptions = {
        ...LitElement.shadowRootOptions,
        mode: shadowRootMode,
    }; }
    static { this.styles = styles; }
    add(toast) {
        const { variant, label, description, duration } = toast;
        const toastElement = Object.assign(document.createElement('glide-core-toast'), {
            variant,
            label,
            description,
            duration,
        });
        if (this.#componentElementRef.value) {
            this.#componentElementRef.value.popover = 'manual';
            this.#componentElementRef.value.showPopover();
            this.#componentElementRef.value.append(toastElement);
        }
        toastElement.addEventListener('close', () => {
            toastElement.remove();
            if (this.#componentElementRef.value?.querySelectorAll('glide-core-toast')
                .length === 0) {
                this.#componentElementRef.value?.hidePopover();
            }
        }, { once: true });
        return toastElement;
    }
    render() {
        return html `
      <div
        class="component"
        data-test="component"
        role="region"
        tabindex="-1"
        aria-label=${this.#localize.term('notifications')}
        ${ref(this.#componentElementRef)}
      ></div>
    `;
    }
    #componentElementRef;
    #localize;
};
__decorate([
    property({ reflect: true })
], GlideCoreToasts.prototype, "version", void 0);
GlideCoreToasts = __decorate([
    customElement('glide-core-toasts'),
    final
], GlideCoreToasts);
export default GlideCoreToasts;
