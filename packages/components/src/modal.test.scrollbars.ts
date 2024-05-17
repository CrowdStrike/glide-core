import './modal.js';
import * as sinon from 'sinon';
import { expect, fixture, html } from '@open-wc/testing';
import Modal from './modal.js';

Modal.shadowRootOptions.mode = 'open';

const cssSupportsStub = sinon.stub(window.CSS, 'supports').returns(false);
const setPropertySpy = sinon.spy(document.documentElement.style, 'setProperty');

afterEach(() => {
  cssSupportsStub.restore();
  setPropertySpy.restore();
});

it('sets the "--glide-scroll-size" variable when the browser does not support scrollbar-gutter', async () => {
  const element = await fixture<Modal>(
    html`<cs-modal label="Modal title"></cs-modal>`,
  );

  element.showModal();

  expect(cssSupportsStub.calledWith('scrollbar-gutter')).to.be.ok;
  expect(setPropertySpy.callCount).to.equal(1);
});
