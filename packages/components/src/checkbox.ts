import './tooltip.js';
import { LitElement, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
import styles from './checkbox.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'cs-checkbox': CsCheckbox;
  }
}

/**
 * @description A checkbox with a label and optional tooltip, summary, and description.
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

  get validity() {
    if (this.required && !this.checked) {
      // 1. A validity message, the second argument, doesn't strictly apply to checkboxes.
      //    Unlike other form controls, checkboxes are binary. And so screenreaders already
      //    have the information they need given a label and optional description. "invalid"
      //    is read aloud to screenreader users when a `required` checkbox is unchecked.
      //    Sighted users have a color change to indicate an error.
      //
      // 2. Native validation doesn't meet our design requirements. So we suppress it, which
      //    also hides it from screenreaders.
      //
      // Nonetheless, a validation message is required. And an empty string isn't allowed.
      // Thus a single space.
      this.#internals.setValidity(
        { valueMissing: true },
        ' ',
        this.#inputRef.value,
      );
    } else {
      this.#internals.setValidity({});
    }

    return this.#internals.validity;
  }

  get willValidate() {
    return this.#internals.willValidate;
  }

  checkValidity() {
    this.isCheckingValidity = true;
    return this.#internals.checkValidity();
  }

  override click() {
    this.#inputRef.value?.click();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.form?.removeEventListener('formdata', this.#onFormdata);
  }

  override focus(options?: FocusOptions) {
    this.#inputRef.value?.focus(options);
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
        tooltip: this.hasTooltipSlot,
      })}
      data-test="component"
      ${ref(this.#componentRef)}
    >
      <cs-tooltip
        class=${classMap({
          visible: this.hasTooltipSlot,
        })}
        placement=${this.orientation === 'vertical' ? 'right' : 'bottom'}
      >
        <button class="tooltip-button" slot="target">
          <svg
            aria-label="More information"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="2"
            />

            <path
              d="M12 16L12 12"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />

            <circle cx="12" cy="8" r="1" fill="currentColor" />
          </svg>
        </button>

        <slot
          name="tooltip"
          @slotchange=${this.#onTooltipSlotChange}
          ${ref(this.#tooltipSlotRef)}
        ></slot>
      </cs-tooltip>

      <label class="label-and-checkbox-and-summary">
        <!--
          The input is described by the summary and description but not the tooltip.
          Screenreaders will come across the tooltip naturally as they move focus
          through Checkbox.

          Describing the input additionally by the tooltip is possible. We'd have to:

          1. Get the content of the tooltip slot.
          2. Dump the content into a DIV.
          3. Visually hide the DIV.
          4. Describe the input using the DIV.
          5. Hide the tooltip using "aria-hidden" so its content isn't doubly read.

          Even then, the tooltip would still receive focus to support sighted keyboard
          users. Screenreaders would likewise focus the tooltip. But its contents would
          not be read aloud because they would be hidden. This would be pretty confusing.

          —

          A native input isn't necessary given the component itself is form associated.
          A button, for example, could also be made to work. But an input gives us a
          few things that together make using one worthwhile:

          - "change" and "input" events.
          - Toggling checked using the spacebar.
          - ":checked" and ":indeterminate" pseudo classes, which browsers don't support
            on hosts even when a component is form-associated.
        -->
        <input
          aria-describedby="summary-for-screenreaders description"
          data-test="input"
          type="checkbox"
          ?checked=${this.checked}
          ?disabled=${this.disabled}
          ?required=${this.required}
          @change=${this.#onInputChange}
          ${ref(this.#inputRef)}
        />

        <div
          class=${classMap({
            'label-text': true,
            tooltip: this.hasTooltipSlot,
          })}
        >
          ${this.label}
        </div>

        <div
          class=${classMap({
            'checkbox-and-summary': true,
            tooltip: this.hasTooltipSlot,
          })}
        >
          <div class="checkbox">
            <svg
              class="checked-icon"
              fill="none"
              height="14"
              viewBox="0 0 24 24"
              width="14"
            >
              <path
                d="M20 6L9 17L4 12"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <svg
              class="indeterminate-icon"
              fill="none"
              height="16"
              viewBox="0 0 24 24"
              width="16"
            >
              <path
                d="M8 10C8 8.89543 8.89543 8 10 8H14.7929C15.2383 8 15.4614 8.53857 15.1464 8.85355L8.85355 15.1464C8.53857 15.4614 8 15.2383 8 14.7929V10Z"
                fill="currentColor"
              />
            </svg>
          </div>

          <!--
            Hidden from screenreaders because a summary isn't quite a label. The summary is
            duplicated below, outside the label, and then presented to screenreaders as a
            description using "aria-describedby".
          -->
          <div
            aria-hidden="true"
            class=${classMap({
              summary: true,
              tooltip: this.hasTooltipSlot,
            })}
          >
            ${this.summary}
          </div>
        </div>
      </label>

      <div class="summary-for-screenreaders" id="summary-for-screenreaders">
        ${this.summary}
      </div>

      <slot
        class=${classMap({
          description: true,
          tooltip: this.hasTooltipSlot,
        })}
        id="description"
        name="description"
      ></slot>
    </div>`;
  }

  reportValidity() {
    return this.#internals.reportValidity();
  }

  override updated() {
    if (this.#inputRef.value) {
      // `indeterminate` needs to be updated both on initial render and after it has
      // changed. This handles both cases.
      //
      // TODO
      // No need for this when browsers support the ":indeterminate" on the host.
      this.#inputRef.value.indeterminate = this.indeterminate;
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
  private hasTooltipSlot = false;

  @state()
  private isCheckingValidity = false;

  @state()
  private isReportValidityOrSubmit = false;

  #componentRef = createRef<HTMLDivElement>();

  #inputRef = createRef<HTMLInputElement>();

  #internals: ElementInternals;

  #tooltipSlotRef = createRef<HTMLSlotElement>();

  // An arrow function field instead of a method so `this` is closed over and
  // set to the component instead of `document`.
  #onFormdata = ({ formData }: FormDataEvent) => {
    if (this.checked && this.name && this.value && !this.disabled) {
      formData.append(this.name, this.value);
    }
  };

  get #isShowValidationFeedback() {
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

    // Unlike "input" events, these don't bubble. So we manually dispatch them.
    this.dispatchEvent(new Event(event.type, event));
  }

  #onTooltipSlotChange() {
    const assignedNodes = this.#tooltipSlotRef.value?.assignedNodes();
    this.hasTooltipSlot = Boolean(assignedNodes && assignedNodes.length > 0);
  }
}
