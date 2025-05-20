import { assert, aTimeout, expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import { sendKeys } from '@web/test-runner-commands';
import Slider from './slider.js';

it('dispatches an "input" event when typing in the minimum input', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" multiple></glide-core-slider>`,
  );

  const spy = sinon.spy();
  host.addEventListener('input', spy);

  const minimumInput = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="minimum-input"]',
  );

  minimumInput?.focus();

  await sendKeys({ type: '1' });

  expect(spy.callCount).to.equal(1);
});

it('dispatches an "input" event when typing in the maximum input', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" multiple></glide-core-slider>`,
  );

  const spy = sinon.spy();
  host.addEventListener('input', spy);

  const maximumInput = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="maximum-input"]',
  );

  maximumInput?.focus();

  await sendKeys({ type: '1' });

  expect(spy.callCount).to.equal(1);
});

it('dispatches a "change" event when the minimum input is blurred', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" multiple></glide-core-slider>`,
  );

  const spy = sinon.spy();
  host.addEventListener('change', spy);

  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: '1' });

  expect(spy.callCount).to.equal(0);

  await sendKeys({ press: 'Tab' });

  expect(spy.callCount).to.equal(1);
});

it('dispatches a "change" event when the maximum input is blurred', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" multiple></glide-core-slider>`,
  );

  const spy = sinon.spy();
  host.addEventListener('change', spy);

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: '1' });

  expect(spy.callCount).to.equal(0);

  await sendKeys({ press: 'Tab' });

  expect(spy.callCount).to.equal(1);
});

it('dispatches an "input" event when dragging the minimum handle', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" multiple></glide-core-slider>`,
  );

  const spy = sinon.spy();
  host.addEventListener('input', spy);

  const sliderTrack = host.shadowRoot?.querySelector('[data-test="slider"]');

  const minimumHandle = host.shadowRoot?.querySelector(
    '[data-test="minimum-handle"]',
  );

  const trackRect = sliderTrack?.getBoundingClientRect();

  assert(trackRect);
  assert(minimumHandle);

  minimumHandle.dispatchEvent(
    new MouseEvent('mousedown', {
      bubbles: true,
      cancelable: true,
    }),
  );

  document.dispatchEvent(
    new MouseEvent('mousemove', {
      bubbles: true,
      cancelable: true,
      clientX: trackRect.left + trackRect.width * 0.2,
    }),
  );

  document.dispatchEvent(
    new MouseEvent('mouseup', {
      bubbles: true,
      cancelable: true,
    }),
  );

  await host.updateComplete;

  // `greaterThan(0)` because each time the handle
  // is dragged and the `value` updates, an `input`
  // event is dispatched, just like native. Rather
  // than asserting an exact value and having a
  // comment explaining why, it may be less confusing
  // to simply verify the event is dispatched at least
  // once.
  expect(spy.callCount).to.be.greaterThan(0);
});

it('dispatches an "input" event when dragging the maximum handle', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" multiple></glide-core-slider>`,
  );

  const spy = sinon.spy();
  host.addEventListener('input', spy);

  const sliderTrack = host.shadowRoot?.querySelector('[data-test="slider"]');

  const maximumHandle = host.shadowRoot?.querySelector(
    '[data-test="maximum-handle"]',
  );

  const trackRect = sliderTrack?.getBoundingClientRect();

  assert(trackRect);
  assert(maximumHandle);

  maximumHandle.dispatchEvent(
    new MouseEvent('mousedown', {
      bubbles: true,
      cancelable: true,
    }),
  );

  document.dispatchEvent(
    new MouseEvent('mousemove', {
      bubbles: true,
      cancelable: true,
      clientX: trackRect.left + trackRect.width * 0.7,
    }),
  );

  document.dispatchEvent(
    new MouseEvent('mouseup', {
      bubbles: true,
      cancelable: true,
    }),
  );

  await host.updateComplete;

  // `greaterThan(0)` because each time the handle is dragged and
  // the `value` updates, an `input` event is dispatched, just like
  // native. Rather than asserting an exact value and having a
  // comment explaining why, it may be less confusing to simply
  // verify the event is dispatched at least once.
  expect(spy.callCount).to.be.greaterThan(0);
});

it('dispatches a "change" event when dragging and letting go of the minimum handle', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" multiple></glide-core-slider>`,
  );

  const spy = sinon.spy();
  host.addEventListener('change', spy);

  const sliderTrack = host.shadowRoot?.querySelector('[data-test="slider"]');

  const minimumHandle = host.shadowRoot?.querySelector(
    '[data-test="minimum-handle"]',
  );

  const trackRect = sliderTrack?.getBoundingClientRect();

  assert(trackRect);
  assert(minimumHandle);

  minimumHandle.dispatchEvent(
    new MouseEvent('mousedown', {
      bubbles: true,
      cancelable: true,
    }),
  );

  document.dispatchEvent(
    new MouseEvent('mousemove', {
      bubbles: true,
      cancelable: true,
      clientX: trackRect.left + trackRect.width * 0.2,
    }),
  );

  expect(spy.callCount).to.equal(0);

  document.dispatchEvent(
    new MouseEvent('mouseup', {
      bubbles: true,
      cancelable: true,
    }),
  );

  await host.updateComplete;

  expect(spy.callCount).to.equal(1);
});

it('dispatches a "change" event when dragging and letting go of the maximum handle', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" multiple></glide-core-slider>`,
  );

  const spy = sinon.spy();
  host.addEventListener('change', spy);

  const sliderTrack = host.shadowRoot?.querySelector('[data-test="slider"]');

  const maximumHandle = host.shadowRoot?.querySelector(
    '[data-test="maximum-handle"]',
  );

  const trackRect = sliderTrack?.getBoundingClientRect();

  assert(trackRect);
  assert(maximumHandle);

  maximumHandle.dispatchEvent(
    new MouseEvent('mousedown', {
      bubbles: true,
      cancelable: true,
    }),
  );

  document.dispatchEvent(
    new MouseEvent('mousemove', {
      bubbles: true,
      cancelable: true,
      clientX: trackRect.left + trackRect.width * 0.7,
    }),
  );

  expect(spy.callCount).to.equal(0);

  document.dispatchEvent(
    new MouseEvent('mouseup', {
      bubbles: true,
      cancelable: true,
    }),
  );

  await host.updateComplete;

  expect(spy.callCount).to.equal(1);
});

it('dispatches an "input" and "change" event when clicking on the minimum side of the track', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" multiple></glide-core-slider>`,
  );

  const inputSpy = sinon.spy();
  const changeSpy = sinon.spy();

  host.addEventListener('input', inputSpy);
  host.addEventListener('change', changeSpy);

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

  expect(inputSpy.callCount).to.equal(1);
  expect(changeSpy.callCount).to.equal(1);
});

it('dispatches an "input" and "change" event when clicking on the maximum side of the track', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" multiple></glide-core-slider>`,
  );

  const inputSpy = sinon.spy();
  const changeSpy = sinon.spy();

  host.addEventListener('input', inputSpy);
  host.addEventListener('change', changeSpy);

  const sliderTrack = host.shadowRoot?.querySelector('[data-test="slider"]');
  const trackRect = sliderTrack?.getBoundingClientRect();

  assert(trackRect);
  assert(sliderTrack);

  // The 90% position is closer to the maximum handle than the
  // minimum handle.
  sliderTrack.dispatchEvent(
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      clientX: trackRect.left + trackRect.width * 0.9,
    }),
  );

  await host.updateComplete;

  expect(inputSpy.callCount).to.equal(1);
  expect(changeSpy.callCount).to.equal(1);
});

it('dispatches an "input" and "change" event on ArrowLeft on the minimum handle', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" multiple></glide-core-slider>`,
  );

  const inputSpy = sinon.spy();
  const changeSpy = sinon.spy();

  host.addEventListener('input', inputSpy);
  host.addEventListener('change', changeSpy);

  const minimumHandle = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="minimum-handle"]',
  );

  minimumHandle?.focus();

  await sendKeys({ press: 'ArrowLeft' });

  expect(inputSpy.callCount).to.equal(1);
  expect(changeSpy.callCount).to.equal(1);
});

it('dispatches an "input" and "change" event on ArrowDown on the minimum handle', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" multiple></glide-core-slider>`,
  );

  const inputSpy = sinon.spy();
  const changeSpy = sinon.spy();

  host.addEventListener('input', inputSpy);
  host.addEventListener('change', changeSpy);

  const minimumHandle = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="minimum-handle"]',
  );

  minimumHandle?.focus();

  await sendKeys({ press: 'ArrowDown' });

  expect(inputSpy.callCount).to.equal(1);
  expect(changeSpy.callCount).to.equal(1);
});

it('dispatches an "input" and "change" event on ArrowRight on the minimum handle', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" multiple></glide-core-slider>`,
  );

  const inputSpy = sinon.spy();
  const changeSpy = sinon.spy();

  host.addEventListener('input', inputSpy);
  host.addEventListener('change', changeSpy);

  const minimumHandle = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="minimum-handle"]',
  );

  minimumHandle?.focus();

  await sendKeys({ press: 'ArrowRight' });

  expect(inputSpy.callCount).to.equal(1);
  expect(changeSpy.callCount).to.equal(1);
});

it('dispatches an "input" and "change" event on ArrowUp on the minimum handle', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" multiple></glide-core-slider>`,
  );

  const inputSpy = sinon.spy();
  const changeSpy = sinon.spy();

  host.addEventListener('input', inputSpy);
  host.addEventListener('change', changeSpy);

  const minimumHandle = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="minimum-handle"]',
  );

  minimumHandle?.focus();

  await sendKeys({ press: 'ArrowUp' });

  expect(inputSpy.callCount).to.equal(1);
  expect(changeSpy.callCount).to.equal(1);
});

it('dispatches an "input" and "change" event on PageDown on the minimum handle', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" multiple></glide-core-slider>`,
  );

  const inputSpy = sinon.spy();
  const changeSpy = sinon.spy();

  host.addEventListener('input', inputSpy);
  host.addEventListener('change', changeSpy);

  const minimumHandle = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="minimum-handle"]',
  );

  minimumHandle?.focus();

  await sendKeys({ press: 'PageDown' });

  expect(inputSpy.callCount).to.equal(1);
  expect(changeSpy.callCount).to.equal(1);
});

it('dispatches an "input" and "change" event on PageUp on the minimum handle', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" multiple></glide-core-slider>`,
  );

  const inputSpy = sinon.spy();
  const changeSpy = sinon.spy();

  host.addEventListener('input', inputSpy);
  host.addEventListener('change', changeSpy);

  const minimumHandle = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="minimum-handle"]',
  );

  minimumHandle?.focus();

  await sendKeys({ press: 'PageUp' });

  expect(inputSpy.callCount).to.equal(1);
  expect(changeSpy.callCount).to.equal(1);
});

it('dispatches an "input" and "change" event on Home on the minimum handle', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" multiple></glide-core-slider>`,
  );

  const inputSpy = sinon.spy();
  const changeSpy = sinon.spy();

  host.addEventListener('input', inputSpy);
  host.addEventListener('change', changeSpy);

  const minimumHandle = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="minimum-handle"]',
  );

  minimumHandle?.focus();

  await sendKeys({ press: 'Home' });

  expect(inputSpy.callCount).to.equal(1);
  expect(changeSpy.callCount).to.equal(1);
});

it('dispatches an "input" and "change" event on End on the minimum handle', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" multiple></glide-core-slider>`,
  );

  const inputSpy = sinon.spy();
  const changeSpy = sinon.spy();

  host.addEventListener('input', inputSpy);
  host.addEventListener('change', changeSpy);

  const minimumHandle = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="minimum-handle"]',
  );

  minimumHandle?.focus();

  await sendKeys({ press: 'End' });

  expect(inputSpy.callCount).to.equal(1);
  expect(changeSpy.callCount).to.equal(1);
});

it('dispatches an "input" and "change" event on ArrowLeft on the maximum handle', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" multiple></glide-core-slider>`,
  );

  const inputSpy = sinon.spy();
  const changeSpy = sinon.spy();

  host.addEventListener('input', inputSpy);
  host.addEventListener('change', changeSpy);

  const maximumHandle = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="maximum-handle"]',
  );

  maximumHandle?.focus();

  await sendKeys({ press: 'ArrowLeft' });

  expect(inputSpy.callCount).to.equal(1);
  expect(changeSpy.callCount).to.equal(1);
});

it('dispatches an "input" and "change" event on ArrowDown on the maximum handle', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" multiple></glide-core-slider>`,
  );

  const inputSpy = sinon.spy();
  const changeSpy = sinon.spy();

  host.addEventListener('input', inputSpy);
  host.addEventListener('change', changeSpy);

  const maximumHandle = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="maximum-handle"]',
  );

  maximumHandle?.focus();

  await sendKeys({ press: 'ArrowDown' });

  expect(inputSpy.callCount).to.equal(1);
  expect(changeSpy.callCount).to.equal(1);
});

it('dispatches an "input" and "change" event on ArrowRight on the maximum handle', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" multiple></glide-core-slider>`,
  );

  const inputSpy = sinon.spy();
  const changeSpy = sinon.spy();

  host.addEventListener('input', inputSpy);
  host.addEventListener('change', changeSpy);

  const maximumHandle = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="maximum-handle"]',
  );

  maximumHandle?.focus();

  await sendKeys({ press: 'ArrowRight' });

  expect(inputSpy.callCount).to.equal(1);
  expect(changeSpy.callCount).to.equal(1);
});

it('dispatches an "input" and "change" event on ArrowUp on the maximum handle', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" multiple></glide-core-slider>`,
  );

  const inputSpy = sinon.spy();
  const changeSpy = sinon.spy();

  host.addEventListener('input', inputSpy);
  host.addEventListener('change', changeSpy);

  const maximumHandle = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="maximum-handle"]',
  );

  maximumHandle?.focus();

  await sendKeys({ press: 'ArrowUp' });

  expect(inputSpy.callCount).to.equal(1);
  expect(changeSpy.callCount).to.equal(1);
});

it('dispatches an "input" and "change" event on PageDown on the maximum handle', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" multiple></glide-core-slider>`,
  );

  const inputSpy = sinon.spy();
  const changeSpy = sinon.spy();

  host.addEventListener('input', inputSpy);
  host.addEventListener('change', changeSpy);

  const maximumHandle = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="maximum-handle"]',
  );

  maximumHandle?.focus();

  await sendKeys({ press: 'PageDown' });

  expect(inputSpy.callCount).to.equal(1);
  expect(changeSpy.callCount).to.equal(1);
});

it('dispatches an "input" and "change" event on PageUp on the maximum handle', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" multiple></glide-core-slider>`,
  );

  const inputSpy = sinon.spy();
  const changeSpy = sinon.spy();

  host.addEventListener('input', inputSpy);
  host.addEventListener('change', changeSpy);

  const maximumHandle = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="maximum-handle"]',
  );

  maximumHandle?.focus();

  await sendKeys({ press: 'PageUp' });

  expect(inputSpy.callCount).to.equal(1);
  expect(changeSpy.callCount).to.equal(1);
});

it('dispatches an "input" and "change" event on Home on the maximum handle', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" multiple></glide-core-slider>`,
  );

  const inputSpy = sinon.spy();
  const changeSpy = sinon.spy();

  host.addEventListener('input', inputSpy);
  host.addEventListener('change', changeSpy);

  const maximumHandle = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="maximum-handle"]',
  );

  maximumHandle?.focus();

  await sendKeys({ press: 'Home' });

  expect(inputSpy.callCount).to.equal(1);
  expect(changeSpy.callCount).to.equal(1);
});

it('dispatches an "input" and "change" event on End on the maximum handle', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" multiple></glide-core-slider>`,
  );

  const inputSpy = sinon.spy();
  const changeSpy = sinon.spy();

  host.addEventListener('input', inputSpy);
  host.addEventListener('change', changeSpy);

  const maximumHandle = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="maximum-handle"]',
  );

  maximumHandle?.focus();

  await sendKeys({ press: 'End' });

  expect(inputSpy.callCount).to.equal(1);
  expect(changeSpy.callCount).to.equal(1);
});

it('does not dispatch events when clicking on the minimum handle', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      multiple
      .value=${[30, 70]}
    ></glide-core-slider>`,
  );

  const minimumHandle = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="minimum-handle"]',
  );

  assert(minimumHandle);

  const inputSpy = sinon.spy();
  const changeSpy = sinon.spy();

  host.addEventListener('input', inputSpy);
  host.addEventListener('change', changeSpy);

  minimumHandle.click();
  await host.updateComplete;

  expect(inputSpy.callCount).to.equal(0);
  expect(changeSpy.callCount).to.equal(0);
});

it('does not dispatch events when clicking on the maximum handle', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      multiple
      .value=${[30, 70]}
    ></glide-core-slider>`,
  );

  const maximumHandle = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="maximum-handle"]',
  );

  assert(maximumHandle);

  const inputSpy = sinon.spy();
  const changeSpy = sinon.spy();

  host.addEventListener('input', inputSpy);
  host.addEventListener('change', changeSpy);

  maximumHandle.click();
  await host.updateComplete;

  expect(inputSpy.callCount).to.equal(0);
  expect(changeSpy.callCount).to.equal(0);
});

it('prevents track click events dispatching immediately after completing a drag operation', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider
      label="Label"
      .value=${[30, 70]}
      multiple
    ></glide-core-slider>`,
  );

  const sliderTrack = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="slider"]',
  );

  const minimumHandle = host.shadowRoot?.querySelector(
    '[data-test="minimum-handle"]',
  );

  assert(sliderTrack);
  assert(minimumHandle);

  const inputSpy = sinon.spy();
  const changeSpy = sinon.spy();

  host.addEventListener('input', inputSpy);
  host.addEventListener('change', changeSpy);

  const trackRect = sliderTrack.getBoundingClientRect();

  minimumHandle.dispatchEvent(
    new MouseEvent('mousedown', {
      bubbles: true,
      cancelable: true,
    }),
  );

  document.dispatchEvent(
    new MouseEvent('mousemove', {
      bubbles: true,
      cancelable: true,
      clientX: trackRect.left + trackRect.width * 0.2,
    }),
  );

  document.dispatchEvent(
    new MouseEvent('mouseup', {
      bubbles: true,
      cancelable: true,
    }),
  );

  await host.updateComplete;

  // At this point, the drag should have dispatched input and change
  // events.
  expect(inputSpy.callCount).to.be.greaterThan(0);
  expect(changeSpy.callCount).to.equal(1);
  expect(host.value).to.deep.equal([20, 70]);

  inputSpy.resetHistory();
  changeSpy.resetHistory();

  // Immediately clicking on the track should be ignored because we
  // just finished dragging. There's a comment in the source
  // explaining why. No new events should be dispatched and the
  // `value` shouldn't be updated.
  sliderTrack.dispatchEvent(
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      clientX: trackRect.left + trackRect.width * 0.2,
    }),
  );

  await host.updateComplete;

  expect(inputSpy.callCount).to.equal(0);
  expect(changeSpy.callCount).to.equal(0);
  expect(host.value).to.deep.equal([20, 70]);

  // Now wait a frame for the drag completion timeout.
  await aTimeout(0);

  // Clicking should now work again.
  sliderTrack.dispatchEvent(
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      clientX: trackRect.left + trackRect.width * 0.4,
    }),
  );

  await host.updateComplete;

  expect(inputSpy.callCount).to.equal(1);
  expect(changeSpy.callCount).to.equal(1);
  expect(host.value).to.deep.equal([40, 70]);
});
