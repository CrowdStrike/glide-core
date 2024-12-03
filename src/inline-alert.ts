import './icon-button.js';
import { LitElement, html } from 'lit';
import { LocalizeController } from './library/localize.js';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property } from 'lit/decorators.js';
import { owSlot } from './library/ow.js';
import { when } from 'lit/directives/when.js';
import informationalIcon from './icons/informational.js';
import styles from './inline-alert.styles.js';
import warningCriticalIcon from './icons/warning-critical.js';
import warningHighIcon from './icons/warning-high.js';
import warningMediumIcon from './icons/warning-medium.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-inline-alert': GlideCoreInlineAlert;
  }
}

const VARIANTS = {
  informational: informationalIcon,
  medium: warningMediumIcon,
  high: warningHighIcon,
  critical: warningCriticalIcon,
};

/**
 * @event remove - `(event: Event) => void`
 *
 * @slot - The content of the Inline Alert.
 */
@customElement('glide-core-inline-alert')
export default class GlideCoreInlineAlert extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: 'closed',
  };

  static override styles = styles;

  @property({ reflect: true })
  variant: keyof typeof VARIANTS = 'informational';

  @property({ reflect: true, type: Boolean })
  removable? = false;

  override firstUpdated() {
    owSlot(this.#defaultSlotElementRef.value);

    this.#componentElementRef.value?.addEventListener(
      'animationend',
      () => {
        this.#componentElementRef.value?.classList.remove('added');
      },
      { once: true },
    );
  }

  override render() {
    return html`
      <div
        class=${classMap({
          component: true,
          added: true,
          [this.variant]: true,
        })}
        role="alert"
        data-test="component"
        data-animation-duration=${this.#animationDuration}
        style="--animation-duration: ${this.#animationDuration}ms"
        ${ref(this.#componentElementRef)}
      >
        <div
          class=${classMap({
            icon: true,
            [this.variant]: true,
          })}
        >
          ${VARIANTS[this.variant]}
        </div>
        <div class="content">
          <slot
            @slotchange=${this.#onDefaultSlotChange}
            ${ref(this.#defaultSlotElementRef)}
          >
          </slot>
        </div>
        ${when(
          this.removable,
          () =>
            html`<glide-core-icon-button
              label=${this.#localize.term('close')}
              variant="tertiary"
              class="removal-button"
              data-test="removal-button"
              @click=${this.#onRemovalButtonClick}
              @keydown=${this.#onRemovalButtonKeydown}
              ${ref(this.#removalButtonElementRef)}
            >
              <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
                <path
                  d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5"
                  stroke="currentColor"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </glide-core-icon-button>`,
        )}
      </div>
    `;
  }

  #animationDuration = 100;

  #componentElementRef = createRef<HTMLDivElement>();

  #defaultSlotElementRef = createRef<HTMLSlotElement>();

  #isKeyboardClick = false;

  #localize = new LocalizeController(this);

  #removalButtonElementRef = createRef<HTMLButtonElement>();

  #onDefaultSlotChange() {
    owSlot(this.#defaultSlotElementRef.value);
  }

  #onRemovalButtonClick() {
    if (this.#isKeyboardClick) {
      this.#isKeyboardClick = false;
    } else {
      setTimeout(() => {
        this.remove();
      }, this.#animationDuration);

      this.#componentElementRef.value?.classList.add('removed');

      this.dispatchEvent(
        new Event('remove', { bubbles: true, composed: true }),
      );
    }
  }

  #onRemovalButtonKeydown(event: KeyboardEvent) {
    if (['Enter', ' '].includes(event.key)) {
      this.#isKeyboardClick = true;

      setTimeout(() => {
        this.remove();
      }, this.#animationDuration);

      this.#componentElementRef.value?.classList.add('removed');

      this.dispatchEvent(
        new Event('remove', { bubbles: true, composed: true }),
      );
    }
  }
}
