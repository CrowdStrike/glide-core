import { LitElement, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
import { owSlot } from './library/ow.js';
import styles from './accordion.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-accordion': GlideCoreAccordion;
  }
}

/**
 * @event toggle - `(event: "toggle", listener: (event: CustomEvent<{ newState: "open" | "closed", oldState: "open" | "closed" }>) => void) => void`.
 *                 Emitted when the Accordion opens or closes.
 *
 * @slot - The content of the accordion.
 * @slot prefix - An optional icon before the label.
 * @slot suffix - Optional icons after the label.
 */
@customElement('glide-core-accordion')
export default class GlideCoreAccordion extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
    mode: 'closed',
  };

  static override styles = styles;

  @property({ reflect: true }) label = '';

  @property({ type: Boolean, reflect: true }) open = false;

  override firstUpdated() {
    owSlot(this.#defaultSlotElementRef.value);
  }

  override render() {
    return html`<details
      class="component"
      ?open=${this.open}
      ${ref(this.#detailsElementRef)}
    >
      <summary
        class="summary"
        @click=${this.#onSummaryClick}
        data-test="summary"
      >
        <svg
          class="chevron"
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
        >
          <div class="prefix-slot-box">
            <slot
              name="prefix"
              @slotchange=${this.#onPrefixSlotChange}
              ${ref(this.#prefixSlotElementRef)}
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
            ${ref(this.#suffixSlotElementRef)}
          ></slot>
        </div>
      </summary>

      <div
        class=${classMap({
          content: true,
          'content-with-prefix': this.hasPrefixSlot,
        })}
        data-test="content"
        ${ref(this.#contentElementRef)}
      >
        <slot
          @slotchange=${this.#onDefaultSlotChange}
          ${ref(this.#defaultSlotElementRef)}
        ></slot>
      </div>
    </details>`;
  }

  @state()
  private hasPrefixSlot = false;

  @state()
  private hasSuffixSlot = false;

  #contentElementRef = createRef<HTMLDivElement>();

  #defaultSlotElementRef = createRef<HTMLSlotElement>();

  #detailsElementRef = createRef<HTMLDetailsElement>();

  #prefixSlotElementRef = createRef<HTMLSlotElement>();

  #suffixSlotElementRef = createRef<HTMLSlotElement>();

  #onDefaultSlotChange() {
    owSlot(this.#defaultSlotElementRef.value);
  }

  #onPrefixSlotChange() {
    const assignedNodes = this.#prefixSlotElementRef.value?.assignedNodes();

    this.hasPrefixSlot =
      assignedNodes && assignedNodes.length > 0 ? true : false;
  }

  #onSuffixSlotChange() {
    const assignedNodes = this.#suffixSlotElementRef.value?.assignedNodes();

    this.hasSuffixSlot =
      assignedNodes && assignedNodes.length > 0 ? true : false;
  }

  #onSummaryClick(event: MouseEvent) {
    const details = this.#detailsElementRef.value!;
    const content = this.#contentElementRef.value!;

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
