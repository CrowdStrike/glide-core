import './icon-button.js';
import { LitElement, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import styles from './modal.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'cs-modal': CsModal;
  }
}

/**
 * @description A custom-built Modal.
 *
 * @event close - Emitted when the Modal closes.
 *
 * @function showModal - A method on the `cs-modal` component to open the Modal programmatically.
 *
 * @function close - A method on the `cs-modal` component to close the Modal programmatically.
 *
 * @slot - The content of the modal.
 *
 * @slot header-actions - A slot for placing additional header actions. These are co-located with the close button.
 *                        Use the `cs-modal-icon-button` component only.
 *
 * @slot primary - A slot for rendering a primary action button. Normally a "Continue", "Next", or "Submit" action.
 *
 * @slot secondary - A slot for rendering a secondary action button. Normally a "Cancel" action.
 *
 * @slot tertiary - A slot for rendering an icon+tooltip for additional information,
 *                  or a tertiary action button.
 */
@customElement('cs-modal')
export default class CsModal extends LitElement {
  /** The title text for the Modal. */
  @property({ type: String, reflect: true }) label = '';

  /** Adds a back/dismiss button in the Modal header. */
  @property({ attribute: 'show-back-button', type: Boolean, reflect: true })
  showBackButton = false;

  /** Fixed-width options for the Modal. */
  @property({ type: String, reflect: true })
  width?: 'sm' | 'md' | 'lg' | 'xl' = 'md';

  #componentRef = createRef<HTMLDialogElement>();

  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: window.navigator.webdriver ? 'open' : 'closed',
  };

  static override styles = styles;

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    document.documentElement.classList.remove('glide-lock-scroll');

    if (this.#componentRef.value?.open) {
      this.#componentRef.value?.close();
    }
  }

  /**
   * Method called by consumers to open the Modal.
   */
  showModal() {
    if (this.#componentRef.value?.open) {
      return;
    }

    document.documentElement.classList.add('glide-lock-scroll');

    // If the body has scrollbars enabled, when the dialog is opened, those scrollbars
    // are removed as we don't want consumers to scroll the body content when the dialog is open.
    // This is accomplished with adding the `glide-lock-scroll` class above.
    // However, this is a bit problematic, because when the scrollbars are suddenly removed,
    // if you have scrollbars set to always display (or are on Windows), you'll notice layout shift.
    // To combat this, we leverage the CSS property `scrollbar-gutter`. This is great when it is supported.
    // For browsers that don't support this feature quite yet (Safari), we calculate the width of the scrollbar and
    // set it to this CSS variable, which gets applied in the CSS of `glide-lock-scroll`.
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
    this.#componentRef.value?.showModal();

    // We set `tabindex="-1"` and call focus directly based on
    // https://www.matuzo.at/blog/2023/focus-dialog/
    // which came from https://adrianroselli.com/2020/10/dialog-focus-in-screen-readers.html
    // This ensures our dialog is as accessible as possible and does the right behavior
    // for screenreaders.
    this.#componentRef.value?.focus();
  }

  /**
   * Event called by consumers to programmatically close the Modal.
   */
  close() {
    if (!this.#componentRef.value?.open) {
      return;
    }

    document.documentElement.classList.remove('glide-lock-scroll');
    this.dispatchEvent(new Event('close', { bubbles: false }));
    this.#componentRef.value?.close();
  }

  #handleMouseDown(event: MouseEvent) {
    if (event.target !== this.#componentRef.value) {
      return;
    }

    // There's a case where if the dialog has padding (like ours does), clicking
    // in the padding area will not be considered "inside" of the dialog
    // and will force a close. This behavior is not ideal at all.
    // This logic verifies that only clicking  *outside* of the dialog
    // (normally on the backdrop) closes the dialog.
    const dialogBoundingRect =
      this.#componentRef.value?.getBoundingClientRect();

    if (!dialogBoundingRect) {
      return;
    }

    const isClickInsideDialog =
      dialogBoundingRect.top <= event.clientY &&
      event.clientY <= dialogBoundingRect.top + dialogBoundingRect.height &&
      dialogBoundingRect.left <= event.clientX &&
      event.clientX <= dialogBoundingRect.left + dialogBoundingRect.width;

    if (isClickInsideDialog) {
      return;
    }

    document.documentElement.classList.remove('glide-lock-scroll');
    this.dispatchEvent(new Event('close', { bubbles: false }));
    this.#componentRef.value?.close();
  }

  #handleCloseButtonClick() {
    document.documentElement.classList.remove('glide-lock-scroll');
    this.dispatchEvent(new Event('close', { bubbles: false }));
    this.#componentRef.value?.close();
  }

  #handleKeyDown(event: KeyboardEvent) {
    if (event.key !== 'Escape') {
      return;
    }

    document.documentElement.classList.remove('glide-lock-scroll');
    this.dispatchEvent(new Event('close', { bubbles: false }));
    this.#componentRef.value?.close();
  }

  override render() {
    return html`<dialog
      class=${classMap({
        component: true,
        'width--sm': this.width === 'sm',
        'width--md': this.width === 'md',
        'width--lg': this.width === 'lg',
        'width--xl': this.width === 'xl',
      })}
      tabindex="-1"
      @keydown=${this.#handleKeyDown}
      @mousedown=${this.#handleMouseDown}
      ${ref(this.#componentRef)}
    >
      <header class="header">
        <h2 class="label" data-test="heading" id="heading">
          ${when(
            this.showBackButton,
            () =>
              html` <cs-modal-icon-button
                data-test="back-button"
                @click=${this.#handleCloseButtonClick}
              >
                <!-- icon-arrows-flip-backward-line -->
              </cs-modal-icon-button>`,
          )}
          ${this.label}
        </h2>

        <div class="header-actions" role="toolbar">
          <slot name="header-actions"></slot>

          <cs-modal-icon-button
            data-test="close-button"
            @click=${this.#handleCloseButtonClick}
          >
            <!-- TODO: We should localize this string in the future -->
            <!-- icon-general-x-close-line -->
          </cs-modal-icon-button>
        </div>
      </header>

      <article
        aria-labelledby="heading"
        class="body"
        role="region"
        tabindex="0"
      >
        <slot></slot>
      </article>

      <footer class="footer">
        <menu class="menu">
          <li class="flex align-center"><slot name="tertiary"></slot></li>
          <li>
            <menu class="actions">
              <li><slot name="secondary"></slot></li>
              <li><slot name="primary"></slot></li>
            </menu>
          </li>
        </menu>
      </footer>
    </dialog>`;
  }
}
