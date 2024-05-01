import './tag.js';
import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import CsTag from './tag.js';

CsTag.shadowRootOptions.mode = 'open';

it('dispatches a "remove" event when the icon button is clicked', async () => {
  const element = await fixture(
    html`<cs-tag removableLabel="test-aria-label"
      ><span slot="prefix">Prefix</span><span data-content>Tag</span></cs-tag
    >`,
  );
  const iconButton = element.shadowRoot?.querySelector('button');

  setTimeout(() => {
    iconButton?.click();
  });
  const event = await oneEvent(element, 'remove');

  expect(event?.type).to.be.equal('remove');
});
