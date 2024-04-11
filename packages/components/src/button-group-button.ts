import { LitElement, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import styles from './button-group-button.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'cs-button-group-button': CsButtonGroupButton;
  }
}

type TButtonGroupButtonPosition = 'first' | 'last' | 'inner';

@customElement('cs-button-group-button')
export default class CsButtonGroupButton extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: 'closed',
  };

  static override styles = styles;

  @property({ type: Boolean, reflect: true })
  get checked() {
    return this.#checked;
  }

  set checked(isChecked) {
    this.#checked = isChecked;
    if (this.#checked) {
      // when checked, set the element as tabbable and focus
      this.isTabbable = true;
      this.focus();
      // set other elements are neither checked nor tabbable
      const buttonElements = this.#buttonElements;
      for (const button of buttonElements) {
        if (button !== this) {
          button.checked = false;
          button.isTabbable = false;
        }
      }
      this.dispatchEvent(
        new CustomEvent('cs-private-change', { bubbles: true }),
      );
      this.dispatchEvent(
        new CustomEvent('cs-private-input', { bubbles: true }),
      );
    } else {
      this.isTabbable = false;
    }
  }

  @property({ type: Boolean, reflect: true })
  disabled? = false;

  @property({ reflect: true })
  value = '';

  @state()
  isPrefixSlotOnly = false;

  @state()
  isSingleButton = false;

  @state()
  isTabbable = false;

  @state()
  position: TButtonGroupButtonPosition = 'inner';

  @state()
  vertical = false;

  override async connectedCallback() {
    super.connectedCallback();

    // setup observer on parent button group element to watch for
    // vertical presentation
    const buttonGroupElement = this.closest('cs-button-group');
    if (buttonGroupElement) {
      this.#observer = new MutationObserver(this.#mutationCallback);
      this.#observer.observe(buttonGroupElement, { attributes: true });
    }
    // intialize state and toggle in `mutationCallback` as needed
    if (buttonGroupElement?.hasAttribute('vertical')) {
      this.vertical = true;
    }

    await this.updateComplete;

    // determine position in group and style approriately
    const buttonElements = this.#buttonElements;
    if (buttonElements.length > 0) {
      if (buttonElements.length > 1 && buttonElements.at(0) === this) {
        this.position = 'first';
      } else if (buttonElements.length > 1 && buttonElements.at(-1) === this) {
        this.position = 'last';
      } else if (buttonElements.length === 1) {
        this.isSingleButton = true;
      }

      // do not set any button as tabbable if all are disabled
      if (buttonElements.every((button) => button.disabled)) {
        return;
      }

      // set tabbable if it is the first checked enabled element or the
      // first enabled element
      const firstEnabledCheckedButton = buttonElements.find(
        (button) => !button.disabled && button.checked,
      );
      if (firstEnabledCheckedButton && firstEnabledCheckedButton === this) {
        this.isTabbable = true;
      } else {
        const firstEnabledButton = buttonElements.find(
          (button) => !button.disabled,
        );
        if (firstEnabledButton && firstEnabledButton === this) {
          this.isTabbable = true;
        }
      }
    }

    // update presentation if there is only a nonempty prefix slot,
    // which is expected to be an icon
    const isPrefixSlotEmpty =
      (this.#prefixSlotRef.value?.assignedNodes() ?? []).length === 0;
    const isDefaultSlotEmpty =
      (this.#defaultSlotRef.value?.assignedNodes() ?? []).length === 0;
    if (!isPrefixSlotEmpty && isDefaultSlotEmpty) {
      this.isPrefixSlotOnly = true;
    }
  }

  override disconnectedCallback() {
    this.#observer?.disconnect();
  }

  override focus(options?: FocusOptions) {
    this.#liRef.value?.focus(options);
  }

  override render() {
    return html`<li
      role="radio"
      aria-checked=${this.checked}
      tabindex=${!this.isTabbable || this.disabled ? -1 : 0}
      @click=${this.#onClick}
      @keydown=${this.#onKeydown}
      ${ref(this.#liRef)}
      class=${classMap({
        checked: this.checked,
        disabled: this.disabled ?? false,
        [this.position]: true,
        vertical: this.vertical,
        single: this.isSingleButton,
        'icon-only': this.isPrefixSlotOnly,
      })}
      aria-label=${ifDefined(this.ariaLabel ?? undefined)}
    >
      <slot name="prefix" ${ref(this.#prefixSlotRef)}></slot>
      <slot data-default-slot ${ref(this.#defaultSlotRef)}></slot>
    </li>`;
  }

  #checked = false;

  #defaultSlotRef = createRef<HTMLSlotElement>();

  #liRef = createRef<HTMLLIElement>();

  #observer: MutationObserver | null = null;

  #prefixSlotRef = createRef<HTMLSlotElement>();

  get #buttonElements() {
    const elements =
      this.closest('cs-button-group')?.querySelectorAll(
        'cs-button-group-button',
      ) ?? [];
    return [...elements];
  }

  // use an arrow function to bind `this`
  #mutationCallback = (mutationList: MutationRecord[]) => {
    for (const mutation of mutationList) {
      const { type, attributeName } = mutation;
      if (type === 'attributes' && attributeName === 'vertical') {
        this.vertical = !this.vertical;
      }
    }
  };

  #onClick() {
    if (!this.disabled) {
      this.checked = true;
    }
  }

  #onKeydown(event: KeyboardEvent) {
    event.preventDefault();
    const buttonElements = this.#buttonElements;
    if (buttonElements.length < 2 && event.key.toLocaleLowerCase() !== ' ') {
      return;
    }
    switch (event.key.toLocaleLowerCase()) {
      case 'arrowup':
      case 'arrowleft': {
        this.checked = false;
        // find the closest enabled button
        let sibling = this.previousElementSibling;
        while (
          !sibling ||
          (sibling instanceof CsButtonGroupButton && sibling.disabled)
        ) {
          if (sibling === null) {
            const lastButton = buttonElements.at(-1);
            if (lastButton) {
              sibling = lastButton;
            }
          } else {
            sibling = sibling.previousElementSibling;
          }
        }
        if (sibling && sibling instanceof CsButtonGroupButton) {
          sibling.checked = true;
        }
        break;
      }
      case 'arrowdown':
      case 'arrowright': {
        this.checked = false;
        // find the closest enabled button
        let sibling = this.nextElementSibling;
        while (
          !sibling ||
          (sibling instanceof CsButtonGroupButton && sibling.disabled)
        ) {
          if (sibling === null) {
            const firstButton = buttonElements.at(0);
            if (firstButton) {
              sibling = firstButton;
            }
          } else {
            sibling = sibling.nextElementSibling;
          }
        }
        if (sibling && sibling instanceof CsButtonGroupButton) {
          sibling.checked = true;
        }
        break;
      }
      case ' ': {
        if (!this.disabled) {
          this.checked = true;
        }
        break;
      }
    }
  }
}
