import './button.js';
import { ArgumentError } from 'ow';
import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import GlideCoreButton from './button.js';
import sinon from 'sinon';

GlideCoreButton.shadowRootOptions.mode = 'open';

it('registers', async () => {
  expect(window.customElements.get('glide-core-button')).to.equal(
    GlideCoreButton,
  );
});

it('is accessible', async () => {
  const component = await fixture<GlideCoreButton>(
    html`<glide-core-button>Button</glide-core-button>`,
  );

  await expect(component).to.be.accessible();
});

it('has defaults', async () => {
  const component = await fixture<GlideCoreButton>(html`
    <glide-core-button>Button</glide-core-button>
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
  const component = await fixture<GlideCoreButton>(
    html`<glide-core-button>Button</glide-core-button>`,
  );

  component.focus();

  expect(component.shadowRoot?.activeElement).to.equal(
    component.shadowRoot?.querySelector('button'),
  );
});

it('renders a secondary variant', async () => {
  const component = await fixture<GlideCoreButton>(html`
    <glide-core-button variant="secondary">Button</glide-core-button>
  `);

  expect([
    ...component.shadowRoot!.querySelector('button')!.classList,
  ]).to.deep.equal(['component', 'secondary', 'large']);
});

it('renders a tertiary variant', async () => {
  const component = await fixture<GlideCoreButton>(html`
    <glide-core-button variant="tertiary">Button</glide-core-button>
  `);

  expect([
    ...component.shadowRoot!.querySelector('button')!.classList,
  ]).to.deep.equal(['component', 'tertiary', 'large']);
});

it('sets the size to "large" by default', async () => {
  const component = await fixture<GlideCoreButton>(html`
    <glide-core-button>Button</glide-core-button>
  `);

  expect(component.size).to.equal('large');

  expect([
    ...component.shadowRoot!.querySelector('button')!.classList,
  ]).to.deep.equal(['component', 'primary', 'large']);
});

it('sets the size attribute to "large"', async () => {
  const component = await fixture<GlideCoreButton>(html`
    <glide-core-button size="large">Button</glide-core-button>
  `);

  expect(component.size).to.equal('large');

  expect([
    ...component.shadowRoot!.querySelector('button')!.classList,
  ]).to.deep.equal(['component', 'primary', 'large']);
});

it('sets the size attribute to "small"', async () => {
  const component = await fixture<GlideCoreButton>(html`
    <glide-core-button size="small">Button</glide-core-button>
  `);

  expect(component.size).to.equal('small');

  expect([
    ...component.shadowRoot!.querySelector('button')!.classList,
  ]).to.deep.equal(['component', 'primary', 'small']);
});

it('sets the disabled attribute', async () => {
  const component = await fixture<GlideCoreButton>(html`
    <glide-core-button disabled>Button</glide-core-button>
  `);

  expect(component.disabled).to.equal(true);

  expect(component.shadowRoot!.querySelector('button')?.disabled).to.equal(
    true,
  );
});

it('sets the type attribute to "submit"', async () => {
  const component = await fixture<GlideCoreButton>(html`
    <glide-core-button type="submit">Button</glide-core-button>
  `);

  expect(component.type).to.equal('submit');

  expect(
    component.shadowRoot!.querySelector('button')?.getAttribute('type'),
  ).to.equal('submit');
});

it('sets the type attribute to "reset"', async () => {
  const component = await fixture<GlideCoreButton>(html`
    <glide-core-button type="reset">Button</glide-core-button>
  `);

  expect(component.type).to.equal('reset');

  expect(
    component.shadowRoot?.querySelector('button')?.getAttribute('type'),
  ).to.equal('reset');
});

it('renders with a prefix slot', async () => {
  const component = await fixture<GlideCoreButton>(html`
    <glide-core-button>
      <span slot="prefix" data-prefix>prefix</span>
      Button
    </glide-core-button>
  `);

  expect([
    ...component.shadowRoot!.querySelector('button')!.classList,
  ]).to.deep.equal(['component', 'primary', 'large', 'has-prefix']);

  expect(document.querySelector('[data-prefix]')).to.be.ok;
});

it('renders with a suffix slot', async () => {
  const component = await fixture<GlideCoreButton>(html`
    <glide-core-button>
      Button
      <span slot="suffix" data-suffix>suffix</span>
    </glide-core-button>
  `);

  expect([
    ...component.shadowRoot!.querySelector('button')!.classList,
  ]).to.deep.equal(['component', 'primary', 'large', 'has-suffix']);

  expect(document.querySelector('[data-suffix]')).to.be.ok;
});

it('renders with a prefix and suffix slot when both are present initially', async () => {
  const component = await fixture<GlideCoreButton>(html`
    <glide-core-button>
      <span slot="prefix" data-prefix>prefix</span>
      Button
      <span slot="suffix" data-suffix>suffix</span>
    </glide-core-button>
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
  const component = await fixture<GlideCoreButton>(html`
    <glide-core-button>Button</glide-core-button>
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
  const component = await fixture<GlideCoreButton>(html`
    <glide-core-button>
      <span slot="prefix">prefix</span>
      Button
      <span slot="suffix">suffix</span>
    </glide-core-button>
  `);

  component.querySelector('[slot="prefix"]')?.remove();
  component.querySelector('[slot="suffix"]')?.remove();
  await elementUpdated(component);

  expect([
    ...component.shadowRoot!.querySelector('button')!.classList,
  ]).to.deep.equal(['component', 'primary', 'large']);
});

it('throws if it does not have a default slot', async () => {
  const spy = sinon.spy();

  try {
    await fixture<GlideCoreButton>(
      html`<glide-core-button></glide-core-button>`,
    );
  } catch (error) {
    if (error instanceof ArgumentError) {
      spy();
    }
  }

  expect(spy.called).to.be.true;
});
