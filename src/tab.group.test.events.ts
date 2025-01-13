/* eslint-disable @typescript-eslint/no-unused-expressions */

import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import GlideCoreTabGroup from './tab.group.js';
import './tab.js';
import './tab.panel.js';
import { click } from './library/mouse.js';

it('dispatches a "selected" event', async () => {
  const component = await fixture<GlideCoreTabGroup>(html`
    <glide-core-tab-group>
      <glide-core-tab slot="nav" panel="1">One</glide-core-tab>
      <glide-core-tab slot="nav" panel="2">Two</glide-core-tab>

      <glide-core-tab-panel name="1">One</glide-core-tab-panel>
      <glide-core-tab-panel name="1">Two</glide-core-tab-panel>
    </glide-core-tab-group>
  `);

  const tab = component.querySelector<HTMLElement>(
    // The first tab is already selected.
    'glide-core-tab:nth-of-type(2)',
  );

  click(tab);

  const event = await oneEvent(component, 'selected');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(event.target).to.equal(tab);
});
