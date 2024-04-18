import { LitElement, html, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
import { owSlotType } from './library/ow.js';
import { when } from 'lit-html/directives/when.js';
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

  @property({ type: String })
  label? = '';

  override firstUpdated() {
    this.isDefaultSlotEmpty = Boolean(
      this.#defaultSlotRef.value &&
        this.#defaultSlotRef.value.assignedNodes().length === 0,
    );
    owSlotType(this.#defaultSlotRef.value, [CsButtonGroupButton]);
  }

  override render() {
    if (this.isDefaultSlotEmpty) {
      return nothing;
    }

    // ignore rule that prevents slots from being children of ul
    /*  eslint-disable lit-a11y/list */
    return html`
      ${when(
        Boolean(this.label),
        () => html`<label for="cs-button-group">${this.label}</label>`,
      )}
      <ul
        id="cs-button-group"
        role="radiogroup"
        @change=${this.#onChange}
        @input=${this.#onInput}
        class=${classMap({
          vertical: this.vertical,
        })}
        ?data-test-vertical=${this.vertical}
      >
        <slot ${ref(this.#defaultSlotRef)}></slot>
      </ul>
    `;
  }

  @state()
  private isDefaultSlotEmpty = false;

  #defaultSlotRef = createRef<HTMLSlotElement>();

  #onChange(event: Event) {
    event.stopPropagation();
    if (event.target instanceof CsButtonGroupButton && event.target.selected) {
      this.dispatchEvent(
        new CustomEvent('change', {
          bubbles: true,
          detail: event.target.value,
        }),
      );
    }
  }

  #onInput(event: Event) {
    event.stopPropagation();
    if (event.target instanceof CsButtonGroupButton && event.target.selected) {
      this.dispatchEvent(
        new CustomEvent('input', {
          bubbles: true,
          detail: event.target.value,
        }),
      );
    }
  }
}
