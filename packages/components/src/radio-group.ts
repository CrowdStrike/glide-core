import './label.js';
import './tooltip.js';
import { LitElement, type PropertyValueMap, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
import { owSlot, owSlotType } from './library/ow.js';
import GlideCoreRadio from './radio.js';
import styles from './radio-group.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-radio-group': GlideCoreRadioGroup;
  }
}
/**
 /**
 * @description A radio group with a label, and optional tooltip and description. Participates in forms and validation via `FormData` and various methods.
 *
 * @event change - Dispatched when a radio is clicked or checked by key press.
 * @event input - Dispatched when a radio is clicked or checked by key press.
 *
 * @slot - One or more of `<glide-core-radio>`.
 * @slot description - Additional information or context.
 * @slot tooltip - Content for the tooltip.
 */
@customElement('glide-core-radio-group')
export default class GlideCoreRadioGroup extends LitElement {
  static formAssociated = true;

  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: 'closed',
  };

  static override styles = styles;

  @property()
  description = '';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property()
  label = '';

  @property({ attribute: 'hide-label', type: Boolean })
  hideLabel = false;

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
    this.#initialCheckedRadio = undefined;
  }

  override firstUpdated() {
    owSlot(this.#defaultSlotElementRef.value);
    owSlotType(this.#defaultSlotElementRef.value, [GlideCoreRadio]);

    // Set the default checked radio item to be the first checked radio, if it exists
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio#value
    this.#initialCheckedRadio = this.#radioItems.find((radio) => radio.checked);

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
    // We need to protect against the case where there is no initially checked radio because
    // otherwise all radios become unchecked and consequently untabbable

    if (this.#initialCheckedRadio && this.contains(this.#initialCheckedRadio)) {
      for (const radioItem of this.#radioItems) {
        this.#setCheckedRadio(
          radioItem === this.#initialCheckedRadio,
          radioItem,
        );
      }
    }
  }

  override render() {
    return html`
      <div
        class="component"
        @click=${this.#onClick}
        @keydown=${this.#onKeydown}
        ${ref(this.#componentElementRef)}
      >
        <glide-core-label
          orientation="horizontal"
          ?disabled=${this.disabled}
          ?error=${this.#isShowValidationFeedback}
          ?hide=${this.hideLabel}
          ?required=${this.required}
        >
          <label id="label" data-test="label"> ${this.label} </label>

          <div
            class=${classMap({
              'radio-container': true,
              vertical: true,
              invalid: this.#isShowValidationFeedback,
            })}
            role="radiogroup"
            slot="control"
            aria-labelledby="label description"
          >
            <slot
              ${ref(this.#defaultSlotElementRef)}
              @slotchange=${this.#onDefaultSlotChange}
            ></slot>
          </div>

          <slot name="tooltip" slot="tooltip"></slot>
          <slot id="description" name="description" slot="description"></slot>
        </glide-core-label>
      </div>
    `;
  }

  reportValidity() {
    return this.#internals.reportValidity();
  }

  override updated(
    changedProperties: PropertyValueMap<GlideCoreRadioGroup>,
  ): void {
    if (
      this.hasUpdated &&
      (changedProperties.has('value') || changedProperties.has('required'))
    ) {
      this.#onUpdateValidityState();
      this.#setInvalidRadios(!this.#internals.validity.valid);
      this.requestUpdate();
    }
  }

  override willUpdate(
    changedProperties: PropertyValueMap<GlideCoreRadioGroup>,
  ): void {
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
    }
  }

  constructor() {
    super();
    this.#internals = this.attachInternals();

    this.addEventListener('invalid', this.#onInvalid);
  }

  @state()
  private isCheckingValidity = false;

  @state()
  private isReportValidityOrSubmit = false;

  #componentElementRef = createRef<HTMLDivElement>();

  #defaultSlotElementRef = createRef<HTMLSlotElement>();

  #initialCheckedRadio?: GlideCoreRadio = undefined;

  #internals: ElementInternals;

  // Recall the previously checked radio so that we can
  // return focus to it when clicking on a disabled radio.
  #previousCheckedRadio?: GlideCoreRadio;

  // An arrow function field instead of a method so `this` is closed over and
  // set to the component instead of the form.
  #onFormdata = ({ formData }: FormDataEvent) => {
    if (this.name && this.value.length > 0 && !this.disabled) {
      formData.append(this.name, this.value);
    }
  };

  #intializeRadios() {
    // Set the default checked radio item to be the first checked radio, if it exists
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio#value
    const intialCheckedRadio = this.#radioItems.find((radio) => radio.checked);

    // If no radio is already checked, use the checked radio from when the component `firstUpdated`
    this.value =
      intialCheckedRadio?.value ?? this.#initialCheckedRadio?.value ?? '';

    this.#previousCheckedRadio =
      intialCheckedRadio ?? this.#initialCheckedRadio;

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

    // If the user clicks on a disabled radio, then attempts to use the keyboard, the focus would normally
    // be stuck on the disabled element. Since the general pattern is for focus to follow selection,
    // it does so here, going to the last checked radio.
    if (
      event.target instanceof GlideCoreRadio &&
      event.target.disabled &&
      this.#previousCheckedRadio &&
      !this.#previousCheckedRadio.disabled
    ) {
      this.#previousCheckedRadio?.focus();
      return;
    }

    const radioTarget = event.target;

    if (
      radioTarget instanceof GlideCoreRadio &&
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
    owSlotType(this.#defaultSlotElementRef.value, [GlideCoreRadio]);

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
      (event.target instanceof GlideCoreRadio && event.target?.disabled)
    ) {
      return;
    }

    if (event.target instanceof GlideCoreRadio) {
      const radioTarget = event.target;

      switch (event.key) {
        case 'ArrowUp':
        case 'ArrowLeft': {
          event.preventDefault();
          // Find the closest enabled radio.
          let sibling = radioTarget.previousElementSibling;

          while (
            (!sibling ||
              (sibling instanceof GlideCoreRadio && sibling.disabled) ||
              !(sibling instanceof GlideCoreRadio)) &&
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
            sibling instanceof GlideCoreRadio &&
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
              (sibling instanceof GlideCoreRadio && sibling.disabled) ||
              !(sibling instanceof GlideCoreRadio)) &&
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
            sibling instanceof GlideCoreRadio &&
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

  #onUpdateValidityState() {
    const isChecked = this.#radioItems.find((radio) => radio.checked);

    if (this.required && !isChecked) {
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
        .filter(
          (element): element is GlideCoreRadio =>
            element instanceof GlideCoreRadio,
        ) ?? []
    );
  }

  #setCheckedRadio(isChecked: boolean, radio: GlideCoreRadio) {
    radio.checked = isChecked;
    radio.tabIndex = isChecked ? 0 : -1;

    if (isChecked) {
      this.#previousCheckedRadio = radio;
      this.value = radio.value;
      radio.focus();
      radio.dispatchEvent(new Event('change', { bubbles: true }));
      radio.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }

  #setDisabledRadio(isDisabled: boolean, radio: GlideCoreRadio) {
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
    let firstTabbableRadio: GlideCoreRadio | null = null;

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
