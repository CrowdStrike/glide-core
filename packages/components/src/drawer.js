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
import styles from './drawer.styles.js';
import assertSlot from './library/assert-slot.js';
import shadowRootMode from './library/shadow-root-mode.js';
import final from './library/final.js';
import required from './library/required.js';
/**
 * @attr {string} label
 * @attr {boolean} [open=false]
 * @attr {boolean} [pinned=false]
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {Element | string} - The content of the drawer
 *
 * @cssprop [--width=27.375rem] - The width the drawer
 *
 * @fires {Event} toggle
 */
let GlideCoreDrawer = class GlideCoreDrawer extends LitElement {
    constructor() {
        super(...arguments);
        this.pinned = false;
        this.version = packageJson.version;
        this.#componentElementRef = createRef();
        this.#defaultSlotElementRef = createRef();
        this.#isOpen = false;
    }
    static { this.shadowRootOptions = {
        ...LitElement.shadowRootOptions,
        mode: shadowRootMode,
    }; }
    static { this.styles = styles; }
    /**
     * @default false
     */
    get open() {
        return this.#isOpen;
    }
    set open(isOpen) {
        const hasChanged = isOpen !== this.#isOpen;
        this.#isOpen = isOpen;
        const duration = window.matchMedia('(prefers-reduced-motion: reduce)')
            .matches
            ? 0
            : 300;
        if (this.#isOpen && hasChanged) {
            this.#closeAnimation?.cancel();
            this.#componentElementRef?.value?.classList?.add('open');
            this.#openAnimation = this.#componentElementRef?.value?.animate({ transform: ['translateX(100%)', 'translateX(0)'] }, {
                duration,
                fill: 'forwards',
                easing: 'cubic-bezier(0.33, 1, 0.68, 1)',
            });
            this.#componentElementRef?.value?.animate({
                opacity: [0, 1],
            }, {
                duration,
                fill: 'forwards',
                easing: 'ease-in',
                composite: 'add',
            });
            this.#openAnimation?.finished.then(() => {
                // We set `tabindex="-1"` and call focus directly based on:
                // https://adrianroselli.com/2020/10/dialog-focus-in-screen-readers.html
                this.#componentElementRef?.value?.focus();
                this.dispatchEvent(new Event('toggle', { bubbles: true, composed: true }));
            });
        }
        else if (hasChanged) {
            this.#openAnimation?.cancel();
            this.#closeAnimation = this.#componentElementRef?.value?.animate({ transform: ['translateX(0)', 'translateX(100%)'] }, {
                duration,
                fill: 'forwards',
                easing: 'cubic-bezier(0.33, 1, 0.68, 1)',
            });
            this.#componentElementRef?.value?.animate({
                opacity: [1, 0],
            }, {
                duration,
                fill: 'forwards',
                composite: 'add',
            });
            this.#closeAnimation?.finished.then(() => {
                this.#componentElementRef.value?.classList?.remove('open');
                this.dispatchEvent(new Event('toggle', { bubbles: true, composed: true }));
            });
        }
    }
    firstUpdated() {
        if (this.#isOpen) {
            this.#componentElementRef?.value?.classList?.add('open');
            // The open state of Drawer relies on styles for transform
            // and opacity. In this case, we don't want an animation to
            // play, but we do need those post-animation styles.
            // Rather than relying on a CSS class to apply the
            // transform and opacity changes, we use JavaScript animations
            // with the duration properties set to 0 so that they apply
            // immediately.
            this.#openAnimation = this.#componentElementRef?.value?.animate({ transform: 'translateX(0)' }, {
                duration: 0,
                fill: 'forwards',
            });
            this.#componentElementRef?.value?.animate({
                opacity: 1,
            }, {
                duration: 0,
                fill: 'forwards',
                composite: 'add',
            });
        }
    }
    render() {
        return html `
      <aside
        aria-label=${ifDefined(this.label)}
        class=${classMap({ component: true, pinned: this.pinned })}
        data-test="component"
        tabindex="-1"
        ${ref(this.#componentElementRef)}
      >
        <slot ${assertSlot()} ${ref(this.#defaultSlotElementRef)}>
          <!--
            The content of the drawer

            @required
            @type {Element | string}
          -->
        </slot>
      </aside>
    `;
    }
    #closeAnimation;
    #componentElementRef;
    #defaultSlotElementRef;
    #isOpen;
    #openAnimation;
};
__decorate([
    property({ reflect: true }),
    required
], GlideCoreDrawer.prototype, "label", void 0);
__decorate([
    property({ reflect: true, type: Boolean })
], GlideCoreDrawer.prototype, "pinned", void 0);
__decorate([
    property({ reflect: true, type: Boolean })
], GlideCoreDrawer.prototype, "open", null);
__decorate([
    property({ reflect: true })
], GlideCoreDrawer.prototype, "version", void 0);
GlideCoreDrawer = __decorate([
    customElement('glide-core-drawer'),
    final
], GlideCoreDrawer);
export default GlideCoreDrawer;
