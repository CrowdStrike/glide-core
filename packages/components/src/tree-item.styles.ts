import { css } from 'lit';

export default [
  css`
    :host {
      cursor: pointer;
      display: flex;
      flex-direction: column;
    }

    :host(:focus) {
      outline: none;
    }

    .component {
      display: contents;
      grid-template-columns: repeat(auto-fill, 40px);
    }

    .expand-icon-container {
      min-inline-size: 25px;
    }

    .expand-icon {
      align-items: center;
      cursor: pointer;
      display: flex;
      justify-content: center;
      rotate: 0deg;
      transition: rotate 0.1s ease;

      &.expand-icon-expanded {
        rotate: 90deg;
      }
    }

    .label-and-children {
      display: flex;
      flex-direction: column;
    }

    .label-container {
      align-items: center;
      border-radius: 0.625rem;
      display: flex;
      padding-block: var(--cs-spacing-xxs);
      padding-inline: var(--cs-spacing-xs);

      &:hover {
        background-color: var(--cs-surface-hover);
      }

      &.label-container-selected {
        background-color: var(--cs-surface-selected);
        color: var(--cs-text-selected);

        &:hover {
          background-color: var(--cs-color-dark-blue);
        }
      }
    }

    ::slotted([slot='prefix']) {
      margin-inline-end: var(--cs-spacing-xs);
    }

    .label {
      flex-grow: 1;
    }

    .child-items {
      block-size: 0;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .component-expanded {
      .child-items {
        block-size: auto;
      }
    }
  `,
];
