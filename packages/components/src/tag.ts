import { LitElement, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property } from 'lit/decorators.js';
import { owSlot } from './library/ow.js';
import { when } from 'lit/directives/when.js';
import styles from './tag.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-tag': GlideCoreTag;
  }
}

/**
 * @description A tag component to categorize information.
 *
 * @event remove - Emitted when `glide-core-tag` is removed
 *
 * @slot - The content of the tag
 *
 * @slot prefix - A slot for an optional icon
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
  size: 'small' | 'medium' | 'large' = 'medium';

  @property({ attribute: 'removable-label' })
  removableLabel? = '';

  override click() {
    this.#buttonElementRef.value?.click();
  }

  override firstUpdated(): void {
    owSlot(this.#defaultSlotElementRef.value);
  }

  override render() {
    return html`
      <div
        class=${classMap({
          component: true,
          activate: true,
          [this.size]: true,
        })}
        ${ref(this.#containerElementRef)}
      >
        <slot name="prefix" ${ref(this.#prefixSlotElementRef)}></slot>

        <slot
          @slotchange=${this.#onDefaultSlotChange}
          ${ref(this.#defaultSlotElementRef)}
        ></slot>

        ${when(
          this.removableLabel,
          () =>
            html`<button
              type="button"
              class=${classMap({
                [this.size]: true,
              })}
              aria-label="Remove ${this.removableLabel}"
              data-test="button"
              ${ref(this.#buttonElementRef)}
              @click=${this.#onClick}
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

  #buttonElementRef = createRef<HTMLButtonElement>();

  #containerElementRef = createRef<HTMLDivElement>();

  #defaultSlotElementRef = createRef<HTMLSlotElement>();

  #prefixSlotElementRef = createRef<HTMLSlotElement>();

  #removalDelay = 200;

  #onClick = () => {
    // The promise delays removing the tag's content from the DOM so that
    // the animation has an opportunity to play
    new Promise(() =>
      setTimeout(() => {
        this.remove();
      }, this.#removalDelay),
    );

    this.#containerElementRef.value?.classList.toggle('activate');
    this.#containerElementRef.value?.classList.toggle('deactivate');
    this.dispatchEvent(new Event('remove'));
  };

  #onDefaultSlotChange() {
    owSlot(this.#defaultSlotElementRef.value);
  }
}
