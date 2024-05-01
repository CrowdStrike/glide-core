import './modal.js';
import { expect, fixture, html } from '@open-wc/testing';
import Modal from './modal.js';

it('registers', async () => {
  expect(window.customElements.get('cs-modal')).to.equal(Modal);
});

it('is closed by default', async () => {
  const element = await fixture<Modal>(
    html`<cs-modal label="Modal title"></cs-modal>`,
  );

  const dialog = element.shadowRoot!.querySelector<HTMLDialogElement>('dialog');

  expect(dialog).to.be.ok;
  expect(dialog?.hasAttribute('open')).to.be.false;
});

it('renders the provided "label"', async () => {
  const element = await fixture<Modal>(
    html`<cs-modal label="Modal title"></cs-modal>`,
  );

  element.showModal();

  const label = element.shadowRoot!.querySelector<HTMLHeadingElement>(
    '[data-test="heading"]',
  );

  expect(label).to.be.ok;
  expect(label?.textContent?.trim()).to.equal('Modal title');
});

it('does not render the show back button in the label by default', async () => {
  const element = await fixture<Modal>(
    html`<cs-modal label="Modal title"></cs-modal>`,
  );

  element.showModal();

  expect(
    element.shadowRoot!.querySelector<HTMLButtonElement>(
      '[data-test="back-button"]',
    ),
  ).to.be.null;
});

it('renders the show back button in the label when provided with "show-back-button"', async () => {
  const element = await fixture<Modal>(
    html`<cs-modal label="Modal title" show-back-button></cs-modal>`,
  );

  element.showModal();

  expect(
    element.shadowRoot!.querySelector<HTMLButtonElement>(
      '[data-test="back-button"]',
    ),
  ).to.be.ok;
});

it('renders the provided default slotted content', async () => {
  const element = await fixture<Modal>(
    html`<cs-modal label="Modal title">
      <p data-body>Inner content</p>
    </cs-modal>`,
  );

  element.showModal();

  const body = element.querySelector<HTMLParagraphElement>('[data-body]');

  expect(body).to.be.ok;
});

it('renders the provided primary slot content', async () => {
  const element = await fixture<Modal>(
    html`<cs-modal label="Modal title">
      <button slot="primary" data-primary>Primary</button>
    </cs-modal>`,
  );

  element.showModal();

  const slotContent =
    element.querySelector<HTMLButtonElement>('[data-primary]');
  expect(slotContent).to.be.ok;

  const slotNodes = element
    .shadowRoot!.querySelector<HTMLSlotElement>('slot[name="primary"]')
    ?.assignedNodes();
  expect(slotNodes?.length).to.equal(1);
  expect(slotNodes?.at(0)?.nodeName).to.equal('BUTTON');
});

it('renders the provided secondary slot content', async () => {
  const element = await fixture<Modal>(
    html`<cs-modal label="Modal title">
      <button slot="secondary" data-secondary>Secondary</button>
    </cs-modal>`,
  );

  element.showModal();

  const slotContent =
    element.querySelector<HTMLButtonElement>('[data-secondary]');

  expect(slotContent).to.be.ok;

  const slotNodes = element
    .shadowRoot!.querySelector<HTMLSlotElement>('slot[name="secondary"]')
    ?.assignedNodes();
  expect(slotNodes?.length).to.equal(1);
  expect(slotNodes?.at(0)?.nodeName).to.equal('BUTTON');
});

it('renders the provided tertiary slot content', async () => {
  const element = await fixture<Modal>(
    html`<cs-modal label="Modal title">
      <button slot="tertiary" data-tertiary>Tertiary</button>
    </cs-modal>`,
  );

  element.showModal();

  const slotContent =
    element.querySelector<HTMLButtonElement>('[data-tertiary]');

  expect(slotContent).to.be.ok;

  const slotNodes = element
    .shadowRoot!.querySelector<HTMLSlotElement>('slot[name="tertiary"]')
    ?.assignedNodes();
  expect(slotNodes?.length).to.equal(1);
  expect(slotNodes?.at(0)?.nodeName).to.equal('BUTTON');
});

it('renders the provided header-actions slot content', async () => {
  const element = await fixture<Modal>(
    html`<cs-modal label="Modal title">
      <button slot="header-actions" data-actions="1">action1</button>
      <button slot="header-actions" data-actions="2">action2</button>
    </cs-modal>`,
  );

  element.showModal();

  const slotContent =
    element.querySelector<HTMLButtonElement>('[data-actions]');

  expect(slotContent).to.be.ok;

  const slotNodes = element
    .shadowRoot!.querySelector<HTMLSlotElement>('slot[name="header-actions"]')
    ?.assignedNodes();
  expect(slotNodes?.length).to.equal(2);
  expect(slotNodes?.at(0)?.nodeName).to.equal('BUTTON');
  expect(slotNodes?.at(1)?.nodeName).to.equal('BUTTON');
});

it('defaults the width to "md"', async () => {
  const element = await fixture<Modal>(
    html`<cs-modal label="Modal title"></cs-modal>`,
  );

  expect([
    ...element.shadowRoot!.querySelector<HTMLDialogElement>('dialog')!
      .classList,
  ]).to.deep.equal(['component', 'width--md']);
});

it('sets the width to "sm"', async () => {
  const element = await fixture<Modal>(
    html`<cs-modal label="Modal title" width="sm"></cs-modal>`,
  );

  expect([
    ...element.shadowRoot!.querySelector<HTMLDialogElement>('dialog')!
      .classList,
  ]).to.deep.equal(['component', 'width--sm']);
});

it('sets the width to "md"', async () => {
  const element = await fixture<Modal>(
    html`<cs-modal label="Modal title" width="md"></cs-modal>`,
  );

  expect([
    ...element.shadowRoot!.querySelector<HTMLDialogElement>('dialog')!
      .classList,
  ]).to.deep.equal(['component', 'width--md']);
});

it('sets the width to "lg"', async () => {
  const element = await fixture<Modal>(
    html`<cs-modal label="Modal title" width="lg"></cs-modal>`,
  );

  expect([
    ...element.shadowRoot!.querySelector<HTMLDialogElement>('dialog')!
      .classList,
  ]).to.deep.equal(['component', 'width--lg']);
});

it('sets the width to "xl"', async () => {
  const element = await fixture<Modal>(
    html`<cs-modal label="Modal title" width="xl"></cs-modal>`,
  );

  expect([
    ...element.shadowRoot!.querySelector<HTMLDialogElement>('dialog')!
      .classList,
  ]).to.deep.equal(['component', 'width--xl']);
});
