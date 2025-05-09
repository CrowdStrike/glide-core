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
import styles from './popover.styles.js';
import assertSlot from './library/assert-slot.js';
import shadowRootMode from './library/shadow-root-mode.js';
import final from './library/final.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-popover': Popover;
  }
}

/**
 * @attr {boolean} [disabled=false]
 * @attr {number} [offset=4]
 * @attr {boolean} [open=false]
 * @attr {'bottom'|'left'|'right'|'top'} [placement]
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {Element | string} - The content of the popover
 * @slot {Element} [target] - The element to which the popover will anchor. Can be any focusable element.
 *
 * @fires {Event} toggle
 */
@customElement('glide-core-popover')
@final
export default class Popover extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: shadowRootMode,
  };

  static override styles = styles;

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

  set open(isOpen: boolean) {
    const hasChanged = isOpen !== this.#isOpen;
    this.#isOpen = isOpen;

    if (isOpen && hasChanged && !this.disabled) {
      this.#show();

      this.dispatchEvent(
        new Event('toggle', { bubbles: true, composed: true }),
      );
    } else if (hasChanged) {
      this.#hide();

      this.dispatchEvent(
        new Event('toggle', { bubbles: true, composed: true }),
      );
    }
  }

  /*
    The placement of the popover relative to its target. Automatic placement will
    take over if the popover is cut off by the viewport.
  */
  @property()
  placement?: 'bottom' | 'left' | 'right' | 'top';

  @property({ reflect: true })
  readonly version: string = packageJson.version;

  override connectedCallback() {
    super.connectedCallback();

    // 1. The consumer has a click handler on a button.
    // 2. The user clicks the button.
    // 3. The button's click handler is called and it sets `this.open` to `true`.
    // 4. The "click" event bubbles up and is handled by `#onDocumentClick`.
    // 5. That handler sets `open` to `false` because the click came from outside Popover.
    // 6. Popover is opened then closed in the same frame and so never opens.
    //
    // `capture` ensures `#onDocumentClick` is called before #3, so the button click
    // handler setting `open` to `true` isn't overwritten by this handler setting `open`
    // to `false`.
    document.addEventListener('click', this.#onDocumentClick, {
      capture: true,
    });
  }

  override firstUpdated() {
    if (this.#popoverElementRef.value) {
      // `popover` is used so the popover can break out of Modal or another container
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
      this.#popoverElementRef.value.popover = 'manual';
    }

    if (this.open && !this.disabled) {
      this.#show();
    }

    // Popover's "click" handler on `document` listens for clicks in the capture
    // phase. There's a comment explaining why. `#isDefaultSlotclick` must be
    // set before that handler is called so it has the information it needs
    // to determine whether or not to close Popover. Same for `#isTargetSlotClick`
    // and `#isArrowClick`.
    this.#defaultSlotElementRef.value?.addEventListener('mouseup', () => {
      this.#isDefaultSlotClick = true;
    });

    this.#targetSlotElementRef.value?.addEventListener('mouseup', () => {
      this.#isTargetSlotClick = true;
    });

    this.#arrowElementRef.value?.addEventListener('mouseup', () => {
      this.#isArrowClick = true;
    });

    this.#targetSlotElementRef.value?.addEventListener(
      'keydown',
      (event: KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') {
          this.#isTargetSlotClick = true;
        }
      },
    );
  }

  override render() {
    // Lit-a11y calls for "blur" and "focus" handlers but doesn't account for "focusin"
    // and "focusout". It also calls for popovers to have an `aria-label`, but then VoiceOver,
    // at least, won't read the popover's content. So an element with an `aria-label` is
    // placed inside the popover.

    return html`
      <div class="component">
        <slot
          class="target-slot"
          data-test="target-slot"
          name="target"
          @click=${this.#onTargetSlotClick}
          @keydown=${this.#onTargetSlotKeydown}
          ${assertSlot([Element])}
          ${ref(this.#targetSlotElementRef)}
        >
          <!--
            The element to which the popover will anchor. Can be any focusable element.
            @type {Element}
          -->
        </slot>

        <div
          class=${classMap({
            popover: true,
            [this.effectivePlacement]: true,
          })}
          id="popover"
          data-test="popover"
          ${ref(this.#popoverElementRef)}
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

          <slot
            class="default-slot"
            ${assertSlot()}
            ${ref(this.#defaultSlotElementRef)}
          >
            <!--
              The content of the popover
              @type {Element | string}
            -->
          </slot>
        </div>
      </div>
    `;
  }

  @state()
  private effectivePlacement: Placement = this.placement ?? 'bottom';

  #arrowElementRef = createRef<HTMLElement>();

  #cleanUpFloatingUi?: ReturnType<typeof autoUpdate>;

  #defaultSlotElementRef = createRef<HTMLSlotElement>();

  #isArrowClick = false;

  #isDefaultSlotClick = false;

  #isDisabled = false;

  #isOpen = false;

  #isTargetSlotClick = false;

  #offset: number | undefined;

  #popoverElementRef = createRef<HTMLElement>();

  #targetSlotElementRef = createRef<HTMLSlotElement>();

  // An arrow function field instead of a method so `this` is closed over and
  // set to the component instead of `document`.
  #onDocumentClick = () => {
    // Checking that the click's `event.target` is equal to `#defaultSlotElementRef.value`
    // would be a lot simpler. But, when the target is inside of another web component,
    // `event.target` will be that component instead. Same for `this.#isTargetSlotClick`
    // and `this.#isArrowClick`.
    if (
      this.#isDefaultSlotClick ||
      this.#isTargetSlotClick ||
      this.#isArrowClick
    ) {
      setTimeout(() => {
        // This handler will be called twice for a single click if the element clicked was
        // a `<label>`. Because clicking a `<label>` produces two "click" events.
        //
        // If we immediately set these variables to `false`, Popover will close when this
        // handler is called the second time. So we wait a tick to ensure both "click" events
        // have been dispatched.
        this.#isDefaultSlotClick = false;
        this.#isTargetSlotClick = false;
        this.#isArrowClick = false;
      });

      return;
    }

    this.open = false;
  };

  #hide() {
    this.#popoverElementRef.value?.hidePopover();

    if (this.#targetElement) {
      this.#targetElement.ariaExpanded = 'false';
    }

    this.#cleanUpFloatingUi?.();
  }

  #onTargetSlotClick() {
    this.open = !this.open;
  }

  #onTargetSlotKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      // Prevent Safari from leaving full screen.
      event.preventDefault();

      this.open = false;
    }
  }

  get #targetElement() {
    return this.#targetSlotElementRef.value?.assignedElements().at(0);
  }

  #show() {
    if (!this.disabled) {
      this.#cleanUpFloatingUi?.();

      if (this.#targetSlotElementRef.value && this.#popoverElementRef.value) {
        this.#cleanUpFloatingUi = autoUpdate(
          this.#targetSlotElementRef.value,
          this.#popoverElementRef.value,
          () => {
            (async () => {
              if (
                this.#targetSlotElementRef.value &&
                this.#popoverElementRef.value &&
                this.#arrowElementRef.value
              ) {
                // The Popover API doesn't allow overflow. And `.default-slot` has a
                // shadow. So ".popover" has padding equal to the shadow, which prevents
                // the shadow from getting cut off. But now we have to offset everything
                // by that padding. Try removing the padding offset below. You'll see what
                // I mean.
                const paddingOffset = Number.parseFloat(
                  window.getComputedStyle(this.#popoverElementRef.value)
                    .padding,
                );

                const { x, y, placement, middlewareData } =
                  await computePosition(
                    this.#targetSlotElementRef.value,
                    this.#popoverElementRef.value,
                    {
                      placement: this.placement,
                      middleware: [
                        // Every arrow icon is either 16 by 6 or 6 by 16 depending on which
                        // direction it faces. The "top" arrow, however, is necessarily 9 by
                        // 16 because its shadow extends past the arrow tip.
                        //
                        // So I either had to adjust the offset below and the height on `.arrow`
                        // just for the "top" arrow or make every arrow 16 by 9 (or 9 by 16)
                        // and apply a uniform offset. The latter turned out to be simpler.
                        //
                        // Thus the popover needs to be offset by -3 (6 - 9). I then add 1 to -3
                        // to give a little more room: to account for the effect on the eye of each
                        // arrow's shadow. So the offset is roughly 5 pixels, by default, but has
                        // the appearance of the 4, which is the desired outcome.
                        offset(this.offset - paddingOffset - 2),
                        flip({
                          fallbackStrategy: 'initialPlacement',
                        }),
                        shift({
                          limiter: limitShift({
                            // Shifting is limited so the arrow is never near the popover's rounded
                            // corners, which would leave a gap between the arrow and the part of
                            // the corner that's missing due to rounding. `30` is just a round number.
                            // `25` isn't enough.
                            offset: 30,
                          }),
                        }),
                        arrow({ element: this.#arrowElementRef.value }),
                      ],
                    },
                  );

                Object.assign(this.#popoverElementRef.value.style, {
                  left: `${x}px`,
                  top: `${y}px`,
                });

                Object.assign(this.#arrowElementRef.value.style, {
                  left: middlewareData.arrow?.x
                    ? `${middlewareData.arrow.x - paddingOffset}px`
                    : null,
                  top: middlewareData.arrow?.y
                    ? `${middlewareData.arrow.y - paddingOffset}px`
                    : null,
                });

                this.effectivePlacement = placement;
                this.#popoverElementRef.value.showPopover();

                if (this.#targetElement) {
                  this.#targetElement.ariaExpanded = 'true';
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
  topArrow: html`
    <svg aria-hidden="true" viewBox="0 0 16 9" fill="none">
      <mask
        id="mask0_13064_691"
        style="mask-type:alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
      >
        <path
          d="M16 6.99382e-07V9L0 9L3.93402e-07 0L16 6.99382e-07Z"
          fill="#D9D9D9"
        />
      </mask>
      <g mask="url(#mask0_13064_691)">
        <g filter="url(#filter0_d_13064_691)">
          <path
            d="M8.76822 5.603C8.36842 6.13234 7.63157 6.13233 7.23178 5.60299L3 0L13 9.19407e-07L8.76822 5.603Z"
            fill="currentColor"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_d_13064_691"
          x="2"
          y="0"
          width="0.75rem"
          height="0.625rem"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="3" />
          <feGaussianBlur stdDeviation="0.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_13064_691"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_13064_691"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  `,
  rightArrow: html`
    <svg aria-hidden="true" viewBox="0 0 9 16" fill="none">
      <mask
        id="mask0_13064_688"
        style="mask-type:alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
      >
        <path d="M9 16H1.39876e-06L0 7.86805e-07L9 0L9 16Z" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_13064_688)">
        <g filter="url(#filter0_d_13064_688)">
          <path
            d="M3.397 8.76822C2.86766 8.36843 2.86767 7.63157 3.39701 7.23178L9 3V13L3.397 8.76822Z"
            fill="currentColor"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_d_13064_688"
          x="2"
          y="3"
          width="0.5rem"
          height="0.875rem"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="3" />
          <feGaussianBlur stdDeviation="0.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_13064_688"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_13064_688"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  `,
  bottomArrow: html`
    <svg aria-hidden="true" viewBox="0 0 16 9" fill="none">
      <mask
        id="mask0_13064_685"
        style="mask-type:alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
      >
        <path d="M0 9L1.07324e-07 0L16 1.90798e-07V9H0Z" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_13064_685)">
        <g filter="url(#filter0_dd_13064_685)">
          <path
            d="M7.23178 3.397C7.63157 2.86766 8.36843 2.86767 8.76822 3.39701L13 9L3 9L7.23178 3.397Z"
            fill="currentColor"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_dd_13064_685"
          x="-5"
          y="-2"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="3" />
          <feGaussianBlur stdDeviation="4" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_13064_685"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="-1" />
          <feGaussianBlur stdDeviation="1" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_dropShadow_13064_685"
            result="effect2_dropShadow_13064_685"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect2_dropShadow_13064_685"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  `,
  leftArrow: html`
    <svg aria-hidden="true" viewBox="0 0 9 16" fill="none">
      <mask
        id="mask0_12969_88361"
        style="mask-type:alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
      >
        <path d="M0 0H9V16H0V0Z" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_12969_88361)">
        <g filter="url(#filter0_d_12969_88361)">
          <path
            d="M5.603 7.23178C6.13234 7.63157 6.13233 8.36843 5.60299 8.76822L0 13L4.82293e-07 3L5.603 7.23178Z"
            fill="currentColor"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_d_12969_88361"
          x="-1"
          y="3"
          width="0.5rem"
          height="0.875rem"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="3" />
          <feGaussianBlur stdDeviation="0.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_12969_88361"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_12969_88361"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  `,
};
