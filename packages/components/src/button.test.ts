import './button.js';
import {
  elementUpdated,
  expect,
  fixture,
  html,
  oneEvent,
} from '@open-wc/testing';
import Button from './button.js';

Button.shadowRootOptions.mode = 'open';

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
    'button',
    'primary',
    'large',
  ]);
});

it('renders a secondary variant', async () => {
  const element = await fixture<Button>(html`
    <cs-button variant="secondary">Button</cs-button>
  `);

  expect([
    ...element.shadowRoot!.querySelector('button')!.classList,
  ]).to.deep.equal(['button', 'secondary', 'large']);
});

it('renders a tertiary variant', async () => {
  const element = await fixture<Button>(html`
    <cs-button variant="tertiary">Button</cs-button>
  `);

  expect([
    ...element.shadowRoot!.querySelector('button')!.classList,
  ]).to.deep.equal(['button', 'tertiary', 'large']);
});

it('sets the size to "large" by default', async () => {
  const element = await fixture<Button>(html` <cs-button>Button</cs-button> `);

  expect(element.size).to.equal('large');

  expect([
    ...element.shadowRoot!.querySelector('button')!.classList,
  ]).to.deep.equal(['button', 'primary', 'large']);
});

it('sets the size attribute to "large"', async () => {
  const element = await fixture<Button>(html`
    <cs-button size="large">Button</cs-button>
  `);

  expect(element.size).to.equal('large');

  expect([
    ...element.shadowRoot!.querySelector('button')!.classList,
  ]).to.deep.equal(['button', 'primary', 'large']);
});

it('sets the size attribute to "small"', async () => {
  const element = await fixture<Button>(html`
    <cs-button size="small">Button</cs-button>
  `);

  expect(element.size).to.equal('small');

  expect([
    ...element.shadowRoot!.querySelector('button')!.classList,
  ]).to.deep.equal(['button', 'primary', 'small']);
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
  ]).to.deep.equal(['button', 'primary', 'large', 'has-prefix']);

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
  ]).to.deep.equal(['button', 'primary', 'large', 'has-suffix']);

  expect(document.querySelector('[data-suffix]')).to.be.ok;
});

it('renders with a prefix and suffix slot when both are present initially', async () => {
  const element = await fixture<Button>(html`
    <cs-button>
      <span slot="prefix" data-prefix>prefix</span>
      Button
      <span slot="suffix" data-suffix>suffix</span>
    </cs-button>
  `);

  expect([
    ...element.shadowRoot!.querySelector('button')!.classList,
  ]).to.deep.equal(['button', 'primary', 'large', 'has-prefix', 'has-suffix']);

  expect(document.querySelector('[data-prefix]')).to.be.ok;
  expect(document.querySelector('[data-suffix]')).to.be.ok;
});

it('renders with prefix and suffix classes when both are dynamically added', async () => {
  const element = await fixture<Button>(html`
    <cs-button> Button </cs-button>
  `);

  const prefix = document.createElement('span');
  prefix.setAttribute('slot', 'prefix');
  prefix.dataset.prefix = undefined;
  prefix.textContent = 'prefix';
  element.append(prefix);

  const suffix = document.createElement('span');
  suffix.setAttribute('slot', 'suffix');
  prefix.dataset.suffix = undefined;
  suffix.textContent = 'suffix';
  element.append(suffix);

  await elementUpdated(element);

  expect([
    ...element.shadowRoot!.querySelector('button')!.classList,
  ]).to.deep.equal(['button', 'primary', 'large', 'has-prefix', 'has-suffix']);

  expect(document.querySelector('[data-prefix]')).to.be.ok;
  expect(document.querySelector('[data-suffix]')).to.be.ok;
});

it('renders without prefix and suffix classes after both are removed', async () => {
  const element = await fixture<Button>(html`
    <cs-button>
      <span slot="prefix">prefix</span>
      Button
      <span slot="suffix">suffix</span>
    </cs-button>
  `);

  element.querySelector('[slot="prefix"]')?.remove();
  element.querySelector('[slot="suffix"]')?.remove();
  await elementUpdated(element);

  expect([
    ...element.shadowRoot!.querySelector('button')!.classList,
  ]).to.deep.equal(['button', 'primary', 'large']);
});

it('dispatches an event when clicked and type="button"', async () => {
  const element = await fixture<HTMLFormElement>(html`
    <cs-button type="button"> Button </cs-button>
  `);

  const clickEvent = oneEvent(element, 'click');

  element.shadowRoot?.querySelector<HTMLButtonElement>('button')?.click();

  const event = await clickEvent;
  expect(event instanceof Event).to.be.true;
});

it('participates in a form when type="reset"', async () => {
  const form = document.createElement('form');

  const element = await fixture<HTMLFormElement>(
    html` <cs-button type="reset"> Button </cs-button> `,
    {
      parentNode: form,
    },
  );

  const formResetEvent = oneEvent(form, 'reset');

  element.shadowRoot?.querySelector<HTMLButtonElement>('button')?.click();

  const event = await formResetEvent;
  expect(event instanceof Event).to.be.true;
});

it('participates in a form when type="submit"', async () => {
  const form = document.createElement('form');

  const element = await fixture<HTMLFormElement>(
    html` <cs-button type="submit"> Button </cs-button> `,
    {
      parentNode: form,
    },
  );

  form.addEventListener('submit', (event) => event.preventDefault());

  const formSubmitEvent = oneEvent(form, 'submit');
  element.shadowRoot?.querySelector<HTMLButtonElement>('button')?.click();

  const event = await formSubmitEvent;
  expect(event instanceof Event).to.be.true;
});
