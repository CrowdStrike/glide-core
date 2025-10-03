import { html, LitElement, type PropertyValues } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property } from 'lit/decorators.js';
import packageJson from '../package.json' with { type: 'json' };
import styles from './tab-group.tab.styles.js';
import final from './library/final.js';
import required from './library/required.js';
import uniqueId from './library/unique-id.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-tab-group-tab': TabGroupTab;
  }
}

/**
 * @attr {string} label
 * @attr {string} panel
 * @attr {boolean} [disabled=false]
 *
 * @readonly
 * @attr {string} [id]
 *
 * @readonly
 * @attr {string} [role='tab']
 *
 * @attr {boolean} [selected=false]
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {Element} [icon]
 *
 * @fires {Event} selected
 */
@customElement('glide-core-tab-group-tab')
@final
export default class TabGroupTab extends LitElement {
  /* c8 ignore start */
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: window.navigator.webdriver ? 'open' : 'closed',
  };
  /* c8 ignore stop */

  static override styles = styles;

  /**
   * @default undefined
   */
  @property({ reflect: true })
  @required
  get label(): string | undefined {
    return this.#label;
  }

  set label(label) {
    this.#label = label;

    this.dispatchEvent(
      new Event('private-label-change', {
        bubbles: true,
      }),
    );
  }

  @property({ reflect: true })
  @required
  panel?: string;

  @property({ type: Boolean, reflect: true }) disabled = false;

  /**
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  get selected(): boolean {
    return this.#isSelected;
  }

  set selected(isSelected: boolean) {
    const hasChanged = isSelected !== this.#isSelected;
    this.#isSelected = isSelected;

    if (hasChanged && isSelected) {
      this.dispatchEvent(new Event('private-selected', { bubbles: true }));
    } else if (hasChanged) {
      this.dispatchEvent(
        new Event('private-deselected', {
          bubbles: true,
        }),
      );
    }
  }

  @property({ reflect: true })
  readonly version: string = packageJson.version;

  @property({ reflect: true })
  override readonly id: string = uniqueId();

  @property({ reflect: true })
  override readonly role = 'tab';

  privateSelect() {
    const hasChanged = !this.#isSelected;
    this.selected = true;

    if (hasChanged) {
      this.dispatchEvent(
        new Event('selected', {
          bubbles: true,
          composed: true,
        }),
      );
    }
  }

  override render() {
    return html`<div
      class=${classMap({
        component: true,
        disabled: this.disabled,
        selected: this.selected,
      })}
      data-test="component"
    >
      <div class="container">
        <slot name="icon" @slotchange=${this.#onIconSlotChange}>
          <!--
            @type {Element}
          -->
        </slot>

        <span>${this.label}</span>
      </div>
    </div>`;
  }

  override updated(changes: PropertyValues) {
    if (changes.has('selected')) {
      this.setAttribute('aria-selected', this.selected ? 'true' : 'false');
    }

    if (changes.has('disabled')) {
      if (this.disabled) {
        this.setAttribute('aria-disabled', 'true');
        this.setAttribute('tabindex', '-1');
      } else {
        this.removeAttribute('aria-disabled');
      }
    }
  }

  #isSelected = false;

  #label?: string;

  #onIconSlotChange() {
    this.dispatchEvent(
      new Event('private-icon-slotchange', {
        bubbles: true,
      }),
    );
  }
}
