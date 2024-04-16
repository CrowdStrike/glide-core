import { LitElement, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
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
  get selected() {
    return this.#selected;
  }

  set selected(isSelected) {
    this.#selected = isSelected;
    if (this.#selected) {
      // when selected, set the element as tabbable and focus
      this.isTabbable = true;
      this.focus();
      // set other elements as not selected
      const buttonElements = this.#buttonElements;
      for (const button of buttonElements) {
        if (button !== this && button.selected) {
          button.selected = false;
        }
      }
      this.dispatchEvent(
        new CustomEvent('cs-private-change', {
          bubbles: true,
        }),
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

      // set tabbable if this is the first selected enabled element or the
      // first enabled element
      const firstEnabledSelectedButton = buttonElements.find(
        (button) => !button.disabled && button.selected,
      );
      if (firstEnabledSelectedButton && firstEnabledSelectedButton === this) {
        this.isTabbable = true;
      } else if (!firstEnabledSelectedButton) {
        const firstEnabledButton = buttonElements.find(
          (button) => !button.disabled,
        );
        if (firstEnabledButton && firstEnabledButton === this) {
          this.isTabbable = true;
        }
      }
    }

    // update presentation if there is only a nonempty prefix slot,
    // (which is expected to be an icon)
    const isPrefixSlotEmpty =
      this.#prefixSlotRef.value &&
      this.#prefixSlotRef.value.assignedNodes().length === 0;
    const defaultSlotAssignedNodes =
      this.#defaultSlotRef.value && this.#defaultSlotRef.value.assignedNodes();
    // ignore empty text nodes
    const isDefaultSlotEmptyTextNodes =
      defaultSlotAssignedNodes &&
      defaultSlotAssignedNodes.every(
        (node) =>
          node.nodeName.toLowerCase() === '#text' &&
          // if textContent is null, only whitespace, or a new line followed by
          // white space, consider it empty
          node.textContent !== null &&
          (/^(\n *)$/.test(node.textContent) ||
            node.textContent?.trim().length === 0),
      );
    if (
      !isPrefixSlotEmpty &&
      defaultSlotAssignedNodes &&
      (defaultSlotAssignedNodes.length === 0 || isDefaultSlotEmptyTextNodes)
    ) {
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
      aria-checked=${this.selected}
      tabindex=${!this.isTabbable || this.disabled ? -1 : 0}
      @click=${this.#onClick}
      @keydown=${this.#onKeydown}
      ${ref(this.#liRef)}
      class=${classMap({
        selected: this.selected,
        disabled: !!this.disabled,
        [this.position]: true,
        vertical: this.vertical,
        single: this.isSingleButton,
        'prefix-only': this.isPrefixSlotOnly,
      })}
      ?data-test-disabled=${this.disabled}
      ?data-test-vertical=${this.vertical}
      ?data-test-prefix-only=${this.isPrefixSlotOnly}
      data-test-position=${this.position}
    >
      <slot name="prefix" ${ref(this.#prefixSlotRef)}></slot>
      <slot ${ref(this.#defaultSlotRef)}></slot>
    </li>`;
  }

  #defaultSlotRef = createRef<HTMLSlotElement>();

  #liRef = createRef<HTMLLIElement>();

  #observer: MutationObserver | null = null;

  #prefixSlotRef = createRef<HTMLSlotElement>();

  #selected = false;

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
    if (!this.disabled && !this.selected) {
      this.selected = true;
    }
  }

  #onKeydown(event: KeyboardEvent) {
    const buttonElements = this.#buttonElements;
    if (buttonElements.length < 2 && event.key !== ' ') {
      return;
    }
    switch (event.key.toLowerCase()) {
      case 'arrowup':
      case 'arrowleft': {
        event.preventDefault();
        this.selected = false;
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
          sibling.selected = true;
        }
        break;
      }
      case 'arrowdown':
      case 'arrowright': {
        event.preventDefault();
        this.selected = false;
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
          sibling.selected = true;
        }
        break;
      }
      case ' ': {
        event.preventDefault();
        if (!this.disabled && !this.selected) {
          this.selected = true;
        }
        break;
      }
    }
  }
}
