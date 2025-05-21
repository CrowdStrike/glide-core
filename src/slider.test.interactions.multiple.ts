import { assert, expect, fixture, html } from '@open-wc/testing';
import { resetMouse, sendKeys, sendMouse } from '@web/test-runner-commands';
import sinon from 'sinon';
import Slider from './slider.js';
import { hover } from './library/mouse.js';

// You'd think you'd be able to call `resetMouse()` anywhere. But, for whatever
// reason, calling it outside `afterEach()` results in sporadic bouts of the
// following error via Playwright:
//
// "mouse.move: Target page, context or browser has been closed".
afterEach(async () => {
  await resetMouse();
});

it('updates all relevant elements when `max` is set programmatically', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      .value=${[30, 60]}
      multiple
    ></glide-core-slider>`,
  );

  host.max = 80;
  await host.updateComplete;

  const maximumInput = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="maximum-input"]',
  );

  const minimumHandle = host.shadowRoot?.querySelector(
    '[data-test="minimum-handle"]',
  );

  const maximumHandle = host.shadowRoot?.querySelector(
    '[data-test="maximum-handle"]',
  );

  expect(maximumInput?.max).to.equal('80');
  expect(maximumHandle?.getAttribute('aria-valuemax')).to.equal('80');
  expect(minimumHandle?.getAttribute('aria-valuemax')).to.equal('80');
});

it('adjusts minimum and maximum values when `max` is lowered programmatically below `min`', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      .value=${[30, 80]}
      multiple
    ></glide-core-slider>`,
  );

  host.max = 25;
  await host.updateComplete;

  // Maximum becomes the max.
  // Minimum becomes the max minus step = 24.
  expect(host.value).to.deep.equal([24, 25]);

  const minimumInput = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="minimum-input"]',
  );

  const maximumInput = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="maximum-input"]',
  );

  expect(minimumInput?.value).to.equal('24');
  expect(maximumInput?.value).to.equal('25');
});

it('clamps the maximum value to `max` but keeps the minimum unchanged when `max` is set programmatically', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      .value=${[30, 70]}
      multiple
    ></glide-core-slider>`,
  );

  host.max = 40;
  await host.updateComplete;

  expect(host.value).to.deep.equal([30, 40]);
});

it('updates all relevant elements when `min` is set programmatically', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      multiple
      .value=${[30, 60]}
    ></glide-core-slider>`,
  );

  host.min = 20;
  await host.updateComplete;

  const minimumInput = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="minimum-input"]',
  );

  const minimumHandle = host.shadowRoot?.querySelector(
    '[data-test="minimum-handle"]',
  );

  const maximumHandle = host.shadowRoot?.querySelector(
    '[data-test="maximum-handle"]',
  );

  expect(minimumInput?.min).to.equal('20');
  expect(minimumHandle?.getAttribute('aria-valuemin')).to.equal('20');
  expect(maximumHandle?.getAttribute('aria-valuemin')).to.equal('20');
});

it('adjusts minimum and maximum values when `min` is raised programmatically above `max`', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      multiple
      .value=${[20, 40]}
    ></glide-core-slider>`,
  );

  // Set min above both current values.
  host.min = 45;
  await host.updateComplete;

  // Minimum becomes the min.
  // Maximum becomes the min plus step = 46
  expect(host.value).to.deep.equal([45, 46]);

  const minimumInput = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="minimum-input"]',
  );

  const maximumInput = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="maximum-input"]',
  );

  expect(minimumInput?.value).to.equal('45');
  expect(maximumInput?.value).to.equal('46');
});

it('clamps the minimum value but keeps the maximum unchanged when `min` is set programmatically', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      multiple
      .value=${[30, 70]}
    ></glide-core-slider>`,
  );

  host.min = 40;
  await host.updateComplete;

  expect(host.value).to.deep.equal([40, 70]);
});

it('respects the min/max bounds by ensuring the values do not exceed them', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      max="80"
      min="20"
      multiple
    ></glide-core-slider>`,
  );

  host.value = [0, 100];

  await host.updateComplete;

  expect(host.value).to.deep.equal([20, 80]);
});

it('updates the minimum value when entering text in the minimum input', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" multiple></glide-core-slider>`,
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: '10' });

  const minimumInput = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="minimum-input"]',
  );

  expect(minimumInput?.value).to.equal('10');
  expect(host.value).to.deep.equal([10, 75]);
});

it('updates the maximum value when entering text in the maximum input', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" multiple></glide-core-slider>`,
  );

  const maximumInput = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="maximum-input"]',
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'Tab' });

  await sendKeys({ type: '90' });

  expect(maximumInput?.value).to.equal('90');
  expect(host.value).to.deep.equal([25, 90]);
});

it('uses `step` to round up when an entered minimum value falls outside of the step on blur', async () => {
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

  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: '16' });

  minimumInput?.blur();

  await host.updateComplete;

  expect(minimumInput?.value).to.equal('20');
  expect(host.value).to.deep.equal([20, 75]);
});

it('uses `step` to round down when an entered value falls outside of the step with minimum input on blur', async () => {
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

  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: '14' });

  minimumInput?.blur();

  await host.updateComplete;

  expect(minimumInput?.value).to.equal('10');
  expect(host.value).to.deep.equal([10, 75]);
});

it('uses `step` to round up when a maximum value falls outside of the step on blur', async () => {
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

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'Tab' });

  await sendKeys({ type: '86' });

  maximumInput?.blur();

  await host.updateComplete;

  expect(maximumInput?.value).to.equal('90');
  expect(host.value).to.deep.equal([25, 90]);
});

it('uses `step` to round down when a maximum value falls outside of the step on blur', async () => {
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

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'Tab' });

  await sendKeys({ type: '84' });

  maximumInput?.blur();

  await host.updateComplete;

  expect(maximumInput?.value).to.equal('80');
  expect(host.value).to.deep.equal([25, 80]);
});

it('uses `step` on ArrowDown on the minimum input', async () => {
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

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowDown' });

  expect(minimumInput?.value).to.equal('20');
  expect(host.value).to.deep.equal([20, 75]);
});

it('uses `step` on ArrowUp on the minimum input', async () => {
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

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowUp' });

  expect(minimumInput?.value).to.equal('30');
  expect(host.value).to.deep.equal([30, 75]);
});

it('decreases by `step` on ArrowLeft on the minimum handle', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      step="10"
      multiple
    ></glide-core-slider>`,
  );

  const minimumHandle = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="minimum-handle"]',
  );

  minimumHandle?.focus();

  await sendKeys({ press: 'ArrowLeft' });

  expect(host.value).to.deep.equal([15, 75]);
});

it('decreases by `step` on ArrowDown on the minimum handle', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      step="10"
      multiple
    ></glide-core-slider>`,
  );

  const minimumHandle = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="minimum-handle"]',
  );

  minimumHandle?.focus();

  await sendKeys({ press: 'ArrowDown' });

  expect(host.value).to.deep.equal([15, 75]);
});

it('increases by `step` on ArrowRight on the minimum handle', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      step="10"
      multiple
    ></glide-core-slider>`,
  );

  const minimumHandle = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="minimum-handle"]',
  );

  minimumHandle?.focus();

  await sendKeys({ press: 'ArrowRight' });

  expect(host.value).to.deep.equal([35, 75]);
});

it('increases by `step` on ArrowUp on the minimum handle', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      step="10"
      multiple
    ></glide-core-slider>`,
  );

  const minimumHandle = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="minimum-handle"]',
  );

  minimumHandle?.focus();

  await sendKeys({ press: 'ArrowUp' });

  expect(host.value).to.deep.equal([35, 75]);
});

it('decreases by x10 `step` on PageDown on the minimum handle', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      step="2"
      multiple
    ></glide-core-slider>`,
  );

  const minimumHandle = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="minimum-handle"]',
  );

  minimumHandle?.focus();

  await sendKeys({ press: 'PageDown' });

  expect(host.value).to.deep.equal([5, 75]);
});

it('increases by x10 `step` on PageDown on the minimum handle', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      step="2"
      multiple
    ></glide-core-slider>`,
  );

  const minimumHandle = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="minimum-handle"]',
  );

  minimumHandle?.focus();

  await sendKeys({ press: 'PageUp' });

  expect(host.value).to.deep.equal([45, 75]);
});

it('sets the minimum value to `min` on Home on the minimum handle', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" multiple></glide-core-slider>`,
  );

  const minimumHandle = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="minimum-handle"]',
  );

  minimumHandle?.focus();

  await sendKeys({ press: 'Home' });

  expect(host.value).to.deep.equal([0, 75]);
});

it('sets the minimum value to the maximum value minus `step` on End on the minimum handle', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      step="5"
      multiple
    ></glide-core-slider>`,
  );

  const minimumHandle = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="minimum-handle"]',
  );

  minimumHandle?.focus();

  await sendKeys({ press: 'End' });

  expect(host.value).to.deep.equal([70, 75]);
});

it('uses `step` on ArrowDown on the maximum input', async () => {
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

  maximumInput?.focus();

  await sendKeys({ press: 'ArrowDown' });

  expect(maximumInput?.value).to.equal('70');
  expect(host.value).to.deep.equal([25, 70]);
});

it('uses `step` on ArrowUp on the maximum input', async () => {
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

  maximumInput?.focus();

  await sendKeys({ press: 'ArrowUp' });

  expect(maximumInput?.value).to.equal('90');
  expect(host.value).to.deep.equal([25, 90]);
});

it('decreases by `step` on ArrowLeft on the maximum handle', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      step="10"
      multiple
    ></glide-core-slider>`,
  );

  const maximumHandle = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="maximum-handle"]',
  );

  maximumHandle?.focus();

  await sendKeys({ press: 'ArrowLeft' });

  expect(host.value).to.deep.equal([25, 65]);
});

it('decreases by `step` on ArrowDown on the maximum handle', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      step="10"
      multiple
    ></glide-core-slider>`,
  );

  const maximumHandle = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="maximum-handle"]',
  );

  maximumHandle?.focus();

  await sendKeys({ press: 'ArrowDown' });

  expect(host.value).to.deep.equal([25, 65]);
});

it('increases by `step` on ArrowRight on the maximum handle', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      step="10"
      multiple
    ></glide-core-slider>`,
  );

  const maximumHandle = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="maximum-handle"]',
  );

  maximumHandle?.focus();

  await sendKeys({ press: 'ArrowRight' });

  expect(host.value).to.deep.equal([25, 85]);
});

it('increases by `step` on ArrowUp on the maximum handle', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      step="10"
      multiple
    ></glide-core-slider>`,
  );

  const maximumHandle = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="maximum-handle"]',
  );

  maximumHandle?.focus();

  await sendKeys({ press: 'ArrowUp' });

  expect(host.value).to.deep.equal([25, 85]);
});

it('decreases by x10 `step` on PageDown on the maximum handle', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      step="2"
      multiple
    ></glide-core-slider>`,
  );

  const maximumHandle = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="maximum-handle"]',
  );

  maximumHandle?.focus();

  await sendKeys({ press: 'PageDown' });

  expect(host.value).to.deep.equal([25, 55]);
});

it('increases by x10 `step` on PageDown on the maximum handle', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      step="2"
      multiple
    ></glide-core-slider>`,
  );

  const maximumHandle = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="maximum-handle"]',
  );

  maximumHandle?.focus();

  await sendKeys({ press: 'PageUp' });

  expect(host.value).to.deep.equal([25, 95]);
});

it('sets the maximum value to the minimum value plus `step` on Home on the maximum handle', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      step="5"
      multiple
    ></glide-core-slider>`,
  );

  const maximumHandle = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="maximum-handle"]',
  );

  maximumHandle?.focus();

  await sendKeys({ press: 'Home' });

  expect(host.value).to.deep.equal([25, 30]);
});

it('sets the maximum value to `max` on Home on the maximum handle', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      step="5"
      multiple
    ></glide-core-slider>`,
  );

  const maximumHandle = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="maximum-handle"]',
  );

  maximumHandle?.focus();

  await sendKeys({ press: 'End' });

  expect(host.value).to.deep.equal([25, 100]);
});

it('decreases by `step` when dragging the minimum handle', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      step="10"
      multiple
    ></glide-core-slider>`,
  );

  expect(host.value).to.deep.equal([25, 75]);

  const sliderTrack = host.shadowRoot?.querySelector('[data-test="slider"]');

  const minimumHandle = host.shadowRoot?.querySelector(
    '[data-test="minimum-handle"]',
  );

  const trackRect = sliderTrack?.getBoundingClientRect();

  assert(trackRect);
  assert(minimumHandle);

  await hover(minimumHandle);

  await sendMouse({
    type: 'down',
  });

  // Drag the handle to a location that will force the value to be
  // rounded down to the nearest `step`.
  await sendMouse({
    type: 'move',
    position: [
      Math.ceil(trackRect.x + trackRect.width * 0.2),
      Math.ceil(trackRect.y),
    ],
  });

  await sendMouse({
    type: 'up',
  });

  expect(host.value).to.deep.equal([20, 75]);
});

it('increases by `step` when dragging the minimum handle', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      step="10"
      multiple
    ></glide-core-slider>`,
  );

  expect(host.value).to.deep.equal([25, 75]);

  const sliderTrack = host.shadowRoot?.querySelector('[data-test="slider"]');

  const minimumHandle = host.shadowRoot?.querySelector(
    '[data-test="minimum-handle"]',
  );

  const trackRect = sliderTrack?.getBoundingClientRect();

  assert(trackRect);
  assert(minimumHandle);

  await hover(minimumHandle);

  await sendMouse({
    type: 'down',
  });

  // Drag the handle to a location that will force the value to be
  // rounded up to the nearest `step`.
  await sendMouse({
    type: 'move',
    position: [
      Math.ceil(trackRect.x + trackRect.width * 0.3),
      Math.ceil(trackRect.y),
    ],
  });

  await sendMouse({
    type: 'up',
  });

  expect(host.value).to.deep.equal([30, 75]);
});

it('decreases by `step` when dragging the maximum handle', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      step="10"
      multiple
    ></glide-core-slider>`,
  );

  expect(host.value).to.deep.equal([25, 75]);

  const sliderTrack = host.shadowRoot?.querySelector('[data-test="slider"]');

  const maximumHandle = host.shadowRoot?.querySelector(
    '[data-test="maximum-handle"]',
  );

  const trackRect = sliderTrack?.getBoundingClientRect();

  assert(trackRect);
  assert(maximumHandle);

  await hover(maximumHandle);

  await sendMouse({
    type: 'down',
  });

  // Drag the handle to a location that will force the value to be
  // rounded down to the nearest `step`.
  await sendMouse({
    type: 'move',
    position: [
      Math.ceil(trackRect.x + trackRect.width * 0.7),
      Math.ceil(trackRect.y),
    ],
  });

  await sendMouse({
    type: 'up',
  });

  expect(host.value).to.deep.equal([25, 70]);
});

it('increases by `step` when dragging the maximum handle', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      step="10"
      multiple
    ></glide-core-slider>`,
  );

  expect(host.value).to.deep.equal([25, 75]);

  const sliderTrack = host.shadowRoot?.querySelector('[data-test="slider"]');

  const maximumHandle = host.shadowRoot?.querySelector(
    '[data-test="maximum-handle"]',
  );

  const trackRect = sliderTrack?.getBoundingClientRect();

  assert(trackRect);
  assert(maximumHandle);

  await hover(maximumHandle);

  await sendMouse({
    type: 'down',
  });

  // Drag the handle to a location that will force the value to be
  // rounded up to the nearest `step`.
  await sendMouse({
    type: 'move',
    position: [
      Math.ceil(trackRect.x + trackRect.width * 0.8),
      Math.ceil(trackRect.y),
    ],
  });

  await sendMouse({
    type: 'up',
  });

  expect(host.value).to.deep.equal([25, 80]);
});

it('prevents the minimum handle from exceeding the maximum handle when dragging', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" multiple></glide-core-slider>`,
  );

  expect(host.value).to.deep.equal([25, 75]);

  const sliderTrack = host.shadowRoot?.querySelector('[data-test="slider"]');

  const minimumHandle = host.shadowRoot?.querySelector(
    '[data-test="minimum-handle"]',
  );

  const trackRect = sliderTrack?.getBoundingClientRect();

  assert(trackRect);
  assert(minimumHandle);

  await hover(minimumHandle);

  await sendMouse({
    type: 'down',
  });

  // Try to drag the minimum handle to the 90% position, which is
  // beyond the maximum handle currently at 75%.
  await sendMouse({
    type: 'move',
    position: [
      Math.ceil(trackRect.x + trackRect.width * 0.9),
      Math.ceil(trackRect.y),
    ],
  });

  await sendMouse({
    type: 'up',
  });

  // The minimum value should be clamped to maximum minus step
  expect(host.value).to.deep.equal([74, 75]);
});

it('prevents maximum handle from going below the minimum handle when dragging', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" multiple></glide-core-slider>`,
  );

  expect(host.value).to.deep.equal([25, 75]);

  const sliderTrack = host.shadowRoot?.querySelector('[data-test="slider"]');

  const maximumHandle = host.shadowRoot?.querySelector(
    '[data-test="maximum-handle"]',
  );

  const trackRect = sliderTrack?.getBoundingClientRect();

  assert(trackRect);
  assert(maximumHandle);

  await hover(maximumHandle);

  await sendMouse({
    type: 'down',
  });

  // Try to drag the maximum handle to the 10% position, which is
  // below the minimum handle currently at 25%.
  await sendMouse({
    type: 'move',
    position: [
      Math.ceil(trackRect.x + trackRect.width * 0.1),
      Math.ceil(trackRect.y),
    ],
  });

  await sendMouse({
    type: 'up',
  });

  // The maximum value should be clamped to minimum plus step
  expect(host.value).to.deep.equal([25, 26]);
});

it('does not update when dragging the minimum handle when `disabled`', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      .value=${[25, 75]}
      disabled
      multiple
    ></glide-core-slider>`,
  );

  expect(host.value).to.deep.equal([25, 75]);

  const sliderTrack = host.shadowRoot?.querySelector('[data-test="slider"]');

  const minimumHandle = host.shadowRoot?.querySelector(
    '[data-test="minimum-handle"]',
  );

  const trackRect = sliderTrack?.getBoundingClientRect();

  assert(trackRect);
  assert(minimumHandle);

  await hover(minimumHandle);

  await sendMouse({
    type: 'down',
  });

  await sendMouse({
    type: 'move',
    position: [
      Math.ceil(trackRect.x + trackRect.width * 0.9),
      Math.ceil(trackRect.y),
    ],
  });

  await sendMouse({
    type: 'up',
  });

  expect(host.value).to.deep.equal([25, 75]);
});

it('does not update when dragging the minimum handle when `readonly`', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      .value=${[25, 75]}
      multiple
      readonly
    ></glide-core-slider>`,
  );

  expect(host.value).to.deep.equal([25, 75]);

  const sliderTrack = host.shadowRoot?.querySelector('[data-test="slider"]');

  const minimumHandle = host.shadowRoot?.querySelector(
    '[data-test="minimum-handle"]',
  );

  const trackRect = sliderTrack?.getBoundingClientRect();

  assert(trackRect);
  assert(minimumHandle);

  await hover(minimumHandle);

  await sendMouse({
    type: 'down',
  });

  await sendMouse({
    type: 'move',
    position: [
      Math.ceil(trackRect.x + trackRect.width * 0.9),
      Math.ceil(trackRect.y),
    ],
  });

  await sendMouse({
    type: 'up',
  });

  expect(host.value).to.deep.equal([25, 75]);
});

it('does not update when dragging the maximum handle when `disabled`', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      .value=${[25, 75]}
      disabled
      multiple
    ></glide-core-slider>`,
  );

  expect(host.value).to.deep.equal([25, 75]);

  const sliderTrack = host.shadowRoot?.querySelector('[data-test="slider"]');

  const maximumHandle = host.shadowRoot?.querySelector(
    '[data-test="maximum-handle"]',
  );

  const trackRect = sliderTrack?.getBoundingClientRect();

  assert(trackRect);
  assert(maximumHandle);

  await hover(maximumHandle);

  await sendMouse({
    type: 'down',
  });

  await sendMouse({
    type: 'move',
    position: [
      Math.ceil(trackRect.x + trackRect.width * 0.9),
      Math.ceil(trackRect.y),
    ],
  });

  await sendMouse({
    type: 'up',
  });

  expect(host.value).to.deep.equal([25, 75]);
});

it('does not update when dragging the maximum handle when `readonly`', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      .value=${[25, 75]}
      multiple
      readonly
    ></glide-core-slider>`,
  );

  expect(host.value).to.deep.equal([25, 75]);

  const sliderTrack = host.shadowRoot?.querySelector('[data-test="slider"]');

  const maximumHandle = host.shadowRoot?.querySelector(
    '[data-test="maximum-handle"]',
  );

  const trackRect = sliderTrack?.getBoundingClientRect();

  assert(trackRect);
  assert(maximumHandle);

  await hover(maximumHandle);

  await sendMouse({
    type: 'down',
  });

  await sendMouse({
    type: 'move',
    position: [
      Math.ceil(trackRect.x + trackRect.width * 0.9),
      Math.ceil(trackRect.y),
    ],
  });

  await sendMouse({
    type: 'up',
  });

  expect(host.value).to.deep.equal([25, 75]);
});

it('clicking on the minimum side of the track updates the minimum value', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" multiple></glide-core-slider>`,
  );

  expect(host.value).to.deep.equal([25, 75]);

  const sliderTrack = host.shadowRoot?.querySelector('[data-test="slider"]');
  const trackRect = sliderTrack?.getBoundingClientRect();

  assert(trackRect);
  assert(sliderTrack);

  // Click on the track at the 10% position, which is closer to the
  // minimum handle than the maximum handle.
  sliderTrack.dispatchEvent(
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      clientX: trackRect.left + trackRect.width * 0.1,
    }),
  );

  await host.updateComplete;

  expect(host.value).to.deep.equal([10, 75]);

  const minimumHandle = host.shadowRoot?.querySelector(
    '[data-test="minimum-handle"]',
  );

  assert(minimumHandle);

  const handleStyle = window.getComputedStyle(minimumHandle);
  const handleLeft = Number.parseFloat(handleStyle.left);
  const handleLeftPercent = (handleLeft / trackRect.width) * 100;

  // The handle should be positioned at ~10%, allowing for small
  // rounding differences.
  expect(handleLeftPercent).to.be.closeTo(10, 2);
});

it('clicking on the maximum side of the track updates the maximum value', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" multiple></glide-core-slider>`,
  );

  expect(host.value).to.deep.equal([25, 75]);

  const sliderTrack = host.shadowRoot?.querySelector('[data-test="slider"]');
  const trackRect = sliderTrack?.getBoundingClientRect();

  assert(trackRect);
  assert(sliderTrack);

  // Click on the track at the 90% position, which is closer to the
  // maximum handle than the minimum handle.
  sliderTrack.dispatchEvent(
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      clientX: trackRect.left + trackRect.width * 0.9, // 90% position
    }),
  );

  await host.updateComplete;

  expect(host.value).to.deep.equal([25, 90]);

  const maximumHandle = host.shadowRoot?.querySelector(
    '[data-test="maximum-handle"]',
  );

  assert(maximumHandle);

  const handleStyle = window.getComputedStyle(maximumHandle);
  const handleLeft = Number.parseFloat(handleStyle.left);
  const handleLeftPercent = (handleLeft / trackRect.width) * 100;

  // The handle should be positioned at ~90%, allowing for small
  // rounding differences.
  expect(handleLeftPercent).to.be.closeTo(90, 2);
});

it('snaps the minimum input value to the maximum value minus `step` if the entered value exceeds the current maximum input value and is blurred', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      step="1"
      multiple
    ></glide-core-slider>`,
  );

  const minimumInput = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="minimum-input"]',
  );

  await sendKeys({ press: 'Tab' });
  // Enter a value that is greater than the maximum input.
  await sendKeys({ type: '80' });

  minimumInput?.blur();

  await host.updateComplete;

  expect(minimumInput?.value).to.equal('74');
  expect(host.value).to.deep.equal([74, 75]);
});

it('snaps the maximum input value to the minimum value plus `step` if the entered value is less than the current minimum input value and is blurred', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      step="1"
      multiple
    ></glide-core-slider>`,
  );

  const maximumInput = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="maximum-input"]',
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'Tab' });

  // Entered a value that is less than the minimum input.
  await sendKeys({ type: '20' });

  maximumInput?.blur();

  await host.updateComplete;

  expect(maximumInput?.value).to.equal('26');
  expect(host.value).to.deep.equal([25, 26]);
});

it('maintains a multiple value when switching between multiple and single modes', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" multiple></glide-core-slider>`,
  );

  host.value = [30, 70];
  await host.updateComplete;

  expect(host.value).to.deep.equal([30, 70]);

  host.multiple = false;
  await host.updateComplete;

  // Should preserve only the minimum value after the switch.
  expect(host.value).to.deep.equal([30]);

  host.value = [50];
  await host.updateComplete;

  expect(host.value).to.deep.equal([50]);

  host.multiple = true;
  await host.updateComplete;

  // Should preserve the current value as the minimum and add a
  // maximum value.
  expect(host.value).to.deep.equal([50, 75]);
});

it('prevents updating the value when clicking on the track when `disabled`', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      .value=${[25, 75]}
      disabled
      multiple
    ></glide-core-slider>`,
  );

  const sliderTrack = host.shadowRoot?.querySelector('[data-test="slider"]');
  const trackRect = sliderTrack?.getBoundingClientRect();

  assert(trackRect);
  assert(sliderTrack);

  sliderTrack.dispatchEvent(
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      clientX: trackRect.left + trackRect.width * 0.6,
    }),
  );

  await host.updateComplete;

  expect(host.value).to.deep.equal([25, 75]);
});

it('prevents updating the value when clicking on the track when `readonly`', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      .value=${[25, 75]}
      multiple
      readonly
    ></glide-core-slider>`,
  );

  const sliderTrack = host.shadowRoot?.querySelector('[data-test="slider"]');
  const trackRect = sliderTrack?.getBoundingClientRect();

  assert(trackRect);
  assert(sliderTrack);

  sliderTrack.dispatchEvent(
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      clientX: trackRect.left + trackRect.width * 0.6,
    }),
  );

  await host.updateComplete;

  expect(host.value).to.deep.equal([25, 75]);
});

it('prevents updating the value when using the arrow keys on the minimum handle when `disabled`', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      .value=${[25, 75]}
      disabled
      multiple
    ></glide-core-slider>`,
  );

  const minimumHandle = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="minimum-handle"]',
  );

  minimumHandle?.focus();

  await sendKeys({ press: 'ArrowDown' });

  expect(host.value).to.deep.equal([25, 75]);
});

it('prevents updating the value when using the arrow keys on the maximum handle when `disabled`', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      .value=${[25, 75]}
      disabled
      multiple
    ></glide-core-slider>`,
  );

  const maximumHandle = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="maximum-handle"]',
  );

  maximumHandle?.focus();

  await sendKeys({ press: 'ArrowDown' });

  expect(host.value).to.deep.equal([25, 75]);
});

it('prevents updating the value when using the arrow keys on the minimum handle when `readonly`', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      .value=${[25, 75]}
      multiple
      readonly
    ></glide-core-slider>`,
  );

  const minimumHandle = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="minimum-handle"]',
  );

  minimumHandle?.focus();

  await sendKeys({ press: 'ArrowDown' });

  expect(host.value).to.deep.equal([25, 75]);
});

it('prevents updating the value when using the arrow keys on the maximum handle when `readonly`', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      .value=${[25, 75]}
      multiple
      readonly
    ></glide-core-slider>`,
  );

  const maximumHandle = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="maximum-handle"]',
  );

  maximumHandle?.focus();

  await sendKeys({ press: 'ArrowDown' });

  expect(host.value).to.deep.equal([25, 75]);
});

it('caps the maximum input value to `max` when the entered value exceeds it', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      max="100"
      .value=${[25, 75]}
      multiple
    ></glide-core-slider>`,
  );

  const maximumInput = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="maximum-input"]',
  );

  maximumInput?.focus();

  await sendKeys({ type: '400' });

  expect(host.value).to.deep.equal([25, 100]);
});

it('caps the minimum input value to `min` when the entered value is below it', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      min="10"
      .value=${[25, 75]}
      multiple
    ></glide-core-slider>`,
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: '5' });

  expect(host.value).to.deep.equal([10, 75]);
});

it('adjusts the maximum value when switched to `multiple` if the current value exceeds the 75% of the `max`', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      max="100"
      min="0"
      step="10"
    ></glide-core-slider>`,
  );

  // There's a comment in the multiple setter explaining why we do
  // this, but changing to `multiple` while having the current
  // `value` higher than the 75% default for the maximum value
  // forces the maximum value to `max`.
  host.value = [80];
  host.multiple = true;

  await host.updateComplete;
  expect(host.value).to.deep.equal([80, 100]);
});

it('adjusts the minimum and maximum values when switched to `multiple` if the current value is set to the `max`', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      max="100"
      min="0"
      step="10"
    ></glide-core-slider>`,
  );

  // There's a comment in the multiple setter explaining why we do
  // this, but changing to `multiple` while having the current
  // `value` set to `max` forces the maximum value to `max` and the
  // minimum value to `max` minus `step` to prevent the component
  // from being in an invalid UI state.
  host.value = [100];
  host.multiple = true;

  await host.updateComplete;
  expect(host.value).to.deep.equal([90, 100]);
});

it('normalizes `value` when provided with values that fall outside of `step`', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      max="100"
      min="0"
      step="10"
      .value=${[5, 95]}
      multiple
    ></glide-core-slider>`,
  );

  expect(host.value).to.deep.equal([10, 100]);
});

it('throws when `value` is set programmatically to include more than two values', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" multiple></glide-core-slider>`,
  );

  const spy = sinon.spy();

  try {
    host.value = [20, 60, 80];
  } catch {
    spy();
  }

  expect(spy.callCount).to.equal(1);
});
