import { html, LitElement } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property } from 'lit/decorators.js';
import packageJson from '../package.json' with { type: 'json' };
import SplitButtonPrimaryButton from './split-button.primary-button.js';
import SplitButtonPrimaryLink from './split-button.primary-link.js';
import SplitButtonSecondaryButton from './split-button.secondary-button.js';
import styles from './split-button.styles.js';
import assertSlot from './library/assert-slot.js';
import final from './library/final.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-split-button': SplitButton;
  }
}

/**
 * @attr {'primary'|'secondary'} [variant='primary']
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {SplitButtonPrimaryButton | SplitButtonPrimaryLink}
 * @slot {SplitButtonSecondaryButton} [secondary-button]
 */
@customElement('glide-core-split-button')
@final
export default class SplitButton extends LitElement {
    /* c8 ignore start */
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: window.navigator.webdriver ? 'open' : 'closed',
  };
  /* c8 ignore end */

  static override styles = styles;

  /**
   * @default 'primary'
   */
  @property({ reflect: true })
  get variant(): 'primary' | 'secondary' {
    return this.#variant;
  }

  set variant(variant: 'primary' | 'secondary') {
    this.#variant = variant;

    if (this.primaryButtonElement) {
      this.primaryButtonElement.privateVariant = variant;
    }

    if (this.secondaryButtonElement) {
      this.secondaryButtonElement.privateVariant = variant;
    }
  }

  @property({ reflect: true })
  readonly version: string = packageJson.version;

  private get secondaryButtonElement() {
    const element = this.#secondaryButtonSlotElementRef.value
      ?.assignedElements()
      .at(0);

    if (element instanceof SplitButtonSecondaryButton) {
      return element;
    }
  }

  private get primaryButtonElement() {
    const element = this.#defaultSlotElementRef.value?.assignedElements().at(0);

    if (
      element instanceof SplitButtonPrimaryButton ||
      element instanceof SplitButtonPrimaryLink
    ) {
      return element;
    }
  }

  override render() {
    return html`
      <div class="component">
        <slot
          @slotchange=${this.#onDefaultSlotChange}
          ${assertSlot([SplitButtonPrimaryButton, SplitButtonPrimaryLink])}
          ${ref(this.#defaultSlotElementRef)}
        >
          <!-- @type {SplitButtonPrimaryButton | SplitButtonPrimaryLink} -->
        </slot>

        <slot
          name="secondary-button"
          @slotchange=${this.#onSecondaryButtonSlotChange}
          ${assertSlot([SplitButtonSecondaryButton])}
          ${ref(this.#secondaryButtonSlotElementRef)}
        >
          <!-- @type {SplitButtonSecondaryButton} -->
        </slot>
      </div>
    `;
  }

  #defaultSlotElementRef = createRef<HTMLSlotElement>();

  #secondaryButtonSlotElementRef = createRef<HTMLSlotElement>();

  #variant: 'primary' | 'secondary' = 'primary';

  #onDefaultSlotChange() {
    if (this.primaryButtonElement) {
      this.primaryButtonElement.privateVariant = this.variant;
    }
  }

  #onSecondaryButtonSlotChange() {
    if (this.secondaryButtonElement) {
      this.secondaryButtonElement.privateVariant = this.variant;
    }
  }
}
