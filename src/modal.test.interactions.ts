import { expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { click } from './library/mouse.js';
import GlideCoreModal from './modal.js';

it('can be opened programmatically', async () => {
  const host = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Label">Content</glide-core-modal>`,
  );

  host.open = true;
  await host.updateComplete;

  const dialog = host.shadowRoot?.querySelector('[data-test="component"]');
  expect(dialog?.checkVisibility()).to.be.true;
});

it('can be closed programmatically', async () => {
  const host = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Label" open>Content</glide-core-modal>`,
  );

  host.open = false;
  await host.updateComplete;

  const dialog = host.shadowRoot?.querySelector('[data-test="component"]');
  expect(dialog?.checkVisibility()).to.be.false;
});

it('closes when its close button is clicked', async () => {
  const host = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Label" open>Content</glide-core-modal>`,
  );

  await click(host.shadowRoot?.querySelector('[data-test="close-button"]'));

  expect(host.open).to.be.false;
});

it('closes when its back button is clicked', async () => {
  const host = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Label" back-button open>
      Content
    </glide-core-modal>`,
  );

  await click(host.shadowRoot?.querySelector('[data-test="back-button"]'));

  expect(host.open).to.be.false;
});

it('closes on Escape', async () => {
  const host = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Label" open>Content</glide-core-modal>`,
  );

  await sendKeys({ press: 'Escape' });

  expect(host.open).to.be.false;
});

it('closes when clicked outside', async () => {
  const host = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Label" back-button open>
      Content
    </glide-core-modal>`,
  );

  await click(
    host.shadowRoot?.querySelector('[data-test="component"]'),
    'outside',
  );

  const dialog = host.shadowRoot?.querySelector('[data-test="component"]');
  expect(dialog?.checkVisibility()).to.not.be.ok;
});

it('does not close when clicked inside', async () => {
  const host = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Label" back-button open>
      Content
    </glide-core-modal>`,
  );

  await click(host.shadowRoot?.querySelector('[data-test="component"]'));

  const dialog = host.shadowRoot?.querySelector('[data-test="component"]');
  expect(dialog?.checkVisibility()).to.be.true;
});

it('does not close when `click()` is called on a slotted element', async () => {
  const host = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Label" open>
      <input />
    </glide-core-modal>`,
  );

  host.querySelector('input')?.click();
  expect(host.open).to.be.true;
});

it('does not close when a slotted `<label>` is clicked', async () => {
  const component = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Label" open>
      <label for="input"> Label </label>
      <input id="input" />
    </glide-core-modal>`,
  );

  const label = component.querySelector('label');
  await click(label);

  expect(component.open).to.be.true;
});

it('locks scroll on open', async () => {
  await fixture(
    html`<glide-core-modal label="Label" open>Content</glide-core-modal>`,
  );

  expect(
    document.documentElement.classList.contains(
      'private-glide-core-modal-lock-scroll',
    ),
  ).to.be.true;
});

it('unlocks scroll on close', async () => {
  const host = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Label" open>Content</glide-core-modal>`,
  );

  host.open = false;
  await host.updateComplete;

  expect(
    document.documentElement.classList.contains(
      'private-glide-core-modal-lock-scroll',
    ),
  ).to.be.false;
});
