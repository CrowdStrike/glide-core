/* eslint-disable @typescript-eslint/no-unused-expressions */

import './modal.js';
import * as sinon from 'sinon';
import { expect, fixture, html } from '@open-wc/testing';
import GlideCoreModal from './modal.js';

GlideCoreModal.shadowRootOptions.mode = 'open';

const cssSupportsStub = sinon.stub(window.CSS, 'supports').returns(false);
const setPropertySpy = sinon.spy(document.documentElement.style, 'setProperty');

afterEach(() => {
  cssSupportsStub.restore();
  setPropertySpy.restore();
});

it('sets the "--glide-scroll-size" variable when the browser does not support scrollbar-gutter', async () => {
  const element = await fixture<GlideCoreModal>(
    html`<glide-core-modal label="Modal title">
      Modal Content
    </glide-core-modal>`,
  );

  element.showModal();

  expect(cssSupportsStub.calledWith('scrollbar-gutter')).to.be.ok;
  expect(setPropertySpy.callCount).to.equal(1);
});
