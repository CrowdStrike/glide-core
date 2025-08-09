import { html, LitElement } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property } from 'lit/decorators.js';
import packageJson from '../package.json' with { type: 'json' };
import assertSlot from './library/assert-slot.js';
import styles from './menu.styles.js';
import shadowRootMode from './library/shadow-root-mode.js';
import final from './library/final.js';
import Menu from './menu.js';
import Option from './option.js';
import Options from './options.js';
import OptionsGroup from './options.group.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-select': Select;
  }
}

// TODO: add visual test for slot="content"
// TODO: change set for "slotchange", "disabled", "enabled", etc.

/**
 * @attr {boolean} [disabled=false]
 * @attr {boolean} [loading=false]
 * @attr {string} [name='']
 * @attr {number} [offset=4]
 * @attr {boolean} [open=false]
 * @attr {'bottom'|'left'|'right'|'top'|'bottom-start'|'bottom-end'|'left-start'|'left-end'|'right-start'|'right-end'|'top-start'|'top-end'} [placement='bottom-start'] - Select will try to move itself to the opposite of this value if not doing so would result in overflow. For example, if "bottom" results in overflow Menu will try "top" but not "right" or "left".
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
 * @method formAssociatedCallback
 * @method formResetCallback
 */
@customElement('glide-core-select')
@final
export default class Select extends LitElement {
  static formAssociated = true;

  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: shadowRootMode,
  };

  static override styles = styles;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ reflect: true, type: Boolean })
  loading = false;

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

  @property({ type: Array })
  value: string[] = [];

  @property({ reflect: true })
  readonly version: string = packageJson.version;

  get form(): HTMLFormElement | null {
    return this.#internals.form;
  }

  override createRenderRoot() {
    this.#shadowRoot = super.createRenderRoot() as ShadowRoot;
    return this.#shadowRoot;
  }

  override firstUpdated() {
    const options = this.querySelector('glide-core-options');

    if (options) {
      options.role = 'listbox';
    }

    if (this.open && this.#menuElementRef.value) {
      // TODO: say why. slight delay with submenus
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
          this.value = [option.value];
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
        ${assertSlot([Element])}
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

  constructor() {
    super();
    this.#internals = this.attachInternals();
  }

  #defaultSlotElementRef = createRef<HTMLSlotElement>();

  #internals: ElementInternals;

  #isOpen = false;

  #isTargetClickViaEnter = false;

  #menuElementRef = createRef<Menu>();

  #offset: number | undefined;

  #shadowRoot?: ShadowRoot;

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

    if (event.target instanceof Option && !event.target.selected) {
      if (this.#optionElements) {
        for (const option of this.#optionElements) {
          if (option.selected) {
            option.selected = false;
          }
        }
      }

      if (this.#menuElementRef.value) {
        // Menu waits a tick or so before closing after an Option is clicked to give its
        // consumers a chance to cancel the event and prevent Menu from closing.
        //
        // When `selected` is set below, the Option will rerender to include a checkmark.
        // If the Option has a sub-Menu, the Option will also move its sub-Menu target so
        // it's to the left of the checkmark.
        //
        // Because Menu doesn't close immediately, the user will see the checkmark suddenly
        // appear and the sub-Menu's target change move moments before Menu is closes.
        //
        // So, to avoid that, we close Menu ourselves before setting `selected`.
        this.#menuElementRef.value.open = false;
      }

      event.target.selected = true;
      this.value = [event.target.value];

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
    this.value = [];
  }

  #onDefaultSlotDisabled(event: Event) {
    if (event.target instanceof Option && event.target.selected) {
      // TODO: say why
      event.target.selected = false;
    }
  }

  #onDefaultSlotSelected(event: Event) {
    if (event.target instanceof Option && this.#optionElements) {
      for (const option of this.#optionElements) {
        if (option !== event.target) {
          option.selected = false;
        }
      }

      this.value = [event.target.value];
    }
  }

  #onDefaultSlotSlotChange() {
    const selectedOptions =
      this.#optionElements &&
      this.#optionElements.filter(({ selected }) => selected);

    if (selectedOptions && selectedOptions.length > 1) {
      throw new Error('Only one option may be selected at a time.');
    }

    const selectedOption = selectedOptions?.at(0);

    if (selectedOption) {
      this.value = [selectedOption.value];
    }

    if (this.#optionElements) {
      for (const option of this.#optionElements) {
        option.role = 'option';
      }
    }
  }

  #onMenuToggle(event: Event) {
    if (
      event.target instanceof Menu &&
      event.target === this.#menuElementRef.value
    ) {
      this.open = event.target.open;
    }
  }

  #onTargetSlotClick(event: PointerEvent) {
    if (this.#isTargetClickViaEnter) {
      this.#isTargetClickViaEnter = false;
      event.preventDefault();
    }
  }

  #onTargetSlotKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !this.open) {
      this.#isTargetClickViaEnter = true;
      this.form?.requestSubmit();
    }
  }
}
