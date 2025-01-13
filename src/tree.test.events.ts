/* eslint-disable @typescript-eslint/no-unused-expressions */

import './tree.item.js';
import './tree.item.menu.js';
import './tree.js';
import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import { click } from './library/mouse.js';

it('dispatches a "selected" event', async () => {
  const component = await fixture(html`
    <glide-core-tree>
      <glide-core-tree-item label="Item"></glide-core-tree-item>
    </glide-core-tree>
  `);

  click(component.querySelector('glide-core-tree-item'));

  const item = component.querySelector('glide-core-tree-item');
  const event = await oneEvent(component, 'selected');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(event.target).to.equal(item);
});
