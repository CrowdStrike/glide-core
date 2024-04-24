import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import CsDropdownOption from './dropdown.option.js';

CsDropdownOption.shadowRootOptions.mode = 'open';

it('dispatches a "private-change" event', async () => {
  const component = await fixture<CsDropdownOption>(
    html`<cs-dropdown-option label="Label" value="value"></cs-dropdown-option>`,
  );

  setTimeout(() => {
    component.shadowRoot
      ?.querySelector('[role="option"]')
      ?.dispatchEvent(new Event('click', { bubbles: true }));
  });

  const event = await oneEvent(component, 'private-change');
  expect(event instanceof Event).to.be.true;
});

it('dispatches a "private-selected-modified" event', async () => {
  const component = await fixture<CsDropdownOption>(
    html`<cs-dropdown-option label="Label" value="value"></cs-dropdown-option>`,
  );

  setTimeout(() => {
    component.click();
  });

  const event = await oneEvent(component, 'private-selected-modified');
  expect(event instanceof Event).to.be.true;
});

it('dispatches a "private-value-modified" event', async () => {
  const component = await fixture<CsDropdownOption>(
    html`<cs-dropdown-option label="Label" value="value"></cs-dropdown-option>`,
  );

  setTimeout(() => {
    component.value = '';
  });

  const event = await oneEvent(component, 'private-value-modified');
  expect(event instanceof Event).to.be.true;
});
