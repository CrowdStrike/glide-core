import { html, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property } from 'lit/decorators.js';
import packageJson from '../package.json' with { type: 'json' };
import styles from './tab.panel.styles.js';
import final from './library/final.js';
import required from './library/required.js';
import uniqueId from './library/unique-id.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-tab-panel': TabPanel;
  }
}

/**
 * @attr {string} name - The corresponding Tab should have a `panel` attribute with this name
 *
 * @readonly
 * @attr {string} [id]
 *
 * @readonly
 * @attr {string} [role='tabpanel']
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {Element | string} - The content of the panel
 *
 * @cssprop [--padding-inline-end=0rem]
 * @cssprop [--padding-inline-start=0rem]
 */
@customElement('glide-core-tab-panel')
@final
export default class TabPanel extends LitElement {
  /* c8 ignore start */
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: window.navigator.webdriver ? 'open' : 'closed',
  };
  /* c8 ignore end */

  static override styles = styles;

  /**
   * The corresponding Tab should have a `panel` attribute with this name
   */
  @property({ reflect: true })
  @required
  name?: string;

  // Private because it's only meant to be used by Tab Group.
  @property({ type: Boolean })
  get privateIsSelected() {
    return this.#isSelected;
  }

  set privateIsSelected(isSelected: boolean) {
    this.setAttribute('aria-hidden', isSelected ? 'false' : 'true');
    this.#isSelected = isSelected;
  }

  @property({ reflect: true })
  readonly version: string = packageJson.version;

  @property({ reflect: true })
  override readonly role = 'tabpanel';

  @property({ reflect: true })
  override readonly id: string = uniqueId();

  override render() {
    return html`<div
      class=${classMap({
        component: true,
        hidden: !this.privateIsSelected,
        selected: this.privateIsSelected,
      })}
      data-test="tab-panel"
    >
      <slot>
        <!--
          The content of the panel
          @type {Element | string}
        -->
      </slot>
    </div>`;
  }

  #isSelected = false;
}
