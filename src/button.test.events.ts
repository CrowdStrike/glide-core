/* eslint-disable @typescript-eslint/no-unused-expressions */

import './button.js';
import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import GlideCoreButton from './button.js';

GlideCoreButton.shadowRootOptions.mode = 'open';

it('dispatches an event when clicked and type="button"', async () => {
  const component = await fixture<GlideCoreButton>(html`
    <glide-core-button type="button">Button</glide-core-button>
  `);

  const clickEvent = oneEvent(component, 'click');

  component.shadowRoot?.querySelector<HTMLButtonElement>('button')?.click();

  const event = await clickEvent;
  expect(event instanceof Event).to.be.true;
});

it('dispatches an event when hitting "enter" and type="button"', async () => {
  const component = await fixture<GlideCoreButton>(html`
    <glide-core-button type="button">Button</glide-core-button>
  `);

  const keyDownEvent = oneEvent(component, 'keydown');

  component.focus();
  await sendKeys({ press: 'Enter' });

  const event = await keyDownEvent;

  expect(event instanceof Event).to.be.true;
  expect(event.key).to.equal('Enter');
});
