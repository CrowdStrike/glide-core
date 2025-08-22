import { assert, expect, fixture, html, oneEvent } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import sinon from 'sinon';
import ButtonGroupButton from './button-group.button.js';
import { click } from '@/src/library/mouse.js';
import './button-group.js';

it('dispatches a "selected" event when a button is clicked and not already selected', async () => {
  const host = await fixture(
    html`<glide-core-button-group label="Label">
      <glide-core-button-group-button
        label="One"
      ></glide-core-button-group-button>

      <glide-core-button-group-button
        label="Two"
      ></glide-core-button-group-button>
    </glide-core-button-group>`,
  );

  const button = host.querySelector<ButtonGroupButton>(
    'glide-core-button-group-button:nth-of-type(2)',
  );

  click(button);

  const event = await oneEvent(host, 'selected');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(event.target).to.equal(button);
});

it('does not dispatch a "selected" event when an already selected button is clicked', async () => {
  const host = await fixture(
    html`<glide-core-button-group label="Label">
      <glide-core-button-group-button
        label="One"
        selected
      ></glide-core-button-group-button>

      <glide-core-button-group-button
        label="One"
      ></glide-core-button-group-button>
    </glide-core-button-group>`,
  );

  const spy = sinon.spy();
  host.addEventListener('selected', spy);

  await click(host.querySelector('glide-core-button-group-button'));

  expect(spy.callCount).to.equal(0);
});

it('dispatches "selected" events when arrowing', async () => {
  const host = await fixture(
    html`<glide-core-button-group label="Label">
      <glide-core-button-group-button
        label="One"
        selected
      ></glide-core-button-group-button>

      <glide-core-button-group-button
        label="Two"
      ></glide-core-button-group-button>
    </glide-core-button-group>`,
  );

  const buttons = host.querySelectorAll('glide-core-button-group-button');
  await sendKeys({ press: 'Tab' });

  let event: Event;

  sendKeys({ press: 'ArrowRight' });
  event = await oneEvent(host, 'selected');
  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(event.target).to.equal(buttons[1]);

  sendKeys({ press: 'ArrowLeft' });
  event = await oneEvent(host, 'selected');
  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(event.target).to.equal(buttons[0]);

  sendKeys({ press: 'ArrowDown' });
  event = await oneEvent(host, 'selected');
  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(event.target).to.equal(buttons[1]);

  sendKeys({ press: 'ArrowUp' });
  event = await oneEvent(host, 'selected');
  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(event.target).to.equal(buttons[0]);
});

it('dispatches a "selected" event when a button is selected via Space', async () => {
  const host = await fixture(
    html`<glide-core-button-group label="Label">
      <glide-core-button-group-button
        label="One"
        selected
      ></glide-core-button-group-button>

      <glide-core-button-group-button
        label="Two"
      ></glide-core-button-group-button>
    </glide-core-button-group>`,
  );

  const buttons = host.querySelectorAll('glide-core-button-group-button');

  buttons[1]?.focus();
  sendKeys({ press: ' ' });

  const event = await oneEvent(host, 'selected');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(event.target).to.equal(buttons[1]);
});

it('does not dispatch a "selected" event when a button is selected programmatically', async () => {
  const host = await fixture(
    html`<glide-core-button-group label="Label">
      <glide-core-button-group-button
        label="One"
        selected
      ></glide-core-button-group-button>

      <glide-core-button-group-button
        label="Two"
      ></glide-core-button-group-button>
    </glide-core-button-group>`,
  );

  setTimeout(() => {
    const button = host.querySelector<ButtonGroupButton>(
      'glide-core-button-group-button:nth-of-type(2)',
    );

    assert(button);
    button.selected = true;
  });

  const spy = sinon.spy();
  host.addEventListener('selected', spy);

  expect(spy.callCount).to.equal(0);
});

it('does not dispatch a "selected" event when an already selected button is selected via Space', async () => {
  const host = await fixture(
    html`<glide-core-button-group label="Label">
      <glide-core-button-group-button
        label="One"
        selected
      ></glide-core-button-group-button>

      <glide-core-button-group-button
        label="Two"
      ></glide-core-button-group-button>
    </glide-core-button-group>`,
  );

  const spy = sinon.spy();
  host.addEventListener('selected', spy);

  await sendKeys({ press: 'Tab' });
  await sendKeys({ press: ' ' });

  expect(spy.callCount).to.equal(0);
});

it('does not dispatch a "selected" event a button is selected programmatically', async () => {
  const host = await fixture(
    html`<glide-core-button-group label="Label">
      <glide-core-button-group-button
        label="One"
        selected
      ></glide-core-button-group-button>

      <glide-core-button-group-button
        label="Two"
      ></glide-core-button-group-button>
    </glide-core-button-group>`,
  );

  const spy = sinon.spy();
  host.addEventListener('selected', spy);

  setTimeout(() => {
    const button = host.querySelector<ButtonGroupButton>(
      'glide-core-button-group-button:nth-of-type(2)',
    );

    assert(button);
    button.selected = true;
  });

  expect(spy.callCount).to.equal(0);
});
