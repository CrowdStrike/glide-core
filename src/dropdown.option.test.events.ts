/* eslint-disable @typescript-eslint/no-unused-expressions */

import {
  elementUpdated,
  expect,
  fixture,
  html,
  oneEvent,
} from '@open-wc/testing';
import GlideCoreDropdownOption from './dropdown.option.js';
import sinon from 'sinon';

GlideCoreDropdownOption.shadowRootOptions.mode = 'open';

it('dispatches a "private-label-change" event', async () => {
  const component = await fixture<GlideCoreDropdownOption>(
    html`<glide-core-dropdown-option
      label="Label"
    ></glide-core-dropdown-option>`,
  );

  setTimeout(() => {
    component.label = 'Two';
  });

  const event = await oneEvent(component, 'private-label-change');
  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
});

it('dispatches a "private-selected-change" event', async () => {
  const component = await fixture<GlideCoreDropdownOption>(
    html`<glide-core-dropdown-option
      label="Label"
    ></glide-core-dropdown-option>`,
  );

  setTimeout(() => {
    component.selected = true;
  });

  const event = await oneEvent(component, 'private-selected-change');
  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
});

it('dispatches a "private-value-change" event', async () => {
  const component = await fixture<GlideCoreDropdownOption>(
    html`<glide-core-dropdown-option
      label="Label"
    ></glide-core-dropdown-option>`,
  );

  setTimeout(() => {
    component.value = '';
  });

  const event = await oneEvent(component, 'private-value-change');
  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
});

it('does not allow "toggle" to propagate', async () => {
  const component = await fixture<GlideCoreDropdownOption>(
    html`<glide-core-dropdown-option
      label="Label"
    ></glide-core-dropdown-option>`,
  );

  const spy = sinon.spy();
  component.addEventListener('toggle', spy);

  component.privateIsTooltipOpen = true;
  await elementUpdated(component);

  expect(spy.callCount).to.equal(0);
});
