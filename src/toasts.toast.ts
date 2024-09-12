import './icon-button.js';
import './status-indicator.js';
import './tooltip.js';
import { LitElement, html } from 'lit';
import { LocalizeController } from './library/localize.js';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property } from 'lit/decorators.js';
import styles from './toasts.toast.styles.js';
import type { Toast } from './toasts.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-toast': GlideCoreToast;
  }
}

/**
 * @private
 * */
@customElement('glide-core-toast')
export default class GlideCoreToast extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: 'closed',
  };

  static override styles = styles;

  @property({ reflect: true })
  label?: string;

  @property({ reflect: true })
  description?: string;

  @property()
  variant!: Toast['variant'];

  @property({ type: Number })
  get duration() {
    return this.#duration;
  }

  set duration(value: number) {
    this.#duration = Math.max(value ?? 0, 5000);
    this.#remainingDuration = this.#duration;
  }

  close() {
    // console.log('close');
    const componentElement = this.#componentElementRef?.value;

    componentElement?.classList?.add('closed');

    componentElement?.addEventListener(
      'transitionend',
      () => {
        this.dispatchEvent(new Event('close', { bubbles: true }));
      },
      { once: true },
    );
  }

  override firstUpdated() {
    // console.log('firstUpdated');
    // debugger;
    requestAnimationFrame(() => {
      this.open();
      // this.isOnScreen = true;
    });
  }

  open() {
    // console.log('open');
    // const duration = Math.max(this.duration ?? 0, 5000);

    this.#lastTimestamp = Date.now();

    if (this.duration < Number.POSITIVE_INFINITY) {
      this.#durationTimeout = setTimeout(() => {
        this.close();
      }, this.duration);
    }

    // this.classList?.add('open');
  }

  override render() {
    return html`
      <div
        class=${classMap({
          component: true,
          [this.variant]: true,
        })}
        role="alert"
        aria-labelledby="label description"
        ${ref(this.#componentElementRef)}
        @mouseenter=${this.#onMouseEnter}
        @mouseleave=${this.#onMouseLeave}
      >
        <glide-core-status-indicator
          style="--size: 1.25rem;"
          class="icon"
          variant=${this.#statusIndicatorVariant}
        ></glide-core-status-indicator>

        <div class="label" id="label">${this.label}</div>

        <glide-core-icon-button
          label=${this.#localize.term('close')}
          variant="tertiary"
          class="close-button"
          @click=${this.#handleCloseButtonClick}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 6L18 18"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M18 6L6 18"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </glide-core-icon-button>

        <div class="description" id="description">${this.description}</div>
      </div>
    `;
  }

  #componentElementRef = createRef<HTMLDivElement>();

  #duration = 0;

  #durationTimeout: ReturnType<typeof setTimeout> | null = null;

  #lastTimestamp = 0;

  #localize = new LocalizeController(this);

  #remainingDuration = 0;

  #handleCloseButtonClick() {
    this.close();
  }

  #onMouseEnter() {
    if (this.duration !== Number.POSITIVE_INFINITY) {
      if (this.#durationTimeout) {
        clearTimeout(this.#durationTimeout);
      }

      const timeElaspsed = Date.now() - this.#lastTimestamp;

      this.#remainingDuration = Math.max(
        this.#remainingDuration - timeElaspsed,
        0,
      );

      // console.group();
      // console.log('timeElaspsed', timeElaspsed);
      // console.log('this.#remainingDuration', this.#remainingDuration);
      // console.log('this.#lastTimestamp', this.#lastTimestamp);
      // console.groupEnd();

      this.#lastTimestamp = Date.now();
    }
  }

  #onMouseLeave() {
    // console.log('onMouseLeave');

    if (this.duration !== Number.POSITIVE_INFINITY) {
      this.#durationTimeout = setTimeout(() => {
        this.close();
      }, this.#remainingDuration);
    }
  }

  get #statusIndicatorVariant(): 'warning-informational' | 'success' {
    return (
      {
        informational: 'warning-informational',
        success: 'success',
      } as const
    )[this.variant];
  }
}
