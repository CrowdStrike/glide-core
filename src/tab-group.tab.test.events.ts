import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import TabGroupTab from './tab-group.tab.js';

it('dispatches a "private-selected" event when selected', async () => {
  const host = await fixture<TabGroupTab>(
    html`<glide-core-tab-group-tab
      label="Label"
      panel="1"
    ></glide-core-tab-group-tab>`,
  );

  setTimeout(() => {
    host.selected = true;
  });

  const event = await oneEvent(host, 'private-selected');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
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
