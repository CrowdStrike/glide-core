import { assert, aTimeout, expect, fixture, html } from '@open-wc/testing';
import Label from './label.js';
import Tooltip from './tooltip.js';
import { hover } from './library/mouse.js';

it('shows a label tooltip on hover', async () => {
  const host = await fixture<Label>(
    html`<glide-core-private-label label="Label">
      <label for="input"> ${'x'.repeat(500)} </label>
      <input id="input" slot="control" />
    </glide-core-private-label>`,
  );

  const tooltip = host.shadowRoot
    ?.querySelector<Tooltip>('[data-test="label-tooltip"]')
    ?.shadowRoot?.querySelector<HTMLElement>('[data-test="tooltip"]');

  assert(tooltip);
  tooltip.dataset.openDelay = '0';

  const label = host.shadowRoot?.querySelector('[data-test="label"]');

  await hover(label);
  await aTimeout(0); // Wait for Tooltip's `#onComponentMouseOver()`

  expect(tooltip.checkVisibility()).to.be.true;
});
