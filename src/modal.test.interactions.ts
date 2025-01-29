import { expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { click } from './library/mouse.js';
import GlideCoreModal from './modal.js';

it('opens when opened programmatically', async () => {
  const component = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Label">Content</glide-core-modal>`,
  );

  component.open = true;
  await component.updateComplete;

  const dialog = component.shadowRoot?.querySelector('[data-test="component"]');
  expect(dialog?.checkVisibility()).to.be.true;
});

it('closes when closed programmatically', async () => {
  const component = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Label" open>Content</glide-core-modal>`,
  );

  component.open = false;
  await component.updateComplete;

  const dialog = component.shadowRoot?.querySelector('[data-test="component"]');
  expect(dialog?.checkVisibility()).to.be.false;
});

it('closes when its close button is clicked', async () => {
  const component = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Label" open>Content</glide-core-modal>`,
  );

  await click(
    component.shadowRoot?.querySelector('[data-test="close-button"]'),
  );

  expect(component.open).to.be.false;
});

it('closes when its back button is clicked', async () => {
  const component = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Label" back-button open>
      Content
    </glide-core-modal>`,
  );

  await click(component.shadowRoot?.querySelector('[data-test="back-button"]'));

  expect(component.open).to.be.false;
});

it('closes on Escape', async () => {
  const component = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Label" open>Content</glide-core-modal>`,
  );

  await sendKeys({ press: 'Escape' });

  expect(component.open).to.be.false;
});

it('closes when clicked outside', async () => {
  const component = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Label" back-button open>
      Content
    </glide-core-modal>`,
  );

  await click(
    component.shadowRoot?.querySelector('[data-test="component"]'),
    'outside',
  );

  const dialog = component.shadowRoot?.querySelector('[data-test="component"]');
  expect(dialog?.checkVisibility()).to.not.be.ok;
});

it('does not close when clicked inside', async () => {
  const component = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Label" back-button open>
      Content
    </glide-core-modal>`,
  );

  await click(component.shadowRoot?.querySelector('[data-test="component"]'));

  const dialog = component.shadowRoot?.querySelector('[data-test="component"]');
  expect(dialog?.checkVisibility()).to.be.true;
});

it('does not close when `click()` is called on a slotted element', async () => {
  const component = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Label" open>
      <input />
    </glide-core-modal>`,
  );

  component.querySelector('input')?.click();
  expect(component.open).to.be.true;
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
  const component = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Label" open>Content</glide-core-modal>`,
  );

  component.open = false;
  await component.updateComplete;

  expect(
    document.documentElement.classList.contains(
      'private-glide-core-modal-lock-scroll',
    ),
  ).to.be.false;
});
