import './toasts.toast.js';
import { html, LitElement } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property } from 'lit/decorators.js';
import packageJson from '../package.json' with { type: 'json' };
import { LocalizeController } from './library/localize.js';
import styles from './toasts.styles.js';
import shadowRootMode from './library/shadow-root-mode.js';
import final from './library/final.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-toasts': GlideCoreToasts;
  }
}

export interface Toast {
  label: string;
  description: string;
  variant: 'error' | 'informational' | 'success';
  duration?: number;
}

@customElement('glide-core-toasts')
@final
export default class GlideCoreToasts extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: shadowRootMode,
  };

  static override styles = styles;

  @property({ reflect: true })
  readonly version = packageJson.version;

  /**
   * @param {number} [toast.duration=5000]
   *  Optional: Number of milliseconds before the Toast auto-hides.
   *  Minimum: `5000`. Default: `5000`. For a Toast that never auto-hides, set to `Infinity`
   *  */
  add(toast: Toast) {
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

    if (this.#componentElementRef.value) {
      this.#componentElementRef.value.popover = 'manual';
      this.#componentElementRef.value.showPopover();
      this.#componentElementRef.value.append(toastElement);
    }

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
        data-test="component"
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
