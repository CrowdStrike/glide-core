import { expect, fixture, html } from '@open-wc/testing';
import TertiaryIconWrapper from './modal.tertiary-icon.js';

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
    <cs-modal-tertiary-icon></cs-modal-tertiary-icon>
  `);

  expect(element).to.be.ok;

  const spanTag = element.shadowRoot?.querySelector('.component');
  expect(spanTag?.getAttribute('tabindex')).to.equal('0');
});

it('adds an accessible label when given', async () => {
  const element = await fixture(
    html`<cs-modal-tertiary-icon label="label">Test</cs-modal-tertiary-icon>`,
  );

  const button = element.shadowRoot?.querySelector('.component');

  expect(button).to.have.attribute('aria-label', 'label');
});

it('does not add an acceessible label when not given', async () => {
  const element = await fixture(
    html`<cs-modal-tertiary-icon>Test</cs-modal-tertiary-icon>`,
  );

  const button = element.shadowRoot?.querySelector('.component');

  expect(button).to.not.have.attribute('aria-label');
});
