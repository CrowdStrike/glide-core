import { html, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { nanoid } from 'nanoid';
import packageJson from '../package.json' with { type: 'json' };
import styles from './menu.link.styles.js';
import shadowRootMode from './library/shadow-root-mode.js';
import final from './library/final.js';
import required from './library/required.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-menu-link': GlideCoreMenuLink;
  }
}

/**
 * @attr {string} label
 * @attr {boolean} [disabled=false]
 *
 * @readonly
 * @attr {string} [id]
 *
 * @readonly
 * @attr {string} [role='menuitem']
 *
 * @readonly
 * @attr {number} [tabindex=-1]
 *
 * @attr {string} [url]
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {Element} [icon]
 */
@customElement('glide-core-menu-link')
@final
export default class GlideCoreMenuLink extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: shadowRootMode,
  };

  static override styles = styles;

  @property({ reflect: true })
  @required
  label?: string;

  /**
   * @default false
   */
  @property({ reflect: true, type: Boolean })
  get disabled(): boolean {
    return this.#isDisabled;
  }

  set disabled(isDisabled: boolean) {
    this.#isDisabled = isDisabled;

    if (isDisabled && this.privateActive) {
      this.dispatchEvent(new Event('private-disabled', { bubbles: true }));
    }
  }

  @property({ reflect: true })
  url?: string;

  // On the host instead of inside the shadow DOM so screenreaders can find it when
  // Menu uses it with `aria-activedescendant`.
  @property({ reflect: true })
  override readonly id: string = nanoid();

  // A button is considered active when it's interacted with via keyboard or
  // hovered. Private because it's only meant to be used internally and by Menu.
  @property({ type: Boolean })
  privateActive = false;

  @property({ reflect: true })
  override readonly role = 'menuitem';

  @property({ attribute: 'tabindex', reflect: true, type: Number })
  override readonly tabIndex = -1;

  @property({ reflect: true })
  readonly version: string = packageJson.version;

  override click() {
    // Menu sets `#isDisabledLinkClick` in its default slot's "mouseup" handler so
    // its `#onDocumentClick` handler knows to not close Menu. A programmatic click
    // doesn't generate a "mouseup" event. So, without this guard, `#isDisabledLinkClick`
    // would always be `false` and Menu would close when a disabled link is clicked.
    if (!this.disabled) {
      this.#componentElementRef.value?.click();
    }
  }

  override render() {
    // `tabindex` is set to "0" and "-1" below based on `this.privateActive`. "0"
    // is to account for when a keyboard user tabs backward to the dropdown button.
    // Tabbing forward from there should move focus to where it was previously,
    // which would be on the option.
    return html`<a
      aria-disabled=${this.disabled}
      class=${classMap({
        component: true,
        active: this.privateActive,
        disabled: this.disabled,
      })}
      data-test="component"
      href=${ifDefined(this.url)}
      @click=${this.#onClick}
      ${ref(this.#componentElementRef)}
    >
      <slot name="icon">
        <!-- @type {Element} -->
      </slot>

      ${this.label}
    </a>`;
  }

  #componentElementRef = createRef<HTMLAnchorElement>();

  #isDisabled = false;

  #onClick(event: Event) {
    if (this.disabled) {
      event.preventDefault();

      // Consumers listen for "click" events to know when an option is selected.
      // Letting this propagate would result in a false positive event bubbling
      // up to the consumer.
      event.stopPropagation();
    }
  }
}
