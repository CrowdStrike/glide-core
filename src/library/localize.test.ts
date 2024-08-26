/* eslint-disable @typescript-eslint/no-unused-expressions */

import { LitElement } from 'lit';
import { LocalizeController } from './localize.js';
import { customElement } from 'lit/decorators.js';
import { expect, fixture, html } from '@open-wc/testing';
import en from '../translations/en.js';

@customElement('mock-component')
class GlideCoreMockComponent extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: 'closed',
  };

  localize = new LocalizeController(this);
}

it('can call any term from en translation if locale is Japanese', async () => {
  const component = await fixture<GlideCoreMockComponent>(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    html`<mock-component></mock-component>`,
  );

  component.lang = 'ja';

  expect(component.localize.lang()).to.equal('ja');

  const keys = Object.keys(en) as (keyof typeof en)[];

  for (const key of keys) {
    expect(component.localize.term(key)).to.be.ok;
  }
});

it('can call any term from en translation if locale is French', async () => {
  const component = await fixture<GlideCoreMockComponent>(
    html`<mock-component></mock-component>`,
  );

  component.lang = 'fr';

  expect(component.localize.lang()).to.equal('fr');

  const keys = Object.keys(en) as (keyof typeof en)[];

  for (const key of keys) {
    expect(component.localize.term(key)).to.be.ok;
  }
});
