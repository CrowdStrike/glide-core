import { LitElement, type PropertyValueMap, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import {
  customElement,
  property,
  queryAssignedElements,
} from 'lit/decorators.js';
import { owSlotType } from './library/ow.js';
import { when } from 'lit/directives/when.js';
import GlideCoreButtonGroupButton from './button-group.button.js';
import styles from './button-group.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-button-group': GlideCoreButtonGroup;
  }
}

export type ButtonGroupVariant = 'icon-only';
export type ButtonGroupOrientation = 'vertical' | 'horizontal';

/**
 * @description A button group for use with `<glide-core-button-group-button>`.
 *
 * @slot - One or more `<glide-core-button-group-button>` components.
 */
@customElement('glide-core-button-group')
export default class GlideCoreButtonGroup extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: 'closed',
  };

  static override styles = styles;

  @property()
  label? = '';

  @queryAssignedElements({ selector: 'glide-core-button-group-button' })
  listItems!: GlideCoreButtonGroupButton[];

  @property()
  variant?: ButtonGroupVariant;

  @property()
  orientation: ButtonGroupOrientation = 'horizontal';

  override firstUpdated() {
    owSlotType(this.#defaultSlotElementRef.value, [GlideCoreButtonGroupButton]);

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
        () =>
          html`<div class="label" id="glide-core-button-group">
            ${this.label}
          </div>`,
      )}
      <ul
        aria-labelledby="glide-core-button-group"
        role="radiogroup"
        class=${classMap({
          'radio-group': true,
          vertical: this.orientation === 'vertical',
        })}
      >
        <slot
          @slotchange=${this.#onDefaultSlotChange}
          ${ref(this.#defaultSlotElementRef)}
        ></slot>
      </ul>
    `;
  }

  override willUpdate(
    changedProperties: PropertyValueMap<GlideCoreButtonGroup>,
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

  #defaultSlotElementRef = createRef<HTMLSlotElement>();

  #onDefaultSlotChange() {
    owSlotType(this.#defaultSlotElementRef.value, [GlideCoreButtonGroupButton]);
  }
}
