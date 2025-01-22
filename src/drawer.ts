import { html, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import packageJson from '../package.json' with { type: 'json' };
import styles from './drawer.styles.js';
import assertSlot from './library/assert-slot.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-drawer': GlideCoreDrawer;
  }
}

/**
 * @event toggle
 *
 * @cssprop [--width] - The width the drawer.
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

  @property({ reflect: true })
  label?: string;

  @property({ reflect: true, type: Boolean })
  pinned = false;

  @property({ reflect: true, type: Boolean })
  get open() {
    return this.#isOpen;
  }

  set open(isOpen: boolean) {
    const hasChanged = isOpen !== this.#isOpen;
    this.#isOpen = isOpen;

    const duration = window.matchMedia('(prefers-reduced-motion: reduce)')
      .matches
      ? 0
      : 300;

    if (this.#isOpen && hasChanged) {
      this.#closeAnimation?.cancel();

      this.#componentElementRef?.value?.classList?.add('open');

      this.#openAnimation = this.#componentElementRef?.value?.animate(
        { transform: ['translateX(100%)', 'translateX(0)'] },
        {
          duration,
          fill: 'forwards',
          easing: 'cubic-bezier(0.33, 1, 0.68, 1)',
        },
      );

      this.#componentElementRef?.value?.animate(
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

      this.#openAnimation?.finished.then(() => {
        // We set `tabindex="-1"` and call focus directly based on:
        // https://adrianroselli.com/2020/10/dialog-focus-in-screen-readers.html
        this.#componentElementRef?.value?.focus();

        this.dispatchEvent(
          new Event('toggle', { bubbles: true, composed: true }),
        );
      });
    } else if (hasChanged) {
      this.#openAnimation?.cancel();

      this.#closeAnimation = this.#componentElementRef?.value?.animate(
        { transform: ['translateX(0)', 'translateX(100%)'] },
        {
          duration,
          fill: 'forwards',
          easing: 'cubic-bezier(0.33, 1, 0.68, 1)',
        },
      );

      this.#componentElementRef?.value?.animate(
        {
          opacity: [1, 0],
        },
        {
          duration,
          fill: 'forwards',
          composite: 'add',
        },
      );

      this.#closeAnimation?.finished.then(() => {
        this.#componentElementRef.value?.classList?.remove('open');

        this.dispatchEvent(
          new Event('toggle', { bubbles: true, composed: true }),
        );
      });
    }
  }

  @property({ reflect: true })
  readonly version = packageJson.version;

  override firstUpdated() {
    if (this.#isOpen) {
      this.#componentElementRef?.value?.classList?.add('open');

      // The open state of Drawer relies on styles for transform
      // and opacity. In this case, we don't want an animation to
      // play, but we do need those post-animation styles.
      // Rather than relying on a CSS class to apply the
      // transform and opacity changes, we use JavaScript animations
      // with the duration properties set to 0 so that they apply
      // immediately.
      this.#openAnimation = this.#componentElementRef?.value?.animate(
        { transform: 'translateX(0)' },
        {
          duration: 0,
          fill: 'forwards',
        },
      );

      this.#componentElementRef?.value?.animate(
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
        aria-label=${ifDefined(this.label)}
        class=${classMap({ component: true, pinned: this.pinned })}
        data-test="component"
        tabindex="-1"
        @keydown=${this.#onComponentKeydown}
        ${ref(this.#componentElementRef)}
      >
        <slot ${assertSlot()} ${ref(this.#defaultSlotElementRef)}></slot>
      </aside>
    `;
  }

  #closeAnimation?: Animation;

  #componentElementRef = createRef<HTMLElement>();

  #defaultSlotElementRef = createRef<HTMLSlotElement>();

  #isOpen = false;

  #openAnimation?: Animation;

  #onComponentKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      // Prevent Safari from leaving full screen.
      event.preventDefault();

      this.open = false;
    }
  }
}
