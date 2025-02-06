import './label.js';
import { html, LitElement } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { when } from 'lit/directives/when.js';
import packageJson from '../package.json' with { type: 'json' };
import styles from './toggle.styles.js';
import shadowRootMode from './library/shadow-root-mode.js';
import final from './library/final.js';
import required from './library/required.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-toggle': GlideCoreToggle;
  }
}

/**
 * @attr {string} label
 * @attr {boolean} [checked=false]
 * @attr {boolean} [disabled=false]
 * @attr {boolean} [hide-label=false]
 * @attr {'horizontal'|'vertical'} [orientation='horizontal']
 * @attr {string} [summary]
 * @attr {string} [tooltip]
 *
 * @readonly
 * @attr {0.19.1} [version]
 *
 * @slot {Element | string} [description] - Additional information or context
 *
 * @fires {Event} change
 */
@customElement('glide-core-toggle')
@final
export default class GlideCoreToggle extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: shadowRootMode,
  };

  static override styles = styles;

  @property({ type: Boolean })
  checked = false;

  @property({ reflect: true, type: Boolean })
  disabled = false;

  @property({ attribute: 'hide-label', type: Boolean })
  hideLabel = false;

  @property({ reflect: true })
  @required
  label?: string;

  @property({ reflect: true })
  orientation: 'horizontal' | 'vertical' = 'horizontal';

  // Private because it's only meant to be used by Form Controls Layout.
  @property()
  privateSplit?: 'left' | 'middle';

  @property({ reflect: true })
  summary?: string;

  @property({ reflect: true })
  tooltip?: string;

  @property({ reflect: true })
  readonly version = packageJson.version;

  override click() {
    this.#inputElementRef.value?.click();
  }

  override focus(options?: FocusOptions) {
    this.#inputElementRef.value?.focus(options);
  }

  override render() {
    return html`<div data-test="component">
      <glide-core-private-label
        label=${ifDefined(this.label)}
        orientation=${this.orientation}
        split=${ifDefined(this.privateSplit ?? undefined)}
        tooltip=${ifDefined(this.tooltip)}
        ?disabled=${this.disabled}
        ?hide=${this.hideLabel}
      >
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
            @change=${this.#onChangeOrInput}
            @input=${this.#onChangeOrInput}
            ${ref(this.#inputElementRef)}
          />
        </div>

        ${when(
          this.summary,
          () => html`<div id="summary" slot="summary">${this.summary}</div>`,
        )}

        <slot
          class="description"
          id="description"
          name="description"
          slot="description"
        >
          <!-- 
            Additional information or context 
            @type {Element | string}
          -->
        </slot>
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
  #onChangeOrInput(event: Event) {
    if (event.target instanceof HTMLInputElement) {
      this.checked = event.target.checked;
    }

    if (event.type === 'change') {
      // Unlike "input" events, "change" events aren't composed. So we have to
      // manually dispatch them.
      this.dispatchEvent(
        new Event('change', { bubbles: true, composed: true }),
      );
    }
  }
}
