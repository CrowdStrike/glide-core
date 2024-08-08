import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreTreeItemIconButton from './tree.item.icon-button.js';
import expectArgumentError from './library/expect-argument-error.js';

it('registers', async () => {
  expect(
    window.customElements.get('glide-core-tree-item-icon-button'),
  ).to.equal(GlideCoreTreeItemIconButton);
});

it('throws if it does not have a default slot', async () => {
  await expectArgumentError(() => {
    return fixture<GlideCoreTreeItemIconButton>(html`
      <glide-core-tree-item-icon-button></glide-core-tree-item-icon-button>
    `);
  });
});
