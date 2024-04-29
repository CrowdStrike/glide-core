import { LitElement, html } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, state } from 'lit/decorators.js';
import styles from './drawer.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'cs-drawer': CsDrawer;
  }
}

/**
 * @cssprop [--cs-drawer-width] - Sets the width of the Drawer when open.
 *
 * @event close - Emitted when the Drawer closes.
 * @event open - Emitted when the Drawer opens.
 *
 * @method close - A method on the `cs-drawer` component to close the Drawer programmatically.
 * @method open - A method on the `cs-drawer` component to open the Drawer programmatically.
 *
 * @slot - The content of the Drawer.
 */
@customElement('cs-drawer')
export default class CsDrawer extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: 'closed',
  };

  static override styles = styles;

  close() {
    if (this.currentState !== 'open') {
      return;
    }

    this.#dialogRef?.value?.addEventListener(
      'transitionend',
      () => {
        this.isOpen = false;

        this.#dialogRef?.value?.classList?.remove('open');
        this.#dialogRef?.value?.classList?.remove('closing');

        this.currentState = 'closed';

        this.dispatchEvent(new Event('close', { bubbles: false }));

        document.documentElement.classList.remove('glide-lock-scroll');
      },
      { once: true },
    );

    this.#dialogRef?.value?.classList?.add('closing');
    document.documentElement.classList.add('glide-lock-scroll');

    this.currentState = 'closing';
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();

    if (document.documentElement.classList.contains('glide-lock-scroll')) {
      document.documentElement.classList.remove('glide-lock-scroll');
    }
  }

  open() {
    if (this.currentState !== 'closed') {
      return;
    }

    this.#dialogRef?.value?.addEventListener(
      'transitionend',
      () => {
        this.currentState = 'open';

        // We set `tabindex="-1"` and call focus directly based on
        // https://www.matuzo.at/blog/2023/focus-dialog/
        // which came from https://adrianroselli.com/2020/10/dialog-focus-in-screen-readers.html
        // This ensures our dialog behaves as expected for screenreaders.
        this.#dialogRef?.value?.focus();

        this.dispatchEvent(new Event('open', { bubbles: false }));

        document.documentElement.classList.remove('glide-lock-scroll');
      },
      { once: true },
    );

    this.#dialogRef?.value?.classList?.add('open');
    document.documentElement.classList.add('glide-lock-scroll');
    this.currentState = 'opening';

    this.isOpen = true;
  }

  override render() {
    return html`
      <dialog
        class="component"
        tabindex="-1"
        ?open=${this.isOpen}
        @keydown=${this.#handleKeyDown}
        ${ref(this.#dialogRef)}
      >
        <slot></slot>
      </dialog>
    `;
  }

  @state()
  private currentState: 'opening' | 'closing' | 'open' | 'closed' = 'closed';

  @state()
  private isOpen = false;

  #dialogRef = createRef<HTMLDialogElement>();

  #handleKeyDown(event: KeyboardEvent) {
    if (event.key !== 'Escape') {
      return;
    }

    this.close();
  }
}
