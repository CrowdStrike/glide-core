/* eslint-disable @typescript-eslint/no-unused-expressions */

import './button.js';
import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import GlideCoreButton from './button.js';

GlideCoreButton.shadowRootOptions.mode = 'open';

it('dispatches a "click" event when clicked', async () => {
  const component = await fixture<GlideCoreButton>(html`
    <glide-core-button label="Label" type="button"></glide-core-button>
  `);

  setTimeout(() => {
    component.click();
  });

  const event = await oneEvent(component, 'click');

  expect(event instanceof PointerEvent).to.be.true;
  expect(event.bubbles).to.be.true;
});

it('dispatches a "click" event on Enter', async () => {
  const component = await fixture<GlideCoreButton>(html`
    <glide-core-button label="Label" type="button"></glide-core-button>
  `);

  component.focus();
  sendKeys({ press: 'Enter' });

  const event = await oneEvent(component, 'click');

  expect(event instanceof PointerEvent).to.be.true;
  expect(event.bubbles).to.be.true;
});

it('dispatches a "click" event on Space', async () => {
  const component = await fixture<GlideCoreButton>(html`
    <glide-core-button label="Label" type="button"></glide-core-button>
  `);

  component.focus();
  sendKeys({ press: ' ' });

  const event = await oneEvent(component, 'click');

  expect(event instanceof PointerEvent).to.be.true;
  expect(event.bubbles).to.be.true;
});

it('dispatches a "reset" event on click', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreButton>(
    html` <glide-core-button label="Label" type="reset"></glide-core-button>`,
    {
      parentNode: form,
    },
  );

  setTimeout(() => {
    component.click();
  });

  const event = await oneEvent(form, 'reset');
  expect(event instanceof Event).to.be.true;
});

it('dispatches a "reset" event on Enter', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreButton>(
    html` <glide-core-button label="Label" type="reset"></glide-core-button>`,
    {
      parentNode: form,
    },
  );

  component.focus();
  sendKeys({ press: 'Enter' });

  const event = await oneEvent(form, 'reset');
  expect(event instanceof Event).to.be.true;
});

it('dispatches a "reset" event on Space', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreButton>(
    html` <glide-core-button label="Label" type="reset"></glide-core-button>`,
    {
      parentNode: form,
    },
  );

  component.focus();
  sendKeys({ press: ' ' });

  const event = await oneEvent(form, 'reset');
  expect(event instanceof Event).to.be.true;
});

it('dispatches a "submit" event on click', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreButton>(
    html` <glide-core-button label="Label" type="submit"></glide-core-button>`,
    {
      parentNode: form,
    },
  );

  form.addEventListener('submit', (event) => event.preventDefault());

  setTimeout(() => {
    component.click();
  });

  const event = await oneEvent(form, 'submit');
  expect(event instanceof Event).to.be.true;
});

it('dispatches a "submit" event on Enter', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreButton>(
    html` <glide-core-button label="Label" type="submit"></glide-core-button>`,
    {
      parentNode: form,
    },
  );

  form.addEventListener('submit', (event) => event.preventDefault());

  component.focus();
  sendKeys({ press: 'Enter' });

  const event = await oneEvent(form, 'submit');
  expect(event instanceof Event).to.be.true;
});

it('dispatches a "submit" event on Space', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreButton>(
    html` <glide-core-button label="Label" type="submit"></glide-core-button>`,
    {
      parentNode: form,
    },
  );

  form.addEventListener('submit', (event) => event.preventDefault());

  component.focus();
  sendKeys({ press: ' ' });

  const event = await oneEvent(form, 'submit');
  expect(event instanceof Event).to.be.true;
});
