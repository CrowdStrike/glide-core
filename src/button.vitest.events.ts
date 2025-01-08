/* eslint-disable @typescript-eslint/no-unused-expressions */

import './button.js';
import { expect, test } from 'vitest';
import { fixture, html } from '@open-wc/testing-helpers';
import { userEvent } from '@vitest/browser/context';
import GlideCoreButton from './button.js';
import sinon from 'sinon';

GlideCoreButton.shadowRootOptions.mode = 'open';

test('dispatches a "click" event on `click()`', async () => {
  const component = await fixture<GlideCoreButton>(html`
    <glide-core-button label="Label" type="button"></glide-core-button>
  `);

  const spy = sinon.spy();
  component.addEventListener('click', spy);

  component.click();

  expect(spy.calledWith(sinon.match.instanceOf(Event))).to.be.true;
});

test('dispatches a "click" event on Enter', async () => {
  const component = await fixture<GlideCoreButton>(html`
    <glide-core-button label="Label" type="button"></glide-core-button>
  `);

  const spy = sinon.spy();
  component.addEventListener('click', spy);

  component.focus();
  await userEvent.keyboard('{enter}');

  expect(spy.calledWith(sinon.match.instanceOf(MouseEvent))).to.be.true;
});

test('dispatches a "click" event on Space', async () => {
  const component = await fixture<GlideCoreButton>(html`
    <glide-core-button label="Label" type="button"></glide-core-button>
  `);

  const spy = sinon.spy();
  component.addEventListener('click', spy);

  component.focus();
  await userEvent.keyboard(' ');

  expect(spy.calledWith(sinon.match.instanceOf(MouseEvent))).to.be.true;
});

test('dispatches a "reset" event on click', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreButton>(
    html`<glide-core-button label="Label" type="reset"></glide-core-button>`,
    {
      parentNode: form,
    },
  );

  const spy = sinon.spy();
  form.addEventListener('reset', spy);

  await userEvent.click(component);

  expect(spy.calledWith(sinon.match.instanceOf(Event))).to.be.true;
});

test('dispatches a "reset" event on Enter', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreButton>(
    html`<glide-core-button label="Label" type="reset"></glide-core-button>`,
    {
      parentNode: form,
    },
  );

  const spy = sinon.spy();
  form.addEventListener('reset', spy);

  component.focus();
  await userEvent.keyboard('{enter}');

  expect(spy.calledWith(sinon.match.instanceOf(Event))).to.be.true;
});

test('dispatches a "reset" event on Space', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreButton>(
    html`<glide-core-button label="Label" type="reset"></glide-core-button>`,
    {
      parentNode: form,
    },
  );

  const spy = sinon.spy();
  form.addEventListener('reset', spy);

  component.focus();
  await userEvent.keyboard(' ');

  expect(spy.calledWith(sinon.match.instanceOf(Event))).to.be.true;
});

test('dispatches a "submit" event on click', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreButton>(
    html`<glide-core-button label="Label" type="submit"></glide-core-button>`,
    {
      parentNode: form,
    },
  );

  const spy = sinon.spy();

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    spy(event);
  });

  await userEvent.click(component);

  expect(spy.calledWith(sinon.match.instanceOf(Event))).to.be.true;
});

test('dispatches a "submit" event on Enter', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreButton>(
    html`<glide-core-button label="Label" type="submit"></glide-core-button>`,
    {
      parentNode: form,
    },
  );

  const spy = sinon.spy();

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    spy(event);
  });

  component.focus();
  await userEvent.keyboard('{enter}');

  expect(spy.calledWith(sinon.match.instanceOf(Event))).to.be.true;
});

test('dispatches a "submit" event on Space', async () => {
  const form = document.createElement('form');

  const component = await fixture<GlideCoreButton>(
    html`<glide-core-button label="Label" type="submit"></glide-core-button>`,
    {
      parentNode: form,
    },
  );

  const spy = sinon.spy();

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    spy(event);
  });

  component.focus();
  await userEvent.keyboard(' ');

  expect(spy.calledWith(sinon.match.instanceOf(Event))).to.be.true;
});
