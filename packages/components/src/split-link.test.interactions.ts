import './split-link.js';

import { expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import GlideCoreSplitLink from './split-link.js';
import sinon from 'sinon';

GlideCoreSplitLink.shadowRootOptions.mode = 'open';

// This behavior exists to make the link behave like a button.
it('navigates when the spacebar is pressed', async () => {
  const windowOpen = window.open;
  const spy = sinon.spy();

  window.open = spy;

  const component = await fixture<GlideCoreSplitLink>(html`
    <glide-core-split-link url="/">Link</glide-core-split-link>
  `);

  component.focus();

  await sendKeys({ press: ' ' });

  expect(spy.called).to.be.true;

  window.open = windowOpen;
});
