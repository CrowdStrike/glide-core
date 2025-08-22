import './label.js';
import './tooltip.js';
import { html, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { styleMap } from 'lit/directives/style-map.js';
import { when } from 'lit/directives/when.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import styles from './checkbox.styles.js';
import packageJson from '@/package.json' with { type: 'json' };
import checkedIcon from '@/src/icons/checked.js';
import type FormControl from '@/src/library/form-control.js';
import final from '@/src/library/final.js';
import required from '@/src/library/required.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-checkbox': Checkbox;
  }
}

/**
 * @attr {string} label
 * @attr {boolean} [checked=false]
 * @attr {boolean} [disabled=false]
 * @attr {boolean} [hide-label=false]
 * @attr {boolean} [indeterminate=false]
 * @attr {string} [name='']
 * @attr {'horizontal'|'vertical'} [orientation='horizontal']
 * @attr {boolean} [required=false]
 * @attr {string} [summary]
 * @attr {string} [tooltip]
 * @attr {string} [value='']
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {Element | string} [description] - Additional information or context
 * @slot {Element} [private-icon]
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
@customElement('glide-core-checkbox')
@final
export default class Checkbox extends LitElement implements FormControl {
  static formAssociated = true;

  /* c8 ignore start */
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: window.navigator.webdriver ? 'open' : 'closed',
  };
  /* c8 ignore end */

  static override styles = styles;

  /**
   * @default undefined
   */
  @property({ reflect: true })
  @required
  get label(): string | undefined {
    return this.#label;
  }

  set label(label) {
    this.#label = label;

    // Wait for the label to render. A rerender won't be scheduled by Lit
    // until after this setter finishes. So awaiting `this.updateComplete`
    // won't fly.
    setTimeout(() => {
      this.#updateLabelOverflow();
    });
  }

  /**
    @default false
  */
  @property({ type: Boolean })
  get checked(): boolean {
    return this.#isChecked;
  }

  set checked(isChecked: boolean) {
    const hasChanged = isChecked !== this.#isChecked;
    this.#isChecked = isChecked;

    if (hasChanged) {
      this.dispatchEvent(
        new Event('private-checked-change', { bubbles: true }),
      );
    }
  }

  @property({ attribute: 'private-internally-inert', type: Boolean })
  privateInternallyInert = false;

  /**
   * @default false
   */
  @property({ reflect: true, type: Boolean })
  get disabled(): boolean {
    return this.#isDisabled;
  }

  set disabled(isDisabled: boolean) {
    this.#isDisabled = isDisabled;
    this.dispatchEvent(new Event('private-disabled-change', { bubbles: true }));
  }

  @property({ attribute: 'hide-label', type: Boolean })
  hideLabel = false;

  @property({ type: Boolean })
  indeterminate = false;

  @property({ reflect: true, useDefault: true })
  orientation: 'horizontal' | 'vertical' = 'horizontal';

  @property({ reflect: true, useDefault: true })
  name = '';

  // Private because it's only meant to be used by Dropdown Option to offset the
  // tooltip by the option's padding.
  @property({
    attribute: 'private-label-tooltip-offset',
    reflect: true,
    useDefault: true,
    type: Number,
  })
  privateLabelTooltipOffset = 4;

  // Private because it's only meant to be used by Dropdown Option.
  @property({
    attribute: 'private-show-label-tooltip',
    reflect: true,
    type: Boolean,
  })
  privateShowLabelTooltip = false;

  // Private because it's only meant to be used by Dropdown Option.
  @property({
    attribute: 'private-disable-label-tooltip',
    reflect: true,
    type: Boolean,
  })
  privateDisableLabelTooltip = false;

  // Private because it's only meant to be used by Form Controls Layout.
  @property()
  privateSplit?: 'left' | 'middle' | 'right';

  // Private because it's only meant to be used by Checkbox Group and Dropdown
  // Option.
  @property({ attribute: 'private-variant' })
  privateVariant?: 'minimal';

  @property({ reflect: true, type: Boolean })
  required = false;

  @property({ reflect: true })
  summary?: string;

  @property({ reflect: true })
  tooltip?: string;

  /**
   * @default ''
   */
  @property({ reflect: true })
  get value(): string {
    return this.#value;
  }

  set value(value: string) {
    const old = this.#value;
    this.#value = value;

    // `this.value` can be set programmatically. Checkbox Group needs to know when
    // that happens so it can update its own `this.value`.
    this.dispatchEvent(
      new CustomEvent('private-value-change', {
        bubbles: true,
        detail: {
          // Without knowing what the old value was, Checkbox Group would be unable to
          // find the value in its `this.value` array and remove it.
          old,
          new: value,
        },
      }),
    );
  }

  // Used by Checkbox Group.
  @property({ type: Boolean })
  privateIsReportValidityOrSubmit = false;

  @property({ reflect: true })
  readonly version: string = packageJson.version;

  get form(): HTMLFormElement | null {
    return this.#internals.form;
  }

  checkValidity(): boolean {
    this.isCheckingValidity = true;
    const isValid = this.#internals.checkValidity();
    this.isCheckingValidity = false;

    return isValid;
  }

  override click() {
    this.#inputElementRef.value?.click();
  }

  override connectedCallback() {
    super.connectedCallback();

    // Checkbox can be arbitrarily shown and hidden as it is in Dropdown. So calling
    // `#updateLabelOverflow` in the `label` setter isn't sufficient because the
    // label's `scrollWidth` and `clientWidth` will both be zero until Checkbox is
    // visible. So, rather than Checkbox expose a pseudo-private method, Checkbox
    // simply monitors its own visibility.
    this.#intersectionObserver = new IntersectionObserver(() => {
      if (this.checkVisibility()) {
        this.#updateLabelOverflow();
      }
    });

    this.#intersectionObserver.observe(this);
  }

  /* v8 ignore start */
  override disconnectedCallback() {
    super.disconnectedCallback();
    this.form?.removeEventListener('formdata', this.#onFormdata);
    this.#intersectionObserver?.disconnect();
  }
  /* v8 ignore end */

  get validity(): ValidityState {
    // If we're in a Checkbox Group, `disabled`, `required`, and whether or not
    // the form has been submitted don't apply because Checkbox Group handles those
    // states for the group as a whole.
    if (this.privateVariant === 'minimal') {
      return this.#internals.validity;
    }

    if (this.required && !this.checked) {
      // A validation message is required but unused because we disable native validation
      // feedback. And an empty string isn't allowed. Thus a single space.
      this.#internals.setValidity(
        { customError: Boolean(this.validityMessage), valueMissing: true },
        ' ',
        this.#inputElementRef.value,
      );

      return this.#internals.validity;
    }

    if (
      this.required &&
      this.#internals.validity.valueMissing &&
      this.checked
    ) {
      this.#internals.setValidity({});
      return this.#internals.validity;
    }

    if (
      !this.required &&
      this.#internals.validity.valueMissing &&
      !this.checked
    ) {
      this.#internals.setValidity({});
      return this.#internals.validity;
    }

    return this.#internals.validity;
  }

  override focus(options?: FocusOptions) {
    this.#inputElementRef.value?.focus(options);
  }

  formAssociatedCallback(): void {
    this.form?.addEventListener('formdata', this.#onFormdata);
  }

  formResetCallback(): void {
    this.checked = this.getAttribute('checked') === '';
    this.indeterminate = this.getAttribute('indeterminate') === '';
  }

  override render() {
    return html`<div class="component">
      ${when(
        this.privateVariant === 'minimal',
        () => html`
          <label
            class="label-and-input-and-checkbox"
            part="private-label-and-input-and-checkbox"
          >
            <div
              class=${classMap({
                'input-and-checkbox': true,
                disabled: this.disabled,
              })}
            >
              <input
                aria-invalid=${this.#isShowValidationFeedback}
                class="input"
                data-test="input"
                type="checkbox"
                .checked=${this.checked}
                .inert=${this.privateInternallyInert}
                ?disabled=${this.disabled}
                ?required=${this.required}
                @change=${this.#onInputChangeOrInput}
                @input=${this.#onInputChangeOrInput}
                @keydown=${this.#onInputKeydown}
                ${ref(this.#inputElementRef)}
              />

              <div
                class=${classMap({
                  checkbox: true,
                  disabled: this.disabled,
                })}
              >
                <div class="checked-icon">${checkedIcon}</div>
                ${icons.indeterminate}
              </div>
            </div>

            <div class="icon-and-label">
              <slot name="private-icon">
                <!-- @type {Element} -->
              </slot>

              <glide-core-tooltip
                class="label-tooltip"
                data-test="label-tooltip"
                label=${ifDefined(this.label)}
                offset=${this.privateLabelTooltipOffset}
                ?disabled=${!this.isLabelOverflow ||
                this.privateDisableLabelTooltip}
                ?open=${this.privateShowLabelTooltip}
                screenreader-hidden
              >
                <div
                  class=${classMap({
                    label: true,
                    disabled: this.disabled,
                  })}
                  slot="target"
                  ${ref(this.#labelElementRef)}
                >
                  ${this.label}
                </div>
              </glide-core-tooltip>
            </div>
          </label>
        `,
        () =>
          html`<glide-core-private-label
            label=${ifDefined(this.label)}
            orientation=${this.orientation}
            split=${ifDefined(this.privateSplit ?? undefined)}
            tooltip=${ifDefined(this.tooltip)}
            ?disabled=${this.disabled}
            ?error=${this.#isShowValidationFeedback}
            ?hide=${this.hideLabel}
            ?required=${this.required}
          >
            <label for="input"> ${this.label} </label>

            <!--
              The input is described by the summary and description but not the tooltip.
              Screenreaders will come across the tooltip naturally as focus moves toward
              the Checkbox.
            -->
            <div class="input-and-checkbox" slot="control">
              <input
                aria-describedby="summary description"
                aria-invalid=${this.#isShowValidationFeedback}
                class="input"
                id="input"
                type="checkbox"
                .checked=${this.checked}
                ?disabled=${this.disabled}
                ?required=${this.required}
                @blur=${this.#onBlur}
                @change=${this.#onInputChangeOrInput}
                @input=${this.#onInputChangeOrInput}
                @keydown=${this.#onInputKeydown}
                ${ref(this.#inputElementRef)}
              />

              <div
                class=${classMap({
                  checkbox: true,
                  disabled: this.disabled,
                  error: this.#isShowValidationFeedback,
                })}
              >
                <div class="checked-icon">${checkedIcon}</div>
                ${icons.indeterminate}
              </div>
            </div>

            ${when(
              this.summary,
              () =>
                html`<div
                  class=${classMap({ summary: true, disabled: this.disabled })}
                  id="summary"
                  slot="summary"
                >
                  ${this.summary}
                </div>`,
            )}

            <div id="description" slot="description">
              <!--
                Additional information or context
                @type {Element | string}
              -->
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
                  html`<span
                    class="validity-message"
                    data-test="validity-message"
                  >
                    ${unsafeHTML(this.validityMessage)}
                  </span>`,
              )}
            </div>
          </glide-core-private-label>`,
      )}
    </div>`;
  }

  reportValidity(): boolean {
    this.privateIsReportValidityOrSubmit = true;
    const isValid = this.#internals.reportValidity();

    // Ensures getters referencing `this.validity.valid` re-run.
    this.requestUpdate();

    return isValid;
  }

  resetValidityFeedback(): void {
    this.privateIsReportValidityOrSubmit = false;
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
      // A validation message is required but unused because we disable native validation
      // feedback. And an empty string isn't allowed. Thus a single space.
      this.#internals.setValidity(
        {
          customError: true,
          valueMissing: this.#internals.validity.valueMissing,
        },
        ' ',
        this.#inputElementRef.value,
      );
    }
  }

  setValidity(flags?: ValidityStateFlags, message?: string): void {
    this.validityMessage = message;
    this.#internals.setValidity(flags, ' ', this.#inputElementRef.value);
  }

  override updated() {
    if (this.#inputElementRef.value) {
      // `indeterminate` needs to be updated both on initial render and after it has
      // changed. This handles both cases.
      this.#inputElementRef.value.indeterminate = this.indeterminate;
    }
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

      this.privateIsReportValidityOrSubmit = true;

      const isFirstInvalidFormElement =
        this.form?.querySelector(':invalid') === this;

      if (isFirstInvalidFormElement) {
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
  private isBlurring = false;

  @state()
  private isCheckingValidity = false;

  @state()
  private isLabelOverflow = false;

  @state()
  private validityMessage?: string;

  #inputElementRef = createRef<HTMLInputElement>();

  #internals: ElementInternals;

  #intersectionObserver?: IntersectionObserver;

  #isChecked = false;

  #isDisabled = false;

  #label?: string;

  #labelElementRef = createRef<HTMLElement>();

  #value = '';

  // An arrow function field instead of a method so `this` is closed over and
  // set to the component instead of `document`.
  #onFormdata = ({ formData }: FormDataEvent) => {
    if (this.checked && this.name && this.value && !this.disabled) {
      formData.append(this.name, this.value);
    }
  };

  get #isShowValidationFeedback() {
    // If minimal, `disabled`, `required`, and whether the form has been submitted
    // don't apply because the parent component handles those states itself.
    if (this.privateVariant === 'minimal') {
      return !this.validity.valid && this.privateIsReportValidityOrSubmit;
    }

    return (
      !this.disabled &&
      !this.validity.valid &&
      this.privateIsReportValidityOrSubmit
    );
  }

  #onBlur() {
    this.isBlurring = true;
    this.reportValidity();
    this.isBlurring = false;
  }

  // Only "change" would need to be handled if not for some consumers needing to
  // force Checkbox checked or unchecked until the user has completed some action.
  //
  // The way they can force Checkbox to be checked or unchecked is to add an "input"
  // or "change" handler and then immediately set `checked` back to its desired state
  // inside that handler.
  //
  // To do that, consumers need to await `this.updateComplete` so `checked` isn't
  // immediately reverted after Checkbox updates, which happens asynchronously and
  // so would happen after their handler runs.
  //
  // To await `this.updateComplete`, however, an update has to be pending. That's
  // why we're handling "input" as well: so that "input", like "change", results
  // in an update that can be awaited.
  //
  // If "input" events were dispatched after "change" events, only handling "change"
  // here would suffice because an update from "change" would already be pending by
  // the time "input" is dispatched.
  #onInputChangeOrInput(event: Event) {
    if (event.target instanceof HTMLInputElement) {
      this.checked = event.target.checked;
    }

    // If the input has been interacted with it's no longer indeterminate.
    this.indeterminate = false;

    // Our analyzer plugin (`add-events.ts`) doesn't and can't account for events that
    // are implicitly dispatched by a native form control in a component. So we stop
    // the original event and dispatch our own.
    if (event.type === 'input') {
      event.stopPropagation();
      this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    }

    if (event.type === 'change') {
      // Unlike "input" events, "change" events aren't composed. So we have to manually
      // dispatch them.
      this.dispatchEvent(
        new Event('change', { bubbles: true, composed: true }),
      );
    }
  }

  #onInputKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.form?.requestSubmit();
    }
  }

  #updateLabelOverflow() {
    if (this.#labelElementRef.value) {
      this.isLabelOverflow =
        this.#labelElementRef.value.scrollWidth >
        this.#labelElementRef.value.clientWidth;
    }
  }
}

const icons = {
  indeterminate: html`
    <svg
      aria-hidden="true"
      style=${styleMap({
        height: '0.875rem',
        width: '0.875rem',
      })}
      viewBox="0 0 14 14"
      fill="none"
      class="indeterminate-icon"
    >
      <rect x="0.5" y="0.5" width="13" height="13" rx="3.5" />
      <path
        d="M3 5C3 3.89543 3.89543 3 5 3H9.79289C10.2383 3 10.4614 3.53857 10.1464 3.85355L3.85355 10.1464C3.53857 10.4614 3 10.2383 3 9.79289V5Z"
        fill="currentColor"
      />
    </svg>
  `,
};
