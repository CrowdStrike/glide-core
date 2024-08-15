import './toasts.toast.js';
import { LitElement, html } from 'lit';
import { LocalizeController } from './library/localize.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement } from 'lit/decorators.js';
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

  add(toast: Toast) {
    ow(this.#componentElementRef.value, ow.object.instanceOf(Element));
    this.#componentElementRef.value.popover = 'manual';
    this.#componentElementRef.value.showPopover();
    const { variant, label, description, duration } = toast;

    const toastElement = Object.assign(
      document.createElement('glide-core-toast'),
      {
        variant,
        label,
        description,
        duration,
      },
    );

    this.#componentElementRef.value.append(toastElement);

    toastElement.addEventListener(
      'close',
      () => {
        toastElement.remove();

        if (
          this.#componentElementRef.value?.querySelectorAll('glide-core-toast')
            .length === 0
        ) {
          this.#componentElementRef.value?.hidePopover();
        }
      },
      { once: true },
    );

    return toastElement;
  }

  override render() {
    return html`
      <div
        class="component"
        role="region"
        tabindex="-1"
        aria-label=${this.#localize.term('notifications')}
        ${ref(this.#componentElementRef)}
      ></div>
    `;
  }

  #componentElementRef = createRef<HTMLDivElement>();

  #localize = new LocalizeController(this);
}
