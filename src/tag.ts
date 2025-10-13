import { html, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import packageJson from '../package.json' with { type: 'json' };
import { LocalizeController } from './library/localize.js';
import styles from './tag.styles.js';
import xIcon from './icons/x.js';
import final from './library/final.js';
import required from './library/required.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-tag': Tag;
  }
}

/**
 * @attr {string} label
 * @attr {boolean} [disabled=false]
 * @attr {boolean} [removable=false]
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {Element} [icon]
 *
 * @fires {Event} remove
 */
@customElement('glide-core-tag')
@final
export default class Tag extends LitElement {
  /* v8 ignore start */
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
    mode: window.navigator.webdriver ? 'open' : 'closed',
  };
  /* v8 ignore stop */

  static override styles = styles;

  @property({ reflect: true })
  @required
  label?: string;

  @property({ reflect: true, type: Boolean })
  disabled = false;

  @property({ reflect: true, type: Boolean })
  removable = false;

  @property({ reflect: true })
  readonly version: string = packageJson.version;

  override click() {
    this.#removalButtonElementRef.value?.click();
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

  override focus() {
    this.#removalButtonElementRef.value?.focus();
  }

  override render() {
    return html`
      <div
        class=${classMap({
          component: true,
          added: true,
          disabled: this.disabled,
        })}
        data-test="component"
        data-animation-duration=${this.#animationDuration}
        style="--private-animation-duration: ${this.#animationDuration}ms"
        ${ref(this.#componentElementRef)}
      >
        <slot class="icon-slot" name="icon">
          <!-- @type {Element} -->
        </slot>

        <div class="label">${this.label}</div>

        ${when(
          this.removable,
          () =>
            html`<button
              aria-label=${this.#localize.term(
                'removeTag',

                // `this.label` is always defined because it's a required attribute.
                //
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                this.label!,
              )}
              class=${classMap({
                'removal-button': true,
                disabled: this.disabled,
              })}
              data-test="removal-button"
              type="button"
              ?disabled=${this.disabled}
              @click=${this.#onRemovalButtonClick}
              ${ref(this.#removalButtonElementRef)}
            >
              ${xIcon}
            </button>`,
        )}
      </div>
    `;
  }

  #animationDuration = 100;

  #componentElementRef = createRef<HTMLElement>();

  #localize = new LocalizeController(this);

  #removalButtonElementRef = createRef<HTMLButtonElement>();

  #onRemovalButtonClick() {
    this.#componentElementRef.value?.classList.add('removed');
    this.dispatchEvent(new Event('remove', { bubbles: true, composed: true }));

    setTimeout(() => {
      this.remove();
    }, this.#animationDuration);
  }
}
