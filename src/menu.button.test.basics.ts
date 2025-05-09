import { expect, fixture, html } from '@open-wc/testing';
import { customElement } from 'lit/decorators.js';
import sinon from 'sinon';
import MenuButton from './menu.button.js';

@customElement('glide-core-subclassed')
class Subclassed extends MenuButton {}

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-menu-button')).to.equal(
    MenuButton,
  );
});

it('throws when `label` is empty', async () => {
  const spy = sinon.spy();

  try {
    await fixture(html`<glide-core-menu-button></glide-core-menu-button>`);
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
