import './tree.item.js';
import './tree.item.menu.js';
import './tree.js';
import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { click } from './library/mouse.js';

it('dispatches a "selected" event on click', async () => {
  const host = await fixture(html`
    <glide-core-tree>
      <glide-core-tree-item label="Label"></glide-core-tree-item>
    </glide-core-tree>
  `);

  click(host.querySelector('glide-core-tree-item'));

  const child = host.querySelector('glide-core-tree-item');
  const event = await oneEvent(host, 'selected');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(event.target).to.equal(child);
});

it('dispatches a "selected" event on Enter', async () => {
  const host = await fixture(html`
    <glide-core-tree>
      <glide-core-tree-item label="Label"></glide-core-tree-item>
    </glide-core-tree>
  `);

  await sendKeys({ press: 'Tab' });
  sendKeys({ press: 'Enter' });

  const child = host.querySelector('glide-core-tree-item');
  const event = await oneEvent(host, 'selected');

  expect(event instanceof Event).to.be.true;
  expect(event.bubbles).to.be.true;
  expect(event.composed).to.be.true;
  expect(event.target).to.equal(child);
});
