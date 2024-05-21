import { expect, fixture, html } from '@open-wc/testing';
import TreeItemMenu from './tree.item.menu.js';
import sinon from 'sinon';

it('registers', async () => {
  expect(window.customElements.get('cs-tree-item-menu')).to.equal(TreeItemMenu);
});

it('throws if it does not have a default slot', async () => {
  const spy = sinon.spy();

  try {
    await fixture<TreeItemMenu>(html`
      <cs-tree-item-menu slot="menu"></cs-tree-item-menu>
    `);
  } catch {
    spy();
  }

  expect(spy.called).to.be.true;
});
