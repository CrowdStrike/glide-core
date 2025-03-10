import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import { customElement } from 'lit/decorators.js';
import GlideCoreTreeItemIconButton from './tree.item.icon-button.js';
import expectUnhandledRejection from './library/expect-unhandled-rejection.js';

@customElement('glide-core-subclassed')
class GlideCoreSubclassed extends GlideCoreTreeItemIconButton {}

it('registers itself', async () => {
  expect(
    window.customElements.get('glide-core-tree-item-icon-button'),
  ).to.equal(GlideCoreTreeItemIconButton);
});

it('throws when `label` is empty', async () => {
  const spy = sinon.spy();

  try {
    await fixture(
      html`<glide-core-tree-item-icon-button>
        <div>Icon</div>
      </glide-core-tree-item-icon-button>`,
    );
  } catch {
    spy();
  }

  expect(spy.callCount).to.equal(1);
});

it('throws when subclassed', async () => {
  const spy = sinon.spy();

  try {
    new GlideCoreSubclassed();
  } catch {
    spy();
  }

  expect(spy.callCount).to.equal(1);
});

it('throws when it does not have a default slot', async () => {
  await expectUnhandledRejection(() => {
    return fixture<GlideCoreTreeItemIconButton>(html`
      <glide-core-tree-item-icon-button
        label="Label"
      ></glide-core-tree-item-icon-button>
    `);
  });
});
