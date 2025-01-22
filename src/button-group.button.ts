import { html, LitElement } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import packageJson from '../package.json' with { type: 'json' };
import styles from './button-group.button.styles.js';
import assertSlot from './library/assert-slot.js';
import shadowRootMode from './library/shadow-root-mode.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-button-group-button': GlideCoreButtonGroupButton;
  }
}

/**
 * @slot - A label.
 * @slot icon - An optional icon before the label.
 */
@customElement('glide-core-button-group-button')
export default class GlideCoreButtonGroupButton extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: shadowRootMode,
  };

  static override styles = styles;

  @property({ reflect: true })
  label? = '';

  @property({ type: Boolean, reflect: true })
  get selected() {
    return this.#isSelected;
  }

  set selected(isSelected: boolean) {
    this.#isSelected = isSelected;
    this.dispatchEvent(new Event('private-selected', { bubbles: true }));
  }

  @property({ type: Boolean, reflect: true })
  disabled = false;

  // `value` is used by consumers to identify selections based on something other
  // than the label.
  @property({ reflect: true })
  value = '';

  // Private because it's only meant to be used by Button Group.
  @property()
  privateOrientation: 'horizontal' | 'vertical' = 'horizontal';

  // Private because it's only meant to be used by Button Group.
  @property()
  privateVariant?: 'icon-only';

  @property({ reflect: true })
  readonly version = packageJson.version;

  override click() {
    this.#componentElementRef.value?.click();
  }

  override focus(options?: FocusOptions) {
    this.#componentElementRef.value?.focus(options);
  }

  override render() {
    return html`<div
      aria-checked=${this.selected}
      aria-disabled=${this.disabled}
      class=${classMap({
        component: true,
        selected: this.selected,
        disabled: this.disabled,
        [this.privateOrientation]: true,
        icon: this.hasIcon,
        'icon-only': this.privateVariant === 'icon-only',
      })}
      role="radio"
      tabindex=${!this.selected || this.disabled ? -1 : 0}
      ${ref(this.#componentElementRef)}
    >
      <slot
        name="icon"
        @slotchange=${this.#onIconSlotChange}
        ${assertSlot(null, this.privateVariant !== 'icon-only')}
        ${ref(this.#iconSlotElementRef)}
      ></slot>

      <div
        class=${classMap({
          label: true,
          'visually-hidden': this.privateVariant === 'icon-only',
        })}
      >
        ${this.label}
      </div>
    </div>`;
  }

  @state()
  private hasIcon = false;

  #componentElementRef = createRef<HTMLElement>();

  #iconSlotElementRef = createRef<HTMLSlotElement>();

  #isSelected = false;

  #onIconSlotChange() {
    const assignedNodes = this.#iconSlotElementRef.value?.assignedNodes();
    this.hasIcon = Boolean(assignedNodes && assignedNodes.length > 0);
  }
}
