import { assert, aTimeout, expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import GlideCoreSlider from './slider.js';

it('sets `min` on the minimum input', async () => {
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

  expect(minimumInput?.getAttribute('min')).to.equal('10');
});

it('sets `min` on the maximum input based on the current minimum value + `step`', async () => {
  const host = await fixture<GlideCoreSlider>(
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
  const host = await fixture<GlideCoreSlider>(
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
  const host = await fixture<GlideCoreSlider>(
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
  const host = await fixture<GlideCoreSlider>(
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
  const host = await fixture<GlideCoreSlider>(
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

it('sets `aria-valuemin` on the minimum thumb as `min`', async () => {
  const host = await fixture<GlideCoreSlider>(
    html`<glide-core-slider
      label="Label"
      min="20"
      multiple
    ></glide-core-slider>`,
  );

  const minimumThumb = host.shadowRoot?.querySelector(
    '[data-test="minimum-thumb"]',
  );

  expect(minimumThumb?.getAttribute('aria-valuemin')).to.equal('20');
});

it('sets `aria-valuemin` on the maximum thumb as `min`', async () => {
  const host = await fixture<GlideCoreSlider>(
    html`<glide-core-slider
      label="Label"
      min="20"
      multiple
    ></glide-core-slider>`,
  );

  const maximumThumb = host.shadowRoot?.querySelector(
    '[data-test="maximum-thumb"]',
  );

  expect(maximumThumb?.getAttribute('aria-valuemin')).to.equal('20');
});

it('sets `aria-valuemax` on the minimum thumb as `max`', async () => {
  const host = await fixture<GlideCoreSlider>(
    html`<glide-core-slider
      label="Label"
      max="200"
      multiple
    ></glide-core-slider>`,
  );

  const minimumThumb = host.shadowRoot?.querySelector(
    '[data-test="minimum-thumb"]',
  );

  expect(minimumThumb?.getAttribute('aria-valuemax')).to.equal('200');
});

it('sets `aria-valuemax` on the maximum thumb as `max`', async () => {
  const host = await fixture<GlideCoreSlider>(
    html`<glide-core-slider
      label="Label"
      max="200"
      multiple
    ></glide-core-slider>`,
  );

  const maximumThumb = host.shadowRoot?.querySelector(
    '[data-test="maximum-thumb"]',
  );

  expect(maximumThumb?.getAttribute('aria-valuemax')).to.equal('200');
});

it('sets `aria-valuenow` on the minimum thumb as the minimum value of `value`', async () => {
  const host = await fixture<GlideCoreSlider>(
    html`<glide-core-slider
      label="Label"
      .value=${[7, 99]}
      multiple
    ></glide-core-slider>`,
  );

  const minimumThumb = host.shadowRoot?.querySelector(
    '[data-test="minimum-thumb"]',
  );

  expect(minimumThumb?.getAttribute('aria-valuenow')).to.equal('7');
});

it('sets `aria-valuenow` on the maximum thumb as the maximum value of `value`', async () => {
  const host = await fixture<GlideCoreSlider>(
    html`<glide-core-slider
      label="Label"
      .value=${[7, 99]}
      multiple
    ></glide-core-slider>`,
  );

  const maximumThumb = host.shadowRoot?.querySelector(
    '[data-test="maximum-thumb"]',
  );

  expect(maximumThumb?.getAttribute('aria-valuenow')).to.equal('99');
});

it('updates all relevant elements when `max` is set programmatically', async () => {
  const host = await fixture<GlideCoreSlider>(
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

  const minimumThumb = host.shadowRoot?.querySelector(
    '[data-test="minimum-thumb"]',
  );

  const maximumThumb = host.shadowRoot?.querySelector(
    '[data-test="maximum-thumb"]',
  );

  expect(maximumInput?.max).to.equal('80');
  expect(maximumThumb?.getAttribute('aria-valuemax')).to.equal('80');
  expect(minimumThumb?.getAttribute('aria-valuemax')).to.equal('80');
});

it('clamps minimum and maximum values when `max` is lowered programmatically', async () => {
  const host = await fixture<GlideCoreSlider>(
    html`<glide-core-slider
      label="Label"
      multiple
      .value=${[30, 80]}
    ></glide-core-slider>`,
  );

  // Set max below both current values
  host.max = 25;
  await host.updateComplete;

  // Both values should be adjusted
  // Maximum becomes max (25)
  // Minimum becomes (max - step) = 24
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

it('clamps the maximum value but keeps the minimum unchanged when `max` is set programmatically', async () => {
  const host = await fixture<GlideCoreSlider>(
    html`<glide-core-slider
      label="Label"
      .value=${[30, 70]}
      multiple
    ></glide-core-slider>`,
  );

  host.max = 40;
  await host.updateComplete;

  // Minimum stays the same
  // Maximum gets clamped to new max
  expect(host.value).to.deep.equal([30, 40]);
});

it('updates all relevant elements when `min` is set programmatically', async () => {
  const host = await fixture<GlideCoreSlider>(
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

  const minimumThumb = host.shadowRoot?.querySelector(
    '[data-test="minimum-thumb"]',
  );

  const maximumThumb = host.shadowRoot?.querySelector(
    '[data-test="maximum-thumb"]',
  );

  expect(minimumInput?.min).to.equal('20');
  expect(minimumThumb?.getAttribute('aria-valuemin')).to.equal('20');
  expect(maximumThumb?.getAttribute('aria-valuemin')).to.equal('20');
});

it('clamps minimum and maximum values when `min` is raised programmatically', async () => {
  const host = await fixture<GlideCoreSlider>(
    html`<glide-core-slider
      label="Label"
      multiple
      .value=${[20, 40]}
    ></glide-core-slider>`,
  );

  // Set min above both current values
  host.min = 45;
  await host.updateComplete;

  // Both values should be adjusted
  // Minimum becomes min (45)
  // Maximum becomes (min + step) = 46
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
  const host = await fixture<GlideCoreSlider>(
    html`<glide-core-slider
      label="Label"
      multiple
      .value=${[30, 70]}
    ></glide-core-slider>`,
  );

  host.min = 40;
  await host.updateComplete;

  // Minimum is clamped to new min
  // Maximum stays the same
  expect(host.value).to.deep.equal([40, 70]);
});

it('respects the min/max bounds', async () => {
  const host = await fixture<GlideCoreSlider>(
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
  const host = await fixture<GlideCoreSlider>(
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
  const host = await fixture<GlideCoreSlider>(
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

it('uses `step` to round up when an entered value falls outside of the step with minimum input on blur', async () => {
  const host = await fixture<GlideCoreSlider>(
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

  expect(minimumInput?.value).to.equal('20');
  expect(host.value).to.deep.equal([20, 75]);
});

it('uses `step` to round down when an entered value falls outside of the step with minimum input on blur', async () => {
  const host = await fixture<GlideCoreSlider>(
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

  expect(minimumInput?.value).to.equal('10');
  expect(host.value).to.deep.equal([10, 75]);
});

it('uses `step` to round up when a value falls outside of the step with maximum input on blur', async () => {
  const host = await fixture<GlideCoreSlider>(
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

  expect(maximumInput?.value).to.equal('90');
  expect(host.value).to.deep.equal([25, 90]);
});

it('uses `step` to round down when a value falls outside of the step with maximum input on blur', async () => {
  const host = await fixture<GlideCoreSlider>(
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

  expect(maximumInput?.value).to.equal('80');
  expect(host.value).to.deep.equal([25, 80]);
});

it('uses `step` on ArrowDown on the minimum input', async () => {
  const host = await fixture<GlideCoreSlider>(
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
  const host = await fixture<GlideCoreSlider>(
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

it('decreases by `step` on ArrowLeft on the minimum thumb', async () => {
  const host = await fixture<GlideCoreSlider>(
    html`<glide-core-slider
      label="Label"
      step="10"
      multiple
    ></glide-core-slider>`,
  );

  const minimumThumb = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="minimum-thumb"]',
  );

  minimumThumb?.focus();

  await sendKeys({ press: 'ArrowLeft' });

  expect(host.value).to.deep.equal([15, 75]);
});

it('decreases by `step` on ArrowDown on the minimum thumb', async () => {
  const host = await fixture<GlideCoreSlider>(
    html`<glide-core-slider
      label="Label"
      step="10"
      multiple
    ></glide-core-slider>`,
  );

  const minimumThumb = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="minimum-thumb"]',
  );

  minimumThumb?.focus();

  await sendKeys({ press: 'ArrowDown' });

  expect(host.value).to.deep.equal([15, 75]);
});

it('increases by `step` on ArrowRight on the minimum thumb', async () => {
  const host = await fixture<GlideCoreSlider>(
    html`<glide-core-slider
      label="Label"
      step="10"
      multiple
    ></glide-core-slider>`,
  );

  const minimumThumb = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="minimum-thumb"]',
  );

  minimumThumb?.focus();

  await sendKeys({ press: 'ArrowRight' });

  expect(host.value).to.deep.equal([35, 75]);
});

it('increases by `step` on ArrowUp on the minimum thumb', async () => {
  const host = await fixture<GlideCoreSlider>(
    html`<glide-core-slider
      label="Label"
      step="10"
      multiple
    ></glide-core-slider>`,
  );

  const minimumThumb = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="minimum-thumb"]',
  );

  minimumThumb?.focus();

  await sendKeys({ press: 'ArrowUp' });

  expect(host.value).to.deep.equal([35, 75]);
});

it('decreases by x10 `step` on PageDown on the minimum thumb', async () => {
  const host = await fixture<GlideCoreSlider>(
    html`<glide-core-slider
      label="Label"
      step="2"
      multiple
    ></glide-core-slider>`,
  );

  const minimumThumb = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="minimum-thumb"]',
  );

  minimumThumb?.focus();

  await sendKeys({ press: 'PageDown' });

  expect(host.value).to.deep.equal([5, 75]);
});

it('increases by x10 `step` on PageDown on the minimum thumb', async () => {
  const host = await fixture<GlideCoreSlider>(
    html`<glide-core-slider
      label="Label"
      step="2"
      multiple
    ></glide-core-slider>`,
  );

  const minimumThumb = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="minimum-thumb"]',
  );

  minimumThumb?.focus();

  await sendKeys({ press: 'PageUp' });

  expect(host.value).to.deep.equal([45, 75]);
});

it('sets the minimum value to `min` on Home on the minimum thumb', async () => {
  const host = await fixture<GlideCoreSlider>(
    html`<glide-core-slider label="Label" multiple></glide-core-slider>`,
  );

  const minimumThumb = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="minimum-thumb"]',
  );

  minimumThumb?.focus();

  await sendKeys({ press: 'Home' });

  expect(host.value).to.deep.equal([0, 75]);
});

it('sets the minimum value to the maximum value - step on End on the minimum thumb', async () => {
  const host = await fixture<GlideCoreSlider>(
    html`<glide-core-slider
      label="Label"
      step="5"
      multiple
    ></glide-core-slider>`,
  );

  const minimumThumb = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="minimum-thumb"]',
  );

  minimumThumb?.focus();

  await sendKeys({ press: 'End' });

  expect(host.value).to.deep.equal([70, 75]);
});

it('uses `step` on ArrowDown on the maximum input', async () => {
  const host = await fixture<GlideCoreSlider>(
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
  const host = await fixture<GlideCoreSlider>(
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

it('decreases by `step` on ArrowLeft on the maximum thumb', async () => {
  const host = await fixture<GlideCoreSlider>(
    html`<glide-core-slider
      label="Label"
      step="10"
      multiple
    ></glide-core-slider>`,
  );

  const maximumThumb = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="maximum-thumb"]',
  );

  maximumThumb?.focus();

  await sendKeys({ press: 'ArrowLeft' });

  expect(host.value).to.deep.equal([25, 65]);
});

it('decreases by `step` on ArrowDown on the maximum thumb', async () => {
  const host = await fixture<GlideCoreSlider>(
    html`<glide-core-slider
      label="Label"
      step="10"
      multiple
    ></glide-core-slider>`,
  );

  const maximumThumb = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="maximum-thumb"]',
  );

  maximumThumb?.focus();

  await sendKeys({ press: 'ArrowDown' });

  expect(host.value).to.deep.equal([25, 65]);
});

it('increases by `step` on ArrowRight on the maximum thumb', async () => {
  const host = await fixture<GlideCoreSlider>(
    html`<glide-core-slider
      label="Label"
      step="10"
      multiple
    ></glide-core-slider>`,
  );

  const maximumThumb = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="maximum-thumb"]',
  );

  maximumThumb?.focus();

  await sendKeys({ press: 'ArrowRight' });

  expect(host.value).to.deep.equal([25, 85]);
});

it('increases by `step` on ArrowUp on the maximum thumb', async () => {
  const host = await fixture<GlideCoreSlider>(
    html`<glide-core-slider
      label="Label"
      step="10"
      multiple
    ></glide-core-slider>`,
  );

  const maximumThumb = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="maximum-thumb"]',
  );

  maximumThumb?.focus();

  await sendKeys({ press: 'ArrowUp' });

  expect(host.value).to.deep.equal([25, 85]);
});

it('decreases by x10 `step` on PageDown on the maximum thumb', async () => {
  const host = await fixture<GlideCoreSlider>(
    html`<glide-core-slider
      label="Label"
      step="2"
      multiple
    ></glide-core-slider>`,
  );

  const maximumThumb = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="maximum-thumb"]',
  );

  maximumThumb?.focus();

  await sendKeys({ press: 'PageDown' });

  expect(host.value).to.deep.equal([25, 55]);
});

it('increases by x10 `step` on PageDown on the maximum thumb', async () => {
  const host = await fixture<GlideCoreSlider>(
    html`<glide-core-slider
      label="Label"
      step="2"
      multiple
    ></glide-core-slider>`,
  );

  const maximumThumb = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="maximum-thumb"]',
  );

  maximumThumb?.focus();

  await sendKeys({ press: 'PageUp' });

  expect(host.value).to.deep.equal([25, 95]);
});

it('sets the maximum value to the minimum value + step on Home on the maximum thumb', async () => {
  const host = await fixture<GlideCoreSlider>(
    html`<glide-core-slider
      label="Label"
      step="5"
      multiple
    ></glide-core-slider>`,
  );

  const maximumThumb = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="maximum-thumb"]',
  );

  maximumThumb?.focus();

  await sendKeys({ press: 'Home' });

  expect(host.value).to.deep.equal([25, 30]);
});

it('sets the maximum value to `max` on Home on the maximum thumb', async () => {
  const host = await fixture<GlideCoreSlider>(
    html`<glide-core-slider
      label="Label"
      step="5"
      multiple
    ></glide-core-slider>`,
  );

  const maximumThumb = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="maximum-thumb"]',
  );

  maximumThumb?.focus();

  await sendKeys({ press: 'End' });

  expect(host.value).to.deep.equal([25, 100]);
});

it('decreases by `step` when dragging the minimum thumb', async () => {
  const host = await fixture<GlideCoreSlider>(
    html`<glide-core-slider
      label="Label"
      step="10"
      multiple
    ></glide-core-slider>`,
  );

  expect(host.value).to.deep.equal([25, 75]);

  const sliderTrack = host.shadowRoot?.querySelector('[data-test="slider"]');

  const minimumThumb = host.shadowRoot?.querySelector(
    '[data-test="minimum-thumb"]',
  );

  const trackRect = sliderTrack?.getBoundingClientRect();

  assert(trackRect);
  assert(minimumThumb);

  minimumThumb.dispatchEvent(
    new MouseEvent('mousedown', {
      bubbles: true,
      cancelable: true,
    }),
  );

  await aTimeout(0);

  document.dispatchEvent(
    new MouseEvent('mousemove', {
      bubbles: true,
      cancelable: true,
      clientX: trackRect.left + trackRect.width * 0.2, // 20% position = value of 20
    }),
  );

  await aTimeout(0);

  document.dispatchEvent(
    new MouseEvent('mouseup', {
      bubbles: true,
      cancelable: true,
    }),
  );

  await host.updateComplete;

  expect(host.value).to.deep.equal([20, 75]);
});

it('increases by `step` when dragging the minimum thumb', async () => {
  const host = await fixture<GlideCoreSlider>(
    html`<glide-core-slider
      label="Label"
      step="10"
      multiple
    ></glide-core-slider>`,
  );

  expect(host.value).to.deep.equal([25, 75]);

  const sliderTrack = host.shadowRoot?.querySelector('[data-test="slider"]');

  const minimumThumb = host.shadowRoot?.querySelector(
    '[data-test="minimum-thumb"]',
  );

  const trackRect = sliderTrack?.getBoundingClientRect();

  assert(trackRect);
  assert(minimumThumb);

  minimumThumb.dispatchEvent(
    new MouseEvent('mousedown', {
      bubbles: true,
      cancelable: true,
    }),
  );

  await aTimeout(0);

  document.dispatchEvent(
    new MouseEvent('mousemove', {
      bubbles: true,
      cancelable: true,
      clientX: trackRect.left + trackRect.width * 0.3, // 30% position = value of 30
    }),
  );

  await aTimeout(0);

  document.dispatchEvent(
    new MouseEvent('mouseup', {
      bubbles: true,
      cancelable: true,
    }),
  );

  await host.updateComplete;

  expect(host.value).to.deep.equal([30, 75]);
});

it('decreases by `step` when dragging the maximum thumb', async () => {
  const host = await fixture<GlideCoreSlider>(
    html`<glide-core-slider
      label="Label"
      step="10"
      multiple
    ></glide-core-slider>`,
  );

  expect(host.value).to.deep.equal([25, 75]);

  const sliderTrack = host.shadowRoot?.querySelector('[data-test="slider"]');

  const maximumThumb = host.shadowRoot?.querySelector(
    '[data-test="maximum-thumb"]',
  );

  const trackRect = sliderTrack?.getBoundingClientRect();

  assert(trackRect);
  assert(maximumThumb);

  maximumThumb.dispatchEvent(
    new MouseEvent('mousedown', {
      bubbles: true,
      cancelable: true,
    }),
  );

  await aTimeout(0);

  document.dispatchEvent(
    new MouseEvent('mousemove', {
      bubbles: true,
      cancelable: true,
      clientX: trackRect.left + trackRect.width * 0.7, // 70% position = value of 70
    }),
  );

  await aTimeout(0);

  document.dispatchEvent(
    new MouseEvent('mouseup', {
      bubbles: true,
      cancelable: true,
    }),
  );

  await host.updateComplete;

  expect(host.value).to.deep.equal([25, 70]);
});

it('increases by `step` when dragging the maximum thumb', async () => {
  const host = await fixture<GlideCoreSlider>(
    html`<glide-core-slider
      label="Label"
      step="10"
      multiple
    ></glide-core-slider>`,
  );

  expect(host.value).to.deep.equal([25, 75]);

  const sliderTrack = host.shadowRoot?.querySelector('[data-test="slider"]');

  const maximumThumb = host.shadowRoot?.querySelector(
    '[data-test="maximum-thumb"]',
  );

  const trackRect = sliderTrack?.getBoundingClientRect();

  assert(trackRect);
  assert(maximumThumb);

  maximumThumb.dispatchEvent(
    new MouseEvent('mousedown', {
      bubbles: true,
      cancelable: true,
    }),
  );

  await aTimeout(0);

  document.dispatchEvent(
    new MouseEvent('mousemove', {
      bubbles: true,
      cancelable: true,
      clientX: trackRect.left + trackRect.width * 0.8, // 80% position = value of 80
    }),
  );

  await aTimeout(0);

  document.dispatchEvent(
    new MouseEvent('mouseup', {
      bubbles: true,
      cancelable: true,
    }),
  );

  await host.updateComplete;

  expect(host.value).to.deep.equal([25, 80]);
});

it('prevents the minimum thumb from exceeding the maximum thumb when dragging', async () => {
  const host = await fixture<GlideCoreSlider>(
    html`<glide-core-slider label="Label" multiple></glide-core-slider>`,
  );

  expect(host.value).to.deep.equal([25, 75]);

  const sliderTrack = host.shadowRoot?.querySelector('[data-test="slider"]');

  const minimumThumb = host.shadowRoot?.querySelector(
    '[data-test="minimum-thumb"]',
  );

  const trackRect = sliderTrack?.getBoundingClientRect();

  assert(trackRect);
  assert(minimumThumb);

  minimumThumb.dispatchEvent(
    new MouseEvent('mousedown', {
      bubbles: true,
      cancelable: true,
    }),
  );

  await aTimeout(0);

  // Try to drag the minimum thumb to 90% position, which is beyond the maximum thumb (75%)
  document.dispatchEvent(
    new MouseEvent('mousemove', {
      bubbles: true,
      cancelable: true,
      clientX: trackRect.left + trackRect.width * 0.9, // 90% position
    }),
  );

  await aTimeout(0);

  document.dispatchEvent(
    new MouseEvent('mouseup', {
      bubbles: true,
      cancelable: true,
    }),
  );

  await host.updateComplete;

  // The minimum value should be clamped to (maximum - step)
  expect(host.value).to.deep.equal([74, 75]);
});

it('prevents maximum thumb from going below minimum thumb when dragging', async () => {
  const host = await fixture<GlideCoreSlider>(
    html`<glide-core-slider label="Label" multiple></glide-core-slider>`,
  );

  expect(host.value).to.deep.equal([25, 75]);

  const sliderTrack = host.shadowRoot?.querySelector('[data-test="slider"]');

  const maximumThumb = host.shadowRoot?.querySelector(
    '[data-test="maximum-thumb"]',
  );

  const trackRect = sliderTrack?.getBoundingClientRect();

  assert(trackRect);
  assert(maximumThumb);

  maximumThumb.dispatchEvent(
    new MouseEvent('mousedown', {
      bubbles: true,
      cancelable: true,
    }),
  );

  await aTimeout(0);

  // Try to drag the maximum thumb to 10% position, which is below the minimum thumb (25%)
  document.dispatchEvent(
    new MouseEvent('mousemove', {
      bubbles: true,
      cancelable: true,
      clientX: trackRect.left + trackRect.width * 0.1, // 10% position
    }),
  );

  await aTimeout(0);

  document.dispatchEvent(
    new MouseEvent('mouseup', {
      bubbles: true,
      cancelable: true,
    }),
  );

  await host.updateComplete;

  // The maximum value should be clamped to (minimum + step)
  expect(host.value).to.deep.equal([25, 26]);
});

it('does not update when dragging the minimum thumb when `disabled`', async () => {
  const host = await fixture<GlideCoreSlider>(
    html`<glide-core-slider
      label="Label"
      .value=${[25, 75]}
      disabled
      multiple
    ></glide-core-slider>`,
  );

  expect(host.value).to.deep.equal([25, 75]);

  const sliderTrack = host.shadowRoot?.querySelector('[data-test="slider"]');

  const minimumThumb = host.shadowRoot?.querySelector(
    '[data-test="minimum-thumb"]',
  );

  const trackRect = sliderTrack?.getBoundingClientRect();

  assert(trackRect);
  assert(minimumThumb);

  minimumThumb.dispatchEvent(
    new MouseEvent('mousedown', {
      bubbles: true,
      cancelable: true,
    }),
  );

  await aTimeout(0);

  document.dispatchEvent(
    new MouseEvent('mousemove', {
      bubbles: true,
      cancelable: true,
      clientX: trackRect.left + trackRect.width * 0.9,
    }),
  );

  await aTimeout(0);

  document.dispatchEvent(
    new MouseEvent('mouseup', {
      bubbles: true,
      cancelable: true,
    }),
  );

  await host.updateComplete;

  expect(host.value).to.deep.equal([25, 75]);
});

it('does not update when dragging the minimum thumb when `readonly`', async () => {
  const host = await fixture<GlideCoreSlider>(
    html`<glide-core-slider
      label="Label"
      .value=${[25, 75]}
      multiple
      readonly
    ></glide-core-slider>`,
  );

  expect(host.value).to.deep.equal([25, 75]);

  const sliderTrack = host.shadowRoot?.querySelector('[data-test="slider"]');

  const minimumThumb = host.shadowRoot?.querySelector(
    '[data-test="minimum-thumb"]',
  );

  const trackRect = sliderTrack?.getBoundingClientRect();

  assert(trackRect);
  assert(minimumThumb);

  minimumThumb.dispatchEvent(
    new MouseEvent('mousedown', {
      bubbles: true,
      cancelable: true,
    }),
  );

  await aTimeout(0);

  document.dispatchEvent(
    new MouseEvent('mousemove', {
      bubbles: true,
      cancelable: true,
      clientX: trackRect.left + trackRect.width * 0.9,
    }),
  );

  await aTimeout(0);

  document.dispatchEvent(
    new MouseEvent('mouseup', {
      bubbles: true,
      cancelable: true,
    }),
  );

  await host.updateComplete;

  expect(host.value).to.deep.equal([25, 75]);
});

it('does not update when dragging the maximum thumb when `disabled`', async () => {
  const host = await fixture<GlideCoreSlider>(
    html`<glide-core-slider
      label="Label"
      .value=${[25, 75]}
      disabled
      multiple
    ></glide-core-slider>`,
  );

  expect(host.value).to.deep.equal([25, 75]);

  const sliderTrack = host.shadowRoot?.querySelector('[data-test="slider"]');

  const maximumThumb = host.shadowRoot?.querySelector(
    '[data-test="maximum-thumb"]',
  );

  const trackRect = sliderTrack?.getBoundingClientRect();

  assert(trackRect);
  assert(maximumThumb);

  maximumThumb.dispatchEvent(
    new MouseEvent('mousedown', {
      bubbles: true,
      cancelable: true,
    }),
  );

  await aTimeout(0);

  document.dispatchEvent(
    new MouseEvent('mousemove', {
      bubbles: true,
      cancelable: true,
      clientX: trackRect.left + trackRect.width * 0.9,
    }),
  );

  await aTimeout(0);

  document.dispatchEvent(
    new MouseEvent('mouseup', {
      bubbles: true,
      cancelable: true,
    }),
  );

  await host.updateComplete;

  expect(host.value).to.deep.equal([25, 75]);
});

it('does not update when dragging the maximum thumb when `readonly`', async () => {
  const host = await fixture<GlideCoreSlider>(
    html`<glide-core-slider
      label="Label"
      .value=${[25, 75]}
      multiple
      readonly
    ></glide-core-slider>`,
  );

  expect(host.value).to.deep.equal([25, 75]);

  const sliderTrack = host.shadowRoot?.querySelector('[data-test="slider"]');

  const maximumThumb = host.shadowRoot?.querySelector(
    '[data-test="maximum-thumb"]',
  );

  const trackRect = sliderTrack?.getBoundingClientRect();

  assert(trackRect);
  assert(maximumThumb);

  maximumThumb.dispatchEvent(
    new MouseEvent('mousedown', {
      bubbles: true,
      cancelable: true,
    }),
  );

  await aTimeout(0);

  document.dispatchEvent(
    new MouseEvent('mousemove', {
      bubbles: true,
      cancelable: true,
      clientX: trackRect.left + trackRect.width * 0.9,
    }),
  );

  await aTimeout(0);

  document.dispatchEvent(
    new MouseEvent('mouseup', {
      bubbles: true,
      cancelable: true,
    }),
  );

  await host.updateComplete;

  expect(host.value).to.deep.equal([25, 75]);
});

it('clicking on the minimum side of the track updates the minimum value', async () => {
  const host = await fixture<GlideCoreSlider>(
    html`<glide-core-slider label="Label" multiple></glide-core-slider>`,
  );

  expect(host.value).to.deep.equal([25, 75]);

  const sliderTrack = host.shadowRoot?.querySelector('[data-test="slider"]');
  const trackRect = sliderTrack?.getBoundingClientRect();

  assert(trackRect);
  assert(sliderTrack);

  // Click on the track at 10% position (closer to minimum thumb than maximum thumb)
  sliderTrack.dispatchEvent(
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      clientX: trackRect.left + trackRect.width * 0.1, // 10% position
    }),
  );

  await host.updateComplete;

  // Full assertion
  expect(host.value).to.deep.equal([10, 75]);

  // Verify the minimum thumb has moved to the clicked position
  const minimumThumb = host.shadowRoot?.querySelector(
    '[data-test="minimum-thumb"]',
  );

  assert(minimumThumb);

  // TONY TODO: This may fail in CI... we will see!
  // Get the thumb's position as a percentage of the track width
  const thumbStyle = window.getComputedStyle(minimumThumb);
  const thumbLeft = Number.parseFloat(thumbStyle.left);
  const thumbLeftPercent = (thumbLeft / trackRect.width) * 100;

  // The thumb should be positioned at approximately 10% (allowing for small rounding differences)
  expect(thumbLeftPercent).to.be.closeTo(10, 2);
});

it('clicking on the maximum side of the track updates the maximum value', async () => {
  const host = await fixture<GlideCoreSlider>(
    html`<glide-core-slider label="Label" multiple></glide-core-slider>`,
  );

  expect(host.value).to.deep.equal([25, 75]);

  const sliderTrack = host.shadowRoot?.querySelector('[data-test="slider"]');
  const trackRect = sliderTrack?.getBoundingClientRect();

  assert(trackRect);
  assert(sliderTrack);

  // Click on the track at 90% position (closer to maximum thumb than minimum thumb)
  sliderTrack.dispatchEvent(
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      clientX: trackRect.left + trackRect.width * 0.9, // 90% position
    }),
  );

  await host.updateComplete;

  expect(host.value).to.deep.equal([25, 90]);

  // Verify the maximum thumb has moved to the clicked position
  const maximumThumb = host.shadowRoot?.querySelector(
    '[data-test="maximum-thumb"]',
  );

  assert(maximumThumb);

  // TONY TODO: This may fail in CI... we will see!
  // Get the thumb's position as a percentage of the track width
  const thumbStyle = window.getComputedStyle(maximumThumb);
  const thumbLeft = Number.parseFloat(thumbStyle.left);
  const thumbLeftPercent = (thumbLeft / trackRect.width) * 100;

  // The thumb should be positioned at approximately 90% (allowing for small rounding differences)
  expect(thumbLeftPercent).to.be.closeTo(90, 2);
});

it('snaps the minimum input value to the maximum value - step if the entered value exceeds the current maximum input value and is blurred', async () => {
  const host = await fixture<GlideCoreSlider>(
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
  // Entered a value that is greater than the maximum input / thumb
  await sendKeys({ type: '80' });

  minimumInput?.blur();

  expect(minimumInput?.value).to.equal('74');
  expect(host.value).to.deep.equal([74, 75]);
});

it('snaps the maximum input value to the minimum value + step if the entered value is less than the current minimum input value and is blurred', async () => {
  const host = await fixture<GlideCoreSlider>(
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

  // Entered a value that is less than the minimum input / thumb
  await sendKeys({ type: '20' });

  maximumInput?.blur();

  expect(maximumInput?.value).to.equal('26');
  expect(host.value).to.deep.equal([25, 26]);
});

it('maintains a multiple value when switching between multiple and single modes', async () => {
  const host = await fixture<GlideCoreSlider>(
    html`<glide-core-slider label="Label" multiple></glide-core-slider>`,
  );

  host.value = [30, 70];
  await host.updateComplete;

  expect(host.value).to.deep.equal([30, 70]);

  host.multiple = false;
  await host.updateComplete;

  // Should preserve only the minimum value
  expect(host.value).to.deep.equal([30]);

  host.value = [50];
  await host.updateComplete;

  expect(host.value).to.deep.equal([50]);

  host.multiple = true;
  await host.updateComplete;

  // Should preserve the current value as the minimum and add a maximum value
  expect(host.value).to.deep.equal([50, 75]);
});

it('sets the minimum and maximum inputs to disabled when `disabled`', async () => {
  const host = await fixture<GlideCoreSlider>(
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
  const host = await fixture<GlideCoreSlider>(
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

it('sets the minimum and maximum thumbs to aria-disabled when `disabled`', async () => {
  const host = await fixture<GlideCoreSlider>(
    html`<glide-core-slider
      label="Label"
      disabled
      multiple
    ></glide-core-slider>`,
  );

  const minimumThumb = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="minimum-thumb"]',
  );

  const maximumThumb = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="maximum-thumb"]',
  );

  expect(minimumThumb?.hasAttribute('aria-disabled')).to.be.true;
  expect(maximumThumb?.hasAttribute('aria-disabled')).to.be.true;
});

it('sets the minimum and maximum thumbs to aria-readonly when `readonly`', async () => {
  const host = await fixture<GlideCoreSlider>(
    html`<glide-core-slider
      label="Label"
      multiple
      readonly
    ></glide-core-slider>`,
  );

  const minimumThumb = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="minimum-thumb"]',
  );

  const maximumThumb = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="maximum-thumb"]',
  );

  expect(minimumThumb?.hasAttribute('aria-readonly')).to.be.true;
  expect(maximumThumb?.hasAttribute('aria-readonly')).to.be.true;
});

it('prevents updating the `value` when clicking on the track when `disabled`', async () => {
  const host = await fixture<GlideCoreSlider>(
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
      clientX: trackRect.left + trackRect.width * 0.6, // 60% position
    }),
  );

  await host.updateComplete;

  expect(host.value).to.deep.equal([25, 75]);
});

it('prevents updating the `value` when clicking on the track when `readonly`', async () => {
  const host = await fixture<GlideCoreSlider>(
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
      clientX: trackRect.left + trackRect.width * 0.6, // 60% position
    }),
  );

  await host.updateComplete;

  expect(host.value).to.deep.equal([25, 75]);
});

it('prevents updating the `value` when using the arrow keys on the minimum thumb when `disabled`', async () => {
  const host = await fixture<GlideCoreSlider>(
    html`<glide-core-slider
      label="Label"
      .value=${[25, 75]}
      disabled
      multiple
    ></glide-core-slider>`,
  );

  const minimumThumb = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="minimum-thumb"]',
  );

  minimumThumb?.focus();

  await sendKeys({ press: 'ArrowDown' });

  expect(host.value).to.deep.equal([25, 75]);
});

it('prevents updating the `value` when using the arrow keys on the maximum thumb when `disabled`', async () => {
  const host = await fixture<GlideCoreSlider>(
    html`<glide-core-slider
      label="Label"
      .value=${[25, 75]}
      disabled
      multiple
    ></glide-core-slider>`,
  );

  const maximumThumb = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="maximum-thumb"]',
  );

  maximumThumb?.focus();

  await sendKeys({ press: 'ArrowDown' });

  expect(host.value).to.deep.equal([25, 75]);
});

it('prevents updating the `value` when using the arrow keys on the minimum thumb when `readonly`', async () => {
  const host = await fixture<GlideCoreSlider>(
    html`<glide-core-slider
      label="Label"
      .value=${[25, 75]}
      multiple
      readonly
    ></glide-core-slider>`,
  );

  const minimumThumb = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="minimum-thumb"]',
  );

  minimumThumb?.focus();

  await sendKeys({ press: 'ArrowDown' });

  expect(host.value).to.deep.equal([25, 75]);
});

it('prevents updating the `value` when using the arrow keys on the maximum thumb when `readonly`', async () => {
  const host = await fixture<GlideCoreSlider>(
    html`<glide-core-slider
      label="Label"
      .value=${[25, 75]}
      multiple
      readonly
    ></glide-core-slider>`,
  );

  const maximumThumb = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="maximum-thumb"]',
  );

  maximumThumb?.focus();

  await sendKeys({ press: 'ArrowDown' });

  expect(host.value).to.deep.equal([25, 75]);
});

it('hides the minimum and maximum inputs and sliders', async () => {
  const host = await fixture<GlideCoreSlider>(
    html`<glide-core-slider label="Label" multiple></glide-core-slider>`,
  );

  const singleInput = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="single-input"]',
  );

  const singleThumb = host.shadowRoot?.querySelector(
    '[data-test="single-thumb"]',
  );

  expect(singleInput?.checkVisibility()).to.not.be.ok;
  expect(singleThumb?.checkVisibility()).to.not.be.ok;
});
