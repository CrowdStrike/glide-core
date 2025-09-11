import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import './tab-group.js';
import './tab-group.tab.js';
import './tab-group.panel.js';
import { click } from './library/mouse.js';

it('dispatches a "selected" event on click', async () => {
  const host = await fixture(html`
    <glide-core-tab-group>
      <glide-core-tab-group-tab
        label="One"
        panel="1"
        slot="nav"
      ></glide-core-tab-group-tab>
      <glide-core-tab-group-tab
        label="Two"
        panel="2"
        slot="nav"
      ></glide-core-tab-group-tab>

      <glide-core-tab-group-panel name="1">One</glide-core-tab-group-panel>
      <glide-core-tab-group-panel name="2">Two</glide-core-tab-group-panel>
    </glide-core-tab-group>
  `);

  const tab = host.querySelector<HTMLElement>(
    'glide-core-tab-group-tab:nth-of-type(2)',
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
    <glide-core-tab-group>
      <glide-core-tab-group-tab
        label="One"
        panel="1"
        slot="nav"
      ></glide-core-tab-group-tab>
      <glide-core-tab-group-tab
        label="Two"
        panel="2"
        slot="nav"
      ></glide-core-tab-group-tab>

      <glide-core-tab-group-panel name="1">One</glide-core-tab-group-panel>
      <glide-core-tab-group-panel name="2">Two</glide-core-tab-group-panel>
    </glide-core-tab-group>
  `);

  const tab = host.querySelector<HTMLElement>(
    'glide-core-tab-group-tab:nth-of-type(2)',
  );

  tab?.focus();
  sendKeys({ press: 'Enter' });

  const event = await oneEvent(host, 'selected');
  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(event.target).to.equal(tab);
});
