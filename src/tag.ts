import { LitElement, html } from 'lit';
import { LocalizeController } from './library/localize.js';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import styles from './tag.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-tag': GlideCoreTag;
  }
}

/**
 * @event remove - `(event: Event) => void`
 *
 * @slot icon
 */
@customElement('glide-core-tag')
export default class GlideCoreTag extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
    mode: 'closed',
  };

  static override styles = styles;

  @property({ reflect: true })
  label?: string;

  @property({ reflect: true, type: Boolean })
  removable = false;

  @property({ reflect: true })
  size: 'small' | 'medium' | 'large' = 'medium';

  override click() {
    this.#buttonElementRef.value?.click();
  }

  override firstUpdated() {
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
          [this.size]: true,
        })}
        data-test="component"
        ${ref(this.#componentElementRef)}
      >
        <slot
          class=${classMap({
            'icon-slot': true,
            [this.size]: true,
          })}
          name="icon"
          ${ref(this.#iconSlotElementRef)}
        ></slot>

        ${this.label}
        ${when(
          this.removable,
          () =>
            html`<button
              aria-label=${this.#localize.term('removeTag', this.label!)}
              class=${classMap({
                [this.size]: true,
              })}
              data-test="button"
              type="button"
              @click=${this.#onClick}
              ${ref(this.#buttonElementRef)}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 6L18 18"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />

                <path
                  d="M18 6L6 18"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>`,
        )}
      </div>
    `;
  }

  override get textContent() {
    return this.label ?? '';
  }

  override set textContent(label: string) {
    this.label = label;
  }

  #buttonElementRef = createRef<HTMLButtonElement>();

  #componentElementRef = createRef<HTMLElement>();

  #iconSlotElementRef = createRef<HTMLSlotElement>();

  #localize = new LocalizeController(this);

  #onClick = () => {
    setTimeout(() => {
      this.remove();
    }, 200);

    this.#componentElementRef.value?.classList.add('removed');
    this.dispatchEvent(new Event('remove', { bubbles: true }));
  };
}
