import { LitElement, html } from 'lit';
import { LocalizeController } from './library/localize.js';
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
import ow, { owSlot } from './library/ow.js';
import styles from './popover.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-popover': GlideCorePopover;
  }
}

/**
 * @slot - The content of the popover.
 * @slot target - The element to which the popover will anchor, which can be any focusable element.
 */
@customElement('glide-core-popover')
export default class GlideCorePopover extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
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
  get offset() {
    return (
      this.#offset ??
      Number.parseFloat(
        window
          .getComputedStyle(document.body)
          .getPropertyValue('--glide-core-spacing-xxs'),
      ) *
        Number.parseFloat(
          window.getComputedStyle(document.documentElement).fontSize,
        )
    );
  }

  set offset(offset: number) {
    this.#offset = offset;
  }

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
    The placement of the popover relative to its target. Automatic placement will
    take over if the popover is cut off by the viewport. "bottom" by default.
  */
  @property()
  placement?: 'bottom' | 'left' | 'right' | 'top';

  override connectedCallback() {
    super.connectedCallback();

    // 1. The consumer has a click handler on a button.
    // 2. The user clicks the button.
    // 3. The button's click handler is called and it sets `this.open` to `true`.
    // 4. The "click" event bubbles up and is handled by `#onDocumentClick`.
    // 5. That handler sets `open` to `false` because the click came from outside Dropdown.
    // 6. Popover is opened then closed in the same frame and so never opens.
    //
    // `capture` ensures `#onDocumentClick` is called before #3, so that Popover
    // opens when the button's handler sets `this.open` to `true`.
    document.addEventListener('click', this.#onDocumentClick, {
      capture: true,
    });
  }

  override firstUpdated() {
    owSlot(this.#defaultSlotElementRef.value);
    owSlot(this.#targetSlotElementRef.value);

    ow(this.#popoverElementRef.value, ow.object.instanceOf(HTMLElement));

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

    if (this.open && !this.disabled) {
      this.#show();
    }

    // Popover's "click" handler on `document` listens for clicks in the capture
    // phase. There's a comment explaining why. `#isDefaultSlotclick` must be
    // set before that handler is called so it has the information it needs
    // to determine whether or not to close Popover. Same for `#isTargetSlotClick`
    // and `#isArrowClick`.
    this.#defaultSlotElementRef.value.addEventListener('mouseup', () => {
      this.#isDefaultSlotClick = true;
    });

    this.#targetSlotElementRef.value.addEventListener('mouseup', () => {
      this.#isTargetSlotClick = true;
    });

    this.#arrowElementRef.value?.addEventListener('mouseup', () => {
      this.#isArrowClick = true;
    });

    this.#targetSlotElementRef.value.addEventListener(
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

    /* eslint-disable lit-a11y/mouse-events-have-key-events, lit-a11y/accessible-name */
    return html`
      <div class="component">
        <slot
          class="target-slot"
          data-test="target-slot"
          name="target"
          @click=${this.#onTargetSlotClick}
          @keydown=${this.#onTargetSlotKeydown}
          @slotchange=${this.#onTargetSlotChange}
          ${ref(this.#targetSlotElementRef)}
        ></slot>

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
              ['top', () => arrows.top],
              ['right', () => arrows.right],
              ['bottom', () => arrows.bottom],
              ['left', () => arrows.left],
            ])}
          </div>

          <span
            aria-label=${ifDefined(
              this.disabled ? undefined : this.#localize.term('popover'),
            )}
          ></span>

          <slot
            class="default-slot"
            @slotchange=${this.#onDefaultSlotChange}
            ${ref(this.#defaultSlotElementRef)}
          ></slot>
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

  #localize = new LocalizeController(this);

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
      this.#isDefaultSlotClick = false;
      this.#isTargetSlotClick = false;
      this.#isArrowClick = false;

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

  #onDefaultSlotChange() {
    owSlot(this.#defaultSlotElementRef.value);
  }

  #onTargetSlotChange() {
    owSlot(this.#targetSlotElementRef.value);
  }

  #onTargetSlotClick() {
    this.open = !this.open;
  }

  #onTargetSlotKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
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
                        // the apperance of the 4, which is the desired outcome.
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

const arrows = {
  top: html`<svg aria-hidden="true" viewBox="0 0 16 9" fill="none">
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
        width="12"
        height="10"
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
  </svg>`,
  right: html`<svg aria-hidden="true" viewBox="0 0 9 16" fill="none">
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
        width="8"
        height="14"
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
  </svg>`,
  bottom: html`<svg aria-hidden="true" viewBox="0 0 16 9" fill="none">
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
  </svg>`,
  left: html`<svg aria-hidden="true" viewBox="0 0 9 16" fill="none">
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
        width="8"
        height="14"
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
  </svg>`,
};
