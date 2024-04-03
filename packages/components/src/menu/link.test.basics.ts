import '@crowdstrike/glide-icons/editor/move/line.js';
import { expect, fixture, html } from '@open-wc/testing';
import Link from './link.js';

it('registers', async () => {
  expect(window.customElements.get('cs-menu-link')).to.equal(Link);
});

it('has defaults', async () => {
  // Required attributes are supplied and not asserted below. The idea is that
  // this test shouldn't fail to typecheck if these templates are eventually
  // typechecked, which means supplying required attributes up front.
  const link = await fixture<Link>(
    html`<cs-menu-link label="Label" url="/"></cs-menu-link>`,
  );

  // Not reflected. So no attribute assertions are necessary.
  expect(link.privateActive).to.be.false;
});

it('can have a label', async () => {
  const link = await fixture<Link>(
    html`<cs-menu-link label="Label" url="/"></cs-menu-link>`,
  );

  expect(link.shadowRoot?.textContent?.trim()).to.equal('Label');
});

it('can have a URL', async () => {
  const link = await fixture<Link>(
    html`<cs-menu-link label="Label" url="/"></cs-menu-link>`,
  );

  expect(link.url).to.equal('/');
});

it('can have an icon', async () => {
  const link = await fixture<Link>(
    html`<cs-menu-link label="Label">
      <cs-icon-editor-move-line slot="icon" url="/"></cs-icon-editor-move-line>
    </cs-menu-link>`,
  );

  const icon = link?.shadowRoot
    ?.querySelector<HTMLSlotElement>('slot[name="icon"]')
    ?.assignedElements()
    .at(0);
  expect(icon instanceof Element).to.be.true;
});
