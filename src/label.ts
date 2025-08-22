import './tooltip.js';
import { html, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { when } from 'lit/directives/when.js';
import styles from './label.styles.js';
import { LocalizeController } from './library/localize.js';
import assertSlot from './library/assert-slot.js';
import onResize from './library/on-resize.js';
import final from './library/final.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-private-label': Label;
  }
}

/**
 * @attr {boolean} [disabled=false]
 * @attr {boolean} [error=false]
 * @attr {boolean} [hide=false]
 * @attr {string} [label]
 * @attr {'horizontal'|'vertical'} [orientation='horizontal']
 * @attr {boolean} [required=false]
 * @attr {'left'|'middle'|'right'} [split]
 * @attr {string} [tooltip]
 *
 * @slot {HTMLLabelElement}
 * @slot {Element} [control] - The element with which the label is associated
 * @slot {Element | string} [description] - Additional information or context
 * @slot {Element | string} [summary] - Additional information or context
 */
@customElement('glide-core-private-label')
@final
export default class Label extends LitElement {
    /* c8 ignore start */
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: window.navigator.webdriver ? 'open' : 'closed',
  };
  /* c8 ignore end */

  static override styles = styles;

  @property({ reflect: true, type: Boolean })
  disabled = false;

  @property({ reflect: true, type: Boolean })
  error = false;

  @property({ reflect: true, type: Boolean })
  hide = false;

  @property({ reflect: true, useDefault: true })
  orientation: 'horizontal' | 'vertical' = 'horizontal';

  @property({ reflect: true, type: Boolean })
  required = false;

  @property()
  split?: 'left' | 'middle' | 'right';

  @property()
  tooltip?: string;

  // The default slot is what gets rendered as a label. This label, which
  // should be the exact same, is for the tooltip shown when that label
  // is truncated.
  //
  // Why not use this property for both labels? Because form controls need
  // everything in their own shadow roots so they can wire up ARIA attributes,
  // so the IDs referenced in those attributes aren't made inaccessible by
  // being in another component's shadow root.
  //
  // Another way to get the contents of the default slot into the tooltip would
  // be a mutation observer. But then we would have yet another mutation observer.
  @property()
  label?: string;

  override render() {
    // `aria-hidden` is used on the tooltip so the contents of the label aren't
    // read twice to screen readers. The label is truncated using CSS. So the full
    // text of the label is always available to them.

    // Lit-a11y doesn't know that we're only using a "mouseover" event to hide and
    // show Tooltip, which is hidden from screenreaders because the truncated text
    // is available to them without a tooltip.
    //
    /* eslint-disable lit-a11y/mouse-events-have-key-events */
    return html`<div
      class=${classMap({
        component: true,
        horizontal: this.orientation === 'horizontal',
        vertical: this.orientation === 'vertical',
        left: this.split === 'left',
        middle: this.split === 'middle',
        right: this.split === 'right',
        'hidden-label': this.hide,
      })}
    >
      <div
        class=${classMap({
          tooltips: true,
          hidden: this.hide,
          left: this.split === 'left',
          middle: this.split === 'middle',
          right: this.split === 'right',
          vertical: this.orientation === 'vertical',
        })}
        part="private-tooltips"
      >
        ${when(
          this.tooltip,
          () =>
            html`<glide-core-tooltip
              class=${classMap({
                'optional-tooltip': true,
                vertical: this.orientation === 'vertical',
                visible: this.tooltip ? true : false,
              })}
              label=${ifDefined(this.tooltip)}
              placement=${this.orientation === 'vertical' ? 'right' : 'bottom'}
            >
              <button
                aria-label=${this.#localize.term('tooltip')}
                class="optional-tooltip-target"
                slot="target"
                type="button"
              >
                ${icons.information}
              </button>
            </glide-core-tooltip>`,
        )}

        <glide-core-tooltip
          class="label-tooltip"
          data-test="label-tooltip"
          label=${this.label ?? ''}
          placement="right"
          ?disabled=${!this.isLabelTooltip}
          screenreader-hidden
        >
          <div
            class=${classMap({
              label: true,
              disabled: this.disabled,
            })}
            data-test="label"
            slot="target"
            @mouseover=${this.#onLabelMouseOver}
            ${ref(this.#labelElementRef)}
          >
            <slot ${assertSlot()} ${ref(this.#defaultSlotElementRef)}>
              <!-- @type {HTMLLabelElement} -->
            </slot>
          </div>
        </glide-core-tooltip>

        ${this.required
          ? html`<span
              aria-hidden="true"
              class="required-symbol"
              data-test="required-symbol"
            >
              *
            </span>`
          : ''}
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
          ${assertSlot()}
        >
          <!--
            The element with which the label is associated
            @type {Element}
          -->
        </slot>

        <slot
          class=${classMap({
            summary: true,
            error: this.error,
          })}
          name="summary"
          @slotchange=${this.#onSummarySlotChange}
          ${ref(this.#summarySlotElementRef)}
        >
          <!--
            Additional information or context
            @type {Element | string}
          -->
        </slot>
      </div>

      <slot
        class=${classMap({
          description: true,
          content: this.hasDescription,
          error: this.error,
          tooltip: this.tooltip ? true : false,
        })}
        id="description"
        name="description"
        ${onResize(this.#onDescriptionSlotResize.bind(this))}
        ${ref(this.#descriptionSlotElementRef)}
      >
        <!--
          Additional information or context
          @type {Element | string}
        -->
      </slot>
    </div>`;
  }

  @state()
  private hasDescription = false;

  @state()
  private hasSummarySlot = false;

  @state()
  private isLabelTooltip = false;

  #defaultSlotElementRef = createRef<HTMLSlotElement>();

  #descriptionSlotElementRef = createRef<HTMLSlotElement>();

  #labelElementRef = createRef<HTMLElement>();

  #localize = new LocalizeController(this);

  #summarySlotElementRef = createRef<HTMLSlotElement>();

  #onDescriptionSlotResize() {
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
    this.hasDescription = Boolean(
      this.#descriptionSlotElementRef.value &&
        this.#descriptionSlotElementRef.value.offsetHeight > 0,
    );
  }

  #onLabelMouseOver() {
    const defaultSlotAssignedElement = this.#defaultSlotElementRef.value
      ?.assignedElements()
      .at(0);

    if (defaultSlotAssignedElement && this.#labelElementRef.value) {
      // `getBoundingClientRect()` is used so we're comparing apples to apples.
      //
      // `clientWidth` on `defaultSlotAssignedElement` is zero if the element is
      // `display: inline`. The label, on the other hand, isn't inline.
      //
      // But `clientWidth` returns an integer and `getBoundingClientRect().width`
      // return a float. So using `clientWidth` with `#labelElementRef.value` would
      // mean the width of `defaultSlotAssignedElement` is always fractionally
      // greater than that of `#labelElementRef.value`.
      this.isLabelTooltip =
        defaultSlotAssignedElement.getBoundingClientRect().width >
        this.#labelElementRef.value.getBoundingClientRect().width;
    }
  }

  #onSummarySlotChange() {
    const assignedNodes = this.#summarySlotElementRef.value?.assignedNodes({
      flatten: true,
    });

    this.hasSummarySlot = Boolean(assignedNodes && assignedNodes.length > 0);
  }
}

const icons = {
  information: html`
    <svg
      aria-hidden="true"
      style=${styleMap({
        height: '1rem',
        width: '1rem',
      })}
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />

      <path
        d="M12 16L12 12"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
      />

      <circle cx="12" cy="8" r="1" fill="currentColor" />
    </svg>
  `,
};
