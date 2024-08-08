/* eslint-disable @typescript-eslint/no-unused-expressions */

import './button.js';
import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import GlideCoreButton from './button.js';

GlideCoreButton.shadowRootOptions.mode = 'open';

it('participates in a form when type="reset"', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreButton>(
    html` <glide-core-button type="reset">Button</glide-core-button> `,
    {
      parentNode: form,
    },
  );

  const formResetEvent = oneEvent(form, 'reset');

  component.shadowRoot?.querySelector<HTMLButtonElement>('button')?.click();

  const event = await formResetEvent;
  expect(event instanceof Event).to.be.true;
});

it('participates in a form when hitting "enter" and type="reset"', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreButton>(
    html` <glide-core-button type="reset">Button</glide-core-button> `,
    {
      parentNode: form,
    },
  );

  const formResetEvent = oneEvent(form, 'reset');
  component.focus();
  await sendKeys({ press: 'Enter' });

  const event = await formResetEvent;
  expect(event instanceof Event).to.be.true;
});

it('participates in a form when type="submit"', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreButton>(
    html` <glide-core-button type="submit">Button</glide-core-button> `,
    {
      parentNode: form,
    },
  );

  form.addEventListener('submit', (event) => event.preventDefault());

  const formSubmitEvent = oneEvent(form, 'submit');
  component.shadowRoot?.querySelector<GlideCoreButton>('button')?.click();

  const event = await formSubmitEvent;
  expect(event instanceof Event).to.be.true;
});

it('participates in a form when hitting "enter" and type="submit"', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreButton>(
    html` <glide-core-button type="submit">Button</glide-core-button> `,
    {
      parentNode: form,
    },
  );

  form.addEventListener('submit', (event) => event.preventDefault());

  const formSubmitEvent = oneEvent(form, 'submit');
  component.focus();
  await sendKeys({ press: 'Enter' });

  const event = await formSubmitEvent;
  expect(event instanceof Event).to.be.true;
});
