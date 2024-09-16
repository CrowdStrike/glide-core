/* eslint-disable @typescript-eslint/no-unused-expressions */

import './split-button.js';
import {
  assert,
  elementUpdated,
  expect,
  fixture,
  html,
} from '@open-wc/testing';
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

it('has defaults', async () => {
  const component = await fixture<GlideCoreSplitButton>(
    html`<glide-core-split-button>Button</glide-core-split-button>`,
  );

  const button = component.shadowRoot?.querySelector('button');
  assert(button);

  expect(component.ariaExpanded).to.equal(null);
  expect(component.ariaControls).to.equal(null);
  expect(component.ariaHasPopup).to.equal(null);
  expect(component.disabled).to.equal(false);
  expect(component.size).to.equal('large');
  expect(component.variant).to.equal('primary');

  expect(button.getAttribute('aria-controls')).to.equal(null);
  expect(button.ariaExpanded).to.equal(null);
  expect(button.ariaHasPopup).to.equal(null);
  expect(button.disabled).to.equal(false);
});

it('renders a button with a label by default', async () => {
  const component = await fixture(html`
    <glide-core-split-button>Button</glide-core-split-button>
  `);

  expect(component.textContent).to.equal('Button');
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

  expect(button?.hasAttribute('disabled')).to.be.true;
});

it('renders a prefix slot when given', async () => {
  const component = await fixture(html`
    <glide-core-split-button
      ><div data-prefix slot="prefix">Prefix</div>
      Button</glide-core-split-button
    >
  `);

  expect(component.querySelector('[data-prefix]')).to.be.not.null;
});

it('renders with prefix class when dynamically added and removed', async () => {
  const component = await fixture(html`
    <glide-core-split-button>
      <span slot="prefix">prefix</span>Button</glide-core-split-button
    >
  `);

  expect(document.querySelector('[slot="prefix"]')).to.be.not.null;

  expect([
    ...component.shadowRoot!.querySelector('[data-test="split-button"]')!
      .classList,
  ]).to.include('has-prefix');

  component.querySelector('[slot="prefix"]')?.remove();

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

it('throws an error when there is something other than text in the default slot', async () => {
  await expectArgumentError(() =>
    fixture(
      html`<glide-core-split-button><div>test</div></glide-core-split-button>`,
    ),
  );
});
