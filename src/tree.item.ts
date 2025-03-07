import { html, LitElement, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { styleMap } from 'lit/directives/style-map.js';
import { when } from 'lit/directives/when.js';
import packageJson from '../package.json' with { type: 'json' };
import { LocalizeController } from './library/localize.js';
import GlideCoreTreeItemMenu from './tree.item.menu.js';
import './tree.item.icon-button.js';
import GlideCoreIconButton from './icon-button.js';
import chevronIcon from './icons/chevron.js';
import styles from './tree.item.styles.js';
import assertSlot from './library/assert-slot.js';
import shadowRootMode from './library/shadow-root-mode.js';
import final from './library/final.js';
import required from './library/required.js';
import './checkbox.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-tree-item': GlideCoreTreeItem;
  }
}

/**
 * @attr {string} label
 * @attr {boolean} [checkable=false]
 * @attr {boolean} [checked=false]
 * @attr {boolean} [expanded=false]
 * @attr {number} [level=1]
 * @attr {boolean} [non-collapsible=false]
 * @attr {boolean} [remove-indentation=false]
 * @attr {boolean} [selected=false]
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {GlideCoreTreeItem}
 * @slot {GlideCoreTreeItemMenu} [menu] - Visible on hover and focus
 * @slot {Element} [prefix] - An icon before the label
 * @slot {Element} [suffix] - An icon after the label
 *
 * @fires {Event} selected
 *
 * @method deselectAllExcept
 * @param {GlideCoreTreeItem} item
 */
@customElement('glide-core-tree-item')
@final
export default class GlideCoreTreeItem extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
    mode: shadowRootMode,
  };

  static override styles = styles;

  @property({ type: Boolean, reflect: true }) checkable = false;

  @property({ type: Boolean, reflect: true }) checked = false;

  @property({ reflect: true, type: Boolean }) expanded = false;

  @property({ reflect: true })
  @required
  label?: string;

  @property({ reflect: true, type: Number }) level = 1;

  /**
   * @default false
   */
  @property({ reflect: true, type: Boolean })
  get selected(): boolean {
    return this.#selected;
  }

  set selected(isSelected: boolean) {
    this.#selected = isSelected;

    if (isSelected) {
      this.dispatchEvent(
        new Event('selected', { bubbles: true, composed: true }),
      );
    }
  }

  @property({ reflect: true, type: Boolean, attribute: 'remove-indentation' })
  removeIndentation = false;

  @property({ reflect: true, type: Boolean, attribute: 'non-collapsible' })
  nonCollapsible = false;

  @property({ reflect: true })
  readonly version: string = packageJson.version;

  deselectAllExcept(item: GlideCoreTreeItem): void {
    if (this.#treeItemElements) {
      for (const treeItem of this.#treeItemElements) {
        if (item !== treeItem) {
          treeItem.selected = false;
        }

        treeItem.deselectAllExcept(item);
      }
    }
  }

  override focus(options?: FocusOptions) {
    this.#labelContainerElementRef.value?.focus(options);
    this.isFocused = true;
    this.#setChildTabIndexes(0);
  }

  get privateHasChildTreeItems() {
    return this.childTreeItems.length > 0;
  }

  private get hasExpandIcon() {
    return this.privateHasChildTreeItems && !this.nonCollapsible;
  }

  privateToggleExpand() {
    this.expanded = !this.expanded;
  }

  override render() {
    return html`<div
      aria-label=${ifDefined(this.label)}
      aria-selected=${ifDefined(this.selected)}
      aria-checked=${ifDefined(this.checked)}
      aria-expanded=${ifDefined(this.#ariaExpanded)}
      class=${classMap({
        component: true,
        expanded: this.expanded,
        selected: this.selected,
        checkable: this.checkable,
        checked: this.checked,
      })}
      data-test="component"
      role="treeitem"
    >
      <div
        class=${classMap({
          'parent-item': true,
          'interactive-container': !this.checkable,
          'prefix-icon': this.hasPrefixIcon,
          selected: this.selected,
          hovered: this.isHovered && !this.isExpandIconHovered,
        })}
        tabindex=${this.isFocused ? '0' : '-1'}
        @focusout=${this.#onFocusOut}
        @focusin=${this.#onFocusIn}
        @mouseenter=${() => (this.isHovered = true)}
        @mouseleave=${() => (this.isHovered = false)}
        @click=${this.checkable ? nothing : this.#onInteractiveContainerClick}
        @keydown=${this.checkable
          ? nothing
          : this.#onInteractiveContainerKeydown}
        ${ref(this.#labelContainerElementRef)}
      >
        <div
          style=${styleMap({
            flexShrink: 0,
            width: this.#indentationWidth,
          })}
        ></div>
        ${when(
          // By default, we indent the width of the expand icon even if the item
          // doesn't have children. This allows the sibling Tree Items' labels to
          // line up vertically if some have their own children and some don't.
          // Consumers can opt out of this behavior via `remove-indentation`.
          !this.removeIndentation || this.hasExpandIcon,
          () => html`
            <div
              class=${classMap({
                'expand-icon-container': true,
                expanded: this.expanded,
                selected: this.selected,
              })}
              @mouseenter=${() => (this.isExpandIconHovered = true)}
              @mouseleave=${() => (this.isExpandIconHovered = false)}
              @click=${this.#onExpandIconContainerClick}
              @keydown=${this.#onExpandIconContainerKeydown}
              data-test="expand-icon-container"
            >
              ${when(
                this.hasExpandIcon,
                () => html`
                  <glide-core-tree-item-icon-button
                    tabindex=${this.isFocused && !this.checkable ? '0' : '-1'}
                    label=${this.#localize.term(
                      this.expanded ? 'collapse' : 'expand',
                    )}
                    ${ref(this.#expandIconButtonElementRef)}
                  >
                    ${chevronIcon}
                  </glide-core-tree-item-icon-button>
                `,
              )}
            </div>
          `,
        )}
        ${when(
          this.checkable,
          () => html`
            <div class="checkbox-container">
              <glide-core-checkbox
                hide-label
                label="Check"
                .inert=${!this.isFocused && !this.isHovered}
                ${ref(this.#checkboxElementRef)}
              ></glide-core-checkbox>
            </div>
          `,
        )}

        <div
          class=${classMap({
            'label-and-icons': true,
            'interactive-container': this.checkable,
            selected: this.selected,
          })}
          tabindex=${this.checkable ? '0' : '-1'}
          .inert=${!this.isFocused && !this.isHovered}
          @click=${this.checkable ? this.#onInteractiveContainerClick : nothing}
          @keydown=${this.checkable
            ? this.#onInteractiveContainerKeydown
            : nothing}
          ${ref(this.#labelAndIconsElementRef)}
        >
          <slot
            name="prefix"
            class="prefix-slot"
            ${ref(this.#prefixSlotElementRef)}
            @slotchange=${this.#onPrefixSlotChange}
          >
            <!--
            An icon before the label
            @type {Element}
          -->
          </slot>

          <div
            class=${classMap({
              label: true,
              'prefix-icon': this.hasPrefixIcon,
            })}
          >
            ${this.label}
          </div>

          <div class="icon-container">
            <slot
              name="menu"
              ${ref(this.#menuSlotElementRef)}
              @slotchange=${this.#onMenuSlotChange}
              ${assertSlot([GlideCoreTreeItemMenu], true)}
            >
              <!--
              Visible on hover and focus
              @type {GlideCoreTreeItemMenu}
            -->
            </slot>

            <slot name="suffix">
              <!--
              An icon after the label
              @type {Element}
            -->
            </slot>
          </div>
        </div>
      </div>

      <div
        class=${classMap({
          'default-slot-container': true,
          expanded: this.expanded,
        })}
        role="group"
      >
        <slot
          @slotchange=${this.#onDefaultSlotChange}
          ${ref(this.#defaultSlotElementRef)}
        >
          <!-- @type {GlideCoreTreeItem} -->
        </slot>
      </div>
    </div>`;
  }

  @state()
  private childTreeItems: GlideCoreTreeItem[] = [];

  @state()
  private hasPrefixIcon = false;

  @state()
  private isExpandIconHovered = false;

  @state()
  private isFocused = false;

  @state()
  private isHovered = false;

  #checkboxElementRef = createRef<HTMLSlotElement>();

  #defaultSlotElementRef = createRef<HTMLSlotElement>();

  #expandIconButtonElementRef = createRef<HTMLSlotElement>();

  #labelAndIconsElementRef = createRef<HTMLSlotElement>();

  #labelContainerElementRef = createRef<HTMLInputElement>();

  #localize = new LocalizeController(this);

  #menuSlotElementRef = createRef<HTMLSlotElement>();

  #prefixSlotElementRef = createRef<HTMLSlotElement>();

  #selected = false;

  get #ariaExpanded() {
    if (this.privateHasChildTreeItems) {
      return this.expanded ? 'true' : 'false';
    } else {
      return;
    }
  }

  get #indentationWidth() {
    return `${(this.level - 1) * 20}px`;
  }

  // Checks if focus has moved to an element within this tree item itself,
  // not including this tree item itself or one of its child tree items
  #isFocusTargetInternal(target: EventTarget | null) {
    return (
      target &&
      target instanceof HTMLElement &&
      (target === this.#checkboxElementRef.value ||
        target === this.#expandIconButtonElementRef.value ||
        target === this.#labelAndIconsElementRef.value ||
        (!(target instanceof GlideCoreTreeItem) && this.contains(target)))
    );
  }

  #onDefaultSlotChange() {
    this.#setupChildren();
  }

  #onExpandIconContainerClick(event: Event) {
    if (this.hasExpandIcon) {
      this.privateToggleExpand();
      event.stopPropagation();
    }
  }

  #onExpandIconContainerKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.privateToggleExpand();
      event?.stopPropagation();
    }
  }

  #onFocusIn(event: FocusEvent) {
    if (this.#isFocusTargetInternal(event.target)) {
      event.stopPropagation();
    }
  }

  #onFocusOut(event: FocusEvent) {
    if (this.#isFocusTargetInternal(event.relatedTarget)) {
      event.stopPropagation();
    } else {
      this.isFocused = false;
      this.#setChildTabIndexes(-1);
    }
  }

  #onInteractiveContainerClick(event: Event) {
    if (
      (event.target instanceof HTMLElement ||
        event.target instanceof SVGElement) &&
      (event.target.closest('glide-core-tree-item-icon-button') ??
        event.target.closest('glide-core-tree-item-menu'))
    ) {
      return;
    }

    this.selected = true;
  }

  #onInteractiveContainerKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      if (!this.#isFocusTargetInternal(event.target)) {
        this.selected = true;
      }

      event?.stopPropagation();
    }
  }

  get #treeItemElements() {
    return this.#defaultSlotElementRef.value
      ?.assignedElements()
      .filter(
        (element): element is GlideCoreTreeItem =>
          element instanceof GlideCoreTreeItem,
      );
  }

  #onMenuSlotChange() {
    if (this.#menuSlotElementRef.value) {
      for (const assignedElement of this.#menuSlotElementRef.value.assignedElements()) {
        if (assignedElement instanceof GlideCoreTreeItemMenu && this.label) {
          assignedElement.label = this.#localize.term('actionsFor', this.label);
        }
      }
    }
  }

  #onPrefixSlotChange() {
    const assignedNodes = this.#prefixSlotElementRef.value?.assignedNodes();
    this.hasPrefixIcon = Boolean(assignedNodes && assignedNodes.length > 0);
  }

  #setChildTabIndexes(tabIndex: -1 | 0) {
    for (const iconButton of this.querySelectorAll<GlideCoreIconButton>(
      '& > glide-core-tree-item-icon-button',
    )) {
      iconButton.tabIndex = tabIndex;
    }
  }

  #setupChildren() {
    const childTreeItems = [];

    if (this.#treeItemElements) {
      for (const treeItem of this.#treeItemElements) {
        treeItem.level = this.level + 1;

        childTreeItems.push(treeItem);
      }

      this.childTreeItems = childTreeItems;
    }
  }
}
