import { css } from 'lit';
import focusOutline from './styles/focus-outline.js';
import visuallyHidden from './styles/visually-hidden.js';

export default [
  css`
    ${focusOutline(':host(:focus-visible) .component')}
    ${visuallyHidden('.hidden')}
  `,
  css`
    :host {
      --padding-inline-end: 0rem;
      --padding-inline-start: 0rem;
    }

    /* https://github.com/csstools/stylelint-use-nesting/issues/23 */
    /* stylelint-disable-next-line csstools/use-nesting */
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
      padding-inline-end: var(--padding-inline-end);
      padding-inline-start: var(--padding-inline-start);

      &.selected {
        block-size: 100%;
      }
    }
  `,
];
