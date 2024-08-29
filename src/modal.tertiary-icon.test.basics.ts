/* eslint-disable @typescript-eslint/no-unused-expressions */

import './button.js';
import { ArgumentError } from 'ow';
import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreModalTertiaryIcon from './modal.tertiary-icon.js';
import sinon from 'sinon';

GlideCoreModalTertiaryIcon.shadowRootOptions.mode = 'open';

it('registers', async () => {
  expect(window.customElements.get('glide-core-modal-tertiary-icon')).to.equal(
    GlideCoreModalTertiaryIcon,
  );
});

it('is accessible', async () => {
  const component = await fixture(
    html`<glide-core-modal-tertiary-icon>Test</glide-core-modal-tertiary-icon>`,
  );

  await expect(component).to.be.accessible();
});

it('renders and sets default attributes', async () => {
  const component = await fixture(html`
    <glide-core-modal-tertiary-icon>Test</glide-core-modal-tertiary-icon>
  `);

  expect(component).to.be.ok;

  const spanTag = component.shadowRoot?.querySelector('span');
  expect(spanTag?.getAttribute('tabindex')).to.equal('0');

  const tooltip = component.shadowRoot?.querySelector('glide-core-tooltip');
  expect(tooltip).to.not.be.null;
});

it('adds an accessible label when given', async () => {
  const component = await fixture(
    html`<glide-core-modal-tertiary-icon label="test-label"
      >Test</glide-core-modal-tertiary-icon
    >`,
  );

  const spanElement = component.shadowRoot?.querySelector('span');

  expect(spanElement).to.have.attribute('aria-label', 'test-label');
});

it('does not add an acceessible label when not given', async () => {
  const component = await fixture(
    html`<glide-core-modal-tertiary-icon>Test</glide-core-modal-tertiary-icon>`,
  );

  const spanElement = component.shadowRoot?.querySelector('span');

  expect(spanElement).to.not.have.attribute('aria-label');
});

it('sets the tooltip placement when attribute "tooltip-placement" is given', async () => {
  const component = await fixture(
    html`<glide-core-modal-tertiary-icon tooltip-placement="right"
      >Test</glide-core-modal-tertiary-icon
    >`,
  );

  const toolTip = component.shadowRoot?.querySelector('glide-core-tooltip');

  expect(toolTip).to.have.attribute('placement', 'right');
});

it('sets the tooltip placement to "bottom" when attribute "tooltip-placement" is not given', async () => {
  const component = await fixture(
    html`<glide-core-modal-tertiary-icon>Test</glide-core-modal-tertiary-icon>`,
  );

  const toolTip = component.shadowRoot?.querySelector('glide-core-tooltip');

  expect(toolTip).to.have.attribute('placement', 'bottom');
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
