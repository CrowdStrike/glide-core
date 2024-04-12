import { LitElement, html, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import CsButtonGroupButton from './button-group-button.js';
import styles from './button-group.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'cs-button-group': CsButtonGroup;
  }
}

@customElement('cs-button-group')
export default class CsButtonGroup extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: 'closed',
  };

  static override styles = styles;

  @property({ type: Boolean })
  vertical = false;

  @state()
  isDefaultSlotEmpty = false;

  override firstUpdated() {
    this.isDefaultSlotEmpty =
      (this.#defaultSlotRef.value?.assignedNodes() ?? []).length === 0;
  }

  override render() {
    if (this.isDefaultSlotEmpty) {
      return nothing;
    }
    /*  eslint-disable lit-a11y/list */
    return html`
      <label for="button-group" tabindex="-1"
        >${ifDefined(this.ariaLabel ?? undefined)}</label
      >
      <ul
        id="button-group"
        role="radiogroup"
        @cs-private-change=${this.#onPrivateChange}
        @cs-private-input=${this.#onPrivateInput}
        class=${classMap({
          vertical: this.vertical,
        })}
      >
        <slot ${ref(this.#defaultSlotRef)}></slot>
      </ul>
    `;
  }

  #defaultSlotRef = createRef<HTMLSlotElement>();

  #onPrivateChange(event: Event) {
    if (event.target instanceof CsButtonGroupButton && event.target.selected) {
      this.dispatchEvent(
        new CustomEvent('cs-change', {
          bubbles: true,
          detail: event.target.value,
        }),
      );
    }
  }

  #onPrivateInput(event: Event) {
    if (event.target instanceof CsButtonGroupButton && event.target.selected) {
      this.dispatchEvent(
        new CustomEvent('cs-input', {
          bubbles: true,
          detail: event.target.value,
        }),
      );
    }
  }
}
