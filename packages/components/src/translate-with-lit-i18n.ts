import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { translate as t } from 'lit-i18n';

declare global {
  interface HTMLElementTagNameMap {
    'translate-with-lit-i18n': GlideCoreTranslateWithLitI18n;
  }
}

@customElement('translate-with-lit-i18n')
export default class GlideCoreTranslateWithLitI18n extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: 'closed',
  };

  @property({ reflect: true }) dynamicString = 'Dynamic';

  override render() {
    return html`
      <div style="display: flex; flex-direction: column; gap: 10px;">
        <h1>Static string: ${t('Static')}</h1>
        <h1>
          Dynamic string: ${t('Dynamic', { dynamicString: this.dynamicString })}
        </h1>
      </div>
    `;
  }
}
