import { expect } from '@open-wc/testing';
import { customElement } from 'lit/decorators.js';
import sinon from 'sinon';
import GlideCoreMenuLink from './menu.link.js';

@customElement('glide-core-subclassed')
class GlideCoreSubclassed extends GlideCoreMenuLink {}

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-menu-link')).to.equal(
    GlideCoreMenuLink,
  );
});

it('throws when subclassed', async () => {
  const spy = sinon.spy();

  try {
    new GlideCoreSubclassed();
  } catch {
    spy();
  }

  expect(spy.callCount).to.equal(1);
});
