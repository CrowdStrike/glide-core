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
import packageJson from '../package.json' with { type: 'json' };
import checkedIcon from './icons/checked.js';
import styles from './checkbox.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-checkbox': GlideCoreCheckbox;
  }
}

/**
 * @event change
 * @event input
 * @event invalid
 *
 * @slot description - Additional information or context.
 * @slot private-icon
 */
@customElement('glide-core-checkbox')
export default class GlideCoreCheckbox extends LitElement {
  static formAssociated = true;

  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: 'closed',
  };

  static override styles = styles;

  @property({ type: Boolean })
  checked = false;

  @property({ attribute: 'internally-inert', type: Boolean })
  internallyInert = false;

  @property({ reflect: true, type: Boolean })
  disabled = false;

  @property({ attribute: 'hide-label', type: Boolean })
  hideLabel = false;

  @property({ type: Boolean })
  indeterminate = false;

  @property({ reflect: true })
  get label() {
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

  @property({ reflect: true })
  orientation: 'horizontal' | 'vertical' = 'horizontal';

  @property({ reflect: true })
  name = '';

  // Private because it's only meant to be used by Dropdown Option to offset the tooltip by the option's padding.
  @property({
    attribute: 'private-label-tooltip-offset',
    reflect: true,
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

  // Private because it's only meant to be used by Dropdown.
  @property({ attribute: 'private-size' })
  privateSize: 'large' | 'small' = 'large';

  // Private because it's only meant to be used by Form Controls Layout.
  @property()
  privateSplit?: 'left' | 'middle';

  // Private because it's only meant to be used by Checkbox Group and Dropdown Option.
  @property({ attribute: 'private-variant' })
  privateVariant?: 'minimal';

  @property({ reflect: true, type: Boolean })
  required = false;

  @property({ reflect: true })
  summary?: string;

  @property({ reflect: true })
  tooltip?: string;

  @property({ reflect: true })
  get value() {
    return this.#value;
  }

  set value(value: string) {
    const old = this.#value;
    this.#value = value;

    // `this.value` can be changed programmatically. Checkbox Group needs to know when
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
  readonly version = packageJson.version;

  get form() {
    return this.#internals.form;
  }

  override blur() {
    this.#inputElementRef.value?.blur();
  }

  checkValidity() {
    this.isCheckingValidity = true;
    const validity = this.#internals.checkValidity();
    this.isCheckingValidity = false;

    return validity;
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

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.form?.removeEventListener('formdata', this.#onFormdata);
    this.#intersectionObserver?.disconnect();
  }

  get validity() {
    // If we're in a Checkbox Group, `disabled`, `required`, and whether or not
    // the form has been submitted don't apply because Checkbox Group handles those
    // states for the group as a whole.
    if (this.privateVariant === 'minimal') {
      return this.#internals.validity;
    }

    if (this.required && !this.checked) {
      // A validation message is required but unused because we disable native validation feedback.
      // And an empty string isn't allowed. Thus a single space.
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

  formAssociatedCallback() {
    this.form?.addEventListener('formdata', this.#onFormdata);
  }

  formResetCallback() {
    this.checked = this.getAttribute('checked') === '';
    this.indeterminate = this.getAttribute('indeterminate') === '';
  }

  override render() {
    return html`<div class="component" data-test="component">
      ${when(
        this.privateVariant === 'minimal',
        () => html`
          <label
            class=${classMap({
              'label-and-input-and-checkbox': true,
              [this.privateSize]: true,
            })}
            part="private-label-and-input-and-checkbox"
          >
            <div class="input-and-checkbox">
              <input
                aria-invalid=${this.#isShowValidationFeedback}
                class="input"
                data-test="input"
                type="checkbox"
                .checked=${this.checked}
                .inert=${this.internallyInert}
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
              <slot name="private-icon"></slot>

              <glide-core-tooltip
                class="label-tooltip"
                data-test="label-tooltip"
                label=${ifDefined(this.tooltip)}
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
                data-test="input"
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

            <div id="summary" slot="summary">${this.summary}</div>

            <div id="description" slot="description">
              <slot
                class=${classMap({
                  description: true,
                  hidden: Boolean(
                    this.#isShowValidationFeedback && this.validityMessage,
                  ),
                })}
                name="description"
              ></slot>
              ${when(
                this.#isShowValidationFeedback && this.validityMessage,
                () =>
                  html`<span
                    class="validity-message"
                    data-test="validity-message"
                    >${unsafeHTML(this.validityMessage)}</span
                  >`,
              )}
            </div>
          </glide-core-private-label>`,
      )}
    </div>`;
  }

  reportValidity() {
    this.privateIsReportValidityOrSubmit = true;

    const isValid = this.#internals.reportValidity();

    // Ensures that getters referencing this.validity?.valid update (i.e. #isShowValidationFeedback)
    this.requestUpdate();

    return isValid;
  }

  resetValidityFeedback() {
    this.privateIsReportValidityOrSubmit = false;
  }

  setCustomValidity(message: string) {
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
          valueMissing: this.#internals.validity.valueMissing,
        },
        ' ',
        this.#inputElementRef.value,
      );
    }
  }

  setValidity(flags?: ValidityStateFlags, message?: string) {
    this.validityMessage = message;

    this.#internals.setValidity(flags, ' ', this.#inputElementRef.value);
  }

  get willValidate() {
    return this.#internals.willValidate;
  }

  override updated() {
    if (this.#inputElementRef.value) {
      // `indeterminate` needs to be updated both on initial render and after it has
      // changed. This handles both cases.
      //
      // TODO
      // No need for this when browsers support the ":indeterminate" on the host.
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

      // We only want to focus the input if the invalid event resulted from either:
      // 1. Form submission
      // 2. a call to reportValidity that did NOT result from the checkbox blur event
      if (this.isCheckingValidity || this.isBlurring) {
        return;
      }

      this.privateIsReportValidityOrSubmit = true;

      const isFirstInvalidFormElement =
        this.form?.querySelector(':invalid') === this;

      if (isFirstInvalidFormElement) {
        // - `this.#internals.delegatesFocus` is preferred because it's declarative. But
        //    it's limited to focusing the first focusable element. That doesn't work for
        //    us because our first focusable element is the tooltip when it's present.
        //
        // - Canceling this event means the input won't get focus, even if we were to use
        //   `this.#internals.delegatesFocus`.
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

  #label = '';

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

  // Only "change" would need to be handled if not for some consumers needing
  // to force Checkbox checked or unchecked until the user has completed some action.
  //
  // The way to force Checkbox checked or unchecked is to add an "input" or
  // "change" handler and then immediately set `checked` back to its desired
  // state inside that handler.
  //
  // To do that, consumers need to await `this.updateComplete` so `checked` isn't
  // immediately reverted after Checkbox updates, which happens asynchronously and
  // so would happen after their handler runs.
  //
  // To await `this.updateComplete`, however, an update has to be pending. That's
  // why we're handling "input" as well: so that "input", like "change", results
  // in an update that can be awaited.
  //
  // If "input" events were dispatched after "change" events, only handling
  // "change" here would suffice because an update from "change" would already
  // be pending by the time "input" is dispatched.
  #onInputChangeOrInput(event: Event) {
    if (event.target instanceof HTMLInputElement) {
      this.checked = event.target.checked;
    }

    // If the input is interacted with it's no longer indeterminate.
    this.indeterminate = false;

    if (event.type === 'change') {
      // Unlike "input" events, "change" events aren't composed. So we have to
      // manually dispatch them.
      this.dispatchEvent(
        new Event(event.type, { bubbles: true, composed: true }),
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
