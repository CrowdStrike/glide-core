import { html, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property } from 'lit/decorators.js';
import packageJson from '../package.json' with { type: 'json' };
import ButtonGroupButton from './button-group.button.js';
import styles from './button-group.styles.js';
import assertSlot from './library/assert-slot.js';
import final from './library/final.js';
import required from './library/required.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-button-group': ButtonGroup;
  }
}

/**
 * @attr {string} label - For screenreaders
 * @attr {'horizontal'|'vertical'} [orientation='horizontal']
 * @attr {'icon-only'} [variant]
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {ButtonGroupButton}
 */
@customElement('glide-core-button-group')
@final
export default class ButtonGroup extends LitElement {
  /* v8 ignore start */
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: window.navigator.webdriver ? 'open' : 'closed',
  };
  /* v8 ignore stop */

  static override styles = styles;

  /**
   * For screenreaders
   **/
  @property({ reflect: true })
  @required
  label?: string;

  /**
   * @default undefined
   */
  @property({ reflect: true })
  get variant(): 'icon-only' | undefined {
    return this.#variant;
  }

  set variant(variant: 'icon-only' | undefined) {
    for (const button of this.#buttonElements) {
      button.privateVariant = variant;
    }

    this.#variant = variant;
  }

  /**
   * @default 'horizontal'
   */
  @property({ reflect: true, useDefault: true })
  get orientation(): 'horizontal' | 'vertical' {
    return this.#orientation;
  }

  set orientation(orientation: 'horizontal' | 'vertical') {
    for (const button of this.#buttonElements) {
      button.privateOrientation = orientation;
    }

    this.#orientation = orientation;
  }

  @property({ reflect: true })
  readonly version: string = packageJson.version;

  override render() {
    return html`
      <div
        class=${classMap({
          component: true,
          horizontal: this.orientation === 'horizontal',
          vertical: this.orientation === 'vertical',
        })}
      >
        <div class="label" id="label" data-test="label">${this.label}</div>

        <div
          aria-labelledby="label"
          role="radiogroup"
          class=${classMap({
            container: true,
            vertical: this.orientation === 'vertical',
          })}
        >
          <slot
            @click=${this.#onDefaultSlotClick}
            @keydown=${this.#onDefaultSlotKeydown}
            @private-selected=${this.#onDefaultSlotSelected}
            @slotchange=${this.#onDefaultSlotChange}
            ${assertSlot([ButtonGroupButton])}
            ${ref(this.#defaultSlotElementRef)}
          >
            <!--
              @required
              @type {ButtonGroupButton}
            -->
          </slot>
        </div>
      </div>
    `;
  }

  #defaultSlotElementRef = createRef<HTMLSlotElement>();

  #orientation: 'horizontal' | 'vertical' = 'horizontal';

  #variant?: 'icon-only';

  get #buttonElements() {
    return [...this.querySelectorAll('glide-core-button-group-button')];
  }

  #onDefaultSlotChange() {
    const areMultipleButtonsSelected =
      this.#buttonElements.filter(({ selected }) => selected).length > 1;

    if (areMultipleButtonsSelected) {
      // With form controls where only one control should be selected, like Radio Group
      // or single-select Dropdown, we allow consumers to set multiple options as
      // selected: both to match native and because we're able to avoid negative
      // outcomes, at the form level, by ensuring the `value` of those components only
      // includes one value.
      //
      // Button Group is different because its state doesn't end at a form. Its state is
      // always represented somewhere else in the application. And, if the data or logic
      // used to produce Button Group's state results in multiple selected buttons, then
      // the same data or logic may also produce multiple selected tables or panes, for
      // example.
      //
      // We could easily account for multiple selected buttons, like we do in other
      // components, by leaving every button selected and only showing the last one as
      // selected visually. But there's no guarantee that the logic responsible for
      // showing one table or pane instead of another is the same as Button Group. Maybe
      // the first selected table or pane is shown. Then there would be a mismatch
      // between Button Group and another part of the application.
      //
      // Long story short, that's why we throw. Because multiple selected buttons
      // indicates bad downstream data or logic that's likely to have consequences
      // outside of Button Group.
      throw new Error('Only one selected Button Group Button is allowed.');
    }

    const isButtonAlreadySelected = this.#buttonElements.find(
      ({ disabled, selected }) => !disabled && selected,
    );

    if (!isButtonAlreadySelected) {
      const firstEnabledButton = this.#buttonElements.find(
        ({ disabled }) => !disabled,
      );

      if (firstEnabledButton) {
        firstEnabledButton.selected = true;
      }
    }

    for (const button of this.#buttonElements) {
      button.privateVariant = this.variant;

      if (this.orientation) {
        button.privateOrientation = this.orientation;
      }
    }
  }

  // This handler could just as well go in Button Group Button. It's here for
  // consistency, so that Button Group alone manages the state of `selected`.
  #onDefaultSlotClick(event: PointerEvent) {
    if (event.target instanceof HTMLElement) {
      const button = event.target.closest('glide-core-button-group-button');

      // Guards against `button.selected` to prevent duplicate "change" and
      // "input" events.
      if (button && !button.disabled && !button.selected) {
        button.privateSelect();
      }
    }
  }

  #onDefaultSlotKeydown(event: KeyboardEvent) {
    const enabledButtons = this.#buttonElements.filter(
      ({ disabled }) => !disabled,
    );

    const selectedButtonIndex = enabledButtons.findIndex(
      ({ selected }) => selected,
    );

    if (['ArrowUp', 'ArrowLeft'].includes(event.key)) {
      const previousButton =
        enabledButtons[
          (selectedButtonIndex - 1 + enabledButtons.length) %
            enabledButtons.length
        ];

      event.preventDefault(); // Prevent scroll
      previousButton?.privateSelect();

      return;
    }

    if (['ArrowDown', 'ArrowRight'].includes(event.key)) {
      const nextButton =
        enabledButtons[(selectedButtonIndex + 1) % enabledButtons.length];

      event.preventDefault(); // Prevent scroll
      nextButton?.privateSelect();

      return;
    }

    if (event.key === ' ') {
      event.preventDefault(); // Prevent page scroll

      if (event.target instanceof HTMLElement) {
        const button = event.target.closest('glide-core-button-group-button');

        if (button && !button.disabled && !button.selected) {
          button.privateSelect();
        }
      }

      return;
    }
  }

  #onDefaultSlotSelected(event: Event) {
    // Guards against the button not being selected so that an event for every
    // deselected button isn't dispatched.
    if (event.target instanceof ButtonGroupButton && event.target.selected) {
      for (const button of this.#buttonElements) {
        if (button !== event.target) {
          button.selected = false;
        }
      }

      event.target.focus();
    }
  }
}
