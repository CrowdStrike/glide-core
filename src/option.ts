import { LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property, state } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { when } from 'lit/directives/when.js';
import { html, unsafeStatic } from 'lit/static-html.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import packageJson from '../package.json' with { type: 'json' };
import styles from './option.styles.js';
import assertSlot from './library/assert-slot.js';
import checkedIcon from './icons/checked.js';
import final from './library/final.js';
import uniqueId from './library/unique-id.js';
import Menu from './menu.js';
import './options.js';
import './checkbox.js';
import Tooltip from './tooltip.js';
import required from './library/required.js';

// TODO: handle case where `multiple` and `href` are both set
// TODO: stop propagation (and test) of input and change events from checkbox

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-option': Option;
  }
}

/**
 * @attr {string} label
 * @attr {string} [description]
 * @attr {boolean} [disabled=false]
 * @attr {string} [href]
 *
 * @readonly
 * @attr {string} [id]
 *
 * @attr {boolean} [multiple=false]
 * @attr {'menuitem'|'option'} [role='menuitem']
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
 * @slot {Element | Text} [content] - This is the unhappy path. It's the escape hatch where you can render arbitrary content and lay it out however you need to. If you go this route, `slot="icon"` and `slot="submenu"` will become unavailable. And the `label` and `description` attributes won't be rendered. The `label` attribute is still required. We'll show it in a tooltip when your content overflows. If you need a second line of text in the tooltip, provide you can provide it via the `description` attribute.
 * @slot {Element} [icon]
 * @slot {Menu} [submenu]
 *
 * @fires {Event} click
 * @fires {Event} deselected
 * @fires {Event} disabled
 * @fires {Event} enabled
 * @fires {Event} selected
 */
@customElement('glide-core-option')
@final
export default class Option extends LitElement {
  /* c8 ignore start */
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: window.navigator.webdriver ? 'open' : 'closed',
  };
  /* c8 ignore end */

  static override styles = styles;

  // Consumers may chose not to take the happy path and instead use the "content"
  // slot. In that case, we don't render `label`. But `label` still needs to be
  // supplied so we can pass it to Tooltip. That's why it's required.
  /**
   * @default undefined
   */
  @property({ reflect: true })
  @required
  get label(): string | undefined {
    return this.#label;
  }

  set label(label: string) {
    this.#label = label;

    // Wait for the label to render. A rerender won't be scheduled by Lit until after
    // this setter finishes. So awaiting `this.updateComplete` won't fly.
    setTimeout(() => {
      this.#updateContentSlotOverflow();
    });
  }

  /**
   * @default undefined
   */
  @property({ reflect: true })
  get description(): string | undefined {
    return this.#description;
  }

  set description(description: string) {
    this.#description = description;

    // Wait for the description to render. A rerender won't be scheduled by Lit until
    // after this setter finishes. So awaiting `this.updateComplete` won't fly.
    setTimeout(() => {
      this.#updateContentSlotOverflow();
    });
  }

  /**
   * @default false
   */
  @property({ reflect: true, type: Boolean, useDefault: true })
  get disabled(): boolean {
    return this.#isDisabled;
  }

  set disabled(isDisabled: boolean) {
    const hasChanged = isDisabled !== this.#isDisabled;

    this.#isDisabled = isDisabled;
    this.ariaDisabled = isDisabled ? 'true' : 'false';

    if (hasChanged && isDisabled) {
      this.dispatchEvent(new Event('disabled', { bubbles: true }));
    } else if (hasChanged) {
      this.dispatchEvent(new Event('enabled', { bubbles: true }));
    }
  }

  @property({ reflect: true })
  href?: string;

  // On the host so screenreaders can find it when Options refers to it via
  // `aria-activedescendant`.
  @property({ reflect: true })
  override readonly id: string = uniqueId();

  @property({ reflect: true, type: Boolean })
  multiple = false;

  @property({ type: Boolean, useDefault: true })
  get privateActive() {
    return this.#isActive;
  }

  set privateActive(isActive: boolean) {
    this.#isActive = isActive;

    // Options are arbitrarily shown and hidden when Menu is opened and closed. So
    // calling the below method in the `label` or `description` setters isn't enough
    // because `scrollWidth` and `clientWidth` of the `label` and `description` will
    // both be zero until Menu is open. Rather than expose a pseudo-private method for
    // Menu to call on open, we simply check for overflow when an Option becomes
    // active. But first we wait a tick for Menu to open.
    setTimeout(() => {
      this.#updateContentSlotOverflow();
    });
  }

  @property({ type: Boolean })
  privateTooltipOpen = false;

  @property({ reflect: true })
  override role: 'menuitem' | 'option' = 'menuitem';

  /**
   * @default false
   */
  @property({ type: Boolean })
  get selected(): boolean {
    return this.#isSelected;
  }

  set selected(isSelected: boolean) {
    const hasChanged = isSelected !== this.#isSelected;

    this.ariaSelected = isSelected.toString();
    this.#isSelected = isSelected;

    if (hasChanged && isSelected) {
      this.dispatchEvent(
        new Event('selected', {
          bubbles: true,
        }),
      );
    } else if (hasChanged) {
      this.dispatchEvent(
        new Event('deselected', {
          bubbles: true,
        }),
      );
    }
  }

  @property({ attribute: 'tabindex', reflect: true, type: Number })
  override readonly tabIndex = -1;

  @property({ reflect: true, useDefault: true })
  value = '';

  @property({ reflect: true })
  readonly version: string = packageJson.version;

  override click() {
    // You'd think this condition wouldn't be needed because `#onTooltipClick()` has a
    // `this.disabled` condition that stops propagation of the event. But Menu's
    // `#onDocumentClick()` handles "click" events in their capture phase, which means
    // that handler will pick up the event and close Menu before `#onTooltipClick()`
    // has stopped it from propagating. So we have to avoid dispatching the event
    // altogether.
    if (!this.disabled && this.multiple) {
      this.#checkboxElementRef.value?.click();
    } else if (!this.disabled) {
      this.#tooltipElementRef.value?.click();
    }
  }

  override connectedCallback() {
    super.connectedCallback();

    this.ariaDisabled = this.disabled.toString();
  }

  override render() {
    const tag = this.href === undefined || this.role === 'option' ? 'div' : 'a';

    // We have a "content" slot instead of the usual default slot because whitespace
    // in a slot will prevent the slot from falling back.
    //
    // So even a single stray space in the default slot will take the consumer off the
    // happy path and prevent the `label` and `description` attributes, as well as the
    // "icon" and "submenu" slots, from rendering.
    //
    // More importantly, even if the consumer doesn't have stray whitespace in the
    // default slot, but provides "icon" or "submenu" slots, then whitespace will
    // necessarily be introduced into the default slot via the whitespace around that
    // content. And neither the "icon" or "default" slots nor the `label` or
    // `description` attributes will be rendered.
    //
    // A slot dedicated to arbitrary content is the only way we can avoid these false
    // positives.

    // Both rules are disabled because of `unsafeStatic()`.
    /*
      eslint-disable lit/binding-positions, lit/no-invalid-html
    */
    return html`
      <glide-core-tooltip
        class="tooltip"
        data-test="tooltip"
        description=${ifDefined(this.description)}
        label=${ifDefined(this.label)}
        screenreader-hidden
        ?disabled=${!this.isContentSlotOverflow || this.disabled}
        ?open=${this.privateTooltipOpen}
        @click=${this.#onTooltipClick}
        @toggle=${this.#onTooltipToggle}
        ${ref(this.#tooltipElementRef)}>

        <${unsafeStatic(tag)}
          class=${classMap({
            container: true,
            active: this.privateActive,
            disabled: this.disabled,
            href: Boolean(this.href),
          })}
          data-test="container"
          href=${ifDefined(tag === 'a' ? this.href : undefined)}
          slot="target"
          ${ref(this.#containerElementRef)}
        >
          <slot
            class=${classMap({
              'content-slot': true,
              fallback: !this.hasContentSlot,
              icon: this.hasIconSlot,
              multiple: this.multiple,
              selected: this.selected && this.role === 'option',
              submenu: this.hasSubMenuSlot,
            })}
            data-test="content-slot"
            name="content"
            @slotchange=${this.#onContentSlotChange}
            ${ref(this.#contentSlotElementRef)}
          >
            <!--
              This is the unhappy path. It's the escape hatch where you can render arbitrary
              content and lay it out however you need to.

              If you go this route, \`slot="icon"\` and \`slot="submenu"\` will become
              unavailable. And the \`label\` and \`description\` attributes won't be rendered.

              The \`label\` attribute is still required. We'll show it in a tooltip when your
              content overflows. If you need a second line of text in the tooltip, provide you
              can provide it via the \`description\` attribute.

              @type {Element | Text}
            -->

            <slot
              data-test="icon-slot"
              name="icon"
              @slotchange=${this.#onIconSlotChange}
              ${assertSlot([Element], true)}
            >
              <!-- @type {Element} -->
            </slot>

            ${when(
              this.multiple,
              () => {
                return html`
                  <div class="checkbox">
                    <glide-core-checkbox
                      label=${ifDefined(this.label)}
                      hide-label
                      .checked=${this.selected}
                      ?disabled=${this.disabled}
                      @click=${this.#onCheckboxClick}
                      ${ref(this.#checkboxElementRef)}
                    ></glide-core-checkbox>

                    <span aria-hidden="true"> ${this.label} </span>
                  </div>
                `;
              },
              () => {
                return html`<div
                  class=${classMap({
                    label: true,
                    bold: Boolean(this.description),
                  })}
                  ${ref(this.#labelElementRef)}
                >
                  ${this.label}
                </div>`;
              },
            )}


            <slot
              class=${classMap({
                'submenu-slot': true,
                active: this.privateActive,
                disabled: this.disabled,
                open: this.isSubmenuOpen,
              })}
              data-test="submenu-slot"
              name="submenu"
              @slotchange=${this.#onSubmenuSlotChange}
              @toggle=${this.#onSubmenuToggle}
              ${assertSlot([Menu], true)}
            >
              <!-- @type {Menu} -->
            </slot>

            ${when(
              !this.multiple &&
                this.selected &&
                !this.disabled &&
                this.role === 'option',
              () => {
                return html`<div
                  class="checked-icon-container"
                  data-test="checked-icon-container"
                >
                  ${checkedIcon}
                </div>`;
              },
            )}

            ${when(this.description, () => {
              return html`
                <div
                  class=${classMap({
                    description: true,
                    icon: this.hasIconSlot,
                  })}
                  data-test="description"
                  ${ref(this.#descriptionElementRef)}
                >
                  ${this.description}
                </div>
              `;
            })}
          </slot>
        </${unsafeStatic(tag)}>
      </glide-core-tooltip>
    `;
  }

  override updated() {
    // `this.ariaSelected` needs updating whenever `this.disabled`, `this.selected`, or
    // `this.role` changes.
    //
    // It's updated here to avoid creating a getter and setter for each of those
    // properties.
    this.ariaSelected =
      this.selected && this.role === 'option' && !this.disabled
        ? 'true'
        : this.role === 'option'
          ? 'false'
          : null;
  }

  @state()
  private hasContentSlot = false;

  @state()
  private hasIconSlot = false;

  @state()
  private hasSubMenuSlot = false;

  @state()
  private isContentSlotOverflow = false;

  // Set in `#onSubmenuToggle()`. Used to toggle the sub-Menu's target as open or
  // closed visually.
  @state()
  private isSubmenuOpen = false;

  #checkboxElementRef = createRef<HTMLInputElement>();

  #containerElementRef = createRef<HTMLElement>();

  #contentSlotElementRef = createRef<HTMLSlotElement>();

  #description?: string;

  #descriptionElementRef = createRef<HTMLElement>();

  #isActive = false;

  #isDisabled = false;

  #isSelected = false;

  #label?: string;

  #labelElementRef = createRef<HTMLElement>();

  #tooltipElementRef = createRef<HTMLElement>();

  get #contentSlotElements() {
    // These are the elements that are checked for overflow in
    // `#updateContentSlotOverflow()`.
    //
    // The slot fallback case is straightforward. And simply returning its assigned
    // elements is  sufficient. With the non-fallback case, however, consumers give us
    // arbitrary markup. So it may not be to the assigned element that's overflowing.
    // Instead, One or more children of the assigned element may be overflowing.
    //
    // For example, the assigned element might be DIV. And that DIV might contain an
    // icon and another DIV with some text. In this case, it's the nested DIV that's
    // likely to overflow, similar to how this slot's fallback content has an icon with
    // a DIV that can overflow.
    //
    // Thus we query for every element.
    if (this.#contentSlotElementRef.value) {
      return [
        ...this.#contentSlotElementRef.value.assignedElements({
          flatten: true,
        }),
      ].flatMap((element) => [element, ...element.querySelectorAll('*')]);
    }
  }

  #onCheckboxClick(event: Event) {
    event.stopPropagation();

    // TODO: say why. so consumers of option who cancel the event to prevent
    // Menu from closing don't stop the checkbox from being clicked.
    this.dispatchEvent(
      new Event('click', { bubbles: true, cancelable: true, composed: true }),
    );
  }

  #onContentSlotChange(event: Event) {
    if (event.target === this.#contentSlotElementRef.value) {
      this.hasContentSlot =
        this.#contentSlotElementRef.value.assignedNodes().length > 0;
    }

    this.#updateContentSlotOverflow();
  }

  #onIconSlotChange(event: Event) {
    if (event.target instanceof HTMLSlotElement) {
      this.hasIconSlot = event.target.assignedElements().length > 0;
    }
  }

  #onSubmenuSlotChange(event: Event) {
    if (event.target instanceof HTMLSlotElement) {
      this.hasSubMenuSlot = event.target.assignedElements().length > 0;
    }
  }

  #onSubmenuToggle(event: Event) {
    const isOwnSubmenu =
      this.querySelector(':scope > glide-core-menu') === event.target;

    // Nested sub-Menus can be opened or closed and the target of the Option's
    // own sub-Menu shouldn't change visually. As long as the Option's own
    // sub-Menu is open, the sub-Menu's target should appear open. Similar for
    // when a nested sub-Menu is closed.
    if (isOwnSubmenu && event.target instanceof Menu && event.target.open) {
      this.isSubmenuOpen = true;
    } else if (isOwnSubmenu) {
      this.isSubmenuOpen = false;
    }
  }

  #onTooltipClick(event: Event) {
    if (this.disabled) {
      if (this.href) {
        event.preventDefault();
      }

      // Consumers listen for "click" events to know when an Option is selected. Letting
      // the event propagate would result in a false positive event bubbling up to the
      // consumer. It would also get picked up by Menu, which would close.
      event.stopPropagation();

      return;
    }

    const isTooltipClick = Boolean(
      event.target === this.#tooltipElementRef.value,
    );

    const isContainerClick = Boolean(
      event.target === this.#containerElementRef.value,
    );

    const isTargetClick = Boolean(
      event.target instanceof Element &&
        event.target.closest('[slot="target"]'),
    );

    const isSubmenuOption =
      event.target instanceof Element &&
      event.target.closest('glide-core-option') !== this;

    // Consumers rely on an Option's `value` property to determine which Option was
    // clicked. Options, however, can have an icon or arbitrary content. So
    // `event.target` may not always be the Option itself.
    //
    // Stopping the event and calling `this.click()` retargets `event.target` to the
    // Option, which means consumers don't have to call `closest('glide-core-option')`
    // on `event.target` in their click handler to get the Option before checking its
    // `value`.
    //
    // `!isTooltipClick` because events that originate from inside the shadow DOM will
    // be retarged to the host for us by the browser. Same for `!isContainerClick`.
    //
    // `!isTargetClick` because Menu needs to know if a target of a sub-Menu was
    // clicked to avoid closing itself.
    //
    // `!isSubmenuOption` so we don't retarget sub-Menu Option clicks to their super-
    // Menu Option.
    if (
      !isTooltipClick &&
      !isContainerClick &&
      !isTargetClick &&
      !isSubmenuOption
    ) {
      event.stopImmediatePropagation();
      event.stopPropagation();

      if (this.href) {
        event.preventDefault();
      }

      this.click();

      return;
    }
  }

  #onTooltipToggle(event: Event) {
    if (event.target instanceof Tooltip) {
      // Menu dispatches its own "toggle" event. Letting Tooltip's "toggle" event
      // propagate would mean that consumers listening for the event on Menu would have
      // to filter out the one coming from Tooltip.
      //
      // But first they'll probably file a bug. It's likely no consumer will be
      // interested in knowing when an Option's tooltip is open. So it's probably best to
      // stop the event from propagating.
      event.stopPropagation();
    }
  }

  #updateContentSlotOverflow() {
    const isContentSlotOverflow =
      this.#contentSlotElements !== undefined &&
      this.#contentSlotElements.some((element) => {
        return element.scrollWidth > element.clientWidth;
      });

    this.isContentSlotOverflow = isContentSlotOverflow;
  }
}
