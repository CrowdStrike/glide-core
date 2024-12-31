import './label.js';
import { LitElement, html } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import styles from './toggle.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-toggle': GlideCoreToggle;
  }
}

/**
 * @event change - `(event: Event) => void`
 * @event input - `(event: Event) => void`
 *
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

  // Private because it's only meant to be used by Form Controls Layout.
  @property()
  privateSplit?: 'left' | 'middle';

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
      <glide-core-private-label
        orientation=${this.orientation}
        split=${ifDefined(this.privateSplit ?? undefined)}
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
            aria-checked=${this.checked}
            aria-describedby="summary description"
            data-test="input"
            id="input"
            role="switch"
            type="checkbox"
            .checked=${this.checked}
            ?disabled=${this.disabled}
            @input=${this.#onInput}
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
      </glide-core-private-label>
    </div>`;
  }

  #inputElementRef = createRef<HTMLInputElement>();

  // Only "change" would need to be handled if not for some consumers needing
  // to force Toggle checked or unchecked until the user has completed some action.
  //
  // The way to force Toggle checked or unchecked is to add an "input" or
  // "change" handler and then immediately set `checked` back to its desired
  // state inside that handler.
  //
  // To do that, consumers need to await `this.updateComplete` so `checked` isn't
  // immediately reverted after Toggle updates, which happens asynchronously and
  // so would happen after their handler runs.
  //
  // To await `this.updateComplete`, however, an update has to be pending. That's
  // why we're handling "input" as well: so that "input", like "change", results
  // in an update that can be awaited.
  //
  // If "input" events were dispatched after "change" events, only handling
  // "change" here would suffice because an update from "change" would already
  // be pending by the time "input" is dispatched.
  #onInput(event: Event) {
    if (event.target instanceof HTMLInputElement) {
      this.checked = event.target.checked;
    }

    // Unlike "change", "input" is composed and so will escape the shadow DOM
    // unless we stop it from propagating.
    event.stopPropagation();

    this.dispatchEvent(
      new Event('selected', { bubbles: true, composed: true }),
    );
  }
}
