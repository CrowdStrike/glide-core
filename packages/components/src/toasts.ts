import './toasts.toast.js';
import { LitElement, html } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement } from 'lit/decorators.js';
import styles from './toasts.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'cs-toasts': CsToasts;
  }
}

export interface Toast {
  label: string;
  description: string;
  variant: 'informational' | 'success';
  duration?: number;
}

/**
 * @description A container and controller for toast messages

 */
@customElement('cs-toasts')
export default class CsToasts extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: 'closed',
  };

  static override styles = styles;

  add(toast: Toast) {
    const { variant, label, description } = toast;

    const toastElement = Object.assign(document.createElement('cs-toast'), {
      variant,
      label,
      description,
    });

    this.#componentElementRef.value!.append(toastElement);

    toastElement.addEventListener('close', () => {
      toastElement.remove();
    });

    return toastElement;
  }

  override render() {
    return html`
      <div
        class="component"
        role="region"
        tabindex="-1"
        aria-label="Notifications"
        ${ref(this.#componentElementRef)}
      ></div>
    `;
  }

  #componentElementRef = createRef<HTMLDivElement>();
}
