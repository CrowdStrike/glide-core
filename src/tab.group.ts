import './icon-button.js';
import { html, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import packageJson from '../package.json' with { type: 'json' };
import { LocalizeController } from './library/localize.js';
import GlideCoreTab from './tab.js';
import GlideCoreTabPanel from './tab.panel.js';
import chevronIcon from './icons/chevron.js';
import onResize from './library/on-resize.js';
import styles from './tab.group.styles.js';
import assertSlot from './library/assert-slot.js';
import shadowRootMode from './library/shadow-root-mode.js';
import final from './library/final.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-tab-group': GlideCoreTabGroup;
  }
}

/**
 * @readonly
 * @attr {0.19.1} [version]
 *
 * @slot {GlideCoreTabPanel}
 * @slot {GlideCoreTab} [nav]
 *
 * @cssprop [--tabs-padding-block-end=0rem]
 * @cssprop [--tabs-padding-block-start=0rem]
 * @cssprop [--tabs-padding-inline-end=0rem]
 * @cssprop [--tabs-padding-inline-start=0rem]
 *
 * @prop {boolean} isAfterFirstUpdated
 * @prop {boolean} isDisableOverflowEndButton
 * @prop {boolean} isDisableOverflowStartButton
 * @prop {boolean} isShowOverflowButtons
 */
@customElement('glide-core-tab-group')
@final
export default class GlideCoreTabGroup extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: shadowRootMode,
  };

  static override styles = styles;

  @property({ noAccessor: true, reflect: true })
  readonly version = packageJson.version;

  @state()
  isAfterFirstUpdated = false;

  @state()
  isDisableOverflowEndButton = false;

  @state()
  isDisableOverflowStartButton = false;

  @state()
  isShowOverflowButtons = false;

  @state()
  private get selectedTab() {
    return this.#selectedTab;
  }

  private set selectedTab(tab: GlideCoreTab | null) {
    this.#previousSelectedTab = this.#selectedTab;
    this.#selectedTab = tab;
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
          class=${classMap({
            'tab-group': true,
            animated: this.isAfterFirstUpdated,
          })}
          data-test="tablist"
          role="tablist"
          tabindex="-1"
          @scroll=${this.#setOverflowButtonsState}
          @focusout=${this.#onFocusout}
          ${onResize(this.#onTabListResize.bind(this))}
          ${ref(this.#tabListElementRef)}
        >
          <slot
            name="nav"
            @slotchange=${this.#onNavSlotChange}
            ${assertSlot([GlideCoreTab])}
          >
            <!-- @type {GlideCoreTab} -->
          </slot>
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
              ?disabled=${this.isDisableOverflowEndButton}
              ${ref(this.#overflowEndButtonElementRef)}
            >
              ${chevronIcon}
            </button>
          `,
        )}
      </div>

      <slot ${assertSlot([GlideCoreTabPanel])}>
        <!-- @type {GlideCoreTabPanel} -->
      </slot>
    </div>`;
  }

  override updated() {
    this.#setupTabs();
  }

  #componentElementRef = createRef<HTMLElement>();

  #localize = new LocalizeController(this);

  // Theshold (in px) used to determine when to display overflow buttons.
  #overflowButtonsScrollDelta = 1;

  #overflowEndButtonElementRef = createRef<HTMLButtonElement>();

  #overflowStartButtonElementRef = createRef<HTMLButtonElement>();

  #previousSelectedTab: GlideCoreTab | null = null;

  #resizeTimeout: ReturnType<typeof setTimeout> | null = null;

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

  #onFocusout() {
    // Set the last selected tab as tabbable so that when pressing shift + tab on the tab panel
    // focus goes back to the last selected tab.
    // The `focusout` event is used since it bubbles up from the tab.
    for (const [, tabElement] of this.#tabElements.entries()) {
      tabElement.tabIndex = tabElement === this.selectedTab ? 0 : -1;
    }
  }

  #onKeydown(event: KeyboardEvent) {
    const tab =
      event.target instanceof HTMLElement &&
      event.target.closest('glide-core-tab');

    if (
      ['Enter', ' '].includes(event.key) &&
      tab &&
      tab instanceof GlideCoreTab &&
      !tab.disabled
    ) {
      this.#showTab(tab);
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
    this.#setupTabs();
    this.#setSelectedTab();
    this.#setOverflowButtonsState();
  }

  #onTabListResize() {
    if (this.#resizeTimeout) {
      clearTimeout(this.#resizeTimeout);
    }

    // Toggling the overflow buttons will itself cause a resize. So we
    // wait a tick to avoid a loop.
    this.#resizeTimeout = setTimeout(() => {
      this.#setOverflowButtonsState();
    });
  }

  #scrollTabsList(buttonPlacement: 'left' | 'right') {
    const directionFactor = buttonPlacement === 'right' ? 1 : -1;
    const percentageFactor = 0.5;

    if (this.#tabListElementRef.value) {
      const scrollDistance =
        directionFactor *
        this.#tabListElementRef.value.clientWidth *
        percentageFactor;

      this.#tabListElementRef.value.scrollBy({
        left: scrollDistance,
        top: 0,
      });
    }
  }

  #setEndOverflowButtonState() {
    const tabListElement = this.#tabListElementRef.value;
    const tabListElementRect = tabListElement?.getBoundingClientRect();

    if (tabListElementRect && tabListElement) {
      const { width: tabListElementWidth } = tabListElementRect;

      const tabListElementScrollRight =
        tabListElement.scrollLeft + tabListElementWidth;

      const tabListElementScrollWidth = tabListElement.scrollWidth;

      this.isDisableOverflowEndButton =
        tabListElementScrollWidth - tabListElementScrollRight <=
        this.#overflowButtonsScrollDelta;
    }
  }

  #setOverflowButtonsState() {
    if (this.#tabListElementRef.value) {
      const { width } = this.#tabListElementRef.value.getBoundingClientRect();

      this.isShowOverflowButtons =
        this.#tabListElementRef.value.scrollWidth - width >
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
        '--private-selected-tab-indicator-translate',
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
        '--private-selected-tab-indicator-width',
        `${selectedTabWidth - selectedTabIndicatorWidthAdjustment}px`,
      );

      this.isAfterFirstUpdated = true;
    }
  }

  #setStartOverflowButtonState() {
    if (this.#tabListElementRef.value) {
      this.isDisableOverflowStartButton =
        this.#tabListElementRef.value.scrollLeft <= 0;
    }
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
  }
}
