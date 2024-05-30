import './label.js';
import { LitElement, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
import { owSlot, owSlotType } from './library/ow.js';
import CsDropdownOption from './dropdown.option.js';
import styles from './dropdown.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'cs-dropdown': CsDropdown;
  }
}

/**
 * @description A dropdown with optional description and tooltip. Participates in forms and validation via `FormData` and various methods.
 *
 * @event change - Dispatched when an option is selected. An array of the selected option values is assigned to `event.detail`.
 * @event input - Dispatched when an option is selected. An array of the selected option values is assigned to `event.detail`.
 *
 * @slot - One or more of `<cs-dropdown-option>`.
 * @slot tooltip - Content for the tooltip.
 * @slot description - Additional information or context.
 */
@customElement('cs-dropdown')
export default class CsDropdown extends LitElement {
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

  @property({ reflect: true, type: Boolean })
  required = false;

  @property({ reflect: true })
  size: 'small' | 'large' = 'large';

  @property({ type: Array })
  value: string[] = [];

  @property({ reflect: true })
  variant?: 'quiet';

  checkValidity() {
    this.isCheckingValidity = true;
    return this.#internals.checkValidity();
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

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.form?.removeEventListener('formdata', this.#onFormdata);

    document.removeEventListener('click', this.#onDocumentClick, {
      capture: true,
    });
  }

  override firstUpdated() {
    owSlot(this.#defaultSlotElementRef.value);
    owSlotType(this.#defaultSlotElementRef.value, [CsDropdownOption]);

    const firstOption = this.#optionElements.at(0);

    if (this.selectedOption?.value) {
      this.selectedOption.privateActive = true;
      this.value = [this.selectedOption.value];
    } else if (firstOption) {
      firstOption.privateActive = true;
    }
  }

  // The button doesn't receive focus when `shadowRoot.delegatesFocus` is set, and the
  // inherited `this.focus` is called. It's not clear why. Thus the override.
  override focus() {
    this.#buttonElementRef.value?.focus();
  }

  get form() {
    return this.#internals.form;
  }

  get validity() {
    if (this.required && !this.selectedOption) {
      this.#internals.setValidity(
        { valueMissing: true },
        ' ',
        this.#buttonElementRef.value,
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
    const lastSelectedOption = this.#optionElements.findLast((option) =>
      option.hasAttribute('selected'),
    );

    this.value = lastSelectedOption?.value ? [lastSelectedOption.value] : [];
  }

  override render() {
    // Using `aria-activedescendant` would make announcing the active option easier
    // technically. It would also improve the user's experience because focus would
    // remain on the button throughout the interaction instead of moving from the
    // button to the options when the dropdown is opened. But `aria-activedescendant`
    // doesn't appear to be supported by VoiceOver when used on anything but a Menu Button.

    // The linter checks that all ULs have LIs as children. It doesn't account for
    // slots, which can contain LIs. The linter also wants a focus listener on the
    // slot, but there's nothing to be done with one in this case.

    /*  eslint-disable lit-a11y/list, lit-a11y/mouse-events-have-key-events */
    return html`<div
      class=${classMap({
        component: true,
        horizontal: this.orientation === 'horizontal',
        vertical: this.orientation === 'vertical',
      })}
    >
      <cs-label
        orientation=${this.orientation}
        ?disabled=${this.disabled}
        ?error=${this.#isShowValidationFeedback}
        ?hide=${this.hideLabel}
        ?required=${this.required}
      >
        <label id="label"> ${this.label} </label>
        <slot name="tooltip" slot="tooltip"></slot>

        <div
          class="button-and-options"
          data-test="button-and-options"
          slot="control"
          @focusout=${this.#onButtonAndOptionsFocusout}
          @keydown=${this.#onButtonAndOptionsKeydown}
        >
          <button
            aria-expanded=${this.open}
            aria-haspopup="listbox"
            aria-labelledby="label"
            aria-describedby="description"
            class=${classMap({
              button: true,
              quiet: this.variant === 'quiet',
              disabled: this.disabled,
              error: this.#isShowValidationFeedback,
            })}
            id="button"
            type="button"
            @click=${this.#onButtonClick}
            @keydown=${this.#onButtonKeydown}
            ${ref(this.#buttonElementRef)}
          >
            ${this.selectedOption?.label ?? this.placeholder}

            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 9L12 15L18 9"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>

          <div
            aria-labelledby="button"
            class=${classMap({
              options: true,
              large: this.size === 'large',
              small: this.size === 'small',
              visible: this.open && !this.disabled,
            })}
            data-test="options"
            id="options"
            role="listbox"
            @keydown=${this.#onOptionsKeydown}
            ${ref(this.#listElementRef)}
          >
            <slot
              @mouseover=${this.#onOptionMouseover}
              @private-change=${this.#onOptionChange}
              @private-selected=${this.#onOptionSelected}
              @private-value=${this.#onOptionValue}
              @slotchange=${this.#onDefaultSlotChange}
              ${ref(this.#defaultSlotElementRef)}
            ></slot>
          </div>
        </div>

        <slot id="description" name="description" slot="description"></slot>
      </cs-label>
    </div>`;
  }

  reportValidity() {
    return this.#internals.reportValidity();
  }

  @state()
  private get selectedOption() {
    // Even with a single-select, there's nothing to stop developers from adding
    // a `selected` attribute to more than one option. How native handles this
    // is by choosing the last selected option. This mimics that behavior, which
    // seems reasonable.
    return this.#optionElements.findLast(({ selected }) => selected);
  }

  constructor() {
    super();
    this.#internals = this.attachInternals();

    // Event listeners on the host aren't great because consumers can remove them.
    // Unfortunately, the host is the only thing on which this event is dispatched
    // because it's the host that is form-associated.
    this.addEventListener('invalid', (event) => {
      event?.preventDefault(); // Canceled so a native validation message isn't shown.

      if (!this.isCheckingValidity) {
        this.isReportValidityOrSubmit = true;

        // - Canceling this event means the button won't get focus, even if we were to use
        //   `this.#internals.delegatesFocus`.
        //
        // - The browser will ignore our `this.focus()` if Dropdown isn't the first invalid
        //   form control.
        this.focus();
      }
    });
  }

  @state()
  private isCheckingValidity = false;

  @state()
  private isReportValidityOrSubmit = false;

  #buttonElementRef = createRef<HTMLButtonElement>();

  #defaultSlotElementRef = createRef<HTMLSlotElement>();

  #internals: ElementInternals;

  #listElementRef = createRef<HTMLUListElement>();

  // An arrow function field instead of a method so `this` is closed over and
  // set to the component instead of `document`.
  #onDocumentClick = (event: MouseEvent) => {
    if (!(event.target instanceof CsDropdown)) {
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

  async #focusActiveOrFirstOption() {
    const option = this.#optionElements.find(
      (element) => element.privateActive,
    );

    if (option) {
      // Wait until the options are visible before trying to focus one.
      await this.updateComplete;

      option.focus();
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

  #onButtonAndOptionsFocusout() {
    // `document.body` receives focus immediately after focus is moved. So we
    // wait a frame to see where focus ultimately landed.
    setTimeout(() => {
      const isOptionFocused = this.#optionElements.some(
        ({ privateIsFocused }) => privateIsFocused,
      );

      if (!isOptionFocused) {
        this.open = false;
      }
    });
  }

  #onButtonAndOptionsKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.open = false;
      this.focus();
    }
  }

  #onButtonClick(event: MouseEvent) {
    // `event.detail` is an integer set to the number of clicks. When it's zero,
    // the event most likely originated from an Enter press. And, if Dropdown is part
    // of a form, Enter will result in a submit and the dropdown shouldn't be opened.
    // Thus we return and do so with or without a form for consistency.
    if (event.detail !== 0) {
      this.open = !this.open;

      if (this.open) {
        this.#focusActiveOrFirstOption();
      } else {
        this.focus();
      }
    }
  }

  #onButtonKeydown(event: KeyboardEvent) {
    if ([' ', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
      event.preventDefault(); // Prevent scroll.
      this.open = true;
      this.#focusActiveOrFirstOption();
    }
  }

  #onDefaultSlotChange() {
    owSlot(this.#defaultSlotElementRef.value);
    owSlotType(this.#defaultSlotElementRef.value, [CsDropdownOption]);
  }

  get #optionElements() {
    return (
      this.#defaultSlotElementRef.value
        ?.assignedElements()
        .filter(
          (element): element is CsDropdownOption =>
            element instanceof CsDropdownOption,
        ) ?? []
    );
  }

  #onOptionChange(event: Event) {
    if (event.target instanceof CsDropdownOption) {
      this.value = event.target.value ? [event.target.value] : [];
      this.open = false;
      this.focus();

      this.dispatchEvent(
        new CustomEvent('change', { bubbles: true, detail: this.value }),
      );

      this.dispatchEvent(
        new CustomEvent('input', { bubbles: true, detail: this.value }),
      );
    }
  }

  #onOptionMouseover(event: Event) {
    for (const option of this.#optionElements) {
      option.privateActive = option === event.target;

      if (option === event.target) {
        option.focus();
      }
    }
  }

  #onOptionSelected() {
    this.value = this.selectedOption?.value ? [this.selectedOption.value] : [];
  }

  #onOptionsKeydown(event: KeyboardEvent) {
    if (this.open) {
      const activeOptionIndex = this.#optionElements.findIndex(
        (element) => element.privateActive,
      );

      const activeOption = this.#optionElements.at(activeOptionIndex);

      if (activeOption) {
        // All the logic below could just as well go in a `@keydown` in Option. It's
        // here to mirror the tests, which necessarily test against Dropdown as a whole
        // because more than one Option is required to test these interactions.
        if (event.key === 'ArrowUp' && !event.metaKey) {
          event.preventDefault(); // Prevent scroll.
          const option = this.#optionElements.at(activeOptionIndex - 1);

          if (option && activeOptionIndex !== 0) {
            activeOption.privateActive = false;
            option.privateActive = true;
            option.focus();
          }

          return;
        }

        if (event.key === 'ArrowDown' && !event.metaKey) {
          event.preventDefault(); // Prevent scroll.
          const option = this.#optionElements.at(activeOptionIndex + 1);

          if (option) {
            activeOption.privateActive = false;
            option.privateActive = true;
            option.focus();
          }

          return;
        }

        if (
          (event.key === 'ArrowUp' && event.metaKey) ||
          event.key === 'Home' ||
          event.key === 'PageUp'
        ) {
          event.preventDefault(); // Prevent scroll.
          const option = this.#optionElements.at(0);

          if (option) {
            activeOption.privateActive = false;
            option.privateActive = true;
            option.focus();
          }

          return;
        }

        if (
          (event.key === 'ArrowDown' && event.metaKey) ||
          event.key === 'End' ||
          event.key === 'PageDown'
        ) {
          event.preventDefault(); // Prevent scroll.
          const option = this.#optionElements.at(-1);

          if (option) {
            activeOption.privateActive = false;
            option.privateActive = true;
            option.focus();
          }

          return;
        }
      }
    }
  }

  #onOptionValue(event: Event) {
    if (event.target instanceof CsDropdownOption && event.target.selected) {
      this.value = [event.target.value];
    }
  }
}
