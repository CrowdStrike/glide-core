import './split-button.js';

import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import GlideCoreSplitButton from './split-button.js';
import expectArgumentError from './library/expect-argument-error.js';

GlideCoreSplitButton.shadowRootOptions.mode = 'open';

it('registers', async () => {
  expect(window.customElements.get('glide-core-split-button')).to.equal(
    GlideCoreSplitButton,
  );
});

it('is accessible', async () => {
  const component = await fixture(html`
    <glide-core-split-button>Button</glide-core-split-button>
  `);

  await expect(component).to.be.accessible();
});

it('renders a button with a label by default', async () => {
  const component = await fixture(html`
    <glide-core-split-button>Button</glide-core-split-button>
  `);

  const button = component?.shadowRoot?.querySelector(
    '[data-test="split-button"]',
  );

  expect(button).to.not.be.null;

  const slot = button?.querySelector<HTMLSlotElement>(
    'slot[data-test="default-slot"]',
  );

  expect(slot).to.not.be.null;

  const defaultSlot = slot!.assignedNodes();

  expect(defaultSlot?.at(0)?.textContent).to.equal('Button');
});

it('renders with size "large" and variant "primary" by default', async () => {
  const component = await fixture(html`
    <glide-core-split-button>Button</glide-core-split-button>
  `);

  const button = component?.shadowRoot?.querySelector(
    '[data-test="split-button"]',
  );

  expect(button?.classList.contains('large')).to.be.true;
  expect(button?.classList.contains('primary')).to.be.true;
});

it('adds "small" styling when "size" attribute is "small"', async () => {
  const component = await fixture(html`
    <glide-core-split-button size="small">Button</glide-core-split-button>
  `);

  const button = component?.shadowRoot?.querySelector(
    '[data-test="split-button"]',
  );

  expect(button?.classList.contains('small')).to.be.true;
});

it('adds "secondary" styling when "variant" attribute is "secondary"', async () => {
  const component = await fixture(html`
    <glide-core-split-button variant="secondary"
      >Button</glide-core-split-button
    >
  `);

  const button = component?.shadowRoot?.querySelector(
    '[data-test="split-button"]',
  );

  expect(button?.classList.contains('secondary')).to.be.true;
});

it('sets the button as "disabled" when the attribute exists', async () => {
  const component = await fixture(html`
    <glide-core-split-button disabled>Button</glide-core-split-button>
  `);

  const button = component?.shadowRoot?.querySelector(
    '[data-test="split-button"]',
  );

  expect(button).to.have.attribute('disabled');
});

it('renders a prefix slot when given', async () => {
  const component = await fixture(html`
    <glide-core-split-button
      ><div slot="prefix">Prefix</div>
      Button</glide-core-split-button
    >
  `);

  const button = component?.shadowRoot?.querySelector(
    '[data-test="split-button"]',
  );

  expect(button).to.not.be.null;

  const slots = button?.querySelectorAll<HTMLSlotElement>(
    'slot[data-test="prefix-slot"]',
  );

  expect(slots?.length).to.be.equal(1);

  const prefixSlot = slots![0].assignedNodes();

  expect(prefixSlot?.at(0)?.textContent).to.equal('Prefix');
});

it('renders with prefix class when dynamically added and removed', async () => {
  const component = await fixture(html`
    <glide-core-split-button>Button</glide-core-split-button>
  `);

  const prefix = document.createElement('span');
  prefix.setAttribute('slot', 'prefix');
  prefix.dataset.prefix = undefined;
  prefix.textContent = 'prefix';
  component.append(prefix);

  await elementUpdated(component);

  expect([
    ...component.shadowRoot!.querySelector('[data-test="split-button"]')!
      .classList,
  ]).to.include('has-prefix');

  expect(document.querySelector('[data-prefix]')).to.be.not.null;

  prefix.remove();

  await elementUpdated(component);

  expect([
    ...component.shadowRoot!.querySelector('[data-test="split-button"]')!
      .classList,
  ]).to.not.include('has-prefix');
});

it('throws an error when there is no button label', async () => {
  await expectArgumentError(() =>
    fixture(html`<glide-core-split-button></glide-core-split-button>`),
  );
});

it('throws an error when there is something other than text is in the default slot', async () => {
  await expectArgumentError(() =>
    fixture(
      html`<glide-core-split-button><div>test</div></glide-core-split-button>`,
    ),
  );
});
