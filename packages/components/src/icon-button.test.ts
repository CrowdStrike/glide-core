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
  const component = await fixture<IconButton>(
    html`<cs-icon-button label="test-icon-button">${icon}</cs-icon-button>`,
  );

  await expect(component).to.be.accessible();
});

it('has defaults', async () => {
  const component = await fixture<IconButton>(
    html`<cs-icon-button label="test-icon-button">${icon}</cs-icon-button>`,
  );

  expect(component.shadowRoot?.querySelector('button')?.type).to.equal(
    'button',
  );
  expect(component.shadowRoot?.querySelector('button')?.disabled).to.equal(
    false,
  );

  expect([
    ...component.shadowRoot!.querySelector('button')!.classList,
  ]).to.deep.equal(['component', 'primary']);
});

it('delegates focus', async () => {
  const component = await fixture<IconButton>(
    html`<cs-icon-button label="test-icon-button">${icon}</cs-icon-button>`,
  );

  component.focus();

  expect(component.shadowRoot?.activeElement).to.equal(
    component.shadowRoot?.querySelector('button'),
  );
});

it('uses the provided "label" for the aria-label', async () => {
  const component = await fixture<IconButton>(
    html`<cs-icon-button label="test-icon-button">${icon}</cs-icon-button>`,
  );

  expect(
    component.shadowRoot?.querySelector('button')?.getAttribute('aria-label'),
  ).to.equal('test-icon-button');
});

it('renders a default slot', async () => {
  const component = await fixture<IconButton>(
    html`<cs-icon-button label="test-icon-button"
      ><span data-content>Inner content</span></cs-icon-button
    >`,
  );

  expect(component.querySelector('[data-content]')).to.be.ok;
  expect(component.querySelector('[data-content]')).to.be.visible;
});

it('renders a primary variant', async () => {
  const component = await fixture<IconButton>(
    html`<cs-icon-button label="test-icon-button" variant="primary"
      >${icon}</cs-icon-button
    >`,
  );

  expect([
    ...component.shadowRoot!.querySelector('button')!.classList,
  ]).to.deep.equal(['component', 'primary']);
});

it('renders a secondary variant', async () => {
  const component = await fixture<IconButton>(
    html`<cs-icon-button label="test-icon-button" variant="secondary"
      >${icon}</cs-icon-button
    >`,
  );

  expect([
    ...component.shadowRoot!.querySelector('button')!.classList,
  ]).to.deep.equal(['component', 'secondary']);
});

it('renders a tertiary variant', async () => {
  const component = await fixture<IconButton>(
    html`<cs-icon-button label="test-icon-button" variant="tertiary"
      >${icon}</cs-icon-button
    >`,
  );

  expect([
    ...component.shadowRoot!.querySelector('button')!.classList,
  ]).to.deep.equal(['component', 'tertiary']);
});

it('sets the disabled attribute', async () => {
  const component = await fixture<IconButton>(
    html`<cs-icon-button label="test-icon-button" disabled
      >${icon}</cs-icon-button
    >`,
  );

  expect(component.disabled).to.equal(true);
  expect(component.shadowRoot?.querySelector('button')?.disabled).to.equal(
    true,
  );
});
