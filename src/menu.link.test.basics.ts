import { expect, fixture, html } from '@open-wc/testing';
import { customElement } from 'lit/decorators.js';
import sinon from 'sinon';
import MenuLink from './menu.link.js';

@customElement('glide-core-subclassed')
class Subclassed extends MenuLink {}

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-menu-link')).to.equal(MenuLink);
});

it('throws when `label` is undefined', async () => {
  const spy = sinon.spy();

  try {
    await fixture(html`<glide-core-menu-link></glide-core-menu-link>`);
  } catch {
    spy();
  }

  expect(spy.callCount).to.equal(1);
});

it('throws when subclassed', async () => {
  const spy = sinon.spy();

  try {
    new Subclassed();
  } catch {
    spy();
  }

  expect(spy.callCount).to.equal(1);
});
