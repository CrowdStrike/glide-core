import { LitElement, html, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
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

  @property()
  removableLabel? = '';

  override render() {
    if (this.isHidden) return nothing;

    return html`
      <div
        class=${classMap({
          tag: true,
          activate: true,
          [this.size]: true,
        })}
        ${ref(this.#containerRef)}
      >
        <slot name="prefix" part="prefix"></slot>
        <slot></slot>
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
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
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

  @state()
  private isHidden = false;

  #containerRef = createRef<HTMLDivElement>();

  #delayToRemove = 200;

  #onClick = () => {
    // the promise delays removing the tag's content from the DOM so that
    // the animation has an opportunity to play
    new Promise(() =>
      setTimeout(() => {
        this.isHidden = !this.isHidden;
      }, this.#delayToRemove),
    );
    this.#containerRef.value?.classList.toggle('activate');
    this.#containerRef.value?.classList.toggle('deactivate');
    this.dispatchEvent(new CustomEvent('remove', { composed: true }));
  };
}
