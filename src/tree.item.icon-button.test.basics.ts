import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreTreeItemIconButton from './tree.item.icon-button.js';
import expectArgumentError from './library/expect-argument-error.js';

GlideCoreTreeItemIconButton.shadowRootOptions.mode = 'open';

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

it('passes its label to the icon button', async () => {
  const component = await fixture<GlideCoreTreeItemIconButton>(html`
    <glide-core-tree-item-icon-button label="My label"
      >Hello</glide-core-tree-item-icon-button
    >
  `);

  expect(
    component.shadowRoot?.querySelector('glide-core-icon-button')?.label,
  ).to.equal('My label');
});
