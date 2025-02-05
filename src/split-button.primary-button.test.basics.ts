import { expect, fixture, html } from '@open-wc/testing';
import { customElement } from 'lit/decorators.js';
import sinon from 'sinon';
import GlideCoreSplitButtonPrimaryButton from './split-button.primary-button.js';

@customElement('glide-core-subclassed')
class GlideCoreSubclassed extends GlideCoreSplitButtonPrimaryButton {}

it('registers itself', async () => {
  expect(
    window.customElements.get('glide-core-split-button-primary-button'),
  ).to.equal(GlideCoreSplitButtonPrimaryButton);
});

it('is accessible', async () => {
  const host = await fixture<GlideCoreSplitButtonPrimaryButton>(html`
    <glide-core-split-button-primary-button
      label="Label"
    ></glide-core-split-button-primary-button>
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
