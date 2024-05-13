import { css } from 'lit';

export default [
  css`
    /* Allows the target icon to properly align */
    .component {
      display: flex;
      margin-block-end: -0.25rem;
    }

    cs-icon-button {
      display: inline-flex;

      --icon-color: var(--target-icon-color);
      --hovered-icon-color: var(--hovered-target-icon-color);
      --size: 1rem;
    }
  `,
];
