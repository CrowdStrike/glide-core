import './label.js';
import { LitElement, html } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property } from 'lit/decorators.js';
import styles from './toggle.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-toggle': GlideCoreToggle;
  }
}

/**
 * @description A toggle with a label and optional tooltip, summary, and description.
 *
 * @event change - Dispatched when checked or unchecked.
 * @event input - Dispatched when checked or unchecked.

 * @slot description - Additional information or context.
 * @slot tooltip - Content for the tooltip.
 */
@customElement('glide-core-toggle')
export default class GlideCoreToggle extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: 'closed',
  };

  static override styles = styles;

  @property({ type: Boolean })
  checked = false;

  @property({ reflect: true, type: Boolean })
  disabled = false;

  @property({ attribute: 'hide-label', type: Boolean })
  hideLabel = false;

  @property({ reflect: true })
  label?: string;

  @property({ reflect: true })
  orientation: 'horizontal' | 'vertical' = 'horizontal';

  @property({ reflect: true })
  name?: string;

  @property({ reflect: true })
  summary?: string;

  override click() {
    this.#inputElementRef.value?.click();
  }

  override focus(options?: FocusOptions) {
    this.#inputElementRef.value?.focus(options);
  }

  override render() {
    return html`<div data-test="component">
      <glide-core-label
        orientation=${this.orientation}
        ?disabled=${this.disabled}
        ?hide=${this.hideLabel}
      >
        <slot name="tooltip" slot="tooltip"></slot>
        <label for="input"> ${this.label} </label>

        <div class="toggle-and-input" slot="control">
          <!--
            The input is described by the summary and description but not the tooltip.
            Screenreaders will come across the tooltip naturally as they move focus
            through Toggle.

            Describing the input additionally by the tooltip is possible. We'd have to:

            1. Get the content of the tooltip slot.
            2. Dump the content into a DIV.
            3. Visually hide the DIV.
            4. Describe the input using the DIV.
            5. Hide the tooltip using "aria-hidden" so its content isn't doubly read.

            Even then, the tooltip would still receive focus to support sighted keyboard
            users. Screenreaders would likewise focus the tooltip. But its contents would
            not be read aloud because they would be hidden. This would be pretty confusing.

            —

            An input gives us a few things that together make using one worthwhile:

            - "change" and "input" events.
            - Toggling checked using the spacebar.
            - The ":checked" pseudo class.
          -->
          <input
            aria-describedby="summary description"
            data-test="input"
            id="input"
            type="checkbox"
            ?checked=${this.checked}
            ?disabled=${this.disabled}
            @change=${this.#onInputChange}
            ${ref(this.#inputElementRef)}
          />
        </div>

        <div slot="summary" id="summary">${this.summary}</div>

        <slot
          class="description"
          id="description"
          name="description"
          slot="description"
        ></slot>
      </glide-core-label>
    </div>`;
  }

  #inputElementRef = createRef<HTMLInputElement>();

  #onInputChange(event: Event) {
    if (event.target instanceof HTMLInputElement) {
      this.checked = event.target.checked;
    }

    // Unlike "input" events, "change" events aren't composed. So we manually
    // dispatch them from the host.
    this.dispatchEvent(new Event(event.type, event));
  }
}
