import { html, LitElement } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
import packageJson from '../package.json' with { type: 'json' };
import assertSlot from './library/assert-slot.js';
import styles from './menu.styles.js';
import final from './library/final.js';
import Menu from './menu.js';
import Option from './option.js';
import Options from './options.js';
import OptionsGroup from './options.group.js';
import type FormControl from './library/form-control.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-select': Select;
  }
}

/**
 * @attr {boolean} [disabled=false]
 * @attr {boolean} [loading=false]
 * @attr {boolean} [multiple]
 * @attr {string} [name='']
 * @attr {number} [offset=4]
 * @attr {boolean} [open=false]
 * @attr {'bottom'|'left'|'right'|'top'|'bottom-start'|'bottom-end'|'left-start'|'left-end'|'right-start'|'right-end'|'top-start'|'top-end'} [placement='bottom-start'] - Select will try to move itself to the opposite of this value if not doing so would result in overflow. For example, if "bottom" results in overflow Menu will try "top" but not "right" or "left".
 * @attr {boolean} [required=false]
 * @attr {string[]} [value=[]]
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {Element}
 * @slot {Element} target - The element to which Select will anchor. Can be any focusable element. If you want Select to be filterable, put an Input in this slot. Listen for Input's "input" event, then add and remove Option(s) from Select's default slot based on Input's value.
 *
 * @fires {Event} change
 * @fires {Event} input
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
 * @method setValidity
 * @param {ValidityStateFlags} [flags]
 */
@customElement('glide-core-select')
@final
export default class Select
  extends LitElement
  implements
    Omit<
      FormControl,
      | 'hideLabel'
      | 'orientation'
      | 'resetValidityFeedback'
      | 'setCustomValidity'
    >
{
  static formAssociated = true;

  /* v8 ignore start */
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: window.navigator.webdriver ? 'open' : 'closed',
  };
  /* v8 ignore end */

  static override styles = styles;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ reflect: true, type: Boolean })
  loading = false;

  /**
   * @default
   */
  @property({ reflect: true, type: Boolean })
  get multiple(): boolean {
    return this.#isMultiple;
  }

  set multiple(isMultiple: boolean) {
    this.#isMultiple = isMultiple;

    if (this.#optionElements) {
      for (const option of this.#optionElements) {
        option.multiple = isMultiple;
      }
    }
  }

  @property({ reflect: true, useDefault: true })
  name = '';

  /**
   * @default 4
   */
  @property({ reflect: true, type: Number })
  get offset(): number {
    return (
      this.#offset ??
      Number.parseFloat(
        window
          .getComputedStyle(document.body)
          .getPropertyValue('--glide-core-spacing-base-xxs'),
      ) *
        Number.parseFloat(
          window.getComputedStyle(document.documentElement).fontSize,
        )
    );
  }

  /* v8 ignore start */
  set offset(offset: number) {
    this.#offset = offset;
  }
  /* v8 ignore end */

  /**
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  get open(): boolean {
    return this.#isOpen;
  }

  set open(isOpen: boolean) {
    this.#isOpen = isOpen;

    if (this.#menuElementRef.value) {
      this.#menuElementRef.value.open = isOpen;
    }
  }

  /**
   * Select will try to move itself to the opposite of this value if not doing so would result in overflow.
   * For example, if "bottom" results in overflow Menu will try "top" but not "right" or "left".
   */
  @property({ reflect: true, useDefault: true })
  placement:
    | 'bottom'
    | 'left'
    | 'right'
    | 'top'
    | 'bottom-start'
    | 'bottom-end'
    | 'left-start'
    | 'left-end'
    | 'right-start'
    | 'right-end'
    | 'top-start'
    | 'top-end' = 'bottom-start';

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

  /**
   * @default []
   */
  @property({ type: Array })
  get value(): string[] {
    return this.#value;
  }

  set value(value: string[]) {
    if (!this.multiple && value.length > 1) {
      throw this.#tooManySelectedOptionsError;
    }

    this.#value = value;

    if (this.#optionElements) {
      for (const option of this.#optionElements) {
        this.#isSelectionFromValueSetter = true;
        option.selected = false;
        this.#isSelectionFromValueSetter = false;
      }
    }

    for (const value$ of value) {
      const option = this.#optionElements?.find(
        (option) => option.value === value$,
      );

      if (option) {
        this.#isSelectionFromValueSetter = true;
        option.selected = true;
        this.#isSelectionFromValueSetter = false;
      }
    }

    this.#setValidity();
  }

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

  override firstUpdated() {
    const options = this.querySelector('glide-core-options');

    if (options) {
      options.role = 'listbox';
    }

    const hasNoSelectedOptions = this.#optionElements?.every(
      ({ selected }) => !selected,
    );

    // When `value` is set on initial render, its setter is called before
    // `connectedCallback()` and thus before the default slot has any assigned
    // elements. So we select options here after the initial render is complete
    // and `this.#optionElements` isn't empty.
    //
    // Additionally, `#onDefaultSlotSlotChange()` is called after `firstUpdated()`
    // and sets `value` based on which options are selected. And the initial `value`
    // may conflict with the one derived from which options are selected.
    //
    // So we have a decision to make. On first render, do we defer to the initial
    // `value` and select and deselect options below? Or do we defer to
    // `#onDefaultSlotSlotChange()` and let that method change `value` from its initial
    // value?
    //
    // It's largely a toss-up. But the latter seems like the logical choice given
    // `#onDefaultSlotSlotChange()` is called after `firstUpdated()`. In other words,
    // we defer to the lifecycle. `#onDefaultSlotSlotChange()` is called second. So
    // it gets to override what `value` was initially.
    //
    // If no options are selected, then it's obvious that the consumer's intention is
    // to select options based on the initial `value`. So we proceed.
    if (hasNoSelectedOptions) {
      if (!this.multiple && this.value.length > 1) {
        throw this.#tooManySelectedOptionsError;
      }

      for (const value of this.value) {
        const option = this.#optionElements?.find(
          (option) => option.value === value,
        );

        if (option) {
          option.selected = true;
        }
      }
    }

    if (this.open && this.#menuElementRef.value) {
      // Simply passing `this.open` to Menu in the template below would be more
      // convenient. But, when an attribute's value is an expression, Lit will set the
      // attribute on a slight delay, and that's a problem when a sub-Menu is also
      // initially open because it means the sub-Menu wil be opened before the top-level
      // Menu. So the top-level Menu below will be positioned underneath the sub-Menu.
      this.#menuElementRef.value.open = true;
    }
  }

  formAssociatedCallback(): void {
    this.form?.addEventListener('formdata', this.#onFormdata);
  }

  formResetCallback(): void {
    if (this.#optionElements) {
      for (const option of this.#optionElements) {
        option.selected = option.hasAttribute('selected');

        if (option.selected) {
          this.#value = [option.value];
        }
      }
    }
  }

  override render() {
    // Lit-a11y doesn't know that we're not interested in certain keys being pressed.
    //
    /* eslint-disable lit-a11y/click-events-have-key-events */
    return html`<glide-core-menu
      offset=${this.offset}
      placement=${this.placement}
      ?loading=${this.loading}
      @toggle=${this.#onMenuToggle}
      ${ref(this.#menuElementRef)}
    >
      <slot
        name="target"
        slot="target"
        @click=${this.#onTargetSlotClick}
        @keydown=${this.#onTargetSlotKeyDown}
        @slotchange=${this.#onTargetSlotChange}
        ${assertSlot([Element])}
        ${ref(this.#targetSlotElementRef)}
      >
        <!--
          The element to which Select will anchor. Can be any focusable element.

          If you want Select to be filterable, put an Input in this slot. Listen for Input's
          "input" event, then add and remove Option(s) from Select's default slot based on
          Input's value.

          @required
          @type {Element}
        -->
      </slot>

      <slot
        @click=${this.#onDefaultSlotClick}
        @deselected=${this.#onDefaultSlotDeselected}
        @disabled=${this.#onDefaultSlotDisabled}
        @selected=${this.#onDefaultSlotSelected}
        @slotchange=${this.#onDefaultSlotSlotChange}
        ${ref(this.#defaultSlotElementRef)}
      >
        <!--
          @required
          @type {Element}
        -->
      </slot>
    </glide-core-menu>`;
  }

  reportValidity(): boolean {
    return this.#internals.reportValidity();
  }

  setValidity(flags?: ValidityStateFlags): void {
    this.#hasCustomValidity = true;

    this.#internals.setValidity(
      flags,
      ' ',

      // `setValidity()` isn't typed for an SVG. But an SVG is valid as long as it's
      // focusable. Thus the cast.
      this.#targetElement as HTMLElement | undefined,
    );
  }

  get validity(): ValidityState {
    return this.#internals.validity;
  }

  constructor() {
    super();
    this.#internals = this.attachInternals();

    // Event handlers on the host aren't great because consumers can remove them.
    // Unfortunately, the host is the only thing on which this event is dispatched
    // because it's the host that is form-associated.
    this.addEventListener('invalid', (event) => {
      // Canceled so the native validation message isn't shown.
      event.preventDefault();

      if (this.isCheckingValidity) {
        return;
      }

      this.#hasEmittedAnInvalidEvent = true;

      const isFirstInvalidFormElement =
        this.form?.querySelector(':invalid') === this;

      if (isFirstInvalidFormElement) {
        // Canceling the event means the target won't get focus, even if we were to use
        // `delegatesFocus`. So we have to it focus manually.
        this.#targetElement?.focus();
      }

      if (this.#targetElement) {
        this.#targetElement.ariaInvalid = this.validity.valid
          ? 'false'
          : 'true';
      }
    });
  }

  @state()
  private isCheckingValidity = false;

  @state()
  private selectedOptions: Option[] = [];

  #defaultSlotElementRef = createRef<HTMLSlotElement>();

  #hasCustomValidity = false;

  #hasEmittedAnInvalidEvent = false;

  #internals: ElementInternals;

  #isMultiple = false;

  #isOpen = false;

  #isRequired = false;

  #isSelectionFromValueSetter = false;

  #isTargetClickViaEnter = false;

  #menuElementRef = createRef<Menu>();

  #offset: number | undefined;

  #targetSlotElementRef = createRef<HTMLSlotElement>();

  #tooManySelectedOptionsError = new Error(
    'Only one option may be selected at a time.',
  );

  #value: string[] = [];

  get #optionElements() {
    if (this.#optionsElement) {
      return [...this.#optionsElement.children]
        .filter((element) => {
          return element instanceof Option || element instanceof OptionsGroup;
        })
        .flatMap((element) => {
          return element instanceof OptionsGroup
            ? [
                ...element.querySelectorAll<Option>(
                  ':scope > glide-core-option',
                ),
              ]
            : element;
        });
    }
  }

  get #optionsElement() {
    const firstAssignedElement = this.#defaultSlotElementRef.value
      ?.assignedElements({ flatten: true })
      .at(0);

    return firstAssignedElement instanceof Options
      ? firstAssignedElement
      : null;
  }

  // An arrow function field instead of a method so `this` is closed over and
  // set to the component instead of the form.
  #onFormdata = ({ formData }: FormDataEvent) => {
    if (this.name && this.value.length > 0 && !this.disabled) {
      formData.append(this.name, JSON.stringify(this.value));
    }
  };

  #onDefaultSlotClick(event: Event) {
    const isSubMenuOption = this.#optionElements?.every(
      (option) => option !== event.target,
    );

    if (isSubMenuOption) {
      return;
    }

    if (this.multiple) {
      event.preventDefault();
    }

    if (event.target instanceof Option) {
      if (!this.multiple && !event.target.selected && this.#optionElements) {
        for (const option of this.#optionElements) {
          if (option.selected) {
            option.selected = false;
          }
        }
      }

      if (this.#menuElementRef.value && !this.multiple) {
        // Menu waits a tick or so before closing after an Option is clicked to give its
        // consumers a chance to cancel the event and prevent Menu from closing.
        //
        // When `selected` is set below, the Option will rerender to include a checkmark.
        // If the Option has a sub-Menu, the Option will also move its sub-Menu target so
        // it's to the left of the checkmark.
        //
        // Because Menu doesn't close immediately, the user will see the checkmark suddenly
        // appear and the sub-Menu's target move moments before Menu closes.
        //
        // To avoid all that, we close Menu ourselves before setting `selected`.
        this.#menuElementRef.value.open = false;
      }

      if (this.multiple && event.target.selected) {
        event.target.selected = false;

        this.selectedOptions = this.selectedOptions.filter(
          (option) => option !== event.target,
        );

        this.#value = this.selectedOptions.map(({ value }) => value);
      } else if (this.multiple) {
        this.selectedOptions.push(event.target);
        event.target.selected = true;
        this.#value = [...this.#value, event.target.value];
      } else {
        event.target.selected = true;
        this.#value = [event.target.value];
      }

      this.dispatchEvent(
        new Event('input', {
          bubbles: true,
          composed: true,
        }),
      );

      this.dispatchEvent(
        new Event('change', {
          bubbles: true,
          composed: true,
        }),
      );
    }
  }

  #onDefaultSlotDeselected() {
    if (this.#isSelectionFromValueSetter) {
      return;
    }

    this.#value = [];
    this.#setValidity();
  }

  #onDefaultSlotDisabled(event: Event) {
    if (event.target instanceof Option && event.target.selected) {
      event.target.selected = false;
    }
  }

  #onDefaultSlotSelected(event: Event) {
    if (this.#targetElement) {
      // The `label` of the selected Option(s) should actually be read before the label
      // or text content of the target. But we don't always know what the target's label
      // is because the target is an arbitrary element.
      //
      // For example, it could be a custom element without `textContent`. Button is like
      // this. Button doesn't have any `textContent` because nothing gets slotted into
      // it. Yet it is labeled.
      //
      // So the best we can do is set `ariaDescription`.
      this.#targetElement.ariaDescription = this.#optionElements
        ? this.#optionElements
            .filter(({ selected }) => selected)
            .map(({ label }) => label)
            .join(',')
        : '';
    }

    if (this.#isSelectionFromValueSetter) {
      return;
    }

    // TODO: what about multiple case?
    if (
      !this.multiple &&
      event.target instanceof Option &&
      this.#optionElements
    ) {
      for (const option of this.#optionElements) {
        if (option !== event.target) {
          option.selected = false;
        }
      }

      this.#value = [event.target.value];
    }

    this.#setValidity();
  }

  #onDefaultSlotSlotChange() {
    const selectedOptions =
      this.#optionElements &&
      this.#optionElements.filter(({ selected }) => selected);

    if (!this.multiple && selectedOptions && selectedOptions.length > 1) {
      throw this.#tooManySelectedOptionsError;
    }

    const selectedOption = selectedOptions?.at(0);

    if (selectedOption) {
      this.#value = [selectedOption.value];
    }

    if (this.#optionElements) {
      for (const option of this.#optionElements) {
        option.multiple = this.multiple;
        option.role = 'option';
      }
    }

    this.#setValidity();
  }

  #onMenuToggle(event: Event) {
    if (
      event.target instanceof Menu &&
      event.target === this.#menuElementRef.value
    ) {
      this.open = event.target.open;
    }
  }

  #onTargetSlotChange() {
    if (this.#targetElement) {
      this.#targetElement.ariaInvalid =
        !this.#hasEmittedAnInvalidEvent || this.validity.valid
          ? 'false'
          : 'true';
    }
  }

  #onTargetSlotClick(event: PointerEvent) {
    if (this.#isTargetClickViaEnter) {
      this.#isTargetClickViaEnter = false;
      event.preventDefault(); // Prevent Menu from opening.
    }
  }

  #onTargetSlotKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !this.open) {
      this.#isTargetClickViaEnter = true;
      this.form?.requestSubmit();
    }
  }

  #setValidity() {
    if (this.#hasCustomValidity) {
      return;
    }

    if (this.required && this.value.length === 0) {
      this.#internals.setValidity(
        { valueMissing: true },
        ' ',

        // `setValidity()` isn't typed for an SVG. But an SVG is valid as long as it's
        // focusable. Thus the cast.
        this.#targetElement as HTMLElement | undefined,
      );

      return;
    }

    this.#internals.setValidity({});
  }

  get #targetElement() {
    const element = this.#targetSlotElementRef.value
      ?.assignedElements({ flatten: true })
      .at(0);

    if (element instanceof HTMLElement || element instanceof SVGElement) {
      return element;
    }
  }
}
