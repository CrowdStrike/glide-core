/* eslint-disable @typescript-eslint/no-unused-expressions */

import './button.js';
import './modal.icon-button.js';
import './modal.js';
import { ArgumentError } from 'ow';
import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreModal from './modal.js';
import expectArgumentError from './library/expect-argument-error.js';
import sinon from 'sinon';

GlideCoreModal.shadowRootOptions.mode = 'open';

it('registers', async () => {
  expect(window.customElements.get('glide-core-modal')).to.equal(
    GlideCoreModal,
  );
});

it('has defaults', async () => {
  const component = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Label">Content</glide-core-modal>`,
  );

  const dialog =
    component.shadowRoot?.querySelector<HTMLDialogElement>('dialog');

  expect(dialog).to.be.ok;
  expect(dialog?.hasAttribute('open')).to.be.false;

  expect(component.size).to.equal('medium');
  expect(component.getAttribute('size')).to.equal('medium');

  expect(component.showBackButton).to.be.false;
  expect(component.hasAttribute('show-back-button')).to.be.false;
});

it('renders the provided "label"', async () => {
  const component = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Label">Content</glide-core-modal>`,
  );

  component.showModal();

  const label = component.shadowRoot?.querySelector<HTMLHeadingElement>(
    '[data-test="heading"]',
  );

  expect(label).to.be.ok;
  expect(label?.textContent?.trim()).to.equal('Label');
});

it('does not render the show back button in the label by default', async () => {
  const component = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Label">Content</glide-core-modal>`,
  );

  component.showModal();

  expect(
    component.shadowRoot?.querySelector<HTMLButtonElement>(
      '[data-test="back-button"]',
    ),
  ).to.be.null;
});

it('renders the show back button in the label when provided with "show-back-button"', async () => {
  const component = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Label" show-back-button>
      Content
    </glide-core-modal>`,
  );

  component.showModal();

  expect(
    component.shadowRoot?.querySelector<HTMLButtonElement>(
      '[data-test="back-button"]',
    ),
  ).to.be.ok;
});

it('renders the provided default slotted content', async () => {
  const component = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Label">
      <p data-body>Inner content</p>
    </glide-core-modal>`,
  );

  component.showModal();

  const body = component.querySelector<HTMLParagraphElement>('[data-body]');

  expect(body).to.be.ok;
});

it('renders the provided primary slot content', async () => {
  const component = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Label">
      Content
      <glide-core-button slot="primary" data-primary>Primary</glide-core-button>
    </glide-core-modal>`,
  );

  component.showModal();

  const slotContent =
    component.querySelector<HTMLButtonElement>('[data-primary]');

  expect(slotContent).to.be.ok;

  const slotNodes = component.shadowRoot
    ?.querySelector<HTMLSlotElement>('slot[name="primary"]')
    ?.assignedNodes();

  expect(slotNodes?.length).to.equal(1);
});

it('renders the provided secondary slot content', async () => {
  const component = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Label">
      Content
      <glide-core-button slot="secondary" data-secondary
        >Secondary</glide-core-button
      >
    </glide-core-modal>`,
  );

  component.showModal();

  const slotContent =
    component.querySelector<HTMLButtonElement>('[data-secondary]');

  expect(slotContent).to.be.ok;

  const slotNodes = component.shadowRoot
    ?.querySelector<HTMLSlotElement>('slot[name="secondary"]')
    ?.assignedNodes();

  expect(slotNodes?.length).to.equal(1);
});

it('renders the provided tertiary slot content', async () => {
  const component = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Label">
      Content
      <glide-core-button slot="tertiary" data-tertiary
        >Tertiary</glide-core-button
      >
    </glide-core-modal>`,
  );

  component.showModal();

  const slotContent =
    component.querySelector<HTMLButtonElement>('[data-tertiary]');

  expect(slotContent).to.be.ok;

  const slotNodes = component.shadowRoot
    ?.querySelector<HTMLSlotElement>('slot[name="tertiary"]')
    ?.assignedNodes();

  expect(slotNodes?.length).to.equal(1);
});

it('renders the provided header-actions slot content', async () => {
  const component = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Label">
      Content

      <glide-core-modal-icon-button slot="header-actions" data-actions="1"
        >action1</glide-core-modal-icon-button
      >

      <glide-core-modal-icon-button slot="header-actions" data-actions="2"
        >action2</glide-core-modal-icon-button
      >
    </glide-core-modal>`,
  );

  component.showModal();

  const slotContent =
    component.querySelector<HTMLButtonElement>('[data-actions]');

  expect(slotContent).to.be.ok;

  const slotNodes = component.shadowRoot
    ?.querySelector<HTMLSlotElement>('slot[name="header-actions"]')
    ?.assignedNodes();

  expect(slotNodes?.length).to.equal(2);
});

it('defaults the size to "medium"', async () => {
  const component = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Label">Content</glide-core-modal>`,
  );

  expect([
    ...component.shadowRoot!.querySelector<HTMLDialogElement>('dialog')!
      .classList,
  ]).to.deep.equal(['component', 'medium']);
});

it('sets the size to "small"', async () => {
  const component = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Label" size="small">
      Content
    </glide-core-modal>`,
  );

  expect([
    ...component.shadowRoot!.querySelector<HTMLDialogElement>('dialog')!
      .classList,
  ]).to.deep.equal(['component', 'small']);
});

it('sets the size to "medium"', async () => {
  const component = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Label" size="medium">
      Content
    </glide-core-modal>`,
  );

  expect([
    ...component.shadowRoot!.querySelector<HTMLDialogElement>('dialog')!
      .classList,
  ]).to.deep.equal(['component', 'medium']);
});

it('sets the size to "large"', async () => {
  const component = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Label" size="large">
      Content
    </glide-core-modal>`,
  );

  expect([
    ...component.shadowRoot!.querySelector<HTMLDialogElement>('dialog')!
      .classList,
  ]).to.deep.equal(['component', 'large']);
});

it('sets the size to "xlarge"', async () => {
  const component = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Label" size="xlarge">
      Content
    </glide-core-modal>`,
  );

  expect([
    ...component.shadowRoot!.querySelector<HTMLDialogElement>('dialog')!
      .classList,
  ]).to.deep.equal(['component', 'xlarge']);
});

it('throws if it does not have a default slot', async () => {
  const spy = sinon.spy();

  try {
    await fixture(html`<glide-core-modal label="Label"></glide-core-modal>`);
  } catch (error) {
    if (error instanceof ArgumentError) {
      spy();
    }
  }

  expect(spy.callCount).to.equal(1);
});

it('throws an error when the "primary" footer slot has the incorrect type', async () => {
  await expectArgumentError(() => {
    return fixture(
      html`<glide-core-modal label="Label">
        Content
        <span slot="primary">Primary</span>
      </glide-core-modal>`,
    );
  });
});

it('throws an error when the "secondary" footer slot has the incorrect type', async () => {
  await expectArgumentError(() => {
    return fixture(
      html`<glide-core-modal label="Label">
        Content
        <span slot="secondary">Secondary</span>
      </glide-core-modal>`,
    );
  });
});

it('throws an error when the "header actions" slot has the incorrect type', async () => {
  await expectArgumentError(() => {
    return fixture(
      html`<glide-core-modal label="Label">
        Content
        <span slot="header-actions">Header Action</span>
      </glide-core-modal>`,
    );
  });
});

it('throws an error when the "tertiary" footer slot has the incorrect type', async () => {
  await expectArgumentError(() => {
    return fixture(
      html`<glide-core-modal label="Label">
        Content
        <span slot="tertiary">Tertiary</span>
      </glide-core-modal>`,
    );
  });
});
