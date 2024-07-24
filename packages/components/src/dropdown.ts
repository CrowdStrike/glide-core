import './checkbox.js';
import './dropdown.option.js';
import './label.js';
import { LitElement, html } from 'lit';
import { LocalizeController } from './library/localize.js';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { svg } from 'lit/static-html.js';
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
 * @description A dropdown with optional description and tooltip. Participates in forms and validation via `FormData` and various methods.
 *
 * @event change - Dispatched when an option is selected. An array of the selected option values is assigned to `event.detail`.
 * @event input - Dispatched when an option is selected. An array of the selected option values is assigned to `event.detail`.
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
  disabled = false;

  @property({ attribute: 'hide-label', reflect: true, type: Boolean })
  hideLabel = false;

  @property({ reflect: true })
  label?: string;

  @property({ reflect: true })
  name?: string;

  @property({ reflect: true, type: Boolean })
  open = false;

  @property({ reflect: true })
  orientation: 'horizontal' | 'vertical' = 'horizontal';

  @property({ reflect: true })
  placeholder?: string;

  @property({ type: Boolean })
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

  private get activeOption() {
    return this.#optionElementsIncludingSelectAll?.find(
      ({ privateActive }) => privateActive,
    );
  }

  private get internalLabel() {
    return !this.isFilterable && this.selectedOptions.length === 0
      ? this.placeholder
      : !this.multiple &&
          !this.isFilterable &&
          this.selectedOptions.at(-1)?.label
        ? this.selectedOptions.at(-1)?.label
        : '';
  }

  checkValidity() {
    this.isCheckingValidity = true;
    const validity = this.#internals.checkValidity();
    this.isCheckingValidity = false;

    return validity;
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
  }

  // The button doesn't receive focus when `shadowRoot.delegatesFocus` is set,
  // and the inherited `this.focus` is called. It's not clear why. Thus the override.
  override focus() {
    if (this.isFilterable) {
      this.#inputElementRef.value?.focus();
    } else {
      this.#buttonElementRef.value?.focus();
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
      <glide-core-label
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
                            removable-label=${label ?? ''}
                            @remove=${this.#onTagRemove.bind(this, id)}
                          >
                            ${label}
                          </glide-core-tag>
                        </li>`;
                      },
                    )}
                  `;
                })}
              </ul>`;
            })}
            ${when(this.isFilterable, () => {
              return html`<input
                aria-activedescendant=${this.ariaActivedescendant}
                aria-controls="options"
                aria-describedby="description"
                aria-expanded=${this.open}
                aria-labelledby="selected-option-labels label"
                autocapitalize="off"
                autocomplete="off"
                class=${classMap({
                  input: true,
                  selection: Boolean(this.selectedOptions.at(0)),
                  single: !this.multiple,
                })}
                data-test="input"
                id="input"
                placeholder=${this.multiple ||
                !this.selectedOptions.at(-1)?.label
                  ? this.placeholder ?? ''
                  : this.selectedOptions.at(-1)?.label ?? ''}
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
            ${when(this.selectedOptions.length > this.#tagOverflowLimit, () => {
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
            })}

            <button
              aria-hidden=${this.isFilterable}
              aria-expanded=${this.open}
              aria-haspopup="listbox"
              aria-labelledby="selected-option-labels label"
              aria-describedby="description"
              aria-controls="options"
              class="button"
              data-test="button"
              id="button"
              tabindex=${this.isFilterable || this.disabled ? '-1' : '0'}
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
                  return svg`<svg
                    aria-label=${this.#localize.term('open')}
                    class=${classMap({
                      'caret-icon': true,
                      disabled: this.disabled,
                      readonly: this.readonly,
                    })}
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

          <div
            aria-labelledby=${this.isFilterable ? 'input' : 'button'}
            class=${classMap({
              options: true,
              visible:
                this.open && !this.disabled && !this.isEveryOptionFilteredOut,
            })}
            data-test="options"
            data-test-visible=${this.open &&
            !this.disabled &&
            !this.isEveryOptionFilteredOut}
            id="options"
            role="listbox"
            @focusin=${this.#onOptionsFocusin}
            @mousedown=${this.#onOptionsMousedown}
            @mouseover=${this.#onOptionsMouseover}
          >
            <glide-core-dropdown-option
              class="select-all"
              data-test="select-all"
              label=${this.#localize.term('selectAll')}
              ?hidden=${!this.selectAll || !this.multiple || this.isFiltering}
              @private-selected-change=${this.#onSelectAllSelectedChange}
              ${ref(this.#selectAllElementRef)}
            ></glide-core-dropdown-option>

            <slot
              @private-selected-change=${this.#onOptionsSelectedChange}
              @private-value-change=${this.#onOptionsValueChange}
              @slotchange=${this.#onDefaultSlotChange}
              ${ref(this.#defaultSlotElementRef)}
            ></slot>
          </div>
        </div>

        <slot id="description" name="description" slot="description"></slot>
      </glide-core-label>
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
  private isEveryOptionFilteredOut = false;

  @state()
  private isFilterable = false;

  @state()
  private isFiltering = false;

  @state()
  private isReportValidityOrSubmit = false;

  #buttonElementRef = createRef<HTMLButtonElement>();

  #defaultSlotElementRef = createRef<HTMLSlotElement>();

  #inputElementRef = createRef<HTMLInputElement>();

  #internals: ElementInternals;

  // When Select All is changed, only a single event should be dispatched.
  // `#onOptionsSelectedChange` uses this to guard against dispatching "change"
  // and "input" events in addition to those of `#onSelectAllSelectedChange`
  #isExternalSelectAllChange = false;

  // Prevents an infinite loop when `selected` of Select All changes due to an
  // option's `selected` changing.
  #isInternalSelectAllChange = false;

  #isMultiple = false;

  #isRemovingTag = false;

  #isSelectionViaSpaceOrEnter = false;

  #localize = new LocalizeController(this);

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
      this.ariaActivedescendant = '';
    } else if (!this.multiple && !(event.target instanceof GlideCoreDropdown)) {
      this.open = false;
      this.ariaActivedescendant = '';
    }
  };

  // An arrow function field instead of a method so `this` is closed over and
  // set to the component instead of the form.
  #onFormdata = ({ formData }: FormDataEvent) => {
    if (this.name && this.value.length > 0 && !this.disabled) {
      formData.append(this.name, JSON.stringify(this.value));
    }
  };

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

  #deactivateAllOptions() {
    if (this.#optionElementsIncludingSelectAll) {
      for (const option of this.#optionElementsIncludingSelectAll) {
        option.privateActive = false;
      }
    }
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
      this.#isInternalSelectAllChange = true;
      this.#selectAllElementRef.value.selected = this.isAllSelected;

      this.#selectAllElementRef.value.privateIndeterminate =
        this.isSomeSelected && !this.isAllSelected;
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
  }

  #onDropdownAndOptionsFocusout(event: FocusEvent) {
    // If `event.relatedTarget` is `null`, focus has moved outside this component's
    // shadow DOM, which means the user is done interacting with Dropodown. So we
    // close it except when focus has moved to a tag, which tells us Dropdown is
    // still in use.

    const isFocusLost =
      event.relatedTarget === null ||
      (event.relatedTarget instanceof Node &&
        !this.shadowRoot?.contains(event.relatedTarget) &&
        !this.contains(event.relatedTarget));

    if (isFocusLost && !this.#isRemovingTag) {
      this.open = false;
      this.ariaActivedescendant = '';
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

    if (event.key === 'Escape') {
      this.open = false;
      this.ariaActivedescendant = '';
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
      // options visible when `this.isFilterable`.
      event.preventDefault();

      this.open = true;
      this.ariaActivedescendant = this.activeOption.id;

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

        if (event.key === 'Enter') {
          this.activeOption.selected = !this.activeOption?.selected;

          return;
        }

        // Space is excluded when Dropdown isn't filterable because the user may want to
        // include a space in his filter and because he expects pressing Space to result
        // in a space. So we either cancel Space and let it select and deselect as when
        // Dropdown isn't filterable, or we let the user type it. Neither is ideal.
        if (event.key === ' ' && !this.isFilterable) {
          this.activeOption.selected = !this.activeOption?.selected;

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
      this.ariaActivedescendant = '';

      // `event.detail` is an integer set to the number of clicks. When it's zero,
      // the event most likely originated from an Enter press. And, if Dropdown is part
      // of a form, Enter should result in a submit and the dropdown shouldn't be opened.
      // Thus we return, with or without a form for consistency.
    } else if (!this.open && event.detail !== 0 && this.activeOption) {
      this.open = true;
      this.ariaActivedescendant = this.activeOption.id;
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
    if (!(event.target instanceof GlideCoreTag) && this.isFilterable) {
      event.preventDefault();
      this.focus();
    } else if (!(event.target instanceof GlideCoreTag)) {
      event.preventDefault();
    }
  }

  #onInputInput() {
    if (this.#inputElementRef.value && this.activeOption) {
      this.open = true;
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
        this.ariaActivedescendant = firstVisibleOption.id;
      }

      this.isEveryOptionFilteredOut =
        !this.#optionElementsNotHidden ||
        this.#optionElementsNotHidden.length === 0;
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
      this.multiple &&
      this.#inputElementRef.value &&
      this.#inputElementRef.value.selectionStart === 0
    ) {
      lastSelectedAndNotOverflowingOption.selected = false;
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

  #onOptionsMousedown(event: MouseEvent) {
    // Keep focus on the input so the user can continue filtering while selecting options.
    if (this.isFilterable) {
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
      this.#selectAllElementRef.value &&
      event.target !== this.#selectAllElementRef.value
    ) {
      this.#isInternalSelectAllChange = true;
      this.#selectAllElementRef.value.selected = this.isAllSelected;

      this.#selectAllElementRef.value.privateIndeterminate =
        this.isSomeSelected && !this.isAllSelected;
    }

    // Reset .`input` and unhide the options.
    if (this.isFilterable && this.#inputElementRef.value) {
      this.#inputElementRef.value.value = '';
      this.isFiltering = false;

      for (const option of this.#optionElements) {
        option.hidden = false;
      }
    }

    // Update `value`, `open`, focus, and the value of `.input` if filterable.
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

        if (!this.#isExternalSelectAllChange) {
          this.dispatchEvent(new Event('change', { bubbles: true }));
          this.dispatchEvent(new Event('input', { bubbles: true }));
        }

        // The event this handler listens to is dispatched on both selection and deselection.
        // In the case of single-select, we don't care if the target has been deselected. We
        // also don't want any changes to focus or the state of `this.open` as a result.
      } else if (!this.multiple && event.target.selected) {
        this.#value = event.target.value ? [event.target.value] : [];
        this.open = false;
        this.ariaActivedescendant = '';
        this.focus();

        if (this.isFilterable && this.#inputElementRef.value) {
          this.isFiltering = false;
        }

        // Dispatched here instead of outside both conditions so it's not dispatched
        // twice as a result of the previously selected option being deselected.
        this.dispatchEvent(new Event('change', { bubbles: true }));
        this.dispatchEvent(new Event('input', { bubbles: true }));
      }
    }

    // Dropdown's internal label now needs to be updated to reflect the selected option
    // or options. `this.internalLabel` uses the `this.selectedOptions` getter, whose
    // return value is derived from the state of another component: Dropdown Option.
    // For whatever reason, and even though that component's state is reactive, a change
    // to it doesn't result in a rerender of this component. So one is forced.
    this.requestUpdate();
  }

  #onOptionsValueChange(event: CustomEvent<string>) {
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
      event.target.value
    ) {
      // There shouldn't be duplicate values. But this will fall short if there are.
      // Both instances of the value will be removed from `this.#value` when, strictly
      // speaking, only one of them should. Knowing which to remove would involve a
      // map. Probably not worth the trouble.
      this.#value = [
        ...this.value.filter((value) => value !== event.detail),
        event.target.value,
      ];
    } else if (
      event.target instanceof GlideCoreDropdownOption &&
      this.multiple
    ) {
      this.#value = this.value.filter((value) => {
        return (
          // No idea why TypeScript thinks `event.target` is possibly `null` when
          // filtering given it's narrowed out above.
          event.target instanceof GlideCoreDropdownOption &&
          value !== event.detail
        );
      });
    } else if (event.target instanceof GlideCoreDropdownOption) {
      this.#value = event.target.value ? [event.target.value] : [];
    }
  }

  #onSelectAllSelectedChange() {
    if (this.#isInternalSelectAllChange) {
      this.#isInternalSelectAllChange = false;
      return;
    }

    this.#isExternalSelectAllChange = true;

    // Cached so the `option.selected` changes below aren't taken into account.
    const isAllSelected = this.isAllSelected;

    for (const option of this.#optionElements) {
      option.selected = !isAllSelected;
    }

    // `false` now that `#onOptionsSelectedChange` has been called for every option.
    // Otherwise, future selection and deselection of options won't produce "change"
    // and "input" events.
    this.#isExternalSelectAllChange = false;

    this.dispatchEvent(new Event('change', { bubbles: true }));
    this.dispatchEvent(new Event('input', { bubbles: true }));
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
  }
}
