import './modal.icon-button.js';
import { LitElement, html } from 'lit';
import { LocalizeController } from './library/localize.js';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { when } from 'lit/directives/when.js';
import GlideCoreButton from './button.js';
import GlideCoreModalIconButton from './modal.icon-button.js';
import GlideCoreModalTertiaryIcon from './modal.tertiary-icon.js';
import ow, { owSlot, owSlotType } from './library/ow.js';
import styles from './modal.styles.js';
import xIcon from './icons/x.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-modal': GlideCoreModal;
  }
}

const globalStylesheet = new CSSStyleSheet();

globalStylesheet.insertRule(`
  .private-glide-core-modal-lock-scroll {
    scrollbar-gutter: stable !important;
    overflow: hidden !important;
  }
`);

/**
 * @event toggle
 *
 * @slot - The primary content of the modal.
 * @slot header-actions - One or more of `<glide-core-modal-icon-button>`.
 * @slot primary - One of `<glide-core-button>`.
 * @slot secondary - One of `<glide-core-button>`.
 * @slot tertiary - One or more of `<glide-core-button>` or `<glide-core-modal-tertiary-icon>`.
 */
@customElement('glide-core-modal')
export default class GlideCoreModal extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: 'closed',
  };

  static override styles = styles;

  @property({ attribute: 'back-button', type: Boolean, reflect: true })
  backButton = false;

  @property({ reflect: true })
  label?: string;

  @property({ reflect: true, type: Boolean })
  get open() {
    return this.#isOpen;
  }

  set open(isOpen: boolean) {
    const hasChanged = isOpen !== this.#isOpen;

    this.#isOpen = isOpen;

    if (isOpen && hasChanged) {
      this.#show();

      this.dispatchEvent(
        new Event('toggle', { bubbles: true, composed: true }),
      );
    } else if (hasChanged) {
      this.#hide();

      this.dispatchEvent(
        new Event('toggle', { bubbles: true, composed: true }),
      );
    }
  }

  @property({ reflect: true })
  size?: 'small' | 'medium' | 'large' | 'xlarge' = 'medium';

  override connectedCallback() {
    super.connectedCallback();

    const isAdopted = document.adoptedStyleSheets.includes(globalStylesheet);

    if (!isAdopted) {
      document.adoptedStyleSheets.push(globalStylesheet);
    }
  }

  override disconnectedCallback() {
    super.disconnectedCallback();

    document.documentElement.classList.remove(
      'private-glide-core-modal-lock-scroll',
    );

    document.adoptedStyleSheets = document.adoptedStyleSheets.filter(
      (stylesheet) => {
        return stylesheet !== globalStylesheet;
      },
    );
  }

  override firstUpdated() {
    owSlot(this.#defaultSlotElementRef.value);

    owSlotType(this.#headerActionsSlotElementRef.value, [
      GlideCoreModalIconButton,
    ]);

    owSlotType(this.#footerMenuPrimarySlotElementRef.value, [GlideCoreButton]);

    owSlotType(this.#footerMenuSecondarySlotElementRef.value, [
      GlideCoreButton,
    ]);

    owSlotType(this.#footerMenuTertiarySlotElementRef.value, [
      GlideCoreModalTertiaryIcon,
      GlideCoreButton,
    ]);

    if (this.open) {
      this.#show();
    }
  }

  override render() {
    return html`<dialog
      class=${classMap({
        component: true,
        small: this.size === 'small',
        medium: this.size === 'medium',
        large: this.size === 'large',
        xlarge: this.size === 'xlarge',
      })}
      data-test="component"
      @keydown=${this.#onComponentKeyDown}
      @click=${this.#onComponentClick}
      ${ref(this.#componentElementRef)}
    >
      <header class="header">
        <h2 class="label" data-test="heading" id="heading">
          ${when(
            this.backButton,
            () =>
              html`<glide-core-modal-icon-button
                aria-label=${this.#localize.term('dismiss')}
                class="back-button"
                data-test="back-button"
                @click=${this.#onCloseButtonClick}
                ${ref(this.#backButtonElementRef)}
              >
                ${icons.back}
              </glide-core-modal-icon-button>`,
          )}
          ${this.label}
        </h2>

        <div class="header-actions" role="toolbar">
          <slot
            name="header-actions"
            @slotchange=${this.#onHeaderActionsSlotChange}
            ${ref(this.#headerActionsSlotElementRef)}
          ></slot>

          <glide-core-modal-icon-button
            aria-label=${this.#localize.term('close')}
            class="close-button"
            data-test="close-button"
            @click=${this.#onCloseButtonClick}
            ${ref(this.#closeButtonElementRef)}
          >
            ${xIcon}
          </glide-core-modal-icon-button>
        </div>
      </header>

      <article aria-labelledby="heading" class="body" role="region">
        <slot
          @slotchange=${this.#onDefaultSlotChange}
          ${ref(this.#defaultSlotElementRef)}
        ></slot>
      </article>

      <footer>
        <menu class="actions">
          <li class="action">
            <slot
              class="tertiary-slot"
              name="tertiary"
              @slotchange=${this.#onFooterMenuTertiarySlotChange}
              ${ref(this.#footerMenuTertiarySlotElementRef)}
            ></slot>
          </li>

          <li class="action">
            <slot
              name="secondary"
              @slotchange=${this.#onFooterMenuSecondarySlotChange}
              ${ref(this.#footerMenuSecondarySlotElementRef)}
            ></slot>
          </li>

          <li class="action">
            <slot
              name="primary"
              @slotchange=${this.#onFooterMenuPrimarySlotChange}
              ${ref(this.#footerMenuPrimarySlotElementRef)}
            ></slot>
          </li>
        </menu>
      </footer>
    </dialog>`;
  }

  #backButtonElementRef = createRef<GlideCoreModalIconButton>();

  #closeButtonElementRef = createRef<GlideCoreModalIconButton>();

  #componentElementRef = createRef<HTMLDialogElement>();

  #defaultSlotElementRef = createRef<HTMLSlotElement>();

  #footerMenuPrimarySlotElementRef = createRef<HTMLSlotElement>();

  #footerMenuSecondarySlotElementRef = createRef<HTMLSlotElement>();

  #footerMenuTertiarySlotElementRef = createRef<HTMLSlotElement>();

  #headerActionsSlotElementRef = createRef<HTMLSlotElement>();

  #isOpen = false;

  #localize = new LocalizeController(this);

  #hide() {
    document.documentElement.classList.remove(
      'private-glide-core-modal-lock-scroll',
    );

    this.#componentElementRef.value?.close();
  }

  #onCloseButtonClick() {
    this.open = false;
  }

  #onComponentClick(event: MouseEvent) {
    if (this.#componentElementRef.value) {
      const { height, width, top, left } =
        this.#componentElementRef.value.getBoundingClientRect();

      // https://stackoverflow.com/a/26984690
      const isClickInside =
        top <= event.clientY &&
        event.clientY <= top + height &&
        left <= event.clientX &&
        event.clientX <= left + width;

      if (!isClickInside) {
        this.open = false;
      }
    }
  }

  #onComponentKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.open = false;

      // Prevent Safari from leaving full screen.
      event.preventDefault();
    }
  }

  #onDefaultSlotChange() {
    ow(
      this.#componentElementRef.value,
      ow.object.instanceOf(HTMLDialogElement),
    );

    owSlot(this.#defaultSlotElementRef.value);
  }

  #onFooterMenuPrimarySlotChange() {
    owSlotType(this.#footerMenuPrimarySlotElementRef.value, [GlideCoreButton]);
  }

  #onFooterMenuSecondarySlotChange() {
    owSlotType(this.#footerMenuSecondarySlotElementRef.value, [
      GlideCoreButton,
    ]);
  }

  #onFooterMenuTertiarySlotChange() {
    ow(
      this.#componentElementRef.value,
      ow.object.instanceOf(HTMLDialogElement),
    );

    owSlotType(this.#footerMenuTertiarySlotElementRef.value, [
      GlideCoreModalTertiaryIcon,
      GlideCoreButton,
    ]);
  }

  #onHeaderActionsSlotChange() {
    owSlotType(this.#headerActionsSlotElementRef.value, [
      GlideCoreModalIconButton,
    ]);
  }

  #show() {
    document.documentElement.classList.add(
      'private-glide-core-modal-lock-scroll',
    );

    this.#componentElementRef.value?.showModal();
  }
}

const icons = {
  back: html`
    <svg
      style=${styleMap({
        height: '1.25rem',
        width: '1.25rem',
      })}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20V18ZM20 14.5C20 16.433 18.433 18 16.5 18V20C19.5376 20 22 17.5376 22 14.5H20ZM16.5 11C18.433 11 20 12.567 20 14.5H22C22 11.4624 19.5376 9 16.5 9V11ZM16.5 18H12V20H16.5V18ZM16.5 9H3V11H16.5V9Z"
        fill="currentColor"
      />
      <path
        d="M7 6L3 10L7 14"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  `,
};
