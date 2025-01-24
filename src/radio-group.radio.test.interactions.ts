import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreRadioGroupRadio from './radio-group.radio.js';

it('sets `aria-checked` on the host', async () => {
  const component = await fixture<GlideCoreRadioGroupRadio>(html`
    <glide-core-radio-group-radio label="One"></glide-core-radio-group-radio>
  `);

  component.checked = false;
  expect(component.ariaChecked).to.equal('false');
});

it('sets `aria-disabled` on the host', async () => {
  const component = await fixture<GlideCoreRadioGroupRadio>(html`
    <glide-core-radio-group-radio label="One"></glide-core-radio-group-radio>
  `);

  component.disabled = false;
  expect(component.ariaDisabled).to.equal('false');
});

it('sets `aria-invalid` on the host', async () => {
  const component = await fixture<GlideCoreRadioGroupRadio>(html`
    <glide-core-radio-group-radio label="One"></glide-core-radio-group-radio>
  `);

  component.privateInvalid = true;
  expect(component.ariaInvalid).to.equal('true');
});

it('sets `aria-required` on the host', async () => {
  const component = await fixture<GlideCoreRadioGroupRadio>(html`
    <glide-core-radio-group-radio label="One"></glide-core-radio-group-radio>
  `);

  component.privateRequired = true;
  expect(component.ariaRequired).to.equal('true');
});

it('sets `aria-label` on the host', async () => {
  const component = await fixture<GlideCoreRadioGroupRadio>(html`
    <glide-core-radio-group-radio label="One"></glide-core-radio-group-radio>
  `);

  component.label = 'Two';
  expect(component.ariaLabel).to.equal('Two');
});
