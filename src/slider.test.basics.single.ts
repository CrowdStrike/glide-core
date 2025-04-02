import { expect, fixture, html } from '@open-wc/testing';
import Slider from './slider.js';

it('is accessible ', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label"></glide-core-slider>`,
  );

  await expect(host).to.be.accessible();
});

it('sets `value` when one is not provided to 25%', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" max="100"></glide-core-slider>`,
  );

  await expect(host.value).to.deep.equal([25]);
});

it('sets the value of its <input> from `value`', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" .value=${[99]}></glide-core-slider>`,
  );

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="single-input"]',
  );

  expect(input?.value).to.equal('99');
});

it('sets "min"', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" min="10"></glide-core-slider>`,
  );

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="single-input"]',
  );

  expect(input?.min).to.equal('10');
});

it('sets "max"', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" max="90"></glide-core-slider>`,
  );

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="single-input"]',
  );

  expect(input?.max).to.equal('90');
});
