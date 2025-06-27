import './icon-button.js';
import { html, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import packageJson from '../package.json' with { type: 'json' };
import { LocalizeController } from './library/localize.js';
import Tab from './tab.js';
import TabPanel from './tab.panel.js';
import chevronIcon from './icons/chevron.js';
import onResize from './library/on-resize.js';
import styles from './tab.group.styles.js';
import assertSlot from './library/assert-slot.js';
import shadowRootMode from './library/shadow-root-mode.js';
import final from './library/final.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-tab-group': TabGroup;
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
@customElement('glide-core-tab-group')
@final
export default class TabGroup extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: shadowRootMode,
  };

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
            @slotchange=${this.#onNavSlotChange}
            ${assertSlot([Tab])}
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

      <slot @slotchange=${this.#onDefaultSlotChange} ${assertSlot([TabPanel])}>
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

  #tabListElementRef = createRef<HTMLElement>();

  get #firstTab() {
    return this.#tabElements.at(0);
  }

  get #lastSelectedTab() {
    return this.#tabElements.findLast(({ selected }) => selected);
  }

  get #panelElements() {
    return [
      ...this.querySelectorAll<TabPanel>(':scope > glide-core-tab-panel'),
    ];
  }

  get #tabElements() {
    return [...this.querySelectorAll<Tab>(':scope > glide-core-tab')];
  }

  #onComponentClick(event: Event) {
    const target = event.target as HTMLElement;
    const clickedTab = target.closest('glide-core-tab');

    if (
      clickedTab instanceof Tab &&
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
      event.target.closest('glide-core-tab');

    if (
      ['Enter', ' '].includes(event.key) &&
      tab instanceof Tab &&
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

      if (focusedElement instanceof Tab) {
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
      panel.privateIsSelected = panel.name === this.#lastSelectedTab?.panel;
      panel.tabIndex = panel.name === this.#lastSelectedTab?.panel ? 0 : -1;
    }

    this.#setAriaAttributes();
    this.#setOverflowButtonsState();
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

  #onTabListFocusout() {
    // Set the last selected tab as tabbable so that when pressing shift + tab on the tab panel
    // focus goes back to the last selected tab.
    // The `focusout` event is used since it bubbles up from the tab.
    for (const [, tabElement] of this.#tabElements.entries()) {
      tabElement.tabIndex = tabElement === this.#lastSelectedTab ? 0 : -1;
    }
  }

  #onTabListResize() {
    if (this.#resizeTimeout) {
      clearTimeout(this.#resizeTimeout);
    }

    this.#updateSelectedTabIndicator();

    // Toggling the overflow buttons will itself cause a resize. So we
    // wait a tick to avoid a loop.
    this.#resizeTimeout = setTimeout(() => {
      this.#setOverflowButtonsState();
    });
  }

  #onTabSelected(event: Event) {
    if (event.target instanceof Tab && event.target.selected) {
      this.#updateSelectedTabIndicator();
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

    for (const panel of this.#panelElements) {
      panel.privateIsSelected = panel.name === this.#lastSelectedTab?.panel;
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
}
