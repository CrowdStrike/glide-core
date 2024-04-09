import './icon-button.js';
import { expect, fixture, html } from '@open-wc/testing';
import IconButton from './icon-button.js';

IconButton.shadowRootOptions.mode = 'open';

const icon = html`<svg
  width="16"
  height="16"
  stroke="currentColor"
  fill="none"
  stroke-linecap="round"
  stroke-linejoin="round"
  stroke-width="2"
  viewBox="0 0 24 24"
  aria-hidden="true"
>
  <path d="M16.51 9.873l-4.459 4.31-4.458-4.31"></path>
</svg>`;

it('registers', async () => {
  expect(window.customElements.get('cs-icon-button')).to.equal(IconButton);
});

it('is accessible', async () => {
  const element = await fixture<IconButton>(
    html`<cs-icon-button label="test-icon-button">${icon}</cs-icon-button>`,
  );

  await expect(element).to.be.accessible();
});

it('has defaults', async () => {
  const element = await fixture<IconButton>(
    html`<cs-icon-button label="test-icon-button">${icon}</cs-icon-button>`,
  );

  expect(element.shadowRoot?.querySelector('button')?.type).to.equal('button');
  expect(element.shadowRoot?.querySelector('button')?.disabled).to.equal(false);

  expect([
    ...element.shadowRoot!.querySelector('button')!.classList,
  ]).to.deep.equal(['button', 'primary']);
});

it('uses the provided "label" for the aria-label', async () => {
  const element = await fixture<IconButton>(
    html`<cs-icon-button label="test-icon-button">${icon}</cs-icon-button>`,
  );

  expect(
    element.shadowRoot?.querySelector('button')?.getAttribute('aria-label'),
  ).to.equal('test-icon-button');
});

it('renders a default slot', async () => {
  const element = await fixture<IconButton>(
    html`<cs-icon-button label="test-icon-button"
      ><span data-content>Inner content</span></cs-icon-button
    >`,
  );

  expect(element.querySelector('[data-content]')).to.be.ok;
  expect(element.querySelector('[data-content]')).to.be.visible;
});

it('renders a primary variant', async () => {
  const element = await fixture<IconButton>(
    html`<cs-icon-button label="test-icon-button" variant="primary"
      >${icon}</cs-icon-button
    >`,
  );

  expect([
    ...element.shadowRoot!.querySelector('button')!.classList,
  ]).to.deep.equal(['button', 'primary']);
});

it('renders a secondary variant', async () => {
  const element = await fixture<IconButton>(
    html`<cs-icon-button label="test-icon-button" variant="secondary"
      >${icon}</cs-icon-button
    >`,
  );

  expect([
    ...element.shadowRoot!.querySelector('button')!.classList,
  ]).to.deep.equal(['button', 'secondary']);
});

it('renders a tertiary variant', async () => {
  const element = await fixture<IconButton>(
    html`<cs-icon-button label="test-icon-button" variant="tertiary"
      >${icon}</cs-icon-button
    >`,
  );

  expect([
    ...element.shadowRoot!.querySelector('button')!.classList,
  ]).to.deep.equal(['button', 'tertiary']);
});

it('sets the disabled attribute', async () => {
  const element = await fixture<IconButton>(
    html`<cs-icon-button label="test-icon-button" disabled
      >${icon}</cs-icon-button
    >`,
  );

  expect(element.disabled).to.equal(true);
  expect(element.shadowRoot?.querySelector('button')?.disabled).to.equal(true);
});
