import './button.js';
import './modal.icon-button.js';
import { expect, fixture, html } from '@open-wc/testing';
import { customElement } from 'lit/decorators.js';
import sinon from 'sinon';
import Modal from './modal.js';
import expectUnhandledRejection from './library/expect-unhandled-rejection.js';
import expectWindowError from './library/expect-window-error.js';

@customElement('glide-core-subclassed')
class Subclassed extends Modal {}

it('registers itself', async () => {
  expect(window.customElements.get('glide-core-modal')).to.equal(Modal);
});

it('is accessible', async () => {
  const host = await fixture(
    html`<glide-core-modal label="Label">Content</glide-core-modal>`,
  );

  await expect(host).to.be.accessible();
});

it('can be opened', async () => {
  const host = await fixture<Modal>(
    html`<glide-core-modal label="Label" back-button open>
      Content
    </glide-core-modal>`,
  );

  expect(host.checkVisibility()).to.be.true;
});

it('can have a back button', async () => {
  const host = await fixture<Modal>(
    html`<glide-core-modal label="Label" back-button open>
      Content
    </glide-core-modal>`,
  );

  const button = host.shadowRoot?.querySelector<HTMLButtonElement>(
    '[data-test="back-button"]',
  );

  expect(button?.checkVisibility()).to.be.true;
});

it('can have a severity', async () => {
  const host = await fixture<Modal>(
    html`<glide-core-modal label="Label" severity="informational" open>
      Content
    </glide-core-modal>`,
  );

  expect(
    host.shadowRoot
      ?.querySelector<HTMLSpanElement>('[data-test="severity"]')
      ?.checkVisibility(),
  ).to.be.true;
});

it('has a severity icon instead of a back button when both are provided', async () => {
  const host = await fixture<Modal>(
    html`<glide-core-modal
      label="Label"
      severity="informational"
      back-button
      open
    >
      Content
    </glide-core-modal>`,
  );

  expect(
    host.shadowRoot
      ?.querySelector<HTMLElement>('[data-test="severity"]')
      ?.checkVisibility(),
  ).to.be.true;

  expect(
    host.shadowRoot
      ?.querySelector('[data-test="back-button"]')
      ?.checkVisibility(),
  ).to.not.be.ok;
});

it('throws when `label` is empty', async () => {
  const spy = sinon.spy();

  try {
    await fixture(html`<glide-core-modal>Content</glide-core-modal>`);
  } catch {
    spy();
  }

  expect(spy.callCount).to.equal(1);
});

it('throws when subclassed', async () => {
  const spy = sinon.spy();

  try {
    new Subclassed();
  } catch {
    spy();
  }

  expect(spy.callCount).to.equal(1);
});

it('throws when it does not have a default slot', async () => {
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

it('has `severity="critical" coverage', async () => {
  await fixture<Modal>(
    html`<glide-core-modal label="Label" severity="critical">
      Content
    </glide-core-modal>`,
  );
});

it('has `severity="medium" coverage', async () => {
  await fixture<Modal>(
    html`<glide-core-modal label="Label" severity="medium">
      Content
    </glide-core-modal>`,
  );
});
