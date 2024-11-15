/* eslint-disable @typescript-eslint/no-unused-expressions */

import './button-group.button.js';
import { aTimeout, expect, fixture, html, oneEvent } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import GlideCoreButtonGroup from './button-group.js';
import GlideCoreButtonGroupButton from './button-group.button.js';
import sinon from 'sinon';

GlideCoreButtonGroup.shadowRootOptions.mode = 'open';
GlideCoreButtonGroupButton.shadowRootOptions.mode = 'open';

it('emits a "change" event when a button is clicked and not already selected', async () => {
  const component = await fixture(
    html`<glide-core-button-group>
      <glide-core-button-group-button
        label="One"
      ></glide-core-button-group-button>

      <glide-core-button-group-button
        label="Two"
      ></glide-core-button-group-button>
    </glide-core-button-group>`,
  );

  const button = component.querySelector<GlideCoreButtonGroupButton>(
    'glide-core-button-group-button:last-of-type',
  );

  setTimeout(() => {
    button?.click();
  });

  const event = await oneEvent(component, 'change');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.target).to.equal(button);
});

it('emits an "input" event when a button is clicked and not already selected', async () => {
  const component = await fixture(
    html`<glide-core-button-group>
      <glide-core-button-group-button
        label="One"
      ></glide-core-button-group-button>

      <glide-core-button-group-button
        label="Two"
      ></glide-core-button-group-button>
    </glide-core-button-group>`,
  );

  const button = component.querySelector<GlideCoreButtonGroupButton>(
    'glide-core-button-group-button:last-of-type',
  );

  setTimeout(() => {
    button?.click();
  });

  const event = await oneEvent(component, 'input');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(event.target).to.equal(button);
});

it('does not emit an "change" event when clicked button is clicked and already selected', async () => {
  const component = await fixture(
    html`<glide-core-button-group>
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
  const button = component.querySelector('glide-core-button-group-button');

  component.addEventListener('change', spy);

  setTimeout(() => {
    button?.click();
  });

  await aTimeout(0);
  expect(spy.callCount).to.equal(0);
});

it('does not emit an "input" event when clicked button is clicked and already selected', async () => {
  const component = await fixture(
    html`<glide-core-button-group>
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
  const button = component.querySelector('glide-core-button-group-button');

  component.addEventListener('input', spy);

  setTimeout(() => {
    button?.click();
  });

  await aTimeout(0);
  expect(spy.callCount).to.equal(0);
});

it('emits a "change" event when arrowing', async () => {
  const component = await fixture(
    html`<glide-core-button-group>
      <glide-core-button-group-button
        label="One"
      ></glide-core-button-group-button>

      <glide-core-button-group-button
        label="Two"
        selected
      ></glide-core-button-group-button>
    </glide-core-button-group>`,
  );

  const buttons = document.querySelectorAll('glide-core-button-group-button');
  buttons[0].focus();

  let event: Event;

  sendKeys({ press: 'ArrowRight' });
  event = await oneEvent(component, 'change');
  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;

  sendKeys({ press: 'ArrowLeft' });
  event = await oneEvent(component, 'change');
  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;

  sendKeys({ press: 'ArrowDown' });
  event = await oneEvent(component, 'change');
  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;

  sendKeys({ press: 'ArrowUp' });
  event = await oneEvent(component, 'change');
  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
});

it('emits an "input" event when arrowing', async () => {
  const component = await fixture(
    html`<glide-core-button-group>
      <glide-core-button-group-button
        label="One"
      ></glide-core-button-group-button>

      <glide-core-button-group-button
        label="Two"
      ></glide-core-button-group-button>
    </glide-core-button-group>`,
  );

  const buttons = document.querySelectorAll('glide-core-button-group-button');
  buttons[0].focus();

  let event: Event;

  sendKeys({ press: 'ArrowRight' });
  event = await oneEvent(component, 'input');
  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;

  sendKeys({ press: 'ArrowLeft' });
  event = await oneEvent(component, 'input');
  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;

  sendKeys({ press: 'ArrowDown' });
  event = await oneEvent(component, 'input');
  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;

  sendKeys({ press: 'ArrowUp' });
  event = await oneEvent(component, 'input');
  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
});

it('emits a "change" event when a button is selected via Space', async () => {
  const component = await fixture(
    html`<glide-core-button-group>
      <glide-core-button-group-button
        label="One"
        selected
      ></glide-core-button-group-button>

      <glide-core-button-group-button
        label="Two"
      ></glide-core-button-group-button>
    </glide-core-button-group>`,
  );

  const buttons = document.querySelectorAll('glide-core-button-group-button');
  buttons[1]?.focus();

  sendKeys({ press: ' ' });
  const event = await oneEvent(component, 'input');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
});

it('emits a "change" event when a button is selected programmatically', async () => {
  const component = await fixture(
    html`<glide-core-button-group>
      <glide-core-button-group-button
        label="One"
        selected
      ></glide-core-button-group-button>

      <glide-core-button-group-button
        label="Two"
      ></glide-core-button-group-button>
    </glide-core-button-group>`,
  );

  const buttons = document.querySelectorAll('glide-core-button-group-button');

  setTimeout(() => {
    buttons[1].selected = true;
  });

  const event = await oneEvent(component, 'input');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
});

it('does not emit a "change" event when an already selected button is selected via Space', async () => {
  const component = await fixture(
    html`<glide-core-button-group>
      <glide-core-button-group-button
        label="One"
        selected
      ></glide-core-button-group-button>

      <glide-core-button-group-button
        label="Two"
      ></glide-core-button-group-button>
    </glide-core-button-group>`,
  );

  const buttons = document.querySelectorAll('glide-core-button-group-button');
  buttons[0]?.focus();

  const spy = sinon.spy();
  component.addEventListener('change', spy);

  sendKeys({ press: ' ' });
  expect(spy.callCount).to.equal(0);
});

it('does not emit a "change" event a button is selected programmatically', async () => {
  const component = await fixture(
    html`<glide-core-button-group>
      <glide-core-button-group-button
        label="One"
        selected
      ></glide-core-button-group-button>

      <glide-core-button-group-button
        label="Two"
      ></glide-core-button-group-button>
    </glide-core-button-group>`,
  );

  const buttons = document.querySelectorAll('glide-core-button-group-button');

  const spy = sinon.spy();
  component.addEventListener('change', spy);

  setTimeout(() => {
    buttons[1].selected = true;
  });

  expect(spy.callCount).to.equal(0);
});

it('does not emit a "input" event a button is selected programmatically', async () => {
  const component = await fixture(
    html`<glide-core-button-group>
      <glide-core-button-group-button
        label="One"
        selected
      ></glide-core-button-group-button>

      <glide-core-button-group-button
        label="Two"
      ></glide-core-button-group-button>
    </glide-core-button-group>`,
  );

  const buttons = document.querySelectorAll('glide-core-button-group-button');

  const spy = sinon.spy();
  component.addEventListener('input', spy);

  setTimeout(() => {
    buttons[1].selected = true;
  });

  expect(spy.callCount).to.equal(0);
});
