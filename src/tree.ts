import { LitElement, html } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, state } from 'lit/decorators.js';
import { owSlot, owSlotType } from './library/ow.js';
import GlideCoreTreeItem from './tree.item.js';
import styles from './tree.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-tree': GlideCoreTree;
  }
}

/**
 * @slot - One or more of <glide-core-tree-item>.
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

  override disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener('focusin', this.#onFocusIn);
    this.removeEventListener('focusout', this.#onFocusOut);
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
      @click=${this.#onClick}
      @keydown=${this.#onKeydown}
    >
      <slot
        @slotchange=${this.#onDefaultSlotChange}
        ${ref(this.#defaultSlotElementRef)}
      ></slot>
    </div>`;
  }

  selectItem(item: GlideCoreTreeItem) {
    if (this.#treeItemElements) {
      for (const treeItem of this.#treeItemElements) {
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

      item.dispatchEvent(
        new Event('selected', { bubbles: true, composed: true }),
      );
    }
  }

  constructor() {
    super();
    this.addEventListener('focusin', this.#onFocusIn);
    this.addEventListener('focusout', this.#onFocusOut);
  }

  #defaultSlotElementRef = createRef<HTMLSlotElement>();

  get #treeItemElements() {
    return this.#defaultSlotElementRef.value
      ?.assignedElements()
      .filter(
        (element): element is GlideCoreTreeItem =>
          element instanceof GlideCoreTreeItem,
      );
  }

  #focusItem(item: GlideCoreTreeItem | undefined | null) {
    item?.focus();
    this.focusedItem = item;
  }

  #getFocusableItems() {
    const collapsedItems = new Set();

    return [...this.querySelectorAll('glide-core-tree-item')].filter((item) => {
      const parent = item.parentElement?.closest('glide-core-tree-item');

      if (parent && (!parent.expanded || collapsedItems.has(parent))) {
        collapsedItems.add(item);
      }

      return !collapsedItems.has(item);
    });
  }

  #onClick(event: Event) {
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

  #onDefaultSlotChange() {
    owSlot(this.#defaultSlotElementRef.value);
    owSlotType(this.#defaultSlotElementRef.value, [GlideCoreTreeItem]);
  }

  #onFocusIn(event: FocusEvent) {
    let itemToFocus;

    if (event.target === this) {
      itemToFocus = this.selectedItem?.checkVisibility({
        visibilityProperty: true,
      })
        ? this.selectedItem
        : this.#treeItemElements?.[0];
    } else if (event.target instanceof GlideCoreTreeItem) {
      itemToFocus = event.target;
      this.privateTabIndex = -1;
    }

    this.#focusItem(itemToFocus);
  }

  #onFocusOut(event: FocusEvent) {
    // If they've focused out of the tree,
    // restore this tree's tabindex 0, so they can focus back in
    if (
      !event.relatedTarget ||
      !(event.relatedTarget instanceof HTMLElement) ||
      !this.contains(event.relatedTarget)
    ) {
      this.privateTabIndex = 0;
      this.focusedItem = undefined;
    }
  }

  // https://www.w3.org/WAI/ARIA/apg/patterns/treeview/
  #onKeydown(event: KeyboardEvent) {
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

    if (
      [
        'ArrowRight',
        'ArrowLeft',
        'ArrowDown',
        'ArrowUp',
        'Home',
        'End',
      ].includes(event.key)
    ) {
      // Prevent page scroll.
      event.preventDefault();
    }

    if (
      event.target &&
      event.target instanceof HTMLElement &&
      (event.target.closest('glide-core-tree-item-icon-button') ??
        event.target.closest('glide-core-tree-item-menu'))
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
        this.#focusItem(focusedItem.querySelector('glide-core-tree-item'));
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
}
