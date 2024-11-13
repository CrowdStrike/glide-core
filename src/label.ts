import './tooltip.js';
import { LitElement, html, svg } from 'lit';
import { LocalizeController } from './library/localize.js';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
import ow, { owSlot } from './library/ow.js';
import styles from './label.styles.js';

const infoCircleIcon = svg`
  <circle
    cx="12"
    cy="12"
    r="10"
    stroke="currentColor"
    stroke-width="2"
  />

  <path
    d="M12 16L12 12"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
  />

  <circle cx="12" cy="8" r="1" fill="currentColor" />
`;

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-private-label': GlideCoreLabel;
  }
}

/**
 * @private
 *
 * @slot - The label.
 * @slot control - The control with which the label is associated.
 * @slot summary - Additional information or context.
 * @slot description - Additional information or context.
 * @slot tooltip - Content for the tooltip.
 */
@customElement('glide-core-private-label')
export default class GlideCoreLabel extends LitElement {
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

  @property()
  split?: 'left' | 'middle';

  override firstUpdated() {
    owSlot(this.#defaultSlotElementRef.value);
    owSlot(this.#controlSlotElementRef.value);

    // The "description" slot has a top margin that needs to be conditionally
    // applied only if content is slotted so there's not stray whitespace
    // when there's no description.
    //
    // Normally, we'd listen for "slotchange" and set `this.hasDescription`
    // in the event handler. But form controls always slot content. We need
    // to know if any text has been slotted instead.
    //
    // A Resize Observer is the best proxy for that. If the slot has a height,
    // then we know it has text.
    const observer = new ResizeObserver(() => {
      this.hasDescription = Boolean(
        this.#descriptionSlotElementRef.value &&
          this.#descriptionSlotElementRef.value.offsetHeight > 0,
      );
    });

    if (this.#descriptionSlotElementRef.value) {
      observer.observe(this.#descriptionSlotElementRef.value);
    }
  }

  override render() {
    // `aria-hidden` is used on the tooltip so the contents of the label
    // aren't read twice to screen readers. The label is truncated using
    // CSS. So the full text of the label is always available them.
    return html`<div
      class=${classMap({
        component: true,
        horizontal: this.orientation === 'horizontal',
        vertical: this.orientation === 'vertical',
        left: this.split === 'left',
        middle: this.split === 'middle',
        'hidden-label': this.hide,
      })}
    >
      <div
        class=${classMap({
          tooltips: true,
          hidden: this.hide,
          left: this.split === 'left',
          middle: this.split === 'middle',
        })}
        part="private-tooltips"
      >
        <glide-core-tooltip
          class=${classMap({
            'optional-tooltip': true,
            vertical: this.orientation === 'vertical',
            visible: this.hasTooltipSlot,
          })}
          placement=${this.orientation === 'vertical' ? 'right' : 'bottom'}
        >
          <span class="optional-tooltip-target" slot="target" tabindex="0">
            <svg
              aria-label=${this.#localize.term('moreInformation')}
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
            >
              ${infoCircleIcon}
            </svg>
          </span>

          <slot
            name="tooltip"
            @slotchange=${this.#onTooltipSlotChange}
            ${ref(this.#tooltipSlotElementRef)}
          ></slot>
        </glide-core-tooltip>

        <glide-core-tooltip
          class="label-tooltip"
          placement="right"
          ?disabled=${!this.isLabelTooltip}
        >
          <div
            class=${classMap({
              label: true,
              disabled: this.disabled,
            })}
            data-test="label"
            slot="target"
            ${ref(this.#labelElementRef)}
          >
            <slot
              @slotchange=${this.#onDefaultSlotChange}
              ${ref(this.#defaultSlotElementRef)}
            ></slot>

            ${this.required
              ? html`<span aria-hidden="true" class="required-symbol">*</span>`
              : ''}
          </div>

          <div aria-hidden="true">${this.label}</div>
        </glide-core-tooltip>
      </div>

      <div class="control-and-summary" part="private-control-and-summary">
        <slot
          class=${classMap({
            control: true,
            error: this.error,
            disabled: this.disabled,
            vertical: this.orientation === 'vertical',
            summaryless: !this.hasSummarySlot,
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
          content: this.hasDescription,
          error: this.error,
          tooltip: this.hasTooltipSlot,
        })}
        id="description"
        name="description"
        ${ref(this.#descriptionSlotElementRef)}
      ></slot>
    </div>`;
  }

  @state()
  private hasDescription = false;

  @state()
  private hasSummarySlot = false;

  @state()
  private hasTooltipSlot = false;

  @state()
  private isLabelTooltip = false;

  @state()
  private label = '';

  #controlSlotElementRef = createRef<HTMLSlotElement>();

  #defaultSlotElementRef = createRef<HTMLSlotElement>();

  #descriptionSlotElementRef = createRef<HTMLSlotElement>();

  #labelElementRef = createRef<HTMLElement>();

  #localize = new LocalizeController(this);

  #summarySlotElementRef = createRef<HTMLSlotElement>();

  #tooltipSlotElementRef = createRef<HTMLSlotElement>();

  #onControlSlotChange() {
    owSlot(this.#controlSlotElementRef.value);
  }

  #onDefaultSlotChange() {
    owSlot(this.#defaultSlotElementRef.value);

    const defaultSlotAssignedElement = this.#defaultSlotElementRef.value
      ?.assignedElements()
      .at(0);

    const labelElement = this.#labelElementRef.value;

    ow(defaultSlotAssignedElement, ow.object.instanceOf(Element));
    ow(labelElement, ow.object.instanceOf(HTMLElement));

    if (defaultSlotAssignedElement.textContent) {
      this.label = defaultSlotAssignedElement.textContent;
    }

    const observer = new ResizeObserver(() => {
      // `getBoundingClientRect` is used so we're comparing apples to apples.
      //
      // `clientWidth` on `defaultSlotAssignedElement` is zero if the element
      // is `display` is `inline`. `labelElement`, on the other hand, isn't
      // inline.
      //
      // But `clientWidth` returns an integer and `getBoundingClientRect().width`
      // return a float. So using `clientWidth` for `labelElement` would mean the
      // width of `defaultSlotAssignedElement` is always fractionally greater than
      // that of `labelElement`.
      this.isLabelTooltip =
        defaultSlotAssignedElement.getBoundingClientRect().width >
        labelElement.getBoundingClientRect().width;
    });

    observer.observe(labelElement);
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
