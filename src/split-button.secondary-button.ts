import './menu.options.js';
import { html, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import packageJson from '../package.json' with { type: 'json' };
import GlideCoreMenu from './menu.js';
import GlideCoreMenuButton from './menu.button.js';
import GlideCoreMenuLink from './menu.link.js';
import chevronIcon from './icons/chevron.js';
import ow, { owSlot, owSlotType } from './library/ow.js';
import styles from './split-button.secondary-button.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-split-button-secondary-button': GlideCoreSplitButtonSecondaryButton;
  }
}

/**
 * @slot - One or more of `<glide-core-menu-button>` or `<glide-core-menu-link>`.
 */
@customElement('glide-core-split-button-secondary-button')
export default class GlideCoreSplitButtonSecondaryButton extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
    mode: 'closed',
  };

  static override styles = styles;

  @property({ reflect: true, type: Boolean })
  disabled = false;

  @property({ reflect: true })
  label?: string;

  @property({ attribute: 'menu-open', reflect: true, type: Boolean })
  menuOpen = false;

  @property({ attribute: 'menu-placement', reflect: true })
  menuPlacement: 'bottom-end' | 'top-end' = 'bottom-end';

  @state()
  privateActive = false;

  @state()
  privateSize: 'large' | 'small' = 'large';

  @state()
  privateVariant: 'primary' | 'secondary' = 'primary';

  @property({ reflect: true })
  readonly version = packageJson.version;

  override click() {
    this.#buttonElementRef.value?.click();
  }

  override firstUpdated() {
    owSlot(this.#defaultSlotElementRef.value);

    owSlotType(this.#defaultSlotElementRef.value, [
      GlideCoreMenuButton,
      GlideCoreMenuLink,
    ]);

    // A "click" handler on Menu would suffice for checking Menu's `open` property
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

  override render() {
    return html`
      <glide-core-menu
        placement=${this.menuPlacement}
        size=${this.privateSize}
        ?open=${this.menuOpen}
        ${ref(this.#menuElementRef)}
      >
        <button
          aria-label=${ifDefined(this.label)}
          class=${classMap({
            component: true,
            active: this.menuOpen,
            disabled: this.disabled,
            [this.privateVariant]: true,
            [this.privateSize]: true,
          })}
          data-test="button"
          slot="target"
          type="button"
          ?disabled=${this.disabled}
          ${ref(this.#buttonElementRef)}
        >
          ${chevronIcon}
        </button>

        <glide-core-menu-options>
          <slot
            @slotchange=${this.#onDefaultSlotChange}
            ${ref(this.#defaultSlotElementRef)}
          ></slot>
        </glide-core-menu-options>
      </glide-core-menu>
    `;
  }

  #buttonElementRef = createRef<HTMLButtonElement>();

  #defaultSlotElementRef = createRef<HTMLSlotElement>();

  #menuElementRef = createRef<GlideCoreMenu>();

  #onDefaultSlotChange() {
    owSlot(this.#defaultSlotElementRef.value);

    owSlotType(this.#defaultSlotElementRef.value, [
      GlideCoreMenuButton,
      GlideCoreMenuLink,
    ]);
  }
}
