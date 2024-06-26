import './split-link.js';

import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import GlideCoreSplitLink from './split-link.js';
import expectArgumentError from './library/expect-argument-error.js';

GlideCoreSplitLink.shadowRootOptions.mode = 'open';

it('registers', async () => {
  expect(window.customElements.get('glide-core-split-link')).to.equal(
    GlideCoreSplitLink,
  );
});

it('is accessible', async () => {
  const component = await fixture(html`
    <glide-core-split-link url="/">Link</glide-core-split-link>
  `);

  await expect(component).to.be.accessible();
});

it('renders a tabbable link with href with a label by default', async () => {
  const component = await fixture(html`
    <glide-core-split-link url="/">Link</glide-core-split-link>
  `);

  const link = component?.shadowRoot?.querySelector('[data-test="split-link"]');

  expect(link).to.not.be.null;

  expect(link).to.have.attribute('tabindex', '0');
  expect(link).to.have.attribute('href', '/');

  const slots = link?.querySelectorAll<HTMLSlotElement>(
    'slot[data-test="default-slot"]',
  );

  expect(slots?.length).to.be.equal(1);

  const defaultSlot = slots![0].assignedNodes();

  expect(defaultSlot?.at(0)?.textContent).to.equal('Link');
});

it('renders with size "large" and variant "primary" by default', async () => {
  const component = await fixture(html`
    <glide-core-split-link url="/">Link</glide-core-split-link>
  `);

  const link = component?.shadowRoot?.querySelector('[data-test="split-link"]');

  expect(link?.classList.contains('large')).to.be.true;
  expect(link?.classList.contains('primary')).to.be.true;
});

it('adds "small" styling when the "size" attribute is "small" ', async () => {
  const component = await fixture(html`
    <glide-core-split-link size="small" url="/">Link</glide-core-split-link>
  `);

  const link = component?.shadowRoot?.querySelector('[data-test="split-link"]');

  expect(link?.classList.contains('small')).to.be.true;
});

it('adds "secondary" styling when "variant" attribute is "secondary"', async () => {
  const component = await fixture(html`
    <glide-core-split-link variant="secondary" url="/"
      >Link</glide-core-split-link
    >
  `);

  const link = component?.shadowRoot?.querySelector('[data-test="split-link"]');

  expect(link?.classList.contains('secondary')).to.be.true;
});

it('sets the link as untabbable when the "disabled" attribute exists', async () => {
  const component = await fixture(html`
    <glide-core-split-link disabled url="/">Link</glide-core-split-link>
  `);

  const link = component?.shadowRoot?.querySelector('[data-test="split-link"]');

  expect(link).to.have.attribute('tabindex', '-1');
});

it('renders a prefix slot when given', async () => {
  const component = await fixture(html`
    <glide-core-split-link url="/"
      ><div slot="prefix">Prefix</div>
      Link</glide-core-split-link
    >
  `);

  const link = component?.shadowRoot?.querySelector('[data-test="split-link"]');

  expect(link).to.not.be.null;

  const slots = link?.querySelectorAll<HTMLSlotElement>(
    'slot[data-test="prefix-slot"]',
  );

  expect(slots?.length).to.be.equal(1);

  const prefixSlot = slots![0].assignedNodes();

  expect(prefixSlot?.at(0)?.textContent).to.equal('Prefix');
});

it('renders with prefix class when dynamically added and removed', async () => {
  const component = await fixture(html`
    <glide-core-split-link url="/">Link</glide-core-split-link>
  `);

  const prefix = document.createElement('span');
  prefix.setAttribute('slot', 'prefix');
  prefix.dataset.prefix = undefined;
  prefix.textContent = 'prefix';
  component.append(prefix);

  await elementUpdated(component);

  expect([
    ...component.shadowRoot!.querySelector('[data-test="split-link"]')!
      .classList,
  ]).to.include('has-prefix');

  expect(document.querySelector('[data-prefix]')).to.be.not.null;

  prefix.remove();

  await elementUpdated(component);

  expect([
    ...component.shadowRoot!.querySelector('[data-test="split-link"]')!
      .classList,
  ]).to.not.include('has-prefix');
});

it('throws an error when there is no link label', async () => {
  await expectArgumentError(() =>
    fixture(html`<glide-core-split-link url="/"></glide-core-split-link>`),
  );
});

it('throws an error when there is something other than text is in the default slot', async () => {
  await expectArgumentError(() =>
    fixture(
      html`<glide-core-split-link url="#"
        ><div>test</div></glide-core-split-link
      >`,
    ),
  );
});
