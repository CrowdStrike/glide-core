/* eslint-disable @typescript-eslint/no-unused-expressions */

import './radio-group.radio.js';
import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import GlideCoreRadio from './radio-group.radio.js';

GlideCoreRadio.shadowRootOptions.mode = 'open';

it('registers', async () => {
  expect(window.customElements.get('glide-core-radio')).to.equal(
    GlideCoreRadio,
  );
});

it('is accessible', async () => {
  const component = await fixture<GlideCoreRadio>(html`
    <glide-core-radio value="one" label="One"></glide-core-radio>
  `);

  await expect(component).to.be.accessible();
});

it('renders the provided `label`', async () => {
  const component = await fixture<GlideCoreRadio>(html`
    <glide-core-radio value="one" label="One"></glide-core-radio>
  `);

  await elementUpdated(component);

  expect(
    component.shadowRoot
      ?.querySelector('[data-test="component"]')
      ?.textContent?.trim(),
  ).to.equal('One');
});

it('sets the host `aria-checked` attribute via `checked`', async () => {
  const component = await fixture<GlideCoreRadio>(html`
    <glide-core-radio value="one" label="One" checked></glide-core-radio>
  `);

  expect(component.getAttribute('aria-checked')).to.equal('true');

  component.checked = false;

  expect(component.getAttribute('aria-checked')).to.equal('false');
});

it('sets the host `aria-disabled` via `disabled`', async () => {
  const component = await fixture<GlideCoreRadio>(html`
    <glide-core-radio value="one" label="One" disabled></glide-core-radio>
  `);

  expect(component.getAttribute('aria-disabled')).to.equal('true');

  component.disabled = false;

  expect(component.getAttribute('aria-disabled')).to.equal('false');
});

it('sets the host `aria-invalid` via `privateInvalid`', async () => {
  const component = await fixture<GlideCoreRadio>(html`
    <glide-core-radio value="one" label="One" privateInvalid></glide-core-radio>
  `);

  expect(component.getAttribute('aria-invalid')).to.equal('true');

  component.privateInvalid = false;

  expect(component.getAttribute('aria-invalid')).to.equal('false');
});

it('sets the host `aria-required` via `required`', async () => {
  const component = await fixture<GlideCoreRadio>(html`
    <glide-core-radio
      value="one"
      label="One"
      privateRequired
    ></glide-core-radio>
  `);

  expect(component.getAttribute('aria-required')).to.equal('true');

  component.privateRequired = false;

  expect(component.getAttribute('aria-required')).to.equal('false');
});

it('sets the host `aria-label` via `label`', async () => {
  const component = await fixture<GlideCoreRadio>(html`
    <glide-core-radio value="one" label="One"></glide-core-radio>
  `);

  expect(component.getAttribute('aria-label')).to.equal('One');

  component.label = 'Updated';

  expect(component.getAttribute('aria-label')).to.equal('Updated');
});
