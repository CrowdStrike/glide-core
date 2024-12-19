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

    const duration = window.matchMedia('(prefers-reduced-motion: reduce)')
      .matches
      ? 0
      : 300;

    if (this.#isOpen) {
      (async () => {
        this.#closeAnimation?.cancel();

        this.#asideElementRef?.value?.classList?.add('open');

        this.#openAnimation = this.#asideElementRef?.value?.animate(
          { transform: ['translateX(100%)', 'translateX(0)'] },
          {
            duration,
            fill: 'forwards',
            easing: 'cubic-bezier(0.33, 1, 0.68, 1)',
          },
        );

        this.#asideElementRef?.value?.animate(
          {
            opacity: [0, 1],
          },
          {
            duration,
            fill: 'forwards',
            easing: 'ease-in',
            composite: 'add',
          },
        );

        await this.#openAnimation?.finished;

        // We set `tabindex="-1"` and call focus directly based on
        // https://www.matuzo.at/blog/2023/focus-dialog/
        // which came from https://adrianroselli.com/2020/10/dialog-focus-in-screen-readers.html
        this.#asideElementRef?.value?.focus();
      })();
    } else {
      (async () => {
        this.#openAnimation?.cancel();

        this.#closeAnimation = this.#asideElementRef?.value?.animate(
          { transform: ['translateX(0)', 'translateX(100%)'] },
          {
            duration,
            fill: 'forwards',
            easing: 'cubic-bezier(0.33, 1, 0.68, 1)',
          },
        );

        this.#asideElementRef?.value?.animate(
          {
            opacity: [1, 0],
          },
          {
            duration,
            fill: 'forwards',
            composite: 'add',
          },
        );

        await this.#closeAnimation?.finished;
        this.#asideElementRef.value?.classList?.remove('open');
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

      // The open state of Drawer relies on styles for transform
      // and opacity. In this case, we don't want an animation to
      // play, but we do need those post-animation styles.
      // Rather than relying on a CSS class to apply the
      // transform and opacity changes, we use JavaScript animations
      // with the duration properties set to 0 so that they apply
      // immediately.
      this.#openAnimation = this.#asideElementRef?.value?.animate(
        { transform: 'translateX(0)' },
        {
          duration: 0,
          fill: 'forwards',
        },
      );

      this.#asideElementRef?.value?.animate(
        {
          opacity: 1,
        },
        {
          duration: 0,
          fill: 'forwards',
          composite: 'add',
        },
      );
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

  #asideElementRef = createRef<HTMLElement>();

  #closeAnimation?: Animation;

  #defaultSlotElementRef = createRef<HTMLSlotElement>();

  #isOpen = false;

  #openAnimation?: Animation;

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
