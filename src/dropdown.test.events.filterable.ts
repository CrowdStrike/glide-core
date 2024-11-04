/* eslint-disable @typescript-eslint/no-unused-expressions */

import * as sinon from 'sinon';
import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import GlideCoreDropdown from './dropdown.js';
import GlideCoreDropdownOption from './dropdown.option.js';

GlideCoreDropdown.shadowRootOptions.mode = 'open';
GlideCoreDropdownOption.shadowRootOptions.mode = 'open';

const defaultSlot = html`
  <glide-core-dropdown-option label="One"></glide-core-dropdown-option>
  <glide-core-dropdown-option label="Two"></glide-core-dropdown-option>
  <glide-core-dropdown-option label="Three"></glide-core-dropdown-option>
  <glide-core-dropdown-option label="Four"></glide-core-dropdown-option>
  <glide-core-dropdown-option label="Five"></glide-core-dropdown-option>
  <glide-core-dropdown-option label="Six"></glide-core-dropdown-option>
  <glide-core-dropdown-option label="Seven"></glide-core-dropdown-option>
  <glide-core-dropdown-option label="Eight"></glide-core-dropdown-option>
  <glide-core-dropdown-option label="Nine"></glide-core-dropdown-option>
  <glide-core-dropdown-option label="Ten"></glide-core-dropdown-option>
  <glide-core-dropdown-option label="Eleven"></glide-core-dropdown-option>
`;

it('dispatches a "filter" event on "input"', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      ${defaultSlot}
    </glide-core-dropdown>`,
  );

  component.focus();
  sendKeys({ type: 'o' });

  const event = await oneEvent(component, 'filter');

  expect(event instanceof CustomEvent).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(event.detail).to.equal('o');
});

it('does not dispatch "input" events on input', async () => {
  const component = await fixture<GlideCoreDropdown>(
    html`<glide-core-dropdown label="Label" placeholder="Placeholder">
      ${defaultSlot}
    </glide-core-dropdown>`,
  );

  const spy = sinon.spy();
  component.addEventListener('input', spy);
  component.focus();
  await sendKeys({ type: 'one' });

  expect(spy.callCount).to.equal(0);
});
