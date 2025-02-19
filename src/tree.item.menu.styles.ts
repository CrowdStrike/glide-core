import { css } from 'lit';

export default [
  css`
    :host {
      display: contents;
    }

    .component {
      display: flex;
    }

    glide-core-icon-button {
      display: flex;

      --private-icon-color: var(--private-icon-button-color);
      --private-hovered-icon-color: var(--private-hovered-icon-button-color);
      --private-size: 1rem;
    }
  `,
];
