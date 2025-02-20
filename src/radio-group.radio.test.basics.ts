import { expect, fixture, html } from '@open-wc/testing';
import { customElement } from 'lit/decorators.js';
import sinon from 'sinon';
import GlideCoreRadioGroupRadio from './radio-group.radio.js';

@customElement('glide-core-subclassed')
class GlideCoreSubclassed extends GlideCoreRadioGroupRadio {}

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-radio-group-radio')).to.equal(
    GlideCoreRadioGroupRadio,
  );
});

it('is accessible', async () => {
  const host = await fixture<GlideCoreRadioGroupRadio>(html`
    <glide-core-radio-group-radio label="Label"></glide-core-radio-group-radio>
  `);

  await expect(host).to.be.accessible();
});

it('sets `aria-checked` on the host', async () => {
  const host = await fixture<GlideCoreRadioGroupRadio>(html`
    <glide-core-radio-group-radio
      label="Label"
      checked
    ></glide-core-radio-group-radio>
  `);

  expect(host.ariaChecked).to.equal('true');
});

it('sets `aria-disabled on the host`', async () => {
  const host = await fixture<GlideCoreRadioGroupRadio>(html`
    <glide-core-radio-group-radio
      label="Label"
      disabled
    ></glide-core-radio-group-radio>
  `);

  expect(host.ariaDisabled).to.equal('true');
});

it('sets `aria-invalid` on the host`', async () => {
  const host = await fixture<GlideCoreRadioGroupRadio>(html`
    <glide-core-radio-group-radio
      label="Label"
      privateInvalid
    ></glide-core-radio-group-radio>
  `);

  expect(host.ariaInvalid).to.equal('true');
});

it('sets `aria-required` on the host', async () => {
  const host = await fixture<GlideCoreRadioGroupRadio>(html`
    <glide-core-radio-group-radio
      label="Label"
      privateRequired
    ></glide-core-radio-group-radio>
  `);

  expect(host.ariaRequired).to.equal('true');
});

it('sets `aria-label` on the host', async () => {
  const host = await fixture<GlideCoreRadioGroupRadio>(html`
    <glide-core-radio-group-radio label="Label"></glide-core-radio-group-radio>
  `);

  expect(host.ariaLabel).to.equal('Label');
});

it('throws when `label` is empty', async () => {
  const spy = sinon.spy();

  try {
    await fixture(
      html`<glide-core-radio-group-radio></glide-core-radio-group-radio>`,
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
