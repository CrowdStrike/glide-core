import { LitElement, html, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import {
  customElement,
  property,
  queryAssignedElements,
  state,
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

export type ButtonGroupVariant = 'icon-only' | undefined;
type ButtonGroupOrientation = 'vertical' | 'horizontal';

/**
 * @description A button group for use with `<button-group-button>`.
 *
 * @slot - One or more `<button-group-button>` components.
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
  get variant() {
    return this.#variant;
  }

  set variant(value: ButtonGroupVariant) {
    this.#variant = value;
    if (this.#variant) {
      for (const listItem of this.listItems) {
        listItem.setAttribute('variant', 'icon-only');
      }
    } else {
      for (const listItem of this.listItems) {
        listItem.removeAttribute('variant');
      }
    }
  }

  @property()
  get orientation() {
    return this.#orientation;
  }

  set orientation(value: ButtonGroupOrientation) {
    this.#orientation = value;
    if (this.#orientation === 'vertical') {
      for (const listItem of this.listItems) {
        listItem.toggleAttribute('vertical');
      }
    } else {
      for (const listItem of this.listItems) {
        listItem.removeAttribute('vertical');
      }
    }
  }

  override firstUpdated() {
    this.isDefaultSlotEmpty = Boolean(
      this.#defaultSlotRef.value?.assignedNodes().length === 0,
    );

    if (!this.isDefaultSlotEmpty) {
      owSlotType(this.#defaultSlotRef.value, [CsButtonGroupButton]);

      if (this.orientation === 'vertical') {
        for (const listItem of this.listItems) {
          listItem.toggleAttribute('vertical');
        }
      }
      if (this.#variant) {
        for (const listItem of this.listItems) {
          listItem.setAttribute('variant', 'icon-only');
        }
      }
    }
  }

  override render() {
    if (this.isDefaultSlotEmpty) {
      return nothing;
    }

    // ignore rule that prevents slots from being children of ul
    /*  eslint-disable lit-a11y/list */
    return html`
      ${when(
        Boolean(this.label),
        () => html`<label for="cs-button-group">${this.label}</label>`,
      )}
      <ul
        id="cs-button-group"
        role="radiogroup"
        class=${classMap({
          vertical: this.orientation === 'vertical',
        })}
        variant=${this.variant}
      >
        <slot ${ref(this.#defaultSlotRef)}></slot>
      </ul>
    `;
  }

  @state()
  private isDefaultSlotEmpty = false;

  #defaultSlotRef = createRef<HTMLSlotElement>();

  #orientation: ButtonGroupOrientation = 'horizontal';

  #variant: ButtonGroupVariant;
}
