import { LitElement, html } from 'lit';
import {
  type Placement,
  arrow,
  autoUpdate,
  computePosition,
  flip,
  limitShift,
  offset,
  shift,
} from '@floating-ui/dom';
import { choose } from 'lit/directives/choose.js';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { map } from 'lit/directives/map.js';
import ow, { owSlot } from './library/ow.js';
import styles from './tooltip.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-tooltip': GlideCoreTooltip;
  }
}

/**
 * @slot - The primary content of the tooltip.
 * @slot target - The element to which the tooltip should anchor.
 */
@customElement('glide-core-tooltip')
export default class GlideCoreTooltip extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
    mode: 'closed',
  };

  static override styles = styles;

  @property({ reflect: true, type: Boolean })
  get disabled() {
    return this.#isDisabled;
  }

  set disabled(isDisabled: boolean) {
    this.#isDisabled = isDisabled;

    if (this.open && !isDisabled) {
      this.#show();
    } else {
      this.#hide();
    }
  }

  @property({ reflect: true, type: Number })
  offset = 4;

  @property({ reflect: true, type: Boolean })
  get open() {
    return this.#isOpen;
  }

  set open(isOpen: boolean) {
    this.#isOpen = isOpen;

    if (isOpen && !this.disabled) {
      this.#show();
    } else {
      this.#hide();
    }
  }

  /* 
    The placement of the tooltip relative to its target. Automatic placement will 
    take over if the tooltip is cut off by the viewport. "bottom" by default.
  */
  @property()
  placement?: 'bottom' | 'left' | 'right' | 'top';

  @property({ reflect: true, type: Array })
  shortcut: string[] = [];

  override disconnectedCallback() {
    super.disconnectedCallback();

    clearTimeout(this.#closeTimeoutId);
    clearTimeout(this.#openTimeoutId);
  }

  override firstUpdated() {
    owSlot(this.#defaultSlotElementRef.value);
    owSlot(this.#targetSlotElementRef.value);

    ow(this.#tooltipElementRef.value, ow.object.instanceOf(HTMLElement));

    // `popover` is used so the tooltip can break out of Modal or another container
    // that has `overflow: hidden`. And elements with `popover` are positioned
    // relative to the viewport. Thus Floating UI in addition to `popover`.
    //
    // Set here instead of in the template to escape Lit Analzyer, which isn't
    // aware of `popover` and doesn't have a way to disable a rule ("no-unknown-attribute").
    //
    // "auto" means only one popover can be open at a time. Consumers, however, may
    // have popovers in own components that need to be open while this one is open.
    //
    // "auto" also automatically opens the popover when its target is clicked. We want
    // it to remain closed when clicked when there are no menu options.
    this.#tooltipElementRef.value.popover = 'manual';

    if (this.open && !this.disabled) {
      this.#show();
    }
  }

  override render() {
    // VoiceOver doesn't support `aria-describedby` on elements that aren't form
    // controls, even if they have `tabindex="0"`. It also doesn't support `aria-live`
    // within a shadow DOM, which we could otherwise fall back to. Thus no VoiceOver
    // support.

    // Lit-a11y calls for "blur" and "focus" handlers but doesn't account for "focusin"
    // and "focusout". It also calls for tooltips to have an `aria-label`, but then VoiceOver,
    // at least, won't read the tooltip's content. So an element with an `aria-label` is
    // placed inside the tooltip.

    /* eslint-disable lit-a11y/mouse-events-have-key-events, lit-a11y/accessible-name */
    return html`
      <div
        class="component"
        data-test="component"
        @mouseover=${this.#onMouseover}
        @mouseout=${this.#onMouseout}
      >
        <div
          aria-labelledby=${ifDefined(this.disabled ? undefined : 'tooltip')}
          class="target"
          data-test="target"
          slot="target"
          @focusin=${this.#onFocusin}
          @focusout=${this.#onFocusout}
          @keydown=${this.#onKeydown}
          ${ref(this.#targetElementRef)}
        >
          <slot
            @slotchange=${this.#onTargetSlotChange}
            ${ref(this.#targetSlotElementRef)}
            name="target"
          ></slot>
        </div>

        <div
          class=${classMap({
            tooltip: true,
            [this.effectivePlacement]: true,
          })}
          id="tooltip"
          data-test="tooltip"
          data-open-delay="300"
          data-close-delay="200"
          role=${ifDefined(this.disabled ? undefined : 'tooltip')}
          ${ref(this.#tooltipElementRef)}
        >
          <div
            class=${classMap({
              arrow: true,
              [this.effectivePlacement]: true,
            })}
            data-test="arrow"
            ${ref(this.#arrowElementRef)}
          >
            ${choose(this.effectivePlacement, [
              [
                'top',
                () => html`
                  <svg viewBox="0 0 10 6" fill="none">
                    <path
                      d="M4.23178 5.07814C4.63157 5.55789 5.36843 5.55789 5.76822 5.07813L10 -7.9486e-08L-2.62268e-07 3.57628e-07L4.23178 5.07814Z"
                      fill="#212121"
                    />
                  </svg>
                `,
              ],
              [
                'right',
                () => html`
                  <svg viewBox="0 0 6 10" fill="none">
                    <path
                      d="M0.921865 4.23178C0.442111 4.63157 0.442112 5.36843 0.921866 5.76822L6 10L6 -2.62268e-07L0.921865 4.23178Z"
                      fill="#212121"
                    />
                  </svg>
                `,
              ],
              [
                'bottom',
                () => html`
                  <svg viewBox="0 0 10 6" fill="none">
                    <path
                      d="M4.23178 0.921865C4.63157 0.442111 5.36843 0.442112 5.76822 0.921866L10 6L-2.62268e-07 6L4.23178 0.921865Z"
                      fill="#212121"
                    />
                  </svg>
                `,
              ],
              [
                'left',
                () => html`
                  <svg viewBox="0 0 6 10" fill="none">
                    <path
                      d="M5.07814 4.23178C5.55789 4.63157 5.55789 5.36843 5.07813 5.76822L-4.37114e-07 10L0 -2.62268e-07L5.07814 4.23178Z"
                      fill="#212121"
                    />
                  </svg>
                `,
              ],
            ])}
          </div>

          <span
            aria-label=${ifDefined(this.disabled ? undefined : 'Tooltip: ')}
          ></span>

          <div
            class=${classMap({
              content: true,
              reversed: this.effectivePlacement === 'left',
            })}
          >
            <slot
              class="default-slot"
              @slotchange=${this.#onDefaultSlotChange}
              ${ref(this.#defaultSlotElementRef)}
            ></slot>

            <kbd
              class=${classMap({
                shortcut: true,
                reversed: this.effectivePlacement === 'left',
              })}
              data-test="shortcut"
            >
              ${this.shortcut.length === 1
                ? this.shortcut.at(0)
                : map(this.shortcut, (shortcut, index) => {
                    return html`
                      <kbd>${shortcut}</kbd>

                      ${index === this.shortcut.length - 1 ? '' : ' + '}
                    `;
                  })}
            </kbd>
          </div>
        </div>
      </div>
    `;
  }

  @state()
  private effectivePlacement: Placement = this.placement ?? 'bottom';

  #arrowElementRef = createRef<HTMLElement>();

  #cleanUpFloatingUi?: ReturnType<typeof autoUpdate>;

  #closeTimeoutId?: ReturnType<typeof setTimeout>;

  #defaultSlotElementRef = createRef<HTMLSlotElement>();

  #isDisabled = false;

  #isOpen = false;

  #openTimeoutId?: ReturnType<typeof setTimeout>;

  #targetElementRef = createRef<HTMLElement>();

  #targetSlotElementRef = createRef<HTMLSlotElement>();

  #tooltipElementRef = createRef<HTMLElement>();

  #cancelClose() {
    clearTimeout(this.#closeTimeoutId);
  }

  #hide() {
    this.#tooltipElementRef.value?.hidePopover();

    // https://github.com/CrowdStrike/glide-core/pull/307/files#r1718822821
    if (this.#cleanUpFloatingUi) {
      this.#cleanUpFloatingUi();
    }
  }

  #onDefaultSlotChange() {
    owSlot(this.#defaultSlotElementRef.value);
  }

  #onFocusin() {
    this.open = true;
  }

  #onFocusout() {
    this.open = false;
  }

  #onKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.open = false;
    }
  }

  #onMouseout() {
    this.#scheduleClose();

    clearTimeout(this.#openTimeoutId);
  }

  #onMouseover() {
    ow(this.#tooltipElementRef.value, ow.object.instanceOf(HTMLElement));

    this.#cancelClose();

    // The open and close delays are stored in data attributes so tests can
    // configure them. Tests configure them, rather than using fake timers,
    // because they need real timers so they can await Floating UI's setup.
    //
    // Conditionals here and in `#scheduleClose` based on `navigator.webdriver`
    // would be a lot nicer. But the non-`navigator.webdriver` condition would
    // never get hit in tests, so we'd fail to meet our coverage thresholds.
    this.#openTimeoutId = setTimeout(() => {
      this.open = true;
    }, Number(this.#tooltipElementRef.value.dataset.openDelay));
  }

  #onTargetSlotChange() {
    owSlot(this.#targetSlotElementRef.value);
  }

  #scheduleClose() {
    ow(this.#tooltipElementRef.value, ow.object.instanceOf(HTMLElement));

    this.#closeTimeoutId = setTimeout(() => {
      this.open = false;
    }, Number(this.#tooltipElementRef.value.dataset.closeDelay));
  }

  #show() {
    if (!this.disabled) {
      this.#cleanUpFloatingUi?.();

      if (this.#targetElementRef.value && this.#tooltipElementRef.value) {
        this.#cleanUpFloatingUi = autoUpdate(
          this.#targetElementRef.value,
          this.#tooltipElementRef.value,
          () => {
            (async () => {
              if (
                this.#targetElementRef.value &&
                this.#tooltipElementRef.value &&
                this.#arrowElementRef.value
              ) {
                const { x, y, placement, middlewareData } =
                  await computePosition(
                    this.#targetElementRef.value,
                    this.#tooltipElementRef.value,
                    {
                      placement: this.placement,
                      middleware: [
                        offset(this.offset),
                        flip({
                          fallbackStrategy: 'initialPlacement',
                        }),
                        shift({
                          limiter: limitShift({
                            // Shifting is limited so the arrow is never near tooltip's rounded
                            // corners, which would leave a gap between the arrow and the part of
                            // the corner that's missing due to rounding. `20` is just a rough number.
                            // `15` isn't enough.
                            offset: 20,
                          }),
                        }),
                        arrow({ element: this.#arrowElementRef.value }),
                      ],
                    },
                  );

                Object.assign(this.#tooltipElementRef.value.style, {
                  left: `${x}px`,
                  top: `${y}px`,
                });

                Object.assign(this.#arrowElementRef.value.style, {
                  left: middlewareData.arrow?.x
                    ? `${middlewareData.arrow.x}px`
                    : null,
                  top: middlewareData.arrow?.y
                    ? `${middlewareData.arrow.y}px`
                    : null,
                });

                this.effectivePlacement = placement;
                this.#tooltipElementRef.value.showPopover();
              }
            })();
          },
        );
      }
    }
  }
}
