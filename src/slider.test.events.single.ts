import { assert, aTimeout, expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import { sendKeys } from '@web/test-runner-commands';
import GlideCoreSlider from './slider.js';

it('dispatches an "input" event typing in the input', async () => {
  const host = await fixture<GlideCoreSlider>(
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

it('dispatches a "change" event blurring the input', async () => {
  const host = await fixture<GlideCoreSlider>(
    html`<glide-core-slider label="Label"></glide-core-slider>`,
  );

  const spy = sinon.spy();
  host.addEventListener('change', spy);

  const singleInput = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="single-input"]',
  );

  singleInput?.focus();

  await sendKeys({ type: '1' });

  singleInput?.blur();

  expect(spy.callCount).to.equal(1);
});

it('dispatches an "input" event dragging the thumb', async () => {
  const host = await fixture<GlideCoreSlider>(
    html`<glide-core-slider label="Label"></glide-core-slider>`,
  );

  const spy = sinon.spy();
  host.addEventListener('input', spy);

  const sliderTrack = host.shadowRoot?.querySelector('[data-test="slider"]');

  const singleThumb = host.shadowRoot?.querySelector(
    '[data-test="single-thumb"]',
  );

  const trackRect = sliderTrack?.getBoundingClientRect();

  assert(trackRect);
  assert(singleThumb);

  singleThumb.dispatchEvent(
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

  expect(spy.callCount).to.be.greaterThan(0);
});

it('dispatches an "change" event dragging and letting go of the thumb', async () => {
  const host = await fixture<GlideCoreSlider>(
    html`<glide-core-slider label="Label"></glide-core-slider>`,
  );

  const spy = sinon.spy();
  host.addEventListener('change', spy);

  const sliderTrack = host.shadowRoot?.querySelector('[data-test="slider"]');

  const singleThumb = host.shadowRoot?.querySelector(
    '[data-test="single-thumb"]',
  );

  const trackRect = sliderTrack?.getBoundingClientRect();

  assert(trackRect);
  assert(singleThumb);

  singleThumb.dispatchEvent(
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

it('dispatches an "input" and "change" event clicking on the track', async () => {
  const host = await fixture<GlideCoreSlider>(
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

it('dispatches an "input" and "change" event on ArrowLeft on the thumb', async () => {
  const host = await fixture<GlideCoreSlider>(
    html`<glide-core-slider label="Label"></glide-core-slider>`,
  );

  const inputSpy = sinon.spy();
  const changeSpy = sinon.spy();

  host.addEventListener('input', inputSpy);
  host.addEventListener('change', changeSpy);

  const singleThumb = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="single-thumb"]',
  );

  singleThumb?.focus();

  await sendKeys({ press: 'ArrowLeft' });

  expect(inputSpy.callCount).to.equal(1);
  expect(changeSpy.callCount).to.equal(1);
});

it('dispatches an "input" and "change" event on ArrowDown on the thumb', async () => {
  const host = await fixture<GlideCoreSlider>(
    html`<glide-core-slider label="Label"></glide-core-slider>`,
  );

  const inputSpy = sinon.spy();
  const changeSpy = sinon.spy();

  host.addEventListener('input', inputSpy);
  host.addEventListener('change', changeSpy);

  const singleThumb = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="single-thumb"]',
  );

  singleThumb?.focus();

  await sendKeys({ press: 'ArrowDown' });

  expect(inputSpy.callCount).to.equal(1);
  expect(changeSpy.callCount).to.equal(1);
});

it('dispatches an "input" and "change" event on ArrowRight on the thumb', async () => {
  const host = await fixture<GlideCoreSlider>(
    html`<glide-core-slider label="Label"></glide-core-slider>`,
  );

  const inputSpy = sinon.spy();
  const changeSpy = sinon.spy();

  host.addEventListener('input', inputSpy);
  host.addEventListener('change', changeSpy);

  const singleThumb = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="single-thumb"]',
  );

  singleThumb?.focus();

  await sendKeys({ press: 'ArrowRight' });

  expect(inputSpy.callCount).to.equal(1);
  expect(changeSpy.callCount).to.equal(1);
});

it('dispatches an "input" and "change" event on ArrowUp on the thumb', async () => {
  const host = await fixture<GlideCoreSlider>(
    html`<glide-core-slider label="Label"></glide-core-slider>`,
  );

  const inputSpy = sinon.spy();
  const changeSpy = sinon.spy();

  host.addEventListener('input', inputSpy);
  host.addEventListener('change', changeSpy);

  const singleThumb = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="single-thumb"]',
  );

  singleThumb?.focus();

  await sendKeys({ press: 'ArrowUp' });

  expect(inputSpy.callCount).to.equal(1);
  expect(changeSpy.callCount).to.equal(1);
});

it('dispatches an "input" and "change" event on PageDown on the thumb', async () => {
  const host = await fixture<GlideCoreSlider>(
    html`<glide-core-slider label="Label"></glide-core-slider>`,
  );

  const inputSpy = sinon.spy();
  const changeSpy = sinon.spy();

  host.addEventListener('input', inputSpy);
  host.addEventListener('change', changeSpy);

  const singleThumb = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="single-thumb"]',
  );

  singleThumb?.focus();

  await sendKeys({ press: 'PageDown' });

  expect(inputSpy.callCount).to.equal(1);
  expect(changeSpy.callCount).to.equal(1);
});

it('dispatches an "input" and "change" event on PageUp on the thumb', async () => {
  const host = await fixture<GlideCoreSlider>(
    html`<glide-core-slider label="Label"></glide-core-slider>`,
  );

  const inputSpy = sinon.spy();
  const changeSpy = sinon.spy();

  host.addEventListener('input', inputSpy);
  host.addEventListener('change', changeSpy);

  const singleThumb = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="single-thumb"]',
  );

  singleThumb?.focus();

  await sendKeys({ press: 'PageUp' });

  expect(inputSpy.callCount).to.equal(1);
  expect(changeSpy.callCount).to.equal(1);
});

it('dispatches an "input" and "change" event on Home on the thumb', async () => {
  const host = await fixture<GlideCoreSlider>(
    html`<glide-core-slider label="Label"></glide-core-slider>`,
  );

  const inputSpy = sinon.spy();
  const changeSpy = sinon.spy();

  host.addEventListener('input', inputSpy);
  host.addEventListener('change', changeSpy);

  const singleThumb = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="single-thumb"]',
  );

  singleThumb?.focus();

  await sendKeys({ press: 'Home' });

  expect(inputSpy.callCount).to.equal(1);
  expect(changeSpy.callCount).to.equal(1);
});

it('dispatches an "input" and "change" event on End on the thumb', async () => {
  const host = await fixture<GlideCoreSlider>(
    html`<glide-core-slider label="Label"></glide-core-slider>`,
  );

  const inputSpy = sinon.spy();
  const changeSpy = sinon.spy();

  host.addEventListener('input', inputSpy);
  host.addEventListener('change', changeSpy);

  const singleThumb = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="single-thumb"]',
  );

  singleThumb?.focus();

  await sendKeys({ press: 'End' });

  expect(inputSpy.callCount).to.equal(1);
  expect(changeSpy.callCount).to.equal(1);
});

it('does not dispatch events when clicking on the thumb', async () => {
  const host = await fixture<GlideCoreSlider>(
    html`<glide-core-slider label="Label" .value=${[40]}></glide-core-slider>`,
  );

  const singleThumb = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="single-thumb"]',
  );

  assert(singleThumb);

  const inputSpy = sinon.spy();
  const changeSpy = sinon.spy();

  host.addEventListener('input', inputSpy);
  host.addEventListener('change', changeSpy);

  singleThumb.click();
  await host.updateComplete;

  expect(inputSpy.callCount).to.equal(0);
  expect(changeSpy.callCount).to.equal(0);
});
