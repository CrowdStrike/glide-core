import './icon-button.js';
import { html, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, state } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import { LocalizeController } from './library/localize.js';
import GlideCoreTab from './tab.js';
import GlideCoreTabPanel from './tab.panel.js';
import chevronIcon from './icons/chevron.js';
import ow, { owSlotType } from './library/ow.js';
import styles from './tab.group.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-tab-group': GlideCoreTabGroup;
  }
}

/**
 * @cssprop [--panel-padding-inline-end]
 * @cssprop [--panel-padding-inline-start]
 * @cssprop [--tabs-padding-block-end]
 * @cssprop [--tabs-padding-block-start]
 * @cssprop [--tabs-padding-inline-end]
 * @cssprop [--tabs-padding-inline-start]
 *
 * @slot - One or more of `<glide-core-tab-panel>`.
 * @slot nav - One or more of `<glide-core-tab>`.
 */
@customElement('glide-core-tab-group')
export default class GlideCoreTabGroup extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: 'closed',
  };

  static override styles = styles;

  @state()
  get selectedTab() {
    return this.#selectedTab;
  }

  set selectedTab(tab: GlideCoreTab | null) {
    this.#previousSelectedTab = this.#selectedTab;
    this.#selectedTab = tab;
  }

  @state()
  isAfterFirstUpdated = false;

  @state()
  isDisableOverflowStartButton = false;

  @state()
  isDisableOverflowEndButton = false;

  @state()
  isShowOverflowButtons = false;

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
      <div class="tab-container" data-test="tab-container">
        ${when(
          this.isShowOverflowButtons,
          () => html`
            <button
              style="height: ${this.#tabListElementRef.value?.clientHeight}px"
              class=${classMap({
                'overflow-button': true,
                start: true,
                disabled: this.isDisableOverflowStartButton,
              })}
              @click=${this.#onClickOverflowStartButton}
              tabindex="-1"
              aria-label=${this.#localize.term('previousTab')}
              data-test="overflow-start-button"
              ${ref(this.#overflowStartButtonElementRef)}
              ?disabled=${this.isDisableOverflowStartButton}
            >
              ${chevronIcon}
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
                'overflow-button': true,
                end: true,
                disabled: this.isDisableOverflowEndButton,
              })}
              @click=${this.#onClickOverflowEndButton}
              tabindex="-1"
              aria-label=${this.#localize.term('nextTab')}
              data-test="overflow-end-button"
              ${ref(this.#overflowEndButtonElementRef)}
              ?disabled=${this.isDisableOverflowEndButton}
            >
              ${chevronIcon}
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

  // Arbitrary debounce delay
  #debounceDelay = 100;

  #defaultSlotElementRef = createRef<HTMLSlotElement>();

  #localize = new LocalizeController(this);

  #navSlotElementRef = createRef<HTMLSlotElement>();

  // Theshold (in px) used to determine when to display overflow buttons.
  #overflowButtonsScrollDelta = 1;

  #overflowEndButtonElementRef = createRef<HTMLButtonElement>();

  #overflowStartButtonElementRef = createRef<HTMLButtonElement>();

  #previousSelectedTab: GlideCoreTab | null = null;

  #resizeObserver: ResizeObserver | null = null;

  // https://stackoverflow.com/questions/45802988/typescript-use-correct-version-of-settimeout-node-vs-window
  #resizeTimeout: ReturnType<typeof setTimeout> | null = null;

  #scrollTimeout: ReturnType<typeof setTimeout> | null = null;

  #selectedTab: GlideCoreTab | null = null;

  #tabListElementRef = createRef<HTMLElement>();

  get #panelElements() {
    return [...this.querySelectorAll('glide-core-tab-panel')];
  }

  get #tabElements() {
    return [...this.querySelectorAll('glide-core-tab')];
  }

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
    // Set the last selected tab as tabbable so that when pressing shift + tab on the tab panel
    // focus goes back to the last selected tab.
    // The `focusout` event is used since it bubbles up from the tab.
    for (const [, tabElement] of this.#tabElements.entries()) {
      tabElement.tabIndex = tabElement === this.selectedTab ? 0 : -1;
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
      const focusedElement = this.#tabElements.find((tab) =>
        tab.matches(':focus'),
      );

      if (focusedElement instanceof GlideCoreTab) {
        let index = this.#tabElements.indexOf(focusedElement);

        switch (event.key) {
          case 'Home': {
            index = 0;
            break;
          }
          case 'End': {
            index = this.#tabElements.length - 1;
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
          index = this.#tabElements.length - 1;
        }

        if (index > this.#tabElements.length - 1) {
          index = 0;
        }

        this.#tabElements[index].focus({
          preventScroll: false,
        });

        // Set the last tab navigated to as tabbable so that, if the tab button
        // is pressed, focus moves to the tab's panel and not back to the
        // last selected tab. This is particularly noticeable when the selected
        // tab is to the left of the tab navigated to by keyboard.
        for (const [, tabElement] of this.#tabElements.entries()) {
          tabElement.tabIndex =
            this.#tabElements[index] === tabElement ? 0 : -1;
        }

        this.#setOverflowButtonsState();

        event.preventDefault();
      }
    }
  }

  #onNavSlotChange() {
    owSlotType(this.#navSlotElementRef.value, [GlideCoreTab]);
    this.#setupTabs();
    this.#setSelectedTab();
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

  #setSelectedTab() {
    for (const [index, tabElement] of this.#tabElements.entries()) {
      // If there is no selected tab, default to the first one.
      if (!this.selectedTab && index === 0) {
        this.selectedTab = tabElement;
        this.selectedTab.selected = true;
        this.selectedTab.tabIndex = 0;
      } else {
        tabElement.selected = this.selectedTab === tabElement;
        tabElement.tabIndex = this.selectedTab === tabElement ? 0 : -1;
      }
    }

    for (const panel of this.#panelElements) {
      const selectedTabPanelName = this.selectedTab?.getAttribute('panel');
      const thisPanelName = panel.getAttribute('name');

      panel.privateIsSelected = thisPanelName === selectedTabPanelName;
      panel.tabIndex = thisPanelName === selectedTabPanelName ? 0 : -1;
    }

    if (this.selectedTab === this.#previousSelectedTab) return;

    // Set the selected tab indicator.
    if (
      this.selectedTab &&
      this.#tabElements.length > 0 &&
      this.#componentElementRef.value
    ) {
      const selectedTabInlinePadding = Number.parseInt(
        window
          .getComputedStyle(this.selectedTab)
          .getPropertyValue('padding-inline-start'),
      );

      const selectedTabIndicatorTranslateLeft =
        this.selectedTab === this.#tabElements.at(0)
          ? selectedTabInlinePadding
          : this.selectedTab.offsetLeft - this.#tabElements[0].offsetLeft;

      this.#componentElementRef.value.style.setProperty(
        '--selected-tab-indicator-translate',
        `${selectedTabIndicatorTranslateLeft}px`,
      );

      const selectedTabIndicatorWidthAdjustment =
        this.selectedTab === this.#tabElements.at(0) ||
        this.selectedTab === this.#tabElements.at(-1)
          ? selectedTabInlinePadding
          : 0;

      const { width: selectedTabWidth } =
        this.selectedTab.getBoundingClientRect();

      this.#componentElementRef.value.style.setProperty(
        '--selected-tab-indicator-width',
        `${selectedTabWidth - selectedTabIndicatorWidthAdjustment}px`,
      );

      this.isAfterFirstUpdated = true;
    }
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
    for (const tabElement of this.#tabElements) {
      const relatedPanel = this.#panelElements
        .filter((panel) => panel.name === tabElement.panel)
        ?.at(0);

      if (relatedPanel?.id) {
        tabElement.setAttribute('aria-controls', relatedPanel.id);
        relatedPanel.setAttribute('aria-labelledby', tabElement.id);
      }
    }
  }

  #showTab(tab: GlideCoreTab) {
    this.selectedTab = tab;
    this.#setSelectedTab();

    tab.dispatchEvent(
      new Event('selected', {
        bubbles: true,
        composed: true,
      }),
    );
  }
}
