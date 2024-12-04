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

  @property({ type: Boolean })
  pinned = false;

  @property({ reflect: true, type: Boolean })
  get open() {
    return this.#isOpen;
  }

  set open(isOpen: boolean) {
    this.#isOpen = isOpen;

    if (this.#isOpen) {
      (async () => {
        await this.#animationClose?.finished;

        this.#asideElementRef?.value?.classList?.add('open');

        this.#animationOpen = this.#asideElementRef?.value?.animate(
          { transform: ['translateX(100%)', 'translateX(0)'] },
          {
            duration: 300,
            fill: 'forwards',
            easing: 'cubic-bezier(0.33, 1, 0.68, 1)',
          },
        );

        this.#asideElementRef?.value?.animate(
          {
            opacity: [0, 1],
          },
          {
            duration: 300,
            fill: 'forwards',
            easing: 'ease-in',
            composite: 'add',
          },
        );

        await this.#animationOpen?.finished;
        this.#asideElementRef?.value?.focus();
      })();
    } else {
      (async () => {
        await this.#animationOpen?.finished;

        this.#animationClose = this.#asideElementRef?.value?.animate(
          { transform: ['translateX(0)', 'translateX(100%)'] },
          {
            duration: 300,
            fill: 'forwards',
            easing: 'cubic-bezier(0.33, 1, 0.68, 1)',
          },
        );

        this.#asideElementRef?.value?.animate(
          {
            opacity: [1, 0],
          },
          {
            duration: 300,
            fill: 'forwards',
            composite: 'add',
          },
        );

        await this.#animationClose?.finished;
        this.#asideElementRef?.value?.classList?.remove('open');
        this.dispatchEvent(new Event('close', { bubbles: true }));
      })();
    }
  }

  close() {
    this.open = false;
  }

  override firstUpdated() {
    owSlot(this.#defaultSlotElementRef.value);

    if (this.#isOpen) {
      this.#asideElementRef?.value?.classList?.add('open');
    }
  }

  override render() {
    return html`
      <aside
        class=${classMap({ component: true, pinned: this.pinned })}
        tabindex="-1"
        data-test=${this.#isOpen ? 'open' : 'closed'}
        @keydown=${this.#onKeydown}
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

  show() {
    this.open = true;
  }

  #animationClose?: Animation;

  #animationOpen?: Animation;

  #asideElementRef = createRef<HTMLElement>();

  #defaultSlotElementRef = createRef<HTMLSlotElement>();

  #isOpen = false;

  #onDefaultSlotChange() {
    owSlot(this.#defaultSlotElementRef.value);
  }

  #onKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      // Prevent Safari from leaving full screen.
      event.preventDefault();

      this.close();
    }
  }
}
