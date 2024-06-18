import { LitElement, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import GlideCoreCheckbox from './checkbox.js';
import checkedIcon from './icons/checked.js';
import styles from './dropdown.option.styles.js';

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

  @property({ attribute: 'private-multiple', type: Boolean })
  privateMultiple = false;

  @property({ type: Boolean })
  get selected() {
    return this.#selected;
  }

  set selected(isSelected) {
    this.#selected = isSelected;

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
  privateIndeterminate = false;

  @state()
  privateIsFocusable = true;

  @state()
  private get isMultiple() {
    // The soonest Dropdown can set `this.privateMultiple` is in its `firstUpdated`.
    // By then, however, this component has has already completed its first render. So
    // we fall sadly back to `this.closest('glide-core-dropdown')`. `this.privateMultiple` is
    // still useful for when Dropdown's `this.multiple` is change dynamically.
    return (
      this.privateMultiple || this.closest('glide-core-dropdown')?.multiple
    );
  }

  override click() {
    if (this.isMultiple) {
      this.selected = !this.selected;
    } else if (!this.selected) {
      this.selected = true;
    }
  }

  override firstUpdated() {
    if (this.#checkboxElementRef.value) {
      this.#checkboxElementRef.value.checked = this.selected;
    }
  }

  @property()
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

  // `shadowRoot.delegatesFocus` is preferred because it's more declarative.
  // But using it triggers a focus-visible state whenever `this.focus` is
  // called. And we only want a focus outline when the `this.focus` is called
  // as a result of keyboard interaction.
  override focus() {
    this.#componentElementRef.value?.focus();
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
    // `tabindex` is set to "0" and "-1" below based on `this.privateActive` unless
    // Dropdown sets `this.privateIsFocusable`, which it does when it's filterable.
    // "0" is to account for when a keyboard user tabs backward to the dropdown button.
    // Tabbing forward from there should move focus to where it was previously, which
    // would be on the option.

    // The linter wants a keyboard listener. There's one on Dropdown itself. It's there
    // because options aren't focusable and thus don't produce keyboard events when Dropdown
    // is filterable.
    /* eslint-disable lit-a11y/click-events-have-key-events */
    return html`<div
      aria-selected=${this.selected ? 'true' : 'false'}
      class=${classMap({
        component: true,
        active: this.privateActive,
        [this.privateSize]: true,
      })}
      data-test="component"
      tabindex=${this.privateActive && this.privateIsFocusable ? '0' : '-1'}
      role="option"
      @click=${this.#onClick}
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
              ?indeterminate=${this.privateIndeterminate}
              ?internally-inert=${!this.privateIsFocusable}
              @change=${this.#onCheckboxChange}
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

  constructor() {
    super();
    this.id = window.crypto.randomUUID();
  }

  #checkboxElementRef = createRef<GlideCoreCheckbox>();

  #componentElementRef = createRef<HTMLElement>();

  #selected = false;

  #value = '';

  get #optionElements() {
    const elements =
      this.closest('glide-core-dropdown')?.querySelectorAll(
        'glide-core-dropdown-option',
      ) ?? [];

    return [...elements];
  }

  #onCheckboxChange() {
    this.selected = !this.selected;
  }

  #onClick(event: MouseEvent) {
    // Checkboxes emit their own "click" events. Not ignoring them would mean
    // setting `this.selected` three times: twice here (one each for the checkbox
    // and its label) and again in `#onCheckboxChange`.
    if (event.target === this.#checkboxElementRef.value) {
      return;
    }

    if (!this.isMultiple && !this.selected) {
      this.selected = true;
    }
  }
}
