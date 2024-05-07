import { css } from 'lit';

export default [
  css`
    /* Allows the target icon to properly align */
    .component {
      display: flex;
      margin-block-end: -4px;
    }

    cs-icon-button {
      display: inline-flex;

      --icon-color: var(--target-icon-color);
      --cs-size: 1rem;
    }
  `,
];
