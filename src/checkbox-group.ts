import './label.js';
import { LitElement, html } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { owSlot, owSlotType } from './library/ow.js';
import GlideCoreCheckbox from './checkbox.js';
import styles from './checkbox-group.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-checkbox-group': GlideCoreCheckboxGroup;
  }
}

/**
 * @description A group of checkboxes with a label and optional tooltip and description. Participates in forms and validation via `FormData` and various methods.
 *
 * @slot - One or more of `<glide-core-checkbox>`.
 * @slot description - Additional information or context.
 * @slot tooltip - Content for the tooltip.
 */
@customElement('glide-core-checkbox-group')
export default class GlideCoreCheckboxGroup extends LitElement {
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

  @property({ attribute: 'hide-label', type: Boolean })
  hideLabel = false;

  @property({ reflect: true })
  label?: string;

  @property({ reflect: true })
  name?: string;

  @property()
  privateSplit?: 'left' | 'middle';

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
    const validity = this.#internals.checkValidity();
    this.isCheckingValidity = false;

    return validity;
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.form?.removeEventListener('formdata', this.#onFormdata);
  }

  override firstUpdated() {
    owSlot(this.#defaultSlotElementRef.value);
    owSlotType(this.#defaultSlotElementRef.value, [GlideCoreCheckbox]);

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

    for (const checkbox of this.#checkboxes) {
      checkbox.privateVariant = 'minimal';

      checkbox.addEventListener('blur', this.#onCheckboxBlur.bind(this));
    }
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
        split=${ifDefined(this.privateSplit ?? undefined)}
        ?hide=${this.hideLabel}
        ?disabled=${this.disabled}
        ?error=${this.#isShowValidationFeedback}
        ?required=${this.required}
      >
        <slot name="tooltip" slot="tooltip"></slot>
        <label id="label">${this.label}</label>

        <!-- "aria-describedby" is more appropriate for a description but isn't read by VoiceOver. -->
        <div aria-labelledby="label description" role="group" slot="control">
          <slot
            class="checkboxes"
            @change=${this.#onCheckboxChange}
            @slotchange=${this.#onDefaultSlotChange}
            ${ref(this.#defaultSlotElementRef)}
          ></slot>
        </div>

        <slot id="description" name="description" slot="description"></slot>
      </glide-core-private-label>
    </div>`;
  }

  reportValidity() {
    this.isReportValidityOrSubmit = true;

    const isValid = this.#internals.reportValidity();

    // Ensures that getters referencing this.validity?.valid update (i.e. #isShowValidationFeedback)
    this.requestUpdate();

    return isValid;
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
      // 2. a call to reportValidity that did NOT result from the input blur event
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
  private isReportValidityOrSubmit = false;

  #componentElementRef = createRef<HTMLDivElement>();

  #defaultSlotElementRef = createRef<HTMLSlotElement>();

  #internals: ElementInternals;

  #isDisabled = false;

  #isRequired = false;

  get #checkboxes() {
    return this.#defaultSlotElementRef.value
      ? this.#defaultSlotElementRef.value
          .assignedElements()
          .filter((element): element is GlideCoreCheckbox => {
            return element instanceof GlideCoreCheckbox;
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

  #onBlur() {
    for (const checkbox of this.#checkboxes) {
      checkbox.isReportValidityOrSubmit = true;
    }
  }

  #onCheckboxBlur(event: FocusEvent) {
    const newlyFocusedElement = event.relatedTarget;

    if (
      !newlyFocusedElement ||
      !(newlyFocusedElement instanceof GlideCoreCheckbox) ||
      !this.#checkboxes.includes(newlyFocusedElement)
    ) {
      this.#onBlur();
    }
  }

  #onCheckboxChange() {
    this.value = this.#checkboxes
      .filter(({ checked, disabled }) => checked && !disabled)
      .map(({ value }) => value)
      // Disabled because simply filtering by `Boolean` doesn't narrow the type.
      // eslint-disable-next-line unicorn/prefer-native-coercion-functions
      .filter((value): value is string => Boolean(value));
  }

  #onDefaultSlotChange() {
    owSlot(this.#defaultSlotElementRef.value);
    owSlotType(this.#defaultSlotElementRef.value, [GlideCoreCheckbox]);
  }
}
