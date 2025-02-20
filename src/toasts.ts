import { html, LitElement } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property } from 'lit/decorators.js';
import packageJson from '../package.json' with { type: 'json' };
import { LocalizeController } from './library/localize.js';
import styles from './toasts.styles.js';
import shadowRootMode from './library/shadow-root-mode.js';
import final from './library/final.js';
import GlideCoreToast from './toasts.toast.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-toasts': GlideCoreToasts;
  }
}

/**
 * @readonly
 * @attr {0.19.1} [version]
 *
 * @method add
 * @param {{
 *     label: string;
 *     description: string;
 *     variant: 'error' | 'informational' | 'success';
 *     duration?: number; // Defaults to 5000. Set to `Infinity` to make the toast persist until dismissed.
 *   }} toast
 * @returns GlideCoreToast
 */
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

  add(toast: {
    label: string;
    description: string;
    variant: 'error' | 'informational' | 'success';
    duration?: number; // Defaults to 5000. Set to `Infinity` to make the toast persist until dismissed.
  }): GlideCoreToast {
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
