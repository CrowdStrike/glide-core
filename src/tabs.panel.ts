import { html, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property } from 'lit/decorators.js';
import packageJson from '../package.json' with { type: 'json' };
import styles from './tabs.panel.styles.js';
import final from './library/final.js';
import required from './library/required.js';
import uniqueId from './library/unique-id.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-tabs-panel': TabsPanel;
  }
}

/**
 * @attr {string} name - The corresponding Tab should have a `panel` attribute with this name.
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
 * @slot {Element | string} - The content of the panel.
 *
 * @cssprop [--padding-inline-end=0rem]
 * @cssprop [--padding-inline-start=0rem]
 */
@customElement('glide-core-tabs-panel')
@final
export default class TabsPanel extends LitElement {
  /* c8 ignore start */
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: window.navigator.webdriver ? 'open' : 'closed',
  };
  /* c8 ignore stop */

  static override styles = styles;

  /**
   * The corresponding Tab should have a `panel` attribute with this name.
   */
  @property({ reflect: true })
  @required
  name: string | undefined;

  // Private because it's only meant to be used by Tab Group.
  @property({ type: Boolean })
  get privateSelected() {
    return this.#selected;
  }

  set privateSelected(selected: boolean) {
    this.setAttribute('aria-hidden', selected ? 'false' : 'true');
    this.#selected = selected;
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
        hidden: !this.privateSelected,
        selected: this.privateSelected,
      })}
      data-test="tab-panel"
    >
      <slot>
        <!--
          The content of the panel.
          @type {Element | string}
        -->
      </slot>
    </div>`;
  }

  #selected = false;
}
