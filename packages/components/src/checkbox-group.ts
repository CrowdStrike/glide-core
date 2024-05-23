import './tooltip.js';
import { LitElement, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
import { owSlot, owSlotType } from './library/ow.js';
import CsCheckbox from './checkbox.js';
import infoCircleIcon from './icons/info-circle.js';
import styles from './checkbox-group.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'cs-checkbox-group': CsCheckboxGroup;
  }
}

/**
 * @description A group of checkboxes with a label and optional tooltip and description. Participates in forms and validation via `FormData` and various methods.
 *
 * @slot - One or more of `<cs-checkbox>`.
 * @slot description - Additional information or context.
 * @slot tooltip - Content for the tooltip.
 */
@customElement('cs-checkbox-group')
export default class CsCheckboxGroup extends LitElement {
  static formAssociated = true;

  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: 'closed',
  };

  static override styles = styles;

  @property({ reflect: true, type: Boolean })
  get disabled() {
    return this.#isDisabled;
  }

  set disabled(isDisabled: boolean) {
    this.#isDisabled = isDisabled;

    for (const checkbox of this.#checkboxes) {
      checkbox.disabled = isDisabled;
    }
  }

  @property({ reflect: true })
  label?: string;

  @property({ reflect: true })
  name?: string;

  @property({ reflect: true, type: Boolean })
  get required() {
    return this.#isRequired;
  }

  set required(isRequired: boolean) {
    this.#isRequired = isRequired;

    // Changes to `required` change the validity state. If no checkboxes are
    // checked and Checkbox Group is `required`, then Checkbox Group is invalid.
    // However, if `required` is programmatically removed, then Checkbox Group
    // is suddenly valid. So we update the validity of every checkbox to match
    // Checkbox Group. This ensures that any visual feedback shown by Checkbox
    // based on validity is correct.
    for (const checkbox of this.#checkboxes) {
      if (isRequired) {
        checkbox.setValidity(this.#internals.validity, ' ');
      } else {
        checkbox.setValidity({});
      }

      // Checkbox's `this.#internals.validity` isn't reactive.
      checkbox.requestUpdate();
    }
  }

  @property({ reflect: true })
  summary?: string;

  @property({ type: Array })
  value: string[] = [];

  checkValidity() {
    this.isCheckingValidity = true;
    return this.#internals.checkValidity();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.form?.removeEventListener('formdata', this.#onFormdata);
  }

  override firstUpdated() {
    owSlot(this.#defaultSlotElementRef.value);
    owSlotType(this.#defaultSlotElementRef.value, [CsCheckbox]);

    if (this.disabled) {
      for (const checkbox of this.#checkboxes) {
        checkbox.disabled = true;
      }
    }

    this.value = this.#checkboxes
      .filter(({ checked, disabled }) => checked && !disabled)
      .map(({ value }) => value)
      // Disabled because simply filtering by `Boolean` doesn't narrow the type.
      // eslint-disable-next-line unicorn/prefer-native-coercion-functions
      .filter((value): value is string => Boolean(value));
  }

  get form() {
    return this.#internals.form;
  }

  get validity() {
    const isChecked = this.#checkboxes.some(({ checked }) => checked);

    if (this.required && !isChecked) {
      // A validation message is required but unused because we disable native validation feedback.
      // And an empty string isn't allowed. Thus a single space.
      this.#internals.setValidity(
        { valueMissing: true },
        ' ',
        this.#componentElementRef.value,
      );
    } else {
      this.#internals.setValidity({});
    }

    for (const checkbox of this.#checkboxes) {
      checkbox.setValidity(this.#internals.validity, ' ');

      // Checkbox's `this.#internals.validity` isn't reactive.
      checkbox.requestUpdate();
    }

    return this.#internals.validity;
  }

  get willValidate() {
    return this.#internals.willValidate;
  }

  override focus(options?: FocusOptions) {
    this.#checkboxes.at(0)?.focus(options);
  }

  formAssociatedCallback() {
    this.form?.addEventListener('formdata', this.#onFormdata);
  }

  formResetCallback() {
    for (const checkbox of this.#checkboxes) {
      checkbox.checked = checkbox.getAttribute('checked') === '';
    }
  }

  override render() {
    return html`<div
      class=${classMap({
        component: true,
        error: this.#isShowValidationFeedback,
        tooltip: this.hasTooltipSlot,
      })}
      data-test="component"
      ${ref(this.#componentElementRef)}
    >
      <cs-tooltip
        class=${classMap({
          visible: this.hasTooltipSlot,
        })}
      >
        <span class="tooltip-target" slot="target" tabindex="0">
          ${infoCircleIcon}
        </span>

        <slot
          name="tooltip"
          @slotchange=${this.#onTooltipSlotChange}
          ${ref(this.#tooltipSlotElementRef)}
        ></slot>
      </cs-tooltip>

      <!-- "aria-describedby" is more appropriate for a description but isn't read by VoiceOver. -->
      <fieldset aria-labelledby="legend description" class="fieldset">
        <legend
          class=${classMap({
            legend: true,
            tooltip: this.hasTooltipSlot,
          })}
          id="legend"
        >
          ${this.label}
          ${this.required
            ? html`<span aria-hidden="true" class="required-symbol">*</span>`
            : ''}
        </legend>

        <slot
          class=${classMap({
            checkboxes: true,
            tooltip: this.hasTooltipSlot,
          })}
          @slotchange=${this.#onDefaultSlotChange}
          ${ref(this.#defaultSlotElementRef)}
        ></slot>
      </fieldset>

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

  #componentElementRef = createRef<HTMLDivElement>();

  #defaultSlotElementRef = createRef<HTMLSlotElement>();

  #internals: ElementInternals;

  #isDisabled = false;

  #isRequired = false;

  #tooltipSlotElementRef = createRef<HTMLSlotElement>();

  get #checkboxes() {
    return this.#defaultSlotElementRef.value
      ? this.#defaultSlotElementRef.value
          .assignedElements()
          .filter((element): element is CsCheckbox => {
            return element instanceof CsCheckbox;
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
      this.required &&
      !this.disabled &&
      !this.validity.valid &&
      this.isReportValidityOrSubmit
    );
  }

  #onDefaultSlotChange() {
    owSlot(this.#defaultSlotElementRef.value);
    owSlotType(this.#defaultSlotElementRef.value, [CsCheckbox]);

    this.value = this.#checkboxes
      .filter(({ checked, disabled }) => checked && !disabled)
      .map(({ value }) => value)
      // Disabled because simply filtering by `Boolean` doesn't narrow the type.
      // eslint-disable-next-line unicorn/prefer-native-coercion-functions
      .filter((value): value is string => Boolean(value));
  }

  #onTooltipSlotChange() {
    const assignedNodes = this.#tooltipSlotElementRef.value?.assignedNodes();
    this.hasTooltipSlot = Boolean(assignedNodes && assignedNodes.length > 0);
  }
}
