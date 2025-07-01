import { html, LitElement } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property } from 'lit/decorators.js';
import packageJson from '../package.json' with { type: 'json' };
import Menu from './menu.js';
import Options from './options.js';
import Option from './option.js';
import styles from './select.styles.js';
import shadowRootMode from './library/shadow-root-mode.js';
import final from './library/final.js';
import required from './library/required.js';

// TODO: handle disabled on target when Select is disabled
// TODO: what to do about Select not supporting label component

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-select': Select;
  }
}

/**
 * @attr {string} label
 * @attr {boolean} [disabled=false]
 * @attr {boolean} [loading=false]
 * @attr {string} [name='']
 * @attr {number} [offset=4]
 * @attr {boolean} [open=false]
 * @attr {'bottom'|'left'|'right'|'top'|'bottom-start'|'bottom-end'|'left-start'|'left-end'|'right-start'|'right-end'|'top-start'|'top-end'} [placement='bottom-start']
 * @attr {string[]} [value=[]]
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {Element}
 * @slot {Element} [target]
 *
 * @readonly
 * @prop {HTMLFormElement | null} form
 */
@customElement('glide-core-select')
@final
export default class Select extends LitElement {
  static formAssociated = true;

  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
    mode: shadowRootMode,
  };

  static override styles = styles;

  @property({ reflect: true })
  @required
  label?: string;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ reflect: true, type: Boolean })
  loading = false;

  @property({ reflect: true, useDefault: true })
  name = '';

  /**
   * @default 4
   */
  @property({ reflect: true, type: Number })
  get offset(): number {
    return (
      this.#offset ??
      Number.parseFloat(
        window
          .getComputedStyle(document.body)
          .getPropertyValue('--glide-core-spacing-base-xxs'),
      ) *
        Number.parseFloat(
          window.getComputedStyle(document.documentElement).fontSize,
        )
    );
  }

  set offset(offset: number) {
    this.#offset = offset;
  }

  @property({ type: Boolean, reflect: true })
  open = false;

  @property({ reflect: true, useDefault: true })
  placement:
    | 'bottom'
    | 'left'
    | 'right'
    | 'top'
    | 'bottom-start'
    | 'bottom-end'
    | 'left-start'
    | 'left-end'
    | 'right-start'
    | 'right-end'
    | 'top-start'
    | 'top-end' = 'bottom-start';

  @property({ type: Array })
  value: string[] = [];

  @property({ reflect: true })
  readonly version: string = packageJson.version;

  get form(): HTMLFormElement | null {
    return this.#internals.form;
  }

  override firstUpdated() {
    const options = this.querySelector('glide-core-options');

    if (options) {
      options.role = 'listbox';
    }
  }

  override render() {
    // TODO: say why
    /* eslint-disable lit-a11y/click-events-have-key-events */
    return html`<glide-core-menu
      offset=${this.offset}
      placement=${this.placement}
      ?loading=${this.loading}
      ?open=${this.open}
      @toggle=${this.#onMenuToggle}
      ${ref(this.#menuElementRef)}
    >
      <slot class="target-slot" name="target" slot="target">
        <!-- @type {Element} -->
      </slot>

      <slot
        @click=${this.#onDefaultSlotClick}
        ${ref(this.#defaultSlotElementRef)}
      >
        <!-- @type {Element} -->
      </slot>
    </glide-core-menu>`;
  }

  constructor() {
    super();
    this.#internals = this.attachInternals();
  }

  #defaultSlotElementRef = createRef<HTMLSlotElement>();

  #internals: ElementInternals;

  #menuElementRef = createRef<Menu>();

  #offset: number | undefined;

  get #optionElements() {
    if (this.#optionsElement) {
      return [...this.#optionsElement.children]?.filter(
        (element): element is Option => {
          return element instanceof Option;
        },
      );
    }
  }

  get #optionsElement() {
    const firstAssignedElement = this.#defaultSlotElementRef.value
      ?.assignedElements({ flatten: true })
      .at(0);

    return firstAssignedElement instanceof Options
      ? firstAssignedElement
      : null;
  }

  #onDefaultSlotClick(event: Event) {
    event.preventDefault();

    if (event.target instanceof Element) {
      if (this.#optionElements) {
        for (const option of this.#optionElements) {
          if (option.selected) {
            option.selected = false;
          }
        }
      }

      // TODO: say why find closest. svgs and other content?
      const option = event.target?.closest('glide-core-option');

      if (option) {
        option.selected = true;
        this.value = [option.value];
      }
    }
  }

  #onMenuToggle() {
    if (this.#menuElementRef.value) {
      this.open = this.#menuElementRef.value.open;
    }
  }
}
