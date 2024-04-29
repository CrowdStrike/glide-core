import { LitElement, type PropertyValueMap, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import {
  customElement,
  property,
  queryAssignedElements,
} from 'lit/decorators.js';
import { owSlotType } from './library/ow.js';
import { when } from 'lit-html/directives/when.js';
import CsButtonGroupButton from './button-group.button.js';
import styles from './button-group.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'cs-button-group': CsButtonGroup;
  }
}

export type ButtonGroupVariant = 'icon-only';
export type ButtonGroupOrientation = 'vertical' | 'horizontal';

/**
 * @description A button group for use with `<cs-button-group-button>`.
 *
 * @slot - One or more `<cs-button-group-button>` components.
 */
@customElement('cs-button-group')
export default class CsButtonGroup extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: 'closed',
  };

  static override styles = styles;

  @property()
  label? = '';

  @queryAssignedElements({ selector: 'cs-button-group-button' })
  listItems!: Array<CsButtonGroupButton>;

  @property()
  variant?: ButtonGroupVariant;

  @property()
  orientation: ButtonGroupOrientation = 'horizontal';

  override firstUpdated() {
    owSlotType(this.#defaultSlotRef.value, [CsButtonGroupButton]);

    if (this.orientation === 'vertical') {
      for (const listItem of this.listItems) {
        listItem.toggleAttribute('vertical');
      }
    }
    if (this.variant === 'icon-only') {
      for (const listItem of this.listItems) {
        listItem.setAttribute('variant', 'icon-only');
      }
    }
  }

  override render() {
    // ignore rule that prevents slots from being children of ul
    /*  eslint-disable lit-a11y/list */
    return html`
      ${when(
        Boolean(this.label),
        () => html`<div class="label" id="cs-button-group">${this.label}</div>`,
      )}
      <ul
        aria-labelledby="cs-button-group"
        role="radiogroup"
        class=${classMap({
          vertical: this.orientation === 'vertical',
        })}
      >
        <slot ${ref(this.#defaultSlotRef)}></slot>
      </ul>
    `;
  }

  override willUpdate(
    changedProperties: PropertyValueMap<CsButtonGroup>,
  ): void {
    if (this.hasUpdated && changedProperties.has('variant')) {
      const value = changedProperties.get('variant');
      if (value === 'icon-only') {
        for (const listItem of this.listItems) {
          listItem.removeAttribute('variant');
        }
      } else {
        for (const listItem of this.listItems) {
          listItem.setAttribute('variant', 'icon-only');
        }
      }
    }

    if (this.hasUpdated && changedProperties.has('orientation')) {
      const value = changedProperties.get('orientation');
      if (value === 'vertical') {
        for (const listItem of this.listItems) {
          listItem.removeAttribute('vertical');
        }
      } else if (value === 'horizontal') {
        for (const listItem of this.listItems) {
          listItem.toggleAttribute('vertical');
        }
      }
    }
  }

  #defaultSlotRef = createRef<HTMLSlotElement>();
}
