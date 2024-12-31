/* eslint-disable @typescript-eslint/no-unused-expressions */

import './inline-alert.js';
import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import GlideCoreInlineAlert from './inline-alert.js';
import click from './library/click.js';
import sinon from 'sinon';

GlideCoreInlineAlert.shadowRootOptions.mode = 'open';

it('dispatches one "remove" event on click', async () => {
  const component = await fixture(
    html`<glide-core-inline-alert variant="informational" removable
      >Label</glide-core-inline-alert
    >`,
  );

  click(component.shadowRoot?.querySelector('[data-test="removal-button"]'));

  const spy = sinon.spy();
  component.addEventListener('remove', spy);

  const event = await oneEvent(component, 'remove');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(spy.callCount).to.equal(1);
});

it('dispatches one "remove" event on Enter ', async () => {
  const component = await fixture<GlideCoreInlineAlert>(
    html`<glide-core-inline-alert variant="informational" removable
      >Label</glide-core-inline-alert
    >`,
  );

  component.shadowRoot
    ?.querySelector<HTMLElement>('[data-test="removal-button"]')
    ?.focus();

  sendKeys({ press: 'Enter' });

  const spy = sinon.spy();
  component.addEventListener('remove', spy);

  const event = await oneEvent(component, 'remove');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(spy.callCount).to.equal(1);
});

it('dispatches one "remove" event on Space ', async () => {
  const component = await fixture<GlideCoreInlineAlert>(
    html`<glide-core-inline-alert variant="informational" removable
      >Label</glide-core-inline-alert
    >`,
  );

  component.shadowRoot
    ?.querySelector<HTMLElement>('[data-test="removal-button"]')
    ?.focus();

  sendKeys({ press: ' ' });

  const spy = sinon.spy();
  component.addEventListener('remove', spy);

  const event = await oneEvent(component, 'remove');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(spy.callCount).to.equal(1);
});
