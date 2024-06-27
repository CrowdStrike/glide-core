import './menu.js';
import { LitElement, type PropertyValueMap, html } from 'lit';
import { type Placement } from '@floating-ui/dom';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, eventOptions, property } from 'lit/decorators.js';
import { owSlot, owSlotType } from './library/ow.js';
import GlideCoreMenuButton from './menu.button.js';
import GlideCoreMenuLink from './menu.link.js';
import GlideCoreSplitButton from './split-button.js';
import GlideCoreSplitLink from './split-link.js';
import styles from './split-container.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-split-container': GlideCoreSplitContainer;
  }
}

/**
 * @description A split button that provides a button action and a menu of alternate actions.
 *
 * @slot - One or more of `<glide-core-menu-link>` or `<glide-core-menu-button>`.
 * @slot primary-action - One of either `<glide-core-split-button>` or `<glide-core-split-link>`.
 *
 */
@customElement('glide-core-split-container')
export default class GlideCoreSplitContainer extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: 'closed',
  };

  static override styles = styles;

  @property({ attribute: 'menu-label', reflect: true })
  menulabel = '';

  @property({ type: Boolean, reflect: true })
  open = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ attribute: 'menu-placement', reflect: true })
  placement: Placement = 'bottom-end';

  @property({ reflect: true })
  variant: 'primary' | 'secondary' = 'primary';

  @property({ reflect: true })
  size: 'large' | 'small' = 'large';

  override firstUpdated() {
    this.#testDefaultSlotType();
    this.#testPrimaryActionSlotType();

    const primaryActionElement = this.#primaryActionElementRef.value
      ?.assignedNodes()
      .at(0);

    if (
      primaryActionElement instanceof GlideCoreSplitButton ||
      primaryActionElement instanceof GlideCoreSplitLink
    ) {
      primaryActionElement.disabled = this.disabled;
      primaryActionElement.variant = this.variant;
      primaryActionElement.size = this.size;
    }
  }

  override focus(options?: FocusOptions) {
    const node = this.#primaryActionElementRef.value?.assignedNodes()?.at(0);

    node instanceof HTMLElement && node.focus(options);
  }

  // Can't disable `glide-core-menu`, so capture the event before it arrives.
  // Disabling the trigger button doesn't resolve the issue.
  @eventOptions({ capture: true })
  private onClick(event: MouseEvent) {
    if (this.disabled) {
      event.stopPropagation();
    }
  }

  override render() {
    // A click event is only included on the containing div as a work-around to disable the `glide-core-menu`.
    /* eslint-disable lit-a11y/click-events-have-key-events */
    return html`
      <div
        class=${classMap({
          component: true,
          disabled: this.disabled,
        })}
        @click=${this.onClick}
      >
        <slot
          name="primary-action"
          @slotchange=${this.#onPrimaryActionSlotChange}
          ${ref(this.#primaryActionElementRef)}
          data-test="primary-action"
        ></slot>
        <span
          class=${classMap({ divider: true, [this.variant]: true })}
          data-test="split-divider"
        ></span>
        <glide-core-menu
          ?open=${!this.disabled && this.open}
          size=${this.size}
          placement=${this.placement}
          data-test="menu"
        >
          <button
            slot="target"
            type="button"
            class=${classMap({
              'menu-button': true,
              [this.variant]: true,
              [this.size]: true,
            })}
            ?disabled=${this.disabled}
            aria-label=${this.menulabel}
            data-test="split-menu-button"
            ${ref(this.#menuButtonElementRef)}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              role="presentation"
            >
              <path
                d="M6 9L12 15L18 9"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <slot
            @slotchange=${this.#onDefaultSlotChange}
            ${ref(this.#defaultSlotElementRef)}
          ></slot>
        </glide-core-menu>
      </div>
    `;
  }

  override willUpdate(
    changedProperties: PropertyValueMap<GlideCoreSplitContainer>,
  ): void {
    const primaryActionElement = this.#primaryActionElementRef.value
      ?.assignedNodes()
      .at(0);

    if (
      this.hasUpdated &&
      (primaryActionElement instanceof GlideCoreSplitButton ||
        primaryActionElement instanceof GlideCoreSplitLink)
    ) {
      if (changedProperties.has('disabled')) {
        primaryActionElement.disabled = this.disabled;
      }

      if (changedProperties.has('variant')) {
        primaryActionElement.variant = this.variant;
      }

      if (changedProperties.has('size')) {
        primaryActionElement.size = this.size;
      }
    }
  }

  #defaultSlotElementRef = createRef<HTMLSlotElement>();

  #menuButtonElementRef = createRef<HTMLButtonElement>();

  #primaryActionElementRef = createRef<HTMLSlotElement>();

  #onDefaultSlotChange() {
    this.#testDefaultSlotType();
  }

  #onPrimaryActionSlotChange() {
    this.#testPrimaryActionSlotType();
  }

  #testDefaultSlotType() {
    // ow tests do not trigger in `glide-core-menu`, however
    // there are fewer allowed types anyway (no Text).
    owSlot(this.#defaultSlotElementRef.value);

    owSlotType(this.#defaultSlotElementRef.value, [
      GlideCoreMenuButton,
      GlideCoreMenuLink,
    ]);
  }

  #testPrimaryActionSlotType() {
    owSlot(this.#primaryActionElementRef.value);

    owSlotType(this.#primaryActionElementRef.value, [
      GlideCoreSplitButton,
      GlideCoreSplitLink,
    ]);
  }
}
