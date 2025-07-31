import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import './tabs.js';
import './tabs.tab.js';
import './tabs.panel.js';
import { click } from './library/mouse.js';

it('dispatches a "selected" event on click', async () => {
  const host = await fixture(html`
    <glide-core-tabs>
      <glide-core-tabs-tab
        label="One"
        panel="1"
        slot="nav"
      ></glide-core-tabs-tab>
      <glide-core-tabs-tab
        label="Two"
        panel="2"
        slot="nav"
      ></glide-core-tabs-tab>

      <glide-core-tabs-panel name="1">One</glide-core-tabs-panel>
      <glide-core-tabs-panel name="1">Two</glide-core-tabs-panel>
    </glide-core-tabs>
  `);

  const tab = host.querySelector<HTMLElement>(
    'glide-core-tabs-tab:nth-of-type(2)', // The first tab is already selected.
  );

  click(tab);

  const event = await oneEvent(host, 'selected');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(event.target).to.equal(tab);
});

it('dispatches a "selected" event on Enter', async () => {
  const host = await fixture(html`
    <glide-core-tabs>
      <glide-core-tabs-tab
        label="One"
        panel="1"
        slot="nav"
      ></glide-core-tabs-tab>
      <glide-core-tabs-tab
        label="Two"
        panel="2"
        slot="nav"
      ></glide-core-tabs-tab>

      <glide-core-tabs-panel name="1">One</glide-core-tabs-panel>
      <glide-core-tabs-panel name="1">Two</glide-core-tabs-panel>
    </glide-core-tabs>
  `);

  const tab = host.querySelector<HTMLElement>(
    'glide-core-tabs-tab:nth-of-type(2)',
  );

  tab?.focus();
  sendKeys({ press: 'Enter' });

  const event = await oneEvent(host, 'selected');
  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(event.target).to.equal(tab);
});
