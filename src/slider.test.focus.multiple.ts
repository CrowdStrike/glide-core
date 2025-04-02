import { expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import Slider from './slider.js';

it('focuses the minimum input when `focus()` is called', async () => {
  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" multiple></glide-core-slider>`,
  );

  const minimumInput = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="minimum-input"]',
  );

  host.focus();

  expect(host.shadowRoot?.activeElement).to.equal(minimumInput);
});

it('focuses the minimum input after submission when in a forced error state', async () => {
  const form = document.createElement('form');

  const host = await fixture<Slider>(
    html`<glide-core-slider label="Label" multiple></glide-core-slider>`,
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

  const minimumInput = host.shadowRoot?.querySelector<HTMLInputElement>(
    '[data-test="minimum-input"]',
  );

  minimumInput?.focus();

  await sendKeys({ press: 'Enter' });

  expect(host.shadowRoot?.activeElement).to.equal(minimumInput);
});
