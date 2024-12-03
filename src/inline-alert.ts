import './icon-button.js';
import { LitElement, html, svg } from 'lit';
import { LocalizeController } from './library/localize.js';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property } from 'lit/decorators.js';
import { owSlot } from './library/ow.js';
import { when } from 'lit/directives/when.js';
import informationalIcon from './icons/informational.js';
import styles from './inline-alert.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-inline-alert': GlideCoreInlineAlert;
  }
}

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
            'icon-container': true,
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
              label=${this.#localize.term('closeInlineAlert', this.variant)}
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

const VARIANTS = {
  informational: informationalIcon,
  medium: svg` 
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      style="height: var(--size, 1rem); width: var(--size, 1rem);"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8.54175 1.44697C8.19688 1.29362 7.80317 1.29362 7.45829 1.44697C7.19194 1.5654 7.01892 1.77402 6.89852 1.944C6.78014 2.11113 6.6534 2.33007 6.51402 2.57087L1.00258 12.0906C0.862641 12.3323 0.735472 12.5519 0.649245 12.7383C0.561611 12.9277 0.466542 13.1824 0.496841 13.473C0.536048 13.849 0.733076 14.1908 1.03889 14.4131C1.27522 14.585 1.54321 14.6303 1.75105 14.6493C1.95555 14.6681 2.20932 14.6681 2.48858 14.668H13.5114C13.7907 14.6681 14.0445 14.6681 14.249 14.6493C14.4568 14.6303 14.7248 14.585 14.9612 14.4131C15.267 14.1908 15.464 13.849 15.5032 13.473C15.5335 13.1824 15.4384 12.9277 15.3508 12.7383C15.2646 12.5519 15.1374 12.3323 14.9975 12.0907L9.48601 2.57085C9.34664 2.33006 9.2199 2.11112 9.10153 1.944C8.98113 1.77401 8.80811 1.5654 8.54175 1.44697ZM8.66671 6.33472C8.66671 5.96653 8.36823 5.66806 8.00004 5.66806C7.63185 5.66806 7.33337 5.96653 7.33337 6.33472V9.00139C7.33337 9.36958 7.63185 9.66805 8.00004 9.66805C8.36823 9.66805 8.66671 9.36958 8.66671 9.00139V6.33472ZM8.00004 11.0014C7.63185 11.0014 7.33337 11.2999 7.33337 11.6681C7.33337 12.0362 7.63185 12.3347 8.00004 12.3347H8.00671C8.3749 12.3347 8.67337 12.0362 8.67337 11.6681C8.67337 11.2999 8.3749 11.0014 8.00671 11.0014H8.00004Z"
        fill="currentColor"
      />
    </svg>
  `,
  high: svg`
    <svg 
        aria-hidden="true"
        viewBox="0 0 16 16"
        fill="none"
        style="height: var(--size, 1rem); width: var(--size, 1rem);"
      >
        <path 
          fill-rule="evenodd" 
          clip-rule="evenodd" 
          d="M11.8924 1.33334H4.10768C3.75626 1.33333 3.45307 1.33332 3.20336 1.35372C2.93979 1.37525 2.67765 1.4228 2.42539 1.55132C2.04907 1.74307 1.74311 2.04903 1.55136 2.42536C1.42283 2.67761 1.37529 2.93976 1.35376 3.20332C1.33335 3.45303 1.33336 3.75619 1.33337 4.10762V11.8924C1.33336 12.2438 1.33335 12.547 1.35376 12.7967C1.37529 13.0603 1.42283 13.3224 1.55136 13.5747C1.74311 13.951 2.04907 14.2569 2.42539 14.4487C2.67765 14.5772 2.93979 14.6248 3.20336 14.6463C3.45307 14.6667 3.75624 14.6667 4.10766 14.6667H11.8924C12.2438 14.6667 12.547 14.6667 12.7967 14.6463C13.0603 14.6248 13.3224 14.5772 13.5747 14.4487C13.951 14.2569 14.257 13.951 14.4487 13.5747C14.5773 13.3224 14.6248 13.0603 14.6463 12.7967C14.6667 12.547 14.6667 12.2438 14.6667 11.8924V4.10763C14.6667 3.7562 14.6667 3.45303 14.6463 3.20332C14.6248 2.93976 14.5773 2.67761 14.4487 2.42536C14.257 2.04903 13.951 1.74307 13.5747 1.55132C13.3224 1.4228 13.0603 1.37525 12.7967 1.35372C12.547 1.33332 12.2438 1.33333 11.8924 1.33334ZM8.66671 5.33334C8.66671 4.96515 8.36823 4.66667 8.00004 4.66667C7.63185 4.66667 7.33337 4.96515 7.33337 5.33334V8C7.33337 8.36819 7.63185 8.66667 8.00004 8.66667C8.36823 8.66667 8.66671 8.36819 8.66671 8V5.33334ZM8.00004 10C7.63185 10 7.33337 10.2985 7.33337 10.6667C7.33337 11.0349 7.63185 11.3333 8.00004 11.3333H8.00671C8.3749 11.3333 8.67338 11.0349 8.67338 10.6667C8.67338 10.2985 8.3749 10 8.00671 10H8.00004Z" 
          fill="currentColor"
        />
    </svg>
  `,
  critical: svg`
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16" 
      fill="none"
      style="height: var(--size, 1rem); width: var(--size, 1rem);"
    >
      <path 
        fill-rule="evenodd" 
        clip-rule="evenodd" 
        d="M8.26864 0.790031C8.09143 0.753584 7.90865 0.753584 7.73144 0.790031C7.52659 0.832161 7.3435 0.934713 7.19794 1.01624L7.15826 1.03841L2.22493 3.77915L2.18284 3.8024C2.02875 3.88727 1.835 3.99398 1.68622 4.15543C1.55759 4.29502 1.46024 4.46046 1.40069 4.6407C1.33181 4.84916 1.33262 5.07035 1.33326 5.24627L1.33338 5.29435V10.7058L1.33326 10.7538C1.33262 10.9298 1.33181 11.1509 1.40069 11.3594C1.46024 11.5397 1.55759 11.7051 1.68622 11.8447C1.835 12.0061 2.02873 12.1128 2.18281 12.1977L2.22493 12.221L7.15826 14.9617L7.19793 14.9839C7.34349 15.0654 7.52659 15.1679 7.73144 15.2101C7.90865 15.2465 8.09143 15.2465 8.26864 15.2101C8.4735 15.1679 8.65659 15.0654 8.80215 14.9839L8.84182 14.9617L13.7752 12.221L13.8172 12.1977C13.9713 12.1128 14.1651 12.0061 14.3139 11.8447C14.4425 11.7051 14.5398 11.5397 14.5994 11.3594C14.6683 11.1509 14.6675 10.9298 14.6668 10.7538L14.6667 10.7058V5.29435L14.6668 5.24627C14.6675 5.07035 14.6683 4.84916 14.5994 4.6407C14.5398 4.46046 14.4425 4.29502 14.3139 4.15543C14.1651 3.99398 13.9713 3.88727 13.8172 3.8024L13.7752 3.77915L8.84182 1.03841L8.80215 1.01624C8.65659 0.934713 8.47349 0.832161 8.26864 0.790031ZM8.66671 5.33333C8.66671 4.96514 8.36823 4.66667 8.00004 4.66667C7.63185 4.66667 7.33337 4.96514 7.33337 5.33333V8C7.33337 8.36819 7.63185 8.66667 8.00004 8.66667C8.36823 8.66667 8.66671 8.36819 8.66671 8V5.33333ZM8.00004 10C7.63185 10 7.33337 10.2985 7.33337 10.6667C7.33337 11.0349 7.63185 11.3333 8.00004 11.3333H8.00671C8.3749 11.3333 8.67337 11.0349 8.67337 10.6667C8.67337 10.2985 8.3749 10 8.00671 10H8.00004Z" 
        fill="currentColor"
      />
    </svg>
  `,
};
