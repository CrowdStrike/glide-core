import './checkbox.js';
import './tooltip.js';
import { html, LitElement } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import packageJson from '../package.json' with { type: 'json' };
import checkedIcon from './icons/checked.js';
import pencilIcon from './icons/pencil.js';
import { LocalizeController } from './library/localize.js';
import styles from './dropdown.option.styles.js';
import type Checkbox from './checkbox.js';
import shadowRootMode from './library/shadow-root-mode.js';
import final from './library/final.js';
import required from './library/required.js';
import uniqueId from './library/unique-id.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-dropdown-option': DropdownOption;
  }
}

/**
 * @attr {string} label
 * @attr {number} [count]
 * @attr {boolean} [disabled=false]
 * @attr {boolean} [editable=false]
 *
 * @readonly
 * @attr {string} [id]
 *
 * @readonly
 * @attr {string} [role='option']
 *
 * @attr {boolean} [selected=false]
 *
 * @readonly
 * @attr {number} [tabindex=-1]
 *
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
export default class DropdownOption extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: shadowRootMode,
  };

  static override styles = styles;

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

  @property({ reflect: true, type: Number })
  count?: number;

  /**
   * @default false
   */
  @property({ reflect: true, type: Boolean })
  get disabled(): boolean {
    return this.#isDisabled;
  }

  set disabled(isDisabled: boolean) {
    this.#isDisabled = isDisabled;
    this.ariaDisabled = isDisabled.toString();

    if (this.#checkboxElementRef.value?.checked && isDisabled) {
      this.#checkboxElementRef.value.checked = false;
    } else if (this.#checkboxElementRef.value && this.selected && !isDisabled) {
      this.#checkboxElementRef.value.checked = true;
    }

    this.dispatchEvent(new Event('private-disabled-change', { bubbles: true }));
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

  // On the host instead of inside the shadow DOM so screenreaders can find it
  // when Dropdown uses it with `aria-activedescendant`.
  @property({ reflect: true })
  override readonly id: string = uniqueId();

  // An option is considered active when it's interacted with via keyboard or
  // hovered. Used by Dropdown.
  @property({ type: Boolean })
  privateActive = false;

  // Private because it's only meant to be used by Dropdown.
  @property({ attribute: 'private-indeterminate', type: Boolean })
  privateIndeterminate = false;

  // Private because it's only meant to be used by Dropdown.
  @property({ type: Boolean })
  privateIsEditActive = false;

  @property({ type: Boolean })
  privateIsTooltipOpen = false;

  // Private because it's only meant to be used by Dropdown.
  @property({ attribute: 'private-multiple', type: Boolean })
  privateMultiple = false;

  @property({ reflect: true })
  override readonly role = 'option';

  /**
   * @default false
   */
  @property({ type: Boolean })
  get selected(): boolean {
    return this.#selected;
  }

  set selected(isSelected) {
    this.#selected = isSelected;

    if (this.isMultiple && this.#checkboxElementRef.value) {
      this.#checkboxElementRef.value.checked = isSelected;
    }

    this.dispatchEvent(new Event('private-selected-change', { bubbles: true }));
  }

  @property({ attribute: 'tabindex', reflect: true, type: Number })
  override readonly tabIndex = -1;

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

  @property({ reflect: true })
  readonly version: string = packageJson.version;

  @state()
  private get isMultiple() {
    // The soonest Dropdown can set `this.privateMultiple` is in its `firstUpdated`.
    // By then, however, this component has has already completed its initial render.
    // So we fall sadly back to `this.closest('glide-core-dropdown')`.
    //
    // `this.privateMultiple` is still useful fwhen Dropdown's `this.multiple` is set
    // programmatically.
    return (
      this.privateMultiple || this.closest('glide-core-dropdown')?.multiple
    );
  }

  @state()
  private get lastSelectedAndEnabledOption(): DropdownOption | undefined {
    const options = this.parentElement?.querySelectorAll(
      'glide-core-dropdown-option',
    );

    if (options && options.length > 0) {
      return [...options].findLast(
        (option) => option.selected && !option.disabled,
      );
    }
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

    this.ariaDisabled = this.disabled.toString();

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
      this.#checkboxElementRef.value.checked = this.selected && !this.disabled;
    }
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
    // because options aren't focusable and thus don't produce keyboard events when
    // Dropdown is filterable.
    return html`<div
      class=${classMap({
        component: true,
        active: this.privateActive,
        disabled: this.disabled,
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
              })}
              data-test="checkbox"
              label=${this.label ?? ''}
              tabindex="-1"
              private-label-tooltip-offset=${12}
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
              <slot class="checkbox-icon-slot" name="icon" slot="private-icon">
                <!--
                  An icon before the label
                  @type {Element}
                -->
              </slot>
            </glide-core-checkbox>

            ${when(this.editable, () => {
              return html`<button
                aria-label=${this.#localize.term(
                  'editOption',

                  // `this.label` is always defined because it's a required attribute.
                  //
                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  this.label!,
                )}
                class=${classMap({
                  'edit-button': true,
                  active: this.privateIsEditActive,
                  count: Boolean(this.count),
                  disabled: this.disabled,
                  multiple: Boolean(this.isMultiple),
                })}
                data-test="edit-button"
                type="button"
                @mouseover=${this.#onEditButtonMouseover}
                @mouseout=${this.#onEditButtonMouseout}
              >
                ${pencilIcon}
              </button>`;
            })}
            ${when(this.count && this.count > 0, () => {
              return html`<div
                class=${classMap({
                  'count-container': true,
                  disabled: this.disabled,
                })}
                data-test="count-container"
              >
                ${when(
                  // `this.count` is guaranteed to be defined by the `when()` above.
                  //
                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  this.count! >= 1000,
                  () => {
                    return '999+';
                  },
                  () => {
                    return this.count;
                  },
                )}
              </div>`;
            })}
          `;
        },
        () => {
          return html`
            <div
              class=${classMap({
                option: true,
                count: Boolean(this.count),
                disabled: this.disabled,
                editable: this.editable,
              })}
            >
              <slot
                class=${classMap({
                  'icon-slot': true,
                })}
                name="icon"
              >
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

                <div
                  class="label"
                  data-test="label"
                  slot="target"
                  ${ref(this.#labelElementRef)}
                >
                  ${this.label}
                </div>
              </glide-core-tooltip>

              ${when(
                this.selected &&
                  this === this.lastSelectedAndEnabledOption &&
                  !this.disabled,
                () => {
                  return html`<div
                    class="checked-icon-container"
                    data-test="checked-icon-container"
                  >
                    ${checkedIcon}
                  </div>`;
                },
              )}

              ${when(this.editable, () => {
                return html`<button
                  aria-label=${this.#localize.term(
                    'editOption',
                    // `this.label` is always defined because it's a required attribute.
                    //
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    this.label!,
                  )}
                  class=${classMap({
                    'edit-button': true,
                    active: this.privateActive && this.privateIsEditActive,
                    count: Boolean(this.count),
                    disabled: this.disabled,
                  })}
                  data-test="edit-button"
                  type="button"
                  @mouseover=${this.#onEditButtonMouseover}
                  @mouseout=${this.#onEditButtonMouseout}
                >
                  ${pencilIcon}
                </button>`;
              })}

              ${when(this.count && this.count > 0, () => {
                return html`<div
                  class=${classMap({
                    'count-container': true,
                    disabled: this.disabled,
                  })}
                  data-test="count-container"
                >
                  ${when(
                    // `this.count` is guaranteed to be defined by the `when()` above.
                    //
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    this.count! >= 1000,
                    () => {
                      return '999+';
                    },
                    () => {
                      return this.count;
                    },
                  )}
                </div>`;
              })}
            </div>
          </div>`;
        },
      )}
    </div>`;
  }

  override updated() {
    // `this.ariaSelected` needs to be updated whenever `disabled`, `privateMulitple`,
    // `selected`, or `this.lastSelectedAndEnabledOption` change.
    //
    // The logic below could be duplicated and added to each setter. But that wouldn't
    // account for when `this.lastSelectedAndEnabledOption` is forcibly updated by
    // Dropdown because another option has been selected or deselected.
    //
    // Setting `this.ariaSelected` here ensures `this.ariaSelected` is updated whenever
    // `this.lastSelectedAndEnabledOption` changes. As a bonus, this logic is
    // deduplicated.
    if (this.privateMultiple) {
      this.ariaSelected = !this.disabled && this.selected ? 'true' : 'false';
    } else {
      this.ariaSelected =
        !this.disabled &&
        this.selected &&
        this === this.lastSelectedAndEnabledOption
          ? 'true'
          : 'false';
    }
  }

  @state()
  private isLabelOverflow = false;

  #checkboxElementRef = createRef<Checkbox>();

  #componentElementRef = createRef<HTMLElement>();

  #intersectionObserver?: IntersectionObserver;

  #isDisabled = false;

  #isEditable = false;

  #label?: string;

  #labelElementRef = createRef<HTMLElement>();

  #localize = new LocalizeController(this);

  #selected = false;

  #value = '';

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
