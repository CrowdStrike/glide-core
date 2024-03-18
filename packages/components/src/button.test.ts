import './button.js';
import { expect, fixture, html } from '@open-wc/testing';
import type Button from './button.js';

it('renders and sets default attributes', async () => {
  const element = await fixture<Button>(html` <cs-button>Button</cs-button> `);

  await expect(element).to.be.accessible();
  expect(element.type).to.equal('button');
  expect(element.disabled).to.equal(false);
  expect(element.textContent).to.equal('Button');

  const buttonTag = element.shadowRoot!.querySelector('button');

  expect(buttonTag?.getAttribute('type')).to.equal('button');
  expect(buttonTag?.disabled).to.equal(false);
  expect([...buttonTag!.classList]).to.deep.equal([
    'button--primary',
    'button--large',
  ]);
});

it('renders a secondary variant', async () => {
  const element = await fixture<Button>(html`
    <cs-button variant="secondary">Button</cs-button>
  `);

  expect([
    ...element.shadowRoot!.querySelector('button')!.classList,
  ]).to.deep.equal(['button--secondary', 'button--large']);
});

it('renders a tertiary variant', async () => {
  const element = await fixture<Button>(html`
    <cs-button variant="tertiary">Button</cs-button>
  `);

  expect([
    ...element.shadowRoot!.querySelector('button')!.classList,
  ]).to.deep.equal(['button--tertiary', 'button--large']);
});

it('sets the size to "large" by default', async () => {
  const element = await fixture<Button>(html` <cs-button>Button</cs-button> `);

  expect(element.size).to.equal('large');

  expect([
    ...element.shadowRoot!.querySelector('button')!.classList,
  ]).to.deep.equal(['button--primary', 'button--large']);
});

it('sets the size attribute to "large"', async () => {
  const element = await fixture<Button>(html`
    <cs-button size="large">Button</cs-button>
  `);

  expect(element.size).to.equal('large');

  expect([
    ...element.shadowRoot!.querySelector('button')!.classList,
  ]).to.deep.equal(['button--primary', 'button--large']);
});

it('sets the size attribute to "small"', async () => {
  const element = await fixture<Button>(html`
    <cs-button size="small">Button</cs-button>
  `);

  expect(element.size).to.equal('small');

  expect([
    ...element.shadowRoot!.querySelector('button')!.classList,
  ]).to.deep.equal(['button--primary', 'button--small']);
});

it('sets the disabled attribute', async () => {
  const element = await fixture<Button>(html`
    <cs-button disabled>Button</cs-button>
  `);

  expect(element.disabled).to.equal(true);

  expect(element.shadowRoot!.querySelector('button')?.disabled).to.equal(true);
});

it('sets the type attribute to "submit"', async () => {
  const element = await fixture<Button>(html`
    <cs-button type="submit">Button</cs-button>
  `);

  expect(element.type).to.equal('submit');

  expect(
    element.shadowRoot!.querySelector('button')?.getAttribute('type'),
  ).to.equal('submit');
});

it('sets the type attribute to "reset"', async () => {
  const element = await fixture<Button>(html`
    <cs-button type="reset">Button</cs-button>
  `);

  expect(element.type).to.equal('reset');

  expect(
    element.shadowRoot!.querySelector('button')?.getAttribute('type'),
  ).to.equal('reset');
});

it('renders with a prefix slot', async () => {
  const element = await fixture<Button>(html`
    <cs-button>
      <span slot="prefix" data-prefix>prefix</span>
      Button
    </cs-button>
  `);

  expect([
    ...element.shadowRoot!.querySelector('button')!.classList,
  ]).to.deep.equal(['button--primary', 'button--large', 'button--has-prefix']);

  expect(document.querySelector('[data-prefix]')).to.be.ok;
});

it('renders with a suffix slot', async () => {
  const element = await fixture<Button>(html`
    <cs-button>
      Button
      <span slot="suffix" data-suffix>suffix</span>
    </cs-button>
  `);

  expect([
    ...element.shadowRoot!.querySelector('button')!.classList,
  ]).to.deep.equal(['button--primary', 'button--large', 'button--has-suffix']);

  expect(document.querySelector('[data-suffix]')).to.be.ok;
});

it('renders with a prefix and suffix slot', async () => {
  const element = await fixture<Button>(html`
    <cs-button>
      <span slot="prefix" data-prefix>prefix</span>
      Button
      <span slot="suffix" data-suffix>suffix</span>
    </cs-button>
  `);

  expect([
    ...element.shadowRoot!.querySelector('button')!.classList,
  ]).to.deep.equal([
    'button--primary',
    'button--large',
    'button--has-prefix',
    'button--has-suffix',
  ]);

  expect(document.querySelector('[data-prefix]')).to.be.ok;
  expect(document.querySelector('[data-suffix]')).to.be.ok;
});
