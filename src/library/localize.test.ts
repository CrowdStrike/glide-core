import { LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { expect, fixture, html } from '@open-wc/testing';
import en from '../translations/en.js';
import { LocalizeController } from './localize.js';

@customElement('glide-core-component')
class Component extends LitElement {
  localize = new LocalizeController(this);
}

it('can call any term from en translation if locale is Japanese', async () => {
  const host = await fixture<Component>(
    html`<glide-core-component></glide-core-component>`,
  );

  host.lang = 'ja';

  expect(host.localize.lang()).to.equal('ja');

  const keys = Object.keys(en) as (keyof typeof en)[];

  for (const key of keys) {
    expect(host.localize.term(key)).to.be.ok;
  }
});

it('can call any term from en translation if locale is French', async () => {
  const host = await fixture<Component>(
    html`<glide-core-component></glide-core-component>`,
  );

  host.lang = 'fr';

  expect(host.localize.lang()).to.equal('fr');

  const keys = Object.keys(en) as (keyof typeof en)[];

  for (const key of keys) {
    expect(host.localize.term(key)).to.be.ok;
  }
});
