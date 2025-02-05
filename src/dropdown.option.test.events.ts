import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import sinon from 'sinon';
import GlideCoreDropdownOption from './dropdown.option.js';

it('dispatches a "private-label-change" event', async () => {
  const host = await fixture<GlideCoreDropdownOption>(
    html`<glide-core-dropdown-option
      label="Label"
    ></glide-core-dropdown-option>`,
  );

  setTimeout(() => {
    host.label = 'Two';
  });

  const event = await oneEvent(host, 'private-label-change');
  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
});

it('dispatches a "private-selected-change" event', async () => {
  const host = await fixture<GlideCoreDropdownOption>(
    html`<glide-core-dropdown-option
      label="Label"
    ></glide-core-dropdown-option>`,
  );

  setTimeout(() => {
    host.selected = true;
  });

  const event = await oneEvent(host, 'private-selected-change');
  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
});

it('dispatches a "private-value-change" event', async () => {
  const host = await fixture<GlideCoreDropdownOption>(
    html`<glide-core-dropdown-option
      label="Label"
    ></glide-core-dropdown-option>`,
  );

  setTimeout(() => {
    host.value = '';
  });

  const event = await oneEvent(host, 'private-value-change');
  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
});

it('does not allow its "toggle" event to propagate', async () => {
  const host = await fixture<GlideCoreDropdownOption>(
    html`<glide-core-dropdown-option
      label="Label"
    ></glide-core-dropdown-option>`,
  );

  const spy = sinon.spy();
  host.addEventListener('toggle', spy);

  host.privateIsTooltipOpen = true;
  await host.updateComplete;

  expect(spy.callCount).to.equal(0);
});
