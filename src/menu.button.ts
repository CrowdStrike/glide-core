import { LitElement, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property } from 'lit/decorators.js';
import { nanoid } from 'nanoid';
import styles from './menu.button.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-menu-button': GlideCoreMenuButton;
  }
}

/**
 * @slot icon - An icon.
 */
@customElement('glide-core-menu-button')
export default class GlideCoreMenuButton extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: 'closed',
  };

  static override styles = styles;

  @property({ reflect: true, type: Boolean })
  get disabled() {
    return this.#isDisabled;
  }

  set disabled(isDisabled: boolean) {
    this.#isDisabled = isDisabled;

    if (isDisabled && this.privateActive) {
      this.dispatchEvent(new Event('private-disabled', { bubbles: true }));
    }
  }

  @property({ reflect: true })
  label?: string;

  // A button is considered active when it's interacted with via keyboard or hovered.
  // Private because it's only meant to be used by Menu.
  @property({ type: Boolean })
  privateActive = false;

  override click() {
    this.#componentElementRef.value?.click();
  }

  override connectedCallback() {
    super.connectedCallback();

    // On the host instead of inside the shadow DOM so screenreaders can find this
    // ID when it's assigned to `aria-activedescendant`.
    this.id = this.#id;

    // These two are likewise on the host due to `aria-activedescendant`. The active
    // descendant must be the element with `role` and has to be programmatically
    // focusable.
    this.role = 'menuitem';
    this.tabIndex = -1;
  }

  override render() {
    return html`<button
      class=${classMap({
        component: true,
        active: this.privateActive,
        disabled: this.disabled,
      })}
      ?disabled=${this.disabled}
      data-test="component"
      type="button"
      ${ref(this.#componentElementRef)}
    >
      <slot name="icon"></slot>
      ${this.label}
    </button>`;
  }

  #componentElementRef = createRef<HTMLButtonElement>();

  // Established here instead of in `connectedCallback` so the ID remains
  // constant even if this component is removed and re-added to the DOM.
  // If it's not constant, Menus's `aria-activedescendant` will immediately
  // point to a non-existent ID when this component is re-added. An edge case
  // for sure. But one we can protect against with little effort.
  #id = nanoid();

  #isDisabled = false;
}
