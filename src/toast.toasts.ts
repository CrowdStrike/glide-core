import './icon-button.js';
import { html, LitElement } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { choose } from 'lit/directives/choose.js';
import { when } from 'lit/directives/when.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import xIcon from './icons/x.js';
import { LocalizeController } from './library/localize.js';
import styles from './toast.toasts.styles.js';
import shadowRootMode from './library/shadow-root-mode.js';
import final from './library/final.js';
import GlideCoreToast from './toast.js';
import GlideCoreLink from './link.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-private-toasts': GlideCoreToasts;
  }
}

/**
 * @attr {GlideCoreToast[]} [toasts=[]]
 *
 * @method dismiss
 * @param {GlideCoreToast} toast
 *
 * @method show
 * @param {GlideCoreToast} toast
 * @returns Promise<void>
 *
 * @method showPopover
 */
@customElement('glide-core-private-toasts')
@final
export default class GlideCoreToasts extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: shadowRootMode,
  };

  static override styles = styles;

  @property({ type: Array })
  toasts: GlideCoreToast[] = [];

  dismiss(toast: GlideCoreToast): void {
    const index = this.toasts.indexOf(toast);

    this.toasts = [
      ...this.toasts.slice(0, index),
      ...this.toasts.slice(index + 1),
    ];

    toast.dismiss();

    if (this.toasts.length === 0) {
      this.remove();
    }
  }

  override firstUpdated() {
    if (this.#componentElementRef.value) {
      this.#componentElementRef.value.popover = 'manual';
    }
  }

  override render() {
    // Lit-ally doesn't know that our "mouseover" listener is only an affordance for
    // mouse users. It also doesn't know that the purpose of the "click" listener on
    // ".description" is only so that we can programmatically click the consumer's Toast.
    //
    /* eslint-disable lit-a11y/click-events-have-key-events, lit-a11y/mouse-events-have-key-events */
    return html`<div
      aria-label=${this.#localize.term('notifications')}
      class="component"
      data-test="component"
      role="region"
      tabindex="-1"
      ${ref(this.#componentElementRef)}
    >
      <div class="toasts">
        ${repeat(
          this.toasts,
          (toast) => toast.privateId,
          (toast) => {
            return html`<div
              aria-labelledby="prefix label description"
              class=${classMap({
                toast: true,
                error: toast.variant === 'error',
                informational: toast.variant === 'informational',
                success: toast.variant === 'success',
                show: Boolean(toast.privateShow),
                dismissing: Boolean(toast.privateDismissing),
                'dismissing-via-button': Boolean(
                  toast.privateDismissingViaButton,
                ),
              })}
              data-test="toast"
              role="alert"
              @mouseover=${this.#onToastMouseOver.bind(this, toast)}
              @mouseout=${this.#onToastMouseOut.bind(this, toast)}
              @transitionend=${this.#onToastTransitionEnd.bind(this, toast)}
            >
              <span class="prefix" id="prefix">
                ${this.#localize.term(toast.variant)}
              </span>

              ${choose(
                toast.variant,
                [
                  ['success', () => icons.success],
                  ['error', () => icons.error],
                ],
                () => icons.warningInformational,
              )}

              <div class="label" data-test="label" id="label">
                ${toast.label}
              </div>

              <glide-core-icon-button
                class="dismiss-button"
                data-test="dismiss-button"
                label=${this.#localize.term('dismiss')}
                variant="tertiary"
                @click=${this.#onToastDismissButtonClick.bind(this, toast)}
              >
                ${xIcon}
              </glide-core-icon-button>

              ${when(toast.privateDescription, () => {
                return html`
                  <div
                    class="description"
                    data-test="description"
                    id="description"
                    @click=${this.#onDescriptionClick.bind(this, toast)}
                  >
                    ${unsafeHTML(toast.privateDescription)}
                  </div>
                `;
              })}
            </div>`;
          },
        )}
      </div>
    </div>`;
  }

  override showPopover() {
    this.#componentElementRef.value?.showPopover();
  }

  static async show(toast: GlideCoreToast): Promise<void> {
    let toasts = document.querySelector('glide-core-private-toasts');

    if (!toasts) {
      toasts = document.createElement('glide-core-private-toasts');
      document.body.append(toasts);
    }

    if (toast.childNodes.length > 0) {
      let description = '';

      // Toast's inner HTML will include comments (`<!--?lit$277222571$-->`) used by
      // Lit in rendering. There's a good chance Lit will misbehave if we copy those
      // comments. So, to be safe, we only copy Element and Text nodes.
      for (const node of toast.childNodes) {
        if (node instanceof Element) {
          description += node.outerHTML;
        } else if (node instanceof Text) {
          description += node.textContent;
        }
      }

      toast.privateDescription = description.trim();
    }

    toasts.toasts = [toast, ...toasts.toasts];

    // The transition won't play if the toast is added to the DOM in the same
    // tick that the `.open` class is added to `.toast`. So we first add the
    // toast to the DOM (above), then we set `privateShow` to apply the class.
    // Then we force a render in the next frame (below).
    await toasts.updateComplete;

    toasts.showPopover();
    toast.privateShow = true;

    setTimeout(() => {
      // Because `privateShow` is only a reactive property of Toast, Toasts won't
      // know it needs to rerender. So we let it know.
      toasts.requestUpdate();
    });

    if (toast.duration < Number.POSITIVE_INFINITY) {
      toast.privateTimeoutId = setTimeout(() => {
        const isReducedMotion = window.matchMedia(
          '(prefers-reduced-motion: reduce)',
        ).matches;

        if (isReducedMotion) {
          toasts?.dismiss(toast);
        } else {
          toast.privateDismissing = true;

          // Because `privateDismissing` is only a reactive property of Toast, Toasts won't
          // know it needs to rerender. So we let it know.
          toasts.requestUpdate();
        }
      }, toast.duration);
    }
  }

  #componentElementRef = createRef<HTMLElement>();

  #localize = new LocalizeController(this);

  #onDescriptionClick(toast: GlideCoreToast, event: PointerEvent) {
    // We want to let the consumer decide if navigation should occur. So we
    // cancel the event here, and then programmatically click the consumer's
    // link. The consumer can cancel that link's "click" event if he wants to
    // prevent navigation.
    if (event.target instanceof GlideCoreLink) {
      event.preventDefault();
    }

    const link = [...toast.querySelectorAll('*')].find((element) => {
      if (event.target instanceof GlideCoreLink) {
        return (
          element instanceof GlideCoreLink &&
          element.label === event.target.label &&
          element.href === event.target.href
        );
      }
    });

    if (link instanceof GlideCoreLink) {
      link.click();
    }
  }

  #onToastDismissButtonClick(toast: GlideCoreToast) {
    const isReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (isReducedMotion) {
      this.dismiss(toast);
    } else {
      toast.privateDismissing = true;
      toast.privateDismissingViaButton = true;

      // Because `privateDismissing` and `privateDismissViaButton` are only reactive
      // properties of Toast, Toasts won't know it needs to rerender. So we let it know.
      this.requestUpdate();
    }
  }

  #onToastMouseOut(toast: GlideCoreToast) {
    if (toast.duration < Number.POSITIVE_INFINITY) {
      toast.privateTimeoutId = setTimeout(() => {
        const isReducedMotion = window.matchMedia(
          '(prefers-reduced-motion: reduce)',
        ).matches;

        if (isReducedMotion) {
          this.dismiss(toast);
        } else {
          toast.privateDismissing = true;

          // Because `privateDismissing` is only a reactive property of Toast, Toasts
          // won't know it needs to rerender. So we let it know.
          this.requestUpdate();
        }
      }, toast.duration);
    }
  }

  #onToastMouseOver(toast: GlideCoreToast) {
    clearTimeout(toast.privateTimeoutId);
  }

  #onToastTransitionEnd(toast: GlideCoreToast) {
    const toasts = document.querySelector('glide-core-private-toasts');

    // Checking `privateDismissing` ensures we don't dismiss Toasts when the
    // "transitionend" event comes from the transition that's played when they're
    // shown instead of the one played when they're dismissed.
    if (toasts && toast.privateDismissing) {
      this.dismiss(toast);
    }
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
    class="icon informational"
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
