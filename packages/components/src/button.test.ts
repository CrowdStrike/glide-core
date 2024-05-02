import './button.js';
import {
  elementUpdated,
  expect,
  fixture,
  html,
  oneEvent,
} from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import Button from './button.js';

Button.shadowRootOptions.mode = 'open';

it('registers', async () => {
  expect(window.customElements.get('cs-button')).to.equal(Button);
});

it('is accessible', async () => {
  const component = await fixture<Button>(html`<cs-button>Button</cs-button>`);

  await expect(component).to.be.accessible();
});

it('has defaults', async () => {
  const component = await fixture<Button>(html`
    <cs-button>Button</cs-button>
  `);

  expect(component.type).to.equal('button');
  expect(component.disabled).to.equal(false);
  expect(component.textContent).to.equal('Button');

  const button = component.shadowRoot?.querySelector('button');

  expect(button?.getAttribute('type')).to.equal('button');
  expect(button?.disabled).to.equal(false);

  expect([...button!.classList]).to.deep.equal([
    'component',
    'primary',
    'large',
  ]);
});

it('delegates focus', async () => {
  const component = await fixture<Button>(html`<cs-button>Button</cs-button>`);

  component.focus();

  expect(component.shadowRoot?.activeElement).to.equal(
    component.shadowRoot?.querySelector('button'),
  );
});

it('renders a secondary variant', async () => {
  const component = await fixture<Button>(html`
    <cs-button variant="secondary">Button</cs-button>
  `);

  expect([
    ...component.shadowRoot!.querySelector('button')!.classList,
  ]).to.deep.equal(['component', 'secondary', 'large']);
});

it('renders a tertiary variant', async () => {
  const component = await fixture<Button>(html`
    <cs-button variant="tertiary">Button</cs-button>
  `);

  expect([
    ...component.shadowRoot!.querySelector('button')!.classList,
  ]).to.deep.equal(['component', 'tertiary', 'large']);
});

it('sets the size to "large" by default', async () => {
  const component = await fixture<Button>(html`
    <cs-button>Button</cs-button>
  `);

  expect(component.size).to.equal('large');

  expect([
    ...component.shadowRoot!.querySelector('button')!.classList,
  ]).to.deep.equal(['component', 'primary', 'large']);
});

it('sets the size attribute to "large"', async () => {
  const component = await fixture<Button>(html`
    <cs-button size="large">Button</cs-button>
  `);

  expect(component.size).to.equal('large');

  expect([
    ...component.shadowRoot!.querySelector('button')!.classList,
  ]).to.deep.equal(['component', 'primary', 'large']);
});

it('sets the size attribute to "small"', async () => {
  const component = await fixture<Button>(html`
    <cs-button size="small">Button</cs-button>
  `);

  expect(component.size).to.equal('small');

  expect([
    ...component.shadowRoot!.querySelector('button')!.classList,
  ]).to.deep.equal(['component', 'primary', 'small']);
});

it('sets the disabled attribute', async () => {
  const component = await fixture<Button>(html`
    <cs-button disabled>Button</cs-button>
  `);

  expect(component.disabled).to.equal(true);

  expect(component.shadowRoot!.querySelector('button')?.disabled).to.equal(
    true,
  );
});

it('sets the type attribute to "submit"', async () => {
  const component = await fixture<Button>(html`
    <cs-button type="submit">Button</cs-button>
  `);

  expect(component.type).to.equal('submit');

  expect(
    component.shadowRoot!.querySelector('button')?.getAttribute('type'),
  ).to.equal('submit');
});

it('sets the type attribute to "reset"', async () => {
  const component = await fixture<Button>(html`
    <cs-button type="reset">Button</cs-button>
  `);

  expect(component.type).to.equal('reset');

  expect(
    component.shadowRoot?.querySelector('button')?.getAttribute('type'),
  ).to.equal('reset');
});

it('renders with a prefix slot', async () => {
  const component = await fixture<Button>(html`
    <cs-button>
      <span slot="prefix" data-prefix>prefix</span>
      Button
    </cs-button>
  `);

  expect([
    ...component.shadowRoot!.querySelector('button')!.classList,
  ]).to.deep.equal(['component', 'primary', 'large', 'has-prefix']);

  expect(document.querySelector('[data-prefix]')).to.be.ok;
});

it('renders with a suffix slot', async () => {
  const component = await fixture<Button>(html`
    <cs-button>
      Button
      <span slot="suffix" data-suffix>suffix</span>
    </cs-button>
  `);

  expect([
    ...component.shadowRoot!.querySelector('button')!.classList,
  ]).to.deep.equal(['component', 'primary', 'large', 'has-suffix']);

  expect(document.querySelector('[data-suffix]')).to.be.ok;
});

it('renders with a prefix and suffix slot when both are present initially', async () => {
  const component = await fixture<Button>(html`
    <cs-button>
      <span slot="prefix" data-prefix>prefix</span>
      Button
      <span slot="suffix" data-suffix>suffix</span>
    </cs-button>
  `);

  expect([
    ...component.shadowRoot!.querySelector('button')!.classList,
  ]).to.deep.equal([
    'component',
    'primary',
    'large',
    'has-prefix',
    'has-suffix',
  ]);

  expect(document.querySelector('[data-prefix]')).to.be.ok;
  expect(document.querySelector('[data-suffix]')).to.be.ok;
});

it('renders with prefix and suffix classes when both are dynamically added', async () => {
  const component = await fixture<Button>(html`
    <cs-button> Button </cs-button>
  `);

  const prefix = document.createElement('span');
  prefix.setAttribute('slot', 'prefix');
  prefix.dataset.prefix = undefined;
  prefix.textContent = 'prefix';
  component.append(prefix);

  const suffix = document.createElement('span');
  suffix.setAttribute('slot', 'suffix');
  prefix.dataset.suffix = undefined;
  suffix.textContent = 'suffix';
  component.append(suffix);

  await elementUpdated(component);

  expect([
    ...component.shadowRoot!.querySelector('button')!.classList,
  ]).to.deep.equal([
    'component',
    'primary',
    'large',
    'has-prefix',
    'has-suffix',
  ]);

  expect(document.querySelector('[data-prefix]')).to.be.ok;
  expect(document.querySelector('[data-suffix]')).to.be.ok;
});

it('renders without prefix and suffix classes after both are removed', async () => {
  const component = await fixture<Button>(html`
    <cs-button>
      <span slot="prefix">prefix</span>
      Button
      <span slot="suffix">suffix</span>
    </cs-button>
  `);

  component.querySelector('[slot="prefix"]')?.remove();
  component.querySelector('[slot="suffix"]')?.remove();
  await elementUpdated(component);

  expect([
    ...component.shadowRoot!.querySelector('button')!.classList,
  ]).to.deep.equal(['component', 'primary', 'large']);
});

it('dispatches an event when clicked and type="button"', async () => {
  const component = await fixture<Button>(html`
    <cs-button type="button"> Button </cs-button>
  `);

  const clickEvent = oneEvent(component, 'click');

  component.shadowRoot?.querySelector<HTMLButtonElement>('button')?.click();

  const event = await clickEvent;
  expect(event instanceof Event).to.be.true;
});

it('dispatches an event when hitting "enter" and type="button"', async () => {
  const component = await fixture<Button>(html`
    <cs-button type="button"> Button </cs-button>
  `);

  const keyDownEvent = oneEvent(component, 'keydown');

  component.focus();
  await sendKeys({ press: 'Enter' });

  const event = await keyDownEvent;

  expect(event instanceof Event).to.be.true;
  expect(event.key).to.equal('Enter');
});

it('participates in a form when type="reset"', async () => {
  const form = document.createElement('form');

  const component = await fixture<Button>(
    html` <cs-button type="reset"> Button </cs-button> `,
    {
      parentNode: form,
    },
  );

  const formResetEvent = oneEvent(form, 'reset');

  component.shadowRoot?.querySelector<HTMLButtonElement>('button')?.click();

  const event = await formResetEvent;
  expect(event instanceof Event).to.be.true;
});

it('participates in a form when hitting "enter" and type="reset"', async () => {
  const form = document.createElement('form');

  const component = await fixture<Button>(
    html` <cs-button type="reset"> Button </cs-button> `,
    {
      parentNode: form,
    },
  );

  const formResetEvent = oneEvent(form, 'reset');
  component.focus();
  await sendKeys({ press: 'Enter' });

  const event = await formResetEvent;
  expect(event instanceof Event).to.be.true;
});

it('participates in a form when type="submit"', async () => {
  const form = document.createElement('form');

  const component = await fixture<Button>(
    html` <cs-button type="submit"> Button </cs-button> `,
    {
      parentNode: form,
    },
  );

  form.addEventListener('submit', (event) => event.preventDefault());

  const formSubmitEvent = oneEvent(form, 'submit');
  component.shadowRoot?.querySelector<Button>('button')?.click();

  const event = await formSubmitEvent;
  expect(event instanceof Event).to.be.true;
});

it('participates in a form when hitting "enter" and type="submit"', async () => {
  const form = document.createElement('form');

  const component = await fixture<Button>(
    html` <cs-button type="submit"> Button </cs-button> `,
    {
      parentNode: form,
    },
  );

  form.addEventListener('submit', (event) => event.preventDefault());

  const formSubmitEvent = oneEvent(form, 'submit');
  component.focus();
  await sendKeys({ press: 'Enter' });

  const event = await formSubmitEvent;
  expect(event instanceof Event).to.be.true;
});
