import { LitElement, html } from 'lit';
import {
  arrow,
  autoUpdate,
  computePosition,
  flip,
  offset,
  platform,
  shift,
} from '@floating-ui/dom';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { offsetParent } from 'composed-offset-position';
import { owSlot } from './library/ow.js';
import styles from './tooltip.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-tooltip': GlideCoreTooltip;
  }
}

/**
 * @slot - The contents of the tooltip.
 * @slot target - The element to which the tooltip should attach.
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
  disabled = false;

  /* The placement of the tooltip relative to its target. Automatic placement will take over if the tooltip is cut off by the viewport. */
  @property()
  placement?: 'bottom' | 'left' | 'right' | 'top';

  @state()
  containingBlock?: Element;

  override disconnectedCallback() {
    super.disconnectedCallback();

    clearTimeout(this.#closeTimeoutId);
    clearTimeout(this.#openTimeoutId);
  }

  override firstUpdated() {
    owSlot(this.#defaultSlotElementRef.value);
    owSlot(this.#targetSlotElementRef.value);
    this.#setUpFloatingUi();
  }

  @state()
  private get isVisible() {
    return this.#isVisible;
  }

  private set isVisible(isVisible: boolean) {
    this.#isVisible = isVisible;

    if (this.isVisible) {
      this.#setUpFloatingUi();
    } else {
      this.#cleanUpFloatingUi?.();
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
        @mouseover=${this.#onMouseover}
        @mouseout=${this.#onMouseout}
      >
        <div
          aria-labelledby=${ifDefined(this.disabled ? undefined : 'tooltip')}
          class="target"
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
            visible: this.isVisible && !this.disabled,
          })}
          id="tooltip"
          role=${ifDefined(this.disabled ? undefined : 'tooltip')}
          ${ref(this.#tooltipElementRef)}
        >
          <span
            aria-label=${ifDefined(this.disabled ? undefined : 'Tooltip: ')}
          ></span>

          <slot
            @slotchange=${this.#onDefaultSlotChange}
            ${ref(this.#defaultSlotElementRef)}
          ></slot>

          <div class="arrow" ${ref(this.#arrowElementRef)}></div>
        </div>
      </div>
    `;
  }

  setContainingBlock(containingBlock: Element) {
    this.containingBlock = containingBlock;
  }

  #arrowElementRef = createRef<HTMLDivElement>();

  #cleanUpFloatingUi?: ReturnType<typeof autoUpdate>;

  #closeTimeoutId?: ReturnType<typeof setTimeout>;

  #defaultSlotElementRef = createRef<HTMLSlotElement>();

  #isVisible = false;

  #openTimeoutId?: ReturnType<typeof setTimeout>;

  #targetElementRef = createRef<HTMLSpanElement>();

  #targetSlotElementRef = createRef<HTMLSlotElement>();

  #tooltipElementRef = createRef<HTMLSpanElement>();

  #cancelClose() {
    clearTimeout(this.#closeTimeoutId);
  }

  #onDefaultSlotChange() {
    owSlot(this.#defaultSlotElementRef.value);
  }

  #onFocusin() {
    this.isVisible = true;
  }

  #onFocusout() {
    this.isVisible = false;
  }

  #onKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.isVisible = false;
    }
  }

  #onMouseout() {
    this.#scheduleClose();

    clearTimeout(this.#openTimeoutId);
  }

  #onMouseover() {
    this.#cancelClose();

    this.#openTimeoutId = setTimeout(() => {
      this.isVisible = true;
    }, 300);
  }

  #onTargetSlotChange() {
    owSlot(this.#targetSlotElementRef.value);
  }

  #scheduleClose() {
    this.#closeTimeoutId = setTimeout(() => {
      this.isVisible = false;
    }, 200);
  }

  #setUpFloatingUi() {
    if (this.#targetElementRef.value && this.#tooltipElementRef.value) {
      this.#cleanUpFloatingUi = autoUpdate(
        this.#targetElementRef.value,
        this.#tooltipElementRef.value,
        () => {
          (async () => {
            if (this.#targetElementRef.value && this.#tooltipElementRef.value) {
              const arrowElement = this.#arrowElementRef.value!;

              const { placement, x, y, middlewareData } = await computePosition(
                this.#targetElementRef.value,
                this.#tooltipElementRef.value,
                {
                  platform: {
                    ...platform,
                    getOffsetParent: (element) => {
                      if (
                        this.containingBlock &&
                        // The arrow element's offsetParent is the tooltip itself
                        element !== this.#arrowElementRef.value
                      ) {
                        return this.containingBlock;
                      }

                      return platform.getOffsetParent(element, offsetParent);
                    },
                  },
                  placement: this.placement,
                  strategy: 'fixed',
                  middleware: [
                    offset(6),
                    flip({
                      fallbackStrategy: 'initialPlacement',
                    }),
                    shift(),
                    arrow({ element: arrowElement }),
                  ],
                },
              );

              Object.assign(this.#tooltipElementRef.value.style, {
                left: `${x}px`,
                top: `${y}px`,
              });

              const arrowX = middlewareData.arrow?.x ?? null;
              const arrowY = middlewareData.arrow?.y ?? null;

              const staticSide = {
                top: 'bottom',
                right: 'left',
                bottom: 'top',
                left: 'right',
              }[placement.split('-')[0]]!;

              Object.assign(arrowElement.style, {
                left: arrowX === null ? '' : `${arrowX}px`,
                top: arrowY === null ? '' : `${arrowY}px`,
                right: '',
                bottom: '',
                [staticSide]: '-3px',
              });
            }
          })();
        },
      );
    }
  }
}
