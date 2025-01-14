import { html, LitElement } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property } from 'lit/decorators.js';
import packageJson from '../package.json' with { type: 'json' };
import { owSlot, owSlotType } from './library/ow.js';
import GlideCoreSplitButtonPrimaryButton from './split-button.primary-button.js';
import GlideCoreSplitButtonPrimaryLink from './split-button.primary-link.js';
import GlideCoreSplitButtonSecondaryButton from './split-button.secondary-button.js';
import styles from './split-button.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-split-button': GlideCoreSplitButton;
  }
}

/**
 * @event toggle
 *
 * @slot - One of `<glide-core-split-button-primary-button>` or `<glide-core-split-button-primary-link>`.
 * @slot secondary-button - One of `<glide-core-split-button-secondary-button>`.
 */
@customElement('glide-core-split-button')
export default class GlideCoreSplitButton extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: 'closed',
  };

  static override styles = styles;

  @property({ reflect: true })
  get size() {
    return this.#size;
  }

  set size(size: 'large' | 'small') {
    this.#size = size;

    if (this.primaryButtonElement) {
      this.primaryButtonElement.privateSize = size;
    }

    if (this.secondaryButtonElement) {
      this.secondaryButtonElement.privateSize = size;
    }
  }

  @property({ reflect: true })
  get variant() {
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
  readonly version = packageJson.version;

  override firstUpdated() {
    owSlot(this.#defaultSlotElementRef.value);
    owSlot(this.#secondaryButtonSlotElementRef.value);

    owSlotType(this.#defaultSlotElementRef.value, [
      GlideCoreSplitButtonPrimaryButton,
      GlideCoreSplitButtonPrimaryLink,
    ]);

    owSlotType(this.#secondaryButtonSlotElementRef.value, [
      GlideCoreSplitButtonSecondaryButton,
    ]);
  }

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
          ${ref(this.#defaultSlotElementRef)}
        ></slot>

        <slot
          name="secondary-button"
          @slotchange=${this.#onSecondaryButtonSlotChange}
          ${ref(this.#secondaryButtonSlotElementRef)}
        ></slot>
      </div>
    `;
  }

  #defaultSlotElementRef = createRef<HTMLSlotElement>();

  #secondaryButtonSlotElementRef = createRef<HTMLSlotElement>();

  #size: 'large' | 'small' = 'large';

  #variant: 'primary' | 'secondary' = 'primary';

  #onDefaultSlotChange() {
    owSlot(this.#defaultSlotElementRef.value);

    owSlotType(this.#defaultSlotElementRef.value, [
      GlideCoreSplitButtonPrimaryButton,
      GlideCoreSplitButtonPrimaryLink,
    ]);

    if (this.primaryButtonElement) {
      this.primaryButtonElement.privateSize = this.size;
      this.primaryButtonElement.privateVariant = this.variant;
    }
  }

  #onSecondaryButtonSlotChange() {
    owSlotType(this.#secondaryButtonSlotElementRef.value, [
      GlideCoreSplitButtonSecondaryButton,
    ]);

    if (this.secondaryButtonElement) {
      this.secondaryButtonElement.privateSize = this.size;
      this.secondaryButtonElement.privateVariant = this.variant;
    }
  }
}
