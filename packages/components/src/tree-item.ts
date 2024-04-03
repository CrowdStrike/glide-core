import { LitElement, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import {
  customElement,
  property,
  queryAssignedElements,
  state,
} from 'lit/decorators.js';

import { when } from 'lit/directives/when.js';
import styles from './tree-item.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'cs-tree-item': CsTreeItem;
  }
}

@customElement('cs-tree-item')
export default class CsTreeItem extends LitElement {
  static override styles = styles;

  @property({ type: Boolean }) expanded = false;

  @property({ type: String, reflect: true }) label = '';

  @property({ type: Number }) level = 1;

  @property({ type: Boolean }) selected = false;

  @queryAssignedElements({ slot: 'prefix' })
  prefixSlotAssignedElements!: Array<HTMLElement>;

  @queryAssignedElements()
  slotElements!: Array<CsTreeItem>;

  @queryAssignedElements({ slot: 'suffix' })
  suffixSlotAssignedElements!: Array<HTMLElement>;

  override tabIndex: number = -1;

  override connectedCallback() {
    super.connectedCallback();

    this.setAttribute('role', 'treeitem');
  }

  override firstUpdated() {
    this.setupChildren();
  }

  override focus() {
    if (this.hasChildTreeItems) {
      this.slotElements[0].focus();
    } else {
      super.focus();
    }
  }

  get hasChildTreeItems() {
    return this.childTreeItems.length > 0;
  }

  private onPrefixSlotChange() {
    this.hasPrefixSlot = this.prefixSlotAssignedElements.length > 0;
  }

  private onSuffixSlotChange() {
    this.hasSuffixSlot = this.suffixSlotAssignedElements.length > 0;
  }

  override render() {
    return html`<div
      class=${classMap({
        component: true,
        'component-expanded': this.expanded,
      })}
    >
      <div
        class=${classMap({
          'label-container': true,
          'label-container-selected': this.selected,
          'label-container-expanded': this.expanded,
        })}
      >
        <div style="width:${this.#indentationWidth};"></div>
        <div class="expand-icon-container">
          ${when(
            this.hasChildTreeItems,
            () => html`
              <div>
                <!-- chevron-right -->
                <svg
                  class=${classMap({
                    'expand-icon': true,
                    'expand-icon-expanded': this.expanded,
                  })}
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 18L15 12L9 6"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            `,
          )}
        </div>
        <slot
          name="prefix"
          part="prefix"
          @slotchange=${this.onPrefixSlotChange}
        ></slot>
        <div class="label">${this.label}</div>
        <slot
          name="suffix"
          part="suffix"
          @slotchange=${this.onSuffixSlotChange}
        ></slot>
      </div>
      <div class="child-items">
        <slot></slot>
      </div>
    </div>`;
  }

  /**
   * Traverses down the tree, selecting the passed-in item,
   * and deselecting all other items.
   * Returns the selected item
   */
  selectItem(item: CsTreeItem): CsTreeItem | undefined {
    let selectedItem;

    for (const treeItem of this.slotElements) {
      if (item === treeItem) {
        treeItem.setAttribute('selected', 'true');
        selectedItem = treeItem;
      } else {
        treeItem.removeAttribute('selected');

        const nestedSelectedItem: CsTreeItem | undefined =
          treeItem.selectItem(item);

        nestedSelectedItem && (selectedItem = nestedSelectedItem);
      }
    }

    return selectedItem;
  }

  setupChildren() {
    const childTreeItems = [];

    for (const treeItem of this.slotElements) {
      treeItem.level = this.level + 1;

      childTreeItems.push(treeItem);
    }

    this.childTreeItems = childTreeItems;
  }

  toggleExpand() {
    this.expanded = !this.expanded;
  }

  @state()
  private childTreeItems: CsTreeItem[] = [];

  @state()
  private hasPrefixSlot = false;

  @state()
  private hasSuffixSlot = false;

  get #indentationWidth() {
    return `${(this.level - 1) * 20}px`;
  }
}
