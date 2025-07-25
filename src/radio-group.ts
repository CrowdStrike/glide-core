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
import shadowRootMode from './library/shadow-root-mode.js';
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

    const lastCheckedRadio = this.#radioElements.findLast(
      (radio) => radio.checked,
    );

    for (const radio of this.#radioElements) {
      this.#isEnablingOrDisablingTheGroup = true;
      radio.disabled = isDisabled;
      this.#isEnablingOrDisablingTheGroup = false;

      const firstEnabledRadio = this.#radioElements.find(
        (radio) => !radio.disabled,
      );

      if (isDisabled) {
        radio.tabIndex = -1;
      } else if (radio === lastCheckedRadio) {
        radio.tabIndex = 0;
      } else if (!lastCheckedRadio && radio === firstEnabledRadio) {
        radio.tabIndex = 0;
      }
    }

    if (isDisabled) {
      this.#value = '';
    } else if (lastCheckedRadio) {
      this.#value = lastCheckedRadio.value;
    }
  }

  @property({ attribute: 'hide-label', type: Boolean })
  hideLabel = false;

  @property({ reflect: true, useDefault: true })
  name = '';

  @property({ reflect: true })
  orientation = 'horizontal' as const;

  // Private because it's only meant to be used by Form Controls Layout.
  @property()
  privateSplit?: 'left' | 'middle' | 'right';

  @property({ reflect: true })
  tooltip?: string;

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
  }

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
      // If both `value` and the radio's `value` are empty strings, the
      // desired outcome from the perspective of the consumer is almost
      // certainly not to check the radio.
      const isChecked = Boolean(value !== '' && radio.value === value);

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

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.form?.removeEventListener('formdata', this.#onFormdata);
  }

  override firstUpdated() {
    for (const radio of this.#radioElements) {
      radio.privateRequired = this.required;
      radio.tabIndex = -1;

      if (this.disabled) {
        radio.disabled = this.disabled;
      }
    }

    // There's nothing to stop developers from adding a `checked` attribute to more
    // than one radio. How native handles it with `<select>` is to choose the last
    // selected option. This mimics that behavior, which seems reasonable.
    const lastCheckedRadio = this.#radioElements.findLast(
      ({ checked, disabled }) => checked && !disabled,
    );

    if (lastCheckedRadio) {
      this.#value = lastCheckedRadio.value;

      if (!this.disabled) {
        lastCheckedRadio.tabIndex = 0;
      }

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
      this.setAttribute('value', lastCheckedRadio.value);
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
    if (!lastCheckedRadio && this.value !== '') {
      const lastRadioWithMatchingValue = this.#radioElements.findLast(
        ({ value }) => value === this.value,
      );

      if (!this.disabled && lastRadioWithMatchingValue?.disabled) {
        lastRadioWithMatchingValue.disabled = false;
      }

      if (lastRadioWithMatchingValue) {
        lastRadioWithMatchingValue.checked = true;
        lastRadioWithMatchingValue.tabIndex = 0;
      }

      return;
    }

    const firstEnabledRadio = this.#radioElements.find(
      ({ disabled }) => !disabled,
    );

    if (firstEnabledRadio) {
      firstEnabledRadio.tabIndex = 0;
      return;
    }
  }

  override focus(options?: FocusOptions) {
    const radio =
      this.#radioElements.find(
        ({ checked, disabled }) => checked && !disabled,
      ) ?? this.#radioElements.find(({ tabIndex }) => tabIndex === 0);

    radio?.focus(options);
  }

  get form(): HTMLFormElement | null {
    return this.#internals.form;
  }

  get validity(): ValidityState {
    const isChecked = this.#radioElements.some(({ checked }) => checked);

    if (this.required && !isChecked && !this.disabled) {
      // A validation message is required but unused because we disable native validation
      // feedback. And an empty string isn't allowed. Thus a single space.
      this.#internals.setValidity(
        { customError: Boolean(this.validityMessage), valueMissing: true },
        ' ',
        this.#componentElementRef.value,
      );

      return this.#internals.validity;
    }

    if (this.required && this.#internals.validity.valueMissing && isChecked) {
      this.#internals.setValidity({});
      return this.#internals.validity;
    }

    if (this.required && this.disabled && !isChecked) {
      this.#internals.setValidity(
        { valueMissing: true },
        ' ',
        this.#componentElementRef.value,
      );

      return this.#internals.validity;
    }

    if (!this.required && this.#internals.validity.valueMissing && !isChecked) {
      this.#internals.setValidity({});

      return this.#internals.validity;
    }

    return this.#internals.validity;
  }

  formAssociatedCallback(): void {
    this.form?.addEventListener('formdata', this.#onFormdata);
  }

  formResetCallback(): void {
    this.value = this.getAttribute('value') ?? '';
  }

  override render() {
    return html`
      <div
        class="component"
        @click=${this.#onComponentClick}
        @keydown=${this.#onComponentKeydown}
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
          <label id="label" data-test="label"> ${this.label} </label>

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
              @focusout=${this.#onRadioGroupFocusout}
              @private-checked-change=${this.#onRadiosCheckedChange}
              @private-disabled-change=${this.#onRadiosDisabledChange}
              @private-value-change=${this.#onRadiosValueChange}
              @slotchange=${this.#onDefaultSlotChange}
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
        </glide-core-private-label>
      </div>
    `;
  }

  reportValidity(): boolean {
    this.isReportValidityOrSubmit = true;

    const isValid = this.#internals.reportValidity();

    // Ensures that getters referencing `this.validity.valid` are updated.
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
    this.validityMessage = message;
    this.#internals.setValidity(flags, ' ', this.#componentElementRef.value);
  }

  constructor() {
    super();
    this.#internals = this.attachInternals();

    this.addEventListener('invalid', (event) => {
      event.preventDefault();

      if (!this.isCheckingValidity) {
        // Canceled so a native validation message isn't shown.
        event?.preventDefault();

        // We only want to focus the radios if the invalid event resulted from either:
        // 1. Form submission
        // 2. a call to reportValidity that did NOT result from the input blur event
        if (this.isCheckingValidity || this.isBlurring) {
          return;
        }

        this.isReportValidityOrSubmit = true;

        const isFirstInvalidFormElement =
          this.form?.querySelector(':invalid') === this;

        if (isFirstInvalidFormElement) {
          this.focus();
        }
      }
    });
  }

  @state()
  private isBlurring = false;

  @state()
  private isCheckingValidity = false;

  @state()
  private isReportValidityOrSubmit = false;

  @state()
  private validityMessage?: string;

  #componentElementRef = createRef<HTMLElement>();

  #defaultSlotElementRef = createRef<HTMLSlotElement>();

  #internals: ElementInternals;

  #isDisabled = false;

  #isEnablingOrDisablingTheGroup = false;

  #isRequired = false;

  #isSettingValueAttributeInitially = false;

  #value = '';

  // An arrow function field instead of a method so `this` is closed over and
  // set to the component instead of the form.
  #onFormdata = ({ formData }: FormDataEvent) => {
    if (this.name && this.value.length > 0 && !this.disabled) {
      formData.append(this.name, this.value);
    }
  };

  get #isShowValidationFeedback() {
    const isInvalid =
      !this.disabled && !this.validity.valid && this.isReportValidityOrSubmit;

    for (const radioItem of this.#radioElements) {
      radioItem.privateInvalid = isInvalid;
    }

    return isInvalid;
  }

  #checkRadio(radio: RadioGroupRadio) {
    this.#radioElements
      .find(({ tabIndex }) => tabIndex === 0)
      ?.setAttribute('tabindex', '-1');

    this.#value = radio.value;

    radio.checked = true;
    radio.tabIndex = 0;
    radio.focus();
  }

  #onComponentClick(event: MouseEvent) {
    if (this.disabled) {
      return;
    }

    // If the user clicks on a disabled radio, then attempts to use the keyboard, the
    // focus would normally be stuck on the disabled element. Since the general pattern
    // is for focus to follow selection, it does so here, going to the last checked
    // radio.
    if (event.target instanceof RadioGroupRadio && event.target.disabled) {
      const selectedRadio = this.#radioElements.find(({ checked }) => checked);
      selectedRadio?.focus();
      return;
    }

    if (event.target instanceof RadioGroupRadio && !event.target.disabled) {
      const radiosToUncheck = this.#radioElements.filter(
        (radio) => radio !== event.target,
      );

      for (const radio of radiosToUncheck) {
        radio.checked = false;
        radio.tabIndex = -1;
      }

      this.#checkRadio(event.target);
    }
  }

  #onComponentKeydown(event: KeyboardEvent) {
    if (
      this.disabled ||
      (event.target instanceof RadioGroupRadio && event.target?.disabled)
    ) {
      return;
    }

    if (event.target instanceof RadioGroupRadio) {
      switch (event.key) {
        case 'Enter': {
          this.form?.requestSubmit();
          break;
        }
        case 'ArrowUp':
        case 'ArrowLeft': {
          event.preventDefault();

          const previousEnabledRadio = this.#radioElements
            .slice(0, this.#radioElements.indexOf(event.target))
            .findLast((radio) => !radio.disabled);

          const lastEnabledRadio = this.#radioElements.findLast(
            (radio) => !radio.disabled,
          );

          if (previousEnabledRadio && previousEnabledRadio !== event.target) {
            this.#uncheckRadio(event.target);
            this.#checkRadio(previousEnabledRadio);
          } else if (lastEnabledRadio && lastEnabledRadio !== event.target) {
            this.#uncheckRadio(event.target);
            this.#checkRadio(lastEnabledRadio);
          }

          break;
        }
        case 'ArrowDown':
        case 'ArrowRight': {
          event.preventDefault();

          const nextEnabledRadio = this.#radioElements.find((radio, index) => {
            return (
              !radio.disabled &&
              event.target instanceof RadioGroupRadio &&
              index > this.#radioElements.indexOf(event.target)
            );
          });

          const firstEnabledRadio = this.#radioElements.find(
            (radio) => !radio.disabled,
          );

          if (nextEnabledRadio && nextEnabledRadio !== event.target) {
            this.#uncheckRadio(event.target);
            this.#checkRadio(nextEnabledRadio);
          } else if (firstEnabledRadio && firstEnabledRadio !== event.target) {
            this.#uncheckRadio(event.target);
            this.#checkRadio(firstEnabledRadio);
          }

          break;
        }
        case ' ': {
          event.preventDefault();

          if (!event.target.disabled && !event.target.checked) {
            this.#checkRadio(event.target);

            for (const radio of this.#radioElements) {
              if (radio !== event.target) {
                this.#uncheckRadio(radio);
              }
            }
          }

          break;
        }
      }
    }
  }

  #onDefaultSlotChange() {
    const lastCheckedRadio = this.#radioElements.findLast(
      ({ checked, disabled }) => {
        return checked && !disabled;
      },
    );

    if (lastCheckedRadio) {
      this.#value = lastCheckedRadio.value;
    }
  }

  #onRadioGroupFocusout(event: FocusEvent) {
    // If `event.relatedTarget` is `null`, the user has clicked an element outside
    // Radio Group that cannot receive focus. Otherwise, the user has either clicked
    // an element outside Radio Group that can receive focus or else has tabbed away
    // from Radio Group.
    const isFocusLost =
      event.relatedTarget === null ||
      (event.relatedTarget instanceof Node &&
        !this.contains(event.relatedTarget));

    if (isFocusLost) {
      this.isBlurring = true;
      this.reportValidity();
      this.isBlurring = false;
    }
  }

  get #radioElements() {
    return this.#defaultSlotElementRef.value
      ? this.#defaultSlotElementRef.value
          .assignedElements()
          .filter(
            (element): element is RadioGroupRadio =>
              element instanceof RadioGroupRadio,
          )
      : [];
  }

  #onRadiosCheckedChange(event: CustomEvent<{ new: boolean; old: boolean }>) {
    if (
      event.target instanceof RadioGroupRadio &&
      event.target.checked &&
      !event.detail.old &&
      event.detail.new
    ) {
      const checkedRadio = this.#radioElements.find(
        ({ tabIndex }) => tabIndex === 0,
      );

      if (checkedRadio && checkedRadio !== event.target) {
        this.#uncheckRadio(checkedRadio);
      }

      this.#value = event.target.value;
      event.target.tabIndex = event.target.disabled ? -1 : 0;
    }
  }

  #onRadiosDisabledChange(event: Event) {
    if (this.#isEnablingOrDisablingTheGroup) {
      return;
    }

    if (event.target instanceof RadioGroupRadio && event.target.disabled) {
      const lastCheckedAndEnabledRadio = this.#radioElements.findLast(
        (radio) => radio.checked && !radio.disabled,
      );

      if (event.target.checked && !lastCheckedAndEnabledRadio) {
        this.#value = '';
      } else if (lastCheckedAndEnabledRadio) {
        this.#value = lastCheckedAndEnabledRadio.value;
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
        return;
      }

      const firstEnabledRadio = this.#radioElements.find(
        (radio) => !radio.disabled,
      );

      if (firstEnabledRadio && event.target.tabIndex === 0) {
        firstEnabledRadio.tabIndex = 0;
        event.target.tabIndex = -1;
        return;
      }
    }

    if (event.target instanceof RadioGroupRadio && !this.disabled) {
      const hasTabbableRadio = this.#radioElements.some(
        ({ tabIndex }) => tabIndex === 0,
      );

      if (!hasTabbableRadio) {
        event.target.tabIndex = 0;
      }

      const lastCheckedAndEnabledRadio = this.#radioElements.findLast(
        (radio) => radio.checked && !radio.disabled,
      );

      if (event.target === lastCheckedAndEnabledRadio) {
        this.#value = event.target.value;
      }

      return;
    }
  }

  #onRadiosValueChange(event: CustomEvent<{ new: string; old: string }>) {
    const lastCheckedAndEnabledRadio = this.#radioElements.findLast(
      (radio) => radio.checked && !this.disabled,
    );

    if (
      event.target instanceof RadioGroupRadio &&
      event.target.checked &&
      event.detail.new &&
      event.target === lastCheckedAndEnabledRadio
    ) {
      this.#value = event.target.value;
    } else if (
      event.target instanceof RadioGroupRadio &&
      event.target.checked &&
      event.target === lastCheckedAndEnabledRadio
    ) {
      this.#value = '';
    }
  }

  #uncheckRadio(radio: RadioGroupRadio) {
    radio.checked = false;
    radio.tabIndex = -1;
  }
}
