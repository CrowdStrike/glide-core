import { LitElement, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property } from 'lit/decorators.js';
import styles from './menu.button.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-menu-button': GlideCoreMenuButton;
  }
}

/**
 * @description A button for use within a <glide-core-menu>.
 *
 * @slot icon - An icon.
 */
@customElement('glide-core-menu-button')
export default class GlideCoreMenuButton extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: 'closed',
  };

  static override styles = styles;

  @property({ reflect: true })
  label?: string;

  @property({ type: Boolean })
  // A button is considered active when it's interacted with via keyboard or hovered.
  privateActive = false;

  // Used by Menu as an alternative to `document.activeElement`. When Menu is
  // itself in a shadow DOM and an element in that shadow DOM receives focus,
  // `document.activeElement` will be set to the outer host. Thus, without this,
  // Menu has no way of knowing whether it's a Menu Button or Menu Link that has
  // focus or another element within it that host.
  privateIsFocused = false;

  // `shadowRoot.delegatesFocus` is preferred because it's more declarative.
  // But using it here triggers a focus-visible state whenever `this.focus` is
  // called. And we only want a focus outline when the `this.focus` is called
  // as a result of keyboard interaction.
  override focus() {
    this.#componentElementRef.value?.focus();
  }

  override render() {
    // `tabindex` is set to "0" and "-1" below based on `this.privateActive`. "0"
    // is to account for when a keyboard user tabs backward to the dropdown button.
    // Tabbing forward from there should move focus to where it was previously,
    // which would be on the option.
    return html`<button
      class=${classMap({
        component: true,
        'component-active': this.privateActive,
      })}
      data-test="component"
      role="menuitem"
      tabindex=${this.privateActive ? '0' : '-1'}
      type="button"
      @focusin=${this.#onFocusin}
      @focusout=${this.#onFocusout}
      ${ref(this.#componentElementRef)}
    >
      <slot name="icon"></slot>
      ${this.label}
    </button>`;
  }

  #componentElementRef = createRef<HTMLElement>();

  #onFocusin() {
    this.privateIsFocused = true;
  }

  #onFocusout() {
    this.privateIsFocused = false;
  }
}
