import './checkbox.js';
import './tooltip.js';
import { LitElement, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
import { nanoid } from 'nanoid';
import { when } from 'lit/directives/when.js';
import checkedIcon from './icons/checked.js';
import pencilIcon from './icons/pencil.js';
import styles from './dropdown.option.styles.js';
import type GlideCoreCheckbox from './checkbox.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-dropdown-option': GlideCoreDropdownOption;
  }
}

/**
 * @slot icon - An icon before the label.
 */
@customElement('glide-core-dropdown-option')
export default class GlideCoreDropdownOption extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: 'closed',
  };

  static override styles = styles;

  @property({ reflect: true, type: Boolean })
  get editable() {
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

  @property({ reflect: true })
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

    this.dispatchEvent(
      new Event('private-label-change', {
        bubbles: true,
      }),
    );
  }

  @property({ attribute: 'private-indeterminate', type: Boolean })
  privateIndeterminate = false;

  @property({ type: Boolean })
  privateIsEditActive = false;

  @property({ attribute: 'private-multiple', type: Boolean })
  privateMultiple = false;

  @property({ reflect: true, type: Boolean })
  get selected() {
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

  @property({ attribute: 'private-size', reflect: true })
  privateSize: 'small' | 'large' = 'large';

  // An option is considered active when it's interacted with via keyboard or hovered.
  @state()
  privateActive = false;

  @state()
  private get isMultiple() {
    // The soonest Dropdown can set `this.privateMultiple` is in its `firstUpdated`.
    // By then, however, this component has has already completed its initial render. So
    // we fall sadly back to `this.closest('glide-core-dropdown')`. `this.privateMultiple`
    // is still useful for when Dropdown's `this.multiple` is changed programmatically.
    return (
      this.privateMultiple || this.closest('glide-core-dropdown')?.multiple
    );
  }

  @state()
  privateIsOpenTooltip = false;

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
    this.role = 'option';
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

  @property({ reflect: true })
  get value() {
    return this.#value;
  }

  set value(value) {
    // `this.value` can be changed programmatically. Dropdown needs to know when that
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

  async privateUpdateCheckbox() {
    // Hacky indeed. This is for the case where Dropdown is changed programmatically
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
    // The linter wants a keyboard listener. There's one on Dropdown itself. It's there
    // because options aren't focusable and thus don't produce keyboard events when Dropdown
    // is filterable.

    /* eslint-disable lit-a11y/click-events-have-key-events */
    return html`<div
      class=${classMap({
        component: true,
        active: this.privateActive,
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
              internally-inert
              @click=${this.#onCheckboxClick}
              ?indeterminate=${this.privateIndeterminate}
              ?private-show-label-tooltip=${this.privateIsOpenTooltip}
              ${ref(this.#checkboxElementRef)}
            >
              <slot
                class="checkbox-icon-slot"
                name="icon"
                slot="private-icon"
              ></slot>
            </glide-core-checkbox>

            ${when(this.editable, () => {
              return html`<button
                class=${classMap({
                  'edit-button': true,
                  active: this.privateIsEditActive,
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
            editable: this.editable,
            [this.privateSize]: true,
          })}
          >
              <slot class="icon-slot" name="icon"></slot>

              <glide-core-tooltip class="tooltip" offset=${10} ?disabled=${!this
                .isLabelOverflow} ?open=${this.privateIsOpenTooltip}>

                <div aria-hidden="true" data-test="tooltip">
                  ${this.label}
                </div>

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

  #isEditable = false;

  #label = '';

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

  #updateLabelOverflow() {
    if (this.#labelElementRef.value) {
      this.isLabelOverflow =
        this.#labelElementRef.value.scrollWidth >
        this.#labelElementRef.value.clientWidth;
    }
  }
}
