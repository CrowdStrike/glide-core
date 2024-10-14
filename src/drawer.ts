import { LitElement, html, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property } from 'lit/decorators.js';
import { owSlot } from './library/ow.js';
import styles from './drawer.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-drawer': GlideCoreDrawer;
  }
}

/**
 *
 * @cssprop [--width] - The width the drawer.
 *
 * @event close
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

  @property({ reflect: true, type: Boolean })
  get open() {
    return this.#open;
  }

  set open(isOpen: boolean) {
    this.#open = isOpen;

    if (isOpen) {
      this.#asideElementRef?.value?.addEventListener(
        'transitionend',
        () => {
          this.#asideElementRef?.value?.classList?.remove('close');

          // We set `tabindex="-1"` and call focus directly based on
          // https://www.matuzo.at/blog/2023/focus-dialog/
          // which came from https://adrianroselli.com/2020/10/dialog-focus-in-screen-readers.html
          this.#asideElementRef?.value?.focus();

          this.dispatchEvent(new Event('toggle', { bubbles: true }));
        },
        { once: true },
      );

      // TODO - say why
      // Seems needed for some reason when `open` is set on initial render
      // Otherwise, it won't open.
      setTimeout(() => {
        this.#asideElementRef?.value?.classList?.add('open');
      });

      return;
    }

    this.#asideElementRef?.value?.addEventListener(
      'transitionend',
      () => {
        this.#asideElementRef?.value?.classList?.remove('open');
        this.#asideElementRef?.value?.classList?.remove('close');

        this.dispatchEvent(new Event('close', { bubbles: true }));
      },
      { once: true },
    );

    this.#asideElementRef?.value?.classList?.add('close');
  }

  @property({ type: Boolean })
  pinned = false;

  close() {
    this.open = false;
  }

  override firstUpdated() {
    owSlot(this.#defaultSlotElementRef.value);
  }

  override render() {
    return html`
      <aside
        class=${classMap({ component: true, pinned: this.pinned })}
        tabindex="-1"
        data-test-state=${this.#open ? 'open' : 'closed'}
        @keydown=${this.#onKeydown}
        ${ref(this.#asideElementRef)}
        aria-label=${this.label || nothing}
      >
        <slot
          @slotchange=${this.#onSlotChange}
          ${ref(this.#defaultSlotElementRef)}
        ></slot>
      </aside>
    `;
  }

  show() {
    this.open = true;
  }

  #asideElementRef = createRef<HTMLElement>();

  #defaultSlotElementRef = createRef<HTMLSlotElement>();

  #open = false;

  #onKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.open = false;
    }
  }

  #onSlotChange() {
    owSlot(this.#defaultSlotElementRef.value);
  }
}
