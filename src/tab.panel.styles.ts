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

    /*
      This reads a little oddly due to the negation, but we only want to
      set this style on the host when the panel is selected, which means
      it is not hidden. Otherwise we run into the case where non-selected,
      hidden panels will attempt to take up space.
    */
    :host([aria-hidden='false']) {
      block-size: 100%;
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
      padding-inline-start: var(--panel-padding-inline-start);

      &.selected {
        block-size: 100%;
      }
    }

    .selected {
      block-size: 100%;
    }
  `,
];
