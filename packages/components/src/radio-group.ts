import { LitElement, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
// import { createRef, ref } from 'lit/directives/ref.js';
import {
  customElement,
  property,
  queryAssignedElements,
} from 'lit/decorators.js';
// import { owSlot, owSlotType } from './library/ow.js';
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

  @property()
  label = '';

  orientation = 'vertical';

  @queryAssignedElements({ selector: 'cs-radio' })
  radioItems!: CsRadio[];

  override render() {
    return html`
      <div class=${classMap({ component: true })}>
        <label
          id="label"
          class=${classMap({ label: true })}
          role="presentation"
        >
          ${this.label}
        </label>
        <fieldset
          class=${classMap({
            vertical: true,
          })}
          @click=${this.#onClick}
          @keydown=${this.#onKeydown}
          aria-labelledby="label"
        >
          <div
            class=${classMap({
              container: true,
              [this.orientation]: true,
            })}
          >
            <slot></slot>
          </div>
        </fieldset>
      </div>
    `;
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
    if (event.target instanceof CsRadio) {
      event.target.checked = true;
      this.#dispatchEvents(event.target);

      for (const radioItem of this.radioItems) {
        if (radioItem !== event.target) {
          radioItem.checked = false;
        }
      }
    }
  }

  #onKeydown(event: KeyboardEvent) {
    if (event.target instanceof CsRadio) {
      const radio = event.target;

      if (radio.disabled) {
        return;
      }

      switch (event.key) {
        case 'ArrowUp':
        case 'ArrowLeft': {
          event.preventDefault();
          radio.checked = false;
          // find the closest enabled radio
          let sibling = radio.previousElementSibling;

          while (!sibling || (sibling instanceof CsRadio && sibling.disabled)) {
            if (sibling === null) {
              const lastRadio = this.radioItems.at(-1);

              if (lastRadio) {
                sibling = lastRadio;
              }
            } else {
              sibling = sibling.previousElementSibling;
            }
          }

          if (sibling && sibling instanceof CsRadio) {
            sibling.checked = true;
            this.#dispatchEvents(sibling);
          }

          break;
        }
        case 'ArrowDown':
        case 'ArrowRight': {
          event.preventDefault();
          radio.checked = false;
          // find the closest enabled button
          let sibling = radio.nextElementSibling;

          while (!sibling || (sibling instanceof CsRadio && sibling.disabled)) {
            if (sibling === null) {
              const firstRadio = this.radioItems.at(0);

              if (firstRadio) {
                sibling = firstRadio;
              }
            } else {
              sibling = sibling.nextElementSibling;
            }
          }

          if (sibling && sibling instanceof CsRadio) {
            sibling.checked = true;
            this.#dispatchEvents(sibling);
          }

          break;
        }
        case ' ': {
          event.preventDefault();

          if (!radio.disabled && !radio.checked) {
            radio.checked = true;
            this.#dispatchEvents(radio);

            for (const radioItem of this.radioItems) {
              if (radioItem !== radio) {
                radioItem.checked = false;
              }
            }
          }

          break;
        }
      }
    }
  }
}
