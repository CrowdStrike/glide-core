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

it('sets `min` on the input', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" min="10"></glide-core-slider>`,
  );

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="single-input"]',
  );

  expect(input?.min).to.equal('10');
});

it('sets `max` on the input', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" max="90"></glide-core-slider>`,
  );

  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="single-input"]',
  );

  expect(input?.max).to.equal('90');
});

it('sets `min` on the input', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" min="10"></glide-core-slider>`,
  );

  const singleInput = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="single-input"]',
  );

  expect(singleInput?.getAttribute('min')).to.equal('10');
});

it('sets `step` on the input', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" step="10"></glide-core-slider>`,
  );

  const singleInput = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="single-input"]',
  );

  expect(singleInput?.getAttribute('step')).to.equal('10');
});

it('sets `max` on the input', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" max="200"></glide-core-slider>`,
  );

  const singleInput = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="single-input"]',
  );

  expect(singleInput?.getAttribute('max')).to.equal('200');
});

it('sets `aria-valuemin` on the handle as `min`', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" min="20"></glide-core-slider>`,
  );

  const singleHandle = host.shadowRoot?.querySelector(
    '[data-test="single-handle"]',
  );

  expect(singleHandle?.getAttribute('aria-valuemin')).to.equal('20');
});

it('sets `aria-valuemax` on the minimum handle as `max`', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" max="200"></glide-core-slider>`,
  );

  const singleHandle = host.shadowRoot?.querySelector(
    '[data-test="single-handle"]',
  );

  expect(singleHandle?.getAttribute('aria-valuemax')).to.equal('200');
});

it('sets `aria-valuenow` on the handle as `value`', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" .value=${[7]}></glide-core-slider>`,
  );

  const singleHandle = host.shadowRoot?.querySelector(
    '[data-test="single-handle"]',
  );

  expect(singleHandle?.getAttribute('aria-valuenow')).to.equal('7');
});

it('sets the input to disabled when `disabled`', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" disabled></glide-core-slider>`,
  );

  const singleInput = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="single-input"]',
  );

  expect(singleInput?.hasAttribute('disabled')).to.be.true;
});

it('sets the input to readonly when `readonly`', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" readonly></glide-core-slider>`,
  );

  const singleInput = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="single-input"]',
  );

  expect(singleInput?.hasAttribute('readonly')).to.be.true;
});

it('sets the handle to aria-disabled when `disabled`', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" disabled></glide-core-slider>`,
  );

  const singleHandle = host.shadowRoot?.querySelector(
    '[data-test="single-handle"]',
  );

  expect(singleHandle?.hasAttribute('aria-disabled')).to.be.true;
});

it('sets the handle to aria-readonly when `readonly`', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" readonly></glide-core-slider>`,
  );

  const singleHandle = host.shadowRoot?.querySelector(
    '[data-test="single-handle"]',
  );

  expect(singleHandle?.hasAttribute('aria-readonly')).to.be.true;
});

it('hides the minimum and maximum inputs and handles', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label"></glide-core-slider>`,
  );

  const maximumInput = host.shadowRoot?.querySelector(
    '[data-test="maximum-input"]',
  );

  const minimumInput = host.shadowRoot?.querySelector(
    '[data-test="minimum-input"]',
  );

  const maximumHandle = host.shadowRoot?.querySelector(
    '[data-test="maximum-handle"]',
  );

  const minimumHandle = host.shadowRoot?.querySelector(
    '[data-test="minimum-handle"]',
  );

  expect(maximumInput?.checkVisibility()).to.not.be.ok;
  expect(minimumInput?.checkVisibility()).to.not.be.ok;

  expect(maximumHandle?.checkVisibility()).to.not.be.ok;
  expect(minimumHandle?.checkVisibility()).to.not.be.ok;
});
