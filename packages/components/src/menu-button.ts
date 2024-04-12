import { LitElement, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property } from 'lit/decorators.js';
import styles from './menu-button.styles.js';

/**
 * @description A button for use within a <cs-menu>.
 *
 * @slot icon - An icon.
 */
@customElement('cs-menu-button')
export default class MenuButton extends LitElement {
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

  // `shadowRoot.delegatesFocus` is preferred because it's more declarative.
  // But using it here triggers a focus-visible state whenever `this.focus` is
  // called. And we only want a focus outline when the `this.focus` is called
  // as a result of keyboard interaction.
  override focus() {
    this.#componentElement.value?.focus();
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
      ${ref(this.#componentElement)}
    >
      <slot name="icon"></slot>
      ${this.label}
    </button>`;
  }

  #componentElement = createRef<HTMLElement>();
}
