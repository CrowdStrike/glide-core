import { html, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import styles from './spinner.styles.js';
import packageJson from '@/package.json' with { type: 'json' };
import final from '@/src/library/final.js';
import required from '@/src/library/required.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-spinner': Spinner;
  }
}

/**
 * @attr {string} label - For screenreaders
 * @attr {'large'|'medium'|'small'} [size='medium']
 *
 * @readonly
 * @attr {string} [version]
 */
@customElement('glide-core-spinner')
@final
export default class Spinner extends LitElement {
  /* c8 ignore start */
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
    mode: window.navigator.webdriver ? 'open' : 'closed',
  };

  static override styles = styles;

  /**
   * For screenreaders
   **/
  @property({ reflect: true })
  @required
  label?: string;

  @property({ reflect: true, useDefault: true })
  size: 'large' | 'medium' | 'small' = 'medium';

  @property({ reflect: true })
  readonly version: string = packageJson.version;

  override render() {
    return html`<div
      aria-label=${ifDefined(this.label)}
      class=${classMap({
        component: true,
        [this.size]: true,
      })}
      role="progressbar"
    ></div>`;
  }
}
