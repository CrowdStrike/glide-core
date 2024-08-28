import { css } from 'lit';
import visuallyHidden from './styles/visually-hidden.js';

export default [
  css`
    ${visuallyHidden('.label')}
  `,
  css`
    .component {
      border: 1px solid var(--glide-core-border-base);
      border-radius: 0.75rem;
      display: inline-block;
    }

    .label {
      /* 
        Colored to pass the contrast check in the "is accessible" test. It's visually 
        hidden and doesn't need to meet contrast requirements. But the alternative 
        is to add "ignoredRules: ['color-contrast']" to that test, disabling contrast 
        checking for the entire component.
      */
      color: var(--glide-core-color-white);
    }

    .container {
      appearance: none;
      display: inline-flex;
      margin: 0;
      padding: 0;

      &.vertical {
        flex-direction: column;
      }
    }
  `,
];
