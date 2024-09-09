import './icon-button.js';
import { LitElement, html } from 'lit';
import { LocalizeController } from './library/localize.js';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, queryAssignedElements, state } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import GlideCoreTab from './tab.js';
import GlideCoreTabPanel from './tab.panel.js';
import ow, { owSlotType } from './library/ow.js';
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

  @state()
  get activeTab() {
    return this.#currentActiveTab;
  }

  set activeTab(tab: GlideCoreTab | null) {
    this.#previousActiveTab = this.#currentActiveTab;
    this.#currentActiveTab = tab;
  }

  @state()
  isAfterFirstUpdated = false;

  @state()
  isDisableOverflowStartButton = false;

  @state()
  isDisableOverflowEndButton = false;

  @state()
  isShowOverflowButtons = false;

  @queryAssignedElements()
  panelElements!: GlideCoreTabPanel[];

  @queryAssignedElements({ slot: 'nav' })
  tabElements!: GlideCoreTab[];

  override disconnectedCallback() {
    this.#resizeObserver?.disconnect();
    this.#resizeObserver = null;
  }

  override firstUpdated() {
    owSlotType(this.#navSlotElementRef.value, [GlideCoreTab]);
    owSlotType(this.#defaultSlotElementRef.value, [GlideCoreTabPanel]);
    this.#setupResizeObserver();
  }

  override render() {
    return html`<div
      class="component"
      @click=${this.#onClick}
      @keydown=${this.#onKeydown}
      ${ref(this.#componentElementRef)}
    >
      <div class="tab-container">
        ${when(
          this.isShowOverflowButtons,
          () => html`
            <button
              style="height: ${this.#tabListElementRef.value?.clientHeight}px"
              class=${classMap({
                overflow: true,
                disabled: this.isDisableOverflowStartButton,
              })}
              @click=${this.#onClickOverflowStartButton}
              tabindex="-1"
              aria-label=${this.#localize.term('previousTab')}
              data-test="overflow-start-button"
              ${ref(this.#overflowStartButtonElementRef)}
              ?disabled=${this.isDisableOverflowStartButton}
            >
              <svg
                aria-hidden="true"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M15 6L9 12L15 18"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          `,
        )}
        <div
          role="tablist"
          class=${classMap({
            'tab-group': true,
            animated: this.isAfterFirstUpdated,
          })}
          ${ref(this.#tabListElementRef)}
          @scroll=${this.#onScroll}
          @focusout=${this.#onFocusout}
          tabindex="-1"
        >
          <slot
            name="nav"
            @slotchange=${this.#onNavSlotChange}
            ${ref(this.#navSlotElementRef)}
          ></slot>
        </div>
        ${when(
          this.isShowOverflowButtons,
          () => html`
            <button
              style="height: ${this.#tabListElementRef.value?.clientHeight}px"
              class=${classMap({
                overflow: true,
                disabled: this.isDisableOverflowEndButton,
              })}
              @click=${this.#onClickOverflowEndButton}
              tabindex="-1"
              aria-label=${this.#localize.term('nextTab')}
              data-test="overflow-end-button"
              ${ref(this.#overflowEndButtonElementRef)}
              ?disabled=${this.isDisableOverflowEndButton}
            >
              <svg
                aria-hidden="true"
                width="18"
                height="18"
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
            </button>
          `,
        )}
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

  #componentElementRef = createRef<HTMLElement>();

  #currentActiveTab: GlideCoreTab | null = null;

  // Arbitrary debounce delay
  #debounceDelay = 100;

  #defaultSlotElementRef = createRef<HTMLSlotElement>();

  #localize = new LocalizeController(this);

  #navSlotElementRef = createRef<HTMLSlotElement>();

  // Theshold (in px) used to determine when to display overflow buttons.
  #overflowButtonsScrollDelta = 1;

  #overflowEndButtonElementRef = createRef<HTMLButtonElement>();

  #overflowStartButtonElementRef = createRef<HTMLButtonElement>();

  #previousActiveTab: GlideCoreTab | null = null;

  #resizeObserver: ResizeObserver | null = null;

  // https://stackoverflow.com/questions/45802988/typescript-use-correct-version-of-settimeout-node-vs-window
  #resizeTimeout: ReturnType<typeof setTimeout> | null = null;

  #scrollTimeout: ReturnType<typeof setTimeout> | null = null;

  #tabListElementRef = createRef<HTMLElement>();

  #onClick(event: Event) {
    const target = event.target as HTMLElement;
    const clickedTab = target.closest('glide-core-tab');

    if (
      clickedTab &&
      clickedTab instanceof GlideCoreTab &&
      !clickedTab.disabled
    ) {
      this.#showTab(clickedTab);
    }
  }

  #onClickOverflowEndButton() {
    this.#scrollTabsList('right');
  }

  #onClickOverflowStartButton() {
    this.#scrollTabsList('left');
  }

  #onDefaultSlotChange() {
    owSlotType(this.#defaultSlotElementRef.value, [GlideCoreTabPanel]);
  }

  #onFocusout() {
    // Set the last active tab as tabbable so that when pressing shift + tab on the tab panel
    // focus goes back to the last active tab.
    // The `focusout` event is used since it bubbles up from the tab.

    for (const [, tabElement] of this.tabElements.entries()) {
      tabElement.tabIndex = tabElement === this.activeTab ? 0 : -1;
    }
  }

  #onKeydown(event: KeyboardEvent) {
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
          case 'ArrowLeft': {
            index--;
            break;
          }
          case 'ArrowRight': {
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

        this.tabElements[index].focus({
          preventScroll: false,
        });

        // Set the last tab navigated to as tabbable so that, if the tab
        // button is pressed, then focus moves to the tab's panel and not back
        // to the last active tab. This is particularly noticeable when the active tab
        // is to the left of the tab navigated to by keyboard.

        for (const [, tabElement] of this.tabElements.entries()) {
          tabElement.tabIndex = this.tabElements[index] === tabElement ? 0 : -1;
        }

        this.#setOverflowButtonsState();

        event.preventDefault();
      }
    }
  }

  #onNavSlotChange() {
    owSlotType(this.#navSlotElementRef.value, [GlideCoreTab]);
    this.#setupTabs();
    this.#setActiveTab();
    this.#setOverflowButtonsState();
  }

  #onScroll() {
    // Debounce overflow button visibility calculations.
    if (this.#scrollTimeout) {
      clearTimeout(this.#scrollTimeout);
    }

    this.#scrollTimeout = setTimeout(() => {
      this.#setOverflowButtonsState();
    }, this.#debounceDelay);
  }

  #scrollTabsList(buttonPlacement: 'left' | 'right') {
    const directionFactor = buttonPlacement === 'right' ? 1 : -1;
    const percentageFactor = 0.5;

    ow(this.#tabListElementRef.value, ow.object.instanceOf(HTMLElement));

    const scrollDistance =
      directionFactor *
      this.#tabListElementRef.value?.clientWidth *
      percentageFactor;

    this.#tabListElementRef.value?.scrollBy({
      left: scrollDistance,
      top: 0,
    });
  }

  #setActiveTab() {
    for (const [index, tabElement] of this.tabElements.entries()) {
      // If there is no current active tab, default to the first tab
      if (!this.activeTab && index === 0) {
        this.activeTab = tabElement;
        this.activeTab.active = true;
        this.activeTab.tabIndex = 0;
      } else {
        tabElement.active = this.activeTab === tabElement;
        tabElement.tabIndex = this.activeTab === tabElement ? 0 : -1;
      }
    }

    for (const panel of this.panelElements) {
      const activeTabPanelName = this.activeTab?.getAttribute('panel');
      const thisPanelName = panel.getAttribute('name');

      panel.isActive = thisPanelName === activeTabPanelName;
      panel.tabIndex = thisPanelName === activeTabPanelName ? 0 : -1;
    }

    // Set the active tab indicator.

    if (this.activeTab === this.#previousActiveTab) return;

    if (
      this.activeTab &&
      this.tabElements.length > 0 &&
      this.#componentElementRef.value
    ) {
      const activeTabInlinePadding = Number.parseInt(
        window
          .getComputedStyle(this.activeTab)
          .getPropertyValue('padding-inline-start'),
      );

      const activeTabIndicatorTranslateLeft =
        this.activeTab === this.tabElements.at(0)
          ? activeTabInlinePadding
          : this.activeTab.offsetLeft - this.tabElements[0].offsetLeft;

      this.#componentElementRef.value.style.setProperty(
        '--active-tab-indicator-translate',
        `${activeTabIndicatorTranslateLeft}px`,
      );

      const activeTabIndicatorWidthAdjustment =
        this.activeTab === this.tabElements.at(0) ||
        this.activeTab === this.tabElements.at(-1)
          ? activeTabInlinePadding
          : 0;

      const { width: activeTabWidth } = this.activeTab.getBoundingClientRect();

      this.#componentElementRef.value.style.setProperty(
        '--active-tab-indicator-width',
        `${activeTabWidth - activeTabIndicatorWidthAdjustment}px`,
      );

      this.isAfterFirstUpdated = true;
    }
  }

  #setEndOverflowButtonState() {
    const tabListElement = this.#tabListElementRef.value;
    const tabListElementRect = tabListElement?.getBoundingClientRect();

    ow(tabListElement, ow.object.instanceOf(HTMLElement));

    if (tabListElementRect) {
      const { width: tabListElementWidth } = tabListElementRect;

      // `scrollLeft` needn't be an integer
      // https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollLeft
      const tabListElementScrollRight =
        tabListElement.scrollLeft + tabListElementWidth;

      const tabListElementScrollWidth = tabListElement.scrollWidth;

      this.isDisableOverflowEndButton =
        tabListElementScrollWidth - tabListElementScrollRight <=
        this.#overflowButtonsScrollDelta;
    }
  }

  #setOverflowButtonsState() {
    const tabListElement = this.#tabListElementRef.value;
    const tabListElementRect = tabListElement?.getBoundingClientRect();

    if (tabListElement && tabListElementRect) {
      const { width: tabListElementWidth } = tabListElementRect;

      this.isShowOverflowButtons =
        tabListElement.scrollWidth - tabListElementWidth >
        this.#overflowButtonsScrollDelta;
    }

    this.#setStartOverflowButtonState();
    this.#setEndOverflowButtonState();
  }

  #setStartOverflowButtonState() {
    ow(this.#tabListElementRef.value, ow.object.instanceOf(HTMLElement));

    this.isDisableOverflowStartButton =
      this.#tabListElementRef.value.scrollLeft <= 0;
  }

  #setupResizeObserver() {
    this.#resizeObserver = new ResizeObserver((entries) => {
      if (entries?.at(0)?.target === this.#tabListElementRef.value) {
        // Debounce overflow visibility calculations.
        if (this.#resizeTimeout) {
          clearTimeout(this.#resizeTimeout);
        }

        this.#resizeTimeout = setTimeout(() => {
          this.#setOverflowButtonsState();
        }, this.#debounceDelay);
      }
    });

    ow(this.#tabListElementRef.value, ow.object.instanceOf(HTMLElement));

    this.#resizeObserver.observe(this.#tabListElementRef.value);
  }

  #setupTabs() {
    for (const tabElement of this.tabElements) {
      const relatedPanel = this.panelElements
        .filter((panel) => panel.name === tabElement.panel)
        ?.at(0);

      if (relatedPanel?.getAttribute('id')) {
        tabElement.setAttribute(
          'aria-controls',
          relatedPanel.getAttribute('id')!,
        );

        relatedPanel.setAttribute(
          'aria-labelledby',
          tabElement.getAttribute('id')!,
        );
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
