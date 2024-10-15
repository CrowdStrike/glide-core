/* eslint-disable @typescript-eslint/no-unused-expressions */

import * as sinon from 'sinon';
import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import GlideCoreDropdown from './dropdown.js';
import GlideCoreDropdownOption from './dropdown.option.js';

GlideCoreDropdown.shadowRootOptions.mode = 'open';
GlideCoreDropdownOption.shadowRootOptions.mode = 'open';

const defaultSlot = html`
  <glide-core-dropdown-option
    label="One"
    value="one"
  ></glide-core-dropdown-option>

  <glide-core-dropdown-option
    label="Two"
    value="two"
  ></glide-core-dropdown-option>

  <glide-core-dropdown-option
    label="Three"
    value="three"
  ></glide-core-dropdown-option>

  <glide-core-dropdown-option
    label="Four"
    value="four"
  ></glide-core-dropdown-option>

  <glide-core-dropdown-option
    label="Five"
    value="five"
  ></glide-core-dropdown-option>

  <glide-core-dropdown-option
    label="Six"
    value="six"
  ></glide-core-dropdown-option>

  <glide-core-dropdown-option
    label="Seven"
    value="seven"
  ></glide-core-dropdown-option>

  <glide-core-dropdown-option
    label="Eight"
    value="eight"
  ></glide-core-dropdown-option>

  <glide-core-dropdown-option
    label="Nine"
    value="nine"
  ></glide-core-dropdown-option>

  <glide-core-dropdown-option
    label="Ten"
    value="ten"
  ></glide-core-dropdown-option>

  <glide-core-dropdown-option
    label="Eleven"
    value="eleven"
  ></glide-core-dropdown-option>
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
