import './tree-item.js';
import { LitElement, html } from 'lit';
import { customElement, queryAssignedElements, state } from 'lit/decorators.js';
import CsTreeItem from './tree-item.js';
import styles from './tree.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'cs-tree': CsTree;
  }
}

@customElement('cs-tree')
export default class CsTree extends LitElement {
  static override styles = styles;

  @state() selectedItem?: CsTreeItem;

  @queryAssignedElements()
  slotElements!: Array<CsTreeItem>;

  override async connectedCallback() {
    super.connectedCallback();

    this.setAttribute('role', 'tree');
    this.setAttribute('tabindex', '0');
  }

  override focus() {
    if (this.selectedItem) {
      this.selectedItem.focus();
    } else {
      this.slotElements[0].focus();
    }
  }

  private handleFocusIn(event: FocusEvent) {
    let itemToFocus;

    if (event.target === this) {
      itemToFocus = this.selectedItem || this.slotElements[0];
    } else if (event.target instanceof CsTreeItem) {
      itemToFocus = event.target;
      this.setAttribute('tabindex', '-1');
    }

    itemToFocus?.focus();
  }

  private handleFocusOut(event: FocusEvent) {
    const relatedTarget = event.relatedTarget as HTMLElement;

    // If they've focused out of the tree,
    // restore this tree's tabindex 0, so they can focus back in
    if (!relatedTarget || !this.contains(relatedTarget)) {
      this.tabIndex = 0;
    }
  }

  override render() {
    return html`<div
      class="tree"
      @click=${this.#handleClick}
      @keydown=${this.#handleKeydown}
    >
      <slot></slot>
    </div>`;
  }

  selectItem(item: CsTreeItem) {
    for (const treeItem of this.slotElements) {
      if (item === treeItem) {
        treeItem.setAttribute('selected', 'true');
        this.selectedItem = treeItem;
      } else {
        treeItem.removeAttribute('selected');

        // Also traverse down the tree to select/deselect all children
        const nestedSelectedItem: CsTreeItem | undefined =
          treeItem.selectItem(item);

        nestedSelectedItem && (this.selectedItem = nestedSelectedItem);
      }
    }

    this.dispatchEvent(
      new CustomEvent('item-selected', { bubbles: true, detail: item }),
    );
  }

  constructor() {
    super();
    this.addEventListener('focusin', this.handleFocusIn);
    this.addEventListener('focusout', this.handleFocusOut);
  }

  #handleClick(event: Event) {
    const target = event.target as HTMLElement;
    const clickedItem = target.closest('cs-tree-item');

    if (clickedItem) {
      if (clickedItem.hasChildTreeItems) {
        clickedItem.toggleExpand();
      } else {
        this.selectItem(clickedItem);
      }
    }
  }

  #handleKeydown(event: KeyboardEvent) {
    // TODO
    event;
  }
}
