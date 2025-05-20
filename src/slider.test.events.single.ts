import { assert, aTimeout, expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import { sendKeys } from '@web/test-runner-commands';
import Slider from './slider.js';

it('dispatches an "input" event when typing in the input', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label"></glide-core-slider>`,
  );

  const spy = sinon.spy();
  host.addEventListener('input', spy);

  const singleInput = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="single-input"]',
  );

  singleInput?.focus();

  await sendKeys({ type: '1' });

  expect(spy.callCount).to.equal(1);
});

it('dispatches a "change" event when the input is blurred', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label"></glide-core-slider>`,
  );

  const spy = sinon.spy();
  host.addEventListener('change', spy);

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: '1' });

  expect(spy.callCount).to.equal(0);

  await sendKeys({ press: 'Tab' });

  expect(spy.callCount).to.equal(1);
});

it('dispatches an "input" event when dragging the handle', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label"></glide-core-slider>`,
  );

  const spy = sinon.spy();
  host.addEventListener('input', spy);

  const sliderTrack = host.shadowRoot?.querySelector('[data-test="slider"]');

  const singleHandle = host.shadowRoot?.querySelector(
    '[data-test="single-handle"]',
  );

  const trackRect = sliderTrack?.getBoundingClientRect();

  assert(trackRect);
  assert(singleHandle);

  singleHandle.dispatchEvent(
    new MouseEvent('mousedown', {
      bubbles: true,
      cancelable: true,
    }),
  );

  document.dispatchEvent(
    new MouseEvent('mousemove', {
      bubbles: true,
      cancelable: true,
      clientX: trackRect.left + trackRect.width * 0.2, // 20% position = value of 20
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

it('dispatches a "change" event when dragging and letting go of the handle', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label"></glide-core-slider>`,
  );

  const spy = sinon.spy();
  host.addEventListener('change', spy);

  const sliderTrack = host.shadowRoot?.querySelector('[data-test="slider"]');

  const singleHandle = host.shadowRoot?.querySelector(
    '[data-test="single-handle"]',
  );

  const trackRect = sliderTrack?.getBoundingClientRect();

  assert(trackRect);
  assert(singleHandle);

  singleHandle.dispatchEvent(
    new MouseEvent('mousedown', {
      bubbles: true,
      cancelable: true,
    }),
  );

  document.dispatchEvent(
    new MouseEvent('mousemove', {
      bubbles: true,
      cancelable: true,
      clientX: trackRect.left + trackRect.width * 0.2, // 20% position = value of 20
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

it('dispatches an "input" and "change" event when clicking on the track', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label"></glide-core-slider>`,
  );

  const inputSpy = sinon.spy();
  const changeSpy = sinon.spy();

  host.addEventListener('input', inputSpy);
  host.addEventListener('change', changeSpy);

  const sliderTrack = host.shadowRoot?.querySelector('[data-test="slider"]');
  const trackRect = sliderTrack?.getBoundingClientRect();

  assert(trackRect);
  assert(sliderTrack);

  sliderTrack.dispatchEvent(
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      clientX: trackRect.left + trackRect.width * 0.2,
    }),
  );

  await host.updateComplete;

  expect(inputSpy.callCount).to.equal(1);
  expect(changeSpy.callCount).to.equal(1);
});

it('dispatches an "input" and "change" event on ArrowLeft on the handle', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label"></glide-core-slider>`,
  );

  const inputSpy = sinon.spy();
  const changeSpy = sinon.spy();

  host.addEventListener('input', inputSpy);
  host.addEventListener('change', changeSpy);

  const singleHandle = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="single-handle"]',
  );

  singleHandle?.focus();

  await sendKeys({ press: 'ArrowLeft' });

  expect(inputSpy.callCount).to.equal(1);
  expect(changeSpy.callCount).to.equal(1);
});

it('dispatches an "input" and "change" event on ArrowDown on the handle', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label"></glide-core-slider>`,
  );

  const inputSpy = sinon.spy();
  const changeSpy = sinon.spy();

  host.addEventListener('input', inputSpy);
  host.addEventListener('change', changeSpy);

  const singleHandle = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="single-handle"]',
  );

  singleHandle?.focus();

  await sendKeys({ press: 'ArrowDown' });

  expect(inputSpy.callCount).to.equal(1);
  expect(changeSpy.callCount).to.equal(1);
});

it('dispatches an "input" and "change" event on ArrowRight on the handle', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label"></glide-core-slider>`,
  );

  const inputSpy = sinon.spy();
  const changeSpy = sinon.spy();

  host.addEventListener('input', inputSpy);
  host.addEventListener('change', changeSpy);

  const singleHandle = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="single-handle"]',
  );

  singleHandle?.focus();

  await sendKeys({ press: 'ArrowRight' });

  expect(inputSpy.callCount).to.equal(1);
  expect(changeSpy.callCount).to.equal(1);
});

it('dispatches an "input" and "change" event on ArrowUp on the handle', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label"></glide-core-slider>`,
  );

  const inputSpy = sinon.spy();
  const changeSpy = sinon.spy();

  host.addEventListener('input', inputSpy);
  host.addEventListener('change', changeSpy);

  const singleHandle = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="single-handle"]',
  );

  singleHandle?.focus();

  await sendKeys({ press: 'ArrowUp' });

  expect(inputSpy.callCount).to.equal(1);
  expect(changeSpy.callCount).to.equal(1);
});

it('dispatches an "input" and "change" event on PageDown on the handle', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label"></glide-core-slider>`,
  );

  const inputSpy = sinon.spy();
  const changeSpy = sinon.spy();

  host.addEventListener('input', inputSpy);
  host.addEventListener('change', changeSpy);

  const singleHandle = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="single-handle"]',
  );

  singleHandle?.focus();

  await sendKeys({ press: 'PageDown' });

  expect(inputSpy.callCount).to.equal(1);
  expect(changeSpy.callCount).to.equal(1);
});

it('dispatches an "input" and "change" event on PageUp on the handle', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label"></glide-core-slider>`,
  );

  const inputSpy = sinon.spy();
  const changeSpy = sinon.spy();

  host.addEventListener('input', inputSpy);
  host.addEventListener('change', changeSpy);

  const singleHandle = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="single-handle"]',
  );

  singleHandle?.focus();

  await sendKeys({ press: 'PageUp' });

  expect(inputSpy.callCount).to.equal(1);
  expect(changeSpy.callCount).to.equal(1);
});

it('dispatches an "input" and "change" event on Home on the handle', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label"></glide-core-slider>`,
  );

  const inputSpy = sinon.spy();
  const changeSpy = sinon.spy();

  host.addEventListener('input', inputSpy);
  host.addEventListener('change', changeSpy);

  const singleHandle = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="single-handle"]',
  );

  singleHandle?.focus();

  await sendKeys({ press: 'Home' });

  expect(inputSpy.callCount).to.equal(1);
  expect(changeSpy.callCount).to.equal(1);
});

it('dispatches an "input" and "change" event on End on the handle', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label"></glide-core-slider>`,
  );

  const inputSpy = sinon.spy();
  const changeSpy = sinon.spy();

  host.addEventListener('input', inputSpy);
  host.addEventListener('change', changeSpy);

  const singleHandle = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="single-handle"]',
  );

  singleHandle?.focus();

  await sendKeys({ press: 'End' });

  expect(inputSpy.callCount).to.equal(1);
  expect(changeSpy.callCount).to.equal(1);
});

it('does not dispatch events when clicking on the handle', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" .value=${[40]}></glide-core-slider>`,
  );

  const singleHandle = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="single-handle"]',
  );

  assert(singleHandle);

  const inputSpy = sinon.spy();
  const changeSpy = sinon.spy();

  host.addEventListener('input', inputSpy);
  host.addEventListener('change', changeSpy);

  singleHandle.click();
  await host.updateComplete;

  expect(inputSpy.callCount).to.equal(0);
  expect(changeSpy.callCount).to.equal(0);
});

it('prevents track click events dispatching immediately after completing a drag operation', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" .value=${[30]}></glide-core-slider>`,
  );

  const sliderTrack = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="slider"]',
  );

  const singleHandle = host.shadowRoot?.querySelector(
    '[data-test="single-handle"]',
  );

  assert(sliderTrack);
  assert(singleHandle);

  const inputSpy = sinon.spy();
  const changeSpy = sinon.spy();

  host.addEventListener('input', inputSpy);
  host.addEventListener('change', changeSpy);

  const trackRect = sliderTrack.getBoundingClientRect();

  singleHandle.dispatchEvent(
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
  expect(host.value).to.deep.equal([20]);

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
  expect(host.value).to.deep.equal([20]);

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
  expect(host.value).to.deep.equal([40]);
});
