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

    this.#addQueueProxy?.push({
      variant,
      label,
      description,
      duration,
    });
  }

  override firstUpdated() {
    this.#addQueueProxy = new Proxy<Toast[]>(this.#addQueue, {
      set: (target: Toast[], property: string, value: Toast) => {
        Reflect.set(target, property, value);

        if (Number.parseInt(property) >= 0 && !this.#isAddQueueWorking) {
          this.#isAddQueueWorking = true;

          requestAnimationFrame(() => {
            this.#processAddQueue();
          });
        }

        return true;
      },
    });

    this.#removeQueueProxy = new Proxy<GlideCoreToast[]>(this.#removeQueue, {
      set: (
        target: GlideCoreToast[],
        property: string,
        value: GlideCoreToast,
      ) => {
        Reflect.set(target, property, value);

        if (Number.parseInt(property) >= 0 && !this.#isRemoveQueueWorking) {
          this.#isRemoveQueueWorking = true;

          requestAnimationFrame(() => {
            this.#processRemoveQueue();
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

          this.#removeQueueProxy?.push(target);
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

  #addQueue: Toast[] = [];

  #addQueueProxy: Toast[] | null = null;

  #animationDuration = 250;

  #animationPromises: Promise<Animation>[] = [];

  #componentElementRef = createRef<HTMLDivElement>();

  #defaultSlotElementRef = createRef<HTMLSlotElement>();

  #isAddQueueWorking = false;

  #isRemoveQueueWorking = false;

  #localize = new LocalizeController(this);

  #removeQueue: GlideCoreToast[] = [];

  #removeQueueProxy: GlideCoreToast[] | null = null;

  async #processAddQueue() {
    await Promise.all(this.#animationPromises);

    while (this.#addQueue.length > 0) {
      const config = this.#addQueue.shift();

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
      // horizontal translation is prevented.
      newToastElement.style.transform = 'none';
    }

    if (this.#removeQueue.length === 0) this.#animationPromises = [];
    this.#isAddQueueWorking = false;
  }

  async #processRemoveQueue() {
    await Promise.all(this.#animationPromises);

    while (this.#removeQueue.length > 0) {
      const toastTarget = this.#removeQueue.shift();

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

    const toastToRemove = this.#removeQueue.at(0);

    toastToRemove?.hidePopover();
    toastToRemove?.remove();

    if (this.#addQueue.length === 0) this.#animationPromises = [];
    this.#isRemoveQueueWorking = false;
  }
}
