/* eslint-disable @typescript-eslint/no-unused-expressions */

import { ArgumentError } from 'ow';
import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreModalIconButton from './modal.icon-button.js';
import sinon from 'sinon';

GlideCoreModalIconButton.shadowRootOptions.mode = 'open';

it('registers', async () => {
  expect(
    globalThis.customElements.get('glide-core-modal-icon-button'),
  ).to.equal(GlideCoreModalIconButton);
});

it('is accessible', async () => {
  const component = await fixture(
    html`<glide-core-modal-icon-button>Test</glide-core-modal-icon-button>`,
  );

  await expect(component).to.be.accessible();
});

it('renders and sets default attributes', async () => {
  const component = await fixture(html`
    <glide-core-modal-icon-button>Test</glide-core-modal-icon-button>
  `);

  expect(component).to.be.ok;

  const buttonElement = component.shadowRoot?.querySelector(
    'glide-core-icon-button',
  );

  expect(buttonElement).to.be.not.null;
  expect(buttonElement?.getAttribute('variant')).to.equal('tertiary');
});

it('adds an accessible label when given', async () => {
  const component = await fixture(
    html`<glide-core-modal-icon-button label="test-label"
      >Test</glide-core-modal-icon-button
    >`,
  );

  const buttonElement = component.shadowRoot?.querySelector(
    'glide-core-icon-button',
  );

  expect(buttonElement?.getAttribute('label')).to.equal('test-label');
});

it('does not add an acceessible label when not given', async () => {
  const component = await fixture(
    html`<glide-core-modal-icon-button>Test</glide-core-modal-icon-button>`,
  );

  const buttonElement = component.shadowRoot?.querySelector(
    'glide-core-icon-button',
  );

  expect(buttonElement?.getAttribute('label')).to.equal('');
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

  expect(spy.callCount).to.equal(1);
});
