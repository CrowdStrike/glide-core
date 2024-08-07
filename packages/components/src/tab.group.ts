import './icon-button.js';
import { LitElement, html } from 'lit';
import { LocalizeController } from './library/localize.js';
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

  /**
   * The tab element that is currently active
   * */
  @state() activeTab?: GlideCoreTab;

  @state()
  isShowOverflowStartButton = false;

  @state()
  isShowOverflowEndButton = false;

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
    this.#setupTabs();
    this.#setActiveTab();
    this.#setupResizeObserver();
  }

  override render() {
    return html`<div
      class="component"
      @click=${this.#onClick}
      @keydown=${this.#onKeydown}
    >
      <div class="tab-container">
        <div
          class="overflow-button-container"
          style="height: ${this.#tabListElementRef.value?.clientHeight}px"
        >
          ${when(
            this.isShowOverflowStartButton,
            () =>
              html`<button
                style="height: ${this.#tabListElementRef.value?.clientHeight}px"
                class="overflow"
                @click=${this.#onClickOverflowStartButton}
                tabindex="-1"
                aria-label=${this.#localize.term('previousTab')}
                data-test="overflow-start-button"
                ${ref(this.#overflowStartButtonElementRef)}
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
              </button>`,
          )}
        </div>
        <div
          role="tablist"
          class="tab-group"
          ${ref(this.#tabListElementRef)}
          @scroll=${this.#onScroll}
        >
          <slot
            name="nav"
            @slotchange=${this.#onNavSlotChange}
            ${ref(this.#navSlotElementRef)}
          ></slot>
        </div>
        <div
          class="overflow-button-container"
          style="height: ${this.#tabListElementRef.value?.clientHeight}px"
        >
          ${when(
            this.isShowOverflowEndButton,
            () => html`
              <button
                style="height: ${this.#tabListElementRef.value?.clientHeight}px"
                class="overflow"
                @click=${this.#onClickOverflowEndButton}
                tabindex="-1"
                aria-label=${this.#localize.term('nextTab')}
                data-test="overflow-end-button"
                ${ref(this.#overflowEndButtonElementRef)}
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

  // Arbitrary debounce delay
  #debounceDelay = 100;

  #defaultSlotElementRef = createRef<HTMLSlotElement>();

  #localize = new LocalizeController(this);

  #navSlotElementRef = createRef<HTMLSlotElement>();

  #overflowEndButtonElementRef = createRef<HTMLButtonElement>();

  #overflowStartButtonElementRef = createRef<HTMLButtonElement>();

  #resizeObserver: ResizeObserver | null = null;

  // https://stackoverflow.com/questions/45802988/typescript-use-correct-version-of-settimeout-node-vs-window
  #resizeTimeout: ReturnType<typeof setTimeout> | null = null;

  #scrollTimeout: ReturnType<typeof setTimeout> | null = null;

  #tabListElementRef = createRef<HTMLElement>();

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

  #onClickOverflowEndButton = () => {
    this.#scrollTabsList('right', true);
  };

  #onClickOverflowStartButton = () => {
    this.#scrollTabsList('left', true);
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

        this.#setOverflowButtonsVisibility();

        // Since tab widths and the tab list are of variable length, its possible that
        // when scrolling to the left or right only a few pixels of tab padding
        // are on-screen. When this happens, focus does not scroll the tab list and the tab
        // text isn't brought clearly into view. To protect against this case, determine whether to
        // scroll by comparing the overflow button's edge to the tab's text's edge.
        if (
          this.isShowOverflowStartButton &&
          this.#overflowStartButtonElementRef.value &&
          event.key === 'ArrowLeft'
        ) {
          // Since the shadow root of a tab is closed, we can't know what
          // the padding is (presently 1 rem). This could be solved in a number of ways, but this
          // works for now.
          const tabPadding = Number.parseInt(
            window.getComputedStyle(document.documentElement).fontSize,
          );

          const buttonRect =
            this.#overflowStartButtonElementRef.value?.getBoundingClientRect();

          const { right: buttonRight } = buttonRect;

          const tabRect = this.tabElements[index]?.getBoundingClientRect();
          const { right: tabRight } = tabRect;

          // tabRight - tabPadding is the edge of the tab's text.
          if (buttonRight > tabRight - tabPadding) {
            this.#scrollTabsList('left');
          }
        }

        if (
          this.isShowOverflowEndButton &&
          this.#overflowEndButtonElementRef.value &&
          event.key === 'ArrowRight'
        ) {
          // Since the shadowdom of a tab is closed, we can't know what
          // the padding is (presently 1 rem). This could be solved in a number of ways, but this
          // works for now.
          const tabPadding = Number.parseInt(
            window.getComputedStyle(document.documentElement).fontSize,
          );

          const buttonRect =
            this.#overflowEndButtonElementRef.value?.getBoundingClientRect();

          const { left: buttonLeft } = buttonRect;

          const tabRect = this.tabElements[index]?.getBoundingClientRect();
          const { left: tabLeft } = tabRect;

          // tabLeft + tabPadding is the edge of the tab's text
          if (buttonLeft < tabLeft + tabPadding) {
            this.#scrollTabsList('right');
          }
        }

        event.preventDefault();
      }
    }
  };

  #setOverflowButtonsVisibility = () => {
    this.#setStartOverflowButtonVisibility();
    this.#setEndOverflowButtonVisibility();
  };

  #onDefaultSlotChange() {
    owSlotType(this.#defaultSlotElementRef.value, [GlideCoreTabPanel]);
  }

  #onNavSlotChange() {
    owSlotType(this.#navSlotElementRef.value, [GlideCoreTab]);
    this.#setOverflowButtonsVisibility();
  }

  #onScroll() {
    // Debounce overflow button visibility calculations.
    this.#scrollTimeout && clearTimeout(this.#scrollTimeout);

    this.#scrollTimeout = setTimeout(() => {
      this.#setOverflowButtonsVisibility();
    }, this.#debounceDelay);
  }

  #scrollTabsList(buttonPlacement: 'left' | 'right', isSmooth?: boolean) {
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
      behavior: isSmooth ? 'smooth' : 'auto',
    });
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

  #setEndOverflowButtonVisibility() {
    const tabListElement = this.#tabListElementRef.value;
    const tabListElementRect = tabListElement?.getBoundingClientRect();

    ow(tabListElement, ow.object.instanceOf(HTMLElement));

    // Scroll to within 1px (rounding).
    const roundingDelta = 1;

    if (tabListElementRect) {
      const { width: tabListElementWidth } = tabListElementRect;

      // `scrollLeft` needn't be an integer
      // https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollLeft
      const tabListElementScrollRight =
        tabListElement.scrollLeft + tabListElementWidth;

      const tabListElementScrollWidth = tabListElement.scrollWidth;

      this.isShowOverflowEndButton =
        tabListElementScrollWidth - tabListElementScrollRight > roundingDelta;
    }
  }

  #setStartOverflowButtonVisibility() {
    ow(this.#tabListElementRef.value, ow.object.instanceOf(HTMLElement));

    this.isShowOverflowStartButton =
      this.#tabListElementRef.value.scrollLeft > 0;
  }

  #setupResizeObserver() {
    this.#resizeObserver = new ResizeObserver((entries) => {
      if (entries?.at(0)?.target === this.#tabListElementRef.value) {
        // Debounce overflow visibility calculations.
        this.#resizeTimeout && clearTimeout(this.#resizeTimeout);

        this.#resizeTimeout = setTimeout(() => {
          this.#setOverflowButtonsVisibility();
        }, this.#debounceDelay);
      }
    });

    ow(this.#tabListElementRef.value, ow.object.instanceOf(HTMLElement));

    this.#resizeObserver.observe(this.#tabListElementRef.value);
  }

  #setupTabs() {
    for (const tabElement of this.tabElements) {
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
