import '@crowdstrike/glide-icons/editor/move/line.js';
import { expect, fixture, html } from '@open-wc/testing';
import Button from './button.js';

it('registers', async () => {
  expect(window.customElements.get('cs-menu-button')).to.equal(Button);
});

it('has defaults', async () => {
  // Required attributes are supplied and not asserted below. The idea is that
  // this test shouldn't fail to typecheck if these templates are eventually
  // typechecked, which means supplying required attributes up front.
  const button = await fixture<Button>(
    html`<cs-menu-button label="Label"></cs-menu-button>`,
  );

  // Not reflected. So no attribute assertions are necessary.
  expect(button.privateActive).to.equal(false);
});

it('can have a label', async () => {
  const button = await fixture<Button>(
    html`<cs-menu-button label="Label"></cs-menu-button>`,
  );

  expect(button.shadowRoot?.textContent?.trim()).to.equal('Label');
});

it('can have an icon', async () => {
  const button = await fixture<Button>(
    html`<cs-menu-button label="Label">
      <cs-icon-editor-move-line slot="icon"></cs-icon-editor-move-line>
    </cs-menu-button>`,
  );

  const icon = button?.shadowRoot
    ?.querySelector<HTMLSlotElement>('slot[name="icon"]')
    ?.assignedElements()
    .at(0);
  expect(icon instanceof Element).to.be.true;
});
