import { LitElement, type PropertyValueMap, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
// import { createRef, ref } from 'lit/directives/ref.js';
import {
  customElement,
  property,
  queryAssignedElements,
} from 'lit/decorators.js';
// import { owSlot, owSlotType } from './library/ow.js';
import { when } from 'lit-html/directives/when.js';
import CsRadio from './radio.js';
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

  // TODO disabled on parent?

  @property({ type: Boolean, reflect: true })
  required = false;

  @property()
  label = '';

  // not exposed until there is a 'horizontal' enhancement
  orientation = 'vertical';

  @queryAssignedElements({ selector: 'cs-radio' })
  radioItems!: CsRadio[];

  override firstUpdated() {
    this.role = 'radiogroup';
    this.#setFirstTabbableRadio();
    this.#setRequiredRadios();
  }

  override render() {
    return html`
      <div class=${classMap({ component: true })}>
        <span class=${classMap({ 'label-container': true })}>
          <label
            id="label"
            class=${classMap({ label: true })}
            role="presentation"
            @click=${this.#onClickLabel}
          >
            ${this.label}${when(
              this.required,
              () => html`<span aria-hidden="true">*</span>`,
            )}
          </label>
        </span>
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
    if (this.hasUpdated && changedProperties.has('required')) {
      this.#setRequiredRadios();
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
    const radioTarget = event.target;
    // console.log('radioTarget ', radioTarget);

    if (radioTarget instanceof CsRadio) {
      if (radioTarget?.disabled) return;

      radioTarget.checked = true;
      radioTarget.tabIndex = 0;
      radioTarget.focus();

      this.#dispatchEvents(radioTarget);

      for (const radioItem of this.radioItems) {
        // console.log('radioItem ', radioItem);
        // console.log('radioItem === radioTarget ', radioItem === radioTarget);

        if (radioItem !== radioTarget) {
          radioItem.checked = false;
          radioItem.tabIndex = -1;
          // radioItem.requestUpdate();
        }
      }
    }
  }

  #onClickLabel() {
    // if (this.disabled) return;

    let radioItemChecked: CsRadio | null = null;
    let radioItemDisabled: CsRadio | null = null;
    let radioItemToFocus: CsRadio | null = null;

    for (const radioItem of this.radioItems) {
      if (radioItem.checked) {
        radioItemChecked = radioItem;
        break;
      }

      if (radioItemDisabled === null && !radioItem.disabled) {
        radioItemDisabled = radioItem;
      }
    }

    radioItemToFocus = radioItemChecked ?? radioItemDisabled;

    radioItemToFocus?.focus();
  }

  #onKeydown(event: KeyboardEvent) {
    // if (this.disabled) {
    //   return;
    // }

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
            radioTarget.checked = false;
            radioTarget.tabIndex = -1;
            sibling.checked = true;
            sibling.tabIndex = 0;
            sibling.focus();
            this.#dispatchEvents(sibling);
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
            radioTarget.checked = false;
            radioTarget.tabIndex = -1;
            sibling.checked = true;
            sibling.tabIndex = 0;
            sibling.focus();
            this.#dispatchEvents(sibling);
          }

          break;
        }
        case ' ': {
          event.preventDefault();

          if (!radioTarget.disabled && !radioTarget.checked) {
            radioTarget.checked = true;
            radioTarget.tabIndex = 0;
            radioTarget.focus();
            this.#dispatchEvents(radioTarget);

            for (const radioItem of this.radioItems) {
              if (radioItem !== radioTarget) {
                radioItem.checked = false;
                radioItem.tabIndex = -1;
              }
            }
          }

          break;
        }
      }
    }
  }

  #setFirstTabbableRadio() {
    // do not set any button as tabbable if all are disabled
    if (this.radioItems.every((button) => button.disabled)) {
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
}
