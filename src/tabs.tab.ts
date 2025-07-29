import { html, LitElement, type PropertyValues } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property } from 'lit/decorators.js';
import packageJson from '../package.json' with { type: 'json' };
import styles from './tabs.tab.styles.js';
import final from './library/final.js';
import required from './library/required.js';
import uniqueId from './library/unique-id.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-tabs-tab': TabsTab;
  }
}

/**
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
 * @slot {Element | string} - A label
 * @slot {Element} [icon]
 *
 * @fires {Event} selected
 */
@customElement('glide-core-tabs-tab')
@final
export default class TabsTab extends LitElement {
  /* c8 ignore start */
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: window.navigator.webdriver ? 'open' : 'closed',
  };
  /* c8 ignore stop */

  static override styles = styles;

  @property({ reflect: true })
  @required
  panel?: string;

  @property({ type: Boolean, reflect: true }) disabled = false;

  /**
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  get selected(): boolean {
    return this.#selected;
  }

  set selected(isSelected: boolean) {
    const hasChanged = isSelected !== this.#selected;
    this.#selected = isSelected;

    if (hasChanged) {
      this.dispatchEvent(
        new Event('private-selected', {
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
    this.selected = true;

    this.dispatchEvent(
      new Event('selected', { bubbles: true, composed: true }),
    );
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
        <slot name="icon">
          <!--
            @type {Element}
          -->
        </slot>

        <slot>
          <!--
            A label
            @type {Element | string}
          -->
        </slot>
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

  #selected = false;
}
