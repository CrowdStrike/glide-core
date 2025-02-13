import sinon from 'sinon';
import { expect, fixture, html } from '@open-wc/testing';
import { customElement } from 'lit/decorators.js';
import GlideCoreButton from './button.js';

@customElement('glide-core-subclassed')
class GlideCoreSubclassed extends GlideCoreButton {}

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-button')).to.equal(
    GlideCoreButton,
  );
});

it('is accessible', async () => {
  const host = await fixture(
    html`<glide-core-button label="Label"></glide-core-button>`,
  );

  await expect(host).to.be.accessible();
});

it('has `#onPrefixIconSlotChange` coverage', async () => {
  await fixture<GlideCoreButton>(html`
    <glide-core-button label="Label">
      <span slot="prefix-icon">Prefix</span>
    </glide-core-button>
  `);
});

it('has `#onSuffixIconSlotChange` coverage', async () => {
  await fixture<GlideCoreButton>(html`
    <glide-core-button label="Label">
      <span slot="suffix-icon">Suffix</span>
    </glide-core-button>
  `);
});

it('throws when `label` is empty', async () => {
  const spy = sinon.spy();

  try {
    await fixture<GlideCoreButton>(
      html`<glide-core-button></glide-core-button>`,
    );
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
