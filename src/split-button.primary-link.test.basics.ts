import { expect, fixture, html } from '@open-wc/testing';
import { customElement } from 'lit/decorators.js';
import sinon from 'sinon';
import GlideCoreSplitButtonPrimaryLink from './split-button.primary-link.js';

@customElement('glide-core-subclassed')
class GlideCoreSubclassed extends GlideCoreSplitButtonPrimaryLink {}

it('registers itself', async () => {
  expect(
    window.customElements.get('glide-core-split-button-primary-link'),
  ).to.equal(GlideCoreSplitButtonPrimaryLink);
});

it('is accessible', async () => {
  const host = await fixture<GlideCoreSplitButtonPrimaryLink>(html`
    <glide-core-split-button-primary-link
      label="Label"
      url="/"
    ></glide-core-split-button-primary-link>
  `);

  await expect(host).to.be.accessible();

  host.disabled = true;
  await host.updateComplete;

  await expect(host).to.be.accessible();
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
