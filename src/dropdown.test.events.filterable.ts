import * as sinon from 'sinon';
import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { click } from './library/mouse.js';
import Dropdown from './dropdown.js';
import './dropdown.option.js';

it('dispatches an "add" event on Add button selection via click', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" add-button filterable>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const spy = sinon.spy();
  host.addEventListener('add', spy);

  await click(host);
  await sendKeys({ type: 'three' });

  const addButton = host.shadowRoot?.querySelector<HTMLElement>(
    '[data-test="add-button"]',
  );

  click(addButton);

  const event = await oneEvent(host, 'add');

  expect(event instanceof CustomEvent).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(event.detail).to.equal('three');
  expect(spy.callCount).to.equal(1);
});

it('dispatches an "add" event on Add button selection via Enter', async () => {
  const host = await fixture<Dropdown>(
    html`<glide-core-dropdown label="Label" add-button filterable>
      <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
      <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
    </glide-core-dropdown>`,
  );

  const spy = sinon.spy();
  host.addEventListener('add', spy);

  await sendKeys({ press: 'Tab' });
  await sendKeys({ type: 'three' });
  sendKeys({ press: 'Enter' });

  const event = await oneEvent(host, 'add');

  expect(event instanceof CustomEvent).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(event.detail).to.equal('three');
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
