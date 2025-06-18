import { LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property, state } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { when } from 'lit/directives/when.js';
import { html, unsafeStatic } from 'lit/static-html.js';
import packageJson from '../package.json' with { type: 'json' };
import styles from './option.styles.js';
import assertSlot from './library/assert-slot.js';
import checkedIcon from './icons/checked.js';
import shadowRootMode from './library/shadow-root-mode.js';
import final from './library/final.js';
import uniqueId from './library/unique-id.js';
import Menu from './menu.js';
import Options from './options.js';
import required from './library/required.js';
import SplitButtonSecondaryButton from './split-button.secondary-button.js';

// TODO: throw if submenu or icon have slotted content but content slot does not?
// TODO: should option change click target to Option instead of an icon contained within?
// TODO: only render submenu slot when role is not "option"
// TODO: only render checkmark when role is "option"
// TODO: throw if not ancestor or Select or Menu

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-option': Option;
  }
}

/**
 * @attr {string} label
 * @attr {string} [aria-activedescendant='']
 * @attr {string} [aria-labelledby='']
 * @attr {boolean} [disabled=false]
 * @attr {string} [href]
 *
 * @readonly
 * @attr {string} [id]
 *
 * @readonly
 * @attr [role]
 *
 * @attr {boolean} [selected=false]
 *
 * @readonly
 * @attr {number} [tabindex=-1]
 *
 * @attr {string} [value='']
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {Element | Text} [content]
 * @slot {Element} [icon]
 * @slot {Menu} [submenu]
 */
@customElement('glide-core-option')
@final
export default class Option extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: shadowRootMode,
  };

  static override styles = styles;

  @property({ reflect: true })
  @required
  label?: string;

  @property({
    attribute: 'aria-activedescendant',
    reflect: true,
    useDefault: true,
  })
  ariaActivedescendant = '';

  @property({ attribute: 'aria-labelledby', reflect: true, useDefault: true })
  ariaLabelledby = '';

  /**
   * @default false
   */
  @property({ type: Boolean, useDefault: true })
  get disabled(): boolean {
    return this.#isDisabled;
  }

  set disabled(isDisabled: boolean) {
    this.#isDisabled = isDisabled;
    this.dispatchEvent(new Event('private-disabled-change', { bubbles: true }));
  }

  @property({ reflect: true })
  href?: string;

  // On the host instead of inside the shadow DOM so screenreaders can find it
  // when Menu Options uses it with `aria-activedescendant`.
  @property({ reflect: true })
  override readonly id: string = uniqueId();

  @property({ type: Boolean, useDefault: true })
  privateActive = false;

  // TODO: rework this comment. also say it's done here instead of in Select:
  // more or less the same except this way it's readonly
  //
  // Effectively read-only because this component can't be used outside Menu or
  // Select. We throw in `connectedCallback()` if it's used outside of Options.
  // And Options throws if it's used outside of Menu or Select.
  //
  // If people have a use for Option outside of Menu or Select, we want them to
  // talk to us so we can understand their use case.
  @property({ reflect: true })
  override get role() {
    // TODO: handle case where parent is a slot
    // First parent is Options.
    return this.parentElement?.parentElement instanceof Menu ||
      this.parentElement instanceof SplitButtonSecondaryButton
      ? 'menuitem'
      : 'option';
  }

  @property({ attribute: 'tabindex', reflect: true, type: Number })
  override readonly tabIndex = -1;

  @property({ type: Boolean, useDefault: true })
  selected = false;

  @property({ reflect: true, useDefault: true })
  value = '';

  @property({ reflect: true })
  readonly version: string = packageJson.version;

  @state()
  private get lastSelectedAndEnabledOption(): Option | undefined {
    const options = this.parentElement?.querySelectorAll('glide-core-option');

    if (options && options.length > 0) {
      return [...options].findLast(
        (option) => option.selected && !option.disabled,
      );
    }
  }

  override click() {
    if (!this.disabled) {
      this.#componentElementRef.value?.click();
    }
  }

  override connectedCallback() {
    super.connectedCallback();

    if (this.href !== undefined && this.role === 'option') {
      throw new Error("Links aren't valid in a Select.");
    }

    // TODO: slot check needed?
    const parentElement =
      this.parentElement instanceof HTMLSlotElement
        ? this.parentElement.parentElement
        : this.parentElement;

    const isChildOfOptions = parentElement instanceof Options;

    const isChildOfSplitButtonSecondaryButton =
      parentElement instanceof SplitButtonSecondaryButton;

    // TODO: explain why not throwing in tests. would mean wrapping all markup in Options and Menu or Select
    // this does mean that throw here is untestable.
    // TODO: this won't fly with
    if (
      !isChildOfOptions &&
      !isChildOfSplitButtonSecondaryButton &&
      !window.navigator.webdriver
    ) {
      throw new Error(
        "Option is only meant for use in Options. Please talk to us if Menu or Select doesn't meet your needs.",
      );
    }
  }

  override render() {
    const tag = this.href === undefined ? 'div' : 'a';

    // Both rules are disabled for the dynamic tag.
    /*
      eslint-disable lit/binding-positions, lit/no-invalid-html
    */
    return html`<${unsafeStatic(tag)}
      class=${classMap({
        component: true,
        active: this.privateActive,
        disabled: this.disabled,
        href: Boolean(this.href),
      })}
      href=${this.href}
      @click=${this.#onComponentClick}
      ${ref(this.#componentElementRef)}
    >
      <slot
        class=${classMap({
          'content-slot': true,
          fallback: !this.hasSlottedContent,
        })}
        name="content"
        @slotchange=${this.#onContentSlotChange}
        ${ref(this.#contentSlotElementRef)}
      >
        <!-- @type {Element | Text} -->

        <div class="icon-and-label">
          <slot name="icon" ${assertSlot([Element], true)}>
            <!-- @type {Element} -->
          </slot>

          ${this.label}
        </div>

        ${when(
          this.role === 'option' && this === this.lastSelectedAndEnabledOption,
          () => {
            return html`<div class="checked-icon-container">
              ${checkedIcon}
            </div>`;
          },
        )}
        ${when(this.role === 'menuitem', () => {
          return html`<slot
            class=${classMap({
              'submenu-slot': true,
              disabled: this.disabled,
            })}
            name="submenu"
            ${assertSlot([Menu], true)}
          >
            <!-- @type {Menu} -->
          </slot>`;
        })}
      </slot>
    </${unsafeStatic(tag)}>`;
  }

  override updated() {
    // `this.ariaSelected` needs to be updated whenever `this.disabled`, `this.selected`,
    // or `this.href` change.
    //
    // It's set here to avoid creating a getter and setter for each of those properties and
    // and to deduplicate the logic.
    this.ariaSelected =
      this.role === 'option' && this === this.lastSelectedAndEnabledOption
        ? 'true'
        : this.role === 'option'
          ? 'false'
          : null;
  }

  @state()
  private hasSlottedContent = false;

  #componentElementRef = createRef<HTMLElement>();

  #contentSlotElementRef = createRef<HTMLSlotElement>();

  #isDisabled = false;

  #onComponentClick(event: Event) {
    if (this.disabled) {
      // TODO: say why cancel
      // event.preventDefault();

      // Consumers listen for "click" events to know when an option is selected.
      // Letting this propagate would result in a false positive event bubbling
      // up to the consumer. It would also get picked up by Menu and Menu would
      // close.
      event.stopPropagation();

      return;
    }

    const isComponentClick = Boolean(
      event.target === this.#componentElementRef.value,
    );

    const isTargetClick = Boolean(
      event.target instanceof Element &&
        event.target.closest('[slot="target"]'),
    );

    // Consumers rely on an option's `value` property to determine which option
    // was clicked. Options, however, can have an icon or arbitrary content. So
    // `event.target` may not be the option itself. Stoping the event and calling
    // `click()` on `this.#componentElementRef.value` means consumers don't have
    // to call `event.target.closest('glide-core-option)` to get an option's `value`.
    //
    // `this.#componentElementRef.value.click()` instead of `this.click()` so the
    // anchor navigates as expected.
    //
    // `!isTargetClick` because Menu needs to know if a target was clicked to avoid
    // closing itself.
    if (
      !isComponentClick &&
      !isTargetClick &&
      this.#componentElementRef.value
    ) {
      event.stopImmediatePropagation();
      event.stopPropagation();

      if (this.href) {
        event.preventDefault();
      }

      this.#componentElementRef.value.click();
    }
  }

  #onContentSlotChange(event: Event) {
    if (event.target === this.#contentSlotElementRef.value) {
      this.hasSlottedContent =
        this.#contentSlotElementRef.value.assignedNodes().length > 0;
    }
  }
}
