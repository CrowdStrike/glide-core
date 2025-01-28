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
  const component = await fixture<GlideCoreRadioGroupRadio>(html`
    <glide-core-radio-group-radio label="One"></glide-core-radio-group-radio>
  `);

  await expect(component).to.be.accessible();
});

it('renders the provided `label`', async () => {
  const component = await fixture<GlideCoreRadioGroupRadio>(html`
    <glide-core-radio-group-radio label="One"></glide-core-radio-group-radio>
  `);

  await component.updateComplete;

  expect(
    component.shadowRoot
      ?.querySelector('[data-test="component"]')
      ?.textContent?.trim(),
  ).to.equal('One');
});

it('sets `aria-checked` on the host when `checked`', async () => {
  const component = await fixture<GlideCoreRadioGroupRadio>(html`
    <glide-core-radio-group-radio
      label="One"
      checked
    ></glide-core-radio-group-radio>
  `);

  expect(component.getAttribute('aria-checked')).to.equal('true');

  component.checked = false;

  expect(component.getAttribute('aria-checked')).to.equal('false');
});

it('sets `aria-disabled` on the host when `disabled`', async () => {
  const component = await fixture<GlideCoreRadioGroupRadio>(html`
    <glide-core-radio-group-radio
      label="One"
      disabled
    ></glide-core-radio-group-radio>
  `);

  expect(component.getAttribute('aria-disabled')).to.equal('true');

  component.disabled = false;

  expect(component.getAttribute('aria-disabled')).to.equal('false');
});

it('sets `aria-invalid` on the host when `privateInvalid`', async () => {
  const component = await fixture<GlideCoreRadioGroupRadio>(html`
    <glide-core-radio-group-radio
      label="One"
      privateInvalid
    ></glide-core-radio-group-radio>
  `);

  expect(component.getAttribute('aria-invalid')).to.equal('true');

  component.privateInvalid = false;

  expect(component.getAttribute('aria-invalid')).to.equal('false');
});

it('sets `aria-required` on the host when `required`', async () => {
  const component = await fixture<GlideCoreRadioGroupRadio>(html`
    <glide-core-radio-group-radio
      label="One"
      privateRequired
    ></glide-core-radio-group-radio>
  `);

  expect(component.getAttribute('aria-required')).to.equal('true');

  component.privateRequired = false;

  expect(component.getAttribute('aria-required')).to.equal('false');
});

it('sets `aria-label` on the host via `label`', async () => {
  const component = await fixture<GlideCoreRadioGroupRadio>(html`
    <glide-core-radio-group-radio label="One"></glide-core-radio-group-radio>
  `);

  expect(component.getAttribute('aria-label')).to.equal('One');

  component.label = 'Updated';

  expect(component.getAttribute('aria-label')).to.equal('Updated');
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
