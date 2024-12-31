/* eslint-disable @typescript-eslint/no-unused-expressions */

import './button-group.button.js';
import { assert, expect, fixture, html, oneEvent } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import GlideCoreButtonGroup from './button-group.js';
import GlideCoreButtonGroupButton from './button-group.button.js';
import click from './library/click.js';
import sinon from 'sinon';

GlideCoreButtonGroup.shadowRootOptions.mode = 'open';
GlideCoreButtonGroupButton.shadowRootOptions.mode = 'open';

it('emits a "selected" event when a button is clicked and not already selected', async () => {
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
    'glide-core-button-group-button:nth-of-type(2)',
  );

  click(button);

  const event = await oneEvent(component, 'selected');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(event.target).to.equal(button);
});

it('does not emit a "selected" event when an already selected button is clicked', async () => {
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

  component.addEventListener('selected', spy);

  await click(component.querySelector('glide-core-button-group-button'));

  expect(spy.callCount).to.equal(0);
});

it('emits "selected" events when arrowing', async () => {
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

  const buttons = component.querySelectorAll('glide-core-button-group-button');
  buttons[0].focus();

  let event: Event;

  sendKeys({ press: 'ArrowRight' });
  event = await oneEvent(component, 'selected');
  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(event.target).to.be.equal(buttons[1]);

  sendKeys({ press: 'ArrowLeft' });
  event = await oneEvent(component, 'selected');
  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(event.target).to.equal(buttons[0]);

  sendKeys({ press: 'ArrowDown' });
  event = await oneEvent(component, 'selected');
  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(event.target).to.equal(buttons[1]);

  sendKeys({ press: 'ArrowUp' });
  event = await oneEvent(component, 'selected');
  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(event.target).to.equal(buttons[0]);
});

it('emits a "selected" event when a button is selected via Space', async () => {
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

  const buttons = component.querySelectorAll('glide-core-button-group-button');
  buttons[1]?.focus();

  sendKeys({ press: ' ' });
  const event = await oneEvent(component, 'selected');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(event.target).to.be.equal(buttons[1]);
});

it('does not emit a "selected" event when a button is selected programmatically', async () => {
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

  setTimeout(() => {
    const button = component.querySelector<GlideCoreButtonGroupButton>(
      'glide-core-button-group-button:nth-of-type(2)',
    );

    assert(button);
    button.selected = true;
  });

  const spy = sinon.spy();
  component.addEventListener('selected', spy);

  expect(spy.callCount).to.equal(0);
});

it('does not emit a "selected" event when an already selected button is selected via Space', async () => {
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
  component.addEventListener('selected', spy);

  component.querySelector('glide-core-button-group-button')?.focus();
  await sendKeys({ press: ' ' });

  expect(spy.callCount).to.equal(0);
});

it('does not emit a "selected" event a button is selected programmatically', async () => {
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
  component.addEventListener('selected', spy);

  setTimeout(() => {
    const button = component.querySelector<GlideCoreButtonGroupButton>(
      'glide-core-button-group-button:nth-of-type(2)',
    );

    assert(button);
    button.selected = true;
  });

  expect(spy.callCount).to.equal(0);
});
