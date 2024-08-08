/* eslint-disable @typescript-eslint/no-unused-expressions */

import { ArgumentError } from 'ow';
import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreModalIconButton from './modal.icon-button.js';
import sinon from 'sinon';

GlideCoreModalIconButton.shadowRootOptions.mode = 'open';

it('registers', async () => {
  expect(window.customElements.get('glide-core-modal-icon-button')).to.equal(
    GlideCoreModalIconButton,
  );
});

it('is accessible', async () => {
  const element = await fixture(
    html`<glide-core-modal-icon-button>Test</glide-core-modal-icon-button>`,
  );

  await expect(element).to.be.accessible();
});

it('renders and sets default attributes', async () => {
  const element = await fixture(html`
    <glide-core-modal-icon-button>Test</glide-core-modal-icon-button>
  `);

  expect(element).to.be.ok;

  const buttonElement = element.shadowRoot?.querySelector(
    'glide-core-icon-button',
  );

  expect(buttonElement).to.be.not.null;
  expect(buttonElement).to.have.attribute('variant', 'tertiary');
});

it('adds an accessible label when given', async () => {
  const element = await fixture(
    html`<glide-core-modal-icon-button label="test-label"
      >Test</glide-core-modal-icon-button
    >`,
  );

  const buttonElement = element.shadowRoot?.querySelector(
    'glide-core-icon-button',
  );

  expect(buttonElement).to.have.attribute('label', 'test-label');
});

it('does not add an acceessible label when not given', async () => {
  const element = await fixture(
    html`<glide-core-modal-icon-button>Test</glide-core-modal-icon-button>`,
  );

  const buttonElement = element.shadowRoot?.querySelector(
    'glide-core-icon-button',
  );

  expect(buttonElement).to.have.attribute('label', '');
});

it('throws if it does not have a default slot', async () => {
  const spy = sinon.spy();

  try {
    await fixture(
      html`<glide-core-modal-icon-button></glide-core-modal-icon-button>`,
    );
  } catch (error) {
    if (error instanceof ArgumentError) {
      spy();
    }
  }

  expect(spy.called).to.be.true;
});
