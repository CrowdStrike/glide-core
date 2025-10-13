import './label.js';
import './tooltip.js';
import { html, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { when } from 'lit/directives/when.js';
import packageJson from '../package.json' with { type: 'json' };
import RadioGroupRadio from './radio-group.radio.js';
import styles from './radio-group.styles.js';
import assertSlot from './library/assert-slot.js';
import type FormControl from './library/form-control.js';
import final from './library/final.js';
import required from './library/required.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-radio-group': RadioGroup;
  }
}

/**
 * @attr {string} label
 * @attr {boolean} [disabled=false]
 * @attr {boolean} [hide-label=false]
 * @attr {string} [name='']
 * @attr {'horizontal'} [orientation='horizontal']
 * @attr {boolean} [required=false]
 * @attr {'left'|'middle'|'right'} [split]
 * @attr {string} [tooltip]
 * @attr {string} [value='']
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {Radio}
 * @slot {Element | string} [description] - Additional information or context
 *
 * @fires {Event} invalid
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
@customElement('glide-core-radio-group')
@final
export default class RadioGroup extends LitElement implements FormControl {
  static formAssociated = true;

  /* v8 ignore start */
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: window.navigator.webdriver ? 'open' : 'closed',
  };
  /* v8 ignore stop */

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

    const checkedRadio = this.#radioElements.findLast(({ checked }) => checked);

    for (const radio of this.#radioElements) {
      this.#isEnablingOrDisablingTheGroup = true;
      radio.disabled = isDisabled;
      this.#isEnablingOrDisablingTheGroup = false;

      if (isDisabled) {
        radio.tabIndex = -1;
      } else if (radio === checkedRadio) {
        radio.tabIndex = 0;
      } else if (!checkedRadio && radio === this.#firstEnabledRadio) {
        radio.tabIndex = 0;
      }
    }

    if (isDisabled) {
      this.#value = '';
    } else if (checkedRadio) {
      this.#value = checkedRadio.value;
    }
  }

  @property({ attribute: 'hide-label', type: Boolean })
  hideLabel = false;

  @property({ reflect: true, useDefault: true })
  name = '';

  @property({ reflect: true })
  orientation = 'horizontal' as const;

  /**
   * @default false
   */
  @property({ reflect: true, type: Boolean })
  get required(): boolean {
    return this.#isRequired;
  }

  set required(isRequired: boolean) {
    this.#isRequired = isRequired;

    // Changes to `required` change the validity state. If no radios are
    // checked and Radio Group is `required`, then Radio Group is invalid.
    // However, if `required` is programmatically removed, then Radio Group
    // is suddenly valid.
    for (const radio of this.#radioElements) {
      radio.privateRequired = isRequired;
    }

    this.#setValidity();
  }

  @property({ reflect: true })
  split?: 'left' | 'middle' | 'right' | undefined;

  @property({ reflect: true })
  tooltip?: string;

  // Intentionally not reflected to match native.
  /**
   * @default ''
   */
  @property()
  get value(): string {
    return this.#value;
  }

  set value(value: string) {
    this.#value = value;

    if (this.#isSettingValueAttributeInitially) {
      return;
    }

    for (const radio of this.#radioElements) {
      const isChecked = radio.value === value;

      radio.checked = isChecked ? true : false;
      radio.tabIndex = isChecked ? 0 : -1;

      // We have a few options if `value` is set programmatically to include
      // the value of a disabled Radio. We can throw, remove the value from
      // `value`, or enable the Radio.
      //
      // Throwing is attractive because the inclusion of a disabled Radio
      // in `value` is likely a mistake, either due to bad data or developer
      // error.
      //
      // But we only throw in development. So the form will be submitted with
      // the new `value` in production regardless if it was by mistake. By enabling
      // the Radio, we at least ensure the user is aware of the fact that it'll
      // be included in the submission.
      if (radio.checked && radio.disabled) {
        radio.disabled = false;
      }
    }
  }

  @property({ reflect: true })
  readonly version: string = packageJson.version;

  checkValidity(): boolean {
    this.isCheckingValidity = true;
    const isValid = this.#internals.checkValidity();
    this.isCheckingValidity = false;

    return isValid;
  }

  /* v8 ignore start */
  override disconnectedCallback() {
    super.disconnectedCallback();
    this.form?.removeEventListener('formdata', this.#onFormdata);
  }
  /* v8 ignore stop */

  override firstUpdated() {
    for (const radio of this.#radioElements) {
      radio.privateRequired = this.required;
      radio.tabIndex = -1;

      if (this.disabled) {
        radio.disabled = this.disabled;
      }
    }

    const checkedRadio = this.#radioElements.find(
      ({ checked, disabled }) => checked && !disabled,
    );

    if (checkedRadio) {
      this.#value = checkedRadio.value;

      checkedRadio.tabIndex = 0;

      // When there's not a default `value` set on the group and a radio is checked
      // set, we need to manually set `value` on the group. That way when `form.reset()`
      // is called we know what value to reset back to.
      //
      // `#isSettingValueAttributeInitially` is used to guard against the `value` the
      // setter unchecking every radio but the last. We try our best not to change state
      // set by the consumer. If a consumer checks multiple radios, either initially or
      // programmatically, we leave them checked and simply don't show them as checked to
      // the user. That way what the user sees matches what gets submitted with the form.
      this.#isSettingValueAttributeInitially = true;
      this.setAttribute('value', checkedRadio.value);
      this.#isSettingValueAttributeInitially = false;

      return;
    }

    // When `value` is set on initial render, its setter is called before
    // `connectedCallback()` and thus before the default slot has any assigned
    // elements. So we set it again here after the initial render is complete
    // so `this.#radioElements` isn't empty.
    //
    // Additionally, `#onDefaultSlotChange()` is called after `firstUpdated()`
    // and sets `value` based on which radios are checked. And the initial `value`
    // may conflict with the one derived from which radios are checked.
    //
    // So we have a decision to make. On first render, do we defer to the initial
    // `value` and check a radio below? Or do we defer to `#onDefaultSlotChange()`
    // and let that method change `value` from its initial value based on which radios
    // are checked?
    //
    // It's largely a toss-up. But the latter seems like the logical choice given
    // `#onDefaultSlotChange()` is called after `firstUpdated()`. In other words, we
    // defer to the lifecycle. `#onDefaultSlotChange()` is called second. So it gets
    // to override what `value` was initially.
    //
    // If no radios are checked, then it's obvious that the consumer's intention is
    // to check radios based on the initial `value` and that the initial `value` is
    // the intended one. So we proceed.
    const radioWithMatchingValue = this.#radioElements.findLast(
      ({ value }) => value === this.value,
    );

    if (radioWithMatchingValue) {
      if (!this.disabled && radioWithMatchingValue.disabled) {
        radioWithMatchingValue.disabled = false;
      }

      radioWithMatchingValue.checked = true;
      radioWithMatchingValue.tabIndex = 0;

      return;
    }

    if (this.#firstEnabledRadio) {
      this.#firstEnabledRadio.tabIndex = 0;

      return;
    }
  }

  override focus(options?: FocusOptions) {
    this.#radioElements.find(({ tabIndex }) => tabIndex === 0)?.focus(options);
  }

  get form(): HTMLFormElement | null {
    return this.#internals.form;
  }

  get validity(): ValidityState {
    return this.#internals.validity;
  }

  formAssociatedCallback(): void {
    this.form?.addEventListener('formdata', this.#onFormdata);
  }

  formResetCallback(): void {
    for (const radio of this.#radioElements) {
      radio.checked = radio.hasAttribute('checked');
    }
  }

  override render() {
    return html`
      <div
        class="component"
        @click=${this.#onComponentClick}
        @keydown=${this.#onComponentKeydown}
        ${ref(this.#componentElementRef)}
      >
        <glide-core-label
          label=${ifDefined(this.label)}
          orientation=${this.orientation}
          split=${ifDefined(this.split)}
          tooltip=${ifDefined(this.tooltip)}
          ?disabled=${this.disabled}
          ?error=${this.#isShowValidationFeedback}
          ?hide-label=${this.hideLabel}
          ?required=${this.required}
        >
          <label id="label"> ${this.label} </label>

          <div
            class=${classMap({
              'radio-container': true,
              invalid: this.#isShowValidationFeedback,
            })}
            role="radiogroup"
            slot="control"
            aria-labelledby="label description"
          >
            <slot
              @focusout=${this.#onDefaultSlotFocusOut}
              @private-checked-change=${this.#onDefaultSlotCheckedChange}
              @private-disabled-change=${this.#onDefaultSlotDisabledChange}
              @private-value-change=${this.#onDefaultSlotValueChange}
              @slotchange=${this.#onDefaultSlotSlotChange}
              ${assertSlot([RadioGroupRadio])}
              ${ref(this.#defaultSlotElementRef)}
            >
              <!-- @type {Radio} -->
            </slot>
          </div>

          <div id="description" slot="description">
            <slot
              class=${classMap({
                'description-slot': true,
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
                html`<div data-test="validity-message">
                  ${unsafeHTML(this.validityMessage)}
                </div>`,
            )}
          </div>
        </glide-core-label>
      </div>
    `;
  }

  reportValidity(): boolean {
    this.hasReportedValidityOrSubmitted = true;

    const isValid = this.#internals.reportValidity();

    // Ensures getters referencing `this.validity.valid` re-run.
    this.requestUpdate();

    return isValid;
  }

  resetValidityFeedback(): void {
    this.hasReportedValidityOrSubmitted = false;
  }

  setCustomValidity(message: string): void {
    this.validityMessage = message;

    if (message === '') {
      this.#internals.setValidity(
        { customError: false },
        '',
        this.#componentElementRef.value,
      );
    } else {
      this.#internals.setValidity(
        {
          customError: true,
          valueMissing: this.#internals.validity.valueMissing,
        },
        ' ',
        this.#componentElementRef.value,
      );
    }
  }

  setValidity(flags?: ValidityStateFlags, message?: string): void {
    this.#hasCustomValidity = true;
    this.validityMessage = message;

    this.#internals.setValidity(flags, ' ', this.#firstEnabledRadio);
  }

  constructor() {
    super();
    this.#internals = this.attachInternals();

    this.addEventListener('invalid', (event) => {
      event.preventDefault(); // Canceled so a native validation message isn't shown.

      // We only want to focus the input if the "invalid" event resulted from either:
      //
      // 1. A form submission.
      // 2. A call of `reportValidity()` that did not result from the input's "blur"
      //    event.
      if (this.isCheckingValidity || this.isBlurring) {
        return;
      }

      this.hasReportedValidityOrSubmitted = true;

      const isFirstInvalidFormElement =
        this.form?.querySelector(':invalid') === this;

      if (isFirstInvalidFormElement) {
        this.#firstEnabledRadio?.focus();
      }
    });
  }

  @state()
  private hasReportedValidityOrSubmitted = false;

  @state()
  private isBlurring = false;

  @state()
  private isCheckingValidity = false;

  @state()
  private validityMessage?: string;

  #componentElementRef = createRef<HTMLElement>();

  #defaultSlotElementRef = createRef<HTMLSlotElement>();

  #hasCustomValidity = false;

  #internals: ElementInternals;

  #isDisabled = false;

  #isEnablingOrDisablingTheGroup = false;

  #isRequired = false;

  #isSettingValueAttributeInitially = false;

  #value = '';

  // An arrow function field instead of a method so `this` is closed over and
  // set to the component instead of the form.
  #onFormdata = ({ formData }: FormDataEvent) => {
    const checkedAndEnabledRadios = this.#checkedRadios.filter(
      ({ disabled }) => !disabled,
    );

    if (this.name && checkedAndEnabledRadios.length > 0 && !this.disabled) {
      formData.append(this.name, this.value);
    }
  };

  get #isShowValidationFeedback() {
    const isInvalid =
      !this.disabled &&
      !this.validity.valid &&
      this.hasReportedValidityOrSubmitted;

    for (const radioItem of this.#radioElements) {
      radioItem.privateInvalid = isInvalid;
    }

    return isInvalid;
  }

  get #checkedRadios() {
    return this.#radioElements.filter(({ checked }) => checked);
  }

  get #firstEnabledRadio() {
    return this.#radioElements.find(({ disabled }) => !disabled);
  }

  #onComponentClick(event: MouseEvent) {
    const isRadio = event.target instanceof RadioGroupRadio;

    /* v8 ignore start */
    if (!isRadio) {
      return;
    }
    /* v8 ignore stop */

    if (event.target.disabled) {
      return;
    }

    event.target.privateCheck();
    event.target.tabIndex = 0;
    event.target.focus();
  }

  #onComponentKeydown(event: KeyboardEvent) {
    const isRadio = event.target instanceof RadioGroupRadio;

    /* v8 ignore start */
    if (!isRadio) {
      return;
    }
    /* v8 ignore stop */

    if (event.target?.disabled) {
      return;
    }

    if (event.key === 'Enter') {
      this.form?.requestSubmit();

      return;
    }

    if (['ArrowUp', 'ArrowLeft'].includes(event.key)) {
      event.preventDefault(); // Prevent page scroll

      const previousEnabledRadio = this.#radioElements
        .slice(0, this.#radioElements.indexOf(event.target))
        .findLast((radio) => !radio.disabled);

      const lastEnabledRadio = this.#radioElements.findLast(
        (radio) => !radio.disabled,
      );

      if (previousEnabledRadio && previousEnabledRadio !== event.target) {
        previousEnabledRadio.privateCheck();
        previousEnabledRadio.tabIndex = 0;
        previousEnabledRadio.focus();

        this.#value = previousEnabledRadio.value;
      } else if (lastEnabledRadio && lastEnabledRadio !== event.target) {
        lastEnabledRadio.privateCheck();
        lastEnabledRadio.tabIndex = 0;
        lastEnabledRadio.focus();
      }

      return;
    }

    if (['ArrowDown', 'ArrowRight'].includes(event.key)) {
      event.preventDefault(); // Prevent page scroll

      const nextEnabledRadio = this.#radioElements.find((radio, index) => {
        return (
          !radio.disabled &&
          event.target instanceof RadioGroupRadio &&
          index > this.#radioElements.indexOf(event.target)
        );
      });

      if (nextEnabledRadio && nextEnabledRadio !== event.target) {
        nextEnabledRadio.privateCheck();
        nextEnabledRadio.tabIndex = 0;
        nextEnabledRadio.focus();
      } else if (
        this.#firstEnabledRadio &&
        this.#firstEnabledRadio !== event.target
      ) {
        this.#firstEnabledRadio.privateCheck();
        this.#firstEnabledRadio.tabIndex = 0;
        this.#firstEnabledRadio.focus();
      }

      return;
    }

    if (event.key === ' ') {
      event.preventDefault(); // Prevent page scroll

      if (!event.target.disabled && !event.target.checked) {
        event.target.privateCheck();
        event.target.tabIndex = 0;
        event.target.focus();
      }

      return;
    }
  }

  #onDefaultSlotCheckedChange(event: Event) {
    if (event.target instanceof RadioGroupRadio && event.target.checked) {
      for (const radio of this.#radioElements) {
        if (radio !== event.target) {
          radio.tabIndex = -1;
          radio.checked = false;
        }
      }

      event.target.tabIndex = 0;
      this.#value = event.target.value;
    } else if (event.target instanceof RadioGroupRadio) {
      event.target.tabIndex = -1;
      this.#value = '';
    }

    this.#setValidity();

    // Ensures `#isShowValidationFeedback` is re-run.
    this.requestUpdate();
  }

  #onDefaultSlotDisabledChange(event: Event) {
    if (this.#isEnablingOrDisablingTheGroup) {
      this.#setValidity();

      return;
    }

    if (event.target instanceof RadioGroupRadio && event.target.disabled) {
      const checkedRadio = this.#radioElements.findLast(
        (radio) => radio.checked && !radio.disabled,
      );

      if (event.target.checked) {
        this.#value = '';
      } else if (checkedRadio) {
        this.#value = checkedRadio.value;
      }

      const nextEnabledRadio = this.#radioElements.find((radio, index) => {
        return (
          !radio.disabled &&
          event.target instanceof RadioGroupRadio &&
          index > this.#radioElements.indexOf(event.target)
        );
      });

      if (nextEnabledRadio && event.target.tabIndex === 0) {
        nextEnabledRadio.tabIndex = 0;
        event.target.tabIndex = -1;
      } else if (this.#firstEnabledRadio && event.target.tabIndex === 0) {
        this.#firstEnabledRadio.tabIndex = 0;
        event.target.tabIndex = -1;
      }

      this.#setValidity();

      return;
    }

    if (event.target instanceof RadioGroupRadio) {
      const hasTabbableRadio = this.#radioElements.some(
        ({ tabIndex }) => tabIndex === 0,
      );

      if (!hasTabbableRadio) {
        event.target.tabIndex = 0;
      }

      if (event.target.checked) {
        this.#value = event.target.value;
      }

      this.#setValidity();

      return;
    }
  }

  #onDefaultSlotFocusOut() {
    this.isBlurring = true;
    this.reportValidity();
    this.isBlurring = false;
  }

  #onDefaultSlotSlotChange() {
    if (this.#checkedRadios.length > 1) {
      throw new Error('Only one Radio Group Radio may be `checked` at a time.');
    }

    const checkedRadio = this.#checkedRadios.find(
      ({ checked, disabled }) => checked && !disabled,
    );

    if (checkedRadio) {
      this.#value = checkedRadio.value;
    }

    this.#setValidity();
  }

  get #radioElements() {
    return this.#defaultSlotElementRef.value
      ? this.#defaultSlotElementRef.value
          .assignedElements({ flatten: true })
          .filter(
            (element): element is RadioGroupRadio =>
              element instanceof RadioGroupRadio,
          )
      : [];
  }

  #onDefaultSlotValueChange(event: Event) {
    if (event.target instanceof RadioGroupRadio && event.target.checked) {
      this.#value = event.target.value;
    }
  }

  #setValidity() {
    if (this.#hasCustomValidity) {
      return;
    }

    const hasCheckedRadio = this.#radioElements.some(
      ({ checked, disabled }) => checked && !disabled,
    );

    if (this.required && !hasCheckedRadio) {
      this.#internals.setValidity(
        { customError: Boolean(this.validityMessage), valueMissing: true },
        ' ',
        this.#firstEnabledRadio,
      );

      return;
    }

    this.#internals.setValidity({});
  }
}
