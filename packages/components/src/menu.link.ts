import { LitElement, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import styles from './menu.link.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-menu-link': GlideCoreMenuLink;
  }
}

/**
 * @description A link for use within a <glide-core-menu>.
 *
 * @slot icon - An icon.
 */
@customElement('glide-core-menu-link')
export default class GlideCoreMenuLink extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: 'closed',
  };

  static override styles = styles;

  @property({ reflect: true })
  label?: string;

  @property({ reflect: true })
  url?: string;

  @property({ type: Boolean })
  // A link is considered active when it's interacted with via keyboard or hovered.
  privateActive = false;

  override connectedCallback() {
    super.connectedCallback();

    // On the host instead of inside the shadow DOM so screenreaders can find this
    // ID when with it's assigned to `aria-activedescendant`.
    this.id = this.#id;

    // These two are likewise on the host due to `aria-activedescendant`. The active
    // descendant must be the element with `role` and has to be programmatically
    // focusable.
    this.role = 'menuitem';
    this.tabIndex = -1;
  }

  override render() {
    // `tabindex` is set to "0" and "-1" below based on `this.privateActive`. "0"
    // is to account for when a keyboard user tabs backward to the dropdown button.
    // Tabbing forward from there should move focus to where it was previously,
    // which would be on the option.
    return html`<a
      class=${classMap({
        component: true,
        active: this.privateActive,
      })}
      data-test="component"
      href=${ifDefined(this.url)}
    >
      <slot name="icon"></slot>
      ${this.label}
    </a>`;
  }

  // Established here instead of in `connectedCallback` so the ID remains
  // constant even if this component is removed and re-added to the DOM.
  // If it's not constant, Dropdown's `aria-activedescendant` will immediately
  // point to a non-existent ID when this component is re-added. An edge case
  // for sure. But one we can protect against with little effort.
  #id = window.crypto.randomUUID();
}
