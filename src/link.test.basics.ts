import sinon from 'sinon';
import { expect, fixture, html } from '@open-wc/testing';
import { customElement } from 'lit/decorators.js';
import GlideCoreLink from './link.js';

@customElement('glide-core-subclassed')
class GlideCoreSubclassed extends GlideCoreLink {}

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-link')).to.equal(GlideCoreLink);
});

it('is accessible', async () => {
  const host = await fixture<GlideCoreLink>(
    html`<glide-core-link label="Label" url="/"></glide-core-link>`,
  );

  await expect(host).to.be.accessible();

  host.disabled = true;
  await host.updateComplete;

  await expect(host).to.be.accessible();
});

it('throws when `label` is empty', async () => {
  const spy = sinon.spy();

  try {
    await fixture(html`<glide-core-link url="/"></glide-core-link>`);
  } catch {
    spy();
  }

  expect(spy.callCount).to.equal(1);
});

it('throws when `url` is empty', async () => {
  const spy = sinon.spy();

  try {
    await fixture(html`<glide-core-link label="Label"></glide-core-link>`);
  } catch {
    spy();
  }

  expect(spy.callCount).to.equal(1);
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
