import { expect, fixture, html } from '@open-wc/testing';
import IconButton from './modal.icon-button.js';

it('registers', async () => {
  expect(window.customElements.get('cs-modal-icon-button')).to.equal(
    IconButton,
  );
});

it('is accessible', async () => {
  const element = await fixture<IconButton>(
    html`<cs-modal-icon-button>Test</cs-modal-icon-button>`,
  );

  await expect(element).to.be.accessible();
});

it('renders and sets default attributes', async () => {
  const element = await fixture<IconButton>(html`
    <cs-modal-icon-button></cs-modal-icon-button>
  `);

  expect(element).to.be.ok;

  const buttonTag = element.shadowRoot!.querySelector('button');
  expect(buttonTag?.getAttribute('type')).to.equal('button');
});
