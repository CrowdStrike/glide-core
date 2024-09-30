import './tree.item.menu.js';
import { LitElement, html } from 'lit';
import { LocalizeController } from './library/localize.js';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import {
  customElement,
  property,
  queryAssignedElements,
  state,
} from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { when } from 'lit/directives/when.js';
import GlideCoreIconButton from './icon-button.js';
import GlideCoreTreeItemMenu from './tree.item.menu.js';
import ow, { owSlotType } from './library/ow.js';
import styles from './tree.item.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-tree-item': GlideCoreTreeItem;
  }
}

/**
 * @slot - Zero or more of `<glide-core-tree-item>`.
 * @slot prefix - An optional icon before the label.
 * @slot suffix - An optional icon after the label.
 * @slot menu - A `<glide-core-menu>` made visible on hover or focus.
 * @slot link - A place to put your own <a> or custom link component
 */
@customElement('glide-core-tree-item')
export default class GlideCoreTreeItem extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
    mode: 'closed',
  };

  static override styles = styles;

  @property({ reflect: true, type: Boolean }) expanded = false;

  @property({ reflect: true }) label = '';

  @property({ reflect: true, type: Number }) level = 1;

  @property({ reflect: true, type: Boolean }) selected = false;

  @property({ reflect: true, type: Boolean, attribute: 'remove-indentation' })
  removeIndentation = false;

  @property({ reflect: true, type: Boolean, attribute: 'non-collapsible' })
  nonCollapsible = false;

  private hasLinkSlot = false;

  @queryAssignedElements()
  slotElements!: GlideCoreTreeItem[];

  @queryAssignedElements({ slot: 'suffix' })
  suffixSlotAssignedElements!: HTMLElement[];

  override focus(options?: FocusOptions) {
    this.#labelContainerElementRef.value?.focus(options);
    this.#setTabIndexes(0);
  }

  get hasChildTreeItems() {
    return this.childTreeItems.length > 0;
  }

  get hasExpandIcon() {
    return this.hasChildTreeItems && !this.nonCollapsible;
  }

  override render() {
    return html`<div
      class=${classMap({
        component: true,
        expanded: this.expanded,
        selected: this.selected,
      })}
      role="treeitem"
      aria-label=${this.label}
      aria-selected=${ifDefined(this.#ariaSelected)}
      aria-expanded=${ifDefined(this.#ariaExpanded)}
    >
      <div
        class=${classMap({
          'label-container': true,
          'prefix-icon': this.hasPrefixIcon,
          'has-link': this.hasLinkSlot,
        })}
        tabindex="-1"
        @click=${this.#handleLabelContainerClick}
        @keydown=${this.#handleLabelContainerKeydown}
        @focusout=${this.#handleFocusOut}
        @focusin=${this.#handleFocusIn}
        ${ref(this.#labelContainerElementRef)}
      >
        <div style="flex-shrink: 0; width:${this.#indentationWidth};"></div>
        ${when(
          /**
           * By default, we indent the width of the expand icon,
           * even if the item doesn't have children.
           * This is to allow the sibling tree items' labels to line up vertically
           * if some have children and some don't.
           * But the user can opt out of this behavior via remove-indentation
           */
          !this.removeIndentation || this.hasExpandIcon,
          () => html`
            <div class="expand-icon-container">
              ${when(
                this.hasExpandIcon,
                () => html`
                  <div>
                    <!-- chevron-right -->
                    <svg
                      aria-hidden="true"
                      class=${classMap({
                        'expand-icon': true,
                        'expand-icon-expanded': this.expanded,
                      })}
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M9 18L15 12L9 6"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                `,
              )}
            </div>
          `,
        )}

        <slot
          name="prefix"
          ${ref(this.#prefixSlotElementRef)}
          @slotchange=${this.#onPrefixSlotChange}
        ></slot>
        <slot
          name="link"
          @slotchange=${this.#onLinkSlotChange}
          ${ref(this.#linkSlotElementRef)}
        ></slot>
        ${when(
          !this.hasLinkSlot,
          () => html` <div class="label">${this.label}</div> `,
        )}
        <div class="icon-container">
          <slot
            name="menu"
            ${ref(this.#menuSlotElementRef)}
            @slotchange=${this.#onMenuSlotChange}
          ></slot>
          <slot name="suffix"></slot>
        </div>
      </div>
      <div class="child-items" role="group">
        <slot
          @slotchange=${this.#onDefaultSlotChange}
          ${ref(this.#defaultSlotElementRef)}
        ></slot>
      </div>
    </div>`;
  }

  /**
   * Traverses down the tree, selecting the passed-in item,
   * and deselecting all other items.
   * Returns the selected item
   */
  selectItem(item: GlideCoreTreeItem): GlideCoreTreeItem | undefined {
    let selectedItem;

    for (const treeItem of this.slotElements) {
      if (item === treeItem) {
        treeItem.setAttribute('selected', 'true');

        selectedItem = treeItem;
      } else {
        treeItem.removeAttribute('selected');

        const nestedSelectedItem: GlideCoreTreeItem | undefined =
          treeItem.selectItem(item);

        if (nestedSelectedItem) {
          selectedItem = nestedSelectedItem;
        }
      }
    }

    return selectedItem;
  }

  toggleExpand() {
    this.expanded = !this.expanded;
  }

  @state()
  private childTreeItems: GlideCoreTreeItem[] = [];

  @state()
  private hasPrefixIcon = false;

  #defaultSlotElementRef = createRef<HTMLSlotElement>();

  #labelContainerElementRef = createRef<HTMLInputElement>();

  #linkSlotElementRef = createRef<HTMLSlotElement>();

  #localize = new LocalizeController(this);

  #menuSlotElementRef = createRef<HTMLSlotElement>();

  #prefixSlotElementRef = createRef<HTMLSlotElement>();

  get #ariaExpanded() {
    if (this.hasChildTreeItems) {
      return this.expanded ? 'true' : 'false';
    } else {
      return;
    }
  }

  get #ariaSelected() {
    if (this.hasChildTreeItems) {
      return;
    } else {
      return this.selected ? 'true' : 'false';
    }
  }

  #handleFocusIn(event: FocusEvent) {
    if (this.#isFocusTargetInternal(event.target)) {
      event.stopPropagation();
    }
  }

  #handleFocusOut(event: FocusEvent) {
    if (this.#isFocusTargetInternal(event.relatedTarget)) {
      event.stopPropagation();
    } else {
      this.#setTabIndexes(-1);
    }
  }

  #handleLabelContainerClick(event: MouseEvent | KeyboardEvent) {
    const link = this.#linkSlotElementRef.value?.assignedElements()?.[0];

    if (
      link instanceof HTMLElement &&
      event.target instanceof HTMLElement &&
      !event.target.matches('[slot="link"]')
    ) {
      // A link exists, but they clicked somewhere outside of it.
      // Don't propagate the event up to the parent Tree,
      // as we don't want this Tree Item to become selected
      event.stopPropagation();
    }
  }

  #handleLabelContainerKeydown(event: KeyboardEvent) {
    const link = this.#linkSlotElementRef.value?.assignedElements()?.[0];

    if (event.key === 'Enter' && link instanceof HTMLElement) {
      link.click();
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
      !(target instanceof GlideCoreTreeItem) &&
      this.contains(target)
    );
  }

  #onDefaultSlotChange() {
    this.#setupChildren();
  }

  #onLinkSlotChange() {
    const assignedElements = this.#linkSlotElementRef.value?.assignedElements();
    const link = assignedElements?.[0];
    this.hasLinkSlot = Boolean(link);

    if (link) {
      ow(link.textContent, ow.string.minLength(1));
      this.label = link.textContent?.trim();

      if (link instanceof HTMLElement) {
        link.tabIndex = -1;
      }
    }
  }

  #onMenuSlotChange() {
    owSlotType(this.#menuSlotElementRef.value, [GlideCoreTreeItemMenu]);

    for (const assignedElement of this.#menuSlotElementRef.value.assignedElements()) {
      if (assignedElement instanceof GlideCoreTreeItemMenu) {
        assignedElement.label = this.#localize.term('actionsFor', this.label);
      }
    }
  }

  #onPrefixSlotChange() {
    const assignedNodes = this.#prefixSlotElementRef.value?.assignedNodes();
    this.hasPrefixIcon = Boolean(assignedNodes && assignedNodes.length > 0);
  }

  #setTabIndexes(tabIndex: -1 | 0) {
    ow(this.#labelContainerElementRef.value, ow.object.instanceOf(HTMLElement));
    this.#labelContainerElementRef.value.tabIndex = tabIndex;

    for (const iconButton of this.querySelectorAll<GlideCoreIconButton>(
      '& > glide-core-tree-item-icon-button',
    )) {
      iconButton.tabIndex = tabIndex;
    }
  }

  #setupChildren() {
    const childTreeItems = [];

    for (const treeItem of this.slotElements) {
      treeItem.level = this.level + 1;

      childTreeItems.push(treeItem);
    }

    this.childTreeItems = childTreeItems;
  }
}
