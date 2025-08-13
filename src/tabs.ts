import './icon-button.js';
import { html, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import packageJson from '../package.json' with { type: 'json' };
import { LocalizeController } from './library/localize.js';
import TabsTab from './tabs.tab.js';
import TabsPanel from './tabs.panel.js';
import chevronIcon from './icons/chevron.js';
import onResize from './library/on-resize.js';
import styles from './tabs.styles.js';
import assertSlot from './library/assert-slot.js';
import final from './library/final.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-tabs': Tabs;
  }
}

/**
 * @readonly
 * @attr {string} [version]
 *
 * @slot {TabPanel}
 * @slot {Tab} [nav]
 *
 * @cssprop [--tabs-padding-block-end=0rem]
 * @cssprop [--tabs-padding-block-start=0rem]
 * @cssprop [--tabs-padding-inline-end=0rem]
 * @cssprop [--tabs-padding-inline-start=0rem]
 */
@customElement('glide-core-tabs')
@final
export default class Tabs extends LitElement {
  /* c8 ignore start */
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: window.navigator.webdriver ? 'open' : 'closed',
  };
  /* c8 ignore stop */

  static override styles = styles;

  @property({ reflect: true })
  readonly version: string = packageJson.version;

  override render() {
    return html`<div
      class="component"
      @click=${this.#onComponentClick}
      @keydown=${this.#onComponentKeydown}
      ${ref(this.#componentElementRef)}
    >
      <div class="tab-container" data-test="tab-container">
        ${when(
          this.isShowOverflowButtons,
          () => html`
            <button
              aria-label=${this.#localize.term('previousTab')}
              class=${classMap({
                'overflow-button': true,
                start: true,
                disabled: this.isDisableOverflowStartButton,
              })}
              data-test="overflow-start-button"
              tabindex="-1"
              ?disabled=${this.isDisableOverflowStartButton}
              @click=${this.#onOverflowButtonClick.bind(this, 'start')}
              ${ref(this.#overflowStartButtonElementRef)}
            >
              ${chevronIcon}
            </button>
          `,
        )}
        <div
          class="tab-group"
          data-test="tablist"
          role="tablist"
          tabindex="-1"
          @focusout=${this.#onTabListFocusout}
          @scroll=${this.#setOverflowButtonsState}
          ${onResize(this.#onTabListResize.bind(this))}
          ${ref(this.#tabListElementRef)}
        >
          <slot
            name="nav"
            @private-selected=${this.#onTabSelected}
            @private-label-change=${this.#onTabLabelChange}
            @private-icon-slotchange=${this.#onTabIconSlotChange}
            @slotchange=${this.#onNavSlotChange}
            ${assertSlot([TabsTab], true)}
          >
            <!-- @type {Tab} -->
          </slot>

          <div
            class=${classMap({
              'selected-tab-indicator': true,
              animated: this.hasUpdated,
            })}
            data-test="selected-tab-indicator"
            ${ref(this.#selectedTabIndicatorElementRef)}
          ></div>
        </div>

        ${when(
          this.isShowOverflowButtons,
          () => html`
            <button
              aria-label=${this.#localize.term('nextTab')}
              class=${classMap({
                'overflow-button': true,
                end: true,
                disabled: this.isDisableOverflowEndButton,
              })}
              data-test="overflow-end-button"
              tabindex="-1"
              @click=${this.#onOverflowButtonClick.bind(this, 'end')}
              ?disabled=${this.isDisableOverflowEndButton}
              ${ref(this.#overflowEndButtonElementRef)}
            >
              ${chevronIcon}
            </button>
          `,
        )}
      </div>

      <slot
        @slotchange=${this.#onDefaultSlotChange}
        ${assertSlot([TabsPanel], true)}
      >
        <!-- @type {TabPanel} -->
      </slot>
    </div>`;
  }

  @state()
  private isDisableOverflowEndButton = false;

  @state()
  private isDisableOverflowStartButton = false;

  @state()
  private isShowOverflowButtons = false;

  #componentElementRef = createRef<HTMLElement>();

  #localize = new LocalizeController(this);

  #overflowEndButtonElementRef = createRef<HTMLButtonElement>();

  #overflowStartButtonElementRef = createRef<HTMLButtonElement>();

  #resizeTimeout: ReturnType<typeof setTimeout> | null = null;

  #selectedTabIndicatorElementRef = createRef<HTMLElement>();

  #tabAndPanelValidationTimeout: ReturnType<typeof setTimeout> | null = null;

  #tabListElementRef = createRef<HTMLElement>();

  get #firstTab() {
    return this.#tabElements.at(0);
  }

  get #lastSelectedTab() {
    return this.#tabElements.findLast(({ selected }) => selected);
  }

  get #panelElements() {
    return [
      ...this.querySelectorAll<TabsPanel>(':scope > glide-core-tabs-panel'),
    ];
  }

  get #tabElements() {
    return [...this.querySelectorAll<TabsTab>(':scope > glide-core-tabs-tab')];
  }

  #onComponentClick(event: Event) {
    const target = event.target as HTMLElement;
    const clickedTab = target.closest('glide-core-tabs-tab');

    if (
      clickedTab instanceof TabsTab &&
      !clickedTab.disabled &&
      // Tab Panels can themselves include a Tab Group. We want to ensure
      // we're dealing with one of this instance's Tabs and not a Tab in
      // a Tab Panel.
      this.#tabElements.includes(clickedTab)
    ) {
      clickedTab.selected = true;
    }
  }

  #onComponentKeydown(event: KeyboardEvent) {
    const tab =
      event.target instanceof HTMLElement &&
      event.target.closest('glide-core-tabs-tab');

    if (
      ['Enter', ' '].includes(event.key) &&
      tab instanceof TabsTab &&
      !tab.disabled
    ) {
      tab.selected = true;
      event.preventDefault(); // Prevent page scroll when Space is pressed
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

      if (focusedElement instanceof TabsTab) {
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

        this.#tabElements[index]?.focus({
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

        event.preventDefault(); // Prevent page scroll
      }
    }
  }

  #onDefaultSlotChange() {
    this.#setAriaAttributes();
    this.#updateSelectedTabIndicator();
    this.#validateTabAndPanelPairing();
  }

  #onNavSlotChange() {
    if (this.#lastSelectedTab) {
      this.#lastSelectedTab.tabIndex = 0;

      for (const tab of this.#tabElements) {
        if (tab.selected && tab !== this.#lastSelectedTab) {
          tab.selected = false;
          tab.tabIndex = -1;
        }
      }
    } else if (this.#firstTab) {
      this.#firstTab.selected = true;
      this.#firstTab.tabIndex = 0;
    }

    for (const panel of this.#panelElements) {
      panel.privateSelected = panel.name === this.#lastSelectedTab?.panel;
      panel.tabIndex = panel.name === this.#lastSelectedTab?.panel ? 0 : -1;
    }

    this.#setAriaAttributes();
    this.#setOverflowButtonsState();
    this.#validateTabAndPanelPairing();
  }

  #onOverflowButtonClick(button: 'start' | 'end') {
    const directionFactor = button === 'end' ? 1 : -1;
    const percentageFactor = 0.5;

    if (this.#tabListElementRef.value) {
      this.#tabListElementRef.value.scrollBy({
        left:
          directionFactor *
          this.#tabListElementRef.value.clientWidth *
          percentageFactor,
        top: 0,
      });
    }
  }

  #onTabIconSlotChange() {
    // Wait a tick for the icon slot to update, so the selected tab measurements
    // will be accurate.
    setTimeout(() => {
      this.#updateSelectedTabIndicator();
    });

    this.#resizeTimeout = setTimeout(() => {
      this.#setOverflowButtonsState();
    });
  }

  #onTabLabelChange() {
    // Wait a tick for the label to update, so the selected tab measurements
    // will be accurate.
    setTimeout(() => {
      this.#updateSelectedTabIndicator();
    });

    this.#resizeTimeout = setTimeout(() => {
      this.#setOverflowButtonsState();
    });
  }

  #onTabListFocusout() {
    // Set the last selected tab as tabbable so that when pressing Shift + Tab on the
    // Tab Panel focus goes back to the last selected tab.
    for (const [, tabElement] of this.#tabElements.entries()) {
      tabElement.tabIndex = tabElement === this.#lastSelectedTab ? 0 : -1;
    }
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

  #onTabSelected(event: Event) {
    if (event.target instanceof TabsTab && event.target.selected) {
      event.target.privateSelect();
      event.target.tabIndex = 0;

      for (const tab of this.#tabElements) {
        if (tab !== event.target) {
          tab.selected = false;
          tab.tabIndex = -1;
        }
      }
    } else if (this.#firstTab && !this.#lastSelectedTab) {
      this.#firstTab.privateSelect();
      this.#firstTab.tabIndex = 0;
    }

    this.#updateSelectedTabIndicator();

    for (const panel of this.#panelElements) {
      panel.privateSelected = panel.name === this.#lastSelectedTab?.panel;
      panel.tabIndex = panel.name === this.#lastSelectedTab?.panel ? 0 : -1;
    }
  }

  #setAriaAttributes() {
    for (const tab of this.#tabElements) {
      const relatedPanel = this.#panelElements
        .filter((panel) => panel.name === tab.panel)
        ?.at(0);

      if (relatedPanel?.id) {
        tab.setAttribute('aria-controls', relatedPanel.id);
        relatedPanel.setAttribute('aria-labelledby', tab.id);
      }
    }
  }

  #setOverflowButtonsState() {
    if (this.#tabListElementRef.value) {
      this.isShowOverflowButtons =
        this.#tabListElementRef.value.scrollWidth >
        this.#tabListElementRef.value.clientWidth;

      this.isDisableOverflowStartButton =
        this.#tabListElementRef.value.scrollLeft <= 0;

      this.isDisableOverflowEndButton =
        // Rounded because `scrollLeft` is a float and `clientWidth` and `scrollWidth`
        // are integers rounded up.
        Math.round(this.#tabListElementRef.value.scrollLeft) +
          this.#tabListElementRef.value.clientWidth >=
        this.#tabListElementRef.value.scrollWidth;
    }
  }

  #updateSelectedTabIndicator() {
    if (
      this.#lastSelectedTab &&
      this.#tabElements.length > 0 &&
      this.#selectedTabIndicatorElementRef.value
    ) {
      const isFirstTab = this.#lastSelectedTab === this.#tabElements.at(0);
      const isLastTab = this.#lastSelectedTab === this.#tabElements.at(-1);

      const selectedTabInlinePadding = isFirstTab
        ? Number.parseInt(
            window
              .getComputedStyle(this.#lastSelectedTab)
              .getPropertyValue('padding-inline-start'),
          )
        : isLastTab
          ? Number.parseInt(
              window
                .getComputedStyle(this.#lastSelectedTab)
                .getPropertyValue('padding-inline-end'),
            )
          : 0;

      const selectedTabIndicatorTranslateLeft =
        this.#lastSelectedTab === this.#tabElements.at(0)
          ? selectedTabInlinePadding
          : this.#lastSelectedTab.offsetLeft -
            // `this.#tabElements.at(0)` is guaranteed to be defined by the guard at the
            // top of this function.
            //
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            this.#tabElements.at(0)!.offsetLeft;

      this.#selectedTabIndicatorElementRef.value.style.setProperty(
        '--private-selected-tab-indicator-translate',
        `${selectedTabIndicatorTranslateLeft}px`,
      );

      const { width: selectedTabWidth } =
        this.#lastSelectedTab.getBoundingClientRect();

      this.#selectedTabIndicatorElementRef.value.style.setProperty(
        '--private-selected-tab-indicator-width',
        `${selectedTabWidth - selectedTabInlinePadding}px`,
      );
    }
  }

  #validateTabAndPanelPairing() {
    if (this.#tabAndPanelValidationTimeout) {
      clearTimeout(this.#tabAndPanelValidationTimeout);
    }

    // Wait a tick to allow both slots to update in case Tabs and Panels are added
    // in separate render cycles.
    this.#tabAndPanelValidationTimeout = setTimeout(() => {
      for (const tab of this.#tabElements) {
        if (!this.#panelElements.some((panel) => panel.name === tab.panel)) {
          throw new Error(
            `Tab with panel="${tab.panel}" has no matching Panel.`,
          );
        }
      }

      for (const panel of this.#panelElements) {
        if (!this.#tabElements.some((tab) => tab.panel === panel.name)) {
          throw new Error(
            `Panel with name="${panel.name}" has no matching Tab.`,
          );
        }
      }
    });
  }
}
