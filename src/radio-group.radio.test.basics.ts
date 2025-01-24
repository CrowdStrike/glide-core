import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreRadioGroupRadio from './radio-group.radio.js';

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-radio-group-radio')).to.equal(
    GlideCoreRadioGroupRadio,
  );
});

it('is accessible', async () => {
  const component = await fixture<GlideCoreRadioGroupRadio>(html`
    <glide-core-radio-group-radio label="One"></glide-core-radio-group-radio>
  `);

  await expect(component).to.be.accessible();
});

it('sets `aria-checked` on the host', async () => {
  const component = await fixture<GlideCoreRadioGroupRadio>(html`
    <glide-core-radio-group-radio
      label="One"
      checked
    ></glide-core-radio-group-radio>
  `);

  expect(component.ariaChecked).to.equal('true');
});

it('sets `aria-disabled on the host`', async () => {
  const component = await fixture<GlideCoreRadioGroupRadio>(html`
    <glide-core-radio-group-radio
      label="One"
      disabled
    ></glide-core-radio-group-radio>
  `);

  expect(component.ariaDisabled).to.equal('true');
});

it('sets `aria-invalid` on the host`', async () => {
  const component = await fixture<GlideCoreRadioGroupRadio>(html`
    <glide-core-radio-group-radio
      label="One"
      privateInvalid
    ></glide-core-radio-group-radio>
  `);

  expect(component.ariaInvalid).to.equal('true');
});

it('sets `aria-required` on the host', async () => {
  const component = await fixture<GlideCoreRadioGroupRadio>(html`
    <glide-core-radio-group-radio
      label="One"
      privateRequired
    ></glide-core-radio-group-radio>
  `);

  expect(component.ariaRequired).to.equal('true');
});

it('sets `aria-label` on the host', async () => {
  const component = await fixture<GlideCoreRadioGroupRadio>(html`
    <glide-core-radio-group-radio label="One"></glide-core-radio-group-radio>
  `);

  expect(component.ariaLabel).to.equal('One');
});
