import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreSlider from './slider.js';

it('is accessible ', async () => {
  const host = await fixture<GlideCoreSlider>(
    html`<glide-core-slider label="Label" multiple></glide-core-slider>`,
  );

  await expect(host).to.be.accessible();
});

// TONY TODO
it('sets `value` when one is not provided to 50% of max', async () => {});

it('sets the value of its <input>s from `value`', async () => {
  const host = await fixture<GlideCoreSlider>(
    html`<glide-core-slider
      label="Label"
      multiple
      .value=${[5, 99]}
    ></glide-core-slider>`,
  );

  const minimumInput = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="minimum-input"]',
  );

  expect(minimumInput?.value).to.equal('5');

  const maximumInput = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="maximum-input"]',
  );

  expect(maximumInput?.value).to.equal('99');
});

it('uses "min" to set "min" on the minimum-input', async () => {
  const host = await fixture<GlideCoreSlider>(
    html`<glide-core-slider
      label="Label"
      min="10"
      multiple
    ></glide-core-slider>`,
  );

  const minimumInput = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="minimum-input"]',
  );

  expect(minimumInput?.min).to.equal('10');
});

it('sets "min"', async () => {
  const host = await fixture<GlideCoreSlider>(
    html`<glide-core-slider
      label="Label"
      min="10"
      multiple
    ></glide-core-slider>`,
  );

  const minimumInput = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="minimum-input"]',
  );

  expect(minimumInput?.min).to.equal('10');
});

it('sets "max"', async () => {
  const host = await fixture<GlideCoreSlider>(
    html`<glide-core-slider
      label="Label"
      max="99"
      multiple
    ></glide-core-slider>`,
  );

  const maximumInput = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="maximum-input"]',
  );

  expect(maximumInput?.max).to.equal('99');
});
