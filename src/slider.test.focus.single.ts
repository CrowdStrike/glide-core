import { expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import Slider from './slider.js';

it('focuses the handle when `focus()` is called', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label"></glide-core-slider>`,
  );

  const singleHandle = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="single-handle"]',
  );

  host.focus();

  expect(host.shadowRoot?.activeElement).to.equal(singleHandle);
});

it('focuses the single input after submission when in a forced error state', async () => {
  const form = document.createElement('form');

  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label"></glide-core-slider>`,
    {
      parentNode: form,
    },
  );

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Slider is a bit different because it always has a `value`.
    // So to force a focus state via the `invalid` event listener,
    // one must put the Slider in an invalid state first. Which
    // can only happen by setting custom validity.
    host.setCustomValidity('validity message');
    host.reportValidity();
  });

  const singleInput = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="single-input"]',
  );

  singleInput?.focus();

  await sendKeys({ press: 'Enter' });

  expect(host.shadowRoot?.activeElement).to.equal(singleInput);
});
