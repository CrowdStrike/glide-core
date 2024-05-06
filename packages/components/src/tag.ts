import { LitElement, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property } from 'lit/decorators.js';
import { owSlot } from './library/ow.js';
import { when } from 'lit/directives/when.js';
import styles from './tag.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'cs-tag': CsTag;
  }
}

/**
 * @description A tag component to categorize information.
 *
 * @event remove - Emitted when `cs-tag` is removed
 *
 * @slot - The content of the tag
 *
 * @slot prefix - A slot for an optional icon
 */
@customElement('cs-tag')
export default class CsTag extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: 'closed',
  };

  static override styles = styles;

  @property({ reflect: true })
  size: 'small' | 'medium' | 'large' = 'medium';

  @property({ attribute: 'removable-label' })
  removableLabel? = '';

  override firstUpdated(): void {
    owSlot(this.#defaultSlotRef.value);
    Boolean(this.removableLabel) && owSlot(this.#prefixSlotRef.value);
  }

  override render() {
    return html`
      <div
        class=${classMap({
          component: true,
          activate: true,
          [this.size]: true,
        })}
        ${ref(this.#containerRef)}
      >
        <slot name="prefix" ${ref(this.#prefixSlotRef)}></slot>
        <slot ${ref(this.#defaultSlotRef)}></slot>
        ${when(
          this.removableLabel,
          () =>
            html`<button
              type="button"
              class=${classMap({
                [this.size]: true,
              })}
              aria-label=${`Remove ${this.removableLabel}`}
              @click=${this.#onClick}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 6L18 18"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M18 6L6 18"
                  stroke="black"
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

  #containerRef = createRef<HTMLDivElement>();

  #defaultSlotRef = createRef<HTMLSlotElement>();

  #delayToRemove = 200;

  #prefixSlotRef = createRef<HTMLSlotElement>();

  #onClick = () => {
    // The promise delays removing the tag's content from the DOM so that
    // the animation has an opportunity to play
    new Promise(() =>
      setTimeout(() => {
        this.remove();
      }, this.#delayToRemove),
    );
    this.#containerRef.value?.classList.toggle('activate');
    this.#containerRef.value?.classList.toggle('deactivate');
    this.dispatchEvent(new CustomEvent('remove', { composed: true }));
  };
}
