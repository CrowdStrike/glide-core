import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreModal from './modal.js';
import GlideCoreModalTertiaryIcon from './modal.tertiary-icon.js';

GlideCoreModal.shadowRootOptions.mode = 'open';
GlideCoreModalTertiaryIcon.shadowRootOptions.mode = 'open';

it('sets containing block for tooltips', async () => {
  const element = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Modal title">
      <glide-core-tooltip>
        Tooltip
        <span slot="target">Target</span>
      </glide-core-tooltip>
      <glide-core-modal-tertiary-icon
        slot="tertiary"
        label="Information"
        tooltip-placement="right"
      >
        Icon
      </glide-core-modal-tertiary-icon>
    </glide-core-modal>`,
  );

  const containingBlock = element.shadowRoot?.querySelector('dialog');

  element.showModal();

  const tooltip = element.querySelector('glide-core-tooltip');

  expect(tooltip?.containingBlock === containingBlock).to.be.true;

  const tertiaryIconTooltip = element
    .querySelector('glide-core-modal-tertiary-icon')
    ?.shadowRoot?.querySelector('glide-core-tooltip');

  expect(tertiaryIconTooltip?.containingBlock === containingBlock).to.be.true;
});
