import './tooltip.js';
import { LitElement, type PropertyValueMap, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import {
  customElement,
  property,
  queryAssignedElements,
  state,
} from 'lit/decorators.js';
// import { owSlot, owSlotType } from './library/ow.js';
import { when } from 'lit-html/directives/when.js';
import CsRadio from './radio.js';

import infoCircleIcon from './icons/info-circle.js';
import styles from './radio-group.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'cs-radio-group': CsRadioGroup;
  }
}
/**
 * @description A radio group for use with `<cs-radio>` with label.
 */
@customElement('cs-radio-group')
export default class CsRadioGroup extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: 'closed',
  };

  static override styles = styles;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  required = false;

  @property()
  label = '';

  // not exposed until there is 'horizontal'
  orientation = 'vertical';

  @queryAssignedElements({ selector: 'cs-radio' })
  radioItems!: CsRadio[];

  override firstUpdated() {
    if (this.disabled) {
      this.#disableRadios();
    } else {
      this.#setFirstTabbableRadio();
      this.required && this.#setRequiredRadios();
      this.#onTooltipSlotChange();
    }
  }

  override render() {
    return html`
      <div class=${classMap({ component: true, error: false })}>
        <!-- label -->
        <span class=${classMap({ 'label-container': true })}>
          <cs-tooltip
            class=${classMap({
              visible: this.hasTooltipSlot,
            })}
          >
            <span class="tooltip-target" slot="target" tabindex="0">
              ${infoCircleIcon}
            </span>

            <slot
              name="tooltip"
              @slotchange=${this.#onTooltipSlotChange}
              ${ref(this.#tooltipSlotElementRef)}
            ></slot>
          </cs-tooltip>

          <div
            id="label"
            class=${classMap({
              label: true,
              'tooltip-spacing': this.hasTooltipSlot,
            })}
          >
            ${this.label}
            ${when(
              this.required,
              () =>
                html`<span aria-hidden="true" class="required-symbol">*</span>`,
            )}
          </div>
        </span>

        <!-- fieldset -->
        <div>
          <fieldset
            class=${classMap({
              vertical: true,
            })}
            @click=${this.#onClick}
            @keydown=${this.#onKeydown}
            aria-labelledby="label description"
          >
            <div
              class=${classMap({
                'radio-container': true,
                [this.orientation]: true,
              })}
              role="radiogroup"
            >
              <slot></slot>
            </div>
          </fieldset>

          <!-- description -->
          <slot
            class=${classMap({
              description: true,
            })}
            id="description"
            name="description"
          ></slot>
        </div>
      </div>
    `;
  }

  override willUpdate(changedProperties: PropertyValueMap<CsRadioGroup>): void {
    if (this.hasUpdated) {
      if (changedProperties.has('required')) {
        this.#setRequiredRadios();
      }

      if (changedProperties.has('disabled')) {
        if (this.disabled) {
          for (const radioItem of this.radioItems) {
            radioItem.tabIndex = -1;
            radioItem.disabled = true;
          }
        } else {
          for (const radioItem of this.radioItems) {
            radioItem.disabled = false;
          }

          this.#setFirstTabbableRadio();
        }
      }
    }
  }

  @state()
  private hasTooltipSlot = false;

  #tooltipSlotElementRef = createRef<HTMLSlotElement>();

  #checkRadio(radio: CsRadio) {
    radio.checked = true;
    radio.tabIndex = 0;
    radio.focus();
    this.#dispatchEvents(radio);
  }

  #disableRadios() {
    for (const radioItem of this.radioItems) {
      radioItem.tabIndex = -1;
      radioItem.disabled = true;
    }
  }

  #dispatchEvents(radio: CsRadio) {
    this.dispatchEvent(
      new CustomEvent('change', { bubbles: true, detail: radio.value }),
    );

    this.dispatchEvent(
      new CustomEvent('input', { bubbles: true, detail: radio.value }),
    );
  }

  #onClick(event: MouseEvent) {
    if (this.disabled) {
      return;
    }

    const radioTarget = event.target;

    if (radioTarget instanceof CsRadio && !radioTarget?.disabled) {
      this.#checkRadio(radioTarget);

      for (const radioItem of this.radioItems) {
        if (radioItem !== radioTarget) {
          this.#uncheckRadio(radioItem);
        }
      }
    }
  }

  #onKeydown(event: KeyboardEvent) {
    if (this.disabled) {
      return;
    }

    if (event.target instanceof CsRadio) {
      const radioTarget = event.target;

      if (radioTarget.disabled) {
        return;
      }

      switch (event.key) {
        case 'ArrowUp':
        case 'ArrowLeft': {
          event.preventDefault();
          // find the closest enabled radio
          let sibling = radioTarget.previousElementSibling;

          while (
            (!sibling ||
              (sibling instanceof CsRadio && sibling.disabled) ||
              !(sibling instanceof CsRadio)) &&
            sibling !== radioTarget
          ) {
            if (sibling === null) {
              const lastRadio = this.radioItems.at(-1);

              if (lastRadio) {
                sibling = lastRadio;
              }
            } else {
              sibling = sibling.previousElementSibling;
            }
          }

          if (
            sibling &&
            sibling instanceof CsRadio &&
            !sibling.disabled &&
            sibling !== radioTarget
          ) {
            this.#uncheckRadio(radioTarget);
            this.#checkRadio(sibling);
          }

          break;
        }
        case 'ArrowDown':
        case 'ArrowRight': {
          event.preventDefault();
          // find the closest enabled button
          let sibling = radioTarget.nextElementSibling;

          while (
            (!sibling ||
              (sibling instanceof CsRadio && sibling.disabled) ||
              !(sibling instanceof CsRadio)) &&
            sibling !== radioTarget
          ) {
            if (sibling === null) {
              const firstRadio = this.radioItems.at(0);

              if (firstRadio) {
                sibling = firstRadio;
              }
            } else {
              sibling = sibling.nextElementSibling;
            }
          }

          if (
            sibling &&
            sibling instanceof CsRadio &&
            !sibling.disabled &&
            sibling !== radioTarget
          ) {
            this.#uncheckRadio(radioTarget);
            this.#checkRadio(sibling);
          }

          break;
        }
        case ' ': {
          event.preventDefault();

          if (!radioTarget.disabled && !radioTarget.checked) {
            this.#checkRadio(radioTarget);

            for (const radioItem of this.radioItems) {
              if (radioItem !== radioTarget) {
                this.#uncheckRadio(radioItem);
              }
            }
          }

          break;
        }
      }
    }
  }

  #onTooltipSlotChange() {
    const assignedNodes = this.#tooltipSlotElementRef.value?.assignedNodes();
    this.hasTooltipSlot = Boolean(assignedNodes && assignedNodes.length > 0);
  }

  #setFirstTabbableRadio() {
    // do not set any button as tabbable if all are disabled
    if (this.disabled || this.radioItems.every((button) => button.disabled)) {
      return;
    }

    // set tabbable if this is the first selected enabled element or the
    // first enabled element
    const firstEnabledCheckedRadio = this.radioItems.find(
      (radio) => !radio.disabled && radio.checked,
    );

    if (firstEnabledCheckedRadio) {
      firstEnabledCheckedRadio.tabIndex = 0;
    } else if (!firstEnabledCheckedRadio) {
      const firstEnabledRadio = this.radioItems.find(
        (radio) => !radio.disabled,
      );

      if (firstEnabledRadio) {
        firstEnabledRadio.tabIndex = 0;
      }
    }
  }

  #setRequiredRadios() {
    for (const radioItem of this.radioItems) {
      radioItem.required = this.required;
    }
  }

  #uncheckRadio(radio: CsRadio) {
    radio.checked = false;
    radio.tabIndex = -1;
  }
}
