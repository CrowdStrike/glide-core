var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
import packageJson from '../package.json' with { type: 'json' };
import chevronIcon from './icons/chevron.js';
import styles from './accordion.styles.js';
import assertSlot from './library/assert-slot.js';
import shadowRootMode from './library/shadow-root-mode.js';
import final from './library/final.js';
import required from './library/required.js';
/**
 * @attr {string} label
 * @attr {boolean} [open=false]
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {Element | string} - The content of the accordion
 * @slot {Element} [prefix-icon] - An icon before the label
 * @slot {Element} [suffix-icons] - Icons after the label
 *
 * @fires {Event} toggle
 */
let GlideCoreAccordion = class GlideCoreAccordion extends LitElement {
    constructor() {
        super(...arguments);
        this.version = packageJson.version;
        this.hasPrefixIcon = false;
        this.hasSuffixIcons = false;
        this.isClosing = false;
        this.#defaultSlotElementRef = createRef();
        this.#detailsElementRef = createRef();
        this.#isOpen = false;
        this.#prefixIconSlotElementRef = createRef();
        this.#suffixIconsSlotElementRef = createRef();
        this.#summaryElementRef = createRef();
    }
    static { this.shadowRootOptions = {
        ...LitElement.shadowRootOptions,
        delegatesFocus: true,
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
        const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (isReducedMotion && hasChanged && this.#detailsElementRef.value) {
            this.#detailsElementRef.value.open = isOpen;
            this.dispatchEvent(new Event('toggle', { bubbles: true, composed: true }));
            return;
        }
        if (isOpen && hasChanged) {
            // Wait for `.summary` to re-render after the "active" class addition to
            // prevent animation jank, especially in Firefox and Safari.
            this.updateComplete.then(() => {
                if (this.#detailsElementRef.value &&
                    this.#defaultSlotElementRef.value) {
                    const bottomPadding = Number.parseFloat(getComputedStyle(this.#defaultSlotElementRef.value)?.paddingBottom);
                    this.#detailsElementRef.value.open = true;
                    this.#defaultSlotElementRef.value
                        .animate({
                        height: [
                            '0px',
                            `${this.#defaultSlotElementRef.value.offsetHeight -
                                bottomPadding}px`,
                        ],
                        opacity: [0, 1],
                    }, {
                        duration: 150,
                        easing: 'ease-in',
                    })
                        .addEventListener('finish', () => {
                        if (this.#detailsElementRef.value) {
                            this.dispatchEvent(new Event('toggle', { bubbles: true, composed: true }));
                        }
                    });
                }
            });
        }
        else if (hasChanged) {
            this.isClosing = true;
            if (this.#defaultSlotElementRef.value) {
                const bottomPadding = Number.parseFloat(getComputedStyle(this.#defaultSlotElementRef.value)?.paddingBottom);
                this.#defaultSlotElementRef.value
                    .animate({
                    height: [
                        `${this.#defaultSlotElementRef.value.offsetHeight - bottomPadding}px`,
                        '0px',
                    ],
                    opacity: [1, 0],
                }, {
                    duration: 100,
                    easing: 'ease-out',
                })
                    .addEventListener('finish', () => {
                    if (this.#detailsElementRef.value) {
                        this.#detailsElementRef.value.open = false;
                        this.isClosing = false;
                        this.dispatchEvent(new Event('toggle', { bubbles: true, composed: true }));
                    }
                });
            }
        }
    }
    click() {
        this.#summaryElementRef.value?.click();
    }
    render() {
        return html `<details class="component" ${ref(this.#detailsElementRef)}>
      <summary
        class=${classMap({
            summary: true,
            active: this.open || this.isClosing,
            open: this.open,
        })}
        data-test="summary"
        @click=${this.#onSummaryClick}
        ${ref(this.#summaryElementRef)}
      >
        ${chevronIcon}

        <div class="label-container">
          <slot
            class="prefix-icon-slot"
            name="prefix-icon"
            @slotchange=${this.#onPrefixIconSlotChange}
            ${ref(this.#prefixIconSlotElementRef)}
          >
            <!--
              An icon before the label
              @type {Element}
            -->
          </slot>

          <span class="label">${this.label}</span>
        </div>

        <slot
          class=${classMap({
            'suffix-icons-slot': true,
            icons: this.hasSuffixIcons,
        })}
          name="suffix-icons"
          @slotchange=${this.#onSuffixIconsSlotChange}
          ${ref(this.#suffixIconsSlotElementRef)}
        >
          <!--
            Icons after the label
            @type {Element}
          -->
        </slot>
      </summary>

      <slot
        class=${classMap({
            'default-slot': true,
            indented: this.hasPrefixIcon,
        })}
        data-test="default-slot"
        ${assertSlot()}
        ${ref(this.#defaultSlotElementRef)}
      >
        <!--
          The content of the accordion

          @required
          @type {Element | string}
        -->
      </slot>
    </details>`;
    }
    #defaultSlotElementRef;
    #detailsElementRef;
    #isOpen;
    #prefixIconSlotElementRef;
    #suffixIconsSlotElementRef;
    #summaryElementRef;
    #onPrefixIconSlotChange() {
        const assignedNodes = this.#prefixIconSlotElementRef.value?.assignedNodes();
        this.hasPrefixIcon = Boolean(assignedNodes && assignedNodes.length > 0);
    }
    #onSuffixIconsSlotChange() {
        const assignedNodes = this.#suffixIconsSlotElementRef.value?.assignedNodes();
        this.hasSuffixIcons = Boolean(assignedNodes && assignedNodes.length > 0);
    }
    #onSummaryClick(event) {
        // Canceling it prevents `details` from immediately showing and hiding
        // the default slot on open and close, letting us animate it when we're ready.
        event.preventDefault();
        this.open = !this.open;
    }
};
__decorate([
    property({ reflect: true }),
    required
], GlideCoreAccordion.prototype, "label", void 0);
__decorate([
    property({ reflect: true, type: Boolean })
], GlideCoreAccordion.prototype, "open", null);
__decorate([
    property({ reflect: true })
], GlideCoreAccordion.prototype, "version", void 0);
__decorate([
    state()
], GlideCoreAccordion.prototype, "hasPrefixIcon", void 0);
__decorate([
    state()
], GlideCoreAccordion.prototype, "hasSuffixIcons", void 0);
__decorate([
    state()
], GlideCoreAccordion.prototype, "isClosing", void 0);
GlideCoreAccordion = __decorate([
    customElement('glide-core-accordion'),
    final
], GlideCoreAccordion);
export default GlideCoreAccordion;
