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
  add(toast: Toast) {
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

    this.#queueRemoveProxy = new Proxy(this.#queueRemove, {
      set: this.#proxyHandlerRemoveSet,
    });

    this.#componentElementRef.value?.addEventListener(
      'close',
      (event: Event) => {
        if (event?.target instanceof GlideCoreToast) {
          const target = event.target;

          this.#queueRemoveProxy.push(target);
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

  #animationDuration = 250;

  #animationPromises: Promise<Animation>[] = [];

  #componentElementRef = createRef<HTMLDivElement>();

  #defaultSlotElementRef = createRef<HTMLSlotElement>();

  #isQueueRemoving = false;

  #isQueueWorking = false;

  #localize = new LocalizeController(this);

  #queue: {
    label: string;
    description: string;
    variant: 'informational' | 'success';
    duration?: number;
  }[] = [];

  #queueProxy: any = null;

  #queueRemove: GlideCoreToast[] = [];

  #queueRemoveProxy: any = null;

  // Use an arrow function to bind `this`
  #proxHandlerSet = (target: any, property: string, value: any) => {
    if (Number.parseInt(property) >= 0) {
      target[property] = value;

      if (!this.#isQueueWorking) {
        this.#isQueueWorking = true;

        requestAnimationFrame(() => {
          this.#queueWorker();
        });
      }
    } else {
      target[property] = value;
    }

    return true;
  };

  #proxyHandlerRemoveSet = (target: any, property: string, value: any) => {
    // console.log('proxyHandlerRemoveSet');

    if (Number.parseInt(property) >= 0) {
      target[property] = value;

      // console.log('proxyHandlerRemoveSet in condition');

      if (!this.#isQueueRemoving) {
        this.#isQueueRemoving = true;

        requestAnimationFrame(() => {
          this.#queueRemovingWorker();
        });
      }
    } else {
      target[property] = value;
    }

    return true;
  };

  async #queueRemovingWorker() {
    await Promise.all(this.#animationPromises);

    // debugger;
    const toastToRemove = this.#queueRemove.at(0);

    while (this.#queueRemove.length > 0) {
      const toastTarget = this.#queueRemove.shift();

      if (toastTarget instanceof GlideCoreToast) {
        const { height: targetToastElementHeight } =
          toastTarget.getBoundingClientRect();

        const toasts = this.querySelectorAll('glide-core-toast');

        if (toasts && toasts.length > 1) {
          // debugger;
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
                  duration: this.#animationDuration,
                  fill: 'forwards',
                  easing: 'ease-in-out',
                },
              );

              this.#animationPromises.push(toastAnimation.finished);
            }
          }
        }
      }

      await Promise.all(this.#animationPromises);
    }

    toastToRemove?.hidePopover();
    toastToRemove?.remove();

    if (this.#queue.length === 0) this.#animationPromises = [];
    this.#isQueueRemoving = false;
  }

  async #queueWorker() {
    await Promise.all(this.#animationPromises);

    while (this.#queue.length > 0) {
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
                transform: `translate(0,${
                  toastTop +
                  newToastElementHeight -
                  32 /* 32 for extra margin added */
                }px)`,
              },
            ],
            {
              duration: this.#animationDuration,
              fill: 'forwards',
              easing: 'ease-in-out',
            },
          );

          this.#animationPromises.push(toastAnimation.finished);
        }
      }

      await Promise.all(this.#animationPromises);

      const newToastElementAnimation = newToastElement.animate(
        [{ transform: 'translate(0,0)' }],
        {
          duration: this.#animationDuration,
          fill: 'forwards',
          easing: 'ease-in-out',
        },
      );

      this.#animationPromises.push(newToastElementAnimation.finished);

      await Promise.all(this.#animationPromises);

      // Only Chrome occasionally rerenders the entire component,
      // triggering a horizontal translation. By adding this, the
      // horizontal translation is prevented
      newToastElement.style.transform = 'none';
    }

    if (this.#queueRemove.length === 0) this.#animationPromises = [];
    this.#isQueueWorking = false;
  }
}
