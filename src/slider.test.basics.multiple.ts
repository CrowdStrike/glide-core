import { expect, fixture, html } from '@open-wc/testing';
import Slider from './slider.js';

it('is accessible ', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" multiple></glide-core-slider>`,
  );

  await expect(host).to.be.accessible();
});

it('sets `value` when one is not provided to 25/75% of the range size', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      max="100"
      multiple
    ></glide-core-slider>`,
  );

  await expect(host.value).to.deep.equal([25, 75]);
});

it('sets the value of its <input>s from `value`', async () => {
  const host = await fixture<Slider>(
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

it('sets `min` on the minimum input', async () => {
  const host = await fixture<Slider>(
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

it('sets `max` on the maximum input', async () => {
  const host = await fixture<Slider>(
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

it('sets `min` on the maximum input based on the current minimum value + `step`', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      step="20"
      .value=${[20, 60]}
      multiple
    ></glide-core-slider>`,
  );

  const maximumInput = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="maximum-input"]',
  );

  expect(maximumInput?.getAttribute('min')).to.equal('40');
});

it('sets `step` on the minimum input', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      step="10"
      multiple
    ></glide-core-slider>`,
  );

  const minimumInput = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="minimum-input"]',
  );

  expect(minimumInput?.getAttribute('step')).to.equal('10');
});

it('sets `step` on the maximum input', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      step="10"
      multiple
    ></glide-core-slider>`,
  );

  const maximumInput = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="maximum-input"]',
  );

  expect(maximumInput?.getAttribute('step')).to.equal('10');
});

it('sets `max` on the maximum input', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      max="200"
      multiple
    ></glide-core-slider>`,
  );

  const maximumInput = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="maximum-input"]',
  );

  expect(maximumInput?.getAttribute('max')).to.equal('200');
});

it('sets `max` on the minimum input based on the current maximum value - `step`', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      step="20"
      .value=${[20, 60]}
      multiple
    ></glide-core-slider>`,
  );

  const minimumInput = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="minimum-input"]',
  );

  expect(minimumInput?.getAttribute('max')).to.equal('40');
});

it('sets `aria-valuemin` on the minimum handle as `min`', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      min="20"
      multiple
    ></glide-core-slider>`,
  );

  const minimumHandle = host.shadowRoot?.querySelector(
    '[data-test="minimum-handle"]',
  );

  expect(minimumHandle?.getAttribute('aria-valuemin')).to.equal('20');
});

it('sets `aria-valuemin` on the maximum handle as `min`', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      min="20"
      multiple
    ></glide-core-slider>`,
  );

  const maximumHandle = host.shadowRoot?.querySelector(
    '[data-test="maximum-handle"]',
  );

  expect(maximumHandle?.getAttribute('aria-valuemin')).to.equal('20');
});

it('sets `aria-valuemax` on the minimum handle as `max`', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      max="200"
      multiple
    ></glide-core-slider>`,
  );

  const minimumHandle = host.shadowRoot?.querySelector(
    '[data-test="minimum-handle"]',
  );

  expect(minimumHandle?.getAttribute('aria-valuemax')).to.equal('200');
});

it('sets `aria-valuemax` on the maximum handle as `max`', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      max="200"
      multiple
    ></glide-core-slider>`,
  );

  const maximumHandle = host.shadowRoot?.querySelector(
    '[data-test="maximum-handle"]',
  );

  expect(maximumHandle?.getAttribute('aria-valuemax')).to.equal('200');
});

it('sets `aria-valuenow` on the minimum handle as the minimum value of `value`', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      .value=${[7, 99]}
      multiple
    ></glide-core-slider>`,
  );

  const minimumHandle = host.shadowRoot?.querySelector(
    '[data-test="minimum-handle"]',
  );

  expect(minimumHandle?.getAttribute('aria-valuenow')).to.equal('7');
});

it('sets `aria-valuenow` on the maximum handle as the maximum value of `value`', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      .value=${[7, 99]}
      multiple
    ></glide-core-slider>`,
  );

  const maximumHandle = host.shadowRoot?.querySelector(
    '[data-test="maximum-handle"]',
  );

  expect(maximumHandle?.getAttribute('aria-valuenow')).to.equal('99');
});

it('sets the minimum and maximum inputs to disabled when `disabled`', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      disabled
      multiple
    ></glide-core-slider>`,
  );

  const minimumInput = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="minimum-input"]',
  );

  const maximumInput = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="maximum-input"]',
  );

  expect(minimumInput?.hasAttribute('disabled')).to.be.true;
  expect(maximumInput?.hasAttribute('disabled')).to.be.true;
});

it('sets the minimum and maximum inputs to readonly when `readonly`', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      multiple
      readonly
    ></glide-core-slider>`,
  );

  const minimumInput = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="minimum-input"]',
  );

  const maximumInput = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="maximum-input"]',
  );

  expect(minimumInput?.hasAttribute('readonly')).to.be.true;
  expect(maximumInput?.hasAttribute('readonly')).to.be.true;
});

it('sets the minimum and maximum handles to aria-disabled when `disabled`', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      disabled
      multiple
    ></glide-core-slider>`,
  );

  const minimumHandle = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="minimum-handle"]',
  );

  const maximumHandle = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="maximum-handle"]',
  );

  expect(minimumHandle?.hasAttribute('aria-disabled')).to.be.true;
  expect(maximumHandle?.hasAttribute('aria-disabled')).to.be.true;
});

it('sets the minimum and maximum handles to aria-readonly when `readonly`', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      multiple
      readonly
    ></glide-core-slider>`,
  );

  const minimumHandle = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="minimum-handle"]',
  );

  const maximumHandle = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="maximum-handle"]',
  );

  expect(minimumHandle?.hasAttribute('aria-readonly')).to.be.true;
  expect(maximumHandle?.hasAttribute('aria-readonly')).to.be.true;
});

it('hides the single input and handle', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" multiple></glide-core-slider>`,
  );

  const singleInput = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="single-input"]',
  );

  const singleHandle = host.shadowRoot?.querySelector(
    '[data-test="single-handle"]',
  );

  expect(singleInput?.checkVisibility()).to.not.be.ok;
  expect(singleHandle?.checkVisibility()).to.not.be.ok;
});
