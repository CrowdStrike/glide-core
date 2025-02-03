import { html, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { when } from 'lit/directives/when.js';
import packageJson from '../package.json' with { type: 'json' };
import { LocalizeController } from './library/localize.js';
import GlideCoreModalIconButton from './modal.icon-button.js';
import GlideCoreButton from './button.js';
import GlideCoreTooltip from './tooltip.js';
import styles from './modal.styles.js';
import xIcon from './icons/x.js';
import assertSlot from './library/assert-slot.js';
import shadowRootMode from './library/shadow-root-mode.js';
import severityInformationalIcon from './icons/severity-informational.js';
import severityMediumIcon from './icons/severity-medium.js';
import severityCriticalIcon from './icons/severity-critical.js';
import final from './library/final.js';

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
 * @slot tertiary - One or more of `<glide-core-button>` or `<glide-core-tooltip>`.
 */
@customElement('glide-core-modal')
@final
export default class GlideCoreModal extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: shadowRootMode,
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
  severity?: keyof typeof severityIcons;

  @property({ reflect: true })
  size?: 'small' | 'medium' | 'large' | 'xlarge' = 'medium';

  @property({ reflect: true })
  readonly version = packageJson.version;

  override connectedCallback() {
    super.connectedCallback();

    const isAdopted = document.adoptedStyleSheets.includes(globalStylesheet);

    if (!isAdopted) {
      document.adoptedStyleSheets.push(globalStylesheet);
    }

    // 1. The consumer has a click handler on a button.
    // 2. The user clicks the button.
    // 3. The button's click handler is called and sets `this.open` to `true`.
    // 4. The "click" event bubbles up and is handled by `#onDocumentClick`.
    // 5. That handler sets `open` to `false` because the click came from outside Modal.
    // 6. Modal is opened then closed in the same frame and so never opens.
    //
    // `capture` ensures `#onDocumentClick` is called before #3, so the button click
    // handler setting `open` to `true` isn't overwritten by this handler setting `open`
    // to `false`.
    document.addEventListener('click', this.#onDocumentClick, {
      capture: true,
    });
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

    document.removeEventListener('click', this.#onDocumentClick, {
      capture: true,
    });
  }

  override firstUpdated() {
    if (this.open) {
      this.#show();
    }

    // Modals's "click" handler on `document` listens for clicks in the capture
    // phase. There's a comment explaining why. `#isContainerClick` must be set
    // by this handler before that handler is called. That handler will be called
    // first because events travel down instead of up the `document` during their
    // capture phase. But this "click" handler, because it listens in the capture
    // phase, will be called in the same frame. So the `document` handler checks
    // `#isContainerClick` after a timeout to give this handler a chance to be called.
    //
    // In short, we have to listen in the capture phase here because the `document`
    // listener listens in the capture phase.
    this.#containerElementRef.value?.addEventListener(
      'click',
      this.#onContainerClick,
      { capture: true },
    );

    // For the case where the user accidentally mouses down on the Modal's backdrop,
    // then moves the mouse inside Modal before mousing up. Without this handler, Modal
    // would close instead of remaining open. The reason it's needed in addition to
    // the "click" handler is because programmatic clicks don't generate "mousedown"
    // events. And we ran into a case where a consumer was calling `click()` on an
    // element inside Modal, inadvertently closing it. Otherwise, this event handler
    // would suffice.
    this.#containerElementRef.value?.addEventListener(
      'mouseup',
      this.#onContainerMousedown,
    );
  }

  // The contents `<dialog>` are wrapped in a `<div>` so we can separate backdrop clicks
  // from non-backdrop ones. We add "click" listeners to the `<div>` and the `document`.
  // The former listener sets a boolean that the latter has a condition for. If the boolean
  // is `false`, then we know the click came from the backdrop. That's also why the padding
  // is on the `<div>`, so padding clicks come from inside it and Modal remains open.
  override render() {
    return html`<dialog
      class="component"
      data-test="component"
      @keydown=${this.#onComponentKeyDown}
      ${ref(this.#componentElementRef)}
    >
      <div
        class=${classMap({
          container: true,
          small: this.size === 'small',
          medium: this.size === 'medium',
          large: this.size === 'large',
          xlarge: this.size === 'xlarge',
        })}
        ${ref(this.#containerElementRef)}
      >
        <header class="header">
          <h2 class="label" data-test="heading" id="heading">
            ${when(
              this.severity,
              () =>
                html`<span
                  class=${classMap({
                    severity: true,
                    critical: this.severity === 'critical',
                    informational: this.severity === 'informational',
                    medium: this.severity === 'medium',
                  })}
                  data-test="severity"
                  >${this.severity && severityIcons[this.severity]}</span
                >`,
            )}
            ${when(
              this.backButton && !this.severity,
              () =>
                html`<glide-core-modal-icon-button
                  class="back-button"
                  data-test="back-button"
                  label=${this.#localize.term('dismiss')}
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
              ${assertSlot([GlideCoreModalIconButton], true)}
              ${ref(this.#headerActionsSlotElementRef)}
            ></slot>

            <glide-core-modal-icon-button
              class="close-button"
              data-test="close-button"
              label=${this.#localize.term('close')}
              @click=${this.#onCloseButtonClick}
              ${ref(this.#closeButtonElementRef)}
            >
              ${xIcon}
            </glide-core-modal-icon-button>
          </div>
        </header>

        <article aria-labelledby="heading" class="body" role="region">
          <slot ${assertSlot()}></slot>
        </article>

        <footer>
          <menu class="actions">
            <li class="action">
              <slot
                class="tertiary-slot"
                name="tertiary"
                ${assertSlot([GlideCoreButton, GlideCoreTooltip], true)}
              ></slot>
            </li>

            <li class="action">
              <slot
                name="secondary"
                ${assertSlot([GlideCoreButton], true)}
              ></slot>
            </li>

            <li class="action">
              <slot
                name="primary"
                ${assertSlot([GlideCoreButton], true)}
              ></slot>
            </li>
          </menu>
        </footer>
      </div>
    </dialog>`;
  }

  #backButtonElementRef = createRef<GlideCoreModalIconButton>();

  #closeButtonElementRef = createRef<GlideCoreModalIconButton>();

  #componentElementRef = createRef<HTMLDialogElement>();

  #containerElementRef = createRef<HTMLElement>();

  #headerActionsSlotElementRef = createRef<HTMLSlotElement>();

  #isContainerClick = false;

  #isOpen = false;

  #localize = new LocalizeController(this);

  // An arrow function field instead of a method so `this` is closed over and
  // set to the component instead of `document`.
  #onContainerClick = () => {
    this.#isContainerClick = true;
  };

  #onContainerMousedown = () => {
    this.#isContainerClick = true;
  };

  // An arrow function field instead of a method so `this` is closed over and
  // set to the component instead of `document`.
  #onDocumentClick = () => {
    const isOpen = this.open;

    // There's a comment in `firstUpdated()` explaining the timeout.
    setTimeout(() => {
      if (this.#isContainerClick) {
        this.#isContainerClick = false;
        // The click may be a result of the user clicking a button to open Modal.
        // If so then `this.open` will have been set to `true` in the frame between
        // when this handler was called and this timeout. And we don't want to
        // immediately close Modal after the user has opened it. So we only close
        // Modal if the state of `this.open` hasn't changed.
      } else if (isOpen === this.open) {
        this.open = false;
      }
    });
  };

  #hide() {
    document.documentElement.classList.remove(
      'private-glide-core-modal-lock-scroll',
    );

    this.#componentElementRef.value?.close();
  }

  #onCloseButtonClick() {
    this.open = false;
  }

  #onComponentKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.open = false;

      // Prevent Safari from leaving full screen.
      event.preventDefault();
    }
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

const severityIcons = {
  informational: severityInformationalIcon,
  medium: severityMediumIcon,
  critical: severityCriticalIcon,
};
