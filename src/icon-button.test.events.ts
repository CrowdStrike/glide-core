import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import sinon from 'sinon';
import IconButton from './icon-button.js';
import { click } from './library/mouse.js';

it('dispatches a "click" event on click', async () => {
  const host = await fixture<IconButton>(
    html`<glide-core-icon-button label="Label">
      <div>Icon</div>
    </glide-core-icon-button>`,
  );

  click(host);
  const event = await oneEvent(host, 'click');

  expect(event instanceof PointerEvent).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
});

it('does not dispatch a "click" event on click when disabled', async () => {
  const host = await fixture<IconButton>(html`
    <glide-core-icon-button label="Label" disabled>
      <div>Icon</div>
    </glide-core-icon-button>
  `);

  const spy = sinon.spy();
  host.addEventListener('click', spy);

  await click(host);

  expect(spy.callCount).to.equal(0);
});

it('dispatches a "click" event on `click()`', async () => {
  const host = await fixture<IconButton>(
    html`<glide-core-icon-button label="Label">
      <div>Icon</div>
    </glide-core-icon-button>`,
  );

  setTimeout(() => {
    host.click();
  });

  const event = await oneEvent(host, 'click');

  expect(event instanceof PointerEvent).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
});

it('does not dispatch a "click" event on `click()` when disabled', async () => {
  const host = await fixture<IconButton>(html`
    <glide-core-icon-button label="Label" disabled>
      <div>Icon</div>
    </glide-core-icon-button>
  `);

  const spy = sinon.spy();
  host.addEventListener('click', spy);

  host.click();

  expect(spy.callCount).to.equal(0);
});

it('dispatches a "click" event on Enter', async () => {
  const host = await fixture<IconButton>(html`
    <glide-core-icon-button label="Label">
      <div>Icon</div>
    </glide-core-icon-button>
  `);

  await sendKeys({ press: 'Tab' });
  sendKeys({ press: 'Enter' });

  const event = await oneEvent(host, 'click');

  expect(event instanceof PointerEvent).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
});

it('does not dispatch a "click" event on Enter when disabled', async () => {
  const host = await fixture<IconButton>(html`
    <glide-core-icon-button label="Label" disabled>
      <div>Icon</div>
    </glide-core-icon-button>
  `);

  const spy = sinon.spy();
  host.addEventListener('click', spy);

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: 'Enter' });

  expect(spy.callCount).to.equal(0);
});

it('dispatches a "click" event on Space', async () => {
  const host = await fixture<IconButton>(html`
    <glide-core-icon-button label="Label">
      <div>Icon</div>
    </glide-core-icon-button>
  `);

  await sendKeys({ press: 'Tab' });
  sendKeys({ press: ' ' });

  const event = await oneEvent(host, 'click');

  expect(event instanceof PointerEvent).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
});

it('does not dispatch a "click" event on Space when disabled', async () => {
  const host = await fixture<IconButton>(html`
    <glide-core-icon-button label="Label" disabled>
      <div>Icon</div>
    </glide-core-icon-button>
  `);

  const spy = sinon.spy();
  host.addEventListener('click', spy);

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: ' ' });

  expect(spy.callCount).to.equal(0);
});
