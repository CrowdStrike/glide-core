import { css } from 'lit';

export default [
  css`
    ul {
      --ul-border-radius: 0.75rem;
      --ul-border-width: 1px;
      appearance: none;

      border: var(--ul-border-width) solid var(--cs-border-base);
      border-radius: var(--ul-border-radius);

      display: inline-flex;
      margin: 0;
      padding: 0;

      &.vertical {
        flex-direction: column;
      }
    }
  `,
];
