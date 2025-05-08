import { html, LitElement } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property } from 'lit/decorators.js';
import packageJson from '../package.json' with { type: 'json' };
import GlideCoreSplitButtonPrimaryButton from './split-button.primary-button.js';
import GlideCoreSplitButtonPrimaryLink from './split-button.primary-link.js';
import GlideCoreSplitButtonSecondaryButton from './split-button.secondary-button.js';
import styles from './split-button.styles.js';
import assertSlot from './library/assert-slot.js';
import shadowRootMode from './library/shadow-root-mode.js';
import final from './library/final.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-split-button': GlideCoreSplitButton;
  }
}

/**
 * @attr {'primary'|'secondary'} [variant='primary']
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {GlideCoreSplitButtonPrimaryButton | GlideCoreSplitButtonPrimaryLink}
 * @slot {GlideCoreSplitButtonSecondaryButton} [secondary-button]
 */
@customElement('glide-core-split-button')
@final
export default class GlideCoreSplitButton extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: shadowRootMode,
  };

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

    if (element instanceof GlideCoreSplitButtonSecondaryButton) {
      return element;
    }
  }

  private get primaryButtonElement() {
    const element = this.#defaultSlotElementRef.value?.assignedElements().at(0);

    if (
      element instanceof GlideCoreSplitButtonPrimaryButton ||
      element instanceof GlideCoreSplitButtonPrimaryLink
    ) {
      return element;
    }
  }

  override render() {
    return html`
      <div class="component">
        <slot
          @slotchange=${this.#onDefaultSlotChange}
          ${assertSlot([
            GlideCoreSplitButtonPrimaryButton,
            GlideCoreSplitButtonPrimaryLink,
          ])}
          ${ref(this.#defaultSlotElementRef)}
        >
          <!-- @type {GlideCoreSplitButtonPrimaryButton | GlideCoreSplitButtonPrimaryLink} -->
        </slot>

        <slot
          name="secondary-button"
          @slotchange=${this.#onSecondaryButtonSlotChange}
          ${assertSlot([GlideCoreSplitButtonSecondaryButton])}
          ${ref(this.#secondaryButtonSlotElementRef)}
        >
          <!-- @type {GlideCoreSplitButtonSecondaryButton} -->
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
