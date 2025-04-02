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

// TONY TODO:
// - Styles
// - Get design review
// - Rebase, and then remove `GlideCore` prefix from everything
//   - https://github.com/CrowdStrike/glide-core/pull/891
// - ArrowDown on min-input when step="10" makes min-input 20
//   ArrowDown on min-thumb when step="10" makes min-input 15
//   Why? I think due to native input behavior, but need
//   to verify. Or could be a bug I introduced.
// - Clean up code.
//   - Make it easier to understand
//   - drag handler code is rough, how do we make it better? If no way, document.
// - Updating `max` to 125 breaks everything...
//   - Seems to only happen in storybook, not when $0.max = 125;
// - When switching `multiple` to true, if
//   the minimum value is greater than the maximum,
//   it gets in a bugged state.
// - aria tests
// - visual tests

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-slider': GlideCoreSlider;
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
export default class GlideCoreSlider extends LitElement implements FormControl {
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
    if (Array.isArray(value)) {
      if (
        this.multiple &&
        value.length === 2 &&
        value[0] !== undefined &&
        value[1] !== undefined
      ) {
        const minValue = Math.round(value[0] / this.step) * this.step;
        const maxValue = Math.round(value[1] / this.step) * this.step;

        this.minimumValue = Math.max(minValue, this.min);
        this.maximumValue = Math.min(maxValue, this.max);

        this.#updateSliderPositions();
        return;
      }

      if (!this.multiple && value.length > 0 && value[0] !== undefined) {
        const normalizedValue = Math.round(value[0] / this.step) * this.step;

        this.minimumValue = Math.max(
          Math.min(normalizedValue, this.max),
          this.min,
        );

        // Clear maximumValue to ensure consistency in single thumb mode
        this.maximumValue = undefined;

        this.#updateSliderPositions();
        return;
      }
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

    // TONY TODO: Better explain what this covers...
    //
    // Help the user out by clamping the minimum value if it is now
    // greater than the `max` to prevent the UI from being in a position
    // where a user can't interact with the thumbs.
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

    this.#updateSliderPositions();
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
      // TONY TODO: Better explain what this covers...
      //
      // Help the user out by clamping the maximum value if it is now
      // less than the `min` to prevent the sliders from being in a
      // position where a user can't easily interact with the thumbs.
      //
      // We'll leverage the minimumValue and `step` for our maximumValue
      // in this case.
      if (this.maximumValue !== undefined && this.maximumValue < min) {
        this.maximumValue = Math.max(min, this.minimumValue + this.step);
      }
    } else {
      // TONY TODO: Better explain what this covers...
      //
      // In single mode, it's safer to always reset the
      // maximumValue to undefined when `min` changes
      // to prevent getting into states where the maximumValue
      // persists.
      this.maximumValue = undefined;
    }

    this.#updateSliderPositions();
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
        this.#updateSliderPositions();
      });
    } else if (!oldValue && multiple && this.minimumValue !== undefined) {
      // Use the same 25%/75% calculation as in firstUpdated
      const rangeSize = this.max - this.min;

      // We'll keep the current minimumValue and just set the maximumValue at 75%
      this.maximumValue = this.min + Math.ceil(rangeSize * 0.75);

      this.requestUpdate();

      this.updateComplete.then(() => {
        this.#updateSliderPositions();
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

    document.removeEventListener('mousemove', this.#boundOnMove);
    document.removeEventListener('mouseup', this.#boundStopDragging);
  }

  override firstUpdated() {
    if (
      Array.isArray(this.value) &&
      !this.multiple &&
      this.value.length === 1
    ) {
      this.minimumValue = this.value.at(0);

      this.#initialValue = this.value;

      this.#updateSliderPositions();
      return;
    }

    if (Array.isArray(this.value) && this.multiple && this.value.length === 2) {
      this.minimumValue = this.value.at(0);
      this.maximumValue = this.value.at(1);

      // Have to add this check to satisfy TypeScript
      if (this.minimumValue !== undefined && this.maximumValue !== undefined) {
        this.#initialValue = [this.minimumValue, this.maximumValue];
      }

      this.#updateSliderPositions();
      return;
    }

    if (!this.value || (Array.isArray(this.value) && this.value.length === 0)) {
      const rangeSize = this.max - this.min;

      // TONY TODO: Explain why we do this.
      //            tl;dr: design requirement to do a 25%/75% default
      //            value if one is not provided.

      // TONY TODO: Running these setters is leading to an error:
      // "slider.ts?t=1744653169009:36 Element glide-core-slider scheduled an update (generally because a property was set) after an update completed, causing a new update to be scheduled. This is inefficient and should be avoided unless the next update can only be scheduled as a side effect of the previous update."
      //
      // Move to constructor? Constructor move makes the error go away.
      // This is because we are setting state (@state) in `firstUpdated`.
      this.minimumValue = this.min + Math.floor(rangeSize * 0.25);

      this.maximumValue = this.multiple
        ? this.min + Math.ceil(rangeSize * 0.75)
        : undefined;

      this.#initialValue =
        this.multiple && this.maximumValue !== undefined
          ? [this.minimumValue, this.maximumValue]
          : [this.minimumValue];

      this.#updateSliderPositions();
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
    // a thumb move to that position. This is a situation where the
    // linter is being overzealous without considering the full context
    // of the component.
    //
    // This behavior is an ehancement rather than essential functionality.
    //
    // A keyboard user can already update this component
    // via the inputs directly or via the thumbs. Exposing the track via
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
        <label id="slider-group-label">${this.label}</label>

        <div
          aria-labelledby="slider-group-label"
          class=${classMap({
            'slider-container': true,
            disabled: this.disabled,
            readonly: this.readonly && !this.disabled,
            error: this.#isShowValidationFeedback,
          })}
          slot="control"
        >
          <div class="range-slider-container">
            ${when(
              this.multiple,
              () =>
                html` <div class="value-container left-input">
                    <input
                      aria-label=${this.#localize.term(
                        'setMinimum',
                        this.label!,
                      )}
                      aria-invalid=${this.#isShowValidationFeedback}
                      class="value-input"
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
                  </div>

                  <div class="slider-wrapper">
                    <div
                      aria-labelledby="slider-label"
                      class="slider"
                      data-test="slider"
                      role="group"
                      @click=${this.#onTrackClick.bind(this)}
                      ${ref(this.#sliderElementRef)}
                    >
                      <!-- TONY TODO: Use visuallyhidden mixin instead -->
                      <!-- TONY TODO: Can we use 'label' tag above instead? -->
                      <div class="sr-only" id="slider-label">${this.label}</div>

                      <div
                        class="slider-fill"
                        id="slider-fill"
                        ${ref(this.#sliderFillElementRef)}
                      ></div>

                      <div
                        aria-disabled=${this.disabled}
                        aria-label=${this.#localize.term(
                          'minimum',
                          this.label!,
                        )}
                        aria-readonly=${this.readonly}
                        aria-valuemin=${this.min}
                        aria-valuemax=${this.max}
                        aria-valuenow=${ifDefined(this.minimumValue)}
                        class="thumb"
                        data-test="minimum-thumb"
                        role="slider"
                        tabindex="0"
                        @mousedown=${this.#onMinimumThumbMouseDown.bind(this)}
                        @keydown=${this.#onMinimumThumbKeyDown.bind(this)}
                        ${ref(this.#minimumThumbElementRef)}
                      ></div>

                      <div
                        aria-disabled=${this.disabled}
                        aria-label=${this.#localize.term(
                          'maximum',
                          this.label!,
                        )}
                        aria-readonly=${this.readonly}
                        aria-valuemin=${this.min}
                        aria-valuemax=${this.max}
                        aria-valuenow=${ifDefined(this.maximumValue)}
                        class="thumb"
                        data-test="maximum-thumb"
                        role="slider"
                        tabindex="0"
                        @mousedown=${this.#onMaximumThumbMouseDown.bind(this)}
                        @keydown=${this.#onMaximumThumbKeyDown.bind(this)}
                        ${ref(this.#maximumThumbElementRef)}
                      ></div>
                    </div>
                  </div>

                  <div class="value-container right-input">
                    <input
                      aria-label=${this.#localize.term(
                        'setMaximum',
                        this.label!,
                      )}
                      aria-invalid=${this.#isShowValidationFeedback}
                      class="value-input"
                      data-test="maximum-input"
                      id="max-input"
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
                    />
                  </div>`,
              () =>
                html` <div class="slider-wrapper single-slider">
                    <div
                      aria-labelledby="slider-label"
                      class="slider"
                      data-test="slider"
                      role="group"
                      @click=${this.#onTrackClick.bind(this)}
                      ${ref(this.#sliderElementRef)}
                    >
                      <div class="sr-only" id="slider-label">${this.label}</div>

                      <div
                        class="slider-fill single"
                        id="slider-fill"
                        ${ref(this.#sliderFillElementRef)}
                      ></div>

                      <!-- TONY TODO: May need this.value on aria-label -->
                      <div
                        aria-disabled=${this.disabled}
                        aria-label=${ifDefined(this.label)}
                        aria-readonly=${this.readonly}
                        aria-valuemin=${this.min}
                        aria-valuemax=${this.max}
                        aria-valuenow=${ifDefined(this.minimumValue)}
                        class="thumb single"
                        data-test="single-thumb"
                        role="slider"
                        tabindex="0"
                        @mousedown=${this.#singleThumbMouseDownHandler.bind(
                          this,
                        )}
                        @keydown=${this.#singleThumbKeyDownHandler.bind(this)}
                        ${ref(this.#singleThumbElementRef)}
                      ></div>
                    </div>
                  </div>

                  <div class="value-container right-input">
                    <!-- TONY TODO: Review aria-label -->
                    <input
                      aria-label=${ifDefined(this.label)}
                      aria-invalid=${this.#isShowValidationFeedback}
                      class="value-input"
                      data-test="single-input"
                      id="single-input"
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
                    />
                  </div>`,
            )}
          </div>
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

    this.#boundOnMove = this.#handleMove.bind(this);
    this.#boundStopDragging = this.#stopDragging.bind(this);
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

  #boundOnMove: (event: MouseEvent) => void;

  #boundStopDragging: () => void;

  #draggingThumb?: HTMLElement;

  #initialValue: number[] = [];

  #inputElementRef = createRef<HTMLInputElement>();

  #internals: ElementInternals;

  #isCompletingDrag = false;

  #localize = new LocalizeController(this);

  #max = 100;

  #maximumInputElementRef = createRef<HTMLInputElement>();

  #maximumThumbElementRef = createRef<HTMLDivElement>();

  #min = 0;

  #minimumInputElementRef = createRef<HTMLInputElement>();

  #minimumThumbElementRef = createRef<HTMLDivElement>();

  #multiple = false;

  #singleInputElementRef = createRef<HTMLInputElement>();

  #singleThumbElementRef = createRef<HTMLDivElement>();

  #sliderElementRef = createRef<HTMLDivElement>();

  #sliderFillElementRef = createRef<HTMLDivElement>();

  get #isShowValidationFeedback() {
    return (
      !this.disabled && !this.validity?.valid && this.isReportValidityOrSubmit
    );
  }

  #handleMove(moveEvent: MouseEvent) {
    moveEvent.preventDefault();

    const slider = this.#sliderElementRef.value;

    if (slider && this.#draggingThumb) {
      const { clientX } = moveEvent;

      if (clientX !== undefined) {
        const sliderRect = slider.getBoundingClientRect();
        this.#onDrag(clientX, this.#draggingThumb, sliderRect);

        // TONY TODO: Actually needed?
        this.requestUpdate();
      }
    }
  }

  #onDrag(clientX: number, thumb: HTMLElement, sliderRect: DOMRect) {
    const position = (clientX - sliderRect.left) / sliderRect.width;
    const clampedPosition = position * (this.max - this.min) + this.min;
    const valueUsingStep = Math.round(clampedPosition / this.step) * this.step;

    // Track if any value actually changed to match native
    let hasValueChanged = false;

    if (this.multiple) {
      const isMinimumThumb = thumb === this.#minimumThumbElementRef.value;

      if (isMinimumThumb && this.maximumValue) {
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
    } else {
      const newValue = Math.min(Math.max(valueUsingStep, this.min), this.max);

      if (newValue !== this.minimumValue) {
        this.minimumValue = newValue;
        hasValueChanged = true;
      }
    }

    this.#updateSliderPositions();

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

  #onKeyDown(event: KeyboardEvent, thumb: HTMLElement) {
    if (this.disabled || this.readonly) {
      return;
    }

    if (this.minimumValue !== undefined && this.maximumValue !== undefined) {
      const isMinimumThumb = thumb === this.#minimumThumbElementRef.value;

      let newValue = isMinimumThumb ? this.minimumValue : this.maximumValue;

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
          newValue = isMinimumThumb ? this.min : this.minimumValue + this.step;
          break;
        }
        case 'End': {
          newValue = isMinimumThumb ? this.maximumValue - this.step : this.max;
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

      if (isMinimumThumb) {
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

      this.#updateSliderPositions();

      this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));

      this.dispatchEvent(
        new Event('change', { bubbles: true, composed: true }),
      );
    }
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

      this.#updateSliderPositions();

      // Unlike "input" events, "change" events aren't composed. So we have to
      // manually dispatch them.
      this.dispatchEvent(
        new Event('change', { bubbles: true, composed: true }),
      );
    }
  }

  #onMaximumInputInput() {
    if (
      this.#maximumInputElementRef.value &&
      Number.isFinite(Number(this.#maximumInputElementRef.value.value))
    ) {
      this.maximumValue = Number(this.#maximumInputElementRef.value.value);

      if (
        this.minimumValue !== undefined &&
        this.maximumValue >= this.minimumValue
      ) {
        this.#updateSliderPositions();
      }
    }
  }

  #onMaximumThumbKeyDown(event: KeyboardEvent) {
    this.#onKeyDown(event, this.#maximumThumbElementRef.value!);
  }

  #onMaximumThumbMouseDown(event: MouseEvent) {
    this.#startDragging(event, this.#maximumThumbElementRef.value!);
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

      this.#updateSliderPositions();

      // Unlike "input" events, "change" events aren't composed. So we have to
      // manually dispatch them.
      this.dispatchEvent(
        new Event('change', { bubbles: true, composed: true }),
      );
    }
  }

  #onMinimumInputInput() {
    if (
      this.#minimumInputElementRef.value &&
      Number.isFinite(Number(this.#minimumInputElementRef.value.value))
    ) {
      this.minimumValue = Number(this.#minimumInputElementRef.value.value);

      if (
        this.maximumValue !== undefined &&
        this.minimumValue <= this.maximumValue
      ) {
        this.#updateSliderPositions();
      }
    }
  }

  #onMinimumThumbKeyDown(event: KeyboardEvent) {
    this.#onKeyDown(event, this.#minimumThumbElementRef.value!);
  }

  #onMinimumThumbMouseDown(event: MouseEvent) {
    this.#startDragging(event, this.#minimumThumbElementRef.value!);
  }

  #onSingleInputChange() {
    const input = this.#singleInputElementRef.value;
    const thumb = this.#singleThumbElementRef.value;

    if (input && thumb) {
      let newValue = Number(input.value);
      newValue = Math.round(newValue / this.step) * this.step;

      this.minimumValue = Math.min(Math.max(newValue, this.min), this.max);
      input.value = this.minimumValue.toString();

      this.#updateSliderPositions();

      this.dispatchEvent(
        new Event('change', { bubbles: true, composed: true }),
      );
    }
  }

  #onSingleInputInput() {
    if (this.#singleInputElementRef.value) {
      const inputValue = this.#singleInputElementRef.value.value;

      if (inputValue !== '' && Number.isFinite(Number(inputValue))) {
        this.minimumValue = Number(inputValue);
        this.#updateSliderPositions();
      }
    }
  }

  #onTrackClick(event: MouseEvent) {
    if (this.disabled || this.readonly) {
      return;
    }

    if (
      event.target === this.#minimumThumbElementRef.value ||
      event.target === this.#maximumThumbElementRef.value ||
      event.target === this.#singleThumbElementRef.value ||
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
        // Calculate distance to each thumb to determine which one to move
        const minimumDistance = Math.abs(clickValue - this.minimumValue);
        const maximumDistance = Math.abs(clickValue - this.maximumValue);

        // Move the closest thumb
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

      this.#updateSliderPositions();

      // Native fires both events in this case
      this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));

      this.dispatchEvent(
        new Event('change', { bubbles: true, composed: true }),
      );
    }
  }

  #singleThumbKeyDownHandler(event: KeyboardEvent) {
    if (this.disabled || this.readonly) {
      return;
    }

    const thumb = this.#singleThumbElementRef.value;
    const input = this.#singleInputElementRef.value;

    if (thumb && input && this.minimumValue !== undefined) {
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

      input.value = this.minimumValue.toString();

      this.#updateSliderPositions();

      this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));

      this.dispatchEvent(
        new Event('change', { bubbles: true, composed: true }),
      );
    }
  }

  #singleThumbMouseDownHandler(event: MouseEvent) {
    this.#startDragging(event, this.#singleThumbElementRef.value!);
  }

  #startDragging(event: MouseEvent, thumb: HTMLElement) {
    if (this.disabled || this.readonly) {
      return;
    }

    // TONY TODO: I think I can remove this `preventDefault()`
    event.preventDefault();

    const slider = this.#sliderElementRef.value;

    if (slider) {
      this.#draggingThumb = thumb;

      document.addEventListener('mousemove', this.#boundOnMove);
      document.addEventListener('mouseup', this.#boundStopDragging);

      this.#onDrag(event.clientX, thumb, slider.getBoundingClientRect());
    }
  }

  #stopDragging() {
    if (this.#draggingThumb) {
      document.removeEventListener('mousemove', this.#boundOnMove);
      document.removeEventListener('mouseup', this.#boundStopDragging);

      this.dispatchEvent(
        new Event('change', { bubbles: true, composed: true }),
      );

      this.#isCompletingDrag = true;

      this.#draggingThumb = undefined;

      // Dragging involves interacting with the thumbs on a track.
      // Track clicks can inadvertently occur when letting go of
      // a thumb. To help combat that, we use this variable to
      // keep track of when we are still processing a drag event.
      //
      // Resetting the state in the next frame allows the drag
      // to fully complete before accept tracking click events
      // again.
      setTimeout(() => {
        this.#isCompletingDrag = false;
      });
    }
  }

  #updateSliderPositions() {
    const sliderFill = this.#sliderFillElementRef.value;
    const singleThumb = this.#singleThumbElementRef.value;
    const minimumThumb = this.#minimumThumbElementRef.value;
    const maximumThumb = this.#maximumThumbElementRef.value;

    if (sliderFill && this.minimumValue !== undefined) {
      if (!this.multiple && singleThumb) {
        const range = this.max - this.min;
        const position = ((this.minimumValue - this.min) / range) * 100;

        singleThumb.style.left = `${position}%`;
        sliderFill.style.left = '0';
        sliderFill.style.width = `${position}%`;
        return;
      }

      if (this.maximumValue !== undefined && minimumThumb && maximumThumb) {
        const range = this.max - this.min;
        const minimumPosition = ((this.minimumValue - this.min) / range) * 100;
        const maximumPosition = ((this.maximumValue - this.min) / range) * 100;

        minimumThumb.style.left = `${minimumPosition}%`;
        maximumThumb.style.left = `${maximumPosition}%`;
        sliderFill.style.left = `${minimumPosition}%`;
        sliderFill.style.width = `${maximumPosition - minimumPosition}%`;
      }
    }
  }
}
