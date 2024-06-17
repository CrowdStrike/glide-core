import './icon-button.js';
import { LitElement, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import {
  customElement,
  property,
  queryAssignedElements,
  state,
} from 'lit/decorators.js';
import { owSlotType } from './library/ow.js';
import GlideCoreTab from './tab.js';
import GlideCoreTabPanel from './tab.panel.js';
import styles from './tab.group.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-tab-group': GlideCoreTabGroup;
  }
}

/**
 * @description The parent component for a group of tabs. Handles active state changes from clicking the tabs.
 *
 * @slot nav - The slot where you place the <glide-core-tab> components
 *
 * @slot - The default slot. Put the <glide-core-tab-panel> components here
 */
@customElement('glide-core-tab-group')
export default class GlideCoreTabGroup extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: 'closed',
  };

  static override styles = styles;

  /**
   * Sets the variant attribute on the tab group.
   * Automatically sets this variant on all <glide-core-tab> components inside the default slot
   * */
  @property({ reflect: true }) variant = 'primary';

  /**
   * The tab element that is currently active
   * */
  @state() activeTab?: GlideCoreTab;

  @queryAssignedElements()
  panelElements!: GlideCoreTabPanel[];

  @queryAssignedElements({ slot: 'nav' })
  tabElements!: GlideCoreTab[];

  override firstUpdated() {
    owSlotType(this.#navSlotElementRef.value, [GlideCoreTab]);
    owSlotType(this.#defaultSlotElementRef.value, [GlideCoreTabPanel]);
    this.#setupTabs();
    this.#setActiveTab();
  }

  override render() {
    return html`<div
      class=${classMap({
        component: true,
        vertical: this.variant === 'vertical',
      })}
      @click=${this.#onClick}
      @keydown=${this.#onKeydown}
    >
      <div
        role="tablist"
        class=${classMap({
          'tab-group': true,
          [this.variant]: true,
        })}
      >
        <slot
          name="nav"
          @slotchange=${this.#onNavSlotChange}
          ${ref(this.#navSlotElementRef)}
        ></slot>
      </div>
      <slot
        @slotchange=${this.#onDefaultSlotChange}
        ${ref(this.#defaultSlotElementRef)}
      ></slot>
    </div>`;
  }

  override updated() {
    this.#setupTabs();
  }

  #defaultSlotElementRef = createRef<HTMLSlotElement>();

  #navSlotElementRef = createRef<HTMLSlotElement>();

  #onClick = (event: Event) => {
    const target = event.target as HTMLElement;
    const clickedTab = target.closest('glide-core-tab');

    if (
      clickedTab &&
      clickedTab instanceof GlideCoreTab &&
      !clickedTab.disabled
    ) {
      this.#showTab(clickedTab);
    }
  };

  #onKeydown = (event: KeyboardEvent) => {
    const target = event.target as HTMLElement;
    const targetTab = target.closest('glide-core-tab');

    if (
      ['Enter', ' '].includes(event.key) &&
      targetTab &&
      targetTab instanceof GlideCoreTab &&
      !targetTab.disabled
    ) {
      this.#showTab(targetTab);
      event.preventDefault();
    }

    if (
      [
        'ArrowLeft',
        'ArrowRight',
        'ArrowUp',
        'ArrowDown',
        'Home',
        'End',
      ].includes(event.key)
    ) {
      const activeElement = this.tabElements.find((tab) =>
        tab.matches(':focus'),
      );

      if (activeElement?.tagName.toLowerCase() === 'glide-core-tab') {
        let index = this.tabElements.indexOf(activeElement);

        switch (event.key) {
          case 'Home': {
            index = 0;

            break;
          }
          case 'End': {
            index = this.tabElements.length - 1;

            break;
          }
          case this.variant === 'vertical' ? 'ArrowUp' : 'ArrowLeft': {
            index--;

            break;
          }
          case this.variant === 'vertical' ? 'ArrowDown' : 'ArrowRight': {
            index++;

            break;
          }
          // No default
        }

        if (index < 0) {
          index = this.tabElements.length - 1;
        }

        if (index > this.tabElements.length - 1) {
          index = 0;
        }

        this.tabElements[index].focus({ preventScroll: true });
        event.preventDefault();
      }
    }
  };

  #onDefaultSlotChange() {
    owSlotType(this.#defaultSlotElementRef.value, [GlideCoreTabPanel]);
  }

  #onNavSlotChange() {
    owSlotType(this.#navSlotElementRef.value, [GlideCoreTab]);
  }

  #setActiveTab() {
    for (const [index, tabElement] of this.tabElements.entries()) {
      let isActive;

      // If there is no current active tab, default to the first tab
      if (!this.activeTab && index === 0) {
        this.activeTab = tabElement;
        isActive = true;
      } else {
        isActive = this.activeTab === tabElement;
      }

      tabElement.active = isActive;
    }

    for (const panel of this.panelElements) {
      const activeTabPanelName = this.activeTab?.getAttribute('panel');
      const thisPanelName = panel.getAttribute('name');

      panel.isActive = thisPanelName === activeTabPanelName;
    }
  }

  #setupTabs() {
    for (const tabElement of this.tabElements) {
      tabElement.variant = this.variant;

      for (const panel of this.panelElements) {
        tabElement.setAttribute('aria-controls', panel.getAttribute('id')!);
        panel.setAttribute('aria-labelledby', tabElement.getAttribute('id')!);
      }
    }
  }

  #showTab(tab: GlideCoreTab) {
    this.activeTab = tab;
    this.#setActiveTab();

    this.dispatchEvent(
      new CustomEvent('tab-show', {
        bubbles: true,
        detail: {
          panel: tab.panel,
        },
      }),
    );
  }
}
