import { expect, fixture, html } from '@open-wc/testing';
import { customElement } from 'lit/decorators.js';
import sinon from 'sinon';
import Tab from './tab.js';

@customElement('glide-core-subclassed')
class Subclassed extends Tab {}

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-tab')).to.equal(Tab);
});

it('sets `ariaDisabled` and `tabIndex` when disabled programmatically', async () => {
  const host = await fixture<Tab>(html`
    <glide-core-tab panel="panel">Tab</glide-core-tab>
  `);

  host.disabled = true;
  await host.updateComplete;

  expect(host?.ariaDisabled).to.equal('true');
  expect(host?.tabIndex).to.equal(-1);
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
