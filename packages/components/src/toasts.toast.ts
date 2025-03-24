import './icon-button.js';
import { html, LitElement } from 'lit';
import { choose } from 'lit/directives/choose.js';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { LocalizeController } from './library/localize.js';
import styles from './toasts.toast.styles.js';
import xIcon from './icons/x.js';
import shadowRootMode from './library/shadow-root-mode.js';
import final from './library/final.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-toast': GlideCoreToast;
  }
}

/**
 * @attr {string} [description]
 * @attr {number} [duration=5000]
 * @attr {string} [label]
 * @attr {'error'|'informational'|'success'} [variant]
 *
 * @fires {Event} close
 *
 * @method close
 * @method open
 */
@customElement('glide-core-toast')
@final
export default class GlideCoreToast extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: shadowRootMode,
  };

  static override styles = styles;

  @property({ reflect: true })
  label?: string;

  @property({ reflect: true })
  description?: string;

  @property({ type: Number })
  duration? = 5000;

  @property()
  variant?: 'error' | 'informational' | 'success';

  close(): void {
    this.#componentElementRef.value?.addEventListener(
      'transitionend',
      () => {
        this.#componentElementRef.value?.classList.remove('open', 'closing');
        this.#componentElementRef.value?.classList.add('closed');

        this.dispatchEvent(new Event('close', { bubbles: true }));
      },
      { once: true },
    );

    this.#componentElementRef.value?.classList.add('closing');
  }

  override firstUpdated() {
    requestAnimationFrame(() => {
      this.open();
    });
  }

  open(): void {
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
        aria-labelledby="prefix label description"
        class=${classMap({
          component: true,
          error: this.variant === 'error',
          informational: this.variant === 'informational',
          success: this.variant === 'success',
        })}
        data-test="component"
        role="alert"
        ${ref(this.#componentElementRef)}
      >
        <span class="prefix" id="prefix">
          ${this.#localize.term(this.variant!)}
        </span>

        ${choose(
          this.variant,
          [
            ['success', () => icons.success],
            ['error', () => icons.error],
          ],
          () => icons.warningInformational,
        )}

        <div class="label" id="label">${this.label}</div>

        <glide-core-icon-button
          class="close-button"
          data-test="close-button"
          label=${this.#localize.term('close')}
          variant="tertiary"
          @click=${this.#handleCloseButtonClick}
        >
          ${xIcon}
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
}

const icons = {
  error: html`<svg
    aria-hidden="true"
    class="icon error"
    fill="none"
    viewBox="0 0 20 20"
    style=${styleMap({
      height: '1.25rem',
      width: '1.25rem',
    })}
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M9.99998 0.833328C4.93737 0.833328 0.833313 4.93738 0.833313 9.99999C0.833313 15.0626 4.93737 19.1667 9.99998 19.1667C15.0626 19.1667 19.1666 15.0626 19.1666 9.99999C19.1666 4.93738 15.0626 0.833328 9.99998 0.833328ZM13.0892 6.91074C13.4147 7.23618 13.4147 7.76381 13.0892 8.08925L11.1785 9.99999L13.0892 11.9107C13.4147 12.2362 13.4147 12.7638 13.0892 13.0892C12.7638 13.4147 12.2362 13.4147 11.9107 13.0892L9.99998 11.1785L8.08923 13.0892C7.7638 13.4147 7.23616 13.4147 6.91072 13.0892C6.58529 12.7638 6.58529 12.2362 6.91072 11.9107L8.82147 9.99999L6.91072 8.08925C6.58529 7.76381 6.58529 7.23618 6.91072 6.91074C7.23616 6.5853 7.7638 6.5853 8.08923 6.91074L9.99998 8.82148L11.9107 6.91074C12.2362 6.5853 12.7638 6.5853 13.0892 6.91074Z"
      fill="currentColor"
    />
  </svg>`,
  success: html`<svg
    aria-hidden="true"
    class="icon success"
    fill="none"
    viewBox="0 0 20 20"
    style=${styleMap({
      height: '1.25rem',
      width: '1.25rem',
    })}
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M9.99999 0.833336C4.93738 0.833336 0.833328 4.93739 0.833328 10C0.833328 15.0626 4.93738 19.1667 9.99999 19.1667C15.0626 19.1667 19.1667 15.0626 19.1667 10C19.1667 4.93739 15.0626 0.833336 9.99999 0.833336ZM14.3392 8.08926C14.6647 7.76382 14.6647 7.23618 14.3392 6.91075C14.0138 6.58531 13.4862 6.58531 13.1607 6.91075L8.74999 11.3215L6.83925 9.41075C6.51381 9.08531 5.98618 9.08531 5.66074 9.41075C5.3353 9.73618 5.3353 10.2638 5.66074 10.5893L8.16074 13.0893C8.48618 13.4147 9.01381 13.4147 9.33925 13.0893L14.3392 8.08926Z"
      fill="currentColor"
    />
  </svg>`,
  warningInformational: html`<svg
    aria-hidden="true"
    class="icon warning-informational"
    fill="none"
    viewBox="0 0 20 20"
    style=${styleMap({
      height: '1.25rem',
      width: '1.25rem',
    })}
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M9.99999 0.833328C4.93738 0.833328 0.833328 4.93738 0.833328 9.99999C0.833328 15.0626 4.93738 19.1667 9.99999 19.1667C15.0626 19.1667 19.1667 15.0626 19.1667 9.99999C19.1667 4.93738 15.0626 0.833328 9.99999 0.833328ZM10.8333 6.66666C10.8333 6.20642 10.4602 5.83333 9.99999 5.83333C9.53976 5.83333 9.16666 6.20642 9.16666 6.66666V9.99999C9.16666 10.4602 9.53976 10.8333 9.99999 10.8333C10.4602 10.8333 10.8333 10.4602 10.8333 9.99999V6.66666ZM9.99999 12.5C9.53976 12.5 9.16666 12.8731 9.16666 13.3333C9.16666 13.7936 9.53976 14.1667 9.99999 14.1667H10.0083C10.4686 14.1667 10.8417 13.7936 10.8417 13.3333C10.8417 12.8731 10.4686 12.5 10.0083 12.5H9.99999Z"
      fill="currentColor"
    />
  </svg>`,
};
