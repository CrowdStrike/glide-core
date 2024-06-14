import { expect, fixture, html } from '@open-wc/testing';
import TreeItemIconButton from './tree.item.icon-button.js';
import expectArgumentError from './library/expect-argument-error.js';

it('registers', async () => {
  expect(window.customElements.get('cs-tree-item-icon-button')).to.equal(
    TreeItemIconButton,
  );
});

it('throws if it does not have a default slot', async () => {
  await expectArgumentError(() => {
    return fixture<TreeItemIconButton>(html`
      <cs-tree-item-icon-button></cs-tree-item-icon-button>
    `);
  });
});
