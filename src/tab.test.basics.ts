import { expect, fixture, html } from '@open-wc/testing';
import { customElement } from 'lit/decorators.js';
import sinon from 'sinon';
import GlideCoreTab from './tab.js';

@customElement('glide-core-subclassed')
class GlideCoreSubclassed extends GlideCoreTab {}

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-tab')).to.equal(GlideCoreTab);
});

it('sets `ariaDisabled` and `tabIndex` when disabled', async () => {
  const host = await fixture<GlideCoreTab>(html`
    <glide-core-tab disabled>Tab</glide-core-tab>
  `);

  expect(host?.ariaDisabled).to.equal('true');
  expect(host?.tabIndex).to.equal(-1);
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
