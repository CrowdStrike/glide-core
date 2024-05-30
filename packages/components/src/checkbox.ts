import './label.js';
import { LitElement, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
import { svg } from 'lit/static-html.js';
import { when } from 'lit-html/directives/when.js';
import checkedIcon from './icons/checked.js';
import styles from './checkbox.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'cs-checkbox': CsCheckbox;
  }
}

const indeterminateIcon = svg`
  <svg
    class="indeterminate-icon"
    fill="none"
    height="14"
    viewBox="0 0 24 24"
    width="14"
    >
      <path
      d="M8 10C8 8.89543 8.89543 8 10 8H14.7929C15.2383 8 15.4614 8.53857 15.1464 8.85355L8.85355 15.1464C8.53857 15.4614 8 15.2383 8 14.7929V10Z"
      fill="currentColor"
      />
  </svg>
`;

/**
 * @description A checkbox with a label and optional tooltip, summary, and description. Participates in forms and validation via `FormData` and various methods.
 *
 * @event change - Dispatched when checked or unchecked.
 * @event input - Dispatched when checked or unchecked.

 * @slot description - Additional information or context.
 * @slot tooltip - Content for the tooltip.
 */
@customElement('cs-checkbox')
export default class CsCheckbox extends LitElement {
  static formAssociated = true;

  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: 'closed',
  };

  static override styles = styles;

  @property({ type: Boolean })
  checked = false;

  @property({ reflect: true, type: Boolean })
  disabled = false;

  @property({ type: Boolean })
  indeterminate = false;

  @property({ reflect: true })
  label?: string;

  @property({ reflect: true })
  orientation: 'horizontal' | 'vertical' = 'horizontal';

  @property({ reflect: true })
  name?: string;

  @property({ reflect: true, type: Boolean })
  required = false;

  @property({ reflect: true })
  summary?: string;

  @property({ reflect: true })
  value?: string = '';

  get form() {
    return this.#internals.form;
  }

  checkValidity() {
    this.isCheckingValidity = true;
    return this.#internals.checkValidity();
  }

  override click() {
    this.#inputElementRef.value?.click();
  }

  override connectedCallback() {
    super.connectedCallback();
    this.isInCheckboxGroup = Boolean(this.closest('cs-checkbox-group'));
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.form?.removeEventListener('formdata', this.#onFormdata);
    this.isInCheckboxGroup = Boolean(this.closest('cs-checkbox-group'));
  }

  get validity() {
    // If we're in a Checkbox Group, `disabled`, `required`, and whether or not
    // the form has been submitted don't apply because Checkbox Group handles those
    // states for the group as a whole.
    if (this.isInCheckboxGroup) {
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
    return html`<div
      class=${classMap({
        component: true,
        error: this.#isShowValidationFeedback,
      })}
      data-test="component"
    >
      ${when(
        this.isInCheckboxGroup,
        () => html`
          <div class="label-and-checkbox">
            <div class="input-and-checkbox">
              <input
                aria-invalid=${this.#isShowValidationFeedback}
                data-test="input"
                id="input"
                type="checkbox"
                ?checked=${this.checked}
                ?disabled=${this.disabled}
                ?required=${this.required}
                @change=${this.#onInputChange}
                ${ref(this.#inputElementRef)}
              />

              <div class="checkbox">
                <div class="checked-icon">${checkedIcon}</div>
                ${indeterminateIcon}
              </div>
            </div>

            <label for="input">${this.label}</label>
          </div>
        `,
        () =>
          html`<cs-label
            orientation=${this.orientation}
            ?disabled=${this.disabled}
            ?error=${this.#isShowValidationFeedback}
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
                ?checked=${this.checked}
                ?disabled=${this.disabled}
                ?required=${this.required}
                @change=${this.#onInputChange}
                ${ref(this.#inputElementRef)}
              />

              <div class="checkbox">
                <div class="checked-icon">${checkedIcon}</div>
                ${indeterminateIcon}
              </div>
            </div>

            <div id="summary" slot="summary">${this.summary}</div>

            <slot id="description" name="description" slot="description"></slot>
          </cs-label>`,
      )}
    </div>`;
  }

  reportValidity() {
    return this.#internals.reportValidity();
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

      if (!this.isCheckingValidity) {
        this.isReportValidityOrSubmit = true;

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
  private isCheckingValidity = false;

  @state()
  private isInCheckboxGroup = false;

  @state()
  private isReportValidityOrSubmit = false;

  #inputElementRef = createRef<HTMLInputElement>();

  #internals: ElementInternals;

  // An arrow function field instead of a method so `this` is closed over and
  // set to the component instead of `document`.
  #onFormdata = ({ formData }: FormDataEvent) => {
    if (this.checked && this.name && this.value && !this.disabled) {
      formData.append(this.name, this.value);
    }
  };

  get #isShowValidationFeedback() {
    // If we're in a Checkbox Group, `disabled`, `required`, and whether or not
    // the form has been submitted don't apply because Checkbox Group handles those
    // states for the group as a whole.
    if (this.isInCheckboxGroup) {
      return !this.validity.valid;
    }

    return (
      this.required &&
      !this.disabled &&
      !this.validity.valid &&
      this.isReportValidityOrSubmit
    );
  }

  #onInputChange(event: Event) {
    if (event.target instanceof HTMLInputElement) {
      this.checked = event.target.checked;
    }

    // If the input is interacted with, it's no longer indeterminate.
    this.indeterminate = false;

    // Unlike "input" events, "change" events aren't composed. So we manually
    // dispatch them from the host.
    this.dispatchEvent(new Event(event.type, event));
  }
}
