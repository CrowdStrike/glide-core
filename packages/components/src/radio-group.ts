import './tooltip.js';
import { LitElement, type PropertyValueMap, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import {
  customElement,
  property,
  queryAssignedElements,
  state,
} from 'lit/decorators.js';
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
 * @description A radio group for use with `<cs-radio>` with label.
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

  // To be exposed when a 'horizontal' orientation is implemented
  orientation = 'vertical' as const;

  @property({ type: Boolean, reflect: true })
  required = false;

  @property({ reflect: true })
  value = '';

  @queryAssignedElements({ selector: 'cs-radio' })
  radioItems!: CsRadio[];

  checkValidity() {
    this.isCheckingValidity = true;
    return this.#internals.checkValidity();
  }

  override connectedCallback(): void {
    super.connectedCallback();

    this.addEventListener('click', this.#onClick);
    this.addEventListener('keydown', this.#onKeydown);
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
    this.value = this.getAttribute('value') ?? '';
  }

  override render() {
    return html`
      <div
        class=${classMap({
          component: true,
          error: this.#isShowValidationFeedback,
        })}
        ${ref(this.#componentElementRef)}
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

        <!-- fieldset -->
        <div>
          <fieldset
            class=${classMap({
              vertical: true,
            })}
            aria-labelledby="label description"
          >
            <div
              class=${classMap({
                'radio-container': true,
                [this.orientation]: true,
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
            class=${classMap({
              description: true,
            })}
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
    }
  }

  override willUpdate(changedProperties: PropertyValueMap<CsRadioGroup>): void {
    if (this.hasUpdated) {
      if (changedProperties.has('required')) {
        this.#setRequiredRadios();
      }

      if (changedProperties.has('disabled')) {
        for (const radioItem of this.radioItems) {
          this.#setDisabledRadio(this.disabled, radioItem);
        }

        !this.disabled && this.#setRadiosTabindex();
      }

      if (changedProperties.has('value')) {
        for (const radioItem of this.radioItems) {
          radioItem.checked = radioItem.value === this.value;
        }
      }

      // Validity is updated at the end of the render cycle.
      // To prevent a re-render and correctly remove an error presentation when the state is validm
      // batch with other updates.
      if (
        (changedProperties.has('value') &&
          this.value.length > 0 &&
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

  #internals: ElementInternals;

  #tooltipSlotElementRef = createRef<HTMLSlotElement>();

  // An arrow function field instead of a method so `this` is closed over and
  // set to the component instead of the form.
  #onFormdata = ({ formData }: FormDataEvent) => {
    if (this.name && this.value.length > 0 && !this.disabled) {
      formData.append(this.name, this.value);
    }
  };

  #dispatchEvents(radio: CsRadio) {
    radio.dispatchEvent(
      new CustomEvent('change', { bubbles: true, detail: radio.value }),
    );

    radio.dispatchEvent(
      new CustomEvent('input', { bubbles: true, detail: radio.value }),
    );
  }

  #intializeRadios() {
    if (this.value.length > 0) {
      for (const radioItem of this.radioItems) {
        radioItem.checked = radioItem.value === this.value;
      }
    } else {
      this.value = this.radioItems.find((radio) => radio.checked)?.value ?? '';
    }

    this.#setRadiosGroupName();
    this.required && this.#setRequiredRadios();

    for (const radioItem of this.radioItems) {
      this.#setDisabledRadio(this.disabled, radioItem);
    }

    !this.disabled && this.#setRadiosTabindex();
  }

  get #isShowValidationFeedback() {
    const shouldShow =
      !this.disabled && !this.validity.valid && this.isReportValidityOrSubmit;

    if (shouldShow) {
      for (const radioItem of this.radioItems) {
        radioItem.error = true;
      }
    } else {
      for (const radioItem of this.radioItems) {
        radioItem.error = false;
      }
    }

    return shouldShow;
  }

  #onClick(event: MouseEvent) {
    if (this.disabled) {
      return;
    }

    const radioTarget = event.target;

    if (radioTarget instanceof CsRadio && !radioTarget?.disabled) {
      this.#setCheckRadio(true, radioTarget);

      for (const radioItem of this.radioItems) {
        if (radioItem !== radioTarget) {
          this.#setCheckRadio(false, radioItem);
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
    }
  }

  #onKeydown(event: KeyboardEvent) {
    if (this.disabled) {
      return;
    }

    if (event.target instanceof CsRadio) {
      const radioTarget = event.target;

      if (radioTarget.disabled) {
        return;
      }

      switch (event.key) {
        case 'ArrowUp':
        case 'ArrowLeft': {
          event.preventDefault();
          // find the closest enabled radio
          let sibling = radioTarget.previousElementSibling;

          while (
            (!sibling ||
              (sibling instanceof CsRadio && sibling.disabled) ||
              !(sibling instanceof CsRadio)) &&
            sibling !== radioTarget
          ) {
            if (sibling === null) {
              const lastRadio = this.radioItems.at(-1);

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
            this.#setCheckRadio(false, radioTarget);
            this.#setCheckRadio(true, sibling);
          }

          break;
        }
        case 'ArrowDown':
        case 'ArrowRight': {
          event.preventDefault();
          // find the closest enabled button
          let sibling = radioTarget.nextElementSibling;

          while (
            (!sibling ||
              (sibling instanceof CsRadio && sibling.disabled) ||
              !(sibling instanceof CsRadio)) &&
            sibling !== radioTarget
          ) {
            if (sibling === null) {
              const firstRadio = this.radioItems.at(0);

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
            this.#setCheckRadio(false, radioTarget);
            this.#setCheckRadio(true, sibling);
          }

          break;
        }
        case ' ': {
          event.preventDefault();

          if (!radioTarget.disabled && !radioTarget.checked) {
            this.#setCheckRadio(true, radioTarget);

            for (const radioItem of this.radioItems) {
              if (radioItem !== radioTarget) {
                this.#setCheckRadio(false, radioItem);
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
    if (this.required && this.value.length === 0) {
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

  #setCheckRadio(isChecked: boolean, radio: CsRadio) {
    radio.checked = isChecked;
    radio.tabIndex = isChecked ? 0 : -1;

    if (isChecked) {
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

  #setRadiosGroupName() {
    for (const radioItem of this.radioItems) {
      radioItem.name = this.name;
    }
  }

  #setRadiosTabindex() {
    // Do not set any button as tabbable if all are disabled
    if (this.disabled || this.radioItems.every((button) => button.disabled)) {
      for (const radioItem of this.radioItems) {
        radioItem.tabIndex = -1;
      }

      return;
    }

    // Set tabbable if this is the first selected enabled element or the
    // first enabled element; otherwise set the radio item as not tabbable
    let firstTabbableRadio: CsRadio | null = null;

    const firstEnabledCheckedRadio = this.radioItems.find(
      (radio) => !radio.disabled && radio.checked,
    );

    if (firstEnabledCheckedRadio) {
      firstTabbableRadio = firstEnabledCheckedRadio;
    } else {
      const firstEnabledRadio = this.radioItems.find(
        (radio) => !radio.disabled,
      );

      if (firstEnabledRadio) {
        firstTabbableRadio = firstEnabledRadio;
      }
    }

    if (firstTabbableRadio) {
      for (const radioItem of this.radioItems) {
        radioItem.tabIndex = radioItem === firstTabbableRadio ? 0 : -1;
      }
    }
  }

  #setRequiredRadios() {
    for (const radioItem of this.radioItems) {
      radioItem.required = this.required;
    }
  }
}
