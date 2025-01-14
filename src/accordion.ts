import { html, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
import packageJson from '../package.json' with { type: 'json' };
import { owSlot } from './library/ow.js';
import chevronIcon from './icons/chevron.js';
import styles from './accordion.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-accordion': GlideCoreAccordion;
  }
}

/**
 * @event toggle
 *
 * @slot - The content of the accordion.
 * @slot prefix-icon - An optional icon before the label.
 * @slot suffix-icons - Optional icons after the label.
 */
@customElement('glide-core-accordion')
export default class GlideCoreAccordion extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
    mode: 'closed',
  };

  static override styles = styles;

  @property({ reflect: true }) label?: string;

  @property({ reflect: true, type: Boolean })
  get open() {
    return this.#isOpen;
  }

  set open(isOpen: boolean) {
    const hasChanged = isOpen !== this.#isOpen;
    this.#isOpen = isOpen;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (reducedMotion.matches && hasChanged && this.#detailsElementRef.value) {
      this.#detailsElementRef.value.open = isOpen;

      this.dispatchEvent(
        new Event('toggle', { bubbles: true, composed: true }),
      );

      return;
    }

    if (isOpen && hasChanged) {
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
                duration: 150,
                easing: 'ease-in',
              },
            )
            .addEventListener('finish', () => {
              if (this.#detailsElementRef.value) {
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
              duration: 100,
              easing: 'ease-out',
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
  readonly version = packageJson.version;

  override click() {
    this.#summaryElementRef.value?.click();
  }

  override firstUpdated() {
    owSlot(this.#defaultSlotElementRef.value);
  }

  override render() {
    return html`<details class="component" ${ref(this.#detailsElementRef)}>
      <summary
        class=${classMap({
          summary: true,
          active: this.open || this.isClosing,
          open: this.open,
        })}
        data-test="summary"
        @click=${this.#onSummaryClick}
        ${ref(this.#summaryElementRef)}
      >
        ${chevronIcon}

        <div class="label-container">
          <slot
            class="prefix-icon-slot"
            name="prefix-icon"
            @slotchange=${this.#onPrefixIconSlotChange}
            ${ref(this.#prefixIconSlotElementRef)}
          ></slot>

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
        ></slot>
      </summary>

      <slot
        class=${classMap({
          'default-slot': true,
          indented: this.hasPrefixIcon,
        })}
        data-test="default-slot"
        @slotchange=${this.#onDefaultSlotChange}
        ${ref(this.#defaultSlotElementRef)}
      ></slot>
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

  #onDefaultSlotChange() {
    owSlot(this.#defaultSlotElementRef.value);
  }

  #onPrefixIconSlotChange() {
    const assignedNodes = this.#prefixIconSlotElementRef.value?.assignedNodes();
    this.hasPrefixIcon = Boolean(assignedNodes && assignedNodes.length > 0);
  }

  #onSuffixIconsSlotChange() {
    const assignedNodes =
      this.#suffixIconsSlotElementRef.value?.assignedNodes();

    this.hasSuffixIcons = Boolean(assignedNodes && assignedNodes.length > 0);
  }

  #onSummaryClick(event: MouseEvent) {
    // Canceling it prevents `details` from immediately showing and hiding
    // the default slot on open and close, letting us animate it when we're ready.
    event.preventDefault();

    this.open = !this.open;
  }
}
