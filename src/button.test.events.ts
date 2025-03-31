import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import sinon from 'sinon';
import GlideCoreButton from './button.js';
import { click } from './library/mouse.js';

it('dispatches a "click" event on click', async () => {
  const host = await fixture<GlideCoreButton>(html`
    <glide-core-button label="Label"></glide-core-button>
  `);

  click(host);

  const event = await oneEvent(host, 'click');

  expect(event instanceof PointerEvent).to.be.true;
  expect(event.bubbles).to.be.true;
});

it('dispatches a "click" event on `click()`', async () => {
  const host = await fixture<GlideCoreButton>(html`
    <glide-core-button label="Label"></glide-core-button>
  `);

  setTimeout(() => {
    host.click();
  });

  const event = await oneEvent(host, 'click');

  expect(event instanceof PointerEvent).to.be.true;
  expect(event.bubbles).to.be.true;
});

it('dispatches a "click" event on Enter', async () => {
  const host = await fixture<GlideCoreButton>(html`
    <glide-core-button label="Label"></glide-core-button>
  `);

  await sendKeys({ press: 'Tab' });
  sendKeys({ press: 'Enter' });

  const event = await oneEvent(host, 'click');

  expect(event instanceof PointerEvent).to.be.true;
  expect(event.bubbles).to.be.true;
});

it('does not dispatch a "click" event on Enter when disabled', async () => {
  const host = await fixture<GlideCoreButton>(html`
    <glide-core-button label="Label" disabled></glide-core-button>
  `);

  const spy = sinon.spy();
  host.addEventListener('click', spy);

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'Enter' });

  expect(spy.callCount).to.equal(0);
});

it('dispatches a "click" event on Space', async () => {
  const host = await fixture<GlideCoreButton>(html`
    <glide-core-button label="Label"></glide-core-button>
  `);

  await sendKeys({ press: 'Tab' });
  sendKeys({ press: ' ' });

  const event = await oneEvent(host, 'click');

  expect(event instanceof PointerEvent).to.be.true;
  expect(event.bubbles).to.be.true;
});

it('does not dispatch a "click" event on Space when disabled', async () => {
  const host = await fixture<GlideCoreButton>(html`
    <glide-core-button label="Label" disabled></glide-core-button>
  `);

  const spy = sinon.spy();
  host.addEventListener('click', spy);

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: ' ' });

  expect(spy.callCount).to.equal(0);
});

it('dispatches a "reset" event on click', async () => {
  const form = document.createElement('form');

  const host = await fixture<GlideCoreButton>(
    html`<glide-core-button label="Label" type="reset"></glide-core-button>`,
    {
      parentNode: form,
    },
  );

  click(host);

  const event = await oneEvent(form, 'reset');
  expect(event instanceof Event).to.be.true;
});

it('does not dispatch a "reset" event on click when disabled', async () => {
  const form = document.createElement('form');

  const host = await fixture<GlideCoreButton>(
    html`<glide-core-button
      label="Label"
      type="reset"
      disabled
    ></glide-core-button>`,
    {
      parentNode: form,
    },
  );

  const spy = sinon.spy();
  form.addEventListener('reset', spy);

  await click(host);

  expect(spy.callCount).to.equal(0);
});

it('dispatches a "reset" event on Enter', async () => {
  const form = document.createElement('form');

  await fixture<GlideCoreButton>(
    html`<glide-core-button label="Label" type="reset"></glide-core-button>`,
    {
      parentNode: form,
    },
  );

  await sendKeys({ press: 'Tab' });
  sendKeys({ press: 'Enter' });

  const event = await oneEvent(form, 'reset');
  expect(event instanceof Event).to.be.true;
});

it('does not dispatch a "reset" event on Enter when disabled', async () => {
  const form = document.createElement('form');

  await fixture<GlideCoreButton>(
    html`<glide-core-button
      label="Label"
      type="reset"
      disabled
    ></glide-core-button>`,
    {
      parentNode: form,
    },
  );

  const spy = sinon.spy();
  form.addEventListener('reset', spy);

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'Enter' });

  expect(spy.callCount).to.equal(0);
});

it('dispatches a "reset" event on Space', async () => {
  const form = document.createElement('form');

  const host = await fixture<GlideCoreButton>(
    html`<glide-core-button label="Label" type="reset"></glide-core-button>`,
    {
      parentNode: form,
    },
  );

  host.focus();
  sendKeys({ press: ' ' });

  const event = await oneEvent(form, 'reset');
  expect(event instanceof Event).to.be.true;
});

it('does not dispatch a "reset" event on Space when disabled', async () => {
  const form = document.createElement('form');

  await fixture<GlideCoreButton>(
    html`<glide-core-button
      label="Label"
      type="reset"
      disabled
    ></glide-core-button>`,
    {
      parentNode: form,
    },
  );

  const spy = sinon.spy();
  form.addEventListener('reset', spy);

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: ' ' });

  expect(spy.callCount).to.equal(0);
});

it('dispatches a "submit" event on click', async () => {
  const form = document.createElement('form');

  const host = await fixture<GlideCoreButton>(
    html`<glide-core-button label="Label" type="submit"></glide-core-button>`,
    {
      parentNode: form,
    },
  );

  form.addEventListener('submit', (event) => event.preventDefault());

  click(host);

  const event = await oneEvent(form, 'submit');
  expect(event instanceof Event).to.be.true;
});

it('does not dispatch a "submit" event on click when disabled', async () => {
  const form = document.createElement('form');

  const host = await fixture<GlideCoreButton>(
    html`<glide-core-button
      label="Label"
      type="submit"
      disabled
    ></glide-core-button>`,
    {
      parentNode: form,
    },
  );

  const spy = sinon.spy();
  form.addEventListener('submit', spy);

  await click(host);

  expect(spy.callCount).to.equal(0);
});

it('dispatches a "submit" event on Enter', async () => {
  const form = document.createElement('form');

  await fixture<GlideCoreButton>(
    html`<glide-core-button label="Label" type="submit"></glide-core-button>`,
    {
      parentNode: form,
    },
  );

  form.addEventListener('submit', (event) => event.preventDefault());

  await sendKeys({ press: 'Tab' });
  sendKeys({ press: 'Enter' });

  const event = await oneEvent(form, 'submit');
  expect(event instanceof Event).to.be.true;
});

it('does not dispatch a "submit" event on Enter when disabled', async () => {
  const form = document.createElement('form');

  await fixture<GlideCoreButton>(
    html`<glide-core-button
      label="Label"
      type="submit"
      disabled
    ></glide-core-button>`,
    {
      parentNode: form,
    },
  );

  const spy = sinon.spy();
  form.addEventListener('submit', spy);

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'Enter' });

  expect(spy.callCount).to.equal(0);
});

it('dispatches a "submit" event on Space', async () => {
  const form = document.createElement('form');

  await fixture<GlideCoreButton>(
    html`<glide-core-button label="Label" type="submit"></glide-core-button>`,
    {
      parentNode: form,
    },
  );

  form.addEventListener('submit', (event) => event.preventDefault());

  await sendKeys({ press: 'Tab' });
  sendKeys({ press: ' ' });

  const event = await oneEvent(form, 'submit');
  expect(event instanceof Event).to.be.true;
});

it('does not dispatch a "submit" event on Space when disabled', async () => {
  const form = document.createElement('form');

  await fixture<GlideCoreButton>(
    html`<glide-core-button
      label="Label"
      type="submit"
      disabled
    ></glide-core-button>`,
    {
      parentNode: form,
    },
  );

  const spy = sinon.spy();
  form.addEventListener('submit', spy);

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: ' ' });

  expect(spy.callCount).to.equal(0);
});
