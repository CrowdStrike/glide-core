import './label.js';
import { html, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { when } from 'lit/directives/when.js';
import packageJson from '../package.json' with { type: 'json' };
import { LocalizeController } from './library/localize.js';
import styles from './slider.styles.js';
import type FormControl from './library/form-control.js';
import shadowRootMode from './library/shadow-root-mode.js';
import final from './library/final.js';
import required from './library/required.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-slider': Slider;
  }
}

/**
 * @attr {string} label
 * @attr {boolean} [disabled=false]
 * @attr {boolean} [hide-label=false]
 * @attr {number} [max=100]
 * @attr {number} [min=0]
 * @attr {boolean} [multiple=false]
 * @attr {string} [name='']
 * @attr {'vertical'} [orientation='vertical']
 * @attr {boolean} [readonly=false]
 * @attr {boolean} [required=false]
 * @attr {number} [step=1]
 * @attr {string} [tooltip]
 * @attr {number[]} [value=[]]
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {Element | string} [description] - Additional information or context
 *
 * @fires {Event} change
 * @fires {Event} input
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
@customElement('glide-core-slider')
@final
export default class Slider extends LitElement implements FormControl {
  static formAssociated = true;

  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: shadowRootMode,
    delegatesFocus: true,
  };

  static override styles = styles;

  @property({ reflect: true, useDefault: true })
  name = '';

  // Intentionally not reflected to match native.
  /**
   * @default []
   */
  @property({ type: Array })
  get value(): number[] {
    if (
      this.multiple &&
      this.minimumValue !== undefined &&
      this.maximumValue !== undefined
    ) {
      return [this.minimumValue, this.maximumValue];
    }

    if (this.minimumValue !== undefined) {
      return [this.minimumValue];
    }

    return [];
  }

  set value(value: number[]) {
    if (!value || value.length === 0) {
      const rangeSize = this.max - this.min;

      // To match native, when the value is emptied, we create
      // one. Native sets it to 50% of the max, but we have a
      // design requirement already for a 25/75% split of the range
      // size, so we'll use that instead.
      this.minimumValue = this.min + Math.floor(rangeSize * 0.25);

      this.maximumValue = this.multiple
        ? this.min + Math.ceil(rangeSize * 0.75)
        : undefined;

      this.#initialValue =
        this.multiple && this.maximumValue !== undefined
          ? [this.minimumValue, this.maximumValue]
          : [this.minimumValue];

      this.#updateHandlesAndTrack();

      return;
    }

    if (
      this.multiple &&
      value.length === 2 &&
      value[0] !== undefined &&
      value[1] !== undefined
    ) {
      const normalizedMinimum = Math.round(value[0] / this.step) * this.step;
      const normalizedMaximum = Math.round(value[1] / this.step) * this.step;

      this.minimumValue = Math.max(normalizedMinimum, this.min);
      this.maximumValue = Math.min(normalizedMaximum, this.max);

      this.#updateHandlesAndTrack();
      return;
    }

    if (!this.multiple && value.length > 0 && value[0] !== undefined) {
      const normalizedValue = Math.round(value[0] / this.step) * this.step;

      this.minimumValue = Math.max(
        Math.min(normalizedValue, this.max),
        this.min,
      );

      // Clear maximumValue to ensure consistency in single handle mode
      this.maximumValue = undefined;

      this.#updateHandlesAndTrack();
      return;
    }
  }

  @property({ reflect: true })
  @required
  label?: string;

  @property({ reflect: true })
  orientation = 'vertical' as const;

  @property({ attribute: 'hide-label', type: Boolean })
  hideLabel = false;

  @property({ reflect: true, type: Boolean })
  required = false;

  @property({ type: Boolean })
  readonly = false;

  @property({ reflect: true, type: Boolean })
  disabled = false;

  /**
   * @default 100
   */
  @property({ reflect: true, type: Number })
  get max(): number {
    return this.#max;
  }

  set max(max: number) {
    this.#max = max;

    this.maximumValue = Math.min(this.maximumValue ?? this.#max, max);

    // Help the user out by clamping the minimum value if it is now
    // greater than the `max` to prevent the UI from being in a position
    // where a user can't interact with the handles.
    //
    // In multiple mode, we can decide which value to set it to by
    // looking at `max` and the current value and `step`.
    // But in single mode, it's easier, because we can simply
    // set the current value to the provided `max`.
    if (this.minimumValue !== undefined && this.minimumValue > max) {
      this.minimumValue =
        this.multiple && this.maximumValue !== undefined
          ? Math.min(max, this.maximumValue - this.step)
          : max;
    }

    this.#updateHandlesAndTrack();
  }

  /**
   * @default 0
   */
  @property({ reflect: true, type: Number })
  get min(): number {
    return this.#min;
  }

  set min(min: number) {
    this.#min = min;

    this.minimumValue = Math.max(this.minimumValue ?? this.#min, min);

    if (this.multiple) {
      // Help the user out by clamping the maximum value if it is now
      // less than the `min` to prevent the sliders from being in a
      // position where a user can't easily interact with the handles.
      //
      // We'll leverage the minimumValue and `step` for our maximumValue
      // in this case.
      if (this.maximumValue !== undefined && this.maximumValue < min) {
        this.maximumValue = Math.max(min, this.minimumValue + this.step);
      }
    } else {
      // In single mode, it's safer to always reset the
      // maximumValue to undefined when `min` changes
      // to prevent getting into states where the maximumValue
      // persists.
      this.maximumValue = undefined;
    }

    this.#updateHandlesAndTrack();
  }

  /**
   * @default false
   */
  @property({ type: Boolean })
  get multiple(): boolean {
    return this.#multiple;
  }

  set multiple(multiple: boolean) {
    const oldValue = this.#multiple;
    this.#multiple = multiple;

    if (oldValue && !multiple) {
      this.maximumValue = undefined;

      this.requestUpdate();

      this.updateComplete.then(() => {
        this.#updateHandlesAndTrack();
      });
    } else if (!oldValue && multiple && this.minimumValue !== undefined) {
      const rangeSize = this.max - this.min;

      // As per the designs, we always try to default the
      // maximum value to ~75% of the range size available.
      const desiredMaximumValue = this.min + Math.ceil(rangeSize * 0.75);

      // However, there may be cases where the current
      // minimum value now exceeds that 75% threshold.
      // We attempt to account for this case by updating
      // the maximum value to `max`.
      if (this.minimumValue >= desiredMaximumValue) {
        this.maximumValue = this.max;

        // If the minimum value is still (somehow) larger,
        // we lower it to help prevent the component from
        // getting into an invalid state. This is hopefully
        // an edge case, but one we should account for.
        if (this.minimumValue >= this.maximumValue) {
          this.minimumValue = this.maximumValue - this.step;
        }
      } else {
        this.maximumValue = desiredMaximumValue;
      }

      this.requestUpdate();

      this.updateComplete.then(() => {
        this.#updateHandlesAndTrack();
      });
    }
  }

  @property({ reflect: true, type: Number, useDefault: true })
  step = 1;

  // Private because it's only meant to be used by Form Controls Layout.
  @property()
  privateSplit?: 'left' | 'middle';

  @property({ reflect: true })
  readonly version: string = packageJson.version;

  @property({ reflect: true })
  tooltip?: string;

  get form(): HTMLFormElement | null {
    return this.#internals.form;
  }

  get validity(): ValidityState {
    return this.#internals.validity;
  }

  checkValidity(): boolean {
    this.isCheckingValidity = true;
    const isValid = this.#internals.checkValidity();
    this.isCheckingValidity = false;

    return isValid;
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.form?.removeEventListener('formdata', this.#onFormdata);

    document.removeEventListener('mousemove', this.#onDraggingMousemove);
    document.removeEventListener('mouseup', this.#onDraggingMouseup);
  }

  override firstUpdated() {
    if (!this.multiple && this.value.length === 1) {
      this.minimumValue = this.value.at(0);

      this.#initialValue = this.value;

      this.#updateHandlesAndTrack();
      return;
    }

    if (this.multiple && this.value.length === 2) {
      this.minimumValue = this.value.at(0);
      this.maximumValue = this.value.at(1);

      // Have to add this check to satisfy TypeScript
      if (this.minimumValue !== undefined && this.maximumValue !== undefined) {
        this.#initialValue = [this.minimumValue, this.maximumValue];
      }

      this.#updateHandlesAndTrack();
      return;
    }

    if (!this.value || this.value.length === 0) {
      const rangeSize = this.max - this.min;

      // When the native range input is not provided a value,
      // it defaults it to 50% of the max. Our design requirements
      // are a little bit different, in that they want the single
      // slider and minimum handle in multiple mode to be at
      // 25% of the range size, and the maximum handle in multiple
      // mode to be at 75% of the range size.
      this.minimumValue = this.min + Math.floor(rangeSize * 0.25);

      this.maximumValue = this.multiple
        ? this.min + Math.ceil(rangeSize * 0.75)
        : undefined;

      this.#initialValue =
        this.multiple && this.maximumValue !== undefined
          ? [this.minimumValue, this.maximumValue]
          : [this.minimumValue];

      this.#updateHandlesAndTrack();
    }
  }

  formAssociatedCallback(): void {
    this.form?.addEventListener('formdata', this.#onFormdata.bind(this));
  }

  formResetCallback(): void {
    this.value = this.#initialValue;
  }

  override render() {
    // The #slider element has a click handler for convenience
    // to allow for users to click anywhere on the track and have
    // a handle move to that position. This is a situation where the
    // linter is being overzealous without considering the full context
    // of the component.
    //
    // This behavior is an ehancement rather than essential functionality.
    //
    // A keyboard user can already update this component
    // via the inputs directly or via the handles. Exposing the track via
    // keyboard wouldn't bring any real value in this instance.
    //
    // So... we disable it.

    /*  eslint-disable lit-a11y/click-events-have-key-events */
    return html`
      <glide-core-private-label
        class=${classMap({
          left: this.privateSplit === 'left',
          middle: this.privateSplit === 'middle',
        })}
        label=${ifDefined(this.label)}
        orientation="vertical"
        split=${ifDefined(this.privateSplit ?? undefined)}
        tooltip=${ifDefined(this.tooltip)}
        ?disabled=${this.disabled}
        ?error=${this.#isShowValidationFeedback}
        ?hide=${this.hideLabel}
        ?required=${this.required}
      >
        <label>${this.label}</label>

        <div
          class=${classMap({
            'slider-container': true,
            disabled: this.disabled,
            readonly: this.readonly && !this.disabled,
            error: this.#isShowValidationFeedback,
          })}
          slot="control"
        >
          ${when(
            this.multiple,
            () =>
              html`<input
                  aria-describedby="meta"
                  aria-label=${this.#localize.term('setMinimum', this.label!)}
                  aria-invalid=${this.#isShowValidationFeedback}
                  class=${classMap({
                    input: true,
                    disabled: this.disabled,
                    error: this.#isShowValidationFeedback,
                    readonly: this.readonly && !this.disabled,
                  })}
                  data-test="minimum-input"
                  max=${ifDefined(
                    this.maximumValue
                      ? this.maximumValue - this.step
                      : undefined,
                  )}
                  min=${this.min}
                  step=${this.step}
                  type="number"
                  .value=${this.minimumValue?.toString() ?? ''}
                  ?disabled=${this.disabled}
                  ?readonly=${this.readonly}
                  @change=${this.#onMinimumInputChange.bind(this)}
                  @input=${this.#onMinimumInputInput}
                  @keydown=${this.#onInputKeydown}
                  ${ref(this.#minimumInputElementRef)}
                />

                <div class="slider-wrapper">
                  <div
                    class=${classMap({
                      'unfilled-track': true,
                      disabled: this.disabled,
                    })}
                    data-test="slider"
                    role="group"
                    @click=${this.#onTrackClick.bind(this)}
                    ${ref(this.#sliderElementRef)}
                  >
                    <div
                      class=${classMap({
                        'filled-track': true,
                        disabled: this.disabled,
                      })}
                      ${ref(this.#sliderFillElementRef)}
                    ></div>

                    <div
                      aria-disabled=${this.disabled}
                      aria-label=${this.#localize.term('minimum', this.label!)}
                      aria-readonly=${this.readonly}
                      aria-valuemin=${this.min}
                      aria-valuemax=${this.max}
                      aria-valuenow=${ifDefined(this.minimumValue)}
                      class=${classMap({
                        handle: true,
                        disabled: this.disabled,
                        readonly: this.readonly && !this.disabled,
                      })}
                      data-test="minimum-handle"
                      role="slider"
                      tabindex="0"
                      @mousedown=${this.#onMinimumHandleMousedown.bind(this)}
                      @keydown=${this.#onMinimumHandleKeydown.bind(this)}
                      ${ref(this.#minimumHandleElementRef)}
                    ></div>

                    <div
                      aria-disabled=${this.disabled}
                      aria-label=${this.#localize.term('maximum', this.label!)}
                      aria-readonly=${this.readonly}
                      aria-valuemin=${this.min}
                      aria-valuemax=${this.max}
                      aria-valuenow=${ifDefined(this.maximumValue)}
                      class=${classMap({
                        handle: true,
                        disabled: this.disabled,
                        readonly: this.readonly && !this.disabled,
                      })}
                      data-test="maximum-handle"
                      role="slider"
                      tabindex="0"
                      @mousedown=${this.#onMaximumHandleMousedown.bind(this)}
                      @keydown=${this.#onMaximumHandleKeydown.bind(this)}
                      ${ref(this.#maximumHandleElementRef)}
                    ></div>
                  </div>
                </div>

                <input
                  aria-label=${this.#localize.term('setMaximum', this.label!)}
                  aria-invalid=${this.#isShowValidationFeedback}
                  class=${classMap({
                    input: true,
                    disabled: this.disabled,
                    error: this.#isShowValidationFeedback,
                    readonly: this.readonly && !this.disabled,
                  })}
                  data-test="maximum-input"
                  max=${this.max}
                  min=${ifDefined(
                    this.minimumValue
                      ? this.minimumValue + this.step
                      : undefined,
                  )}
                  step=${this.step}
                  type="number"
                  .value=${this.maximumValue?.toString() ?? ''}
                  ?disabled=${this.disabled}
                  ?readonly=${this.readonly}
                  @change=${this.#onMaximumInputChange.bind(this)}
                  @input=${this.#onMaximumInputInput}
                  @keydown=${this.#onInputKeydown}
                  ${ref(this.#maximumInputElementRef)}
                />`,
            () =>
              html`<div class="slider-wrapper single">
                  <div
                    class=${classMap({
                      'unfilled-track': true,
                      disabled: this.disabled,
                    })}
                    data-test="slider"
                    role="group"
                    @click=${this.#onTrackClick.bind(this)}
                    ${ref(this.#sliderElementRef)}
                  >
                    <div
                      class=${classMap({
                        'filled-track': true,
                        disabled: this.disabled,
                      })}
                      ${ref(this.#sliderFillElementRef)}
                    ></div>

                    <div
                      aria-describedby="meta"
                      aria-disabled=${this.disabled}
                      aria-label=${ifDefined(this.label)}
                      aria-readonly=${this.readonly}
                      aria-valuemin=${this.min}
                      aria-valuemax=${this.max}
                      aria-valuenow=${ifDefined(this.minimumValue)}
                      class=${classMap({
                        handle: true,
                        disabled: this.disabled,
                        readonly: this.readonly && !this.disabled,
                      })}
                      data-test="single-handle"
                      role="slider"
                      tabindex="0"
                      @mousedown=${this.#onSingleHandleMousedown.bind(this)}
                      @keydown=${this.#onSingleHandleKeyDown.bind(this)}
                      ${ref(this.#singleHandleElementRef)}
                    ></div>
                  </div>
                </div>

                <input
                  aria-label=${ifDefined(this.label)}
                  aria-invalid=${this.#isShowValidationFeedback}
                  class=${classMap({
                    input: true,
                    disabled: this.disabled,
                    error: this.#isShowValidationFeedback,
                    readonly: this.readonly && !this.disabled,
                  })}
                  data-test="single-input"
                  max=${this.max}
                  min=${this.min}
                  step=${this.step}
                  type="number"
                  .value=${this.minimumValue?.toString() ?? ''}
                  ?disabled=${this.disabled}
                  ?readonly=${this.readonly}
                  @change=${this.#onSingleInputChange.bind(this)}
                  @input=${this.#onSingleInputInput.bind(this)}
                  @keydown=${this.#onInputKeydown}
                  ${ref(this.#singleInputElementRef)}
                />`,
          )}
        </div>

        <div class="meta" id="meta" slot="description">
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
    `;
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
        this.#inputElementRef.value,
      );
    } else {
      // A validation message is required but unused because we disable native validation feedback.
      // And an empty string isn't allowed. Thus a single space.
      this.#internals.setValidity(
        {
          customError: true,
          patternMismatch: this.#internals.validity.patternMismatch,
          valueMissing: this.#internals.validity.valueMissing,
        },
        ' ',
        this.#inputElementRef.value,
      );
    }
  }

  setValidity(flags?: ValidityStateFlags, message?: string): void {
    this.validityMessage = message;

    // A validation message is required but unused because we disable native validation feedback.
    // And an empty string isn't allowed. Thus a single space.
    this.#internals.setValidity(flags, ' ', this.#inputElementRef.value);
  }

  constructor() {
    super();
    this.#internals = this.attachInternals();

    // Event handlers on the host aren't great because consumers can remove them.
    // Unfortunately, the host is the only thing on which this event is dispatched
    // because it's the host that is form-associated.
    this.addEventListener('invalid', (event) => {
      event?.preventDefault(); // Canceled so a native validation message isn't shown.

      // We only want to focus the slider if the invalid event resulted from either:
      // 1. Form submission
      // 2. a call to reportValidity that did NOT result from the slider blur event
      if (this.isCheckingValidity || this.isBlurring) {
        return;
      }

      this.isReportValidityOrSubmit = true;

      const isFirstInvalidFormElement =
        this.form?.querySelector(':invalid') === this;

      if (isFirstInvalidFormElement) {
        this.focus();
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
  private maximumValue?: number;

  @state()
  private minimumValue?: number;

  @state()
  private validityMessage?: string;

  #draggingHandleElement?: HTMLElement;

  #initialValue: number[] = [];

  #inputElementRef = createRef<HTMLInputElement>();

  #internals: ElementInternals;

  #isCompletingDrag = false;

  #localize = new LocalizeController(this);

  #max = 100;

  #maximumHandleElementRef = createRef<HTMLDivElement>();

  #maximumInputElementRef = createRef<HTMLInputElement>();

  #min = 0;

  #minimumHandleElementRef = createRef<HTMLDivElement>();

  #minimumInputElementRef = createRef<HTMLInputElement>();

  #multiple = false;

  #singleHandleElementRef = createRef<HTMLDivElement>();

  #singleInputElementRef = createRef<HTMLInputElement>();

  #sliderElementRef = createRef<HTMLDivElement>();

  #sliderFillElementRef = createRef<HTMLDivElement>();

  get #isShowValidationFeedback() {
    return (
      !this.disabled && !this.validity?.valid && this.isReportValidityOrSubmit
    );
  }

  // An arrow function field instead of a method so `this` is closed over and set
  // to the component instead of `document`.
  #onDraggingMousemove = (mouseEvent: MouseEvent) => {
    mouseEvent.preventDefault();

    const slider = this.#sliderElementRef.value;

    if (slider && this.#draggingHandleElement) {
      const { clientX } = mouseEvent;

      if (clientX !== undefined) {
        const sliderRect = slider.getBoundingClientRect();
        this.#onDrag(clientX, this.#draggingHandleElement, sliderRect);
      }
    }
  };

  // An arrow function field instead of a method so `this` is closed over and set
  // to the component instead of `document`.
  #onDraggingMouseup = () => {
    if (this.#draggingHandleElement) {
      document.removeEventListener('mousemove', this.#onDraggingMousemove);
      document.removeEventListener('mouseup', this.#onDraggingMouseup);

      this.dispatchEvent(
        new Event('change', { bubbles: true, composed: true }),
      );

      this.#isCompletingDrag = true;

      this.#draggingHandleElement = undefined;

      // Dragging involves interacting with the handles on a track.
      // Track clicks can inadvertently occur when letting go of
      // a handle. To help combat that, we use this variable to
      // keep track of when we are still processing a drag event.
      //
      // Resetting the state in the next frame allows the drag
      // to fully complete before accept tracking click events
      // again.
      setTimeout(() => {
        this.#isCompletingDrag = false;
      });
    }
  };

  #onDrag(clientX: number, handle: HTMLElement, sliderRect: DOMRect) {
    const position = (clientX - sliderRect.left) / sliderRect.width;
    const clampedPosition = position * (this.max - this.min) + this.min;
    const valueUsingStep = Math.round(clampedPosition / this.step) * this.step;

    // Track if any value actually changed to match native
    let hasValueChanged = false;

    if (this.multiple) {
      const isMinimumHandle = handle === this.#minimumHandleElementRef.value;

      if (isMinimumHandle && this.maximumValue) {
        const newValue = Math.min(
          Math.max(valueUsingStep, this.min),
          this.maximumValue - this.step,
        );

        if (newValue !== this.minimumValue) {
          this.minimumValue = newValue;
          hasValueChanged = true;
        }
      } else if (this.minimumValue !== undefined) {
        const newValue = Math.min(
          Math.max(valueUsingStep, this.minimumValue + this.step),
          this.max,
        );

        if (newValue !== this.maximumValue) {
          this.maximumValue = newValue;
          hasValueChanged = true;
        }
      }

      this.#updateHandlesAndTrack();

      if (hasValueChanged) {
        this.dispatchEvent(
          new Event('input', { bubbles: true, composed: true }),
        );
      }

      return;
    }

    const newValue = Math.min(Math.max(valueUsingStep, this.min), this.max);

    if (newValue !== this.minimumValue) {
      this.minimumValue = newValue;
      hasValueChanged = true;
    }

    this.#updateHandlesAndTrack();

    if (hasValueChanged) {
      this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    }
  }

  #onFormdata(event: FormDataEvent) {
    if (this.name && this.value && !this.disabled) {
      event.formData.append(this.name, JSON.stringify(this.value));
    }
  }

  #onInputKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.form?.requestSubmit();
    }
  }

  #onMaximumHandleKeydown(event: KeyboardEvent) {
    this.#onMultipleHandleKeydown(event, this.#maximumHandleElementRef.value!);
  }

  #onMaximumHandleMousedown(event: MouseEvent) {
    this.#startDragging(event, this.#maximumHandleElementRef.value!);
  }

  #onMaximumInputChange() {
    if (this.#maximumInputElementRef.value && this.minimumValue !== undefined) {
      const maximumInput = this.#maximumInputElementRef.value;

      let valueUsingStep = Number(maximumInput.value);
      valueUsingStep = Math.round(valueUsingStep / this.step) * this.step;

      this.maximumValue = Math.min(
        Math.max(valueUsingStep, this.minimumValue + this.step),
        this.max,
      );

      maximumInput.value = this.maximumValue.toString(); // Update if clamped

      this.#updateHandlesAndTrack();

      // Unlike "input" events, "change" events aren't composed. So we have to
      // manually dispatch them.
      this.dispatchEvent(
        new Event('change', { bubbles: true, composed: true }),
      );
    }
  }

  #onMaximumInputInput() {
    if (this.#maximumInputElementRef.value) {
      const inputValue = Number(this.#maximumInputElementRef.value.value);

      if (this.minimumValue !== undefined && inputValue >= this.minimumValue) {
        this.maximumValue = Math.min(inputValue, this.max);
        this.#updateHandlesAndTrack();
      }
    }
  }

  #onMinimumHandleKeydown(event: KeyboardEvent) {
    this.#onMultipleHandleKeydown(event, this.#minimumHandleElementRef.value!);
  }

  #onMinimumHandleMousedown(event: MouseEvent) {
    this.#startDragging(event, this.#minimumHandleElementRef.value!);
  }

  #onMinimumInputChange() {
    if (this.#minimumInputElementRef.value && this.maximumValue !== undefined) {
      const minimumInput = this.#minimumInputElementRef.value;

      let valueUsingStep = Number(minimumInput.value);
      valueUsingStep = Math.round(valueUsingStep / this.step) * this.step;

      this.minimumValue = Math.min(
        Math.max(valueUsingStep, this.min),
        this.maximumValue - this.step,
      );

      minimumInput.value = this.minimumValue.toString(); // Update if clamped

      this.#updateHandlesAndTrack();

      // Unlike "input" events, "change" events aren't composed. So we have to
      // manually dispatch them.
      this.dispatchEvent(
        new Event('change', { bubbles: true, composed: true }),
      );
    }
  }

  #onMinimumInputInput() {
    if (this.#minimumInputElementRef.value) {
      const inputValue = Number(this.#minimumInputElementRef.value.value);

      if (this.maximumValue !== undefined && inputValue <= this.maximumValue) {
        this.minimumValue = Math.max(inputValue, this.min);
        this.#updateHandlesAndTrack();
      }
    }
  }

  #onMultipleHandleKeydown(event: KeyboardEvent, handle: HTMLElement) {
    if (this.disabled || this.readonly) {
      return;
    }

    if (this.minimumValue !== undefined && this.maximumValue !== undefined) {
      const isMinimumHandle = handle === this.#minimumHandleElementRef.value;

      let newValue = isMinimumHandle ? this.minimumValue : this.maximumValue;

      switch (event.key) {
        case 'ArrowLeft':
        case 'ArrowDown': {
          newValue = newValue - this.step;
          break;
        }
        case 'ArrowRight':
        case 'ArrowUp': {
          newValue = newValue + this.step;
          break;
        }
        case 'PageDown': {
          newValue = newValue - this.step * 10;
          break;
        }
        case 'PageUp': {
          newValue = newValue + this.step * 10;
          break;
        }
        case 'Home': {
          newValue = isMinimumHandle ? this.min : this.minimumValue + this.step;
          break;
        }
        case 'End': {
          newValue = isMinimumHandle ? this.maximumValue - this.step : this.max;
          break;
        }
        case 'Enter': {
          this.form?.requestSubmit();
          return;
        }

        default: {
          return;
        }
      }

      event.preventDefault();

      if (isMinimumHandle) {
        this.minimumValue = Math.min(
          Math.max(newValue, this.min),
          this.maximumValue - this.step,
        );
      } else {
        this.maximumValue = Math.min(
          Math.max(newValue, this.minimumValue + this.step),
          this.max,
        );
      }

      this.#updateHandlesAndTrack();

      this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));

      this.dispatchEvent(
        new Event('change', { bubbles: true, composed: true }),
      );
    }
  }

  #onSingleHandleKeyDown(event: KeyboardEvent) {
    if (this.disabled || this.readonly) {
      return;
    }

    const handle = this.#singleHandleElementRef.value;

    if (handle && this.minimumValue !== undefined) {
      let newValue = this.minimumValue;

      switch (event.key) {
        case 'ArrowLeft':
        case 'ArrowDown': {
          newValue -= this.step;
          break;
        }
        case 'ArrowRight':
        case 'ArrowUp': {
          newValue += this.step;
          break;
        }
        case 'PageDown': {
          newValue -= this.step * 10;
          break;
        }
        case 'PageUp': {
          newValue += this.step * 10;
          break;
        }
        case 'Home': {
          newValue = this.min;
          break;
        }
        case 'End': {
          newValue = this.max;
          break;
        }
        case 'Enter': {
          this.form?.requestSubmit();
          return;
        }

        default: {
          return;
        }
      }

      event.preventDefault();

      this.minimumValue = Math.min(Math.max(newValue, this.min), this.max);

      this.#updateHandlesAndTrack();

      this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));

      this.dispatchEvent(
        new Event('change', { bubbles: true, composed: true }),
      );
    }
  }

  #onSingleHandleMousedown(event: MouseEvent) {
    this.#startDragging(event, this.#singleHandleElementRef.value!);
  }

  #onSingleInputChange() {
    const input = this.#singleInputElementRef.value;
    const handle = this.#singleHandleElementRef.value;

    if (input && handle) {
      let newValue = Number(input.value);
      newValue = Math.round(newValue / this.step) * this.step;

      this.minimumValue = Math.min(Math.max(newValue, this.min), this.max);
      input.value = this.minimumValue.toString();

      this.#updateHandlesAndTrack();

      this.dispatchEvent(
        new Event('change', { bubbles: true, composed: true }),
      );
    }
  }

  #onSingleInputInput() {
    if (this.#singleInputElementRef.value) {
      const inputValue = Number(this.#singleInputElementRef.value.value);

      if (inputValue >= 0) {
        this.minimumValue = Math.min(inputValue, this.max);
        this.#updateHandlesAndTrack();
      }
    }
  }

  #onTrackClick(event: MouseEvent) {
    if (this.disabled || this.readonly) {
      return;
    }

    if (
      event.target === this.#minimumHandleElementRef.value ||
      event.target === this.#maximumHandleElementRef.value ||
      event.target === this.#singleHandleElementRef.value ||
      this.#isCompletingDrag
    ) {
      return;
    }

    const slider = this.#sliderElementRef.value;

    if (slider) {
      const sliderRect = slider.getBoundingClientRect();

      const clickPosition =
        (event.clientX - sliderRect.left) / sliderRect.width;

      const clampedPosition = clickPosition * (this.max - this.min) + this.min;

      const clickValue = Math.round(clampedPosition / this.step) * this.step;

      if (
        this.multiple &&
        this.minimumValue !== undefined &&
        this.maximumValue !== undefined
      ) {
        // Calculate distance to each handle to determine which one to move
        const minimumDistance = Math.abs(clickValue - this.minimumValue);
        const maximumDistance = Math.abs(clickValue - this.maximumValue);

        // Move the closest handle
        if (minimumDistance <= maximumDistance) {
          this.minimumValue = Math.min(
            Math.max(clickValue, this.min),
            this.maximumValue - this.step,
          );
        } else {
          this.maximumValue = Math.min(
            Math.max(clickValue, this.minimumValue + this.step),
            this.max,
          );
        }
      } else {
        this.minimumValue = Math.min(Math.max(clickValue, this.min), this.max);
      }

      this.#updateHandlesAndTrack();

      // Native fires both events in this case
      this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));

      this.dispatchEvent(
        new Event('change', { bubbles: true, composed: true }),
      );
    }
  }

  #startDragging(event: MouseEvent, handle: HTMLElement) {
    if (this.disabled || this.readonly) {
      return;
    }

    event.preventDefault();

    const slider = this.#sliderElementRef.value;

    if (slider) {
      this.#draggingHandleElement = handle;

      // We want document-level event listeners so that the user can
      // drag and release the handle outside of the component and it
      // update properly. Not all users will drag the handles though,
      // so rather than adding event listeners in connectedCallback
      // and having them fire any time a user moves their mouse, even
      // if they aren't interacting directly with the Slider, we add
      // these event listeners only when the user initiates dragging.
      document.addEventListener('mousemove', this.#onDraggingMousemove);
      document.addEventListener('mouseup', this.#onDraggingMouseup);

      this.#onDrag(event.clientX, handle, slider.getBoundingClientRect());
    }
  }

  #updateHandlesAndTrack() {
    const sliderFill = this.#sliderFillElementRef.value;
    const singleHandle = this.#singleHandleElementRef.value;
    const minimumHandle = this.#minimumHandleElementRef.value;
    const maximumHandle = this.#maximumHandleElementRef.value;

    if (sliderFill && this.minimumValue !== undefined) {
      if (!this.multiple && singleHandle) {
        const range = this.max - this.min;

        const calculatedPosition =
          ((this.minimumValue - this.min) / range) * 100;

        singleHandle.style.left = `${calculatedPosition}%`;
        sliderFill.style.left = '0';
        sliderFill.style.width = `${calculatedPosition}%`;
        return;
      }

      if (this.maximumValue !== undefined && minimumHandle && maximumHandle) {
        const range = this.max - this.min;
        const minimumPosition = ((this.minimumValue - this.min) / range) * 100;
        const maximumPosition = ((this.maximumValue - this.min) / range) * 100;

        minimumHandle.style.left = `${minimumPosition}%`;
        maximumHandle.style.left = `${maximumPosition}%`;
        sliderFill.style.left = `${minimumPosition}%`;
        sliderFill.style.width = `${maximumPosition - minimumPosition}%`;
      }
    }
  }
}
