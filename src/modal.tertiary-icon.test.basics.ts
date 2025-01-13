import './button.js';
import { ArgumentError } from 'ow';
import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import GlideCoreModalTertiaryIcon from './modal.tertiary-icon.js';

GlideCoreModalTertiaryIcon.shadowRootOptions.mode = 'open';

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-modal-tertiary-icon')).to.equal(
    GlideCoreModalTertiaryIcon,
  );
});

it('is accessible', async () => {
  const component = await fixture(
    html`<glide-core-modal-tertiary-icon>
      Content
    </glide-core-modal-tertiary-icon>`,
  );

  await expect(component).to.be.accessible();
});

it('throws if it does not have a default slot', async () => {
  const spy = sinon.spy();

  try {
    await fixture(
      html`<glide-core-modal-tertiary-icon></glide-core-modal-tertiary-icon>`,
    );
  } catch (error) {
    if (error instanceof ArgumentError) {
      spy();
    }
  }

  expect(spy.callCount).to.equal(1);
});
