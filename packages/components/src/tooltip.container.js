var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { nanoid } from 'nanoid';
import { classMap } from 'lit/directives/class-map.js';
import { map } from 'lit/directives/map.js';
import styles from './tooltip.container.styles.js';
import shadowRootMode from './library/shadow-root-mode.js';
import final from './library/final.js';
// This component exists because Tooltip's target and its tooltip both need to
// be in the light DOM so the `aria-describedby` on its target can be associated
// with the ID it references. Tooltip adds this element to its light DOM and then
// associates it with its target.
//
// One alternative solution is to ask consumers to add this component to Tooltip's
// default slot. But that would be additional work for them and would be a less
// natural API because consumers would pass `label`, `shortcut`, and other attributes
// to Tooltip Container instead of Tooltip.
//
// Another is to require that consumers always wrap their default slot content
// in an element, such as `<div>`. But an apparently stray `<div>` in our Storybook
// code example would beget questions or may be removed by the consumer after copying
// the code, resulting in an error from Tooltip and frustration.
//
// The latter solution would also prevent us from restricting allowed content by using
// an attribute (`label`). We'd be forced to allow arbitrary content via a slot.
/**
 * @attr {boolean} [disabled=false]
 * @attr {string} [label]
 * @attr {'bottom'|'left'|'right'|'top'} [placement]
 * @attr {boolean} [screenreader-hidden=false]
 * @attr {string[]} [shortcut=[]]
 */
let GlideCoreTooltipContainer = class GlideCoreTooltipContainer extends LitElement {
    constructor() {
        super(...arguments);
        this.screenreaderHidden = false;
        this.shortcut = [];
        this.#isDisabled = false;
    }
    static { this.shadowRootOptions = {
        ...LitElement.shadowRootOptions,
        mode: shadowRootMode,
    }; }
    static { this.styles = styles; }
    /**
     * @default false
     */
    get disabled() {
        return this.#isDisabled;
    }
    set disabled(isDisabled) {
        this.#isDisabled = isDisabled;
        this.role = isDisabled || this.screenreaderHidden ? 'none' : 'tooltip';
    }
    connectedCallback() {
        super.connectedCallback();
        this.id = nanoid();
        this.role = this.role =
            this.disabled || this.screenreaderHidden ? 'none' : 'tooltip';
        this.slot = 'private';
    }
    render() {
        return html `
      <div
        aria-hidden=${this.screenreaderHidden}
        class=${classMap({
            component: true,
            reversed: this.placement === 'left',
        })}
      >
        <div class="label">${this.label}</div>

        <kbd
          class=${classMap({
            shortcut: true,
            reversed: this.placement === 'left',
            visible: this.shortcut.length > 0,
        })}
          data-test="shortcut"
        >
          ${this.shortcut.length === 1
            ? this.shortcut.at(0)
            : map(this.shortcut, (shortcut, index) => {
                return html `
                  <kbd>${shortcut}</kbd>
                  ${index === this.shortcut.length - 1 ? '' : ' + '}
                `;
            })}
        </kbd>
      </div>
    `;
    }
    #isDisabled;
};
__decorate([
    property({ type: Boolean })
], GlideCoreTooltipContainer.prototype, "disabled", null);
__decorate([
    property()
], GlideCoreTooltipContainer.prototype, "label", void 0);
__decorate([
    property()
], GlideCoreTooltipContainer.prototype, "placement", void 0);
__decorate([
    property({ attribute: 'screenreader-hidden', type: Boolean })
], GlideCoreTooltipContainer.prototype, "screenreaderHidden", void 0);
__decorate([
    property({ type: Array })
], GlideCoreTooltipContainer.prototype, "shortcut", void 0);
GlideCoreTooltipContainer = __decorate([
    customElement('glide-core-private-tooltip-container'),
    final
], GlideCoreTooltipContainer);
export default GlideCoreTooltipContainer;
