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
import packageJson from '../package.json' with { type: 'json' };
import GlideCoreButtonGroupButton from './button-group.button.js';
import styles from './button-group.styles.js';
import assertSlot from './library/assert-slot.js';
import shadowRootMode from './library/shadow-root-mode.js';
import final from './library/final.js';
import required from './library/required.js';
/**
 * @attr {string} label
 * @attr {'horizontal'|'vertical'} [orientation='horizontal']
 * @attr {'icon-only'} [variant]
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {GlideCoreButtonGroupButton}
 */
let GlideCoreButtonGroup = class GlideCoreButtonGroup extends LitElement {
    constructor() {
        super(...arguments);
        this.version = packageJson.version;
        this.#orientation = 'horizontal';
        this.#slotElementRef = createRef();
    }
    static { this.shadowRootOptions = {
        ...LitElement.shadowRootOptions,
        mode: shadowRootMode,
    }; }
    static { this.styles = styles; }
    /**
     * @default undefined
     */
    get variant() {
        return this.#variant;
    }
    set variant(variant) {
        for (const button of this.#buttonElements) {
            button.privateVariant = variant;
        }
        this.#variant = variant;
    }
    /**
     * @default 'horizontal'
     */
    get orientation() {
        return this.#orientation;
    }
    set orientation(orientation) {
        for (const button of this.#buttonElements) {
            button.privateOrientation = orientation;
        }
        this.#orientation = orientation;
    }
    render() {
        return html `
      <div
        class=${classMap({
            component: true,
            horizontal: this.orientation === 'horizontal',
            vertical: this.orientation === 'vertical',
        })}
      >
        <div class="label" id="label" data-test="label">${this.label}</div>

        <div
          aria-labelledby="label"
          role="radiogroup"
          class=${classMap({
            container: true,
            vertical: this.orientation === 'vertical',
        })}
        >
          <slot
            @click=${this.#onSlotClick}
            @keydown=${this.#onSlotKeydown}
            @private-selected=${this.#onSlotSelected}
            @slotchange=${this.#onSlotChange}
            ${assertSlot([GlideCoreButtonGroupButton])}
            ${ref(this.#slotElementRef)}
          >
            <!--
              @required
              @type {GlideCoreButtonGroupButton}
            -->
          </slot>
        </div>
      </div>
    `;
    }
    #orientation;
    #slotElementRef;
    #variant;
    get #buttonElements() {
        return [...this.querySelectorAll('glide-core-button-group-button')];
    }
    #onSlotChange() {
        const isButtonAlreadySelected = this.#buttonElements.find(({ disabled, selected }) => !disabled && selected);
        if (!isButtonAlreadySelected) {
            const firstEnabledButton = this.#buttonElements.find(({ disabled }) => !disabled);
            if (firstEnabledButton) {
                firstEnabledButton.selected = true;
            }
        }
        for (const button of this.#buttonElements) {
            button.privateVariant = this.variant;
            if (this.orientation) {
                button.privateOrientation = this.orientation;
            }
        }
    }
    // This handler could just as well go in Button Group Button. It's here for
    // consistency, so that Button Group alone manages the state of `selected`.
    #onSlotClick(event) {
        if (event.target instanceof HTMLElement) {
            const button = event.target.closest('glide-core-button-group-button');
            // Guards against `button.selected` to prevent duplicate "change" and
            // "input" events.
            if (button && !button.disabled && !button.selected) {
                button.privateSelect();
            }
        }
    }
    #onSlotKeydown(event) {
        const selectedButtonElement = this.querySelector('glide-core-button-group-button[selected]');
        switch (event.key) {
            case 'ArrowUp':
            case 'ArrowLeft': {
                // Prevent page scroll.
                event.preventDefault();
                let previousButton = selectedButtonElement?.previousElementSibling ??
                    this.#buttonElements.at(-1);
                while (previousButton instanceof GlideCoreButtonGroupButton) {
                    if (previousButton.disabled) {
                        previousButton =
                            previousButton.previousElementSibling ??
                                this.#buttonElements.at(-1);
                    }
                    else {
                        break;
                    }
                }
                if (previousButton instanceof GlideCoreButtonGroupButton) {
                    previousButton.privateSelect();
                }
                break;
            }
            case 'ArrowDown':
            case 'ArrowRight': {
                // Prevent page scroll.
                event.preventDefault();
                let nextButton = selectedButtonElement?.nextElementSibling ??
                    this.#buttonElements.at(0);
                while (nextButton instanceof GlideCoreButtonGroupButton) {
                    if (nextButton.disabled) {
                        nextButton =
                            nextButton.nextElementSibling ?? this.#buttonElements.at(0);
                    }
                    else {
                        break;
                    }
                }
                if (nextButton instanceof GlideCoreButtonGroupButton) {
                    nextButton.privateSelect();
                }
                break;
            }
            // This is specifically so the VoiceOver user can select and deselect buttons. Normally
            // only the selected button is tabbable. But VoiceOver can programmatically focus anything
            // with a `tabindex`.
            case ' ': {
                // Prevent page scroll.
                event.preventDefault();
                if (event.target instanceof HTMLElement) {
                    const button = event.target.closest('glide-core-button-group-button');
                    if (button && !button.disabled && !button.selected) {
                        button.privateSelect();
                    }
                }
                break;
            }
        }
    }
    #onSlotSelected(event) {
        // Guards against the button not being selected so an event for every
        // deselected button isn't dispatched.
        if (event.target instanceof GlideCoreButtonGroupButton &&
            event.target.selected) {
            for (const button of this.#buttonElements) {
                if (button !== event.target) {
                    button.selected = false;
                }
            }
            event.target.focus();
        }
    }
};
__decorate([
    property({ reflect: true }),
    required
], GlideCoreButtonGroup.prototype, "label", void 0);
__decorate([
    property({ reflect: true })
], GlideCoreButtonGroup.prototype, "variant", null);
__decorate([
    property({ reflect: true })
], GlideCoreButtonGroup.prototype, "orientation", null);
__decorate([
    property({ reflect: true })
], GlideCoreButtonGroup.prototype, "version", void 0);
GlideCoreButtonGroup = __decorate([
    customElement('glide-core-button-group'),
    final
], GlideCoreButtonGroup);
export default GlideCoreButtonGroup;
