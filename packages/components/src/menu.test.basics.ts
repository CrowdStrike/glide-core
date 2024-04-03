import { expect, fixture, html } from '@open-wc/testing';
import Menu from './menu.js';
import MenuLink from './menu/link.js';

it('registers', async () => {
  expect(window.customElements.get('cs-menu')).to.equal(Menu);
});

it('has defaults', async () => {
  // Required attributes are supplied here and thus left unasserted below. The
  // idea is that this test shouldn't fail to typecheck if these templates are
  // eventually typechecked, which means supplying all required attributes and slots.
  const menu = await fixture<Menu>(
    html`<cs-menu label="Menu">
      <button slot="target">Target</button>
      <cs-menu-link label="Link"></cs-menu-link>
    </cs-menu>`,
  );

  expect(menu.getAttribute('label')).to.equal('Menu');
  expect(menu.label).to.equal('Menu');

  expect(menu.getAttribute('size')).to.equal('large');
  expect(menu.size).to.equal('large');
});

it('is accessible', async () => {
  const menu = await fixture<Menu>(
    html`<cs-menu>
      <button slot="target">Target</button>
      <cs-menu-link label="Link"></cs-menu-link>
    </cs-menu>`,
  );

  await expect(menu).to.be.accessible();
});

it('can have a label', async () => {
  const menu = await fixture<Menu>(
    html`<cs-menu label="Menu">
      <button slot="target">Target</button>
      <cs-menu-link label="Link"></cs-menu-link>
    </cs-menu>`,
  );

  expect(menu.getAttribute('label')).to.equal('Menu');
  expect(menu.label).to.equal('Menu');
});

it('can have a default slot', async () => {
  const menu = await fixture<Menu>(
    html`<cs-menu label="Menu">
      <button slot="target">Target</button>
      <cs-menu-link label="Link"></cs-menu-link>
    </cs-menu>`,
  );

  const assignedElements = menu.shadowRoot
    ?.querySelectorAll('slot')[1]
    .assignedElements();
  expect(assignedElements?.at(0) instanceof MenuLink).to.be.true;
});

it('can have a target slot', async () => {
  const menu = await fixture<Menu>(
    html`<cs-menu label="Menu">
      <button slot="target">Target</button>
      <cs-menu-link label="Link"></cs-menu-link>
    </cs-menu>`,
  );

  const assignedElements = menu.shadowRoot
    ?.querySelector<HTMLSlotElement>('slot[name="target"]')
    ?.assignedElements();
  expect(assignedElements?.at(0)?.textContent).to.equal('Target');
});

it('sets accessibility attributes on the target', async () => {
  const menu = await fixture<Menu>(
    html`<cs-menu label="Menu">
      <button slot="target">Target</button>
      <cs-menu-link label="Link"></cs-menu-link>
    </cs-menu>`,
  );

  const button = menu.querySelector('button');

  expect(button?.getAttribute('aria-expanded')).to.equal('false');
  expect(button?.getAttribute('aria-haspopup')).to.equal('true');

  expect(button?.ariaExpanded).to.equal('false');
  expect(button?.ariaHasPopup).to.equal('true');
});
