import './checkbox.js';
import './icon-button.js';
import './label.js';
import './tooltip.js';
import { html, LitElement } from 'lit';
import { autoUpdate, computePosition, flip, offset } from '@floating-ui/dom';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { repeat } from 'lit/directives/repeat.js';
import { range } from 'lit/directives/range.js';
import { map } from 'lit/directives/map.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { when } from 'lit/directives/when.js';
import packageJson from '../package.json' with { type: 'json' };
import onResize from './library/on-resize.js';
import DropdownOption from './dropdown.option.js';
import { LocalizeController } from './library/localize.js';
import Tag from './tag.js';
import chevronIcon from './icons/chevron.js';
import magnifyingGlassIcon from './icons/magnifying-glass.js';
import pencilIcon from './icons/pencil.js';
import styles from './dropdown.styles.js';
import assertSlot from './library/assert-slot.js';
import type FormControl from './library/form-control.js';
import shadowRootMode from './library/shadow-root-mode.js';
import final from './library/final.js';
import required from './library/required.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-dropdown': Dropdown;
  }
}

/**
 * @attr {string} label
 * @attr {boolean} [disabled=false]
 * @attr {boolean} [filterable=false]
 * @attr {boolean} [hide-label=false]
 * @attr {boolean} [loading=false]
 * @attr {boolean} [multiple=false]
 * @attr {string} [name='']
 * @attr {boolean} [open=false]
 * @attr {'horizontal'|'vertical'} [orientation='horizontal']
 * @attr {string} [placeholder]
 * @attr {boolean} [readonly=false]
 * @attr {boolean} [required=false]
 * @attr {boolean} [select-all=false]
 * @attr {string} [tooltip]
 * @attr {string[]} [value=[]]
 * @attr {'quiet'} [variant]
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {DropdownOption}
 * @slot {Element | string} [description] - Additional information or context
 * @slot {Element} [icon:value] - Icons for the selected option or options. Slot one icon per Dropdown Option. `<value>` should be equal to the `value` of each Dropdown Option.
 *
 * @fires {Event} change
 * @fires {Event} input
 * @fires {Event} invalid
 * @fires {Event} toggle
 *
 * @readonly
 * @prop {HTMLFormElement | null} form
 *
 * @readonly
 * @prop {ValidityState} validity
 *
 * @method checkValidity
 * @returns boolean
 *
 * @method filter
 * @param {string} query
 * @returns Promise<DropdownOption[] | undefined | void>
 *
 * @method formAssociatedCallback
 * @method formResetCallback
 *
 * @method reportValidity
 * @returns boolean
 *
 * @method resetValidityFeedback
 *
 * @method setCustomValidity
 * @param {string} message
 *
 * @method setValidity
 * @param {ValidityStateFlags} [flags]
 * @param {string} [message]
 */
@customElement('glide-core-dropdown')
@final
export default class Dropdown extends LitElement implements FormControl {
  static formAssociated = true;

  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: shadowRootMode,
  };

  static override styles = styles;

  @property({ reflect: true })
  @required
  label?: string;

  /**
   * @default false
   */
  @property({ reflect: true, type: Boolean })
  get disabled(): boolean {
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

  /**
   * @default false
   */
  @property({ reflect: true, type: Boolean })
  get filterable(): boolean {
    return this.#isFilterable;
  }

  set filterable(isFilterable: boolean) {
    if (this.#isFilterable !== isFilterable && isFilterable && !this.multiple) {
      if (this.#inputElementRef.value && this.selectedOptions[0]?.label) {
        this.#inputElementRef.value.value = this.selectedOptions[0].label;
        this.inputValue = this.selectedOptions[0].label;

        this.isInputOverflow =
          this.#inputElementRef.value.scrollWidth >
          this.#inputElementRef.value.clientWidth;
      }
    } else if (this.#isFilterable !== isFilterable) {
      this.#unfilter();
    }

    this.#isFilterable = isFilterable;
  }

  @property({ attribute: 'hide-label', reflect: true, type: Boolean })
  hideLabel = false;

  @property({ reflect: true, type: Boolean })
  loading = false;

  @property({ reflect: true, useDefault: true })
  name = '';

  /**
   * @default false
   */
  @property({ reflect: true, type: Boolean })
  get open(): boolean {
    return this.#isOpen;
  }

  set open(isOpen: boolean) {
    const hasChanged = isOpen !== this.#isOpen;
    this.#isOpen = isOpen;

    if (isOpen && hasChanged && !this.disabled) {
      this.hasNoAvailableOptions = this.#optionElements.length === 0;
      this.#show();

      this.dispatchEvent(
        new Event('toggle', { bubbles: true, composed: true }),
      );

      return;
    }

    if (!this.open && hasChanged) {
      if (
        !this.multiple &&
        this.#inputElementRef.value &&
        this.selectedOptions[0]?.label
      ) {
        this.#inputElementRef.value.value = this.selectedOptions[0].label;
        this.inputValue = this.selectedOptions[0].label;
      } else if (
        !this.multiple &&
        this.#inputElementRef.value &&
        this.selectedOptions.length === 0
      ) {
        this.#inputElementRef.value.value = '';
        this.inputValue = '';
      } else if (this.multiple && this.#inputElementRef.value) {
        this.#inputElementRef.value.value = '';
        this.inputValue = '';
      }

      this.isFiltering = false;
      this.hasNoMatchingOptions = false;
      this.isShowSingleSelectIcon = Boolean(this.selectedOptions.at(0)?.value);

      for (const option of this.#optionElements) {
        option.hidden = false;
      }

      this.#hide();

      this.dispatchEvent(
        new Event('toggle', { bubbles: true, composed: true }),
      );
    }
  }

  @property({ reflect: true, useDefault: true })
  orientation: 'horizontal' | 'vertical' = 'horizontal';

  @property({ reflect: true })
  placeholder?: string;

  // Private because it's only meant to be used by Form Controls Layout.
  @property()
  privateSplit?: 'left' | 'middle' | 'right';

  @property({ reflect: true, type: Boolean })
  readonly = false;

  @property({ attribute: 'select-all', reflect: true, type: Boolean })
  selectAll = false;

  @property({ reflect: true, type: Boolean })
  required = false;

  /**
   * @default false
   */
  @property({ reflect: true, type: Boolean })
  get multiple(): boolean {
    return this.#isMultiple;
  }

  set multiple(isMultiple) {
    const wasMultiple = this.#isMultiple && !isMultiple;
    const wasSingle = !this.#isMultiple && isMultiple;

    this.#isMultiple = isMultiple;
    this.isShowSingleSelectIcon = false;

    for (const option of this.#optionElements) {
      option.privateMultiple = isMultiple;

      // A single-select can only have one option selected. All but the last one
      // are deselected.
      if (wasMultiple && option !== this.lastSelectedOption) {
        option.selected = false;
      }
    }

    if (wasMultiple && this.lastSelectedOption?.value) {
      this.value = [this.lastSelectedOption.value];
    } else if (wasSingle && this.lastSelectedOption) {
      // If Dropdown was single-select and filterable and an option is selected,
      // then the value of its `<input>` is set to the label of the selected option.
      // That behavior doesn't apply to multiselect Dropdown because its selected
      // option or options are represented by tags. So we clear the `<input>`.
      if (this.#inputElementRef.value) {
        this.#inputElementRef.value.value = '';
      }

      this.lastSelectedOption.privateUpdateCheckbox();
      this.#setTagOverflowLimit();
    }
  }

  @property({ reflect: true })
  tooltip?: string;

  // Intentionally not reflected to match native.
  /**
   * @default []
   */
  @property({ type: Array })
  get value(): string[] {
    return this.#value;
  }

  set value(value: string[]) {
    this.#value = value;

    if (!this.multiple && value.length > 1) {
      throw new Error('Only one value is allowed when not `multiple`.');
    }

    // When an option is selected, `#inputElementRef.value.value` is set the `label`
    // of the selected option. If Dropdown's `value` has been emptied, it means an
    // option is no longer selected. So the `value` of `#inputElementRef.value` should
    // be emptied too.
    if (
      !this.multiple &&
      this.value.length === 0 &&
      this.#inputElementRef.value &&
      this.selectedOptions.length === 1
    ) {
      this.#inputElementRef.value.value = '';
    }

    for (const option of this.#optionElements) {
      this.#isSelectionFromValueSetter = true;

      // If `value` is falsy, every option is left unselected. Otherwise, every
      // `option.value` that's an empty string would be selected. If multiple
      // options have the same `value`, they'll all be selected. No way to
      // avoid that unfortunately.
      option.selected = value.some((value) => value && value === option.value);

      this.#isSelectionFromValueSetter = false;

      // We have a few options if `value` is set programmatically to include
      // the value of a disabled option. We can throw, remove the value from
      // `value`, or enable the option.
      //
      // Throwing is attractive because the inclusion of a disabled option
      // in `value` is likely a mistake, either due to bad data or developer
      // error.
      //
      // But we only throw in development. So the form will be submitted with
      // the new `value` in production regardless if it was by mistake. By enabling
      // the option, we at least ensure the user is aware of the fact that it'll
      // be included in the submission.
      if (option.selected && option.disabled) {
        option.disabled = false;
      }
    }
  }

  /*
    Waiting on visual treatment from Design. For now, this only applies when multiselection
    isn't enabled and filtering is disabled.
  */
  @property({ reflect: true })
  variant?: 'quiet';

  @property({ reflect: true })
  readonly version: string = packageJson.version;

  private get activeOption() {
    return this.#optionElementsIncludingSelectAll?.find(
      ({ privateActive }) => privateActive,
    );
  }

  checkValidity(): boolean {
    this.isCheckingValidity = true;
    const isValid = this.#internals.checkValidity();
    this.isCheckingValidity = false;

    return isValid;
  }

  override click() {
    if (this.filterable || this.isFilterable) {
      this.#inputElementRef.value?.click();
      this.#inputElementRef.value?.select();
    } else {
      this.#primaryButtonElementRef.value?.click();
    }
  }

  private get selectedOptions() {
    return this.#optionElements.filter((option): option is DropdownOption => {
      return (
        option instanceof DropdownOption && option.selected && !option.disabled
      );
    });
  }

  private get lastSelectedOption() {
    return this.#optionElements.findLast((option) => option.selected);
  }

  private get isAllSelected() {
    return (
      this.#optionElements.length > 0 &&
      this.#optionElements.filter(({ selected }) => selected).length ===
        this.#optionElements.filter(({ disabled }) => !disabled).length
    );
  }

  private get isSomeSelected() {
    return this.#optionElements.some(({ selected }) => selected);
  }

  private get internalLabel() {
    const isFilterable = this.filterable || this.isFilterable;

    return !isFilterable && this.selectedOptions.length === 0
      ? this.placeholder
      : !this.multiple && !isFilterable && this.selectedOptions.at(-1)?.label
        ? this.selectedOptions.at(-1)?.label
        : '';
  }

  override connectedCallback() {
    super.connectedCallback();

    document.addEventListener('click', this.#onDocumentClick, {
      // 1. The consumer has a click handler on a button.
      // 2. The user clicks the button.
      // 3. The button's click handler is called and it sets `this.open` to `true`.
      // 4. The "click" event bubbles up and is handled by `#onDocumentClick`.
      // 5. That handler sets `open` to `false` because the click came from outside Dropdown.
      // 6. Dropdown is opened then closed in the same frame and so never opens.
      //
      // `capture` ensures `#onDocumentClick` is called before #3, so the button click
      // handler setting `open` to `true` isn't overwritten by this handler setting `open`
      // to `false`.
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

  // `async` because it may return a promise when overridden.
  //
  // eslint-disable-next-line @typescript-eslint/require-await
  async filter(query: string): Promise<DropdownOption[] | undefined | void> {
    return this.#optionElements.filter(({ label }) => {
      return label?.toLowerCase().includes(query.toLowerCase().trim());
    });
  }

  override firstUpdated() {
    if (this.#optionsAndFeedbackElementRef.value) {
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
      this.#optionsAndFeedbackElementRef.value.popover = 'manual';
    }

    if (this.open && !this.disabled) {
      this.#show();
    }

    if (
      !this.multiple &&
      this.lastSelectedOption &&
      this.#inputElementRef.value &&
      this.lastSelectedOption.label
    ) {
      this.#inputElementRef.value.value = this.lastSelectedOption.label;
    }

    const hasNoSelectedOptions = this.#optionElements.every(
      ({ selected }) => !selected,
    );

    // When `value` is set on initial render, its setter is called before
    // `connectedCallback()` and thus before the default slot has any assigned
    // elements. So we set it again here after the initial render is complete
    // so `this.#optionElements` isn't empty.
    //
    // Additionally, `#onDefaultSlotChange()` is called after `firstUpdated()`
    // and sets `value` based on which options are selected. And the initial `value`
    // may conflict with the one derived from which options are selected.
    //
    // So we have a decision to make. On first render, do we defer to the initial
    // `value` and select and deselect options below? Or do we defer to `#onDefaultSlotChange()`
    // and let that method change `value` from its initial value based on which options
    // are selected?
    //
    // It's largely a toss-up. But the latter seems like the logical choice given
    // `#onDefaultSlotChange()` is called after `firstUpdated()`. In other words, we
    // defer to the lifecycle. `#onDefaultSlotChange()` is called second. So it gets to
    // override what `value` was initially.
    //
    // If no options are selected, then it's obvious that the consumer's intention is
    // to select options based on the initial `value` and that the initial `value` is
    // the intended one. So we proceed.
    if (hasNoSelectedOptions) {
      for (const option of this.#optionElements) {
        // If `value` is an empty string, every option is left unselected. Otherwise,
        // every `option.value` that's an empty string would be selected.
        //
        // If multiple options have the same `value`, they'll all be selected. But no
        // way to avoid that unfortunately.
        option.selected = this.value.some(
          (value) => value !== '' && value === option.value,
        );

        if (option.selected && option.disabled) {
          option.disabled = false;
        }
      }
    }
  }

  // The button doesn't receive focus when `shadowRoot.delegatesFocus` is set,
  // and the inherited `this.focus` is called. It's not clear why. Thus the override.
  override focus(options?: FocusOptions) {
    if (this.filterable || this.isFilterable) {
      this.#inputElementRef.value?.focus(options);
    } else {
      this.#primaryButtonElementRef.value?.focus(options);
    }
  }

  get form(): HTMLFormElement | null {
    return this.#internals.form;
  }

  get validity(): ValidityState {
    if (this.required && this.selectedOptions.length === 0) {
      // A validation message is required but unused because we disable native validation feedback.
      // And an empty string isn't allowed. Thus a single space.
      this.#internals.setValidity(
        { customError: Boolean(this.validityMessage), valueMissing: true },
        ' ',
        this.filterable || this.isFilterable
          ? this.#inputElementRef.value
          : this.#primaryButtonElementRef.value,
      );

      return this.#internals.validity;
    }

    if (
      this.required &&
      this.#internals.validity.valueMissing &&
      this.selectedOptions.length > 0
    ) {
      this.#internals.setValidity({});
      return this.#internals.validity;
    }

    return this.#internals.validity;
  }

  formAssociatedCallback(): void {
    this.form?.addEventListener('formdata', this.#onFormdata);
  }

  formResetCallback(): void {
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
    // a `selected` attribute to more than one option. How native handles it
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

    // The linter wants a "focus" handler on the slot, but there's nothing to be done with
    // one in this case.

    // The linter wants a "keydown" handler on '.dropdown'. Instead, there's one on
    // `.dropdown-and-options` because much of the logic in the handler also applies
    // to options, which can receive focus, and "keydown" events won't be emitted on ".dropdown"
    // when it doesn't have focus.

    /* eslint-disable lit-a11y/mouse-events-have-key-events, lit-a11y/click-events-have-key-events */
    return html`<div
      class=${classMap({
        component: true,
        horizontal: this.orientation === 'horizontal',
        vertical: this.orientation === 'vertical',
      })}
      @mouseup=${this.#onComponentMouseup}
      ${onResize(this.#setTagOverflowLimit.bind(this))}
      ${ref(this.#componentElementRef)}
    >
      <glide-core-private-label
        label=${ifDefined(this.label)}
        orientation=${this.orientation}
        split=${ifDefined(this.privateSplit ?? undefined)}
        tooltip=${ifDefined(this.tooltip)}
        ?disabled=${this.disabled}
        ?error=${this.#isShowValidationFeedback}
        ?hide=${this.hideLabel}
        ?required=${this.required}
      >
        <label for="primary-button" id="label"> ${this.label} </label>

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
              ${this.selectedOptions.map(
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
                ${repeat(
                  this.selectedOptions,
                  ({ id }) => id,
                  ({ id, editable, label, value }, index) => {
                    return html`<li
                      class=${classMap({
                        'tag-container': true,
                        hidden: index > this.tagOverflowLimit - 1,
                      })}
                      data-test="tag-container"
                      data-test-hidden=${index > this.tagOverflowLimit - 1}
                    >
                      <glide-core-tag
                        data-test="tag"
                        data-id=${id}
                        label=${ifDefined(label)}
                        removable
                        ?disabled=${this.disabled || this.readonly}
                        ?private-editable=${editable}
                        @edit=${this.#onTagEdit}
                        @remove=${this.#onTagRemove.bind(this, id)}
                      >
                        ${when(value, () => {
                          return html`
                            <slot
                              data-test="multiselect-icon-slot"
                              name="icon:${value}"
                              slot="icon"
                            >
                              <!--
                                Icons for the selected option or options.
                                Slot one icon per Dropdown Option.
                                \`<value>\` should be equal to the \`value\` of each Dropdown Option.

                                @name icon:value
                                @type {Element}
                              -->
                            </slot>
                          `;
                        })}
                      </glide-core-tag>
                    </li>`;
                  },
                )}
              </ul>`;
            })}
            ${when(this.isShowSingleSelectIcon, () => {
              return html`<slot
                class=${classMap({
                  'single-select-icon-slot': true,
                  quiet: this.variant === 'quiet',
                })}
                data-test="single-select-icon-slot"
                name="icon:${this.selectedOptions.at(0)?.value}"
              >
                <!--
                  @type {Element}
                  @ignore
                -->
              </slot>`;
            })}

            <glide-core-tooltip
              class=${classMap({
                'input-tooltip': true,
                visible: this.filterable || this.isFilterable,
              })}
              data-test="input-tooltip"
              label=${this.inputValue}
              offset=${8}
              ?disabled=${this.open || !this.isInputOverflow}
              ?open=${!this.open && this.isInputTooltipOpen}
              @toggle=${this.#onTooltipToggle}
              screenreader-hidden
            >
              <div class="input-container" slot="target">
                <input
                  aria-activedescendant=${this.ariaActivedescendant}
                  aria-controls="options"
                  aria-describedby="description"
                  aria-expanded=${this.open && !this.disabled}
                  aria-labelledby="selected-option-labels label loading-feedback ${this
                    .isCommunicateItemCountToScreenreaders
                    ? 'item-count'
                    : ''}"
                  autocapitalize="off"
                  autocomplete="off"
                  class=${classMap({
                    input: true,
                    quiet: this.variant === 'quiet',
                  })}
                  data-test="input"
                  id="input"
                  placeholder=${this.multiple ||
                  !this.selectedOptions.at(-1)?.label
                    ? (this.placeholder ?? '')
                    : ''}
                  role="combobox"
                  spellcheck="false"
                  tabindex=${this.disabled ? '-1' : '0'}
                  ?disabled=${this.disabled}
                  ?readonly=${this.readonly}
                  @blur=${this.#onInputBlur}
                  @focus=${this.#onInputFocus}
                  @input=${this.#onInputInput}
                  @keydown=${this.#onInputKeydown}
                  ${onResize(this.#onInputResize.bind(this))}
                  ${ref(this.#inputElementRef)}
                />

                ${when(
                  !this.multiple &&
                    this.isInputOverflow &&
                    this.inputValue === this.selectedOptions.at(-1)?.label,
                  () => {
                    return html`<span aria-hidden="true" data-test="ellipsis">
                      …
                    </span>`;
                  },
                )}

                <span
                  aria-label=${this.#localize.term(
                    'itemCount',
                    this.itemCount.toString(),
                  )}
                  aria-live="assertive"
                  class="item-count"
                  data-test="item-count"
                  id="item-count"
                ></span>
              </div>
            </glide-core-tooltip>

            <glide-core-tooltip
              class=${classMap({
                'internal-label-tooltip': true,
                visible: Boolean(this.internalLabel),
              })}
              data-test="internal-label-tooltip"
              label=${this.internalLabel ?? ''}
              offset=${8}
              ?disabled=${this.open ||
              this.multiple ||
              this.filterable ||
              this.isFilterable ||
              !this.isInternalLabelOverflow}
              ?open=${!this.open && this.isInternalLabelTooltipOpen}
              @toggle=${this.#onTooltipToggle}
              screenreader-hidden
            >
              <div
                class="internal-label"
                data-test="internal-label"
                slot="target"
                ${onResize(this.#onInternalLabelResize.bind(this))}
                ${ref(this.#internalLabelElementRef)}
              >
                ${when(
                  this.internalLabel === this.placeholder,
                  () => {
                    return html`<span
                      class=${classMap({
                        placeholder: true,
                        quiet: this.variant === 'quiet',
                      })}
                    >
                      ${this.internalLabel}
                    </span>`;
                  },
                  () => this.internalLabel,
                )}
              </div>
            </glide-core-tooltip>

            <div class="tag-overflow-and-buttons">
              ${when(
                this.multiple &&
                  this.selectedOptions.length > this.tagOverflowLimit,
                () => {
                  return html`<div
                    aria-hidden="true"
                    class="tag-overflow-text"
                    id="tag-overflow-text"
                    data-test="tag-overflow-text"
                  >
                    +
                    <span data-test="tag-overflow-count">
                      ${this.selectedOptions.length - this.tagOverflowLimit}
                    </span>

                    more
                  </div>`;
                },
              )}
              ${when(
                !this.multiple && this.selectedOptions[0]?.editable,
                () => {
                  return html`<glide-core-icon-button
                    class="edit-button"
                    data-test="edit-button"
                    label=${this.#localize.term(
                      'editOption',
                      // `this.selectedOptions[0]` is guaranteed to be defined by the `when()` above.
                      // And its `label` property is always defined because it's required.
                      //
                      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                      this.selectedOptions[0]!.label!,
                    )}
                    tabindex=${this.disabled || this.readonly ? '-1' : '0'}
                    variant="tertiary"
                    ?disabled=${this.disabled || this.readonly}
                    @click=${this.#onEditButtonClick}
                    ${ref(this.#editButtonElementRef)}
                  >
                    ${pencilIcon}
                  </glide-core-icon-button>`;
                },
              )}

              <button
                aria-controls="options"
                aria-describedby="description"
                aria-expanded=${this.open && !this.disabled}
                aria-haspopup="listbox"
                aria-hidden=${this.filterable || this.isFilterable}
                aria-labelledby="selected-option-labels label loading-feedback"
                class="primary-button"
                data-test="primary-button"
                id="primary-button"
                tabindex=${this.filterable || this.isFilterable || this.disabled
                  ? '-1'
                  : '0'}
                type="button"
                ?disabled=${this.disabled}
                @focusin=${this.#onPrimaryButtonFocusin}
                @focusout=${this.#onPrimaryButtonFocusout}
                ${ref(this.#primaryButtonElementRef)}
              >
                ${when(
                  this.isFiltering,
                  () => {
                    return html`<div data-test="magnifying-glass-icon">
                      ${magnifyingGlassIcon}
                    </div>`;
                  },
                  () => chevronIcon,
                )}
              </button>
            </div>
          </div>

          <div
            class=${classMap({
              'options-and-feedback': true,
              optionless:
                (this.hasNoAvailableOptions || this.hasNoMatchingOptions) &&
                !this.loading,
            })}
            ${ref(this.#optionsAndFeedbackElementRef)}
          >
            <div
              aria-labelledby=${this.filterable || this.isFilterable
                ? 'input'
                : 'primary-button'}
              class=${classMap({
                options: true,
                hidden:
                  this.hasNoAvailableOptions ||
                  this.hasNoMatchingOptions ||
                  this.loading,
              })}
              data-test="options"
              id="options"
              role="listbox"
              tabindex="-1"
              @change=${this.#onOptionsChange}
              @click=${this.#onOptionsClick}
              @focusin=${this.#onOptionsFocusin}
              @mousedown=${this.#onOptionsMousedown}
              @mouseover=${this.#onOptionsMouseover}
              @private-disabled-change=${this.#onOptionsDisabledChange}
              @private-editable-change=${this.#onOptionsEditableChange}
              @private-label-change=${this.#onOptionsLabelChange}
              @private-value-change=${this.#onOptionsValueChange}
            >
              <glide-core-dropdown-option
                class="select-all"
                data-test="select-all"
                label=${this.#localize.term('selectAll')}
                private-multiple
                ?hidden=${!this.selectAll || !this.multiple || this.isFiltering}
                ?private-indeterminate=${this.isSomeSelected &&
                !this.isAllSelected}
                ${ref(this.#selectAllElementRef)}
              ></glide-core-dropdown-option>

              <slot
                class="default-slot"
                @private-selected-change=${this.#onOptionsSelectedChange}
                @slotchange=${this.#onDefaultSlotChange}
                ${assertSlot([DropdownOption, Text], true)}
                ${ref(this.#defaultSlotElementRef)}
              >
                <!--
                  @required
                  @type {DropdownOption}
                -->
              </slot>
            </div>

            ${when(this.loading, () => {
              return html`<div
                aria-label=${this.#localize.term('loading')}
                class="loading-feedback"
                data-test="loading-feedback"
                id="loading-feedback"
              >
                ${map(range(7), () => html`<div></div>`)}
              </div>`;
            })}
            ${when(
              (this.hasNoAvailableOptions || this.hasNoMatchingOptions) &&
                !this.loading,
              () => {
                return html`<div data-test="optionless-feedback">
                  ${this.hasNoAvailableOptions
                    ? this.#localize.term('noAvailableOptions')
                    : this.#localize.term('noMatchingOptions')}
                </div>`;
              },
            )}
          </div>
        </div>

        <div id="description" slot="description">
          <slot
            class=${classMap({
              description: true,
              hidden: Boolean(
                this.#isShowValidationFeedback && this.validityMessage,
              ),
            })}
            name="description"
          >
            <!--
              Additional information or context
              @type {Element | string}
            -->
          </slot>

          ${when(
            this.#isShowValidationFeedback && this.validityMessage,
            () =>
              html`<span class="validity-message" data-test="validity-message"
                >${unsafeHTML(this.validityMessage)}</span
              >`,
          )}
        </div>
      </glide-core-private-label>
    </div>`;
  }

  reportValidity(): boolean {
    this.isReportValidityOrSubmit = true;
    const isValid = this.#internals.reportValidity();

    // Ensures that getters referencing this.validity?.valid update (i.e. #isShowValidationFeedback)
    this.requestUpdate();

    return isValid;
  }

  resetValidityFeedback(): void {
    this.isReportValidityOrSubmit = false;
  }

  setCustomValidity(message: string): void {
    this.validityMessage = message;

    if (message === '') {
      this.#internals.setValidity(
        { customError: false },
        '',
        this.filterable || this.isFilterable
          ? this.#inputElementRef.value
          : this.#primaryButtonElementRef.value,
      );
    } else {
      // A validation message is required but unused because we disable native validation feedback.
      // And an empty string isn't allowed. Thus a single space.
      this.#internals.setValidity(
        {
          customError: true,
          valueMissing: this.#internals.validity.valueMissing,
        },
        ' ',
        this.filterable || this.isFilterable
          ? this.#inputElementRef.value
          : this.#primaryButtonElementRef.value,
      );
    }
  }

  setValidity(flags?: ValidityStateFlags, message?: string): void {
    this.validityMessage = message;

    // A validation message is required but unused because we disable native validation feedback.
    // And an empty string isn't allowed. Thus a single space.
    this.#internals.setValidity(
      flags,
      ' ',
      this.filterable || this.isFilterable
        ? this.#inputElementRef.value
        : this.#primaryButtonElementRef.value,
    );
  }

  constructor() {
    super();
    this.#internals = this.attachInternals();

    // Event handlers on the host aren't great because consumers can remove them.
    // Unfortunately, the host is the only thing on which this event is dispatched
    // because it's the host that is form-associated.
    this.addEventListener('invalid', (event) => {
      event.preventDefault(); // Canceled so a native validation message isn't shown.

      // We only want to focus the input if the "invalid" event resulted from either:
      //
      // 1. A form submission.
      // 2. A call of `reportValidity()` that did not result from Checkbox's "blur" event.
      if (this.isCheckingValidity || this.isBlurring) {
        return;
      }

      this.isReportValidityOrSubmit = true;

      const isFirstInvalidFormElement =
        this.form?.querySelector(':invalid') === this;

      if (isFirstInvalidFormElement) {
        // Canceling the event means Dropdown won't get focus, even if we were to use
        // `this.#internals.delegatesFocus`. So we have to focus manually.
        this.focus();
      }
    });
  }

  @state()
  private ariaActivedescendant = '';

  // Used to show feedback when there are no slotted options.
  @state()
  private hasNoAvailableOptions = false;

  // Used to show feedback when every option has been hidden by having been filtered
  // out. The names for both this and `hasNoAvailableOptions` are not ideal. But both
  // are downstream of the copy provided by Design.
  @state()
  private hasNoMatchingOptions = false;

  @state()
  private inputValue = '';

  @state()
  private isBlurring = false;

  @state()
  private isCheckingValidity = false;

  // `itemCount` isn't immediately communicated to screenreaders so that the
  // number of options isn't read twice when Dropdown receives focus. It's
  // already read once without additional effort due to `role="combobox"` and
  // `aria-controls="options"`.
  //
  // However, an updated count isn't read when the user filters, which is where
  // `itemCount` comes in. `isCommunicateItemCountToScreenreaders` is used to
  // toggle `itemCount` so it isn't read on focus.
  @state()
  private isCommunicateItemCountToScreenreaders = false;

  @state()
  private isFilterable = false;

  @state()
  private isFiltering = false;

  @state()
  private isInputOverflow = false;

  @state()
  private isInputTooltipOpen = false;

  @state()
  private isInternalLabelOverflow = false;

  @state()
  private isInternalLabelTooltipOpen = false;

  @state()
  private isReportValidityOrSubmit = false;

  @state()
  private isShowSingleSelectIcon = false;

  // "optionCount" or similar is arguably more natural. But "item" is how VoiceOver
  // refers to options when Dropdown is initially focused. So that's what the text
  // is. And so the variable name follows the text.
  @state()
  private itemCount = 0;

  @state()
  private tagOverflowLimit = 0;

  @state()
  private validityMessage?: string;

  #cleanUpFloatingUi?: ReturnType<typeof autoUpdate>;

  #componentElementRef = createRef<HTMLElement>();

  #defaultSlotElementRef = createRef<HTMLSlotElement>();

  #dropdownElementRef = createRef<HTMLElement>();

  #editButtonElementRef = createRef<HTMLButtonElement>();

  #inputElementRef = createRef<HTMLInputElement>();

  #internalLabelElementRef = createRef<HTMLElement>();

  #internals: ElementInternals;

  #isComponentClick = false;

  #isDisabled = false;

  #isEditingOrRemovingTag = false;

  #isFilterable = false;

  #isFirstDefaultSlotChange = true;

  #isMultiple = false;

  #isOpen = false;

  #isOverflowTest = false;

  // Used in `#onOptionsSelectedChange()` to guard against, among other things,
  // resetting Select All back to its previous value after Select All is selected
  // or deselected.
  #isSelectionFromSelectAllOrNone = false;

  // Used in `#onOptionsSelectedChange()` to prevent it from adding duplicate values
  // to `value`.
  #isSelectionFromValueSetter = false;

  #isSelectionViaSpaceOrEnter = false;

  #localize = new LocalizeController(this);

  #optionsAndFeedbackElementRef = createRef<HTMLElement>();

  #previouslyActiveOption?: DropdownOption;

  #primaryButtonElementRef = createRef<HTMLButtonElement>();

  #selectAllElementRef = createRef<DropdownOption>();

  #shadowRoot?: ShadowRoot;

  #tagsElementRef = createRef<HTMLElement>();

  #value: string[] = [];

  // An arrow function field instead of a method so `this` is closed over and set
  // to the component instead of `document`.
  #onDocumentClick = () => {
    if (this.#isComponentClick) {
      // If the click came from within Dropdown, Dropdown should stay open. But,
      // now that the click has happened, we need reset `#isComponentClick` so
      // a later click from outside of Dropdown results in Dropdown closing.
      //
      // Options with a Checkbox emit two "click" events for every "mouseup": one
      // from the `<label>`, another from the `<input>`. It's just how a `<label>`
      // with a form control works. A timeout is used to ensure both events have
      // been dispatched before `#isComponentClick` is reset.
      //
      // Checking that the click's `event.target` is an instance of  `Dropdown`
      // or `DropdownOption` would be a lot simpler. But, when Dropdown is
      // inside of another web component, `event.target` will that component instead.
      setTimeout(() => {
        this.#isComponentClick = false;
      });
    } else {
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

  #hide() {
    this.#cleanUpFloatingUi?.();
    this.#optionsAndFeedbackElementRef.value?.hidePopover();
    this.ariaActivedescendant = '';

    if (this.activeOption) {
      this.#previouslyActiveOption = this.activeOption;
      this.activeOption.privateIsTooltipOpen = false;
      this.activeOption.privateActive = false;
    }
  }

  get #isShowValidationFeedback() {
    return (
      !this.disabled && !this.validity.valid && this.isReportValidityOrSubmit
    );
  }

  #onComponentMouseup() {
    // Dropdown's "click" handler on `document` listens for clicks in the
    // capture phase. There's a comment explaining why. `#isComponentClick`
    // must be set before that handler is called so it has the information it
    // needs to determine whether or not to close Dropdown.
    this.#isComponentClick = true;
  }

  async #onDefaultSlotChange() {
    if (this.#isFirstDefaultSlotChange) {
      // It's a requirement of Design for Dropdown to automatically become filterable
      // when there are more than 10 options. But it's also a bad user experience for
      // Dropdown to suddenly become unfilterable when a developer using Dropdown reduces
      // the number of options in the slot in response to the user filtering.
      //
      // So we lock in Dropdown as either filterable or unfilterable with the first slot
      // change. Consumers can still force filterability using the `filterable` attribute.
      this.isFilterable = this.#optionElements.length > 10;
      this.#isFirstDefaultSlotChange = false;
    }

    this.tagOverflowLimit = this.selectedOptions.length;
    this.hasNoAvailableOptions = this.#optionElements.length === 0;

    for (const option of this.#optionElements) {
      // Both here and in the `this.multiple` setter because no assignment happens on
      // initial render.
      option.privateMultiple = this.multiple;
    }

    const firstOption = this.#optionElementsNotHiddenIncludingSelectAll?.find(
      (option) => !option.disabled,
    );

    // Even with single-select, there's nothing to stop developers from adding
    // a `selected` attribute to more than one option. How native handles this
    // when setting `value` is to choose the last selected option.
    //
    // We're not setting `value` here. But we follow native's behavior elsewhere
    // when setting `value`. So we do the same here when setting `privateActive`.
    //
    // Unrelated to the comment above, setting the active option happens here and
    // elsewhere instead of once in the `open` setter because Dropdown's options may
    // change when Dropdown is open. For example, a developer may fetch data and
    // remove the active option on "filter", leaving the user without an active option.
    if (!this.activeOption && this.lastSelectedOption) {
      this.lastSelectedOption.privateActive = true;
      this.#previouslyActiveOption = this.lastSelectedOption;
      this.ariaActivedescendant = this.open ? this.lastSelectedOption.id : '';
    } else if (!this.activeOption && firstOption) {
      this.#previouslyActiveOption = firstOption;
      this.ariaActivedescendant = this.open ? firstOption.id : '';
      firstOption.privateActive = true;
    }

    // Now update Select All to reflect the selected options.
    if (this.#selectAllElementRef.value) {
      this.#selectAllElementRef.value.selected = this.isAllSelected;
    }

    if (this.multiple) {
      this.#value = this.selectedOptions
        .filter((option) => Boolean(option.value) && !option.disabled)
        .map(({ value }) => value);
    } else if (
      this.lastSelectedOption?.value &&
      !this.lastSelectedOption.disabled
    ) {
      this.#value = [this.lastSelectedOption.value];
      this.isShowSingleSelectIcon = Boolean(this.selectedOptions.at(0)?.value);
    }

    // Dropdown's internal label now needs to be updated to reflect the selected option
    // or options. `this.internalLabel` uses the `this.selectedOptions` getter, whose
    // return value is derived from the state of another component: Dropdown Option.
    // For whatever reason, and even though that component's state is reactive, a change
    // to it doesn't result in a rerender of this component. So one is forced.
    this.requestUpdate();

    // Dropdown becomes filterable if there are more than 10 options. But the `<input>`
    // won't have rendered yet given we just set `this.isFilterable` above. So we
    // piggyback off of `this.requestUpdate()` and then wait for the update to complete
    // before setting the `value` of the `<input>`.
    await this.updateComplete;

    if (
      !this.multiple &&
      this.#inputElementRef.value &&
      this.lastSelectedOption?.label
    ) {
      this.#inputElementRef.value.value = this.lastSelectedOption.label;
      this.inputValue = this.lastSelectedOption.label;

      this.isInputOverflow =
        this.#inputElementRef.value.scrollWidth >
        this.#inputElementRef.value.clientWidth;

      // For the case where the selected option is programmatically removed from the DOM.
      // Without this, the value of the input field would still be set to the selected
      // option's `label`. And an ellipsis would still be shown if the `label` was long
      // enough to be truncated.
      //
      // We guard against `this.isFiltering` so we don't clear the user's filter query
      // when the user is filtering and an option is added or removed. This is particularly
      // helpful when consumers fetch and render options from the server in response to their
      // override of `this.filter()` being called.
    } else if (
      !this.multiple &&
      this.#inputElementRef.value &&
      !this.isFiltering
    ) {
      this.#inputElementRef.value.value = '';
      this.inputValue = '';

      this.isInputOverflow =
        this.#inputElementRef.value.scrollWidth >
        this.#inputElementRef.value.clientWidth;
    }
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

    if (isFocusLost && !this.#isEditingOrRemovingTag) {
      this.open = false;
      this.isBlurring = true;
      this.reportValidity();
      this.isBlurring = false;
    }
  }

  // This handler is on `.dropdown-and-options` instead of `.dropdown` because
  // options can receive focus via VoiceOver, and `.dropdown` won't emit a "keydown"
  // if an option is focused.
  #onDropdownAndOptionsKeydown(event: KeyboardEvent) {
    if (this.disabled || this.readonly) {
      return;
    }

    // On Enter and Space, an "edit" event should be dispatched and Dropdown should
    // close. Both Enter and Space result in a "click" event. So no need to dispatch
    // "edit" here. It's dispatched in `#onDropdownClick`. And Dropdown is closed via
    // `#onEditButtonClick`.
    if (
      (event.key === 'Enter' || event.key === ' ') &&
      event.target === this.#editButtonElementRef.value
    ) {
      this.#isComponentClick = true;
      return;
    }

    if (!this.open && event.key === 'Enter') {
      this.form?.requestSubmit();
      return;
    }

    if (event.key === 'Escape') {
      // Prevent Safari from leaving full screen.
      event.preventDefault();

      this.open = false;

      return;
    }

    const isFromPrimaryButtonOrInputOrAnOption =
      event.target === this.#primaryButtonElementRef.value ||
      event.target === this.#inputElementRef.value ||
      event.target instanceof DropdownOption;

    // If multiselect, and `event.target` isn't one of the above, then the event came from
    // a tag and focus is on the tag. Arrowing up or down then pressing Enter would both
    // remove the tag and select or deselect the active option or it would open Dropdown,
    // and neither of which is probably what the user would expect. Similar situation for
    // when a key is pressed and focus is on single-select's Edit button.
    if (this.multiple && !isFromPrimaryButtonOrInputOrAnOption) {
      return;
    }

    if (!this.open && [' ', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
      // Prevents page scroll. Also prevents the insertion point moving to beginning or
      // end of the field and a space from being entered in addition to making the
      // options visible when Dropdown is filterable.
      event.preventDefault();

      this.open = true;

      if (this.activeOption) {
        this.activeOption.privateIsTooltipOpen =
          !this.activeOption.privateIsEditActive;
      }

      // The user almost certainly wasn't intending to do both open Dropdown and change
      // the active option in the case of ArrowUp or ArrowDown. Thus return. The user
      // can press ArrowUp or ArrowDown again to change the active option.
      return;
    }

    if (this.activeOption && this.open) {
      if (event.key === 'Enter' || event.key === ' ') {
        if (this.activeOption.privateIsEditActive) {
          // Pressing Enter or Space when an option is active won't result in a
          // "click" event because options don't receive focus except with VoiceOver.
          // Otherwise, we'd dispatch this event from within Dropdown Option.
          //
          // A "click" event, on the other hand, is dispatched when an Edit button is
          // clicked. So Dropdown Option could dispatch "edit" in that case. But then
          // two components instead of one would be responsible for dispatching "edit".
          this.activeOption.privateEdit();

          this.open = false;

          return;
        }

        // Space is excluded when Dropdown is filterable because the user may want to
        // include a space in his filter and because he expects pressing Space to result
        // in a space. So we either cancel Space and let it select and deselect as when
        // Dropdown isn't filterable, or we let the user type it. Neither is ideal.
        if (
          (event.key === 'Enter' &&
            this.#optionElementsNotHidden &&
            this.#optionElementsNotHidden.length > 0) ||
          (event.key === ' ' && !this.filterable && !this.isFilterable)
        ) {
          // `#onDropdownClick` is called on click, and it opens or closes Dropdown.
          // Space and Enter produce "click" events. This property gives `#onDropdownClick`
          // the information it needs to guard against opening or closing when the event
          // is a result of an option being is selected or deselected.
          this.#isSelectionViaSpaceOrEnter = true;

          // Prevent the options from scrolling when a focused option is selected via Space
          // when using VoiceOver.
          event.preventDefault();

          this.isFiltering = false;

          this.activeOption.selected = this.multiple
            ? !this.activeOption.selected
            : true;

          if (this.activeOption === this.#selectAllElementRef.value) {
            this.#selectAllOrNone();
          }

          this.#isSelectionViaSpaceOrEnter = false;
          this.#unfilter();

          if (!this.multiple) {
            this.open = false;
          }

          this.dispatchEvent(
            new Event('input', { bubbles: true, composed: true }),
          );

          this.dispatchEvent(
            new Event('change', { bubbles: true, composed: true }),
          );

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

        const previousOption =
          this.#optionElementsNotHiddenIncludingSelectAll.findLast(
            (option, index) => {
              return !option.disabled && index < activeOptionIndex;
            },
          );

        if (this.activeOption?.privateIsEditActive) {
          this.activeOption.privateIsEditActive = false;
          this.activeOption.privateIsTooltipOpen = true;

          // If we're not already at the top.
        } else if (previousOption && activeOptionIndex !== 0) {
          this.activeOption.privateIsEditActive = false;
          this.activeOption.privateIsTooltipOpen = false;
          this.activeOption.privateActive = false;
          this.ariaActivedescendant = previousOption.id;
          this.#previouslyActiveOption = previousOption;

          previousOption.privateActive = true;
          previousOption.privateIsEditActive = previousOption.editable;
          previousOption.privateIsTooltipOpen = !previousOption.editable;
          previousOption.scrollIntoView({ block: 'center' });
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

        const nextOption = this.#optionElementsNotHiddenIncludingSelectAll.find(
          (option, index) => {
            return !option.disabled && index > activeOptionIndex;
          },
        );

        if (
          this.activeOption.editable &&
          !this.activeOption.privateIsEditActive
        ) {
          this.activeOption.privateIsEditActive = true;
          this.activeOption.privateIsTooltipOpen = false;

          // If we're not already at the bottom.
        } else if (nextOption) {
          this.activeOption.privateIsEditActive = false;
          this.activeOption.privateIsTooltipOpen = false;
          this.activeOption.privateActive = false;
          this.ariaActivedescendant = nextOption.id;
          this.#previouslyActiveOption = nextOption;

          nextOption.privateActive = true;
          nextOption.privateIsTooltipOpen = true;
          nextOption.scrollIntoView({ block: 'center' });
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

        const previousOption = [
          ...this.#optionElementsNotHiddenIncludingSelectAll,
        ]
          .reverse()
          .findLast((option) => !option.disabled);

        if (previousOption) {
          this.activeOption.privateIsEditActive = false;
          this.activeOption.privateIsTooltipOpen = false;
          this.activeOption.privateActive = false;
          this.ariaActivedescendant = previousOption.id;
          this.#previouslyActiveOption = previousOption;

          previousOption.privateActive = true;
          previousOption.privateIsTooltipOpen = true;
          previousOption.scrollIntoView({ block: 'nearest' });
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

        const nextOption = [
          ...this.#optionElementsNotHiddenIncludingSelectAll,
        ].findLast((option) => !option.disabled);

        // If `option` isn't defined, then we've reached the bottom.
        if (nextOption && this.activeOption) {
          this.activeOption.privateIsEditActive = false;
          this.activeOption.privateIsTooltipOpen = false;
          this.activeOption.privateActive = false;
          this.ariaActivedescendant = nextOption.id;
          this.#previouslyActiveOption = nextOption;

          nextOption.privateActive = true;
          nextOption.privateIsTooltipOpen = true;
          nextOption.scrollIntoView({ block: 'nearest' });
        }

        return;
      }
    }
  }

  #onDropdownClick(event: MouseEvent) {
    if (this.disabled || this.readonly) {
      return;
    }

    if (this.#isEditingOrRemovingTag) {
      this.#isEditingOrRemovingTag = false;
      return;
    }

    if (
      event.target instanceof Node &&
      this.#editButtonElementRef.value?.contains(event.target)
    ) {
      this.selectedOptions[0]?.privateEdit();

      return;
    }

    const isFilterable = this.filterable || this.isFilterable;

    if (
      !this.#isSelectionViaSpaceOrEnter &&
      this.open &&
      (!isFilterable ||
        (event.target instanceof Element &&
          this.#primaryButtonElementRef.value?.contains(event.target)))
    ) {
      this.open = false;

      return;
    }

    // `event.detail` is an integer set to the number of clicks. When it's zero,
    // the event most likely originated from an Enter press. And, if Dropdown is part
    // of a form, Enter should submit the form instead of opening Dropdown.
    if (event.detail !== 0) {
      this.open = true;

      // If Dropdown was opened because its primary button or `<input>` were clicked,
      // then Dropdown will already have focus. But if something else was clicked, like
      // the padding around Dropdown or a Tag, then it won't. So we focus it manually.
      this.focus();

      return;
    }
  }

  #onDropdownMousedown(event: FocusEvent) {
    // Retain focus if anything inside it is clicked, like the padding around the
    // component. Clicking the padding will move focus to `document.body`, which is
    // not what the user expects.
    //
    // Having to exclude tags is unfortunate because clicking on the tag's label or
    // padding shouldn't cause the input to lose focus. The trouble is we don't know
    // it if is the Tag's removal button that's being clicked. And if it is we have
    // to allow it to receive focus.
    const isFilterable = this.filterable || this.isFilterable;
    const isTag = event.target instanceof Tag;

    if (isFilterable && !isTag) {
      // If the `<input>` was clicked, canceling the event would prevent the insertion
      // point from moving inside the input.
      if (event.target !== this.#inputElementRef.value) {
        event.preventDefault();
        this.focus();
      }
    } else if (!isTag) {
      event.preventDefault();
    }
  }

  #onEditButtonClick() {
    this.open = false;
  }

  #onInputBlur() {
    this.isCommunicateItemCountToScreenreaders = false;
    this.isInputTooltipOpen = false;
  }

  #onInputFocus() {
    this.#inputElementRef.value?.select();
    this.isInputTooltipOpen = true;
  }

  async #onInputInput(event: Event) {
    // Allowing the event to propagate would break things for consumers, who
    // expect "input" events only when an option is selected or deselected.
    event.stopPropagation();

    this.open = true;
    this.isShowSingleSelectIcon = false;

    if (this.#inputElementRef.value?.value) {
      this.inputValue = this.#inputElementRef.value.value;
    }

    if (this.multiple && this.#inputElementRef.value?.value !== '') {
      this.isFiltering = true;
    } else if (this.multiple) {
      this.isFiltering = false;
    } else if (
      this.#inputElementRef.value?.value !== '' &&
      this.#inputElementRef.value?.value !== this.selectedOptions.at(0)?.label
    ) {
      this.isFiltering = true;
    } else {
      this.isFiltering = false;
    }

    let options: DropdownOption[] | undefined | void;

    if (this.#inputElementRef.value) {
      try {
        // It would be convenient for consumers if we passed an array of options
        // as the second argument. The problem is consumers fetch and render new
        // options when filtering. So the array will become stale.
        options = await this.filter(this.#inputElementRef.value.value);
        // eslint-disable-next-line no-empty
      } catch {}
    }

    if (options) {
      for (const option of this.#optionElements) {
        option.hidden = !options.includes(option);
      }

      const firstVisibleOption = this.#optionElementsNotHidden?.at(0);

      // When filtering filters out the active option, make the first option active
      // if there is one.
      if (firstVisibleOption && this.activeOption?.hidden) {
        this.activeOption.privateActive = false;
        this.#previouslyActiveOption = firstVisibleOption;
        this.ariaActivedescendant = firstVisibleOption.id;

        firstVisibleOption.privateActive = true;
      }

      this.hasNoMatchingOptions =
        !this.#optionElementsNotHidden ||
        this.#optionElementsNotHidden.length === 0
          ? true
          : false;

      this.isCommunicateItemCountToScreenreaders = true;

      if (this.#optionElementsNotHidden) {
        this.itemCount = this.#optionElementsNotHidden.length;
      }
    }
  }

  #onInputKeydown(event: KeyboardEvent) {
    // Deselecting an option the user can't see ain't good. So they're filtered out.
    // As the user deselects options, ones previously overflowing will be become
    // visible and thus deselectable using Backspace.
    const lastSelectedAndNotOverflowingOption = this.selectedOptions.findLast(
      (_, index) => index <= this.tagOverflowLimit - 1,
    );

    if (
      lastSelectedAndNotOverflowingOption &&
      event.key === 'Backspace' &&
      !event.metaKey &&
      this.multiple &&
      this.#inputElementRef.value &&
      this.#inputElementRef.value.selectionStart === 0
    ) {
      this.#isEditingOrRemovingTag = true;
      lastSelectedAndNotOverflowingOption.selected = false;
      this.#isEditingOrRemovingTag = false;

      return;
    }

    const selectedAndNotOverflowingOptions = this.selectedOptions.filter(
      (_, index) => index <= this.tagOverflowLimit - 1,
    );

    if (
      lastSelectedAndNotOverflowingOption &&
      event.key === 'Backspace' &&
      event.metaKey &&
      this.multiple &&
      this.#inputElementRef.value &&
      this.#inputElementRef.value.selectionStart === 0
    ) {
      this.#isEditingOrRemovingTag = true;

      for (const option of selectedAndNotOverflowingOptions) {
        option.selected = false;
      }

      this.#isEditingOrRemovingTag = false;

      return;
    }
  }

  #onInputResize() {
    if (this.#inputElementRef.value) {
      // One is subtracted to account for an apparent Chrome bug when the viewport
      // is reduced in size and the `<input>` is overflowing, then increased in size
      // so its not overflowing. If you log `scrollWidth` and `clientWidth` you'll
      // see the bug. In Safari and Firefox the two are equal after increasing the
      // size of the viewport.
      this.isInputOverflow =
        this.#inputElementRef.value.scrollWidth - 1 >
        this.#inputElementRef.value.clientWidth;
    }
  }

  #onInternalLabelResize() {
    if (this.#internalLabelElementRef.value) {
      this.isInternalLabelOverflow =
        this.#internalLabelElementRef.value.scrollWidth >
        this.#internalLabelElementRef.value.clientWidth;
    }
  }

  get #optionElements() {
    return (
      this.#defaultSlotElementRef.value
        ?.assignedElements()
        .filter(
          (element): element is DropdownOption =>
            element instanceof DropdownOption,
        ) ?? []
    );
  }

  get #optionElementsIncludingSelectAll() {
    const assignedElements = this.#defaultSlotElementRef.value
      ?.assignedElements()
      .filter(
        (element): element is DropdownOption =>
          element instanceof DropdownOption,
      );

    if (assignedElements && this.#selectAllElementRef.value) {
      return [this.#selectAllElementRef.value, ...assignedElements];
    }
  }

  get #optionElementsNotHidden() {
    return this.#defaultSlotElementRef.value
      ?.assignedElements()
      .filter(
        (element): element is DropdownOption =>
          element instanceof DropdownOption && !element.hidden,
      );
  }

  get #optionElementsNotHiddenIncludingSelectAll() {
    const assignedElementsNotHidden = this.#defaultSlotElementRef.value
      ?.assignedElements()
      .filter(
        (element): element is DropdownOption =>
          element instanceof DropdownOption && !element.hidden,
      );

    return this.#selectAllElementRef.value &&
      !this.#selectAllElementRef.value.hidden &&
      assignedElementsNotHidden
      ? [this.#selectAllElementRef.value, ...assignedElementsNotHidden]
      : assignedElementsNotHidden;
  }

  #onOptionsChange(event: Event) {
    if (event.target instanceof DropdownOption) {
      event.target.selected = !event.target.selected;
    }

    if (event.target === this.#selectAllElementRef.value) {
      this.#selectAllOrNone();
    }

    this.#unfilter();
  }

  #onOptionsClick(event: PointerEvent) {
    if (event.target instanceof Element) {
      const option = event.target.closest('glide-core-dropdown-option');

      if (option instanceof DropdownOption && option.disabled) {
        return;
      }

      if (option instanceof DropdownOption && option.privateIsEditActive) {
        option.privateEdit();
        this.open = false;

        return;
      }

      if (option && !option.selected) {
        option.selected = true;
        this.#unfilter();

        if (!this.multiple) {
          this.open = false;
        }

        this.dispatchEvent(
          new Event('input', { bubbles: true, composed: true }),
        );

        this.dispatchEvent(
          new Event('change', { bubbles: true, composed: true }),
        );

        return;
      }

      if (option?.selected && !this.multiple) {
        this.open = false;

        return;
      }
    }
  }

  #onOptionsDisabledChange(event: Event) {
    if (
      event.target instanceof DropdownOption &&
      event.target.disabled &&
      event.target.selected
    ) {
      // `this.#value` may include multiple of the same value because multiple options
      // may have the same value. So we only remove the last.
      //
      // Ideally, Dropdown wouldn't always remove the last value but would know the exact
      // index to remove. But Dropdown, the way it's built, doesn't know which value in
      // `this.#value` corresponds to which option. It probably should if cases like this
      // continue to pile up. For now, though, consumers' needs seem to be met.
      const index = this.#value.lastIndexOf(event.target.value);
      this.#value.splice(index, index + 1);
    } else if (
      this.multiple &&
      event.target instanceof DropdownOption &&
      event.target.selected &&
      event.target.value
    ) {
      this.#value.push(event.target.value);
    } else if (
      event.target instanceof DropdownOption &&
      event.target.selected &&
      event.target.value &&
      event.target === this.lastSelectedOption
    ) {
      this.#value = [event.target.value];
    }

    // Dropdown's internal label now needs to be updated to reflect the selected option
    // or options. `this.internalLabel` uses the `this.selectedOptions` getter, whose
    // return value is derived from the state of another component: Dropdown Option.
    // That component's state is reactive. But a change to it won't trigger a rerender
    // of this component. Same deal for multiselect Dropdown's tags.
    this.requestUpdate();
  }

  #onOptionsEditableChange() {
    // Dropdown doesn't know to rerender when an option's `editable` property
    // has changed. But it needs to rerender to show or hide its edit button
    // or else to set or unset its Tags as editable in the case of multiselect.
    // So a rerender is forced.
    this.requestUpdate();
  }

  // Options don't receive focus normally but can receive programmatic focus from
  // screen readers.
  #onOptionsFocusin(event: FocusEvent) {
    if (event.target instanceof DropdownOption) {
      if (this.activeOption) {
        this.activeOption.privateActive = false;
      }

      event.target.privateActive = true;
      this.#previouslyActiveOption = event.target;
    }
  }

  #onOptionsLabelChange() {
    if (this.selectedOptions.length > 0) {
      if (this.multiple) {
        this.requestUpdate();

        this.updateComplete.then(() => {
          this.#setTagOverflowLimit();
        });
      } else if (
        (this.filterable || this.isFilterable) &&
        this.#inputElementRef.value &&
        this.selectedOptions[0]?.label
      ) {
        this.#inputElementRef.value.value = this.selectedOptions[0].label;
        this.inputValue = this.selectedOptions[0].label;

        this.isInputOverflow =
          this.#inputElementRef.value.scrollWidth >
          this.#inputElementRef.value.clientWidth;
      } else {
        this.requestUpdate();
      }
    }
  }

  #onOptionsMousedown(event: MouseEvent) {
    // Keep focus on the input so the user can continue filtering while selecting options.
    if (this.filterable || this.isFilterable) {
      event.preventDefault();
    }
  }

  #onOptionsMouseover(event: MouseEvent) {
    if (
      event.target instanceof DropdownOption &&
      this.#optionElementsNotHiddenIncludingSelectAll
    ) {
      if (event.target.disabled) {
        return;
      }

      if (this.activeOption) {
        // The currently active option may have been arrowed to and its Tooltip
        // forced open. Normally, its Tooltip would be closed when the user arrows
        // again. But now the user is using a mouse. So we force it closed.
        this.activeOption.privateIsTooltipOpen = false;

        this.activeOption.privateActive = false;
      }

      this.ariaActivedescendant = event.target.id;
      this.#previouslyActiveOption = event.target;

      event.target.privateActive = true;
      event.target.privateIsEditActive = false;
    }
  }

  #onOptionsSelectedChange(event: Event) {
    if (this.#isSelectionFromSelectAllOrNone) {
      return;
    }

    if (this.#selectAllElementRef.value) {
      this.#selectAllElementRef.value.selected = this.isAllSelected;
    }

    // Update `value`, `open`, `ariaActivedescendant`, and the value of `.input` if filterable.
    if (event.target instanceof DropdownOption) {
      if (this.multiple && !this.#isSelectionFromValueSetter) {
        this.#value =
          event.target.selected && event.target.value && !event.target.disabled
            ? [...this.value, event.target.value]
            : this.value.filter((value) => {
                return (
                  event.target instanceof DropdownOption &&
                  value !== event.target.value
                );
              });

        // Removing a tag will set the related option's `selected` to `false`, which
        // will kick off this event handler. However, we only want to clear the `value`
        // of the `<input>` when we're fairly certain that the selection or deselection
        // came about as a result of filtering. And if the user is interacting with a
        // tag, then we know hasn't selected or deselected an option after filtering.
        if (this.#inputElementRef.value && !this.#isEditingOrRemovingTag) {
          this.isFiltering = false;
          this.#inputElementRef.value.value = '';
          this.inputValue = '';
        }

        // The event this handler listens to is dispatched on both selection and deselection.
        // In the case of single-select, we don't care if the target has been deselected. We
        // also don't want any changes to focus or the state of `this.open` as a result.
      } else if (
        !this.multiple &&
        event.target.selected &&
        !event.target.disabled
      ) {
        for (const option of this.#optionElements) {
          if (
            option !== event.target &&
            event.target instanceof DropdownOption &&
            event.target.selected &&
            option.selected
          ) {
            option.selected = false;
          }
        }

        this.#value = event.target.value ? [event.target.value] : [];

        this.isShowSingleSelectIcon = Boolean(
          this.selectedOptions.at(0)?.value,
        );

        if (this.#inputElementRef.value && event.target.label) {
          this.isFiltering = false;
          this.#inputElementRef.value.value = event.target.label;
          this.inputValue = event.target.label;
        }
      }
    }

    if (this.#inputElementRef.value) {
      this.isInputOverflow =
        this.#inputElementRef.value.scrollWidth >
        this.#inputElementRef.value.clientWidth;
    }

    // Dropdown's internal label now needs to be updated to reflect the selected option
    // or options. `this.internalLabel` uses the `this.selectedOptions` getter, whose
    // return value is derived from the state of another component: Dropdown Option.
    // That component's state is reactive. But a change to it won't trigger a rerender
    // of this component. Same deal for multiselect Dropdown's tags.
    this.requestUpdate();

    // Tags vary in width depending on their labels. It's possible an option was
    // removed and a new option with a shorter label was just added. The new label
    // may be just short enough that the overflow limit can be increased by one.
    // Thus the call here in addition to the one in Resize Observer.
    this.updateComplete.then(() => {
      this.#setTagOverflowLimit();
    });
  }

  #onOptionsValueChange(event: CustomEvent<{ old: string; new: string }>) {
    // A cleaner approach would be to return early if `event.target` isn't an instance
    // of `DropdownOption`. But doing so would create an untestable branch and thus
    // force less than full code coverage because `event.target` will always be an
    // instance of `DropdownOption`.
    //
    // This is also why `#optionElementsIncludingSelectAll` and `#optionElementsNotHiddenIncludingSelectAll`
    // return `undefined` instead of always returning an empty array. The empty array
    // branch would only exist to appease the typesystem and so would never actually get
    // hit, making full test coverage impossible. Maybe there's a better way?
    if (
      event.target instanceof DropdownOption &&
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
    } else if (event.target instanceof DropdownOption && this.multiple) {
      this.#value = this.value.filter((value) => {
        return value !== event.detail.old;
      });
    } else if (event.target instanceof DropdownOption) {
      this.#value = event.detail.new ? [event.detail.new] : [];
    }
  }

  #onPrimaryButtonFocusin() {
    this.isInternalLabelTooltipOpen = true;
  }

  #onPrimaryButtonFocusout() {
    this.isInternalLabelTooltipOpen = false;
  }

  #onTagEdit() {
    // Used to prevent Dropdown from reopening on click immediately after it's
    // closed below and from submitting its form when "edit" comes from an Enter
    // press.
    this.#isEditingOrRemovingTag = true;

    this.open = false;
  }

  async #onTagRemove(id: string) {
    // Used to prevent Dropdown from opening on click when closed and from submitting
    // its form when the "remove" comes from an Enter press.
    this.#isEditingOrRemovingTag = true;

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

    if (tags && this.selectedOptions.length > 0) {
      const removedTagIndex = [...tags].findIndex(
        (tag) => tag.dataset.id === id,
      );

      // The tag to the right of the one removed unless it was the rightmost tag.
      // Otherwise the tag to the left.
      const tagToFocus =
        tags[
          removedTagIndex < tags.length - 1
            ? removedTagIndex + 1
            : removedTagIndex - 1
        ];

      // The tag to be focused may be one that's currently hidden. So we wait for it
      // to become visible before trying to focus it.
      await this.updateComplete;

      // Browsers have a quirk where, if focus is moved during a "keydown" event from
      // an Enter press, the "click" event that follows will be transferred to the now-
      // focused element. Thus we wait a tick, until the "click" event has passed,
      // before moving focus.
      //
      // Without a timeout, two tags will be removed by a single Enter press: the previously
      // focused Tag and the now-focused one. The previous because of the "edit" event
      // dispatched by Tag on "keydown". And the now-focused one because of the "edit"
      // event dispatched by Tag on "click".
      setTimeout(() => {
        tagToFocus?.focus();

        // Because the tag has been removed via `option.selected = false` above and focus
        // isn't moved until after the click, a "click" event will never be dispatched.
        // Otherwise, we could reset `#isEditingOrRemovingTag` in `#onDropdownClick`.
        this.#isEditingOrRemovingTag = false;
      });
    } else {
      setTimeout(() => {
        this.focus();
        this.#isEditingOrRemovingTag = false;
      });
    }

    this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
  }

  #onTooltipToggle(event: Event) {
    // Dropdown dispatches its own "toggle" event. Letting Tooltip's "toggle"
    // propagate would mean that consumers listening for the event on Dropdown
    // would have to filter it out when it comes from Tooltip. But first they'll
    // probably file a bug. It's likely no consumer will be interested in knowing
    // when this component's Tooltips are open. So it's probably best to stop the
    // events from propagating.
    event.stopPropagation();
  }

  #selectAllOrNone() {
    this.#isSelectionFromSelectAllOrNone = true;

    for (const option of this.#optionElements) {
      if (
        this.#selectAllElementRef.value?.selected &&
        !option.selected &&
        !option.disabled
      ) {
        option.selected = true;
      } else if (
        !this.#selectAllElementRef.value?.selected &&
        option.selected
      ) {
        option.selected = false;
      }
    }

    this.#value = this.#optionElements
      .filter(({ selected, value }) => selected && value)
      .map(({ value }) => value);

    this.#isSelectionFromSelectAllOrNone = false;
  }

  async #setTagOverflowLimit() {
    if (this.#componentElementRef.value) {
      const isOverflowing =
        this.#componentElementRef.value.scrollWidth >
        this.#componentElementRef.value.clientWidth;

      if (isOverflowing && this.tagOverflowLimit > 1) {
        this.tagOverflowLimit = this.tagOverflowLimit - 1;

        // Wait for the update to complete. Then run through this logic
        // again to see if Dropdown is still overflowing. Rinse and repeat
        // until there's no overflow.
        await this.updateComplete;

        this.#setTagOverflowLimit();
      } else if (
        !isOverflowing &&
        !this.#isOverflowTest &&
        this.tagOverflowLimit < this.selectedOptions.length
      ) {
        this.tagOverflowLimit = this.tagOverflowLimit + 1;

        // The limit increase may cause an overflow. But we won't know until we
        // try. If it does, the branch above will correct it when it calls this
        // function again.
        //
        // `#isOverflowTest` is set so we don't wind up back in this branch after
        // returning to the branch above, creating an infinite loop.
        this.#isOverflowTest = true;

        await this.updateComplete;
        this.#setTagOverflowLimit();
      } else {
        this.#isOverflowTest = false;
      }
    }
  }

  #show() {
    // `#show` is called whenever `open` is set. And `open` can be set arbitrarily
    // by the consumer. Rather than guarding against calling `#show` everywhere,
    // Floating UI is simply cleaned up every time `#show` is called.
    this.#cleanUpFloatingUi?.();

    // This is done now instead of after Floating UI does its thing because the
    // user may begin arrowing immediately to another option option or may have
    // arrowed to open Dropdown and then accidentally arrowed again.
    if (this.#previouslyActiveOption) {
      this.#previouslyActiveOption.privateActive = true;
      this.ariaActivedescendant = this.#previouslyActiveOption.id;
    }

    if (
      this.#dropdownElementRef.value &&
      this.#optionsAndFeedbackElementRef.value
    ) {
      this.#cleanUpFloatingUi = autoUpdate(
        this.#dropdownElementRef.value,
        this.#optionsAndFeedbackElementRef.value,
        () => {
          (async () => {
            if (
              this.#dropdownElementRef.value &&
              this.#optionsAndFeedbackElementRef.value
            ) {
              const { x, y, placement } = await computePosition(
                this.#dropdownElementRef.value,
                this.#optionsAndFeedbackElementRef.value,
                {
                  placement: 'bottom-start',
                  middleware: [
                    offset({
                      mainAxis:
                        Number.parseFloat(
                          window
                            .getComputedStyle(document.body)
                            .getPropertyValue('--glide-core-spacing-base-xxs'),
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

              this.#optionsAndFeedbackElementRef.value.dataset.placement =
                placement;

              Object.assign(this.#optionsAndFeedbackElementRef.value.style, {
                left: `${x}px`,
                top: `${y}px`,
              });

              this.#optionsAndFeedbackElementRef.value?.showPopover();
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
