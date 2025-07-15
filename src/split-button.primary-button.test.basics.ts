import { expect, fixture, html } from '@open-wc/testing';
import { customElement } from 'lit/decorators.js';
import sinon from 'sinon';
import SplitButtonPrimaryButton from './split-button.primary-button.js';

@customElement('glide-core-subclassed')
class Subclassed extends SplitButtonPrimaryButton {}

it('registers itself', async () => {
  expect(
    window.customElements.get('glide-core-split-button-primary-button'),
  ).to.equal(SplitButtonPrimaryButton);
});

it('is accessible', async () => {
  const host = await fixture<SplitButtonPrimaryButton>(html`
    <glide-core-split-button-primary-button
      label="Label"
    ></glide-core-split-button-primary-button>
  `);

  await expect(host).to.be.accessible();

  host.disabled = true;
  await host.updateComplete;

  await expect(host).to.be.accessible();
});

it('throws when `label` is undefined', async () => {
  const spy = sinon.spy();

  try {
    await fixture(
      html`<glide-core-split-button-primary-button></glide-core-split-button-primary-button>`,
    );
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
