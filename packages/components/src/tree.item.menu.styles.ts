import { css } from 'lit';

export default [
  css`
    /* Allows the target icon to properly align */
    .component {
      display: flex;
      margin-block-end: -0.25rem;
    }

    glide-core-icon-button {
      display: inline-flex;

      --icon-color: var(--icon-button-color);
      --hovered-icon-color: var(--hovered-icon-button-color);
      --size: 1rem;
    }
  `,
];
