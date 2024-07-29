import './tree.item.menu.js';
import { LitElement, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import {
  customElement,
  property,
  queryAssignedElements,
  state,
} from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import GlideCoreMenu from './menu.js';

import { when } from 'lit/directives/when.js';
import styles from './tree.item.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-tree-item': GlideCoreTreeItem;
  }
}

/**
 * @description A single node of a Tree.
 *
 * @slot - One or more of <glide-core-tree-item>, if this tree item contains nested tree items.
 * @slot prefix - An optional icon to display before the label.
 * @slot suffix - An optional icon to add after the label.
 * @slot menu - Place a <glide-core-menu> here, which will be visible on hover or focus
 */
@customElement('glide-core-tree-item')
export default class GlideCoreTreeItem extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
    mode: 'closed',
  };

  static override styles = styles;

  @property({ type: Boolean }) expanded = false;

  @property({ reflect: true }) label = '';

  @property({ type: Number }) level = 1;

  @property({ type: Boolean }) selected = false;

  @queryAssignedElements({ slot: 'menu' })
  menuSlotAssignedElements!: GlideCoreMenu[];

  @queryAssignedElements({ slot: 'prefix' })
  prefixSlotAssignedElements!: HTMLElement[];

  @queryAssignedElements()
  slotElements!: GlideCoreTreeItem[];

  @queryAssignedElements({ slot: 'suffix' })
  suffixSlotAssignedElements!: HTMLElement[];

  override firstUpdated() {
    this.#setupChildren();
  }

  override focus() {
    this.#labelContainerElementRef.value?.focus();
  }

  get hasChildTreeItems() {
    return this.childTreeItems.length > 0;
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
        })}
        tabindex="-1"
        ${ref(this.#labelContainerElementRef)}
      >
        <div style="flex-shrink: 0; width:${this.#indentationWidth};"></div>
        <div class="expand-icon-container">
          ${when(
            this.hasChildTreeItems,
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
        <slot name="prefix" @slotchange=${this.#onPrefixSlotChange}></slot>
        <div class="label">${this.label}</div>
        <div class="icon-container">
          <slot name="menu" @slotchange=${this.#onMenuSlotChange}></slot>
          <slot name="suffix" @slotchange=${this.#onSuffixSlotChange}></slot>
        </div>
      </div>
      <div class="child-items" role="group">
        <slot></slot>
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

  setContainingBlock(containingBlock: Element) {
    for (const treeItemMenu of this.menuSlotAssignedElements) {
      treeItemMenu.setContainingBlock(containingBlock);
    }
  }

  toggleExpand() {
    this.expanded = !this.expanded;
  }

  @state()
  private childTreeItems: GlideCoreTreeItem[] = [];

  @state()
  private hasMenuSlot = false;

  @state()
  private hasPrefixSlot = false;

  @state()
  private hasSuffixSlot = false;

  #labelContainerElementRef = createRef<HTMLInputElement>();

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

  get #indentationWidth() {
    return `${(this.level - 1) * 20}px`;
  }

  #onMenuSlotChange() {
    this.hasMenuSlot = this.menuSlotAssignedElements.length > 0;
  }

  #onPrefixSlotChange() {
    this.hasPrefixSlot = this.prefixSlotAssignedElements.length > 0;
  }

  #onSuffixSlotChange() {
    this.hasSuffixSlot = this.suffixSlotAssignedElements.length > 0;
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
