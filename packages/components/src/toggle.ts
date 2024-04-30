import './tooltip.js';
import { LitElement, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
import infoCircleIcon from './icons/info-circle.js';
import styles from './toggle.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'cs-toggle': CsToggle;
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
@customElement('cs-toggle')
export default class CsToggle extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: 'closed',
  };

  static override styles = styles;

  @property({ type: Boolean })
  checked = false;

  @property({ reflect: true, type: Boolean })
  disabled = false;

  @property({ reflect: true })
  label?: string;

  @property({ reflect: true })
  orientation: 'horizontal' | 'vertical' = 'horizontal';

  @property({ reflect: true })
  name?: string;

  @property({ reflect: true })
  summary?: string;

  override click() {
    this.#inputRef.value?.click();
  }

  override focus(options?: FocusOptions) {
    this.#inputRef.value?.focus(options);
  }

  override render() {
    return html`<div
      class=${classMap({
        component: true,
        tooltip: this.hasTooltipSlot,
      })}
      data-test="component"
      ${ref(this.#componentRef)}
    >
      <cs-tooltip
        class=${classMap({
          visible: this.hasTooltipSlot,
        })}
        placement=${this.orientation === 'vertical' ? 'right' : 'bottom'}
      >
        <button class="tooltip-button" slot="target">${infoCircleIcon}</button>

        <slot
          name="tooltip"
          @slotchange=${this.#onTooltipSlotChange}
          ${ref(this.#tooltipSlotRef)}
        ></slot>
      </cs-tooltip>

      <label class="label-and-toggle-and-summary">
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
          aria-describedby="summary-for-screenreaders description"
          data-test="input"
          type="checkbox"
          ?checked=${this.checked}
          ?disabled=${this.disabled}
          @change=${this.#onInputChange}
          ${ref(this.#inputRef)}
        />

        <div
          class=${classMap({
            'label-text': true,
            tooltip: this.hasTooltipSlot,
          })}
        >
          ${this.label}
        </div>

        <div
          class=${classMap({
            'toggle-and-summary': true,
            tooltip: this.hasTooltipSlot,
          })}
        >
          <div class="toggle"></div>

          <!--
            Hidden from screenreaders because a summary isn't quite a label. The summary is
            duplicated below, outside the label, and then presented to screenreaders as a
            description using "aria-describedby".
          -->
          <div
            aria-hidden="true"
            class=${classMap({
              summary: true,
              tooltip: this.hasTooltipSlot,
            })}
          >
            ${this.summary}
          </div>
        </div>
      </label>

      <div class="summary-for-screenreaders" id="summary-for-screenreaders">
        ${this.summary}
      </div>

      <slot
        class=${classMap({
          description: true,
          tooltip: this.hasTooltipSlot,
        })}
        id="description"
        name="description"
      ></slot>
    </div>`;
  }

  @state()
  private hasTooltipSlot = false;

  #componentRef = createRef<HTMLDivElement>();

  #inputRef = createRef<HTMLInputElement>();

  #tooltipSlotRef = createRef<HTMLSlotElement>();

  #onInputChange(event: Event) {
    if (event.target instanceof HTMLInputElement) {
      this.checked = event.target.checked;
    }

    // Unlike "input" events, "change" events aren't composed. So we manually
    // dispatch them from the host.
    this.dispatchEvent(new Event(event.type, event));
  }

  #onTooltipSlotChange() {
    const assignedNodes = this.#tooltipSlotRef.value?.assignedNodes();
    this.hasTooltipSlot = Boolean(assignedNodes && assignedNodes.length > 0);
  }
}
