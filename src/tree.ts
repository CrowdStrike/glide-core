import { html, LitElement } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
import packageJson from '../package.json' with { type: 'json' };
import GlideCoreTreeItem from './tree.item.js';
import styles from './tree.styles.js';
import assertSlot from './library/assert-slot.js';
import shadowRootMode from './library/shadow-root-mode.js';
import final from './library/final.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-tree': GlideCoreTree;
  }
}

/**
 * @readonly
 * @attr {string} [version]
 *
 * @slot {GlideCoreTreeItem}
 *
 * @method selectItem
 * @param {GlideCoreTreeItem} item
 */
@customElement('glide-core-tree')
@final
export default class GlideCoreTree extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: shadowRootMode,
  };

  static override styles = styles;

  @property({ reflect: true })
  readonly version: string = packageJson.version;

  override disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener('focusin', this.#onHostFocusIn);
    this.removeEventListener('focusout', this.#onHostFocusOut);
  }

  override render() {
    return html`<div
      class="component"
      role="tree"
      tabindex=${this.privateTabIndex}
      @click=${this.#onComponentClick}
      @keydown=${this.#onComponentKeydown}
    >
      <slot
        ${ref(this.#defaultSlotElementRef)}
        ${assertSlot([GlideCoreTreeItem])}
      >
        <!-- @type {GlideCoreTreeItem} -->
      </slot>
    </div>`;
  }

  selectItem(item: GlideCoreTreeItem): void {
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
    }
  }

  constructor() {
    super();
    this.addEventListener('focusin', this.#onHostFocusIn);
    this.addEventListener('focusout', this.#onHostFocusOut);
  }

  @state()
  private focusedItem?: GlideCoreTreeItem | null;

  @state()
  private privateTabIndex = 0;

  @state()
  private selectedItem?: GlideCoreTreeItem;

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

  #onComponentClick(event: Event) {
    const target = event.target as HTMLElement;

    if (
      target.closest('glide-core-tree-item-icon-button') ??
      target.closest('glide-core-tree-item-menu')
    ) {
      return;
    }

    const clickedItem = target.closest('glide-core-tree-item');

    if (clickedItem) {
      if (clickedItem.privateHasChildTreeItems && !clickedItem.nonCollapsible) {
        clickedItem.privateToggleExpand();
      } else {
        this.selectItem(clickedItem);
      }
    }
  }

  // https://www.w3.org/WAI/ARIA/apg/patterns/treeview/
  #onComponentKeydown(event: KeyboardEvent) {
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

    if (event.key === 'ArrowRight' && focusedItem?.privateHasChildTreeItems) {
      if (focusedItem.expanded) {
        this.#focusItem(focusedItem.querySelector('glide-core-tree-item'));
      } else {
        focusedItem.privateToggleExpand();
      }
    }

    if (event.key === 'ArrowLeft') {
      if (focusedItem?.expanded && !focusedItem.nonCollapsible) {
        focusedItem.privateToggleExpand();
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
      if (focusedItem.privateHasChildTreeItems && !focusedItem.nonCollapsible) {
        focusedItem.privateToggleExpand();
      } else {
        this.selectItem(focusedItem);
      }
    }
  }

  #onHostFocusIn(event: FocusEvent) {
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

  #onHostFocusOut(event: FocusEvent) {
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
}
