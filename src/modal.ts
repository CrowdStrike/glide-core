import './modal.icon-button.js';
import { LitElement, html } from 'lit';
import { LocalizeController } from './library/localize.js';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import GlideCoreButton from './button.js';
import GlideCoreModalIconButton from './modal.icon-button.js';
import GlideCoreModalTertiaryIcon from './modal.tertiary-icon.js';
import ow, { owSlot, owSlotType } from './library/ow.js';
import styles from './modal.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-modal': GlideCoreModal;
  }
}

const globalStylesheet = new CSSStyleSheet();

/*
  A few notes on these styles:

  - Modal's need a way to lock the body from scrolling.
    !important ensures we don't hit specificity issues.

  - For Modal, we need to take into account the fact that
    users may have scrollbars enabled via their OS. When
    scrollbars are enabled, we need to account for the
    offset that occurs with the <dialog element. When
    a <dialog is opened, the background content shifts if
    the main content area has scrollbars enabled because
    they get *removed* when the <dialog is opened.
    To combat this, we use `scrollbar-gutter` with a fallback.
    For browsers that don't support it yet, we use padding
    and a runtime calculation to ensure the content doesn't shift.

  Safari appears to be the only browser without this enabeld at
  the moment https://caniuse.com/mdn-css_properties_scrollbar-gutter
*/

globalStylesheet.insertRule(`
  @supports (scrollbar-gutter: stable) {
    .private-glide-core-modal-lock-scroll {
      scrollbar-gutter: stable !important;
      overflow: hidden !important;
    }
  }
`);

globalStylesheet.insertRule(`
  @supports not (scrollbar-gutter: stable) {
    .private-glide-core-modal-lock-scroll {
      padding-right: var(--glide-scroll-size, 0.9375rem) !important;
      overflow: hidden !important;
    }
  }
`);

/**
 * @event close - `(event: "close", handler: (event: Event) => void): void`
 *
 * @slot - The content of the modal.
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

  @property({ reflect: true })
  label = '';

  @property({ attribute: 'back-button', type: Boolean, reflect: true })
  backButton = false;

  @property({ reflect: true })
  size?: 'small' | 'medium' | 'large' | 'xlarge' = 'medium';

  close() {
    if (!this.#componentElementRef.value?.open) {
      return;
    }

    document.documentElement.classList.remove(
      'private-glide-core-modal-lock-scroll',
    );

    this.dispatchEvent(new Event('close'));
    this.#componentElementRef.value?.close();
  }

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
      tabindex="-1"
      @keydown=${this.#onKeyDown}
      @mousedown=${this.#onMousedown}
      ${ref(this.#componentElementRef)}
    >
      <header class="header">
        <h2 class="label" data-test="heading" id="heading">
          ${when(
            this.backButton,
            () =>
              html`<glide-core-modal-icon-button
                class="back-button"
                data-test="back-button"
                @click=${this.#onCloseButtonClick}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <title>${this.#localize.term('dismiss')}</title>
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
            class="close-button"
            data-test="close-button"
            @click=${this.#onCloseButtonClick}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <title>${this.#localize.term('close')}</title>
              <path
                d="M6 6L18 18"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M18 6L6 18"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </glide-core-modal-icon-button>
        </div>
      </header>

      <article
        aria-labelledby="heading"
        class="body"
        role="region"
        tabindex="0"
      >
        <slot
          @slotchange=${this.#onDefaultSlotChange}
          ${ref(this.#defaultSlotElementRef)}
        ></slot>
      </article>

      <footer class="footer">
        <menu class="menu">
          <li class="flex align-center">
            <slot
              name="tertiary"
              @slotchange=${this.#onFooterMenuTertiarySlotChange}
              ${ref(this.#footerMenuTertiarySlotElementRef)}
            ></slot>
          </li>
          <li>
            <menu class="actions">
              <li>
                <slot
                  name="secondary"
                  @slotchange=${this.#onFooterMenuSecondarySlotChange}
                  ${ref(this.#footerMenuSecondarySlotElementRef)}
                ></slot>
              </li>
              <li>
                <slot
                  name="primary"
                  @slotchange=${this.#onFooterMenuPrimarySlotChange}
                  ${ref(this.#footerMenuPrimarySlotElementRef)}
                ></slot>
              </li>
            </menu>
          </li>
        </menu>
      </footer>
    </dialog>`;
  }

  /**
   * Method called by consumers to open the Modal.
   */
  showModal() {
    if (this.#componentElementRef.value?.open) {
      return;
    }

    document.documentElement.classList.add(
      'private-glide-core-modal-lock-scroll',
    );

    // If the body has scrollbars enabled, when the dialog is opened, those scrollbars
    // are removed as we don't want consumers to scroll the body content when the dialog is open.
    // This is accomplished with adding the `private-glide-core-modal-lock-scroll` class above.
    // However, this is a bit problematic, because when the scrollbars are suddenly removed,
    // if you have scrollbars set to always display (or are on Windows), you'll notice layout shift.
    // To combat this, we leverage the CSS property `scrollbar-gutter`. This is great when it is supported.
    // For browsers that don't support this feature quite yet (Safari), we calculate the width of the scrollbar and
    // set it to this CSS variable, which gets applied in the CSS of `private-glide-core-modal-lock-scroll`.
    // https://caniuse.com/mdn-css_properties_scrollbar-gutter
    if (!window.CSS.supports('scrollbar-gutter', 'stable')) {
      const gutterSize = Math.abs(
        window.innerWidth - document.documentElement.clientWidth,
      );

      document.documentElement.style.setProperty(
        '--glide-scroll-size',
        `${gutterSize}px`,
      );
    }

    // Setting the `open` attribute is not enough, as you don't get the backdrop.
    // For the backdrop to render, you must call the "showModal" method directly.
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog#open
    this.#componentElementRef.value?.showModal();

    // We set `tabindex="-1"` and call focus directly based on
    // https://www.matuzo.at/blog/2023/focus-dialog/
    // which came from https://adrianroselli.com/2020/10/dialog-focus-in-screen-readers.html
    // This ensures our dialog is as accessible as possible and does the right behavior
    // for screenreaders.
    this.#componentElementRef.value?.focus();
  }

  #componentElementRef = createRef<HTMLDialogElement>();

  #defaultSlotElementRef = createRef<HTMLSlotElement>();

  #footerMenuPrimarySlotElementRef = createRef<HTMLSlotElement>();

  #footerMenuSecondarySlotElementRef = createRef<HTMLSlotElement>();

  #footerMenuTertiarySlotElementRef = createRef<HTMLSlotElement>();

  #headerActionsSlotElementRef = createRef<HTMLSlotElement>();

  #localize = new LocalizeController(this);

  #onCloseButtonClick() {
    document.documentElement.classList.remove(
      'private-glide-core-modal-lock-scroll',
    );

    this.dispatchEvent(new Event('close'));
    this.#componentElementRef.value?.close();
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

  #onKeyDown(event: KeyboardEvent) {
    if (event.key !== 'Escape') {
      return;
    }

    // Prevent Safari from leaving full screen.
    event.preventDefault();

    document.documentElement.classList.remove(
      'private-glide-core-modal-lock-scroll',
    );

    this.dispatchEvent(new Event('close'));
    this.#componentElementRef.value?.close();
  }

  #onMousedown(event: MouseEvent) {
    if (event.target !== this.#componentElementRef.value) {
      return;
    }

    // There's a case where if the dialog has padding (like ours does), clicking
    // in the padding area will not be considered "inside" of the dialog
    // and will force a close. This behavior is not ideal at all.
    // This logic verifies that only clicking  *outside* of the dialog
    // (normally on the backdrop) closes the dialog.
    const dialogBoundingRect =
      this.#componentElementRef.value?.getBoundingClientRect();

    if (dialogBoundingRect) {
      const isClickInsideDialog =
        dialogBoundingRect.top <= event.clientY &&
        event.clientY <= dialogBoundingRect.top + dialogBoundingRect.height &&
        dialogBoundingRect.left <= event.clientX &&
        event.clientX <= dialogBoundingRect.left + dialogBoundingRect.width;

      if (!isClickInsideDialog) {
        document.documentElement.classList.remove(
          'private-glide-core-modal-lock-scroll',
        );

        this.dispatchEvent(new Event('close'));
        this.#componentElementRef.value?.close();
      }
    }
  }
}
