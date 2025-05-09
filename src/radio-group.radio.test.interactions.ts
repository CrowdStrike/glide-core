import { expect, fixture, html } from '@open-wc/testing';
import RadioGroupRadio from './radio-group.radio.js';

it('sets `aria-checked` on the host when checked programmatically', async () => {
  const host = await fixture<RadioGroupRadio>(html`
    <glide-core-radio-group-radio label="Label"></glide-core-radio-group-radio>
  `);

  host.checked = false;
  expect(host.ariaChecked).to.equal('false');
});

it('sets `aria-checked` on the host when checked and enabled programmatically', async () => {
  const host = await fixture<RadioGroupRadio>(html`
    <glide-core-radio-group-radio
      label="Label"
      checked
      disabled
    ></glide-core-radio-group-radio>
  `);

  host.disabled = false;
  expect(host.ariaChecked).to.equal('true');
});

it('sets `aria-checked` on the host when checked and disabled programmatically', async () => {
  const host = await fixture<RadioGroupRadio>(html`
    <glide-core-radio-group-radio
      label="Label"
      checked
    ></glide-core-radio-group-radio>
  `);

  host.disabled = true;
  expect(host.ariaChecked).to.equal('false');
});

it('sets `aria-disabled` on the host when disabled programmatically', async () => {
  const host = await fixture<RadioGroupRadio>(html`
    <glide-core-radio-group-radio label="Label"></glide-core-radio-group-radio>
  `);

  host.disabled = false;
  expect(host.ariaDisabled).to.equal('false');
});

it('sets `aria-invalid` on the host when made invalid programmatically', async () => {
  const host = await fixture<RadioGroupRadio>(html`
    <glide-core-radio-group-radio label="Label"></glide-core-radio-group-radio>
  `);

  host.privateInvalid = true;
  expect(host.ariaInvalid).to.equal('true');
});

it('sets `aria-required` on the host when made required programmatically', async () => {
  const host = await fixture<RadioGroupRadio>(html`
    <glide-core-radio-group-radio label="Label"></glide-core-radio-group-radio>
  `);

  host.privateRequired = true;
  expect(host.ariaRequired).to.equal('true');
});

it('sets `aria-label` on the host when its label is set programmatically', async () => {
  const host = await fixture<RadioGroupRadio>(html`
    <glide-core-radio-group-radio label="Label"></glide-core-radio-group-radio>
  `);

  host.label = 'Two';
  expect(host.ariaLabel).to.equal('Two');
});
