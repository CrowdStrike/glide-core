import './button.js';
import { ArgumentError } from 'ow';
import { expect, fixture, html } from '@open-wc/testing';
import TertiaryIconWrapper from './modal.tertiary-icon.js';
import sinon from 'sinon';

TertiaryIconWrapper.shadowRootOptions.mode = 'open';

it('registers', async () => {
  expect(window.customElements.get('cs-modal-tertiary-icon')).to.equal(
    TertiaryIconWrapper,
  );
});

it('is accessible', async () => {
  const element = await fixture(
    html`<cs-modal-tertiary-icon>Test</cs-modal-tertiary-icon>`,
  );

  await expect(element).to.be.accessible();
});

it('renders and sets default attributes', async () => {
  const element = await fixture(html`
    <cs-modal-tertiary-icon>Test</cs-modal-tertiary-icon>
  `);

  expect(element).to.be.ok;

  const spanTag = element.shadowRoot?.querySelector('span');
  expect(spanTag?.getAttribute('tabindex')).to.equal('0');

  const toolip = element.shadowRoot?.querySelector('cs-tooltip');
  expect(toolip).to.not.be.null;
});

it('adds an accessible label when given', async () => {
  const element = await fixture(
    html`<cs-modal-tertiary-icon label="test-label"
      >Test</cs-modal-tertiary-icon
    >`,
  );

  const spanElement = element.shadowRoot?.querySelector('span');

  expect(spanElement).to.have.attribute('aria-label', 'test-label');
});

it('does not add an acceessible label when not given', async () => {
  const element = await fixture(
    html`<cs-modal-tertiary-icon>Test</cs-modal-tertiary-icon>`,
  );

  const spanElement = element.shadowRoot?.querySelector('span');

  expect(spanElement).to.not.have.attribute('aria-label');
});

it('sets the tooltip placement when attribute "tooltip-placement" is given', async () => {
  const element = await fixture(
    html`<cs-modal-tertiary-icon tooltip-placement="right"
      >Test</cs-modal-tertiary-icon
    >`,
  );

  const toolTip = element.shadowRoot?.querySelector('cs-tooltip');

  expect(toolTip).to.have.attribute('placement', 'right');
});

it('sets the tooltip placement to "bottom" when attribute "tooltip-placement" is not given', async () => {
  const element = await fixture(
    html`<cs-modal-tertiary-icon>Test</cs-modal-tertiary-icon>`,
  );

  const toolTip = element.shadowRoot?.querySelector('cs-tooltip');

  expect(toolTip).to.have.attribute('placement', 'bottom');
});

it('throws if it does not have a default slot', async () => {
  const spy = sinon.spy();

  try {
    await fixture(html`<cs-modal-tertiary-icon></cs-modal-tertiary-icon>`);
  } catch (error) {
    if (error instanceof ArgumentError) {
      spy();
    }
  }

  expect(spy.called).to.be.true;
});
