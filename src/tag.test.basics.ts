import { assert, aTimeout, expect, fixture, html } from '@open-wc/testing';
import { customElement } from 'lit/decorators.js';
import sinon from 'sinon';
import GlideCoreTag from './tag.js';

@customElement('glide-core-subclassed')
class GlideCoreSubclassed extends GlideCoreTag {}

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-tag')).to.equal(GlideCoreTag);
});

it('is accessible', async () => {
  const host = await fixture<GlideCoreTag>(
    html`<glide-core-tag label="Label"></glide-core-tag>`,
  );

  const tag = host?.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="component"]',
  );

  assert(tag);

  const timeout = tag.dataset.animationDuration;
  assert(timeout);

  // Tag animates its opacity when added to the page. We wait for the animation
  // to complete to avoid a color contrast violation.
  await aTimeout(Number(timeout));

  await expect(host).to.be.accessible();

  host.removable = true;
  await host.updateComplete;

  await expect(host).to.be.accessible();
});

it('can be removable', async () => {
  const host = await fixture(
    html`<glide-core-tag label="Label" removable></glide-core-tag>`,
  );

  const button = host.shadowRoot?.querySelector('[data-test="removal-button"]');

  expect(button?.checkVisibility()).to.be.true;
  expect(button?.ariaLabel).to.equal('Remove tag: Label');
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
