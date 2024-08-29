import './label.js';
import './tooltip.js';
import { LitElement, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { when } from 'lit/directives/when.js';
import checkedIcon from './icons/checked.js';
import styles from './checkbox.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-checkbox': GlideCoreCheckbox;
  }
}

const indeterminateIcon = html`
  <svg
    width="14"
    height="14"
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
`;

/**
 * @description A checkbox with a label and optional tooltip, summary, and description. Participates in forms and validation via `FormData` and various methods.
 *
 * @event change - `(event: Event) => void`
 * @event input - `(event: Event) => void`
 * @event invalid - `(event: Event) => void`
 *
 * @slot description - Additional information or context.
 * @slot tooltip - Content for the tooltip.
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
  name?: string;

  @property({
    attribute: 'private-label-tooltip-offset',
    reflect: true,
    type: Number,
  })
  // Unfortunate. Used by Dropdown Option to offset the tooltip by the option's padding.
  privateLabelTooltipOffset = 4;

  @property({
    attribute: 'private-show-label-tooltip',
    reflect: true,
    type: Boolean,
  })
  privateShowLabelTooltip = false;

  @property()
  privateSplit?: 'left' | 'middle';

  @property({ attribute: 'private-variant' })
  privateVariant?: 'minimal';

  @property({ reflect: true, type: Boolean })
  required = false;

  @property({ reflect: true })
  summary?: string;

  @property({ reflect: true })
  value = '';

  // Not private, so that a parent checkbox group can programmatically set
  @state()
  isReportValidityOrSubmit = false;

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
        { valueMissing: true },
        ' ',
        this.#inputElementRef.value,
      );
    } else {
      this.#internals.setValidity({});
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
            class="label-and-input-and-checkbox"
            part="private-label-and-input-and-checkbox"
          >
            <div class="input-and-checkbox">
              <input
                aria-invalid=${this.#isShowValidationFeedback}
                data-test="input"
                type="checkbox"
                .checked=${this.checked}
                .inert=${this.internallyInert}
                ?disabled=${this.disabled}
                ?required=${this.required}
                @change=${this.#onChangeOrInput}
                @input=${this.#onChangeOrInput}
                @keydown=${this.#onKeydown}
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
                ${indeterminateIcon}
              </div>
            </div>

            <glide-core-tooltip
              class="label-tooltip"
              offset=${this.privateLabelTooltipOffset}
              ?disabled=${!this.isLabelOverflow}
              ?open=${this.privateShowLabelTooltip}
            >
              <div aria-hidden="true" data-test="tooltip">${this.label}</div>

              <div class="label" slot="target" ${ref(this.#labelElementRef)}>
                ${this.label}
              </div>
            </glide-core-tooltip>
          </label>
        `,
        () =>
          html`<glide-core-private-label
            orientation=${this.orientation}
            split=${ifDefined(this.privateSplit ?? undefined)}
            ?disabled=${this.disabled}
            ?error=${this.#isShowValidationFeedback}
            ?hide=${this.hideLabel}
            ?required=${this.required}
          >
            <slot name="tooltip" slot="tooltip"></slot>
            <label for="input"> ${this.label} </label>

            <!--
              The input is described by the summary and description but not the tooltip.
              Screenreaders will come across the tooltip naturally as focus moves toward
              the Checkbox.

              —

              A native input isn't necessary given the component itself is form associated.
              A button, for example, could also be made to work. But an input gives us a
              few things that together make using one worthwhile:

              - "change" and "input" events.
              - Toggling checked using the spacebar.
              - ":checked" and ":indeterminate" pseudo classes, which browsers don't support
                on hosts even when a component is form-associated.

              -

              aria-invalid is set based on whether the validation feedback is displayed. This
              is to handle an odd behavior with checkboxes where "Invalid Data" is announced
              on required unchecked inputs. While this is technically correct, it's
              inconsistent with how other form controls behave as their validity isn’t announced
              on screen readers by default before validation.
            -->
            <div class="input-and-checkbox" slot="control">
              <input
                aria-describedby="summary description"
                aria-invalid=${this.#isShowValidationFeedback}
                data-test="input"
                id="input"
                type="checkbox"
                .checked=${this.checked}
                ?disabled=${this.disabled}
                ?required=${this.required}
                @blur=${this.#onBlur}
                @change=${this.#onChangeOrInput}
                @input=${this.#onChangeOrInput}
                @keydown=${this.#onKeydown}
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
                ${indeterminateIcon}
              </div>
            </div>

            <div id="summary" slot="summary">${this.summary}</div>

            <slot id="description" name="description" slot="description"></slot>
          </glide-core-private-label>`,
      )}
    </div>`;
  }

  reportValidity() {
    this.isReportValidityOrSubmit = true;

    const isValid = this.#internals.reportValidity();

    // Ensures that getters referencing this.validity?.valid update (i.e. #isShowValidationFeedback)
    this.requestUpdate();

    return isValid;
  }

  setValidity(
    flags?: ValidityStateFlags,
    message?: string,
    anchor?: HTMLElement,
  ) {
    return this.#internals.setValidity(flags, message, anchor);
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

    // Event listeners on the host aren't great because consumers can remove them.
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

      this.isReportValidityOrSubmit = true;

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

  #inputElementRef = createRef<HTMLInputElement>();

  #internals: ElementInternals;

  #intersectionObserver?: IntersectionObserver;

  #label = '';

  #labelElementRef = createRef<HTMLElement>();

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
      return !this.validity.valid && this.isReportValidityOrSubmit;
    }

    return (
      this.required &&
      !this.disabled &&
      !this.validity.valid &&
      this.isReportValidityOrSubmit
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
  // "change" listener and then immediately set `checked` back to its desired
  // state inside that listener.
  //
  // To do that, consumers need to await `this.updateComplete` so `checked` isn't
  // immediately reverted after Checkbox updates, which happens asynchronously and
  // so would happen after their listener runs.
  //
  // To await `this.updateComplete`, however, an update has to be pending. That's
  // why we're handling "input" as well: so that "input", like "change", results
  // in an update that can be awaited.
  //
  // If "input" events were dispatched after "change" events, only handling
  // "change" here would suffice because an update from "change" would already
  // be pending by the time "input" is dispatched.
  #onChangeOrInput(event: Event) {
    if (event.target instanceof HTMLInputElement) {
      this.checked = event.target.checked;
    }

    // If the input is interacted with it's no longer indeterminate.
    this.indeterminate = false;

    if (event.type === 'change') {
      // Unlike "input" events, "change" events aren't composed. So we have to
      // manually dispatch them.
      this.dispatchEvent(new Event(event.type, event));
    }
  }

  #onKeydown(event: KeyboardEvent) {
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
