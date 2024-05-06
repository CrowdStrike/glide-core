import './icon-button.js';
import { LitElement, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit-html/directives/ref.js';
import {
  customElement,
  property,
  queryAssignedElements,
  state,
} from 'lit/decorators.js';
import { owSlotType } from './library/ow.js';
import CsTab from './tab.js';
import CsTabPanel from './tab.panel.js';
import styles from './tab.group.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'cs-tab-group': CsTabGroup;
  }
}

/**
 * @description The parent component for a group of tabs. Handles active state changes from clicking the tabs.
 *
 * @slot nav - The slot where you place the <cs-tab> components
 *
 * @slot - The default slot. Put the <cs-tab-panel> components here
 */
@customElement('cs-tab-group')
export default class CsTabGroup extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: 'closed',
  };

  static override styles = styles;

  /**
   * Sets the variant attribute on the tab group.
   * Automatically sets this variant on all <cs-tab> components inside the default slot
   * */
  @property({ reflect: true }) variant = 'primary';

  /**
   * The tab element that is currently active
   * */
  @state() activeTab?: CsTab;

  @queryAssignedElements()
  panelElements!: Array<CsTabPanel>;

  @queryAssignedElements({ slot: 'nav' })
  tabElements!: Array<CsTab>;

  override firstUpdated() {
    owSlotType(this.#navSlotRef.value, [CsTab]);
    owSlotType(this.#defaultSlotRef.value, [CsTabPanel]);
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
        <slot name="nav" ${ref(this.#navSlotRef)}></slot>
      </div>
      <slot ${ref(this.#defaultSlotRef)}></slot>
    </div>`;
  }

  override updated() {
    this.#setupTabs();
  }

  #defaultSlotRef = createRef<HTMLSlotElement>();

  #navSlotRef = createRef<HTMLSlotElement>();

  #onClick = (event: Event) => {
    const target = event.target as HTMLElement;
    const clickedTab = target.closest('cs-tab');

    if (clickedTab && clickedTab instanceof CsTab && !clickedTab.disabled) {
      this.#showTab(clickedTab);
    }
  };

  #onKeydown = (event: KeyboardEvent) => {
    const target = event.target as HTMLElement;
    const targetTab = target.closest('cs-tab');

    if (
      ['Enter', ' '].includes(event.key) &&
      targetTab &&
      targetTab instanceof CsTab &&
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

      if (activeElement?.tagName.toLowerCase() === 'cs-tab') {
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
    for (let index = 0; index < this.tabElements.length; index++) {
      const slotElement = this.tabElements[index];
      const tab = slotElement as CsTab;
      tab.variant = this.variant;

      for (const panel of this.panelElements) {
        tab.setAttribute('aria-controls', panel.getAttribute('id')!);
        panel.setAttribute('aria-labelledby', tab.getAttribute('id')!);
      }
    }
  }

  #showTab(tab: CsTab) {
    this.activeTab = tab;
    this.#setActiveTab();
    this.dispatchEvent(
      new CustomEvent('tab-show', {
        detail: {
          panel: tab.panel,
        },
      }),
    );
  }
}
