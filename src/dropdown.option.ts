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
import type GlideCoreCheckbox from './checkbox.js';
import shadowRootMode from './library/shadow-root-mode.js';
import final from './library/final.js';
import required from './library/required.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-dropdown-option': GlideCoreDropdownOption;
  }
}

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
@customElement('glide-core-dropdown-option')
@final
export default class GlideCoreDropdownOption extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: shadowRootMode,
  };

  static override styles = styles;

  /**
   * @default false
   */
  @property({ reflect: true, type: Boolean })
  get disabled(): boolean {
    return this.#isDisabled;
  }

  set disabled(isDisabled: boolean) {
    this.role = isDisabled ? 'none' : 'option';
    this.#isDisabled = isDisabled;
  }

  /**
   * @default false
   */
  @property({ reflect: true, type: Boolean })
  get editable(): boolean {
    return this.#isEditable;
  }

  set editable(isEditable) {
    this.#isEditable = isEditable;

    this.dispatchEvent(
      new Event('private-editable-change', {
        bubbles: true,
      }),
    );
  }

  /**
   * @default undefined
   */
  @property({ reflect: true })
  @required
  get label(): string | undefined {
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

    this.dispatchEvent(
      new Event('private-label-change', {
        bubbles: true,
      }),
    );
  }

  // Private because it's only meant to be used by Dropdown.
  @property({ attribute: 'private-indeterminate', type: Boolean })
  privateIndeterminate = false;

  // Private because it's only meant to be used by Dropdown.
  @property({ type: Boolean })
  privateIsEditActive = false;

  // Private because it's only meant to be used by Dropdown.
  @property({ attribute: 'private-multiple', type: Boolean })
  privateMultiple = false;

  /**
   * @default false
   */
  @property({ reflect: true, type: Boolean })
  get selected(): boolean {
    return this.#selected;
  }

  set selected(isSelected) {
    this.#selected = isSelected;
    this.ariaSelected = isSelected.toString();

    if (this.isMultiple) {
      if (this.#checkboxElementRef.value) {
        this.#checkboxElementRef.value.checked = isSelected;
      }
    } else {
      // When not `this.isMultiple`, only one option may be selected at the time. This handles
      // deselecting every other option when a new one is selected.
      //
      // Siblings modifying siblings is unusual but simplifies things for Dropdown. Dropdown
      // selects and deselects options in various situations. So it's simpler and more reliable
      // to iterate through them once here instead of doing so multiple times in Dropdown or
      // else abstracting the deselection into a Dropdown method that will result in a bug
      // when not used.
      //
      // `this.privateActive` would get the same treatment if not for Select All, which is in
      // Dropdown's shadow DOM and so is inaccessible from this component.
      for (const option of this.#optionElements) {
        if (option !== this && this.selected && option.selected) {
          option.selected = false;
        }
      }
    }

    // Prefixed with "private" because Dropdown uses it internally, to track the set of
    // selected options in the case of multiselect. Dropdown itself then dispatches in
    // response to this event a "change" event after updating its `this.value`.
    this.dispatchEvent(new Event('private-selected-change', { bubbles: true }));
  }

  // Private because it's only meant to be used by Dropdown.
  @property({ attribute: 'private-size', reflect: true })
  privateSize: 'large' | 'small' = 'large';

  // An option is considered active when it's interacted with via keyboard or hovered.
  // Used by Dropdown.
  @property({ type: Boolean })
  privateActive = false;

  @property({ type: Boolean })
  privateIsTooltipOpen = false;

  @property({ reflect: true })
  readonly version: string = packageJson.version;

  @state()
  private get isMultiple() {
    // The soonest Dropdown can set `this.privateMultiple` is in its `firstUpdated`.
    // By then, however, this component has has already completed its initial render. So
    // we fall sadly back to `this.closest('glide-core-dropdown')`. `this.privateMultiple`
    // is still useful for when Dropdown's `this.multiple` is set programmatically.
    return (
      this.privateMultiple || this.closest('glide-core-dropdown')?.multiple
    );
  }

  override click() {
    if (this.privateMultiple) {
      this.#checkboxElementRef.value?.click();
    } else {
      this.#componentElementRef.value?.click();
    }
  }

  override connectedCallback() {
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

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.#intersectionObserver?.disconnect();
  }

  override firstUpdated() {
    if (this.#checkboxElementRef.value) {
      this.#checkboxElementRef.value.checked = this.selected;
    }
  }

  /**
   * @default ''
   */
  @property({ reflect: true })
  get value(): string {
    return this.#value;
  }

  set value(value) {
    // `this.value` can be set programmatically. Dropdown needs to know when that
    // happens so it can update its own `this.value`.
    this.dispatchEvent(
      new CustomEvent('private-value-change', {
        bubbles: true,
        // Without knowing what the old value was, Dropdown would be unable to find the
        // value in its `this.value` array and remove it.
        detail: {
          old: this.value,
          new: value,
        },
      }),
    );

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

  override render() {
    // The linter wants a keyboard handler. There's one on Dropdown itself. It's there
    // because options aren't focusable and thus don't produce keyboard events when Dropdown
    // is filterable.
    return html`<div
      class=${classMap({
        component: true,
        active: this.privateActive,
        disabled: this.disabled,
        [this.privateSize]: true,
      })}
      data-test="component"
      ${ref(this.#componentElementRef)}
    >
      ${when(
        this.isMultiple,
        () => {
          return html`
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
              return html`<button
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
        },
        () => {
          return html`
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

                <div class="label" data-test="label" slot="target" ${ref(
                  this.#labelElementRef,
                )}>
                  ${this.label}
                </div>
              </glide-core-tooltip>

              ${when(this.selected, () => {
                return html`<div
                  class="checked-icon-container"
                  data-test="checked-icon-container"
                >
                  ${checkedIcon}
                </div>`;
              })}

              ${when(this.editable, () => {
                return html`<button
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
        },
      )}
    </div> `;
  }

  @state()
  private isLabelOverflow = false;

  #checkboxElementRef = createRef<GlideCoreCheckbox>();

  #componentElementRef = createRef<HTMLElement>();

  // Established here instead of in `connectedCallback` so the ID remains
  // constant even if this component is removed and re-added to the DOM.
  // If it's not constant, Dropdown's `aria-activedescendant` will immediately
  // point to a non-existent ID when this component is re-added. An edge case
  // for sure. But one we can protect against with little effort.
  #id = nanoid();

  #intersectionObserver?: IntersectionObserver;

  #isDisabled = false;

  #isEditable = false;

  #label?: string;

  #labelElementRef = createRef<HTMLElement>();

  #selected = false;

  #value = '';

  get #optionElements() {
    const elements =
      this.closest('glide-core-dropdown')?.querySelectorAll(
        'glide-core-dropdown-option',
      ) ?? [];

    return [...elements];
  }

  #onCheckboxClick(event: MouseEvent) {
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

  #onTooltipToggle(event: Event) {
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
}
