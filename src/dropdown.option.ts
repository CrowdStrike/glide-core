import './checkbox.js';
import { LitElement, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
import { nanoid } from 'nanoid';
import { when } from 'lit/directives/when.js';
import checkedIcon from './icons/checked.js';
import styles from './dropdown.option.styles.js';
import type GlideCoreCheckbox from './checkbox.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-dropdown-option': GlideCoreDropdownOption;
  }
}

/**
 * @description An individual option for use with <glide-core-dropdown>.
 *
 * @slot icon - An icon.
 */
@customElement('glide-core-dropdown-option')
export default class GlideCoreDropdownOption extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: 'closed',
  };

  static override styles = styles;

  @property({ reflect: true })
  label?: string;

  @property({ attribute: 'private-indeterminate', type: Boolean })
  privateIndeterminate = false;

  @property({ attribute: 'private-multiple', type: Boolean })
  privateMultiple = false;

  @property({ reflect: true, type: Boolean })
  get selected() {
    return this.#selected;
  }

  set selected(isSelected) {
    this.#selected = isSelected;
    this.ariaSelected = isSelected.toString();

    if (this.isMultiple) {
      if (this.#checkboxElementRef.value) {
        this.#checkboxElementRef.value.checked = isSelected;
      }
    } else {
      // When not `this.isMultiple`, only one option may be selected at the time. This handles
      // deselecting every other option when a new one is selected.
      //
      // Siblings modifying siblings is unusual but simplifies things for Dropdown. Dropdown
      // selects and deselects options in various situations. So it's simpler and more reliable
      // to iterate through them once here instead of doing so multiple times in Dropdown or
      // else abstracting the deselection into a Dropdown method that will result in a bug
      // when not used.
      //
      // `this.privateActive` would get the same treatment if not for Select All, which is in
      // Dropdown's shadow DOM and so is inaccessible from this component.
      for (const option of this.#optionElements) {
        if (option !== this && this.selected && option.selected) {
          option.selected = false;
        }
      }
    }

    // Prefixed with "private" because Dropdown uses it internally, to track the set of
    // selected options in the case of multiselect. Dropdown itself then dispatches in
    // response to this event a "change" event after updating its `this.value`.
    this.dispatchEvent(new Event('private-selected-change', { bubbles: true }));
  }

  @property({ attribute: 'private-size', reflect: true })
  privateSize: 'small' | 'large' = 'large';

  // An option is considered active when it's interacted with via keyboard or hovered.
  @state()
  privateActive = false;

  @state()
  private get isMultiple() {
    // The soonest Dropdown can set `this.privateMultiple` is in its `firstUpdated`.
    // By then, however, this component has has already completed its first render. So
    // we fall sadly back to `this.closest('glide-core-dropdown')`. `this.privateMultiple`
    // is still useful for when Dropdown's `this.multiple` is change dynamically.
    return (
      this.privateMultiple || this.closest('glide-core-dropdown')?.multiple
    );
  }

  override click() {
    if (this.privateMultiple) {
      this.#checkboxElementRef.value?.click();
    } else {
      this.#componentElementRef.value?.click();
    }
  }

  override connectedCallback() {
    super.connectedCallback();

    // On the host instead of inside the shadow DOM so screenreaders can find this
    // ID when it's assigned to `aria-activedescendant` in Dropdown itself.
    this.id = this.#id;

    // These three are likewise on the host due to `aria-activedescendant`. The active
    // descendant must be the element with `ariaSelected` and `role`, and also has
    // to be programmatically focusable.
    this.ariaSelected = this.selected.toString();
    this.role = 'option';
    this.tabIndex = -1;
  }

  override firstUpdated() {
    if (this.#checkboxElementRef.value) {
      this.#checkboxElementRef.value.checked = this.selected;
    }
  }

  @property({ reflect: true })
  get value() {
    return this.#value;
  }

  set value(value) {
    const oldValue = this.#value;
    this.#value = value;

    // `this.value` can be changed programmatically. Dropdown needs to know when that
    // happens so it can update its own `this.value`.
    this.dispatchEvent(
      new CustomEvent('private-value-change', {
        bubbles: true,
        // Without knowing what the old value was, Dropdown would be unable to find the
        // value in its `this.value` and then remove it.
        detail: oldValue,
      }),
    );
  }

  async privateUpdateCheckbox() {
    // Hacky indeed. This is for the case where Dropdown is changed programmatically
    // from a single to a multiselect. `this.isMultiple` is set to `true` but
    // `this.#checkboxElementRef.value` in the `multiple` setter is `undefined`
    // because this component hasn't had a chance to rerender. So we wait for it
    // to rerender then update the checkbox to match `this.selected`. Halp!
    await this.updateComplete;

    if (this.#checkboxElementRef.value) {
      this.#checkboxElementRef.value.checked = this.selected;
    }
  }

  override render() {
    // The linter wants a keyboard listener. There's one on Dropdown itself. It's there
    // because options aren't focusable and thus don't produce keyboard events when Dropdown
    // is filterable.

    /* eslint-disable lit-a11y/click-events-have-key-events */
    return html`<div
      class=${classMap({
        component: true,
        active: this.privateActive,
        [this.privateSize]: true,
      })}
      data-test="component"
      ${ref(this.#componentElementRef)}
    >
      ${when(
        this.isMultiple,
        () => {
          return html`
            <glide-core-checkbox
              class=${classMap({
                checkbox: true,
                [this.privateSize]: true,
              })}
              data-test="checkbox"
              label=${this.label ?? ''}
              tabindex="-1"
              private-variant="minimal"
              value=${this.value}
              internally-inert
              @click=${this.#onCheckboxClick}
              ?indeterminate=${this.privateIndeterminate}
              ${ref(this.#checkboxElementRef)}
            ></glide-core-checkbox>
          `;
        },
        () => {
          return html`
          <div class=${classMap({
            option: true,
            [this.privateSize]: true,
          })}
          >
            <div
                class=${classMap({
                  'checked-icon': true,
                  visible: this.selected,
                })}
              >
                ${checkedIcon}
              </div>

              <slot name="icon"></slot>
              ${this.label}
            </div>
          </div>`;
        },
      )}
    </div> `;
  }

  #checkboxElementRef = createRef<GlideCoreCheckbox>();

  #componentElementRef = createRef<HTMLElement>();

  // Established here instead of in `connectedCallback` so the ID remains
  // constant even if this component is removed and re-added to the DOM.
  // If it's not constant, Dropdown's `aria-activedescendant` will immediately
  // point to a non-existent ID when this component is re-added. An edge case
  // for sure. But one we can protect against with little effort.
  #id = nanoid();

  #selected = false;

  #value = '';

  get #optionElements() {
    const elements =
      this.closest('glide-core-dropdown')?.querySelectorAll(
        'glide-core-dropdown-option',
      ) ?? [];

    return [...elements];
  }

  #onCheckboxClick(event: MouseEvent) {
    // Checkboxes emit their own "click" events. Letting them propagate would
    // mean Dropdown handling multiple "click" events and thus dispatching
    // duplicate "change" and "input" events. So Dropdown listens for "input"
    // for multiselect and "click" for single-select.
    event.stopPropagation();
  }
}
