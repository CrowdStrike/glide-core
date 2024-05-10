import { LitElement, html } from 'lit';
import {
  autoUpdate,
  computePosition,
  flip,
  offset,
  shift,
} from '@floating-ui/dom';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
import styles from './tooltip.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'cs-tooltip': CsTooltip;
  }
}

/**
 * @slot - The contents of the tooltip.
 * @slot target - The element to which the tooltip should attach.
 */
@customElement('cs-tooltip')
export default class CsTooltip extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
    mode: 'closed',
  };

  static override styles = styles;

  /* The placement of the tooltip relative to its target. Automatic placement will take over if the tooltip is cut off by the viewport. */
  @property()
  placement?: 'bottom' | 'left' | 'right' | 'top';

  override firstUpdated() {
    if (this.#targetElementRef.value && this.#tooltipElementRef.value) {
      autoUpdate(
        this.#targetElementRef.value,
        this.#tooltipElementRef.value,
        () => {
          (async () => {
            if (this.#targetElementRef.value && this.#tooltipElementRef.value) {
              const { placement, x, y } = await computePosition(
                this.#targetElementRef.value,
                this.#tooltipElementRef.value,
                {
                  placement: this.placement ?? 'bottom',
                  middleware: [
                    offset({
                      mainAxis:
                        Number.parseFloat(
                          window
                            .getComputedStyle(document.body)
                            .getPropertyValue('--cs-spacing-xxs'),
                        ) *
                          16 +
                        this.#triangleSize.width,
                    }),
                    flip({
                      fallbackStrategy: 'initialPlacement',
                    }),
                    shift(),
                  ],
                },
              );

              Object.assign(this.#tooltipElementRef.value.style, {
                left: `${x}px`,
                top: `${y}px`,
              });

              this.effectivePlacement = placement;
            }
          })();
        },
      );
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
      <div class="component">
        <div
          aria-describedby="tooltip"
          class="target"
          slot="target"
          @focusin=${this.#onFocusin}
          @focusout=${this.#onFocusout}
          @keydown=${this.#onKeydown}
          @mouseover=${this.#onMouseover}
          @mouseout=${this.#onMouseout}
          ${ref(this.#targetElementRef)}
        >
          <slot name="target"></slot>

          <svg
            class=${classMap({
              triangle: true,
              bottom: this.effectivePlacement === 'top',
              left: this.effectivePlacement === 'right',
              right: this.effectivePlacement === 'left',
              top: this.effectivePlacement === 'bottom',
              visible: this.isVisible,
            })}
            height="${this.#triangleSize.height}px"
            width="${this.#triangleSize.width}px"
            viewBox="0 0 6 10"
            fill="none"
            style="--triangle-height: ${this.#triangleSize
              .height}px; --triangle-width: ${this.#triangleSize.width}px;"
          >
            <path
              d="M0.921865 4.23178C0.442111 4.63157 0.442112 5.36843 0.921866 5.76822L6 10L6 -2.62268e-07L0.921865 4.23178Z"
              fill="#212121"
            />
          </svg>
        </div>

        <div
          class=${classMap({
            tooltip: true,
            visible: this.isVisible,
          })}
          id="tooltip"
          role="tooltip"
          ${ref(this.#tooltipElementRef)}
        >
          <span aria-label="Tooltip: "></span>
          <slot></slot>
        </div>
      </div>
    `;
  }

  @state()
  private effectivePlacement?: string;

  @state()
  private isVisible = false;

  #targetElementRef = createRef<HTMLSpanElement>();

  #tooltipElementRef = createRef<HTMLSpanElement>();

  #triangleSize = {
    height: 10,
    width: 6,
  };

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
    this.isVisible = false;
  }

  #onMouseover() {
    this.isVisible = true;
  }
}
