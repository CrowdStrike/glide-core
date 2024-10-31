import { css } from 'lit';
import focusOutline from './styles/focus-outline.js';
import visuallyHidden from './styles/visually-hidden.js';

export default [
  css`
    ${focusOutline(':host(:focus-visible) .component')}
    ${visuallyHidden('.hidden')}
  `,
  css`
    :host(:focus-visible) {
      outline: none;
    }

    .component {
      font-family: var(--glide-core-font-sans);
      outline: none;

      /*
        Prefixing the CSS custom property with "panel" will
        ensure we are robust. Imagine cases where consumers
        have set "--padding-inline-start" or "--padding-inline-end"
        already and now we require these variables to adjust
        padding within our panels. Adding the prefix of "panel"
        should ensure uniqueness to our component.

        A second reason we prefix this is so that consumers
        can set these properties on the parent Tab Group
        and it will apply to all child panels for convenience.
      */
      padding-inline-end: var(--panel-padding-inline-end);

      /* Better to be explicit with start and end than using the shorthand property */
      /* stylelint-disable-next-line declaration-block-no-redundant-longhand-properties */
      padding-inline-start: var(--panel-padding-inline-start);
    }
  `,
];
