var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import './checkbox.js';
import './tooltip.js';
import { html, LitElement } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
import { nanoid } from 'nanoid';
import { when } from 'lit/directives/when.js';
import packageJson from '../package.json' with { type: 'json' };
import checkedIcon from './icons/checked.js';
import pencilIcon from './icons/pencil.js';
import styles from './dropdown.option.styles.js';
import shadowRootMode from './library/shadow-root-mode.js';
import final from './library/final.js';
import required from './library/required.js';
/**
 * @attr {string} label
 * @attr {boolean} [disabled=false]
 * @attr {boolean} [editable=false]
 * @attr {boolean} [selected=false]
 * @attr {string} [value='']
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {Element} [icon] - An icon before the label
 *
 * @fires {Event} edit
 */
let GlideCoreDropdownOption = class GlideCoreDropdownOption extends LitElement {
    constructor() {
        super(...arguments);
        // Private because it's only meant to be used by Dropdown.
        this.privateIndeterminate = false;
        // Private because it's only meant to be used by Dropdown.
        this.privateIsEditActive = false;
        // Private because it's only meant to be used by Dropdown.
        this.privateMultiple = false;
        // Private because it's only meant to be used by Dropdown.
        this.privateSize = 'large';
        // An option is considered active when it's interacted with via keyboard or hovered.
        // Used by Dropdown.
        this.privateActive = false;
        this.privateIsTooltipOpen = false;
        this.version = packageJson.version;
        this.isLabelOverflow = false;
        this.#checkboxElementRef = createRef();
        this.#componentElementRef = createRef();
        // Established here instead of in `connectedCallback` so the ID remains
        // constant even if this component is removed and re-added to the DOM.
        // If it's not constant, Dropdown's `aria-activedescendant` will immediately
        // point to a non-existent ID when this component is re-added. An edge case
        // for sure. But one we can protect against with little effort.
        this.#id = nanoid();
        this.#isDisabled = false;
        this.#isEditable = false;
        this.#labelElementRef = createRef();
        this.#selected = false;
        this.#value = '';
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
        this.role = isDisabled ? 'none' : 'option';
        this.#isDisabled = isDisabled;
    }
    /**
     * @default false
     */
    get editable() {
        return this.#isEditable;
    }
    set editable(isEditable) {
        this.#isEditable = isEditable;
        this.dispatchEvent(new Event('private-editable-change', {
            bubbles: true,
        }));
    }
    /**
     * @default undefined
     */
    get label() {
        return this.#label;
    }
    set label(label) {
        this.#label = label;
        // Wait for the label to render. A rerender won't be scheduled by Lit
        // until after this setter finishes. So awaiting `this.updateComplete`
        // won't fly.
        setTimeout(() => {
            this.#updateLabelOverflow();
        });
        this.dispatchEvent(new Event('private-label-change', {
            bubbles: true,
        }));
    }
    /**
     * @default false
     */
    get selected() {
        return this.#selected;
    }
    set selected(isSelected) {
        this.#selected = isSelected;
        this.ariaSelected = isSelected.toString();
        if (this.isMultiple && this.#checkboxElementRef.value) {
            this.#checkboxElementRef.value.checked = isSelected;
        }
        // Prefixed with "private" because Dropdown uses it internally, to track the set of
        // selected options in the case of multiselect. Dropdown itself then dispatches in
        // response to this event a "change" event after updating its `this.value`.
        this.dispatchEvent(new Event('private-selected-change', { bubbles: true }));
    }
    get isMultiple() {
        // The soonest Dropdown can set `this.privateMultiple` is in its `firstUpdated`.
        // By then, however, this component has has already completed its initial render. So
        // we fall sadly back to `this.closest('glide-core-dropdown')`. `this.privateMultiple`
        // is still useful for when Dropdown's `this.multiple` is set programmatically.
        return (this.privateMultiple || this.closest('glide-core-dropdown')?.multiple);
    }
    get lastSelectedOption() {
        return this.#optionElements.findLast((option) => option.selected);
    }
    click() {
        if (this.privateMultiple) {
            this.#checkboxElementRef.value?.click();
        }
        else {
            this.#componentElementRef.value?.click();
        }
    }
    connectedCallback() {
        super.connectedCallback();
        // On the host instead of inside the shadow DOM so screenreaders can find this
        // ID when it's assigned to `aria-activedescendant` in Dropdown itself.
        this.id = this.#id;
        // These three are likewise on the host due to `aria-activedescendant`. The active
        // descendant must be the element with `ariaSelected` and `role`, and also has
        // to be programmatically focusable.
        this.ariaSelected = this.selected.toString();
        this.role = this.disabled ? 'none' : 'option';
        this.tabIndex = -1;
        // Options are arbitrarily shown and hidden when Dropdown is opened and closed. So
        // calling `#updateLabelOverflow` in the `label` setter isn't sufficient because
        // the label's `scrollWidth` and `clientWidth` will both be zero until Dropdown
        // is open. So, rather than expose a pseudo-private method for Dropdown to call
        // on open, Dropdown Option simply monitors its own visibility.
        this.#intersectionObserver = new IntersectionObserver(() => {
            if (this.checkVisibility()) {
                this.#updateLabelOverflow();
            }
        });
        this.#intersectionObserver.observe(this);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.#intersectionObserver?.disconnect();
    }
    firstUpdated() {
        if (this.#checkboxElementRef.value) {
            this.#checkboxElementRef.value.checked = this.selected;
        }
    }
    /**
     * @default ''
     */
    get value() {
        return this.#value;
    }
    set value(value) {
        // `this.value` can be set programmatically. Dropdown needs to know when that
        // happens so it can update its own `this.value`.
        this.dispatchEvent(new CustomEvent('private-value-change', {
            bubbles: true,
            // Without knowing what the old value was, Dropdown would be unable to find the
            // value in its `this.value` array and remove it.
            detail: {
                old: this.value,
                new: value,
            },
        }));
        this.#value = value;
    }
    privateEdit() {
        this.dispatchEvent(new Event('edit', { bubbles: true, composed: true }));
    }
    async privateUpdateCheckbox() {
        // Hacky indeed. This is for the case where Dropdown is set programmatically
        // from a single to a multiselect. `this.isMultiple` is set to `true` but
        // `this.#checkboxElementRef.value` in the `multiple` setter is `undefined`
        // because this component hasn't had a chance to rerender. So we wait for it
        // to rerender then update the checkbox to match `this.selected`. Halp!
        await this.updateComplete;
        if (this.#checkboxElementRef.value) {
            this.#checkboxElementRef.value.checked = this.selected;
        }
    }
    render() {
        // The linter wants a keyboard handler. There's one on Dropdown itself. It's there
        // because options aren't focusable and thus don't produce keyboard events when Dropdown
        // is filterable.
        return html `<div
      class=${classMap({
            component: true,
            active: this.privateActive,
            disabled: this.disabled,
            [this.privateSize]: true,
        })}
      data-test="component"
      ${ref(this.#componentElementRef)}
    >
      ${when(this.isMultiple, () => {
            return html `
            <glide-core-checkbox
              class=${classMap({
                checkbox: true,
                editable: this.editable,
                [this.privateSize]: true,
            })}
              data-test="checkbox"
              label=${this.label ?? ''}
              tabindex="-1"
              private-label-tooltip-offset=${12}
              private-size=${this.privateSize}
              private-variant="minimal"
              value=${this.value}
              @click=${this.#onCheckboxClick}
              private-internally-inert
              ?disabled=${this.disabled}
              ?indeterminate=${this.privateIndeterminate}
              ?private-show-label-tooltip=${this.privateIsTooltipOpen}
              ?private-disable-label-tooltip=${this.disabled}
              ${ref(this.#checkboxElementRef)}
            >
              <slot
                class=${classMap({
                'checkbox-icon-slot': true,
                [this.privateSize]: true,
            })}
                name="icon"
                slot="private-icon"
              >
                <!--
                  An icon before the label
                  @type {Element}
                -->
              </slot>
            </glide-core-checkbox>

            ${when(this.editable, () => {
                return html `<button
                class=${classMap({
                    'edit-button': true,
                    active: this.privateIsEditActive,
                    disabled: this.disabled,
                    multiple: Boolean(this.isMultiple),
                    [this.privateSize]: true,
                })}
                data-test="edit-button"
                type="button"
                @mouseover=${this.#onEditButtonMouseover}
                @mouseout=${this.#onEditButtonMouseout}
              >
                ${pencilIcon}
              </button>`;
            })}
          `;
        }, () => {
            return html `
          <div class=${classMap({
                option: true,
                disabled: this.disabled,
                editable: this.editable,
                [this.privateSize]: true,
            })}
          >
              <slot class=${classMap({
                'icon-slot': true,
                [this.privateSize]: true,
            })} name="icon">
              <!--
                An icon before the label
                @type {Element}
              -->
            </slot>

              <glide-core-tooltip
                class="tooltip"
                data-test="tooltip"
                label=${ifDefined(this.label)}
                offset=${10}
                ?disabled=${!this.isLabelOverflow || this.disabled}
                ?open=${this.privateIsTooltipOpen}
                screenreader-hidden
                @toggle=${this.#onTooltipToggle}>

                <div class="label" data-test="label" slot="target" ${ref(this.#labelElementRef)}>
                  ${this.label}
                </div>
              </glide-core-tooltip>

              ${when(this.selected && this === this.lastSelectedOption, () => {
                return html `<div
                  class="checked-icon-container"
                  data-test="checked-icon-container"
                >
                  ${checkedIcon}
                </div>`;
            })}

              ${when(this.editable, () => {
                return html `<button
                  class=${classMap({
                    'edit-button': true,
                    active: this.privateActive && this.privateIsEditActive,
                    disabled: this.disabled,
                    [this.privateSize]: true,
                })}
                  data-test="edit-button"
                  type="button"
                  @mouseover=${this.#onEditButtonMouseover}
                  @mouseout=${this.#onEditButtonMouseout}
                >
                  ${pencilIcon}
                </button>`;
            })}
            </div>
          </div>`;
        })}
    </div> `;
    }
    #checkboxElementRef;
    #componentElementRef;
    // Established here instead of in `connectedCallback` so the ID remains
    // constant even if this component is removed and re-added to the DOM.
    // If it's not constant, Dropdown's `aria-activedescendant` will immediately
    // point to a non-existent ID when this component is re-added. An edge case
    // for sure. But one we can protect against with little effort.
    #id;
    #intersectionObserver;
    #isDisabled;
    #isEditable;
    #label;
    #labelElementRef;
    #selected;
    #value;
    get #optionElements() {
        const elements = this.closest('glide-core-dropdown')?.querySelectorAll('glide-core-dropdown-option') ?? [];
        return [...elements];
    }
    #onCheckboxClick(event) {
        // Form controls emit two events when their labels are clicked: one from the
        // label, another from the control. Letting these events propagate would mean
        // Dropdown receiving multiple "click" events and thus dispatching multiple
        // "change" and "input" events.
        //
        // This is also why Dropdown listens for "input" when multiselect and "click"
        // when single-select.
        event.stopPropagation();
    }
    #onEditButtonMouseout() {
        // A simple `:hover:` selector would be nice. But Dropdown needs to know if the
        // button is active to decide what to do when the user is arrowing, among other
        // things.
        this.privateIsEditActive = false;
    }
    #onEditButtonMouseover() {
        this.privateIsEditActive = true;
    }
    #onTooltipToggle(event) {
        // Dropdown dispatches its own "toggle" event. Letting Tooltip's "toggle"
        // propagate would mean that consumers listening for the event on Dropdown
        // would have to filter it out when it comes from Tooltip. But first they'll
        // probably file a bug. It's likely no consumer will be interested in knowing
        // when this component's Tooltip is open. So it's probably best to stop the
        // event from propagating.
        event.stopPropagation();
    }
    #updateLabelOverflow() {
        if (this.#labelElementRef.value) {
            this.isLabelOverflow =
                this.#labelElementRef.value.scrollWidth >
                    this.#labelElementRef.value.clientWidth;
        }
    }
};
__decorate([
    property({ reflect: true, type: Boolean })
], GlideCoreDropdownOption.prototype, "disabled", null);
__decorate([
    property({ reflect: true, type: Boolean })
], GlideCoreDropdownOption.prototype, "editable", null);
__decorate([
    property({ reflect: true }),
    required
], GlideCoreDropdownOption.prototype, "label", null);
__decorate([
    property({ attribute: 'private-indeterminate', type: Boolean })
], GlideCoreDropdownOption.prototype, "privateIndeterminate", void 0);
__decorate([
    property({ type: Boolean })
], GlideCoreDropdownOption.prototype, "privateIsEditActive", void 0);
__decorate([
    property({ attribute: 'private-multiple', type: Boolean })
], GlideCoreDropdownOption.prototype, "privateMultiple", void 0);
__decorate([
    property({ reflect: true, type: Boolean })
], GlideCoreDropdownOption.prototype, "selected", null);
__decorate([
    property({ attribute: 'private-size', reflect: true })
], GlideCoreDropdownOption.prototype, "privateSize", void 0);
__decorate([
    property({ type: Boolean })
], GlideCoreDropdownOption.prototype, "privateActive", void 0);
__decorate([
    property({ type: Boolean })
], GlideCoreDropdownOption.prototype, "privateIsTooltipOpen", void 0);
__decorate([
    property({ reflect: true })
], GlideCoreDropdownOption.prototype, "version", void 0);
__decorate([
    state()
], GlideCoreDropdownOption.prototype, "isMultiple", null);
__decorate([
    state()
], GlideCoreDropdownOption.prototype, "lastSelectedOption", null);
__decorate([
    property({ reflect: true })
], GlideCoreDropdownOption.prototype, "value", null);
__decorate([
    state()
], GlideCoreDropdownOption.prototype, "isLabelOverflow", void 0);
GlideCoreDropdownOption = __decorate([
    customElement('glide-core-dropdown-option'),
    final
], GlideCoreDropdownOption);
export default GlideCoreDropdownOption;
