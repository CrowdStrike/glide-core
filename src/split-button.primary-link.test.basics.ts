import { expect, fixture, html } from '@open-wc/testing';
import { customElement } from 'lit/decorators.js';
import sinon from 'sinon';
import SplitButtonPrimaryLink from './split-button.primary-link.js';

@customElement('glide-core-subclassed')
class Subclassed extends SplitButtonPrimaryLink {}

it('registers itself', async () => {
  expect(
    window.customElements.get('glide-core-split-button-primary-link'),
  ).to.equal(SplitButtonPrimaryLink);
});

it('is accessible', async () => {
  const host = await fixture<SplitButtonPrimaryLink>(html`
    <glide-core-split-button-primary-link
      label="Label"
      href="/"
    ></glide-core-split-button-primary-link>
  `);

  await expect(host).to.be.accessible();

  host.disabled = true;
  await host.updateComplete;

  await expect(host).to.be.accessible();
});

it('throws when `label` is empty', async () => {
  const spy = sinon.spy();

  try {
    await fixture(
      html`<glide-core-split-button-primary-link>
      </glide-core-split-button-primary-link>`,
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
