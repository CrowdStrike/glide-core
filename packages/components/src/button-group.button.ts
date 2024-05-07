import { LitElement, type PropertyValueMap, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
import { owSlot, owSlotType } from './library/ow.js';
import styles from './button-group.button.styles.js';
import type { ButtonGroupVariant } from './button-group.js';

declare global {
  interface HTMLElementTagNameMap {
    'cs-button-group-button': CsButtonGroupButton;
  }
}
/**
 * @description A button for use with `<cs-button-group>` with label and optional icon.
 *
 * @event change - Dispatched when clicked or selected by key press.
 * @event input - Dispatched when clicked or selected by key press.

 * @slot prefix - Icon content.
 * @slot - Label content.
 */
@customElement('cs-button-group-button')
export default class CsButtonGroupButton extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: 'closed',
  };

  static override styles = styles;

  @property({ type: Boolean, reflect: true })
  selected = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  // `value` is used since this is effectively a radio button and not a
  // button, and consumers can reasonably expect to identify selections
  // based on some value other than the label.
  @property()
  value = '';

  @property()
  variant?: ButtonGroupVariant;

  @property({ type: Boolean })
  vertical = false;

  override async connectedCallback() {
    super.connectedCallback();

    // determine position in group and style appropriately
    if (this.#buttonElements.length > 0) {
      if (
        this.#buttonElements.length > 1 &&
        this.#buttonElements.at(0) === this
      ) {
        this.position = 'first';
      } else if (
        this.#buttonElements.length > 1 &&
        this.#buttonElements.at(-1) === this
      ) {
        this.position = 'last';
      } else if (this.#buttonElements.length === 1) {
        this.isSingleButton = true;
      }

      // do not set any button as tabbable if all are disabled
      if (this.#buttonElements.every((button) => button.disabled)) {
        return;
      }

      // set tabbable if this is the first selected enabled element or the
      // first enabled element
      const firstEnabledSelectedButton = this.#buttonElements.find(
        (button) => !button.disabled && button.selected,
      );
      if (firstEnabledSelectedButton && firstEnabledSelectedButton === this) {
        this.isTabbable = true;
      } else if (!firstEnabledSelectedButton) {
        const firstEnabledButton = this.#buttonElements.find(
          (button) => !button.disabled,
        );
        if (firstEnabledButton && firstEnabledButton === this) {
          this.isTabbable = true;
        }
      }
    }
  }

  override firstUpdated(): void {
    // Always want a text label and log an error when it isn't present.
    // When the variant is 'icon-only' set the label as visually hidden
    owSlot(this.#defaultSlotElementRef.value);
    owSlotType(this.#defaultSlotElementRef.value, [Text]);

    if (this.selected) {
      this.isTabbable = true;
    }

    this.variant === 'icon-only' && owSlot(this.#prefixSlotElementRef.value);
  }

  override focus(options?: FocusOptions) {
    this.#liElementRef.value?.focus(options);
  }

  override render() {
    return html` <li
      role="radio"
      aria-checked=${this.selected}
      aria-disabled=${this.disabled}
      tabindex=${!this.isTabbable || this.disabled ? -1 : 0}
      @click=${this.#onClick}
      @keydown=${this.#onKeydown}
      ${ref(this.#liElementRef)}
      class=${classMap({
        component: true,
        selected: this.selected,
        disabled: Boolean(this.disabled),
        [this.position]: true,
        vertical: this.vertical,
        single: this.isSingleButton,
        'icon-only': this.variant === 'icon-only',
      })}
    >
      <slot name="prefix" ${ref(this.#prefixSlotElementRef)}></slot>
      <!--
        Wrap the default slot in a span and apply class 'visually-hidden' when
        variant is 'icon-only' (we can't apply styling to text nodes)
       -->
      <span
        class="${classMap({
          'visually-hidden': this.variant === 'icon-only',
        })}"
      >
        <slot ${ref(this.#defaultSlotElementRef)}></slot>
      </span>
    </li>`;
  }

  override willUpdate(
    changedProperties: PropertyValueMap<CsButtonGroupButton>,
  ): void {
    if (this.hasUpdated && changedProperties.has('selected')) {
      const value = changedProperties.get('selected');
      if (value === true) {
        this.isTabbable = false;
      } else if (value === false) {
        this.isTabbable = true;
        this.focus();
        for (const button of this.#buttonElements) {
          if (button !== this && button.selected) {
            button.selected = false;
          }
        }
      }
    }
  }

  @state()
  private isSingleButton = false;

  @state()
  private isTabbable = false;

  @state()
  private position: 'first' | 'last' | 'inner' = 'inner';

  #defaultSlotElementRef = createRef<HTMLSlotElement>();

  #liElementRef = createRef<HTMLLIElement>();

  #prefixSlotElementRef = createRef<HTMLSlotElement>();

  get #buttonElements() {
    const elements =
      this.closest('cs-button-group')?.querySelectorAll(
        'cs-button-group-button',
      ) ?? [];
    return [...elements];
  }

  #dispatchEvents(button: CsButtonGroupButton = this) {
    button.dispatchEvent(
      new CustomEvent('change', { bubbles: true, detail: button.value }),
    );
    button.dispatchEvent(
      new CustomEvent('input', { bubbles: true, detail: button.value }),
    );
  }

  #onClick() {
    if (!this.disabled && !this.selected) {
      this.selected = true;
      this.#dispatchEvents();
    }
  }

  #onKeydown(event: KeyboardEvent) {
    if (
      this.disabled ||
      (this.#buttonElements.length < 2 && event.key !== ' ')
    ) {
      return;
    }
    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowLeft': {
        event.preventDefault();
        this.selected = false;
        // find the closest enabled button
        let sibling = this.previousElementSibling;
        while (
          !sibling ||
          (sibling instanceof CsButtonGroupButton && sibling.disabled)
        ) {
          if (sibling === null) {
            const lastButton = this.#buttonElements.at(-1);
            if (lastButton) {
              sibling = lastButton;
            }
          } else {
            sibling = sibling.previousElementSibling;
          }
        }
        if (sibling && sibling instanceof CsButtonGroupButton) {
          sibling.selected = true;
          this.#dispatchEvents(sibling);
        }
        break;
      }
      case 'ArrowDown':
      case 'ArrowRight': {
        event.preventDefault();
        this.selected = false;
        // find the closest enabled button
        let sibling = this.nextElementSibling;
        while (
          !sibling ||
          (sibling instanceof CsButtonGroupButton && sibling.disabled)
        ) {
          if (sibling === null) {
            const firstButton = this.#buttonElements.at(0);
            if (firstButton) {
              sibling = firstButton;
            }
          } else {
            sibling = sibling.nextElementSibling;
          }
        }
        if (sibling && sibling instanceof CsButtonGroupButton) {
          sibling.selected = true;
          this.#dispatchEvents(sibling);
        }
        break;
      }
      case ' ': {
        event.preventDefault();
        if (!this.disabled && !this.selected) {
          this.selected = true;
          this.#dispatchEvents();
        }
        break;
      }
    }
  }
}
