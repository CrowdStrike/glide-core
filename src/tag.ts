import { html, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import packageJson from '../package.json' with { type: 'json' };
import { LocalizeController } from './library/localize.js';
import pencilIcon from './icons/pencil.js';
import styles from './tag.styles.js';
import xIcon from './icons/x.js';
import shadowRootMode from './library/shadow-root-mode.js';
import final from './library/final.js';
import required from './library/required.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-tag': GlideCoreTag;
  }
}

/**
 * @attr {string} label
 * @attr {boolean} [disabled=false]
 * @attr {boolean} [removable=false]
 * @attr {'small'|'medium'|'large'} [size='medium']
 *
 * @readonly
 * @attr {0.20.0} [version]
 *
 * @slot {Element} [icon]
 *
 * @fires {Event} edit
 * @fires {Event} remove
 */
@customElement('glide-core-tag')
@final
export default class GlideCoreTag extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
    mode: shadowRootMode,
  };

  static override styles = styles;

  @property({ reflect: true, type: Boolean })
  disabled = false;

  @property({ reflect: true })
  @required
  label?: string;

  // Private because it's only meant to be used by Dropdown.
  @property({ attribute: 'private-editable', reflect: true, type: Boolean })
  privateEditable = false;

  @property({ reflect: true, type: Boolean })
  removable = false;

  @property({ reflect: true })
  size: 'small' | 'medium' | 'large' = 'medium';

  @property({ reflect: true })
  readonly version = packageJson.version;

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
          [this.size]: true,
        })}
        data-test="component"
        data-animation-duration=${this.#animationDuration}
        style="--private-animation-duration: ${this.#animationDuration}ms"
        ${ref(this.#componentElementRef)}
      >
        <slot
          class=${classMap({
            'icon-slot': true,
            [this.size]: true,
          })}
          name="icon"
        >
          <!-- @type {Element} -->
        </slot>

        ${this.label}
        ${when(this.privateEditable, () => {
          return html`<button
            aria-label=${this.#localize.term('editTag', this.label!)}
            class=${classMap({
              'edit-button': true,
              [this.size]: true,
              disabled: this.disabled,
            })}
            data-test="edit-button"
            type="button"
            ?disabled=${this.disabled}
            @click=${this.#onEditButtonClick}
            @keydown=${this.#onEditButtonKeydown}
          >
            ${pencilIcon}
          </button>`;
        })}
        ${when(
          this.removable,
          () =>
            html`<button
              aria-label=${this.#localize.term('removeTag', this.label!)}
              class=${classMap({
                'removal-button': true,
                [this.size]: true,
                disabled: this.disabled,
              })}
              data-test="removal-button"
              type="button"
              ?disabled=${this.disabled}
              @click=${this.#onRemovalButtonClick}
              @keydown=${this.#onRemovalButtonKeydown}
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

  // Guards against dispatching "edit" and "remove" on click when the click came
  // from Enter or Space so the event isn't dispatched twice. Using `event.detail !==0`
  // instead would work. But it would exclude clicks via `this.click()`.
  //
  // Why not just dispatch those events on "click"? Because Dropdown has a "click"
  // handler of its own that opens Dropdown except when the click came from Tag's
  // edit or removal buttons. It needs to know if an "edit" or "remove" event was
  // dispatched before its "click" handler is called to determine in that handler
  // if it should return early instead of opening.
  #isKeyboardClick = false;

  #localize = new LocalizeController(this);

  #removalButtonElementRef = createRef<HTMLButtonElement>();

  #onEditButtonClick() {
    if (this.#isKeyboardClick) {
      this.#isKeyboardClick = false;
    } else {
      this.dispatchEvent(new Event('edit', { bubbles: true, composed: true }));
    }
  }

  #onEditButtonKeydown(event: KeyboardEvent) {
    if (['Enter', ' '].includes(event.key)) {
      this.#isKeyboardClick = true;
      this.dispatchEvent(new Event('edit', { bubbles: true, composed: true }));
    }
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
