import './button.js';
import './modal.icon-button.js';
import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreModal from './modal.js';
import expectUnhandledRejection from './library/expect-unhandled-rejection.js';
import expectWindowError from './library/expect-window-error.js';

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-modal')).to.equal(
    GlideCoreModal,
  );
});

it('is accessible', async () => {
  const component = await fixture(
    html`<glide-core-modal label="Label">Content</glide-core-modal>`,
  );

  await expect(component).to.be.accessible();
});

it('opens', async () => {
  const component = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Label" back-button open>
      Content
    </glide-core-modal>`,
  );

  expect(component.checkVisibility()).to.be.true;
});

it('can have a back button', async () => {
  const component = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Label" back-button open>
      Content
    </glide-core-modal>`,
  );

  const button = component.shadowRoot?.querySelector<HTMLButtonElement>(
    '[data-test="back-button"]',
  );

  expect(button?.checkVisibility()).to.be.true;
});

it('throws if it does not have a default slot', async () => {
  await expectUnhandledRejection(() => {
    return fixture(html`<glide-core-modal label="Label"></glide-core-modal>`);
  });
});

it('throws an error when the "primary" footer slot is the wrong type', async () => {
  await expectWindowError(() => {
    return fixture(
      html`<glide-core-modal label="Label">
        Content
        <span slot="primary">Primary</span>
      </glide-core-modal>`,
    );
  });
});

it('throws an error when the "secondary" footer slot is the wrong type', async () => {
  await expectWindowError(() => {
    return fixture(
      html`<glide-core-modal label="Label">
        Content
        <span slot="secondary">Secondary</span>
      </glide-core-modal>`,
    );
  });
});

it('throws an error when the "header-actions" slot is the wrong type', async () => {
  await expectWindowError(() => {
    return fixture(
      html`<glide-core-modal label="Label">
        Content
        <span slot="header-actions">Header Action</span>
      </glide-core-modal>`,
    );
  });
});

it('throws an error when the "tertiary" footer slot is the wrong type', async () => {
  await expectWindowError(() => {
    return fixture(
      html`<glide-core-modal label="Label">
        Content
        <span slot="tertiary">Tertiary</span>
      </glide-core-modal>`,
    );
  });
});
