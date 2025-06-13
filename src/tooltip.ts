import { html, LitElement } from 'lit';
import {
  arrow,
  autoUpdate,
  computePosition,
  flip,
  limitShift,
  offset,
  type Placement,
  shift,
} from '@floating-ui/dom';
import { choose } from 'lit/directives/choose.js';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
import packageJson from '../package.json' with { type: 'json' };
import styles from './tooltip.styles.js';
import './tooltip.container.js';
import assertSlot from './library/assert-slot.js';
import shadowRootMode from './library/shadow-root-mode.js';
import final from './library/final.js';
import required from './library/required.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-tooltip': Tooltip;
  }
}

/**
 * @attr {string} label
 * @attr {boolean} [disabled=false]
 * @attr {number} [offset=4]
 * @attr {boolean} [open=false]
 * @attr {'bottom'|'left'|'right'|'top'} [placement] - The placement of the tooltip relative to its target. Automatic placement will take over if the tooltip is cut off by the viewport.
 * @attr {boolean} [screenreader-hidden=false]
 * @attr {string[]} [shortcut=[]]
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {TooltipContainer} [private]
 * @slot {Element} target - The element to which the tooltip will anchor. Can be any element with an implicit or explicit ARIA role.
 *
 * @fires {Event} toggle
 */
@customElement('glide-core-tooltip')
@final
export default class Tooltip extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: shadowRootMode,
  };

  static override styles = styles;

  /**
   * @default undefined
   */
  @property({ reflect: true })
  @required
  get label(): string | undefined {
    return this.#label;
  }

  set label(label: string) {
    this.#label = label;

    const container = this.querySelector(
      'glide-core-private-tooltip-container',
    );

    if (container) {
      container.label = label;
    }
  }

  /**
   * @default false
   */
  @property({ reflect: true, type: Boolean })
  get disabled(): boolean {
    return this.#isDisabled;
  }

  set disabled(isDisabled: boolean) {
    this.#isDisabled = isDisabled;

    if (this.open && !isDisabled) {
      this.#show();
    } else {
      this.#hide();
    }

    const container = this.querySelector(
      'glide-core-private-tooltip-container',
    );

    if (container) {
      container.disabled = isDisabled;
    }

    const target = this.#targetSlotElementRef.value?.assignedElements().at(0);

    if (container && target && !this.disabled && !this.screenreaderHidden) {
      target.setAttribute('aria-describedby', container.id);
    } else if (container && target) {
      target.removeAttribute('aria-describedby');
    }
  }

  /**
   * @default 4
   */
  @property({ reflect: true, type: Number })
  get offset(): number {
    return (
      this.#offset ??
      Number.parseFloat(
        window
          .getComputedStyle(document.body)
          .getPropertyValue('--glide-core-spacing-base-xxs'),
      ) *
        Number.parseFloat(
          window.getComputedStyle(document.documentElement).fontSize,
        )
    );
  }

  set offset(offset: number) {
    this.#offset = offset;
  }

  /**
   * @default false
   */
  @property({ reflect: true, type: Boolean })
  get open(): boolean {
    return this.#isOpen;
  }

  /**
   * @default false
   */
  set open(isOpen: boolean) {
    const hasChanged = isOpen !== this.#isOpen;
    this.#isOpen = isOpen;

    if (isOpen && hasChanged && !this.disabled) {
      this.#show();

      this.dispatchEvent(
        new Event('toggle', { bubbles: true, composed: true }),
      );
    } else if (hasChanged && !this.disabled) {
      this.#hide();

      this.dispatchEvent(
        new Event('toggle', { bubbles: true, composed: true }),
      );
    }
  }

  /**
   * The placement of the tooltip relative to its target. Automatic placement will
   * take over if the tooltip is cut off by the viewport.
   */
  @property({ reflect: true })
  placement?: 'bottom' | 'left' | 'right' | 'top';

  /**
   * @default false
   */
  @property({ attribute: 'screenreader-hidden', reflect: true, type: Boolean })
  get screenreaderHidden(): boolean {
    return this.#isScreenreaderHidden;
  }

  set screenreaderHidden(isHidden: boolean) {
    this.#isScreenreaderHidden = isHidden;

    const container = this.querySelector(
      'glide-core-private-tooltip-container',
    );

    if (container) {
      container.screenreaderHidden = isHidden;
    }

    const target = this.#targetSlotElementRef.value?.assignedElements().at(0);

    if (container && target && !this.disabled && !this.screenreaderHidden) {
      target.setAttribute('aria-describedby', container.id);
    } else if (container && target) {
      target.removeAttribute('aria-describedby');
    }
  }

  /**
   * @default []
   */
  @property({ reflect: true, type: Array })
  get shortcut(): string[] {
    return this.#shortcut;
  }

  set shortcut(shortcut: string[]) {
    this.#shortcut = shortcut;

    const container = this.querySelector(
      'glide-core-private-tooltip-container',
    );

    if (container) {
      container.shortcut = shortcut;
    }
  }

  @property({ reflect: true })
  readonly version: string = packageJson.version;

  override disconnectedCallback() {
    super.disconnectedCallback();

    clearTimeout(this.#closeTimeoutId);
    clearTimeout(this.#openTimeoutId);
  }

  override firstUpdated() {
    if (this.#tooltipElementRef.value) {
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
      // "auto" also automatically opens the popover when its target is clicked. We
      // only want it to open on hover or focus.
      this.#tooltipElementRef.value.popover = 'manual';
    }

    if (this.open && !this.disabled) {
      this.#show();
    }

    const container = document.createElement(
      'glide-core-private-tooltip-container',
    );

    container.label = this.label;
    container.screenreaderHidden = this.screenreaderHidden;
    container.shortcut = this.shortcut;

    // There's a comment at the top of `./tooltip.container.ts` explaining why we append this component to the light DOM.
    this.append(container);
  }

  override render() {
    // Lit-a11y calls for "blur" and "focus" handlers but doesn't account for "focusin"
    // and "focusout".

    /* eslint-disable lit-a11y/mouse-events-have-key-events */
    return html`
      <div
        class="component"
        data-test="component"
        @mouseover=${this.#onComponentMouseover}
        @mouseout=${this.#onComponentMouseout}
      >
        <div class="target-slot-container">
          <slot
            class="target-slot"
            data-test="target-slot"
            name="target"
            @focusin=${this.#onTargetSlotFocusin}
            @focusout=${this.#onTargetSlotFocusout}
            @keydown=${this.#onTargetSlotKeydown}
            @slotchange=${this.#onTargetSlotChange}
            ${assertSlot()}
            ${ref(this.#targetSlotElementRef)}
          >
            <!--
              The element to which the tooltip will anchor.
              Can be any element with an implicit or explicit ARIA role.

              @required
              @type {Element}
            -->
          </slot>
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
              ['top', () => icons.topArrow],
              ['right', () => icons.rightArrow],
              ['bottom', () => icons.bottomArrow],
              ['left', () => icons.leftArrow],
            ])}
          </div>

          <div
            class=${classMap({
              content: true,
            })}
          >
            <slot class="default-slot" name="private">
              <!--
                @type {TooltipContainer}
              -->
            </slot>
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

  #isDisabled = false;

  #isOpen = false;

  #isScreenreaderHidden = false;

  #label?: string;

  #offset: number | undefined;

  #openTimeoutId?: ReturnType<typeof setTimeout>;

  #shortcut: string[] = [];

  #targetSlotElementRef = createRef<HTMLSlotElement>();

  #tooltipElementRef = createRef<HTMLElement>();

  #cancelClose() {
    clearTimeout(this.#closeTimeoutId);
  }

  #hide() {
    this.#tooltipElementRef.value?.hidePopover();
    this.#cleanUpFloatingUi?.();
  }

  #onComponentMouseout() {
    this.#scheduleClose();

    clearTimeout(this.#openTimeoutId);
  }

  #onComponentMouseover() {
    this.#cancelClose();

    // The open and close delays are stored in data attributes so tests can
    // configure them. Tests configure them, rather than using fake timers,
    // because they need real timers so they can await Floating UI's setup.
    //
    // Conditionals here and in `#scheduleClose` based on `window.navigator.webdriver`
    // would be a lot nicer. But one of that condition's branches would never get hit
    // in tests. So we'd fail to meet our coverage thresholds.
    this.#openTimeoutId = setTimeout(() => {
      this.open = true;
    }, Number(this.#tooltipElementRef.value?.dataset.openDelay));
  }

  #onTargetSlotChange() {
    const container = this.querySelector(
      'glide-core-private-tooltip-container',
    );

    const target = this.#targetSlotElementRef.value?.assignedElements().at(0);

    if (container && target && !this.disabled && !this.screenreaderHidden) {
      target.setAttribute('aria-describedby', container.id);
    }
  }

  #onTargetSlotFocusin() {
    this.open = true;
  }

  #onTargetSlotFocusout() {
    this.open = false;
  }

  #onTargetSlotKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      // Prevent Safari from leaving full screen.
      event.preventDefault();

      this.open = false;
    }
  }

  #scheduleClose() {
    this.#closeTimeoutId = setTimeout(() => {
      this.open = false;
    }, Number(this.#tooltipElementRef.value?.dataset.closeDelay));
  }

  #show() {
    if (!this.disabled) {
      this.#cleanUpFloatingUi?.();

      if (this.#targetSlotElementRef.value && this.#tooltipElementRef.value) {
        this.#cleanUpFloatingUi = autoUpdate(
          this.#targetSlotElementRef.value,
          this.#tooltipElementRef.value,
          () => {
            (async () => {
              if (
                this.#targetSlotElementRef.value &&
                this.#tooltipElementRef.value &&
                this.#arrowElementRef.value
              ) {
                const { x, y, placement, middlewareData } =
                  await computePosition(
                    this.#targetSlotElementRef.value,
                    this.#tooltipElementRef.value,
                    {
                      placement: this.placement,
                      middleware: [
                        offset(this.offset),
                        flip({
                          fallbackStrategy: 'initialPlacement',
                        }),
                        shift({
                          // So the tooltip can overlap its target in cases where it would otherwise
                          // overflow the viewport.
                          //
                          // Give a form control a super long label. Now reduce the size of your viewport.
                          // The tooltip should flip to the left instead of overflowing on the right.
                          //
                          // https://github.com/floating-ui/floating-ui/blob/933cacc6672e2ccd9409cf0e9f64acd7ebf450c4/website/pages/docs/shift.mdx#crossaxiskey
                          crossAxis: true,

                          limiter: limitShift({
                            // Shifting is limited so the arrow is never near the tooltip's rounded
                            // corners, which would leave a gap between the arrow and the part of
                            // the corner that's missing due to rounding. `20` is just a round number.
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

                const container = this.querySelector(
                  'glide-core-private-tooltip-container',
                );

                const isSupportedPlacement =
                  placement === 'bottom' ||
                  placement === 'left' ||
                  placement === 'right' ||
                  placement === 'top';

                if (container && isSupportedPlacement) {
                  container.placement = placement;
                }
              }
            })();
          },
        );
      }
    }
  }
}

const icons = {
  topArrow: html`<svg aria-hidden="true" viewBox="0 0 10 6" fill="none">
    <path
      d="M4.23178 5.07814C4.63157 5.55789 5.36843 5.55789 5.76822 5.07813L10 -7.9486e-08L-2.62268e-07 3.57628e-07L4.23178 5.07814Z"
      fill="currentColor"
    />
  </svg>`,
  rightArrow: html`<svg aria-hidden="true" viewBox="0 0 6 10" fill="none">
    <path
      d="M0.921865 4.23178C0.442111 4.63157 0.442112 5.36843 0.921866 5.76822L6 10L6 -2.62268e-07L0.921865 4.23178Z"
      fill="currentColor"
    />
  </svg>`,
  bottomArrow: html`<svg aria-hidden="true" viewBox="0 0 10 6" fill="none">
    <path
      d="M4.23178 0.921865C4.63157 0.442111 5.36843 0.442112 5.76822 0.921866L10 6L-2.62268e-07 6L4.23178 0.921865Z"
      fill="currentColor"
    />
  </svg>`,
  leftArrow: html`<svg aria-hidden="true" viewBox="0 0 6 10" fill="none">
    <path
      d="M5.07814 4.23178C5.55789 4.63157 5.55789 5.36843 5.07813 5.76822L-4.37114e-07 10L0 -2.62268e-07L5.07814 4.23178Z"
      fill="currentColor"
    />
  </svg>`,
};
