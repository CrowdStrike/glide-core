import './menu.js';
import './menu.options.js';
import { LitElement, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property } from 'lit/decorators.js';
import GlideCoreMenu from './menu.js';
import GlideCoreMenuButton from './menu.button.js';
import GlideCoreMenuLink from './menu.link.js';
import GlideCoreSplitButtonContainerButton from './split-button-container.button.js';
import GlideCoreSplitButtonContainerLink from './split-button-container.link.js';
import ow, { owSlot, owSlotType } from './library/ow.js';
import styles from './split-button-container.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-split-button-container': GlideCoreSplitButtonContainer;
  }
}

/**
 * @slot - One or more of `<glide-core-menu-button>` or `<glide-core-menu-link>`.
 * @slot primary-action - One of either `<glide-core-split-button-container-button>` or `<glide-core-split-button-container-link>`.
 *
 */
@customElement('glide-core-split-button-container')
export default class GlideCoreSplitButtonContainer extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: 'closed',
  };

  static override styles = styles;

  @property({ type: Boolean, reflect: true })
  get disabled() {
    return this.#isDisabled;
  }

  set disabled(isDisabled: boolean) {
    this.#isDisabled = isDisabled;

    if (this.primaryActionElement) {
      this.primaryActionElement.privateDisabled = isDisabled;
    }
  }

  /* For screenreaders */
  @property({ attribute: 'menu-label', reflect: true })
  menuLabel = '';

  @property({ attribute: 'menu-open', type: Boolean, reflect: true })
  menuOpen = false;

  @property({ attribute: 'menu-placement', reflect: true })
  menuPlacement: 'bottom-end' | 'top-end' = 'bottom-end';

  @property({ reflect: true })
  get size() {
    return this.#size;
  }

  set size(size: 'large' | 'small') {
    this.#size = size;

    if (this.primaryActionElement) {
      this.primaryActionElement.privateSize = size;
    }
  }

  @property({ reflect: true })
  get variant() {
    return this.#variant;
  }

  set variant(variant: 'primary' | 'secondary') {
    this.#variant = variant;

    if (this.primaryActionElement) {
      this.primaryActionElement.privateVariant = variant;
    }
  }

  override click(options?: { target: 'menu-button' }) {
    if (options?.target === 'menu-button') {
      this.#menuButtonElementRef.value?.click();
    } else {
      this.primaryActionElement?.click();
    }
  }

  override firstUpdated() {
    owSlot(this.#defaultSlotElementRef.value);
    owSlot(this.#primaryActionElementRef.value);

    owSlotType(this.#defaultSlotElementRef.value, [
      GlideCoreMenuButton,
      GlideCoreMenuLink,
    ]);

    owSlotType(this.#primaryActionElementRef.value, [
      GlideCoreSplitButtonContainerButton,
      GlideCoreSplitButtonContainerLink,
    ]);

    // A "click" listener on Menu would suffice for checking Menu's `open` property
    // and synchronizing it with `menuOpen` if Menu didn't close itself on `document`
    // click and when focus is lost.
    //
    // Thus an observer. Which only assumes that `open` is reflected and doesn't
    // depend on knowledge of Menu's internals.
    const observer = new MutationObserver(() => {
      if (this.#menuElementRef.value) {
        this.menuOpen = this.#menuElementRef.value.open;
      }
    });

    ow(this.#menuElementRef.value, ow.object.instanceOf(GlideCoreMenu));

    observer.observe(this.#menuElementRef.value, {
      attributes: true,
      attributeFilter: ['open'],
    });
  }

  override focus(
    options?: FocusOptions & {
      target: 'menu-button';
    },
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { target: _, ...targetlessOptions } = options ?? {};

    if (options?.target === 'menu-button') {
      this.#menuButtonElementRef.value?.focus(targetlessOptions);
    } else {
      this.primaryActionElement?.focus(targetlessOptions);
    }
  }

  private get primaryActionElement() {
    const element = this.#primaryActionElementRef.value?.assignedNodes().at(0);

    if (
      element instanceof GlideCoreSplitButtonContainerButton ||
      element instanceof GlideCoreSplitButtonContainerLink
    ) {
      return element;
    }
  }

  override render() {
    return html`
      <div
        class=${classMap({
          component: true,
          disabled: this.disabled,
        })}
      >
        <slot
          data-test="primary-action"
          name="primary-action"
          @slotchange=${this.#onPrimaryActionSlotChange}
          ${ref(this.#primaryActionElementRef)}
        ></slot>

        <div
          class=${classMap({
            divider: true,
            disabled: this.disabled,
            [this.variant]: true,
          })}
        ></div>

        <glide-core-menu
          placement=${this.menuPlacement}
          size=${this.size}
          ?open=${this.menuOpen}
          ${ref(this.#menuElementRef)}
        >
          <button
            aria-label=${this.menuLabel}
            class=${classMap({
              'menu-button': true,
              [this.variant]: true,
              [this.size]: true,
            })}
            data-test="menu-button"
            slot="target"
            type="button"
            ?disabled=${this.disabled}
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

          <glide-core-menu-options>
            <slot
              @slotchange=${this.#onDefaultSlotChange}
              ${ref(this.#defaultSlotElementRef)}
            ></slot>
          </glide-core-menu-options>
        </glide-core-menu>
      </div>
    `;
  }

  #defaultSlotElementRef = createRef<HTMLSlotElement>();

  #isDisabled = false;

  #menuButtonElementRef = createRef<HTMLButtonElement>();

  #menuElementRef = createRef<GlideCoreMenu>();

  #primaryActionElementRef = createRef<HTMLSlotElement>();

  #size: 'large' | 'small' = 'large';

  #variant: 'primary' | 'secondary' = 'primary';

  #onDefaultSlotChange() {
    owSlot(this.#defaultSlotElementRef.value);

    owSlotType(this.#defaultSlotElementRef.value, [
      GlideCoreMenuButton,
      GlideCoreMenuLink,
    ]);
  }

  #onPrimaryActionSlotChange() {
    owSlot(this.#primaryActionElementRef.value);

    owSlotType(this.#primaryActionElementRef.value, [
      GlideCoreSplitButtonContainerButton,
      GlideCoreSplitButtonContainerLink,
    ]);

    if (this.primaryActionElement) {
      this.primaryActionElement.privateDisabled = this.disabled;
      this.primaryActionElement.privateVariant = this.variant;
      this.primaryActionElement.privateSize = this.size;
    }
  }
}
