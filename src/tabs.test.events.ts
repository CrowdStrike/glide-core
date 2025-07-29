import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import './tabs.js';
import './tab.js';
import './tab.panel.js';
import { click } from './library/mouse.js';

it('dispatches a "selected" event on click', async () => {
  const host = await fixture(html`
    <glide-core-tabs>
      <glide-core-tab panel="1" slot="nav">One</glide-core-tab>
      <glide-core-tab panel="2" slot="nav">Two</glide-core-tab>

      <glide-core-tab-panel name="1">One</glide-core-tab-panel>
      <glide-core-tab-panel name="1">Two</glide-core-tab-panel>
    </glide-core-tabs>
  `);

  const tab = host.querySelector<HTMLElement>(
    'glide-core-tab:nth-of-type(2)', // The first tab is already selected.
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
      <glide-core-tab panel="1" slot="nav">One</glide-core-tab>
      <glide-core-tab panel="2" slot="nav">Two</glide-core-tab>

      <glide-core-tab-panel name="1">One</glide-core-tab-panel>
      <glide-core-tab-panel name="1">Two</glide-core-tab-panel>
    </glide-core-tabs>
  `);

  const tab = host.querySelector<HTMLElement>('glide-core-tab:nth-of-type(2)');

  tab?.focus();
  sendKeys({ press: 'Enter' });

  const event = await oneEvent(host, 'selected');
  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(event.target).to.equal(tab);
});
