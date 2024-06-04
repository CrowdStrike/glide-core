import './tooltip.js';
import { LitElement, type PropertyValueMap, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
import { owSlot, owSlotType } from './library/ow.js';
import { when } from 'lit-html/directives/when.js';
import CsRadio from './radio.js';
import infoCircleIcon from './icons/info-circle.js';
import styles from './radio-group.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'cs-radio-group': CsRadioGroup;
  }
}
/**
 /**
 * @description A radio group with a label, and optional tooltip and description. Participates in forms and validation via `FormData` and various methods.
 *
 * @event change - Dispatched when a radio is clicked or checked by key press.
 * @event input - Dispatched when a radio is clicked or checked by key press.
 *
 * @slot - One or more of `<cs-radio>`.
 * @slot description - Additional information or context.
 * @slot tooltip - Content for the tooltip.
 */
@customElement('cs-radio-group')
export default class CsRadioGroup extends LitElement {
  static formAssociated = true;

  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: 'closed',
  };

  static override styles = styles;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property()
  label = '';

  @property()
  name = '';

  @property({ type: Boolean, reflect: true })
  required = false;

  @property({ reflect: true })
  value = '';

  checkValidity() {
    this.isCheckingValidity = true;
    return this.#internals.checkValidity();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.form?.removeEventListener('formdata', this.#onFormdata);
  }

  override firstUpdated() {
    owSlot(this.#defaultSlotElementRef.value);
    owSlotType(this.#defaultSlotElementRef.value, [CsRadio]);

    this.#intializeRadios();
  }

  override focus(options?: FocusOptions): void {
    let radioToFocus = this.#radioItems.find((radio) => radio.checked);

    if (!radioToFocus) {
      radioToFocus = this.#radioItems.find((radio) => radio.tabIndex === 0);
    }

    radioToFocus?.focus(options);
  }

  get form() {
    return this.#internals.form;
  }

  get validity() {
    return this.#internals.validity;
  }

  get willValidate() {
    return this.#internals.willValidate;
  }

  formAssociatedCallback() {
    this.form?.addEventListener('formdata', this.#onFormdata);
  }

  formResetCallback() {
    for (const radioItem of this.#radioItems) {
      this.#setCheckedRadio(radioItem.hasAttribute('checked'), radioItem);
    }
  }

  override render() {
    return html`
      <div
        class=${classMap({
          component: true,
          invalid: this.#isShowValidationFeedback,
        })}
        ${ref(this.#componentElementRef)}
        @click=${this.#onClick}
        @keydown=${this.#onKeydown}
      >
        ${when(
          this.label,
          () => html`
            <!-- label -->
            <span class=${classMap({ 'label-container': true })}>
              <cs-tooltip
                class=${classMap({
                  visible: this.hasTooltipSlot,
                })}
              >
                <span class="tooltip-target" slot="target" tabindex="0">
                  ${infoCircleIcon}
                </span>

                <slot
                  name="tooltip"
                  @slotchange=${this.#onTooltipSlotChange}
                  ${ref(this.#tooltipSlotElementRef)}
                ></slot>
              </cs-tooltip>

              <div aria-hidden="true" data-test="label">${this.label}</div>
              ${when(
                this.required,
                () =>
                  html`<span
                    aria-hidden="true"
                    class="required-symbol"
                    data-test="label-required"
                    >*</span
                  >`,
              )}
            </span>
          `,
        )}

        <!-- fieldset and description container -->
        <div>
          <!-- fieldset -->
          <fieldset class="vertical" aria-labelledby="label description">
            <div
              class=${classMap({
                'radio-container': true,
                vertical: true,
              })}
              role="radiogroup"
            >
              <slot
                ${ref(this.#defaultSlotElementRef)}
                @slotchange=${this.#onDefaultSlotChange}
              ></slot>
            </div>
          </fieldset>

          <!-- description -->
          <slot
            class="description"
            id="description"
            name="description"
            data-test="description"
          ></slot>
        </div>
      </div>
    `;
  }

  reportValidity() {
    return this.#internals.reportValidity();
  }

  override updated(changedProperties: PropertyValueMap<CsRadioGroup>): void {
    if (
      this.hasUpdated &&
      (changedProperties.has('value') || changedProperties.has('required'))
    ) {
      this.#onUpdateValidityState();

      // Update radio presentation/announcement after initial render so
      // that user does not experience an invalid presentation/announcement when no radio is initially
      // checked and the group is required.
      this.#firstUpdateComplete &&
        this.#internals.validity &&
        this.#setInvalidRadios(!this.#internals.validity.valid);

      this.#firstUpdateComplete = true;
    }
  }

  override willUpdate(changedProperties: PropertyValueMap<CsRadioGroup>): void {
    if (this.hasUpdated) {
      if (changedProperties.has('required')) {
        this.#setRequiredRadios();
      }

      if (changedProperties.has('disabled')) {
        for (const radioItem of this.#radioItems) {
          this.#setDisabledRadio(this.disabled, radioItem);
        }

        !this.disabled && this.#setRadiosTabindex();
      }

      if (changedProperties.has('value')) {
        for (const radioItem of this.#radioItems) {
          radioItem.checked = radioItem.value === this.value;
        }
      }

      // Validity is updated at the end of the render cycle in lifecycle method `updated`.
      // To prevent a re-render and correctly remove an invalid presentation when the state is
      // in fact valid, batch with other updates.
      if (
        (changedProperties.has('value') &&
          this.value?.length > 0 &&
          this.isReportValidityOrSubmit) ||
        !this.required
      ) {
        this.isReportValidityOrSubmit = false;
      }
    }
  }

  constructor() {
    super();
    this.#internals = this.attachInternals();

    this.addEventListener('invalid', this.#onInvalid);
  }

  @state()
  private hasTooltipSlot = false;

  @state()
  private isCheckingValidity = false;

  @state()
  private isReportValidityOrSubmit = false;

  #componentElementRef = createRef<HTMLDivElement>();

  #defaultSlotElementRef = createRef<HTMLSlotElement>();

  #firstUpdateComplete = false;

  #internals: ElementInternals;

  // Recall the previously checked radio so that we can
  // return focus to it when clicking on a disabled radio.
  #previousCheckedRadio?: CsRadio;

  #tooltipSlotElementRef = createRef<HTMLSlotElement>();

  // An arrow function field instead of a method so `this` is closed over and
  // set to the component instead of the form.
  #onFormdata = ({ formData }: FormDataEvent) => {
    if (this.name && this.value.length > 0 && !this.disabled) {
      formData.append(this.name, this.value);
    }
  };

  #dispatchEvents(radio: CsRadio) {
    radio.dispatchEvent(new Event('change', { bubbles: true }));

    radio.dispatchEvent(new Event('input', { bubbles: true }));
  }

  #intializeRadios() {
    // Set the default checked radio item to be the first checked radio, if it exists
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio#value
    const intialCheckedRadio = this.#radioItems.find((radio) => radio.checked);

    this.value = intialCheckedRadio?.value ?? '';

    this.#previousCheckedRadio = intialCheckedRadio;

    this.required && this.#setRequiredRadios();

    for (const radioItem of this.#radioItems) {
      // Set all radios as disabled if the group is disabled, otherwise set
      // individual radios as given.
      if (this.disabled) {
        this.#setDisabledRadio(this.disabled, radioItem);
      } else {
        this.#setDisabledRadio(radioItem.disabled, radioItem);
      }
    }

    !this.disabled && this.#setRadiosTabindex();
  }

  get #isShowValidationFeedback() {
    const isInvalid =
      !this.disabled && !this.validity.valid && this.isReportValidityOrSubmit;

    this.#setInvalidRadios(isInvalid);

    return isInvalid;
  }

  #onClick(event: MouseEvent) {
    if (this.disabled) return;

    if (
      event.target instanceof CsRadio &&
      event.target.disabled &&
      this.#previousCheckedRadio &&
      !this.#previousCheckedRadio.disabled
    ) {
      this.#previousCheckedRadio?.focus();
      return;
    }

    const radioTarget = event.target;

    if (
      radioTarget instanceof CsRadio &&
      radioTarget &&
      !radioTarget.disabled
    ) {
      this.#setCheckedRadio(true, radioTarget);

      for (const radioItem of this.#radioItems) {
        if (radioItem !== radioTarget) {
          this.#setCheckedRadio(false, radioItem);
        }
      }
    }
  }

  #onDefaultSlotChange() {
    owSlot(this.#defaultSlotElementRef.value);
    owSlotType(this.#defaultSlotElementRef.value, [CsRadio]);

    this.#intializeRadios();
  }

  #onInvalid(event: Event) {
    event.preventDefault();

    if (!this.isCheckingValidity) {
      this.isReportValidityOrSubmit = true;
      this.focus();
    }
  }

  #onKeydown(event: KeyboardEvent) {
    if (
      this.disabled ||
      (event.target instanceof CsRadio && event.target?.disabled)
    ) {
      return;
    }

    if (event.target instanceof CsRadio) {
      const radioTarget = event.target;

      switch (event.key) {
        case 'ArrowUp':
        case 'ArrowLeft': {
          event.preventDefault();
          // Find the closest enabled radio.
          let sibling = radioTarget.previousElementSibling;

          while (
            (!sibling ||
              (sibling instanceof CsRadio && sibling.disabled) ||
              !(sibling instanceof CsRadio)) &&
            sibling !== radioTarget
          ) {
            if (sibling === null) {
              const lastRadio = this.#radioItems.at(-1);

              if (lastRadio) {
                sibling = lastRadio;
              }
            } else {
              sibling = sibling.previousElementSibling;
            }
          }

          if (
            sibling &&
            sibling instanceof CsRadio &&
            !sibling.disabled &&
            sibling !== radioTarget
          ) {
            this.#setCheckedRadio(false, radioTarget);
            this.#setCheckedRadio(true, sibling);
          }

          break;
        }
        case 'ArrowDown':
        case 'ArrowRight': {
          event.preventDefault();
          // Find the closest enabled radio.
          let sibling = radioTarget.nextElementSibling;

          while (
            (!sibling ||
              (sibling instanceof CsRadio && sibling.disabled) ||
              !(sibling instanceof CsRadio)) &&
            sibling !== radioTarget
          ) {
            if (sibling === null) {
              const firstRadio = this.#radioItems.at(0);

              if (firstRadio) {
                sibling = firstRadio;
              }
            } else {
              sibling = sibling.nextElementSibling;
            }
          }

          if (
            sibling &&
            sibling instanceof CsRadio &&
            !sibling.disabled &&
            sibling !== radioTarget
          ) {
            this.#setCheckedRadio(false, radioTarget);
            this.#setCheckedRadio(true, sibling);
          }

          break;
        }
        case ' ': {
          event.preventDefault();

          if (!radioTarget.disabled && !radioTarget.checked) {
            this.#setCheckedRadio(true, radioTarget);

            for (const radioItem of this.#radioItems) {
              if (radioItem !== radioTarget) {
                this.#setCheckedRadio(false, radioItem);
              }
            }
          }

          break;
        }
      }
    }
  }

  #onTooltipSlotChange() {
    const assignedNodes = this.#tooltipSlotElementRef.value?.assignedNodes();
    this.hasTooltipSlot = Boolean(assignedNodes && assignedNodes.length > 0);
  }

  #onUpdateValidityState() {
    if (this.required && (this.value?.length === 0 || this.value === null)) {
      // A validation message is required but unused because we disable native validation feedback.
      // And an empty string isn't allowed. Thus a single space.
      this.#internals.setValidity(
        { valueMissing: true },
        ' ',
        this.#componentElementRef.value,
      );
    } else {
      this.#internals.setValidity({});
    }
  }

  get #radioItems() {
    return (
      this.#defaultSlotElementRef.value
        ?.assignedElements()
        .filter((element): element is CsRadio => element instanceof CsRadio) ??
      []
    );
  }

  #setCheckedRadio(isChecked: boolean, radio: CsRadio) {
    radio.checked = isChecked;
    radio.tabIndex = isChecked ? 0 : -1;

    if (isChecked) {
      this.#previousCheckedRadio = radio;
      this.value = radio.value;
      radio.focus();
      this.#dispatchEvents(radio);
    }
  }

  #setDisabledRadio(isDisabled: boolean, radio: CsRadio) {
    radio.disabled = isDisabled;

    if (isDisabled) {
      radio.tabIndex = -1;
    }
  }

  #setInvalidRadios(isInvalid: boolean) {
    for (const radioItem of this.#radioItems) {
      radioItem.invalid = isInvalid;
    }
  }

  #setRadiosTabindex() {
    // Do not set any radio as tabbable if all are disabled.
    if (this.disabled || this.#radioItems.every((button) => button.disabled)) {
      return;
    }

    // Set a radio as tabbable if it is the first checked and enabled element, or the
    // first enabled element; otherwise set the radio as not tabbable.
    let firstTabbableRadio: CsRadio | null = null;

    const firstEnabledCheckedRadio = this.#radioItems.find(
      (radio) => !radio.disabled && radio.checked,
    );

    if (firstEnabledCheckedRadio) {
      firstTabbableRadio = firstEnabledCheckedRadio;
    } else {
      const firstEnabledRadio = this.#radioItems.find(
        (radio) => !radio.disabled,
      );

      if (firstEnabledRadio) {
        firstTabbableRadio = firstEnabledRadio;
      }
    }

    if (firstTabbableRadio) {
      for (const radioItem of this.#radioItems) {
        radioItem.tabIndex = radioItem === firstTabbableRadio ? 0 : -1;
      }
    }
  }

  #setRequiredRadios() {
    for (const radioItem of this.#radioItems) {
      radioItem.required = this.required;
    }
  }
}
