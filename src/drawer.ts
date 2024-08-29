import { LitElement, html, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
import { owSlot } from './library/ow.js';
import styles from './drawer.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-drawer': GlideCoreDrawer;
  }
}

/**
 *
 * @description A drawer for arbitrary content.
 *
 * @cssprop [--width] - The width the drawer.
 *
 * @event close
 * @event open
 *
 * @slot - The content of the Drawer.
 */
@customElement('glide-core-drawer')
export default class GlideCoreDrawer extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: 'closed',
  };

  static override styles = styles;

  @property()
  label = '';

  @property({ type: Boolean })
  pinned = false;

  close() {
    if (this.currentState !== 'open') {
      return;
    }

    this.#asideElementRef?.value?.addEventListener(
      'transitionend',
      () => {
        this.isOpen = false;

        this.#asideElementRef?.value?.classList?.remove('open');
        this.#asideElementRef?.value?.classList?.remove('closing');

        this.currentState = 'closed';

        this.dispatchEvent(new Event('close', { bubbles: true }));
      },
      { once: true },
    );

    this.#asideElementRef?.value?.classList?.add('closing');

    this.currentState = 'closing';
  }

  override firstUpdated() {
    owSlot(this.#defaultSlotElementRef.value);
  }

  open() {
    if (this.currentState !== 'closed') {
      return;
    }

    this.#asideElementRef?.value?.addEventListener(
      'transitionend',
      () => {
        this.currentState = 'open';

        // We set `tabindex="-1"` and call focus directly based on
        // https://www.matuzo.at/blog/2023/focus-dialog/
        // which came from https://adrianroselli.com/2020/10/dialog-focus-in-screen-readers.html
        this.#asideElementRef?.value?.focus();

        this.dispatchEvent(new Event('open', { bubbles: true }));
      },
      { once: true },
    );

    this.#asideElementRef?.value?.classList?.add('open');

    this.currentState = 'opening';

    this.isOpen = true;
  }

  override render() {
    return html`
      <aside
        class=${classMap({ component: true, pinned: this.pinned })}
        tabindex="-1"
        data-test-state=${this.isOpen ? 'open' : 'closed'}
        @keydown=${this.#handleKeyDown}
        ${ref(this.#asideElementRef)}
        aria-label=${this.label || nothing}
      >
        <slot
          @slotchange=${this.#onDefaultSlotChange}
          ${ref(this.#defaultSlotElementRef)}
        ></slot>
      </aside>
    `;
  }

  @state()
  private currentState: 'opening' | 'closing' | 'open' | 'closed' = 'closed';

  @state()
  private isOpen = false;

  #asideElementRef = createRef<HTMLElement>();

  #defaultSlotElementRef = createRef<HTMLSlotElement>();

  #handleKeyDown(event: KeyboardEvent) {
    if (event.key !== 'Escape') {
      return;
    }

    this.close();
  }

  #onDefaultSlotChange() {
    owSlot(this.#defaultSlotElementRef.value);
  }
}
