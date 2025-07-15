import sinon from 'sinon';
import { expect, fixture, html } from '@open-wc/testing';
import { customElement } from 'lit/decorators.js';
import Link from './link.js';

@customElement('glide-core-subclassed')
class Subclassed extends Link {}

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-link')).to.equal(Link);
});

it('is accessible', async () => {
  const host = await fixture<Link>(
    html`<glide-core-link label="Label" href="/"></glide-core-link>`,
  );

  await expect(host).to.be.accessible();

  host.disabled = true;
  await host.updateComplete;

  await expect(host).to.be.accessible();
});

it('throws when `label` is undefined', async () => {
  const spy = sinon.spy();

  try {
    await fixture(html`<glide-core-link></glide-core-link>`);
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
