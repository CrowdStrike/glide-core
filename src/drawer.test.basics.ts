import { expect, fixture, html } from '@open-wc/testing';
import { customElement } from 'lit/decorators.js';
import sinon from 'sinon';
import Drawer from './drawer.js';
import expectUnhandledRejection from './library/expect-unhandled-rejection.js';

@customElement('glide-core-subclassed')
class Subclassed extends Drawer {}

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-drawer')).to.equal(Drawer);
});

it('is accessible', async () => {
  const host = await fixture<Drawer>(
    html`<glide-core-drawer label="Label" open>Content</glide-core-drawer>`,
  );

  await expect(host).to.be.accessible();
});

it('opens', async () => {
  const host = await fixture<Drawer>(
    html`<glide-core-drawer label="Label" open>Content</glide-core-drawer>`,
  );

  const aside = host.shadowRoot?.querySelector('[data-test="component"]');
  expect(aside?.checkVisibility({ visibilityProperty: true })).to.be.true;
});

it('throws when `label` is undefined', async () => {
  const spy = sinon.spy();

  try {
    await fixture(html`<glide-core-drawer>Content</glide-core-drawer>`);
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

it('throws when it does not have a default slot', async () => {
  await expectUnhandledRejection(() => {
    return fixture(html`<glide-core-drawer label="Label"></glide-core-drawer>`);
  });
});
