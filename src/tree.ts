import { LitElement, html } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, queryAssignedElements, state } from 'lit/decorators.js';
import { owSlot, owSlotType } from './library/ow.js';
import GlideCoreTreeItem from './tree.item.js';
import styles from './tree.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-tree': GlideCoreTree;
  }
}

/**
 * @description A tree element, containing a hierarchy of tree items
 *
 * @slot - One or more of <glide-core-tree-item>
 */
@customElement('glide-core-tree')
export default class GlideCoreTree extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: 'closed',
  };

  static override styles = styles;

  @state() selectedItem?: GlideCoreTreeItem;

  @state() focusedItem?: GlideCoreTreeItem | null;

  @state() privateTabIndex = 0;

  @queryAssignedElements()
  slotElements!: GlideCoreTreeItem[];

  override disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener('focusin', this.#handleFocusIn);
    this.removeEventListener('focusout', this.#handleFocusOut);
  }

  override firstUpdated() {
    owSlot(this.#defaultSlotElementRef.value);
    owSlotType(this.#defaultSlotElementRef.value, [GlideCoreTreeItem]);
  }

  override render() {
    return html`<div
      class="component"
      role="tree"
      tabindex=${this.privateTabIndex}
      @click=${this.#handleClick}
      @keydown=${this.#handleKeydown}
    >
      <slot
        @slotchange=${this.#onDefaultSlotChange}
        ${ref(this.#defaultSlotElementRef)}
      ></slot>
    </div>`;
  }

  selectItem(item: GlideCoreTreeItem) {
    for (const treeItem of this.slotElements) {
      if (item === treeItem) {
        treeItem.setAttribute('selected', 'true');
        this.selectedItem = treeItem;
      } else {
        treeItem.removeAttribute('selected');
      }

      // Also traverse down the tree to select/deselect all children
      const nestedSelectedItem: GlideCoreTreeItem | undefined =
        treeItem.selectItem(item);

      if (nestedSelectedItem) {
        this.selectedItem = nestedSelectedItem;
      }
    }

    this.dispatchEvent(
      new CustomEvent('item-selected', { bubbles: true, detail: item }),
    );
  }

  constructor() {
    super();
    this.addEventListener('focusin', this.#handleFocusIn);
    this.addEventListener('focusout', this.#handleFocusOut);
  }

  #defaultSlotElementRef = createRef<HTMLSlotElement>();

  #focusItem(item: GlideCoreTreeItem | undefined | null) {
    item?.focus();
    this.focusedItem = item;
  }

  #getAllTreeItems() {
    return [
      ...this.querySelectorAll<GlideCoreTreeItem>('glide-core-tree-item'),
    ];
  }

  #getFocusableItems() {
    const items = this.#getAllTreeItems();
    const collapsedItems = new Set();

    return items.filter((item) => {
      const parent = item.parentElement?.closest('glide-core-tree-item');

      if (parent && (!parent.expanded || collapsedItems.has(parent))) {
        collapsedItems.add(item);
      }

      return !collapsedItems.has(item);
    });
  }

  #handleClick(event: Event) {
    const target = event.target as HTMLElement;

    if (
      target.closest('glide-core-tree-item-icon-button') ??
      target.closest('glide-core-tree-item-menu')
    ) {
      return;
    }

    const clickedItem = target.closest('glide-core-tree-item');

    if (clickedItem) {
      if (clickedItem.hasChildTreeItems && !clickedItem.nonCollapsible) {
        clickedItem.toggleExpand();
      } else {
        this.selectItem(clickedItem);
      }
    }
  }

  #handleFocusIn(event: FocusEvent) {
    let itemToFocus;

    if (event.target === this) {
      itemToFocus = this.selectedItem ?? this.slotElements[0];
    } else if (event.target instanceof GlideCoreTreeItem) {
      itemToFocus = event.target;
      this.privateTabIndex = -1;
    }

    this.#focusItem(itemToFocus);
  }

  #handleFocusOut(event: FocusEvent) {
    const relatedTarget = event.relatedTarget as HTMLElement;

    // If they've focused out of the tree,
    // restore this tree's tabindex 0, so they can focus back in
    if (!relatedTarget || !this.contains(relatedTarget)) {
      this.privateTabIndex = 0;
      this.focusedItem = undefined;
    }
  }

  // https://www.w3.org/WAI/ARIA/apg/patterns/treeview/
  #handleKeydown(event: KeyboardEvent) {
    if (
      ![
        'ArrowRight',
        'ArrowLeft',
        'ArrowDown',
        'ArrowUp',
        'Home',
        'End',
        'Enter',
      ].includes(event.key)
    ) {
      return;
    }

    const allFocusableItems = this.#getFocusableItems();
    const { focusedItem } = this;

    const indexOfFocusedItem = allFocusableItems.findIndex((item) =>
      item.matches(':focus'),
    );

    if (event.key === 'ArrowRight' && focusedItem?.hasChildTreeItems) {
      if (focusedItem.expanded) {
        this.#focusItem(focusedItem.slotElements[0]);
      } else {
        focusedItem.toggleExpand();
      }
    }

    if (event.key === 'ArrowLeft') {
      if (focusedItem?.expanded && !focusedItem.nonCollapsible) {
        focusedItem.toggleExpand();
      } else {
        const parentTreeItem = focusedItem?.parentElement?.closest(
          'glide-core-tree-item',
        );

        this.#focusItem(parentTreeItem);
      }
    }

    if (
      event.key === 'ArrowDown' &&
      indexOfFocusedItem !== -1 &&
      indexOfFocusedItem < allFocusableItems.length - 1
    ) {
      this.#focusItem(allFocusableItems[indexOfFocusedItem + 1]);
    }

    if (event.key === 'ArrowUp' && indexOfFocusedItem > 0) {
      this.#focusItem(allFocusableItems[indexOfFocusedItem - 1]);
    }

    if (event.key === 'Home') {
      this.#focusItem(allFocusableItems[0]);
    }

    if (event.key === 'End') {
      this.#focusItem(allFocusableItems.at(-1));
    }

    if (event.key === 'Enter' && focusedItem) {
      if (focusedItem.hasChildTreeItems && !focusedItem.nonCollapsible) {
        focusedItem.toggleExpand();
      } else {
        this.selectItem(focusedItem);
      }
    }
  }

  #onDefaultSlotChange() {
    owSlot(this.#defaultSlotElementRef.value);
    owSlotType(this.#defaultSlotElementRef.value, [GlideCoreTreeItem]);
  }
}
