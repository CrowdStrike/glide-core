import { assert, expect, fixture, html } from '@open-wc/testing';
import { resetMouse, sendKeys, sendMouse } from '@web/test-runner-commands';
import Slider from './slider.js';
import { hover } from '@/src/library/mouse.js';

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
    html`<glide-core-slider label="Label" .value=${[50]}></glide-core-slider>`,
  );

  host.max = 75;
  await host.updateComplete;

  const singleInput = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="single-input"]',
  );

  const singleHandle = host.shadowRoot?.querySelector(
    '[data-test="single-handle"]',
  );

  expect(singleInput?.max).to.equal('75');
  expect(singleHandle?.getAttribute('aria-valuemax')).to.equal('75');
});

it('clamps the current value when `max` is set lower than the current value programmatically', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" .value=${[50]}></glide-core-slider>`,
  );

  host.max = 30;
  await host.updateComplete;

  expect(host.value).to.deep.equal([30]);

  const singleInput = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="single-input"]',
  );

  expect(singleInput?.value).to.equal('30');
});

it('updates all relevant elements when `min` is set programmatically', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" .value=${[50]}></glide-core-slider>`,
  );

  host.min = 25;
  await host.updateComplete;

  const singleInput = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="single-input"]',
  );

  const singleHandle = host.shadowRoot?.querySelector(
    '[data-test="single-handle"]',
  );

  expect(singleInput?.min).to.equal('25');
  expect(singleHandle?.getAttribute('aria-valuemin')).to.equal('25');
});

it('clamps the current value when `min` is set higher than the current value programmatically', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" .value=${[20]}></glide-core-slider>`,
  );

  host.min = 30;
  await host.updateComplete;

  expect(host.value).to.deep.equal([30]);

  const singleInput = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="single-input"]',
  );

  expect(singleInput?.value).to.equal('30');
});

it('maintains `value` when `min` is set below the current value', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" .value=${[50]}></glide-core-slider>`,
  );

  host.min = 10;
  await host.updateComplete;

  expect(host.value).to.deep.equal([50]);
});

it('respects the min/max bounds by ensuring the values do not exceed them', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      max="80"
      min="20"
    ></glide-core-slider>`,
  );

  host.value = [0];
  await host.updateComplete;

  expect(host.value[0]).to.equal(20);

  host.value = [100];
  await host.updateComplete;

  expect(host.value[0]).to.equal(80);
});

it('updates the value when entering text in the input', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label"></glide-core-slider>`,
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: '40' });

  const singleInput = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="single-input"]',
  );

  expect(singleInput?.value).to.equal('40');
  expect(host.value).to.deep.equal([40]);
});

it('uses `step` to round up when an entered value falls outside of the step on blur', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" step="10"></glide-core-slider>`,
  );

  const singleInput = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="single-input"]',
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: '16' });

  singleInput?.blur();

  await host.updateComplete;

  expect(singleInput?.value).to.equal('20');
  expect(host.value).to.deep.equal([20]);
});

it('uses `step` to round down when an entered value falls outside of the step on blur', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" step="10"></glide-core-slider>`,
  );

  const singleInput = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="single-input"]',
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: '14' });

  singleInput?.blur();

  await host.updateComplete;

  expect(singleInput?.value).to.equal('10');
  expect(host.value).to.deep.equal([10]);
});

it('uses `step` on ArrowDown', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" step="10"></glide-core-slider>`,
  );

  const singleInput = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="single-input"]',
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowDown' });

  expect(singleInput?.value).to.equal('15');
  expect(host.value).to.deep.equal([15]);
});

it('uses `step` on ArrowUp', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" step="10"></glide-core-slider>`,
  );

  const singleInput = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="single-input"]',
  );

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'ArrowUp' });

  expect(singleInput?.value).to.equal('35');
  expect(host.value).to.deep.equal([35]);
});

it('decreases by `step` on ArrowLeft on the handle', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" step="10"></glide-core-slider>`,
  );

  const singleHandle = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="single-handle"]',
  );

  singleHandle?.focus();

  await sendKeys({ press: 'ArrowLeft' });

  expect(host.value).to.deep.equal([15]);
});

it('decreases by `step` on ArrowDown on the handle', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" step="10"></glide-core-slider>`,
  );

  const singleHandle = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="single-handle"]',
  );

  singleHandle?.focus();

  await sendKeys({ press: 'ArrowDown' });

  expect(host.value).to.deep.equal([15]);
});

it('increases by `step` on ArrowRight on the handle', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" step="10"></glide-core-slider>`,
  );

  const singleHandle = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="single-handle"]',
  );

  singleHandle?.focus();

  await sendKeys({ press: 'ArrowRight' });

  expect(host.value).to.deep.equal([35]);
});

it('increases by `step` on ArrowUp on the handle', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" step="10"></glide-core-slider>`,
  );

  const singleHandle = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="single-handle"]',
  );

  singleHandle?.focus();

  await sendKeys({ press: 'ArrowUp' });

  expect(host.value).to.deep.equal([35]);
});

it('decreases by x10 `step` on PageDown on the handle', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" step="2"></glide-core-slider>`,
  );

  const singleHandle = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="single-handle"]',
  );

  singleHandle?.focus();

  await sendKeys({ press: 'PageDown' });

  expect(host.value).to.deep.equal([5]);
});

it('increases by x10 `step` on PageUp on the handle', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" step="2"></glide-core-slider>`,
  );

  const singleHandle = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="single-handle"]',
  );

  singleHandle?.focus();

  await sendKeys({ press: 'PageUp' });

  expect(host.value).to.deep.equal([45]);
});

it('sets the value to `min` on Home on the handle', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label"></glide-core-slider>`,
  );

  const singleHandle = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="single-handle"]',
  );

  singleHandle?.focus();

  await sendKeys({ press: 'Home' });

  expect(host.value).to.deep.equal([0]);
});

it('sets the value to `max` on End on the handle', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label"></glide-core-slider>`,
  );

  const singleHandle = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="single-handle"]',
  );

  singleHandle?.focus();

  await sendKeys({ press: 'End' });

  expect(host.value).to.deep.equal([100]);
});

it('decreases by `step` when dragging the handle', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" step="10"></glide-core-slider>`,
  );

  expect(host.value).to.deep.equal([25]);

  const sliderTrack = host.shadowRoot?.querySelector('[data-test="slider"]');

  const singleHandle = host.shadowRoot?.querySelector(
    '[data-test="single-handle"]',
  );

  const trackRect = sliderTrack?.getBoundingClientRect();

  assert(trackRect);
  assert(singleHandle);

  await hover(singleHandle);

  await sendMouse({
    type: 'down',
  });

  // Drag the handle to a location that will force
  // the value to be rounded down to the nearest `step`.
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

  expect(host.value).to.deep.equal([20]);
});

it('increases by `step` when dragging the handle', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" step="10"></glide-core-slider>`,
  );

  expect(host.value).to.deep.equal([25]);

  const sliderTrack = host.shadowRoot?.querySelector('[data-test="slider"]');

  const singleHandle = host.shadowRoot?.querySelector(
    '[data-test="single-handle"]',
  );

  const trackRect = sliderTrack?.getBoundingClientRect();

  assert(trackRect);
  assert(singleHandle);

  await hover(singleHandle);

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

  expect(host.value).to.deep.equal([30]);
});

it('clicking on the track updates the value', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label"></glide-core-slider>`,
  );

  expect(host.value).to.deep.equal([25]);

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

  expect(host.value).to.deep.equal([60]);

  const singleHandle = host.shadowRoot?.querySelector(
    '[data-test="single-handle"]',
  );

  assert(singleHandle);

  const handleStyle = window.getComputedStyle(singleHandle);
  const handleLeft = Number.parseFloat(handleStyle.left);
  const handleLeftPercent = (handleLeft / trackRect.width) * 100;

  // The handle should be positioned at ~60%, allowing for small
  // rounding differences.
  expect(handleLeftPercent).to.be.closeTo(60, 2);
});

it('maintains a single value when switching between multiple and single modes', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label"></glide-core-slider>`,
  );

  host.value = [40];
  await host.updateComplete;
  expect(host.value).to.deep.equal([40]);

  host.multiple = true;
  await host.updateComplete;

  // Should preserve the first value and add a maximum value.
  expect(host.value.length).to.equal(2);
  expect(host.value).to.deep.equal([40, 75]);

  host.multiple = false;
  await host.updateComplete;

  // Should preserve the first value.
  expect(host.value.length).to.equal(1);
  expect(host.value[0]).to.equal(40);
});

it('does not update when dragging the handle when `disabled`', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      .value=${[25]}
      disabled
    ></glide-core-slider>`,
  );

  const singleHandle = host.shadowRoot?.querySelector(
    '[data-test="single-handle"]',
  );

  const sliderTrack = host.shadowRoot?.querySelector('[data-test="slider"]');
  const trackRect = sliderTrack?.getBoundingClientRect();

  assert(trackRect);
  assert(singleHandle);

  await hover(singleHandle);

  await sendMouse({
    type: 'down',
  });

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

  expect(host.value).to.deep.equal([25]);
});

it('does not update when dragging the handle when `readonly`', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      .value=${[25]}
      readonly
    ></glide-core-slider>`,
  );

  const singleHandle = host.shadowRoot?.querySelector(
    '[data-test="single-handle"]',
  );

  const sliderTrack = host.shadowRoot?.querySelector('[data-test="slider"]');
  const trackRect = sliderTrack?.getBoundingClientRect();

  assert(trackRect);
  assert(singleHandle);

  await hover(singleHandle);

  await sendMouse({
    type: 'down',
  });

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

  expect(host.value).to.deep.equal([25]);
});

it('prevents updating the value when clicking on the track when `disabled`', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      .value=${[25]}
      disabled
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

  expect(host.value).to.deep.equal([25]);
});

it('prevents updating the value when clicking on the track when `readonly`', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      .value=${[25]}
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

  expect(host.value).to.deep.equal([25]);
});

it('prevents updating the value when using the arrow keys on the handle when `disabled`', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      .value=${[25]}
      disabled
    ></glide-core-slider>`,
  );

  const singleHandle = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="single-handle"]',
  );

  singleHandle?.focus();

  await sendKeys({ press: 'ArrowDown' });

  expect(host.value).to.deep.equal([25]);
});

it('prevents updating the value when using the arrow keys on the handle when `readonly`', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      .value=${[25]}
      readonly
    ></glide-core-slider>`,
  );

  const singleHandle = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="single-handle"]',
  );

  singleHandle?.focus();

  await sendKeys({ press: 'ArrowDown' });

  expect(host.value).to.deep.equal([25]);
});

it('caps the input value to `max` when the entered value exceeds it', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" max="100"></glide-core-slider>`,
  );

  const singleInput = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="single-input"]',
  );

  singleInput?.focus();

  await sendKeys({ type: '400' });

  expect(host.value).to.deep.equal([100]);
});

it('normalizes `value` when provided with a value that fall outside of `step`', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      max="100"
      min="0"
      step="10"
      .value=${[15]}
    ></glide-core-slider>`,
  );

  expect(host.value).to.deep.equal([20]);
});

it('retains only the first `value` array item when multiple are set programmatically', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label"></glide-core-slider>`,
  );

  host.value = [20, 80];

  expect(host.value).to.deep.equal([20]);
});
