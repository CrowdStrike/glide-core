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
  duration? = 5000;

  close() {
    const componentElement = this.#componentElementRef?.value;

    componentElement?.addEventListener(
      'transitionend',
      () => {
        componentElement?.classList?.remove('open');
        componentElement?.classList?.remove('closing');
        componentElement?.classList?.add('closed');

        this.dispatchEvent(new Event('close', { bubbles: true }));
      },
      { once: true },
    );

    componentElement?.classList?.add('closing');
  }

  override firstUpdated() {
    requestAnimationFrame(() => {
      this.open();
    });
  }

  open() {
    const duration = Math.max(this.duration ?? 0, 5000);

    if (duration < Number.POSITIVE_INFINITY) {
      setTimeout(() => {
        this.close();
      }, duration);
    }

    this.#componentElementRef?.value?.classList?.add('open');
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

  #localize = new LocalizeController(this);

  #handleCloseButtonClick() {
    this.close();
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
