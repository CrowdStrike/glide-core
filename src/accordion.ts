import { html, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import packageJson from '../package.json' with { type: 'json' };
import chevronIcon from './icons/chevron.js';
import styles from './accordion.styles.js';
import assertSlot from './library/assert-slot.js';
import final from './library/final.js';
import required from './library/required.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-accordion': Accordion;
  }
}

/**
 * @attr {string} label
 * @attr {boolean} [open=false]
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {Element | string} - The content of the accordion
 * @slot {Element} [prefix-icon] - An icon before the label
 * @slot {Element} [suffix-icons] - Icons after the label
 *
 * @fires {Event} toggle
 */
@customElement('glide-core-accordion')
@final
export default class Accordion extends LitElement {
  /* v8 ignore start */
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
    mode: window.navigator.webdriver ? 'open' : 'closed',
  };
  /* v8 ignore stop */

  static override styles = styles;

  @property({ reflect: true })
  @required
  label?: string;

  /**
   * @default false
   */
  @property({ reflect: true, type: Boolean })
  get open(): boolean {
    return this.#isOpen;
  }

  set open(isOpen: boolean) {
    const hasChanged = isOpen !== this.#isOpen;
    this.#isOpen = isOpen;

    const isReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (isReducedMotion && hasChanged && this.#detailsElementRef.value) {
      this.#detailsElementRef.value.open = isOpen;

      this.dispatchEvent(
        new Event('toggle', { bubbles: true, composed: true }),
      );

      return;
    }

    if (isOpen && hasChanged) {
      // Used in a conditional below to avoid dispatching a "toggle" event on first
      // render when Accordion is open initially.
      const hasUpdated = this.hasUpdated;

      // Wait for `.summary` to re-render after the "active" class addition to
      // prevent animation jank, especially in Firefox and Safari.
      this.updateComplete.then(() => {
        if (
          this.#detailsElementRef.value &&
          this.#defaultSlotElementRef.value
        ) {
          const bottomPadding = Number.parseFloat(
            getComputedStyle(this.#defaultSlotElementRef.value)?.paddingBottom,
          );

          this.#detailsElementRef.value.open = true;

          this.#defaultSlotElementRef.value
            .animate(
              {
                height: [
                  '0px',
                  `${
                    this.#defaultSlotElementRef.value.offsetHeight -
                    bottomPadding
                  }px`,
                ],
                opacity: [0, 1],
              },
              {
                duration: Number(
                  getComputedStyle(this.#defaultSlotElementRef.value)
                    .getPropertyValue('--private-open-duration')
                    .replace('ms', ''),
                ),
                easing: getComputedStyle(
                  this.#defaultSlotElementRef.value,
                ).getPropertyValue('--private-easing'),
              },
            )
            .addEventListener('finish', () => {
              if (this.#detailsElementRef.value && hasUpdated) {
                this.dispatchEvent(
                  new Event('toggle', { bubbles: true, composed: true }),
                );
              }
            });
        }
      });
    } else if (hasChanged) {
      this.isClosing = true;

      if (this.#defaultSlotElementRef.value) {
        const bottomPadding = Number.parseFloat(
          getComputedStyle(this.#defaultSlotElementRef.value)?.paddingBottom,
        );

        this.#defaultSlotElementRef.value
          .animate(
            {
              height: [
                `${
                  this.#defaultSlotElementRef.value.offsetHeight - bottomPadding
                }px`,
                '0px',
              ],
              opacity: [1, 0],
            },
            {
              duration: Number(
                getComputedStyle(this.#defaultSlotElementRef.value)
                  .getPropertyValue('--private-close-duration')
                  .replace('ms', ''),
              ),
              easing: getComputedStyle(
                this.#defaultSlotElementRef.value,
              ).getPropertyValue('--private-easing'),
            },
          )
          .addEventListener('finish', () => {
            if (this.#detailsElementRef.value) {
              this.#detailsElementRef.value.open = false;
              this.isClosing = false;

              this.dispatchEvent(
                new Event('toggle', { bubbles: true, composed: true }),
              );
            }
          });
      }
    }
  }

  @property({ reflect: true })
  readonly version: string = packageJson.version;

  override click() {
    this.#summaryElementRef.value?.click();
  }

  override render() {
    return html`<details class="component" ${ref(this.#detailsElementRef)}>
      <summary
        class=${classMap({
          summary: true,
          active: this.open || this.isClosing,
          open: this.open,
        })}
        @click=${this.#onSummaryClick}
        ${ref(this.#summaryElementRef)}
      >
        ${chevronIcon}

        <div class="label-container">
          <slot
            class=${classMap({
              'prefix-icon-slot': true,
              'slotted-content': this.hasPrefixIcon,
            })}
            name="prefix-icon"
            @slotchange=${this.#onPrefixIconSlotChange}
            ${ref(this.#prefixIconSlotElementRef)}
          >
            <!--
              An icon before the label
              @type {Element}
            -->
          </slot>

          <span class="label">${this.label}</span>
        </div>

        <slot
          class=${classMap({
            'suffix-icons-slot': true,
            icons: this.hasSuffixIcons,
          })}
          name="suffix-icons"
          @slotchange=${this.#onSuffixIconsSlotChange}
          ${ref(this.#suffixIconsSlotElementRef)}
        >
          <!--
            Icons after the label
            @type {Element}
          -->
        </slot>
      </summary>

      <slot
        class=${classMap({
          'default-slot': true,
          indented: this.hasPrefixIcon,
        })}
        style=${styleMap({
          '--private-close-duration': 'var(--glide-core-duration-fast-02)',
          '--private-easing': 'var(--glide-core-animation-swoop)',
          '--private-open-duration': 'var(--glide-core-duration-slow-01)',
        })}
        ${assertSlot()}
        ${ref(this.#defaultSlotElementRef)}
      >
        <!--
          The content of the accordion

          @required
          @type {Element | string}
        -->
      </slot>
    </details>`;
  }

  @state()
  private hasPrefixIcon = false;

  @state()
  private hasSuffixIcons = false;

  @state()
  private isClosing = false;

  #defaultSlotElementRef = createRef<HTMLSlotElement>();

  #detailsElementRef = createRef<HTMLDetailsElement>();

  #isOpen = false;

  #prefixIconSlotElementRef = createRef<HTMLSlotElement>();

  #suffixIconsSlotElementRef = createRef<HTMLSlotElement>();

  #summaryElementRef = createRef<HTMLElement>();

  /* v8 ignore start */
  #onPrefixIconSlotChange() {
    const assignedNodes = this.#prefixIconSlotElementRef.value?.assignedNodes();
    this.hasPrefixIcon = Boolean(assignedNodes && assignedNodes.length > 0);
  }
  /* v8 ignore stop */

  /* v8 ignore start */
  #onSuffixIconsSlotChange() {
    const assignedNodes =
      this.#suffixIconsSlotElementRef.value?.assignedNodes();

    this.hasSuffixIcons = Boolean(assignedNodes && assignedNodes.length > 0);
  }
  /* v8 ignore stop */

  #onSummaryClick(event: MouseEvent) {
    // Canceling it prevents `details` from immediately showing and hiding
    // the default slot on open and close, letting us animate it when we're ready.
    event.preventDefault();

    this.open = !this.open;
  }
}
