import { LitElement, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
import styles from './accordion.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'cs-accordion': CsAccordion;
  }
}

/**
 * @event toggle - Emitted when the Accordion opens or closes.
 * @slot - The content of the Accordion.
 * @slot prefix - An optional icon to display before the label.
 * @slot suffix - An optional section to add additional iconography.
 */
@customElement('cs-accordion')
export default class CsAccordion extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: 'closed',
  };

  static override styles = styles;

  @property({ reflect: true }) label = '';

  @property({ type: Boolean, reflect: true }) open = false;

  override render() {
    return html` <details
      class="component"
      ?open=${this.open}
      ${ref(this.#detailsRef)}
    >
      <summary
        class="summary"
        @click=${this.#onSummaryClick}
        data-test="summary"
      >
        <svg
          class="chevron"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M6 9L12 15L18 9"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <div
          class=${classMap({
            'heading-box': true,
            'heading-box-with-prefix': this.hasPrefixSlot,
          })}
          data-test="label"
          id="label"
        >
          <div class="prefix-slot-box">
            <slot
              name="prefix"
              @slotchange=${this.#onPrefixSlotChange}
              ${ref(this.#prefixSlotRef)}
            ></slot>
          </div>

          <span class="label">${this.label}</span>
        </div>

        <div
          class=${classMap({
            'suffix-slot-box': true,
            'suffix-slot-box-with-content': this.hasSuffixSlot,
          })}
          data-test="suffix"
        >
          <slot
            name="suffix"
            @slotchange=${this.#onSuffixSlotChange}
            ${ref(this.#suffixSlotRef)}
          ></slot>
        </div>
      </summary>

      <div
        aria-labelledby="label"
        class=${classMap({
          content: true,
          'content-with-prefix': this.hasPrefixSlot,
        })}
        data-test="content"
        tabindex="0"
        role="region"
        ${ref(this.#contentRef)}
      >
        <slot></slot>
      </div>
    </details>`;
  }

  @state()
  private hasPrefixSlot = false;

  @state()
  private hasSuffixSlot = false;

  #contentRef = createRef<HTMLDivElement>();

  #detailsRef = createRef<HTMLDetailsElement>();

  #prefixSlotRef = createRef<HTMLSlotElement>();

  #suffixSlotRef = createRef<HTMLSlotElement>();

  #onPrefixSlotChange() {
    const assignedNodes = this.#prefixSlotRef.value?.assignedNodes();
    this.hasPrefixSlot =
      assignedNodes && assignedNodes.length > 0 ? true : false;
  }

  #onSuffixSlotChange() {
    const assignedNodes = this.#suffixSlotRef.value?.assignedNodes();
    this.hasSuffixSlot =
      assignedNodes && assignedNodes.length > 0 ? true : false;
  }

  #onSummaryClick(event: MouseEvent) {
    const details = this.#detailsRef.value!;
    const content = this.#contentRef.value!;

    const isOpening = !details.open;

    const bottomPadding = Number.parseFloat(
      getComputedStyle(content)?.paddingBottom,
    );

    if (isOpening) {
      // We need `requestAnimationFrame` here for both Firefox and Safari.
      // Otherwise there's animation jank that happens.
      requestAnimationFrame(() => {
        content.animate(
          {
            height: ['0px', `${content.offsetHeight - bottomPadding}px`],
            opacity: [0, 1],
          },
          {
            duration: 150,
            easing: 'ease-in',
          },
        );

        this.dispatchEvent(
          new CustomEvent('toggle', {
            detail: {
              newState: 'open',
              oldState: 'closed',
            },
          }),
        );
      });
    } else {
      // We need to hijack the `open` attribute from being removed
      // from the DOM until after our animation runs. Due to that,
      // we prevent default here and manually remove the attribute
      // ourselves.
      event.preventDefault();

      const animateClosing = content.animate(
        {
          height: [`${content.offsetHeight - bottomPadding}px`, '0px'],
          opacity: [1, 0],
        },
        {
          duration: 100,
          easing: 'ease-out',
        },
      );

      animateClosing.addEventListener(
        'finish',
        () => {
          details.open = false;

          this.dispatchEvent(
            new CustomEvent('toggle', {
              detail: {
                newState: 'closed',
                oldState: 'open',
              },
            }),
          );
        },
        { once: true },
      );
    }
  }
}
