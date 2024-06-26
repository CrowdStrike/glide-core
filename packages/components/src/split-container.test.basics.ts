import './split-button.js';
import './split-container.js';
import './split-link.js';

import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import GlideCoreSplitButton from './split-button.js';
import GlideCoreSplitContainer from './split-container.js';
import GlideCoreSplitLink from './split-link.js';
import expectArgumentError from './library/expect-argument-error.js';

GlideCoreSplitContainer.shadowRootOptions.mode = 'open';

it('registers', async () => {
  expect(window.customElements.get('glide-core-split-container')).to.equal(
    GlideCoreSplitContainer,
  );
});

it('is accessible', async () => {
  const component = await fixture(html`
    <glide-core-split-container menu-label="label">
      <glide-core-split-button slot="main-action"
        >Button</glide-core-split-button
      >
      <glide-core-menu-link label="One" url="/one"></glide-core-menu-link>
      <glide-core-menu-link label="Two" url="/two"></glide-core-menu-link>
      <glide-core-menu-button label="Three"></glide-core-menu-button>
    </glide-core-split-container>
  `);

  await expect(component).to.be.accessible();
});

it('should render two buttons, one a menu button with "label", and a divider, when the menu is closed', async () => {
  const component = await fixture(html`
    <glide-core-split-container menu-label="label">
      <glide-core-split-button slot="main-action"
        >Button</glide-core-split-button
      >
      <glide-core-menu-link label="One" url="/one"></glide-core-menu-link>
    </glide-core-split-container>
  `);

  expect(component.shadowRoot?.querySelector('[data-test="split-menu-button"]'))
    .to.be.not.null;

  expect(component.shadowRoot?.querySelector('[data-test="split-divider"]')).to
    .be.not.null;

  const slot = component?.shadowRoot?.querySelector<HTMLSlotElement>(
    'slot[data-test="main-action"]',
  );

  expect(slot).to.be.not.null;

  const defaultSlotValue = slot!.assignedNodes()?.at(0);

  expect(defaultSlotValue instanceof GlideCoreSplitButton).to.be.true;

  expect(defaultSlotValue?.textContent).to.equal('Button');
});

it('should render a link, a menu button with "label", and a divider, when the menu is closed', async () => {
  const component = await fixture(html`
    <glide-core-split-container menu-label="label">
      <glide-core-split-link slot="main-action">Link</glide-core-split-link>
      <glide-core-menu-link label="One" url="/one"></glide-core-menu-link>
    </glide-core-split-container>
  `);

  expect(component.shadowRoot?.querySelector('[data-test="split-menu-button"]'))
    .to.be.not.null;

  expect(component.shadowRoot?.querySelector('[data-test="split-divider"]')).to
    .be.not.null;

  const slot = component?.shadowRoot?.querySelector<HTMLSlotElement>(
    'slot[data-test="main-action"]',
  );

  expect(slot).to.be.not.null;

  const defaultSlotValue = slot!.assignedNodes()?.at(0);

  expect(defaultSlotValue instanceof GlideCoreSplitLink).to.be.true;

  expect(defaultSlotValue?.textContent).to.equal('Link');
});

it('does not set the menu to "open" by default', async () => {
  const component = await fixture(html`
    <glide-core-split-container menu-label="label">
      <glide-core-split-button slot="main-action"
        >Button</glide-core-split-button
      >
      <glide-core-menu-link label="One" url="/one"></glide-core-menu-link>
    </glide-core-split-container>
  `);

  expect(
    component.shadowRoot?.querySelector('glide-core-menu'),
  ).to.not.have.attribute('open');
});

it('sets the menu component to "open" when the "open" attribute is set', async () => {
  const component = await fixture(html`
    <glide-core-split-container menu-label="label" open>
      <glide-core-split-button slot="main-action"
        >Button</glide-core-split-button
      >
      <glide-core-menu-link label="One" url="/one"></glide-core-menu-link>
    </glide-core-split-container>
  `);

  expect(
    component.shadowRoot?.querySelector('glide-core-menu'),
  ).to.have.attribute('open');
});

it('applies appropriate classes and attributes when "size" is set to "small"', async () => {
  const component = await fixture(html`
    <glide-core-split-container menu-label="label" size="small">
      <glide-core-split-button slot="main-action"
        >Button</glide-core-split-button
      >
      <glide-core-menu-link label="One" url="/one"></glide-core-menu-link>
    </glide-core-split-container>
  `);

  expect(
    component.shadowRoot
      ?.querySelector<HTMLSlotElement>('[data-test="main-action"]')
      ?.assignedNodes()
      ?.at(0),
  ).to.have.attribute('size', 'small');

  expect(
    component.shadowRoot
      ?.querySelector<HTMLElement>('[data-test="split-menu-button"]')
      ?.classList.contains('small'),
  ).to.be.true;

  expect(
    component.shadowRoot?.querySelector('glide-core-menu'),
  ).to.have.attribute('size', 'small');
});

it('applies appropriate classes and attributes when "size" is set to "large"', async () => {
  const component = await fixture(html`
    <glide-core-split-container menu-label="label" size="large">
      <glide-core-split-button slot="main-action"
        >Button</glide-core-split-button
      >
      <glide-core-menu-link label="One" url="/one"></glide-core-menu-link>
    </glide-core-split-container>
  `);

  expect(
    component.shadowRoot
      ?.querySelector<HTMLSlotElement>('[data-test="main-action"]')
      ?.assignedNodes()
      ?.at(0),
  ).to.have.attribute('size', 'large');

  expect(
    component.shadowRoot
      ?.querySelector<HTMLElement>('[data-test="split-menu-button"]')
      ?.classList.contains('large'),
  ).to.be.true;

  expect(
    component.shadowRoot?.querySelector('glide-core-menu'),
  ).to.have.attribute('size', 'large');
});

it('applies appropriate classes and attributes by default as "large" when "size" is not set', async () => {
  const component = await fixture(html`
    <glide-core-split-container menu-label="label">
      <glide-core-split-button slot="main-action"
        >Button</glide-core-split-button
      >
      <glide-core-menu-link label="One" url="/one"></glide-core-menu-link>
    </glide-core-split-container>
  `);

  expect(
    component.shadowRoot
      ?.querySelector<HTMLSlotElement>('[data-test="main-action"]')
      ?.assignedNodes()
      ?.at(0),
  ).to.have.attribute('size', 'large');

  expect(
    component.shadowRoot
      ?.querySelector<HTMLElement>('[data-test="split-menu-button"]')
      ?.classList.contains('large'),
  ).to.be.true;

  expect(
    component.shadowRoot?.querySelector('glide-core-menu'),
  ).to.have.attribute('size', 'large');
});

it('applies appropriate classes and attributes when "size" is dynamically changed using the split button', async () => {
  const component = await fixture<GlideCoreSplitContainer>(html`
    <glide-core-split-container menu-label="label" size="large">
      <glide-core-split-button slot="main-action"
        >Button</glide-core-split-button
      >
      <glide-core-menu-link label="One" url="/one"></glide-core-menu-link>
    </glide-core-split-container>
  `);

  expect(
    component.shadowRoot
      ?.querySelector<HTMLSlotElement>('[data-test="main-action"]')
      ?.assignedNodes()
      ?.at(0),
  ).to.have.attribute('size', 'large');

  expect(
    component.shadowRoot
      ?.querySelector<HTMLElement>('[data-test="split-menu-button"]')
      ?.classList.contains('large'),
  ).to.be.true;

  expect(
    component.shadowRoot?.querySelector('glide-core-menu'),
  ).to.have.attribute('size', 'large');

  component.size = 'small';

  await elementUpdated(component);

  expect(
    component.shadowRoot
      ?.querySelector<HTMLSlotElement>('[data-test="main-action"]')
      ?.assignedNodes()
      ?.at(0),
  ).to.have.attribute('size', 'small');

  expect(
    component.shadowRoot
      ?.querySelector<HTMLElement>('[data-test="split-menu-button"]')
      ?.classList.contains('small'),
  ).to.be.true;

  expect(
    component.shadowRoot?.querySelector('glide-core-menu'),
  ).to.have.attribute('size', 'small');
});

it('applies appropriate classes and attributes when "size" is dynamically changed using the link button', async () => {
  const component = await fixture<GlideCoreSplitContainer>(html`
    <glide-core-split-container menu-label="label" size="large">
      <glide-core-split-link slot="main-action" url="/"
        >Button</glide-core-split-link
      >
      <glide-core-menu-link label="One" url="/one"></glide-core-menu-link>
    </glide-core-split-container>
  `);

  expect(
    component.shadowRoot
      ?.querySelector<HTMLSlotElement>('[data-test="main-action"]')
      ?.assignedNodes()
      ?.at(0),
  ).to.have.attribute('size', 'large');

  expect(
    component.shadowRoot
      ?.querySelector<HTMLElement>('[data-test="split-menu-button"]')
      ?.classList.contains('large'),
  ).to.be.true;

  expect(
    component.shadowRoot?.querySelector('glide-core-menu'),
  ).to.have.attribute('size', 'large');

  component.size = 'small';

  await elementUpdated(component);

  expect(
    component.shadowRoot
      ?.querySelector<HTMLSlotElement>('[data-test="main-action"]')
      ?.assignedNodes()
      ?.at(0),
  ).to.have.attribute('size', 'small');

  expect(
    component.shadowRoot
      ?.querySelector<HTMLElement>('[data-test="split-menu-button"]')
      ?.classList.contains('small'),
  ).to.be.true;

  expect(
    component.shadowRoot?.querySelector('glide-core-menu'),
  ).to.have.attribute('size', 'small');
});

it('applies appropriate classes and sets the "variant" to "primary" by default', async () => {
  const component = await fixture(html`
    <glide-core-split-container menu-label="label">
      <glide-core-split-button slot="main-action"
        >Button</glide-core-split-button
      >
      <glide-core-menu-link label="One" url="/one"></glide-core-menu-link>
    </glide-core-split-container>
  `);

  expect(
    component.shadowRoot
      ?.querySelector<HTMLSlotElement>('[data-test="main-action"]')
      ?.assignedNodes()
      ?.at(0),
  ).to.have.attribute('variant', 'primary');

  expect(
    component.shadowRoot
      ?.querySelector<HTMLElement>('[data-test="split-menu-button"]')
      ?.classList.contains('primary'),
  ).to.be.true;

  expect(
    component.shadowRoot
      ?.querySelector('[data-test="split-divider"]')
      ?.classList.contains('primary'),
  ).to.be.true;
});

it('applies appropriate classes when "variant" to set to "primary"', async () => {
  const component = await fixture(html`
    <glide-core-split-container menu-label="label" variant="primary">
      <glide-core-split-button slot="main-action"
        >Button</glide-core-split-button
      >
      <glide-core-menu-link label="One" url="/one"></glide-core-menu-link>
    </glide-core-split-container>
  `);

  expect(
    component.shadowRoot
      ?.querySelector<HTMLSlotElement>('[data-test="main-action"]')
      ?.assignedNodes()
      ?.at(0),
  ).to.have.attribute('variant', 'primary');

  expect(
    component.shadowRoot
      ?.querySelector<HTMLElement>('[data-test="split-menu-button"]')
      ?.classList.contains('primary'),
  ).to.be.true;

  expect(
    component.shadowRoot
      ?.querySelector('[data-test="split-divider"]')
      ?.classList.contains('primary'),
  ).to.be.true;
});

it('applies appropriate classes when "variant" to set to "secondary"', async () => {
  const component = await fixture(html`
    <glide-core-split-container menu-label="label" variant="secondary">
      <glide-core-split-button slot="main-action"
        >Button</glide-core-split-button
      >
      <glide-core-menu-link label="One" url="/one"></glide-core-menu-link>
    </glide-core-split-container>
  `);

  expect(
    component.shadowRoot
      ?.querySelector<HTMLSlotElement>('[data-test="main-action"]')
      ?.assignedNodes()
      ?.at(0),
  ).to.have.attribute('variant', 'secondary');

  expect(
    component.shadowRoot
      ?.querySelector<HTMLElement>('[data-test="split-menu-button"]')
      ?.classList.contains('secondary'),
  ).to.be.true;

  expect(
    component.shadowRoot
      ?.querySelector('[data-test="split-divider"]')
      ?.classList.contains('secondary'),
  ).to.be.true;
});

it('applies appropriate classes and attributes when "variant" is dynamically changed using the split button', async () => {
  const component = await fixture<GlideCoreSplitContainer>(html`
    <glide-core-split-container menu-label="label" variant="primary">
      <glide-core-split-button slot="main-action"
        >Button</glide-core-split-button
      >
      <glide-core-menu-link label="One" url="/one"></glide-core-menu-link>
    </glide-core-split-container>
  `);

  expect(
    component.shadowRoot
      ?.querySelector<HTMLSlotElement>('[data-test="main-action"]')
      ?.assignedNodes()
      ?.at(0),
  ).to.have.attribute('variant', 'primary');

  expect(
    component.shadowRoot
      ?.querySelector<HTMLElement>('[data-test="split-menu-button"]')
      ?.classList.contains('primary'),
  ).to.be.true;

  expect(
    component.shadowRoot
      ?.querySelector('[data-test="split-divider"]')
      ?.classList.contains('primary'),
  ).to.be.true;

  component.variant = 'secondary';

  await elementUpdated(component);

  expect(
    component.shadowRoot
      ?.querySelector<HTMLSlotElement>('[data-test="main-action"]')
      ?.assignedNodes()
      ?.at(0),
  ).to.have.attribute('variant', 'secondary');

  expect(
    component.shadowRoot
      ?.querySelector<HTMLElement>('[data-test="split-menu-button"]')
      ?.classList.contains('secondary'),
  ).to.be.true;

  expect(
    component.shadowRoot
      ?.querySelector('[data-test="split-divider"]')
      ?.classList.contains('secondary'),
  ).to.be.true;
});

it('applies appropriate classes and attributes when "variant" is dynamically changed using the link button', async () => {
  const component = await fixture<GlideCoreSplitContainer>(html`
    <glide-core-split-container menu-label="label" variant="primary">
      <glide-core-split-link slot="main-action" url="/"
        >Button</glide-core-split-link
      >
      <glide-core-menu-link label="One" url="/one"></glide-core-menu-link>
    </glide-core-split-container>
  `);

  expect(
    component.shadowRoot
      ?.querySelector<HTMLSlotElement>('[data-test="main-action"]')
      ?.assignedNodes()
      ?.at(0),
  ).to.have.attribute('variant', 'primary');

  expect(
    component.shadowRoot
      ?.querySelector<HTMLElement>('[data-test="split-menu-button"]')
      ?.classList.contains('primary'),
  ).to.be.true;

  expect(
    component.shadowRoot
      ?.querySelector('[data-test="split-divider"]')
      ?.classList.contains('primary'),
  ).to.be.true;

  component.variant = 'secondary';

  await elementUpdated(component);

  expect(
    component.shadowRoot
      ?.querySelector<HTMLSlotElement>('[data-test="main-action"]')
      ?.assignedNodes()
      ?.at(0),
  ).to.have.attribute('variant', 'secondary');

  expect(
    component.shadowRoot
      ?.querySelector<HTMLElement>('[data-test="split-menu-button"]')
      ?.classList.contains('secondary'),
  ).to.be.true;

  expect(
    component.shadowRoot
      ?.querySelector('[data-test="split-divider"]')
      ?.classList.contains('secondary'),
  ).to.be.true;
});

it('sets the appropriate classes and attributes when the "disabled" attribute is set', async () => {
  const component = await fixture(html`
    <glide-core-split-container menu-label="label" disabled>
      <glide-core-split-button slot="main-action"
        >Button</glide-core-split-button
      >
      <glide-core-menu-link label="One" url="/one"></glide-core-menu-link>
    </glide-core-split-container>
  `);

  expect(
    component.shadowRoot
      ?.querySelector<HTMLSlotElement>('[data-test="main-action"]')
      ?.assignedNodes()
      ?.at(0),
  ).to.have.attribute('disabled');

  expect(
    component.shadowRoot
      ?.querySelector<HTMLElement>('[data-test="split-menu-button"]')
      ?.classList.contains('disabled'),
  ).to.be.true;

  expect(
    component.shadowRoot?.querySelector<HTMLElement>(
      '[data-test="split-menu-button"]',
    ),
  ).to.have.attribute('disabled');
});

it('applies appropriate classes and attributes when "disabled" is dynamically changed using the split button', async () => {
  const component = await fixture<GlideCoreSplitContainer>(html`
    <glide-core-split-container menu-label="label">
      <glide-core-split-button slot="main-action"
        >Button</glide-core-split-button
      >
      <glide-core-menu-link label="One" url="/one"></glide-core-menu-link>
    </glide-core-split-container>
  `);

  expect(
    component.shadowRoot
      ?.querySelector<HTMLSlotElement>('[data-test="main-action"]')
      ?.assignedNodes()
      ?.at(0),
  ).to.not.have.attribute('disabled');

  expect(
    component.shadowRoot
      ?.querySelector<HTMLElement>('[data-test="split-menu-button"]')
      ?.classList.contains('disabled'),
  ).to.be.false;

  expect(
    component.shadowRoot?.querySelector<HTMLElement>(
      '[data-test="split-menu-button"]',
    ),
  ).to.not.have.attribute('disabled');

  component.disabled = true;

  await elementUpdated(component);

  expect(
    component.shadowRoot
      ?.querySelector<HTMLSlotElement>('[data-test="main-action"]')
      ?.assignedNodes()
      ?.at(0),
  ).to.have.attribute('disabled');

  expect(
    component.shadowRoot
      ?.querySelector<HTMLElement>('[data-test="split-menu-button"]')
      ?.classList.contains('disabled'),
  ).to.be.true;

  expect(
    component.shadowRoot?.querySelector<HTMLElement>(
      '[data-test="split-menu-button"]',
    ),
  ).to.have.attribute('disabled');
});

it('applies appropriate classes and attributes when "disabled" is dynamically changed using the link button', async () => {
  const component = await fixture<GlideCoreSplitContainer>(html`
    <glide-core-split-container menu-label="label">
      <glide-core-split-link slot="main-action" url="/"
        >Button</glide-core-split-link
      >
      <glide-core-menu-link label="One" url="/one"></glide-core-menu-link>
    </glide-core-split-container>
  `);

  expect(
    component.shadowRoot
      ?.querySelector<HTMLSlotElement>('[data-test="main-action"]')
      ?.assignedNodes()
      ?.at(0),
  ).to.not.have.attribute('disabled');

  expect(
    component.shadowRoot
      ?.querySelector<HTMLElement>('[data-test="split-menu-button"]')
      ?.classList.contains('disabled'),
  ).to.be.false;

  expect(
    component.shadowRoot?.querySelector<HTMLElement>(
      '[data-test="split-menu-button"]',
    ),
  ).to.not.have.attribute('disabled');

  component.disabled = true;

  await elementUpdated(component);

  expect(
    component.shadowRoot
      ?.querySelector<HTMLSlotElement>('[data-test="main-action"]')
      ?.assignedNodes()
      ?.at(0),
  ).to.have.attribute('disabled');

  expect(
    component.shadowRoot
      ?.querySelector<HTMLElement>('[data-test="split-menu-button"]')
      ?.classList.contains('disabled'),
  ).to.be.true;

  expect(
    component.shadowRoot?.querySelector<HTMLElement>(
      '[data-test="split-menu-button"]',
    ),
  ).to.have.attribute('disabled');
});

it('sets the default "menu-placement" as "bottom-end"', async () => {
  const component = await fixture(html`
    <glide-core-split-container menu-label="label">
      <glide-core-split-button slot="main-action"
        >Button</glide-core-split-button
      >
      <glide-core-menu-link label="One" url="/one"></glide-core-menu-link>
    </glide-core-split-container>
  `);

  expect(
    component.shadowRoot?.querySelector('glide-core-menu'),
  ).to.have.attribute('placement', 'bottom-end');
});

it('sets the "menu-placement" attribute as specified', async () => {
  const component = await fixture(html`
    <glide-core-split-container menu-label="label" menu-placement="bottom">
      <glide-core-split-button slot="main-action"
        >Button</glide-core-split-button
      >
      <glide-core-menu-link label="One" url="/one"></glide-core-menu-link>
    </glide-core-split-container>
  `);

  expect(
    component.shadowRoot?.querySelector('glide-core-menu'),
  ).to.have.attribute('placement', 'bottom');
});

it('focuses the "main-action" slotted element when the container component is focused', async () => {
  const component = await fixture<GlideCoreSplitContainer>(html`
    <glide-core-split-container menu-label="label" menu-placement="bottom">
      <glide-core-split-button slot="main-action"
        >Button</glide-core-split-button
      >
      <glide-core-menu-link label="One" url="/one"></glide-core-menu-link>
    </glide-core-split-container>
  `);

  component.focus();

  expect(
    component.shadowRoot
      ?.querySelector<HTMLSlotElement>('[data-test="main-action"]')
      ?.assignedNodes()
      ?.at(0),
  ).to.have.focus;
});

it('throws an error when the default slot is empty', async () => {
  await expectArgumentError(() =>
    fixture(
      html`<glide-core-split-container menu-label="label">
        <glide-core-split-button slot="main-action"
          >Button</glide-core-split-button
        >
      </glide-core-split-container>`,
    ),
  );
});

// This throws an error outside the test. It's related to type checking for `glide-core-menu`.
it('throws an error when the default slot is of an unsupported type', async () => {
  await expectArgumentError(() =>
    fixture(
      html`<glide-core-split-container menu-label="label">
        <glide-core-split-button slot="main-action"
          >Button</glide-core-split-button
        >
        <div>Option</div>
      </glide-core-split-container>`,
    ),
  );
});
