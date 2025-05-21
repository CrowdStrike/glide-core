import * as sinon from 'sinon';
import { aTimeout, expect, fixture, html, oneEvent } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { click } from './library/mouse.js';
import Dropdown from './dropdown.js';
import './dropdown.option.js';

it('dispatches a "create" event on Create button selection via click', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" filterable open>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  const spy = sinon.spy();
  host.addEventListener('create', spy);

  await click(host);
  await sendKeys({ type: 'create ' });

  const createButton = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="create-button"]',
  );

  click(createButton);

  const event = await oneEvent(host, 'create');

  expect(event instanceof CustomEvent).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(event.detail).to.equal('create ');
  expect(spy.callCount).to.equal(1);
});

it('dispatches a "create" event on Create button selection via Enter', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" filterable open>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  // Wait for Floating UI.
  await aTimeout(0);

  const spy = sinon.spy();
  host.addEventListener('create', spy);

  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: 'create ' });
  sendKeys({ press: 'Enter' });

  const event = await oneEvent(host, 'create');

  expect(event instanceof CustomEvent).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(event.detail).to.equal('create ');
  expect(spy.callCount).to.equal(1);
});

it('does not dispatch "input" events on input', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" filterable>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Label"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const spy = sinon.spy();
  host.addEventListener('input', spy);

  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: 'one' });

  expect(spy.callCount).to.equal(0);
});
