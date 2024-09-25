import './icon-button.js';
import './tooltip.js';
import { LitElement, html } from 'lit';
import { LocalizeController } from './library/localize.js';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
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
        ${when(
          this.#statusIndicatorVariant === 'success',
          () =>
            html`<svg
              aria-hidden="true"
              class=${classMap({
                icon: true,
                success: true,
              })}
              fill="none"
              height="16"
              width="16"
              viewBox="0 0 24 24"
            >
              <path
                clip-rule="evenodd"
                d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23ZM16.7071 9.70711C17.0976 9.31658 17.0976 8.68342 16.7071 8.29289C16.3166 7.90237 15.6834 7.90237 15.2929 8.29289L10 13.5858L7.70711 11.2929C7.31658 10.9024 6.68342 10.9024 6.29289 11.2929C5.90237 11.6834 5.90237 12.3166 6.29289 12.7071L9.29289 15.7071C9.68342 16.0976 10.3166 16.0976 10.7071 15.7071L16.7071 9.70711Z"
                fill="currentColor"
                fill-rule="evenodd"
              />
            </svg>`,
          () =>
            html`<svg
              aria-hidden="true"
              class=${classMap({
                icon: true,
                'warning-informational': true,
              })}
              fill="none"
              height="16"
              width="16"
              viewBox="0 0 24 24"
            >
              <path
                clip-rule="evenodd"
                d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23ZM13 8C13 7.44772 12.5523 7 12 7C11.4477 7 11 7.44772 11 8V12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12V8ZM12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z"
                fill="currentColor"
                fill-rule="evenodd"
              />
            </svg>`,
        )}

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
