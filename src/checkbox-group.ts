import './label.js';
import { html, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { when } from 'lit/directives/when.js';
import packageJson from '../package.json' with { type: 'json' };
import Checkbox from './checkbox.js';
import styles from './checkbox-group.styles.js';
import assertSlot from './library/assert-slot.js';
import type FormControl from './library/form-control.js';
import final from './library/final.js';
import required from './library/required.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-checkbox-group': CheckboxGroup;
  }
}

/**
 * @attr {string} label
 * @attr {boolean} [disabled=false]
 * @attr {boolean} [hide-label=false]
 * @attr {string} [name='']
 * @attr {'horizontal'} [orientation='horizontal']
 * @attr {boolean} [required=false]
 * @attr {string} [summary]
 * @attr {string} [tooltip]
 * @attr {string[]} [value=[]]
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {Checkbox}
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
@customElement('glide-core-checkbox-group')
@final
export default class CheckboxGroup extends LitElement implements FormControl {
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

    for (const checkbox of this.#checkboxElements) {
      checkbox.disabled = isDisabled;
    }
  }

  @property({ attribute: 'hide-label', type: Boolean })
  hideLabel = false;

  @property({ reflect: true, useDefault: true })
  name = '';

  @property({ reflect: true, useDefault: true })
  orientation = 'horizontal' as const;

  // Private because it's only meant to be used by Form Controls Layout.
  @property()
  privateSplit?: 'left' | 'middle' | 'right';

  /**
   * @default false
   */
  @property({ reflect: true, type: Boolean })
  get required(): boolean {
    return this.#isRequired;
  }

  set required(isRequired: boolean) {
    this.#isRequired = isRequired;
    this.#setValidity();
  }

  @property({ reflect: true })
  summary?: string;

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

    for (const checkbox of this.#checkboxElements) {
      const isChecked = value.some(
        (value) => value !== '' && value === checkbox.value,
      );

      // It would be simpler if we just checked and unchecked every Checkbox
      // based on whether its value is in `value`. But doing so would uncheck
      // Checkboxes that don't have a value but have nonetheless been checked
      // by the user. Doing it this way ensures we change as little state as
      // possible that isn't ours to change.
      if (isChecked) {
        checkbox.checked = true;
      } else if (checkbox.value) {
        checkbox.checked = false;
      }

      // We have a few options if `value` is set programmatically to include
      // the value of a disabled Checkbox. We can throw, remove the value from
      // `value`, or enable the Checkbox.
      //
      // Throwing is attractive because the inclusion of a disabled Checkbox
      // in `value` is likely a mistake, either due to bad data or developer
      // error.
      //
      // But we only throw in development. So the form will be submitted with the
      // new `value` in production regardless if it was by mistake. By enabling
      // the Checkbox, we at least ensure the user is aware of the fact that it'll
      // be included in the submission.
      if (checkbox.checked && checkbox.disabled) {
        checkbox.disabled = false;
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
    if (this.disabled) {
      for (const checkbox of this.#checkboxElements) {
        checkbox.disabled = true;
      }
    }

    const hasNoCheckedCheckboxes = this.#checkboxElements.every(
      ({ checked }) => !checked,
    );

    // When `value` is set on initial render, its setter is called before
    // `connectedCallback()` and thus before the default slot has any assigned
    // elements. So we set it again here after the initial render is complete
    // so `this.#checkboxElements` isn't empty.
    //
    // Additionally, `#onDefaultSlotChange()` is called after `firstUpdated()`
    // and sets `value` based on which checkboxes are checked. And the initial `value`
    // may conflict with the one derived from which checkboxes are checked.
    //
    // So we have a decision to make. On first render, do we defer to the initial
    // `value` and check and uncheck checkboxes below? Or do we defer to
    // `#onDefaultSlotChange()` and let that method change `value` from its initial
    // value based on which checkboxes are checked?
    //
    // It's largely a toss-up. But the latter seems like the logical choice given
    // `#onDefaultSlotChange()` is called after `firstUpdated()`. In other words, we
    // defer to the lifecycle. `#onDefaultSlotChange()` is called second. So it gets to
    // override what `value` was initially.
    //
    // If no checkboxes are checked, then it's obvious that the consumer's intention is
    // to check checkboxes based on the initial `value` and that the initial `value` is
    // the intended one. So we proceed.
    if (hasNoCheckedCheckboxes) {
      // Cached because `#onCheckboxDisabledChange()` overwrites it.
      const value = this.value;

      for (const checkbox of this.#checkboxElements) {
        checkbox.checked = value.includes(checkbox.value);

        if (checkbox.checked && !this.disabled) {
          checkbox.disabled = false;
        }
      }
    }
  }

  get form(): HTMLFormElement | null {
    return this.#internals.form;
  }

  get validity(): ValidityState {
    return this.#internals.validity;
  }

  override focus(options?: FocusOptions) {
    const checkbox = this.#checkboxElements.find(({ disabled }) => !disabled);
    checkbox?.focus(options);
  }

  formAssociatedCallback(): void {
    this.form?.addEventListener('formdata', this.#onFormdata);
  }

  formResetCallback(): void {
    for (const checkbox of this.#checkboxElements) {
      checkbox.formResetCallback();
    }
  }

  override render() {
    return html`<div
      class="component"
      data-test="component"
      ${ref(this.#componentElementRef)}
    >
      <glide-core-private-label
        label=${ifDefined(this.label)}
        orientation=${this.orientation}
        split=${ifDefined(this.privateSplit ?? undefined)}
        tooltip=${ifDefined(this.tooltip)}
        ?hide=${this.hideLabel}
        ?disabled=${this.disabled}
        ?error=${this.#isShowValidationFeedback}
        ?required=${this.required}
      >
        <label id="label">${this.label}</label>

        <!-- "aria-describedby" is more appropriate for a description but isn't read by VoiceOver. -->
        <div
          aria-labelledby="label description"
          role="group"
          slot="control"
          class=${classMap({
            'checkbox-container': true,
            invalid: this.#isShowValidationFeedback,
          })}
        >
          <slot
            class="default-slot"
            @focusin=${this.#onDefaultSlotFocusIn}
            @focusout=${this.#onDefaultSlotFocusOut}
            @private-checked-change=${this.#onDefaultSlotCheckedChange}
            @private-disabled-change=${this.#onDefaultSlotDisabledChange}
            @private-value-change=${this.#onDefaultSlotValueChange}
            @slotchange=${this.#onDefaultSlotSlotChange}
            ${assertSlot([Checkbox])}
            ${ref(this.#defaultSlotElementRef)}
          >
            <!--
              @type {Checkbox}
              @required
            -->
          </slot>
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
              html`<span class="validity-message" data-test="validity-message">
                ${unsafeHTML(this.validityMessage)}
              </span>`,
          )}
        </div>
      </glide-core-private-label>
    </div>`;
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

    this.#internals.setValidity(
      flags,
      ' ',
      this.#focusedCheckbox ??
        this.#checkboxElements.find(({ disabled }) => !disabled),
    );
  }

  constructor() {
    super();
    this.#internals = this.attachInternals();

    // Event handlers on the host aren't great because consumers can remove them.
    // Unfortunately, the host is the only thing on which this event is dispatched
    // because it's the host that is form-associated.
    this.addEventListener('invalid', (event) => {
      event?.preventDefault(); // Canceled so a native validation message isn't shown.

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

      if (isFirstInvalidFormElement && !this.#focusedCheckbox) {
        // - `delegatesFocus` is preferred because it's declarative. But it's limited to
        //    focusing the first focusable element. That doesn't work for us because the first
        //    focusable element is the Tooltip when it's present.
        //
        // - Canceling this event means the input won't get focus, even if we were to use
        //   `delegatesFocus`.
        //
        // - The browser will ignore this if Checkbox isn't the first invalid form control.
        //
        // TODO
        // Try passing `focusVisible` after browsers support it. It may prevent the issue
        // where the checkbox itself has a focus outline after this call.
        //
        // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#focusvisible
        this.focus();
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

  #checkedAndEnabledCheckboxes = new Set<Checkbox>();

  #componentElementRef = createRef<HTMLElement>();

  #defaultSlotElementRef = createRef<HTMLSlotElement>();

  #focusedCheckbox: Checkbox | null = null;

  #hasCustomValidity = false;

  #internals: ElementInternals;

  #isDisabled = false;

  #isRequired = false;

  #value: string[] = [];

  get #checkboxElements() {
    return this.#defaultSlotElementRef.value
      ? this.#defaultSlotElementRef.value
          .assignedElements()
          .filter((element): element is Checkbox => {
            return element instanceof Checkbox;
          })
      : [];
  }

  // An arrow function field instead of a method so `this` is closed over and
  // set to the component instead of the form.
  #onFormdata = ({ formData }: FormDataEvent) => {
    if (this.name && this.value.length > 0 && !this.disabled) {
      formData.append(this.name, JSON.stringify(this.value));
    }
  };

  get #isShowValidationFeedback() {
    return (
      !this.disabled &&
      !this.validity.valid &&
      this.hasReportedValidityOrSubmitted
    );
  }

  #onDefaultSlotCheckedChange(event: Event) {
    if (event.target instanceof Checkbox && event.target.checked) {
      this.#checkedAndEnabledCheckboxes.add(event.target);
    } else if (event.target instanceof Checkbox && !event.target.checked) {
      this.#checkedAndEnabledCheckboxes.delete(event.target);
    }

    this.#value = Array.from(
      this.#checkedAndEnabledCheckboxes,
      ({ value }) => value,
    );

    this.#setValidity();

    // Ensures `#isShowValidationFeedback` is re-run.
    this.requestUpdate();
  }

  #onDefaultSlotDisabledChange(event: Event) {
    if (
      event.target instanceof Checkbox &&
      event.target.disabled &&
      event.target.checked
    ) {
      this.#checkedAndEnabledCheckboxes.delete(event.target);
    } else if (event.target instanceof Checkbox && event.target.checked) {
      this.#checkedAndEnabledCheckboxes.add(event.target);
    }

    this.#value = Array.from(
      this.#checkedAndEnabledCheckboxes,
      ({ value }) => value,
    );

    this.#setValidity();
  }

  #onDefaultSlotFocusIn(event: FocusEvent) {
    if (event.target instanceof Checkbox) {
      this.#focusedCheckbox = event.target;
    }
  }

  #onDefaultSlotFocusOut(event: FocusEvent) {
    this.#focusedCheckbox = null;

    const lastEnabledCheckbox = this.#checkboxElements.findLast(
      ({ disabled }) => !disabled,
    );

    if (event.target === lastEnabledCheckbox) {
      this.isBlurring = true;
      this.reportValidity();
      this.isBlurring = false;
    }
  }

  #onDefaultSlotSlotChange() {
    for (const checkbox of this.#checkboxElements) {
      checkbox.privateVariant = 'minimal';
    }

    for (const checkbox of this.#checkboxElements) {
      if (checkbox.disabled) {
        this.#checkedAndEnabledCheckboxes.delete(checkbox);
      } else if (checkbox.checked) {
        this.#checkedAndEnabledCheckboxes.add(checkbox);
      }
    }

    this.#value = Array.from(
      this.#checkedAndEnabledCheckboxes,
      ({ value }) => value,
    );

    this.#setValidity();
  }

  #onDefaultSlotValueChange() {
    this.#value = Array.from(
      this.#checkedAndEnabledCheckboxes,
      ({ value }) => value,
    );
  }

  #setValidity() {
    if (this.#hasCustomValidity) {
      return;
    }

    if (this.required && this.#value.length === 0) {
      this.#internals.setValidity(
        { customError: Boolean(this.validityMessage), valueMissing: true },
        ' ',
        this.#focusedCheckbox ??
          this.#checkboxElements.find(({ disabled }) => !disabled),
      );

      return;
    }

    this.#internals.setValidity({});
  }
}
