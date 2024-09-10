import './toasts.toast.js';
import { LitElement, html } from 'lit';
import { LocalizeController } from './library/localize.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement } from 'lit/decorators.js';
import ow from './library/ow.js';
import styles from './toasts.styles.js';
import GlideCoreToast from './toasts.toast.js';

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

/**
 * @description A container and controller for toast messages.

 */
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
  async add(toast: Toast) {
    ow(this.#componentElementRef.value, ow.object.instanceOf(Element));
    const { variant, label, description, duration } = toast;

    this.#queueProxy.push({
      variant,
      label,
      description,
      duration,
    });
  }

  override firstUpdated() {
    this.#queueProxy = new Proxy(this.#queue, {
      set: this.#proxHandlerSet,
    });

    this.#componentElementRef.value?.addEventListener(
      'close',
      (event: Event) => {
        const toastTarget = event?.target;

        if (toastTarget instanceof GlideCoreToast) {
          const { height: targetToastElementHeight } =
            toastTarget.getBoundingClientRect();

          toastTarget.hidePopover();

          const toasts = this.querySelectorAll('glide-core-toast');

          if (toasts && toasts.length > 1) {
            for (const toast of toasts) {
              if (toast === toastTarget) break;

              if (toast) {
                const { top: toastTop } = toast.getBoundingClientRect();

                const toastAnimation = toast.animate(
                  [
                    {
                      transform: `translateY(${
                        toastTop - targetToastElementHeight
                      }px)`,
                    },
                  ],
                  {
                    duration: 500,
                    fill: 'forwards',
                  },
                );

                this.#animationPromises.push(toastAnimation.finished);
              }
            }
          }
        }
      },
    );
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

  #animationPromises: Promise<Animation>[] = [];

  #componentElementRef = createRef<HTMLDivElement>();

  #defaultSlotElementRef = createRef<HTMLSlotElement>();

  #localize = new LocalizeController(this);

  #isQueueWorking = false;

  // Use an arrow function to bind `this`
  #proxHandlerSet = (target: any, property: string, value: any) => {
    if (Number.parseInt(property) >= 0) {
      target[property] = value;
      if (!this.#isQueueWorking) {
        this.#isQueueWorking = true;

        this.#queueWorker();
      }
    } else {
      target[property] = value;
    }
    return true;
  };

  #queue: {
    label: string;
    description: string;
    variant: 'informational' | 'success';
    duration?: number;
  }[] = [];

  #queueProxy: any = null;

  async #queueWorker() {
    while (this.#queue.length > 0) {
      await Promise.all(this.#animationPromises);

      const config = this.#queue.shift();

      const newToastElement = Object.assign(
        document.createElement('glide-core-toast'),
        config,
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

          const toastAnimation = toast.animate(
            [
              {
                transform: `translateY(${
                  toastTop +
                  newToastElementHeight -
                  32 /* 32 for extra margin added */
                }px)`,
              },
            ],
            {
              duration: 500,
              fill: 'forwards',
            },
          );

          this.#animationPromises.push(toastAnimation.finished);
        }
      }

      await Promise.all(this.#animationPromises);

      const newToastElementAnimation = newToastElement.animate(
        [{ transform: 'none' }],
        {
          duration: 500,
          fill: 'forwards',
        },
      );

      this.#animationPromises.push(newToastElementAnimation.finished);

      await Promise.all(this.#animationPromises);
    }
    this.#animationPromises = [];
    this.#isQueueWorking = false;
  }
}
