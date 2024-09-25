import './checkbox.js';
import './dropdown.option.js';
import './label.js';
import './tooltip.js';
import { LitElement, html } from 'lit';
import { LocalizeController } from './library/localize.js';
import { autoUpdate, computePosition, flip, offset } from '@floating-ui/dom';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { repeat } from 'lit/directives/repeat.js';
import { when } from 'lit/directives/when.js';
import GlideCoreDropdownOption from './dropdown.option.js';
import GlideCoreTag from './tag.js';
import magnifyingGlassIcon from './icons/magnifying-glass.js';
import ow, { owSlotType } from './library/ow.js';
import styles from './dropdown.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-dropdown': GlideCoreDropdown;
  }
}

/**
 * @event change - `(event: Event) => void`
 * @event input - `(event: Event) => void`
 * @event invalid - `(event: Event) => void`
 *
 * @slot - One or more of `<glide-core-dropdown-option>`.
 * @slot tooltip - Content for the tooltip.
 * @slot description - Additional information or context.
 */
@customElement('glide-core-dropdown')
export default class GlideCoreDropdown extends LitElement {
  static formAssociated = true;

  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: 'closed',
  };

  static override styles = styles;

  @property({ reflect: true, type: Boolean })
  get disabled() {
    return this.#isDisabled;
  }

  set disabled(isDisabled: boolean) {
    this.#isDisabled = isDisabled;

    if (this.open && isDisabled) {
      this.#hide();
    } else if (this.open) {
      this.#show();
    }
  }

  @property({ reflect: true, type: Boolean })
  filterable = false;

  @property({ attribute: 'hide-label', reflect: true, type: Boolean })
  hideLabel = false;

  @property({ reflect: true })
  label?: string;

  @property({ reflect: true })
  name = '';

  @property({ reflect: true, type: Boolean })
  get open() {
    return this.#isOpen;
  }

  set open(isOpen: boolean) {
    this.#isOpen = isOpen;

    if (isOpen && !this.disabled) {
      this.#show();
    } else if (
      !this.multiple &&
      this.#inputElementRef.value &&
      this.selectedOptions.length > 0
    ) {
      this.#inputElementRef.value.value = this.selectedOptions[0].label;
      this.isFiltering = false;
      this.#hide();
    } else {
      this.#hide();
    }
  }

  @property({ reflect: true })
  orientation: 'horizontal' | 'vertical' = 'horizontal';

  @property({ reflect: true })
  placeholder?: string;

  @property()
  privateSplit?: 'left' | 'middle';

  @property({ reflect: true, type: Boolean })
  readonly = false;

  @property({ attribute: 'select-all', reflect: true, type: Boolean })
  selectAll = false;

  @property({ reflect: true })
  get size() {
    return this.#size;
  }

  set size(size: 'small' | 'large') {
    this.#size = size;

    if (this.#optionElementsIncludingSelectAll) {
      for (const option of this.#optionElementsIncludingSelectAll) {
        option.privateSize = size;
      }
    }
  }

  @property({ reflect: true, type: Boolean })
  get multiple() {
    return this.#isMultiple;
  }

  set multiple(isMultiple) {
    const wasMultiple = this.#isMultiple && !isMultiple;
    const wasSingle = !this.#isMultiple && isMultiple;

    this.#isMultiple = isMultiple;

    for (const option of this.#optionElements) {
      option.privateMultiple = isMultiple;

      // A single-select can only have one option selected. All but the last one
      // are deselected.
      if (wasMultiple && option !== this.lastSelectedOption) {
        option.selected = false;
      }
    }

    if (wasMultiple && this.lastSelectedOption?.value) {
      this.#value = [this.lastSelectedOption.value];
    } else if (wasSingle && this.lastSelectedOption) {
      this.lastSelectedOption.privateUpdateCheckbox();
    }
  }

  @property({ reflect: true, type: Boolean })
  required = false;

  @property({ type: Array })
  get value() {
    return this.#value;
  }

  set value(value: string[]) {
    this.#value = value;

    ow(
      this.multiple || (!this.multiple && value.length <= 1),
      ow.boolean.true.message('Only one value is allowed when not `multiple`.'),
    );

    for (const option of this.#optionElements) {
      // If multiple options have the same `value`, they'll all be selected. No way
      // to avoid that. If `value` is an empty string, all options are left deselected
      // so every `option.value` that's an empty string isn't selected, which would
      // be wacky.
      option.selected = value.some((value) => value && value === option.value);
    }
  }

  /*
    Waiting on visual treatment from Design. For now, this only applies when multiselection
    isn't enabled and filtering is disabled.
  */
  @property({ reflect: true })
  variant?: 'quiet';

  private get activeOption() {
    return this.#optionElementsIncludingSelectAll?.find(
      ({ privateActive }) => privateActive,
    );
  }

  checkValidity() {
    this.isCheckingValidity = true;
    const validity = this.#internals.checkValidity();
    this.isCheckingValidity = false;

    return validity;
  }

  override click() {
    if (this.#inputElementRef.value) {
      this.#inputElementRef.value.click();
      this.#inputElementRef.value.select();
    } else {
      this.#buttonElementRef.value?.click();
    }
  }

  private get selectedOptions() {
    return this.#optionElements.filter(
      (option): option is GlideCoreDropdownOption => {
        return option instanceof GlideCoreDropdownOption && option.selected;
      },
    );
  }

  private get lastSelectedOption() {
    return this.#optionElements.findLast((option) => option.selected);
  }

  private get isAllSelected() {
    return (
      this.#optionElements.filter(({ selected }) => selected).length ===
      this.#optionElements.length
    );
  }

  private get isSomeSelected() {
    return this.#optionElements.some(({ selected }) => selected);
  }

  private get internalLabel() {
    const isFilterable = this.filterable || this.isFilterable;

    return !isFilterable && this.selectedOptions.length === 0
      ? html`<span
          class=${classMap({
            placeholder: true,
            disabled: this.disabled,
            quiet: this.variant === 'quiet',
          })}
        >
          ${this.placeholder}
        </span>`
      : !this.multiple && !isFilterable && this.selectedOptions.at(-1)?.label
        ? this.selectedOptions.at(-1)?.label
        : '';
  }

  override connectedCallback() {
    super.connectedCallback();

    // 1. The consumer has a click listener on a button.
    // 2. The user clicks the button.
    // 3. The button's click listener is called and it synchronously sets `this.open` to `true`.
    // 4. Now the event bubbles up to this component's click listener on `document`.
    // 5. That click listener sets `open` to `false`.
    // 6. Dropdown is opened then closed in the same frame and so never opens.
    //
    // Using `capture` ensures this listener is called before #3.
    document.addEventListener('click', this.#onDocumentClick, {
      capture: true,
    });
  }

  override createRenderRoot() {
    this.#shadowRoot = super.createRenderRoot() as ShadowRoot;
    return this.#shadowRoot;
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.form?.removeEventListener('formdata', this.#onFormdata);

    document.removeEventListener('click', this.#onDocumentClick, {
      capture: true,
    });
  }

  override firstUpdated() {
    // `Text` is allowed so slotted content can be rendered asychronously. Think of
    // a case where the only slotted content is a `repeat` whose array is empty
    // at first then populated after a fetch.
    owSlotType(this.#defaultSlotElementRef.value, [
      GlideCoreDropdownOption,
      Text,
    ]);

    if (this.#optionsElementRef.value) {
      // `popover` is used so the options can break out of Modal or another container
      // that has `overflow: hidden`. And elements with `popover` are positioned
      // relative to the viewport. Thus Floating UI in addition to `popover`.
      //
      // Set here instead of in the template to escape Lit Analyzer, which isn't
      // aware of `popover` and doesn't have a way to disable a rule ("no-unknown-attribute").
      //
      // "auto" means only one popover can be open at a time. Consumers, however, may
      // have popovers in their own components that need to be open while this one is open.
      //
      // "auto" also automatically opens the popover when its target is clicked. We want
      // it to remain closed when clicked when there are no options. We also want it to
      // close when every option has been filtered out.
      this.#optionsElementRef.value.popover = 'manual';
    }

    if (this.open && !this.disabled) {
      this.#show();
    }
  }

  // The button doesn't receive focus when `shadowRoot.delegatesFocus` is set,
  // and the inherited `this.focus` is called. It's not clear why. Thus the override.
  override focus(options?: FocusOptions) {
    if (this.filterable || this.isFilterable) {
      this.#inputElementRef.value?.focus(options);
    } else {
      this.#buttonElementRef.value?.focus(options);
    }
  }

  get form() {
    return this.#internals.form;
  }

  get validity() {
    if (this.required && this.selectedOptions.length === 0) {
      this.#internals.setValidity(
        { valueMissing: true },
        ' ',
        this.#inputElementRef.value,
      );
    } else {
      this.#internals.setValidity({});
    }

    return this.#internals.validity;
  }

  get willValidate() {
    return this.#internals.willValidate;
  }

  formAssociatedCallback() {
    this.form?.addEventListener('formdata', this.#onFormdata);
  }

  formResetCallback() {
    for (const option of this.#optionElements) {
      const isInitiallySelected = option.hasAttribute('selected');

      if (!isInitiallySelected) {
        option.selected = false;
      }
    }

    const initiallySelectedOptionElementsWithValue =
      this.#optionElements.filter((option) => {
        return option.hasAttribute('selected');
      });

    // Even with a single-select, there's nothing to stop developers from adding
    // a `selected` attribute to more than one option. How native handles this
    // is to choose the last selected option. This mimics that behavior, which
    // seems reasonable.
    const lastValue = initiallySelectedOptionElementsWithValue.at(-1)?.value;

    this.#value =
      this.multiple && initiallySelectedOptionElementsWithValue.length > 0
        ? initiallySelectedOptionElementsWithValue.map(({ value }) => value)
        : !this.multiple && lastValue
          ? [lastValue]
          : [];
  }

  override render() {
    // `hidden` is frowned upon because it adds a second source of truth for styling. However,
    // it's the simplest way to hide slotted options and to later check if they're hidden.
    // Select All is different because we can conditionally render it and check if it exists.
    // `hidden` is used with it nonetheless for consistency and to simplify the logic that
    // checks an option's visibility, such as in `#optionElementsNotHiddenIncludingSelectAll`.

    // ".tag-overflow-text" is hidden from screen readers because it's redundant. The selected
    // options are announced when Dropdown receives focus.

    // The linter checks that all ULs have LIs as children. It doesn't account for slots,
    // which can contain LIs.

    // The linter wants a "focus" listener on the slot, but there's nothing to be done with
    // one in this case.

    // The linter wants a "keydown" listener on '.dropdown'. Instead, there's one on
    // `.dropdown-and-options` because much of the logic in the listener also applies
    // to options, which can receive focus, and "keydown" events won't be emitted on ".dropdown"
    // when it doesn't have focus.

    /*  eslint-disable lit-a11y/list, lit-a11y/mouse-events-have-key-events, lit-a11y/click-events-have-key-events */
    return html`<div
      class=${classMap({
        component: true,
        horizontal: this.orientation === 'horizontal',
        vertical: this.orientation === 'vertical',
      })}
      @blur=${this.#onBlur}
    >
      <glide-core-private-label
        split=${ifDefined(this.privateSplit ?? undefined)}
        orientation=${this.orientation}
        ?disabled=${this.disabled}
        ?error=${this.#isShowValidationFeedback}
        ?hide=${this.hideLabel}
        ?required=${this.required}
        @blur=${this.#onBlur}
      >
        <label id="label"> ${this.label} </label>
        <slot name="tooltip" slot="tooltip"></slot>

        <div
          class="dropdown-and-options"
          slot="control"
          @focusout=${this.#onDropdownAndOptionsFocusout}
          @keydown=${this.#onDropdownAndOptionsKeydown}
        >
          <div
            class=${classMap({
              dropdown: true,
              quiet: this.variant === 'quiet',
              disabled: this.disabled,
              error: this.#isShowValidationFeedback,
              readonly: this.readonly,
              multiple: this.multiple,
            })}
            @click=${this.#onDropdownClick}
            @mousedown=${this.#onDropdownMousedown}
            ${ref(this.#dropdownElementRef)}
          >
            <span class="selected-option-labels" id="selected-option-labels">
              ${this.selectedOptions
                .filter(({ label }) => typeof label === 'string')
                .map(
                  ({ label }) =>
                    html`<span data-test="selected-option-label">
                      ${label},
                    </span>`,
                )}
            </span>

            ${when(this.multiple && this.selectedOptions.length > 0, () => {
              return html`<ul
                aria-describedby="tag-overflow-text"
                class="tags"
                ${ref(this.#tagsElementRef)}
              >
                ${when(this.multiple && this.selectedOptions.length > 0, () => {
                  return html`
                    ${repeat(
                      this.selectedOptions,
                      ({ id }) => id,
                      ({ id, label }, index) => {
                        return html`<li
                          class=${classMap({
                            'tag-container': true,
                            hidden: index > this.#tagOverflowLimit - 1,
                          })}
                          data-test="tag-container"
                          data-test-hidden=${index > this.#tagOverflowLimit - 1}
                        >
                          <glide-core-tag
                            data-test="tag"
                            data-id=${id}
                            label=${label}
                            removable
                            @remove=${this.#onTagRemove.bind(this, id)}
                          ></glide-core-tag>
                        </li>`;
                      },
                    )}
                  `;
                })}
              </ul>`;
            })}
            ${when(this.filterable || this.isFilterable, () => {
              return html`<input
                aria-activedescendant=${this.ariaActivedescendant}
                aria-controls="options"
                aria-describedby="description"
                aria-expanded=${this.open}
                aria-labelledby="selected-option-labels label"
                autocapitalize="off"
                autocomplete="off"
                class="input"
                data-test="input"
                id="input"
                placeholder=${this.multiple ||
                !this.selectedOptions.at(-1)?.label
                  ? this.placeholder ?? ''
                  : ''}
                role="combobox"
                spellcheck="false"
                tabindex=${this.disabled ? '-1' : '0'}
                ?disabled=${this.disabled}
                ?readonly=${this.readonly}
                @input=${this.#onInputInput}
                @keydown=${this.#onInputKeydown}
                ${ref(this.#inputElementRef)}
              />`;
            })}
            ${when(this.internalLabel, () => {
              return html`<div data-test="internal-label">
                ${this.internalLabel}
              </div>`;
            })}

            <div class="tag-overflow-text-and-button">
              ${when(
                this.selectedOptions.length > this.#tagOverflowLimit,
                () => {
                  return html`<div
                    aria-hidden="true"
                    class="tag-overflow-text"
                    id="tag-overflow-text"
                    data-test="tag-overflow-text"
                  >
                    +
                    <span data-test="tag-overflow-count">
                      ${this.selectedOptions.length - this.#tagOverflowLimit}
                    </span>
                    more
                  </div>`;
                },
              )}

              <button
                aria-expanded=${this.open}
                aria-haspopup="listbox"
                aria-hidden=${this.filterable || this.isFilterable}
                aria-labelledby="selected-option-labels label"
                aria-describedby="description"
                aria-controls="options"
                class="button"
                data-test="button"
                id="button"
                tabindex=${this.filterable || this.isFilterable || this.disabled
                  ? '-1'
                  : '0'}
                type="button"
                ${ref(this.#buttonElementRef)}
              >
                ${when(
                  this.isFiltering,
                  () => {
                    return html`<div data-test="magnifying-glass-icon">
                      ${magnifyingGlassIcon}
                    </div>`;
                  },
                  () => {
                    return html`<svg
                      aria-label=${this.#localize.term('open')}
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M6 9L12 15L18 9"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>`;
                  },
                )}
              </button>
            </div>
          </div>

          <div
            aria-labelledby=${this.filterable || this.isFilterable
              ? 'input'
              : 'button'}
            class=${classMap({
              options: true,
              hidden: this.isOptionsHidden,
              [this.size]: true,
            })}
            data-test="options"
            id="options"
            role="listbox"
            @click=${this.#onOptionsClick}
            @input=${this.#onOptionsInput}
            @focusin=${this.#onOptionsFocusin}
            @mousedown=${this.#onOptionsMousedown}
            @mouseover=${this.#onOptionsMouseover}
            @private-selected-change=${this.#onOptionsSelectedChange}
            @private-value-change=${this.#onOptionsValueChange}
            ${ref(this.#optionsElementRef)}
          >
            <glide-core-dropdown-option
              class="select-all"
              data-test="select-all"
              label=${this.#localize.term('selectAll')}
              ?hidden=${!this.selectAll || !this.multiple || this.isFiltering}
              ?private-indeterminate=${this.isSomeSelected &&
              !this.isAllSelected}
              ${ref(this.#selectAllElementRef)}
            ></glide-core-dropdown-option>

            <slot
              @slotchange=${this.#onDefaultSlotChange}
              ${ref(this.#defaultSlotElementRef)}
            ></slot>
          </div>
        </div>

        <slot id="description" name="description" slot="description"></slot>
      </glide-core-private-label>
    </div>`;
  }

  reportValidity() {
    this.isReportValidityOrSubmit = true;

    const isValid = this.#internals.reportValidity();

    // Ensures that getters referencing this.validity?.valid update (i.e. #isShowValidationFeedback)
    this.requestUpdate();

    return isValid;
  }

  constructor() {
    super();
    this.#internals = this.attachInternals();

    // Event listeners on the host aren't great because consumers can remove them.
    // Unfortunately, the host is the only thing on which this event is dispatched
    // because it's the host that is form-associated.
    this.addEventListener('invalid', (event) => {
      event?.preventDefault(); // Canceled so a native validation message isn't shown.

      // We only want to focus the input if the invalid event resulted from either:
      // 1. Form submission
      // 2. a call to reportValidity that did NOT result from the checkbox blur event
      if (this.isCheckingValidity || this.isBlurring) {
        return;
      }

      this.isReportValidityOrSubmit = true;

      const isFirstInvalidFormElement =
        this.form?.querySelector(':invalid') === this;

      if (isFirstInvalidFormElement) {
        // - Canceling this event means Dropdown won't get focus, even if we were to use
        //   `this.#internals.delegatesFocus`.
        //
        // - The browser will ignore our `this.focus()` if Dropdown isn't the first invalid
        //   form control.
        this.focus();
      }
    });
  }

  @state()
  private ariaActivedescendant = '';

  @state()
  private isBlurring = false;

  @state()
  private isCheckingValidity = false;

  @state()
  private isFilterable = false;

  @state()
  private isFiltering = false;

  @state()
  private isOptionsHidden = false;

  @state()
  private isReportValidityOrSubmit = false;

  #buttonElementRef = createRef<HTMLButtonElement>();

  #cleanUpFloatingUi?: ReturnType<typeof autoUpdate>;

  #defaultSlotElementRef = createRef<HTMLSlotElement>();

  #dropdownElementRef = createRef<HTMLElement>();

  #inputElementRef = createRef<HTMLInputElement>();

  #internals: ElementInternals;

  #isDisabled = false;

  #isMultiple = false;

  #isOpen = false;

  #isRemovingTag = false;

  // Used in `#onOptionsSelectedChange` to guard against resetting Select All
  // back to its previous value after Select All is selected or deselected.
  #isSelectionChangeFromSelectAll = false;

  #isSelectionViaSpaceOrEnter = false;

  #localize = new LocalizeController(this);

  #optionsElementRef = createRef<HTMLElement>();

  #selectAllElementRef = createRef<GlideCoreDropdownOption>();

  #shadowRoot?: ShadowRoot;

  #size: 'small' | 'large' = 'large';

  // To be removed when we take a stab at showing and hiding tag overflow dynamically
  // based on whether Dropdown is overflowing its container. Good luck!
  #tagOverflowLimit = 3;

  #tagsElementRef = createRef<HTMLElement>();

  #value: string[] = [];

  // An arrow function field instead of a method so `this` is closed over and
  // set to the component instead of `document`.
  #onDocumentClick = (event: MouseEvent) => {
    if (
      this.multiple &&
      !(
        event.target instanceof GlideCoreDropdown ||
        event.target instanceof GlideCoreDropdownOption
      )
    ) {
      this.open = false;
    } else if (!this.multiple && !(event.target instanceof GlideCoreDropdown)) {
      this.open = false;
    }
  };

  // An arrow function field instead of a method so `this` is closed over and
  // set to the component instead of the form.
  #onFormdata = ({ formData }: FormDataEvent) => {
    if (this.name && this.value.length > 0 && !this.disabled) {
      formData.append(this.name, JSON.stringify(this.value));
    }
  };

  #deactivateAllOptions() {
    if (this.#optionElementsIncludingSelectAll) {
      for (const option of this.#optionElementsIncludingSelectAll) {
        option.privateActive = false;
      }
    }
  }

  #hide() {
    this.#cleanUpFloatingUi?.();
    this.#optionsElementRef.value?.hidePopover();
    this.ariaActivedescendant = '';
  }

  get #optionElements() {
    return (
      this.#defaultSlotElementRef.value
        ?.assignedElements()
        .filter(
          (element): element is GlideCoreDropdownOption =>
            element instanceof GlideCoreDropdownOption,
        ) ?? []
    );
  }

  get #optionElementsIncludingSelectAll() {
    const assignedElements = this.#defaultSlotElementRef.value
      ?.assignedElements()
      .filter(
        (element): element is GlideCoreDropdownOption =>
          element instanceof GlideCoreDropdownOption,
      );

    if (assignedElements && this.#selectAllElementRef.value) {
      return [this.#selectAllElementRef.value, ...assignedElements];
    }
  }

  get #optionElementsNotHidden() {
    return this.#defaultSlotElementRef.value
      ?.assignedElements()
      .filter(
        (element): element is GlideCoreDropdownOption =>
          element instanceof GlideCoreDropdownOption && !element.hidden,
      );
  }

  get #optionElementsNotHiddenIncludingSelectAll() {
    const assignedElementsNotHidden = this.#defaultSlotElementRef.value
      ?.assignedElements()
      .filter(
        (element): element is GlideCoreDropdownOption =>
          element instanceof GlideCoreDropdownOption && !element.hidden,
      );

    return this.#selectAllElementRef.value &&
      !this.#selectAllElementRef.value.hidden &&
      assignedElementsNotHidden
      ? [this.#selectAllElementRef.value, ...assignedElementsNotHidden]
      : assignedElementsNotHidden;
  }

  get #isShowValidationFeedback() {
    return (
      this.required &&
      !this.disabled &&
      !this.validity.valid &&
      this.isReportValidityOrSubmit
    );
  }

  #onBlur() {
    this.isBlurring = true;
    this.reportValidity();
    this.isBlurring = false;
  }

  #onDefaultSlotChange() {
    owSlotType(this.#defaultSlotElementRef.value, [
      GlideCoreDropdownOption,
      Text,
    ]);

    this.isFilterable = this.#optionElements.length > 10;

    if (this.#optionElementsIncludingSelectAll) {
      for (const option of this.#optionElementsIncludingSelectAll) {
        // Both here and in the `this.size` setter because no assignment happens on
        // first render.
        option.privateSize = this.size;
        option.privateMultiple = this.multiple;
      }
    }

    const firstOption = this.#optionElementsNotHiddenIncludingSelectAll?.at(0);

    // Even with single-select, there's nothing to stop developers from adding
    // a `selected` attribute to more than one option. How native handles this
    // when setting `value` is to choose the last selected option.
    //
    // We're not setting `value` here. But we follow native's behavior elsewhere
    // when setting `value`. So we do the same here when setting `privateActive`.
    if (this.lastSelectedOption) {
      this.#deactivateAllOptions();
      this.lastSelectedOption.privateActive = true;
      this.ariaActivedescendant = this.open ? this.lastSelectedOption.id : '';
    } else if (firstOption) {
      this.#deactivateAllOptions();
      firstOption.privateActive = true;
      this.ariaActivedescendant = this.open ? firstOption.id : '';
    }

    // Update Select All to reflect the selected options.
    if (this.#selectAllElementRef.value) {
      this.#selectAllElementRef.value.selected = this.isAllSelected;
    }

    // Set `value`.
    if (this.multiple) {
      this.#value = this.selectedOptions
        .filter((option) => Boolean(option.value))
        .map(({ value }) => value);
    } else if (this.lastSelectedOption?.value) {
      this.#value = [this.lastSelectedOption.value];
    }

    // Dropdown's internal label now needs to be updated to reflect the selected option
    // or options. `this.internalLabel` uses the `this.selectedOptions` getter, whose
    // return value is derived from the state of another component: Dropdown Option.
    // For whatever reason, and even though that component's state is reactive, a change
    // to it doesn't result in a rerender of this component. So one is forced.
    this.requestUpdate();

    // Dropdown becomes filterable if there are more than 10 options. But the `<input>`
    // won't have rendered yet given we just set `this.isFilterable` above. So we piggyback
    // off of `this.requestUpdate()` and then wait for the update to complete before setting
    // the `value` of the `<input>`.
    //
    // `then` instead of `await` so the `owSlotType` assertion above isn't thrown in a promise,
    // causing the dreaded "An error was thrown in a Promise outside a test" in tests for that
    // the assertion.
    this.updateComplete.then(() => {
      if (
        !this.multiple &&
        this.#inputElementRef.value &&
        this.lastSelectedOption?.value
      ) {
        this.#inputElementRef.value.value = this.lastSelectedOption.label;
      }
    });
  }

  #onDropdownAndOptionsFocusout(event: FocusEvent) {
    // If `event.relatedTarget` is `null`, the user has clicked an element outside
    // Dropdown that cannot receive focus. Otherwise, the user has either clicked
    // an element outside Dropdown that can receive focus or else has tabbed away
    // from Dropdown.
    const isFocusLost =
      event.relatedTarget === null ||
      (event.relatedTarget instanceof Node &&
        !this.#shadowRoot?.contains(event.relatedTarget) &&
        !this.contains(event.relatedTarget));

    if (isFocusLost && !this.#isRemovingTag) {
      this.open = false;
    }

    this.#onBlur();
  }

  // This handler is on `.dropdown-and-options` as opposed to just `.dropdown` because
  // options can receive focus via VoiceOver, and `.dropdown` won't emit a "keydown"
  // if an option is focused.
  #onDropdownAndOptionsKeydown(event: KeyboardEvent) {
    if (this.disabled || this.readonly) {
      return;
    }

    if (!this.open && event.key === 'Enter') {
      this.form?.requestSubmit();
      return;
    }

    if (event.key === 'Escape') {
      this.open = false;
      this.focus();
      return;
    }

    const isFromButtonOrInputOrAnOption =
      event.target === this.#buttonElementRef.value ||
      event.target === this.#inputElementRef.value ||
      event.target instanceof GlideCoreDropdownOption;

    // If multiselect, and `event.target` isn't one of the above, then the event came from
    // a tag and focus is on the tag. Arrowing up or down then pressing Enter would both
    // remove the tag and select or deselect the active option, which is probably not what
    // the user would expect. He'd only expect the tag to be removed.
    if (this.multiple && !isFromButtonOrInputOrAnOption) {
      return;
    }

    if (
      !this.open &&
      [' ', 'ArrowUp', 'ArrowDown'].includes(event.key) &&
      this.activeOption
    ) {
      // Prevents page scroll. Also prevents the insertion point moving to beginning or
      // end of the field and a " " character from being entered in addition to making the
      // options visible when Dropdown is filterable.
      event.preventDefault();

      this.open = true;

      // The user almost certainly wasn't intending to do both open Dropdown and change
      // the active option in the case of ArrowUp or ArrowDown. Thus return. The user
      // can press ArrowUp or ArrowDown again to change the active option.
      return;
    }

    if (this.activeOption && this.open) {
      if (event.key === 'Enter' || event.key === ' ') {
        // `#onDropdownClick` is called on click, and it opens or closes Dropdown.
        // Space and Enter produce "click" events. This property gives `#onDropdownClick`
        // the information it needs to guard against opening or closing when the event
        // is a result of an option being is selected or deselected.
        this.#isSelectionViaSpaceOrEnter = true;

        // Space is excluded when Dropdown isn't filterable because the user may want to
        // include a space in his filter and because he expects pressing Space to result
        // in a space. So we either cancel Space and let it select and deselect as when
        // Dropdown isn't filterable, or we let the user type it. Neither is ideal.
        if (
          event.key === 'Enter' ||
          (event.key === ' ' && !this.filterable && !this.isFilterable)
        ) {
          // Prevent the options from scrolling when a focused option is selected via Space
          // when using VoiceOver.
          event.preventDefault();

          this.activeOption.selected = this.multiple
            ? !this.activeOption.selected
            : true;

          if (this.activeOption === this.#selectAllElementRef.value) {
            this.#selectAllOrNone();
          }

          this.#unfilter();

          if (!this.multiple) {
            this.open = false;
          }

          this.dispatchEvent(new Event('change', { bubbles: true }));
          this.dispatchEvent(new Event('input', { bubbles: true }));
          return;
        }
      }

      const activeOptionIndex =
        this.#optionElementsNotHiddenIncludingSelectAll?.indexOf(
          this.activeOption,
        );

      // All the logic below could just as well go in a `@keydown` in Option. It's
      // here to mirror the tests, which necessarily test against Dropdown as a whole
      // because more than one option is required to test these interactions.
      if (
        event.key === 'ArrowUp' &&
        !event.metaKey &&
        this.#optionElementsNotHiddenIncludingSelectAll &&
        typeof activeOptionIndex === 'number'
      ) {
        // Prevent page scroll. When filterable, prevent the insertion point from
        // moving to the beginning of the field.
        event.preventDefault();

        const option = this.#optionElementsNotHiddenIncludingSelectAll.at(
          activeOptionIndex - 1,
        );

        // If we haven't reached the top, make the previous option active.
        if (option && activeOptionIndex !== 0) {
          this.#deactivateAllOptions();
          option.privateActive = true;
          option.scrollIntoView({ block: 'center' });
          this.ariaActivedescendant = option.id;
        }

        return;
      }

      if (
        event.key === 'ArrowDown' &&
        !event.metaKey &&
        this.#optionElementsNotHiddenIncludingSelectAll &&
        typeof activeOptionIndex === 'number'
      ) {
        // Prevent page scroll. When filterable, prevent the insertion point from
        // moving to the end of the field.
        event.preventDefault();

        const option = this.#optionElementsNotHiddenIncludingSelectAll.at(
          activeOptionIndex + 1,
        );

        // If `option` isn't defined, then we've reached the bottom.
        if (option) {
          this.#deactivateAllOptions();
          option.privateActive = true;
          option.scrollIntoView({ block: 'center' });
          this.ariaActivedescendant = option.id;
        }

        return;
      }

      if (
        ((event.key === 'ArrowUp' && event.metaKey) ||
          event.key === 'Home' ||
          event.key === 'PageUp') &&
        this.#optionElementsNotHiddenIncludingSelectAll
      ) {
        // Prevent page scroll. When filterable, prevent the insertion point from
        // moving to the beginning of the field.
        event.preventDefault();

        const option = this.#optionElementsNotHiddenIncludingSelectAll.at(0);

        if (option) {
          this.#deactivateAllOptions();
          option.privateActive = true;
          option.scrollIntoView({ block: 'end' });
          this.ariaActivedescendant = option.id;
        }

        return;
      }

      if (
        ((event.key === 'ArrowDown' && event.metaKey) ||
          event.key === 'End' ||
          event.key === 'PageDown') &&
        this.#optionElementsNotHiddenIncludingSelectAll
      ) {
        // Prevent page scroll. When filterable, prevent the insertion point from
        // moving to the end of the field.
        event.preventDefault();

        const option = this.#optionElementsNotHiddenIncludingSelectAll.at(-1);

        // If `option` isn't defined, then we've reached the bottom.
        if (option) {
          this.#deactivateAllOptions();
          option.privateActive = true;
          option.scrollIntoView();
          this.ariaActivedescendant = option.id;
        }

        return;
      }
    }
  }

  #onDropdownClick(event: MouseEvent) {
    if (this.disabled || this.readonly) {
      return;
    }

    if (this.#isRemovingTag) {
      this.#isRemovingTag = false;
      return;
    }

    if (
      event.target instanceof Node &&
      this.#buttonElementRef.value?.contains(event.target) &&
      !this.#isSelectionViaSpaceOrEnter &&
      this.open
    ) {
      this.open = false;

      // `event.detail` is an integer set to the number of clicks. When it's zero,
      // the event most likely originated from an Enter press. And, if Dropdown is part
      // of a form, Enter should result in a submit and the dropdown shouldn't be opened.
      // Thus we return, with or without a form for consistency.
    } else if (event.detail !== 0) {
      this.open = true;
      this.#inputElementRef.value?.select();
    }
  }

  #onDropdownMousedown(event: FocusEvent) {
    // Retain focus if anything inside it is clicked, like the padding around the
    // component. Clicking the padding will move focus to `document.body`, which is
    // not what the user expects.
    //
    // Having to exclude tags from this is unfortunate because clicking on the tag's
    // label or padding shouldn't cause the input to lose focus. The trouble is we
    // don't know it if was the tag's removal button that was clicked because it's
    // in a shadow DOM.

    const isFilterable = this.filterable || this.isFilterable;

    if (!(event.target instanceof GlideCoreTag) && isFilterable) {
      event.preventDefault();
      this.focus();
    } else if (!(event.target instanceof GlideCoreTag)) {
      event.preventDefault();
    }
  }

  #onInputInput(event: Event) {
    ow(this.#inputElementRef.value, ow.object.instanceOf(HTMLInputElement));

    // Allowing these "input" events to propagate would break things for consumers,
    // who expect "input" events only when an option is selected or deselected.
    event.stopPropagation();

    if (this.activeOption) {
      this.ariaActivedescendant = this.activeOption.id;
      this.isFiltering = this.#inputElementRef.value.value.trim() !== '';

      for (const option of this.#optionElements) {
        option.hidden = !option.label
          ?.toLowerCase()
          .includes(this.#inputElementRef.value?.value.toLowerCase().trim());
      }

      const firstVisibleOption = this.#optionElementsNotHidden?.at(0);

      // When filtering filters out the active option, make the first option active
      // if there is one.
      if (firstVisibleOption && this.activeOption?.hidden) {
        this.#deactivateAllOptions();
        firstVisibleOption.privateActive = true;
      }

      this.open = true;

      this.isOptionsHidden =
        !this.#optionElementsNotHidden ||
        this.#optionElementsNotHidden.length === 0
          ? true
          : false;
    }
  }

  #onInputKeydown(event: KeyboardEvent) {
    // Deselecting an option the user can't see ain't good. So they're filtered out.
    // As the user deselects options, ones previously overflowing will be become
    // visible and thus deselectable using Backspace.
    const lastSelectedAndNotOverflowingOption = this.selectedOptions
      .filter((_, index) => index <= this.#tagOverflowLimit - 1)
      .at(-1);

    if (
      lastSelectedAndNotOverflowingOption &&
      event.key === 'Backspace' &&
      !event.metaKey &&
      this.multiple &&
      this.#inputElementRef.value &&
      this.#inputElementRef.value.selectionStart === 0
    ) {
      lastSelectedAndNotOverflowingOption.selected = false;
      return;
    }

    const selectedAndNotOverflowingOptions = this.selectedOptions.filter(
      (_, index) => index <= this.#tagOverflowLimit - 1,
    );

    if (
      lastSelectedAndNotOverflowingOption &&
      event.key === 'Backspace' &&
      event.metaKey &&
      this.multiple &&
      this.#inputElementRef.value &&
      this.#inputElementRef.value.selectionStart === 0
    ) {
      for (const option of selectedAndNotOverflowingOptions) {
        option.selected = false;
      }

      return;
    }
  }

  #onOptionsClick(event: PointerEvent) {
    if (event.target instanceof Element) {
      const option = event.target.closest('glide-core-dropdown-option');

      if (option instanceof GlideCoreDropdownOption && !option.selected) {
        option.selected = true;
        this.#unfilter();

        if (!this.multiple) {
          this.#hide();
        }

        this.dispatchEvent(new Event('change', { bubbles: true }));
        this.dispatchEvent(new Event('input', { bubbles: true }));
      }
    }
  }

  // Options don't receive focus normally but can receive programmatic focus from
  // screen readers.
  #onOptionsFocusin(event: FocusEvent) {
    if (event.target instanceof GlideCoreDropdownOption) {
      this.#deactivateAllOptions();
      event.target.privateActive = true;
    }
  }

  // "input" is handled instead of the usual "change" because, for historical reasons,
  //  "change" isn't composed and so won't escape Dropdown Option's shadow DOM.
  #onOptionsInput(event: Event) {
    // So we don't emit duplicate events: one internally and one from the checkbox.
    event.stopPropagation();

    if (event.target instanceof GlideCoreDropdownOption) {
      event.target.selected = !event.target.selected;
    }

    if (event.target === this.#selectAllElementRef.value) {
      this.#selectAllOrNone();
    }

    this.#unfilter();
    this.dispatchEvent(new Event('change', { bubbles: true }));
    this.dispatchEvent(new Event('input', { bubbles: true }));
  }

  #onOptionsMousedown(event: MouseEvent) {
    // Keep focus on the input so the user can continue filtering while selecting options.
    if (this.filterable || this.isFilterable) {
      event.preventDefault();
    }
  }

  #onOptionsMouseover(event: MouseEvent) {
    if (
      event.target instanceof GlideCoreDropdownOption &&
      this.#optionElementsNotHiddenIncludingSelectAll
    ) {
      this.#deactivateAllOptions();
      event.target.privateActive = true;

      for (const option of this.#optionElementsNotHiddenIncludingSelectAll) {
        if (option.privateActive) {
          this.ariaActivedescendant = option.id;
        }
      }
    }
  }

  #onOptionsSelectedChange(event: Event) {
    // Update Select All to reflect the new selection or deselection.
    if (
      event.target !== this.#selectAllElementRef.value &&
      !this.#isSelectionChangeFromSelectAll &&
      this.#selectAllElementRef.value
    ) {
      this.#selectAllElementRef.value.selected = this.isAllSelected;
    }

    // Update `value`, `open`, `ariaActivedescendant`, and the value of `.input` if filterable.
    if (event.target instanceof GlideCoreDropdownOption) {
      if (this.multiple) {
        this.#value =
          event.target.selected && event.target.value
            ? [...this.value, event.target.value]
            : this.value.filter((value) => {
                return (
                  // No idea why TypeScript thinks `event.target` is possibly `null`
                  // when filtering given it's narrowed out above.
                  event.target instanceof GlideCoreDropdownOption &&
                  value !== event.target.value
                );
              });

        // The event this handler listens to is dispatched on both selection and deselection.
        // In the case of single-select, we don't care if the target has been deselected. We
        // also don't want any changes to focus or the state of `this.open` as a result.
      } else if (!this.multiple && event.target.selected) {
        this.#value = event.target.value ? [event.target.value] : [];

        if (this.#inputElementRef.value) {
          this.#inputElementRef.value.value = event.target.label;
        }
      }
    }

    // Dropdown's internal label now needs to be updated to reflect the selected option
    // or options. `this.internalLabel` uses the `this.selectedOptions` getter, whose
    // return value is derived from the state of another component: Dropdown Option.
    // For whatever reason, and even though that component's state is reactive, a change
    // to it doesn't result in a rerender of this component.
    this.requestUpdate();
  }

  #onOptionsValueChange(event: CustomEvent<{ old: string; new: string }>) {
    // A cleaner approach would be to return early if `event.target` isn't an instance
    // of `GlideCoreDropdownOption`. But doing so would create an untestable branch and thus
    // force less than full code coverage because `event.target` will always be an
    // instance of `GlideCoreDropdownOption`.
    //
    // This is also why `#optionElementsIncludingSelectAll` and `#optionElementsNotHiddenIncludingSelectAll`
    // return `undefined` instead of always returning an empty array. The empty array
    // branch would only exist to appease the typesystem and so would never actually get
    // hit, making full test coverage impossible. Maybe there's a better way?
    if (
      event.target instanceof GlideCoreDropdownOption &&
      this.multiple &&
      event.target.selected &&
      event.detail.new
    ) {
      // There shouldn't be duplicate values. But this will fall short if there are.
      // Both instances of the value will be removed from `this.#value` when, strictly
      // speaking, only one of them should. Knowing which to remove would require storing
      // some state in a map and probably isn't worth the trouble.
      this.#value = this.value.map((value) => {
        return value === event.detail.old ? event.detail.new : value;
      });
    } else if (
      event.target instanceof GlideCoreDropdownOption &&
      this.multiple
    ) {
      this.#value = this.value.filter((value) => {
        return value !== event.detail.old;
      });
    } else if (event.target instanceof GlideCoreDropdownOption) {
      this.#value = event.detail.new ? [event.detail.new] : [];
    }
  }

  async #onTagRemove(id: string) {
    this.#isRemovingTag = true;

    for (const option of this.#optionElements) {
      // Options have an ID for the `aria-activedescendant` case. They also have
      // an ID in case `value` is an empty string, undefined, or duplicate. A
      // developer might not intend for an ID to be one of those things. But it
      // happens. The data they're using to generate options, for example, may be
      // bad. Relying on an ID internally instead of `value` means we're always
      // deselecting the correct option.

      if (option.id === id) {
        option.selected = false;

        this.#value = this.value.filter((value) => {
          return value !== option.value;
        });
      }
    }

    const tags = this.#tagsElementRef.value?.querySelectorAll('glide-core-tag');

    if (tags && this.value.length > 0) {
      const index = [...tags].findIndex((tag) => tag.dataset.id === id);

      // The tag to be focused may be one that's currently hidden. So we wait
      // for it to become visible before trying to focus it.
      await this.updateComplete;

      // Move focus rightward unless it's the last tag.
      tags[index < tags.length - 1 ? index + 1 : index - 1]?.focus();
    } else {
      this.focus();
    }

    this.dispatchEvent(new Event('change', { bubbles: true }));
    this.dispatchEvent(new Event('input', { bubbles: true }));
  }

  #selectAllOrNone() {
    ow(
      this.#selectAllElementRef.value,
      ow.object.instanceOf(GlideCoreDropdownOption),
    );

    this.#isSelectionChangeFromSelectAll = true;

    for (const option of this.#optionElements) {
      option.selected = this.#selectAllElementRef.value.selected;
    }

    this.#isSelectionChangeFromSelectAll = false;
  }

  #show() {
    // `#show` is called whenever `open` is set. And `open` can be set arbitrarily
    // by the consumer. Rather than guarding against calling `#show` everywhere,
    // Floating UI is simply cleaned up every time `#show` is called.
    this.#cleanUpFloatingUi?.();

    if (this.#dropdownElementRef.value && this.#optionsElementRef.value) {
      this.#cleanUpFloatingUi = autoUpdate(
        this.#dropdownElementRef.value,
        this.#optionsElementRef.value,
        () => {
          (async () => {
            if (
              this.#dropdownElementRef.value &&
              this.#optionsElementRef.value
            ) {
              const { x, y, placement } = await computePosition(
                this.#dropdownElementRef.value,
                this.#optionsElementRef.value,
                {
                  placement: 'bottom-start',
                  middleware: [
                    offset({
                      mainAxis:
                        Number.parseFloat(
                          window
                            .getComputedStyle(document.body)
                            .getPropertyValue('--glide-core-spacing-xxs'),
                        ) *
                        Number.parseFloat(
                          window.getComputedStyle(document.documentElement)
                            .fontSize,
                        ),
                    }),
                    flip(),
                  ],
                },
              );

              this.#optionsElementRef.value.dataset.placement = placement;

              Object.assign(this.#optionsElementRef.value.style, {
                left: `${x}px`,
                top: `${y}px`,
              });

              this.#optionsElementRef.value?.showPopover();

              if (this.activeOption) {
                this.ariaActivedescendant = this.activeOption.id;
              }
            }
          })();
        },
      );
    }
  }

  #unfilter() {
    const isFilterable = this.filterable || this.isFilterable;

    if (isFilterable && this.#inputElementRef.value) {
      this.isFiltering = false;

      for (const option of this.#optionElements) {
        option.hidden = false;
      }
    }
  }
}
