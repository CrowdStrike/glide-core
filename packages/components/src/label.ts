import './tooltip.js';
import { LitElement, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
import { owSlot } from './library/ow.js';
import infoCircleIcon from './icons/info-circle.js';
import styles from './label.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'cs-label': CsLabel;
  }
}

/**
 * @private
 *
 * @description A label with a required control and optional description and tooltip.
 *
 * @slot - The label.
 * @slot control - The control with which the label is associated.
 * @slot summary - Additional information or context.
 * @slot description - Additional information or context.
 * @slot tooltip - Content for the tooltip.
 */
@customElement('cs-label')
export default class CsLabel extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: 'closed',
  };

  static override styles = styles;

  @property({ reflect: true, type: Boolean })
  disabled = false;

  @property({ reflect: true, type: Boolean })
  error = false;

  @property({ reflect: true, type: Boolean })
  hide = false;

  @property({ reflect: true })
  orientation: 'horizontal' | 'vertical' = 'horizontal';

  @property({ reflect: true, type: Boolean })
  required = false;

  override firstUpdated() {
    owSlot(this.#controlSlotElementRef.value);
    owSlot(this.#labelSlotElementRef.value);
  }

  override render() {
    return html`<div
      class=${classMap({
        component: true,
        horizontal: this.orientation === 'horizontal',
        vertical: this.orientation === 'vertical',
        'hidden-label': this.hide,
      })}
    >
      <div
        class=${classMap({
          'tooltip-and-label': true,
          hidden: this.hide,
        })}
        part="tooltip-and-label-container"
      >
        <div class="tooltip-and-label">
          <cs-tooltip
            class=${classMap({
              tooltip: true,
              vertical: this.orientation === 'vertical',
              visible: this.hasTooltipSlot,
            })}
            placement=${this.orientation === 'vertical' ? 'right' : 'bottom'}
          >
            <span class="tooltip-target" slot="target" tabindex="0">
              ${infoCircleIcon}
            </span>

            <slot
              class=${classMap({
                tooltip: true,
                visible: this.hasTooltipSlot,
              })}
              name="tooltip"
              @slotchange=${this.#onTooltipSlotChange}
              ${ref(this.#tooltipSlotElementRef)}
            ></slot>
          </cs-tooltip>

          <div
            class=${classMap({
              label: true,
              disabled: this.disabled,
            })}
            data-test="label"
          >
            <slot
              @slotchange=${this.#onLabelSlotChange}
              ${ref(this.#labelSlotElementRef)}
            ></slot>

            ${this.required
              ? html`<span aria-hidden="true" class="required-symbol">*</span>`
              : ''}
          </div>
        </div>
      </div>

      <div class="control-and-summary">
        <slot
          class=${classMap({
            control: true,
            error: this.error,
            disabled: this.disabled,
            vertical: this.orientation === 'vertical',
            'hidden-label': this.hide,
          })}
          name="control"
          @slotchange=${this.#onControlSlotChange}
          ${ref(this.#controlSlotElementRef)}
        ></slot>

        <slot
          class=${classMap({
            summary: true,
            error: this.error,
          })}
          name="summary"
          @slotchange=${this.#onSummarySlotChange}
          ${ref(this.#summarySlotElementRef)}
        ></slot>
      </div>

      <slot
        class=${classMap({
          description: true,
          visible: this.hasDescriptionSlot,
          error: this.error,
          tooltip: this.hasTooltipSlot,
        })}
        id="description"
        name="description"
        @slotchange=${this.#onDescriptionSlotChange}
        ${ref(this.#descriptionSlotElementRef)}
      ></slot>
    </div>`;
  }

  @state()
  private hasDescriptionSlot = false;

  @state()
  private hasSummarySlot = false;

  @state()
  private hasTooltipSlot = false;

  #controlSlotElementRef = createRef<HTMLSlotElement>();

  #descriptionSlotElementRef = createRef<HTMLSlotElement>();

  #labelSlotElementRef = createRef<HTMLSlotElement>();

  #summarySlotElementRef = createRef<HTMLSlotElement>();

  #tooltipSlotElementRef = createRef<HTMLSlotElement>();

  #onControlSlotChange() {
    owSlot(this.#controlSlotElementRef.value);
  }

  #onDescriptionSlotChange() {
    const assignedNodes = this.#descriptionSlotElementRef.value?.assignedNodes({
      flatten: true,
    });

    this.hasDescriptionSlot = Boolean(
      assignedNodes && assignedNodes.length > 0,
    );
  }

  #onLabelSlotChange() {
    owSlot(this.#labelSlotElementRef.value);
  }

  #onSummarySlotChange() {
    const assignedNodes = this.#summarySlotElementRef.value?.assignedNodes({
      flatten: true,
    });

    this.hasSummarySlot = Boolean(assignedNodes && assignedNodes.length > 0);
  }

  #onTooltipSlotChange() {
    const assignedNodes = this.#tooltipSlotElementRef.value?.assignedNodes({
      flatten: true,
    });

    this.hasTooltipSlot = Boolean(assignedNodes && assignedNodes.length > 0);
  }
}
