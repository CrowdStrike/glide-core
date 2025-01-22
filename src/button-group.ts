import { html, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property } from 'lit/decorators.js';
import packageJson from '../package.json' with { type: 'json' };
import GlideCoreButtonGroupButton from './button-group.button.js';
import styles from './button-group.styles.js';
import assertSlot from './library/assert-slot.js';
import shadowRootMode from './library/shadow-root-mode.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-button-group': GlideCoreButtonGroup;
  }
}

/**
 * @event selected
 *
 * @slot - One or more of `<glide-core-button-group-button>`.
 */
@customElement('glide-core-button-group')
export default class GlideCoreButtonGroup extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: shadowRootMode,
  };

  static override styles = styles;

  @property({ reflect: true })
  label? = '';

  @property({ reflect: true })
  get variant() {
    return this.#variant;
  }

  set variant(variant: 'icon-only' | undefined) {
    for (const button of this.#buttonElements) {
      button.privateVariant = variant;
    }

    this.#variant = variant;
  }

  @property({ reflect: true })
  get orientation() {
    return this.#orientation;
  }

  set orientation(orientation: 'horizontal' | 'vertical') {
    for (const button of this.#buttonElements) {
      button.privateOrientation = orientation;
    }

    this.#orientation = orientation;
  }

  @property({ reflect: true })
  readonly version = packageJson.version;

  override render() {
    return html`
      <div
        class=${classMap({
          component: true,
          horizontal: this.orientation === 'horizontal',
          vertical: this.orientation === 'vertical',
        })}
      >
        <div class="label" id="label" data-test="label">${this.label}</div>

        <div
          aria-labelledby="label"
          role="radiogroup"
          class=${classMap({
            container: true,
            vertical: this.orientation === 'vertical',
          })}
        >
          <slot
            @click=${this.#onSlotClick}
            @keydown=${this.#onSlotKeydown}
            @private-selected=${this.#onSlotSelected}
            @slotchange=${this.#onSlotChange}
            ${assertSlot([GlideCoreButtonGroupButton])}
            ${ref(this.#slotElementRef)}
          ></slot>
        </div>
      </div>
    `;
  }

  #orientation: 'horizontal' | 'vertical' = 'horizontal';

  #slotElementRef = createRef<HTMLSlotElement>();

  #variant?: 'icon-only';

  get #buttonElements() {
    return [...this.querySelectorAll('glide-core-button-group-button')];
  }

  #onSlotChange() {
    const isButtonAlreadySelected = this.#buttonElements.find(
      ({ disabled, selected }) => !disabled && selected,
    );

    if (!isButtonAlreadySelected) {
      const firstEnabledButton = this.#buttonElements.find(
        ({ disabled }) => !disabled,
      );

      if (firstEnabledButton) {
        firstEnabledButton.selected = true;
      }
    }

    for (const button of this.#buttonElements) {
      button.privateVariant = this.variant;

      if (this.orientation) {
        button.privateOrientation = this.orientation;
      }
    }
  }

  // This handler could just as well go in Button Group Button. It's here for
  // consistency, so that Button Group alone manages the state of `selected`.
  #onSlotClick(event: PointerEvent) {
    if (event.target instanceof HTMLElement) {
      const button = event.target.closest('glide-core-button-group-button');

      // Guards against `button.selected` to prevent duplicate "change" and
      // "input" events.
      if (button && !button.disabled && !button.selected) {
        button.selected = true;

        button.dispatchEvent(
          new Event('selected', { bubbles: true, composed: true }),
        );
      }
    }
  }

  #onSlotKeydown(event: KeyboardEvent) {
    const selectedButtonElement = this.querySelector(
      'glide-core-button-group-button[selected]',
    );

    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowLeft': {
        // Prevent page scroll.
        event.preventDefault();

        let previousButton =
          selectedButtonElement?.previousElementSibling ??
          this.#buttonElements.at(-1);

        while (previousButton instanceof GlideCoreButtonGroupButton) {
          if (previousButton.disabled) {
            previousButton =
              previousButton.previousElementSibling ??
              this.#buttonElements.at(-1);
          } else {
            break;
          }
        }

        if (previousButton instanceof GlideCoreButtonGroupButton) {
          previousButton.selected = true;

          previousButton.dispatchEvent(
            new Event('selected', { bubbles: true, composed: true }),
          );
        }

        break;
      }
      case 'ArrowDown':
      case 'ArrowRight': {
        // Prevent page scroll.
        event.preventDefault();

        let nextButton =
          selectedButtonElement?.nextElementSibling ??
          this.#buttonElements.at(0);

        while (nextButton instanceof GlideCoreButtonGroupButton) {
          if (nextButton.disabled) {
            nextButton =
              nextButton.nextElementSibling ?? this.#buttonElements.at(0);
          } else {
            break;
          }
        }

        if (nextButton instanceof GlideCoreButtonGroupButton) {
          nextButton.selected = true;

          nextButton.dispatchEvent(
            new Event('selected', { bubbles: true, composed: true }),
          );
        }

        break;
      }
      // This is specifically so the VoiceOver user can select and deselect buttons. Normally
      // only the selected button is tabbable. But VoiceOver can programmatically focus anything
      // with a `tabindex`.
      case ' ': {
        // Prevent page scroll.
        event.preventDefault();

        if (event.target instanceof HTMLElement) {
          const button = event.target.closest('glide-core-button-group-button');

          if (button && !button.disabled && !button.selected) {
            button.selected = true;

            button.dispatchEvent(
              new Event('selected', { bubbles: true, composed: true }),
            );
          }
        }

        break;
      }
    }
  }

  #onSlotSelected(event: Event) {
    // Guards against the button not being selected so an event for every
    // deselected button isn't dispatched.
    if (
      event.target instanceof GlideCoreButtonGroupButton &&
      event.target.selected
    ) {
      for (const button of this.#buttonElements) {
        if (button !== event.target) {
          button.selected = false;
        }
      }

      event.target.focus();
    }
  }
}
