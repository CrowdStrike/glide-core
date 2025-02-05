import { expect } from '@open-wc/testing';
import { customElement } from 'lit/decorators.js';
import sinon from 'sinon';
import GlideCoreMenuButton from './menu.button.js';

@customElement('glide-core-subclassed')
class GlideCoreSubclassed extends GlideCoreMenuButton {}

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-menu-button')).to.equal(
    GlideCoreMenuButton,
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
