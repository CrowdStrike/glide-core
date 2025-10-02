import { aTimeout, expect, fixture, html, oneEvent } from '@open-wc/testing';
import sinon from 'sinon';
import TabGroupTab from './tab-group.tab.js';

it('dispatches a "deselected" event when deselected', async () => {
  const host = await fixture<TabGroupTab>(
    html`<glide-core-tab-group-tab
      label="Label"
      panel="1"
      selected
    ></glide-core-tab-group-tab>`,
  );

  setTimeout(() => {
    host.selected = false;
  });

  const event = await oneEvent(host, 'deselected');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
});

it('dispatches a "selected" event when selected', async () => {
  const host = await fixture<TabGroupTab>(
    html`<glide-core-tab-group-tab
      label="Label"
      panel="1"
    ></glide-core-tab-group-tab>`,
  );

  setTimeout(() => {
    host.selected = true;
  });

  const event = await oneEvent(host, 'selected');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
});

it('dispatches a "private-label-change" event when the `label` is changed', async () => {
  const host = await fixture<TabGroupTab>(
    html`<glide-core-tab-group-tab
      label="Label"
      panel="1"
    ></glide-core-tab-group-tab>`,
  );

  setTimeout(() => {
    host.label = 'Two';
  });

  const event = await oneEvent(host, 'private-label-change');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
});

it('dispatches a "private-icon-slotchange" event when the icon slot is changed', async () => {
  const host = await fixture<TabGroupTab>(
    html`<glide-core-tab-group-tab label="Label" panel="1">
    </glide-core-tab-group-tab>`,
  );

  setTimeout(() => {
    const div = document.createElement('div');
    div.setAttribute('slot', 'icon');
    div.textContent = 'two';
    host.append(div);
  });

  const event = await oneEvent(host, 'private-icon-slotchange');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
});

it('does not dispatch a "deselected" event when deselected programmatically and already deselected', async () => {
  const spy = sinon.spy();

  const host = await fixture<TabGroupTab>(
    html`<glide-core-tab-group-tab
      label="Label"
      panel="1"
    ></glide-core-tab-group-tab>`,
  );

  host.addEventListener('deselected', spy);

  setTimeout(() => {
    host.selected = false;
  });

  await aTimeout(0);

  expect(spy.callCount).to.equal(0);
});

it('does not dispatch a "selected" event when selected programmatically and already selected', async () => {
  const spy = sinon.spy();

  const host = await fixture<TabGroupTab>(
    html`<glide-core-tab-group-tab
      label="Label"
      panel="1"
      selected
    ></glide-core-tab-group-tab>`,
  );

  host.addEventListener('selected', spy);

  setTimeout(() => {
    host.selected = true;
  });

  await aTimeout(0);

  expect(spy.callCount).to.equal(0);
});
