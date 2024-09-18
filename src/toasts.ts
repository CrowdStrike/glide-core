import './toasts.toast.js';
import { LitElement, html } from 'lit';
import { LocalizeController } from './library/localize.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement } from 'lit/decorators.js';
import GlideCoreToast from './toasts.toast.js';
import ow from './library/ow.js';
import styles from './toasts.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-toasts': GlideCoreToasts;
  }
}

export interface Toast {
  label: string;
  description: string;
  variant: 'informational' | 'success';
  duration?: number;
}

interface ToastAction {
  type: 'add' | 'remove';
  payload: Toast | GlideCoreToast;
}

@customElement('glide-core-toasts')
export default class GlideCoreToasts extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: 'closed',
  };

  static override styles = styles;

  /**
   * @param {number} [toast.duration=5000]
   *  Optional: Number of milliseconds before the Toast auto-hides.
   *  Minimum: `5000`. Default: `5000`. For a Toast that never auto-hides, set to `Infinity`
   *  */
  add(toast: Toast) {
    ow(this.#componentElementRef.value, ow.object.instanceOf(Element));
    const { variant, label, description, duration } = toast;

    this.#queueProxy?.push({
      type: 'add',
      payload: {
        variant,
        label,
        description,
        duration,
      },
    });
  }

  override disconnectedCallback() {
    this.#matchMedia?.removeEventListener('change', this.#onMatchMediaChange);
  }

  override firstUpdated() {
    this.#queueProxy = new Proxy<ToastAction[]>(this.#queue, {
      set: (target: ToastAction[], property: string, value: ToastAction) => {
        Reflect.set(target, property, value);

        if (Number.parseInt(property) >= 0 && !this.#isQueueWorking) {
          this.#isQueueWorking = true;

          requestAnimationFrame(() => {
            this.#processQueue();
          });
        }

        return true;
      },
    });

    this.#componentElementRef.value?.addEventListener(
      'close',
      (event: Event) => {
        if (event?.target instanceof GlideCoreToast) {
          const target = event.target;

          this.#queueProxy?.push({ type: 'remove', payload: target });
        }
      },
    );

    this.#matchMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.#isPrefersReducedMotion = this.#matchMedia.matches;

    this.#matchMedia.addEventListener('change', this.#onMatchMediaChange);
  }

  override render() {
    return html`
      <div
        class="component"
        role="region"
        tabindex="-1"
        aria-label=${this.#localize.term('notifications')}
        ${ref(this.#componentElementRef)}
      >
        <slot ${ref(this.#defaultSlotElementRef)}></slot>
      </div>
    `;
  }

  #animationDuration = 200;

  #animations: Animation[] = [];

  #componentElementRef = createRef<HTMLDivElement>();

  #defaultSlotElementRef = createRef<HTMLSlotElement>();

  #isPrefersReducedMotion = false;

  #isQueueWorking = false;

  #localize = new LocalizeController(this);

  #matchMedia: MediaQueryList | null = null;

  #queue: ToastAction[] = [];

  #queueProxy: ToastAction[] | null = null;

  #toastPadding = 0;

  // Use an arrow function to bind `this`.
  #onMatchMediaChange = () => {
    if (this.#matchMedia) {
      this.#isPrefersReducedMotion = this.#matchMedia.matches;
    }
  };

  async #processQueue() {
    while (this.#queue.length > 0) {
      this.#animations = [];

      const action = this.#queue.shift();

      if (action && action.type === 'add') {
        const newToastElement = Object.assign(
          document.createElement('glide-core-toast'),
          action.payload,
        );

        newToastElement.popover = 'manual';
        this.append(newToastElement);
        newToastElement.showPopover();

        await newToastElement.updateComplete;

        const { height: newToastElementHeight } =
          newToastElement.getBoundingClientRect();

        const toasts = this.querySelectorAll('glide-core-toast');

        if (toasts && toasts.length > 1) {
          for (const toast of toasts) {
            if (toast === newToastElement) continue;

            const { top: toastTop } = toast.getBoundingClientRect();

            if (this.#toastPadding === 0) {
              this.#toastPadding = Number.parseInt(
                window.getComputedStyle(toast).paddingBlockStart,
              );
            }

            const toastAnimation = toast.animate(
              [
                {
                  transform: `translate(0,${
                    toastTop +
                    newToastElementHeight -
                    2 * this.#toastPadding /* 32 for extra margin added */
                  }px)`,
                },
              ],
              {
                duration: this.#isPrefersReducedMotion
                  ? 0
                  : this.#animationDuration,
                fill: 'forwards',
                easing: 'ease-in-out',
              },
            );

            this.#animations.push(toastAnimation);
          }
        }

        await Promise.allSettled(
          this.#animations.map((animation) => animation.finished),
        );

        // Only in Chrome do animations sometimes play out of turn.
        for (const animation of this.#animations) {
          animation.pause();
        }

        const newToastElementAnimation = newToastElement.animate(
          [{ transform: 'translate(0,0)' }],
          {
            duration: this.#isPrefersReducedMotion
              ? 0
              : this.#animationDuration,
            fill: 'forwards',
            easing: 'ease-in-out',
          },
        );

        await newToastElementAnimation.finished;

        newToastElementAnimation.pause();
      } else if (action && action.type === 'remove') {
        const toastTarget = action.payload;

        if (toastTarget instanceof GlideCoreToast) {
          const { height: targetToastElementHeight } =
            toastTarget.getBoundingClientRect();

          const toasts = this.querySelectorAll('glide-core-toast');

          if (toasts && toasts.length > 1) {
            for (const toast of toasts) {
              if (toast === toastTarget) break;

              if (toast) {
                const { top: toastTop } = toast.getBoundingClientRect();

                const toastAnimation = toast.animate(
                  [
                    {
                      transform: `translate(0,${
                        toastTop - targetToastElementHeight
                      }px)`,
                    },
                  ],
                  {
                    duration: this.#isPrefersReducedMotion
                      ? 0
                      : this.#animationDuration,
                    fill: 'forwards',
                    easing: 'ease-in-out',
                  },
                );

                this.#animations.push(toastAnimation);
              }
            }
          }

          await Promise.allSettled(
            this.#animations.map((animation) => animation.finished),
          );

          for (const animation of this.#animations) {
            animation.pause();
          }

          toastTarget?.remove();
        }
      }
    }

    this.#animations = [];
    this.#isQueueWorking = false;
  }
}
