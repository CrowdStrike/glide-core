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

      --icon-color: var(--icon-button-color);
      --hovered-icon-color: var(--hovered-icon-button-color);
      --size: 1rem;
    }
  `,
];
