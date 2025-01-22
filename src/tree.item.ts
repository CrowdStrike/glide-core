import { html, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { styleMap } from 'lit/directives/style-map.js';
import { when } from 'lit/directives/when.js';
import packageJson from '../package.json' with { type: 'json' };
import { LocalizeController } from './library/localize.js';
import GlideCoreTreeItemMenu from './tree.item.menu.js';
import GlideCoreIconButton from './icon-button.js';
import chevronIcon from './icons/chevron.js';
import styles from './tree.item.styles.js';
import assertSlot from './library/assert-slot.js';
import shadowRootMode from './library/shadow-root-mode.js';

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
 */
@customElement('glide-core-tree-item')
export default class GlideCoreTreeItem extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
    mode: shadowRootMode,
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

  @property({ reflect: true })
  readonly version = packageJson.version;

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
          selected: this.selected,
        })}
        tabindex="-1"
        @focusout=${this.#onFocusOut}
        @focusin=${this.#onFocusIn}
        ${ref(this.#labelContainerElementRef)}
      >
        <div
          style=${styleMap({
            flexShrink: 0,
            width: this.#indentationWidth,
          })}
        ></div>

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
            <div
              class=${classMap({
                'expand-icon-container': true,
                expanded: this.expanded,
              })}
            >
              ${when(this.hasExpandIcon, () => chevronIcon)}
            </div>
          `,
        )}

        <slot
          name="prefix"
          ${ref(this.#prefixSlotElementRef)}
          @slotchange=${this.#onPrefixSlotChange}
        ></slot>

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
          ></slot>

          <slot name="suffix"></slot>
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

    if (this.#treeItemElements) {
      for (const treeItem of this.#treeItemElements) {
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

  #localize = new LocalizeController(this);

  #menuSlotElementRef = createRef<HTMLSlotElement>();

  #prefixSlotElementRef = createRef<HTMLSlotElement>();

  get #treeItemElements() {
    return this.#defaultSlotElementRef.value
      ?.assignedElements()
      .filter(
        (element): element is GlideCoreTreeItem =>
          element instanceof GlideCoreTreeItem,
      );
  }

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

  #onFocusIn(event: FocusEvent) {
    if (this.#isFocusTargetInternal(event.target)) {
      event.stopPropagation();
    }
  }

  #onFocusOut(event: FocusEvent) {
    if (this.#isFocusTargetInternal(event.relatedTarget)) {
      event.stopPropagation();
    } else {
      this.#setTabIndexes(-1);
    }
  }

  #onMenuSlotChange() {
    if (this.#menuSlotElementRef.value) {
      for (const assignedElement of this.#menuSlotElementRef.value.assignedElements()) {
        if (assignedElement instanceof GlideCoreTreeItemMenu) {
          assignedElement.label = this.#localize.term('actionsFor', this.label);
        }
      }
    }
  }

  #onPrefixSlotChange() {
    const assignedNodes = this.#prefixSlotElementRef.value?.assignedNodes();
    this.hasPrefixIcon = Boolean(assignedNodes && assignedNodes.length > 0);
  }

  #setTabIndexes(tabIndex: -1 | 0) {
    if (this.#labelContainerElementRef.value) {
      this.#labelContainerElementRef.value.tabIndex = tabIndex;
    }

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
