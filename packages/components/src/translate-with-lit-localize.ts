import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { localized, msg, str } from '@lit/localize';

declare global {
  interface HTMLElementTagNameMap {
    'translate-with-lit-localize': GlideCoreTranslateWithLitLocalize;
  }
}

@localized()
@customElement('translate-with-lit-localize')
export default class GlideCoreTranslateWithLitLocalize extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: 'closed',
  };

  @property({ reflect: true }) dynamicString = 'Dynamic';

  override render() {
    return html`
      <div style="display: flex; flex-direction: column; gap: 10px;">
        <h1>Static string: ${msg('Static')}</h1>
        <h1>Dynamic string: ${msg(str`Hello ${this.dynamicString}`)}</h1>
      </div>
    `;
  }
}
