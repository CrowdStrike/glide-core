import { LitElement, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property } from 'lit/decorators.js';
import checkedIcon from './icons/checked.js';
import styles from './dropdown.option.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'cs-dropdown-option': CsDropdownOption;
  }
}

/**
 * @description An individual option for use with <cs-dropdown>.
 *
 * @slot icon - An icon.
 */
@customElement('cs-dropdown-option')
export default class CsDropdownOption extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: 'closed',
  };

  static override styles = styles;

  @property({ reflect: true })
  label?: string;

  @property({ type: Boolean })
  get selected() {
    return this.#selected;
  }

  set selected(isSelected) {
    this.#selected = isSelected;

    if (this.#optionElements) {
      // Normally, we'd dispatch an event here and let the parent component handle deselection.
      // But `selected` can be set programmatically and we're trying to follow native convention,
      // which is to only dispatch events in response to user interaction.
      for (const option of this.#optionElements) {
        if (option !== this && this.selected) {
          option.selected = false;
        }
      }
    }

    if (isSelected) {
      // Marked "private" because Dropdown uses it internally to track the set of selected
      // options in the case of multiselect. It then dispatches in response to this event
      // a "change" event with a `details` property with the selected option values
      // because only it knows the total set of selected values.
      this.dispatchEvent(new Event('private-selected', { bubbles: true }));
    }
  }

  @property()
  get value() {
    return this.#value;
  }

  set value(value) {
    this.#value = value;

    // `this.value` can be mutated programmatically. Dropdown needs to know when that
    // happens so it can update its own `this.value`.
    this.dispatchEvent(new Event('private-value', { bubbles: true }));
  }

  @property({ type: Boolean })
  // An option is considered active when it's interacted with via keyboard or hovered.
  privateActive = false;

  override click() {
    this.selected = true;
  }

  // `shadowRoot.delegatesFocus` is preferred because it's more declarative.
  // But using here it triggers a focus-visible state whenever `this.focus` is
  // called. And we only want a focus outline when the `this.focus` is called
  // as a result of keyboard interaction.
  override focus() {
    this.#componentElementRef.value?.focus();
  }

  override render() {
    // `tabindex` is set to "0" and "-1" below based on `this.privateActive`. "0"
    // is to account for when a keyboard user tabs backward to the dropdown button.
    // Tabbing forward from there should move focus to where it was previously,
    // which would be on the option.

    // The linter wants a `@focus` handler, but there's nothing to be done with
    // one in this case.
    // eslint-disable-next-line lit-a11y/mouse-events-have-key-events
    return html`<div
      aria-selected=${this.selected ? 'true' : 'false'}
      class=${classMap({
        component: true,
        active: this.privateActive,
      })}
      tabindex=${this.privateActive ? '0' : '-1'}
      role="option"
      @click=${this.#onClick}
      @keydown=${this.#onKeydown}
      ${ref(this.#componentElementRef)}
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
    </div>`;
  }

  #componentElementRef = createRef<HTMLElement>();

  #selected = false;

  #value = '';

  get #optionElements() {
    const elements =
      this.closest('cs-dropdown')?.querySelectorAll('cs-dropdown-option') ?? [];

    return [...elements];
  }

  #onClick() {
    this.selected = true;
    this.dispatchEvent(new Event('private-change', { bubbles: true }));
  }

  #onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      this.selected = true;
      this.dispatchEvent(new Event('private-change', { bubbles: true }));
    }
  }
}
