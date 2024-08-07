import { css } from 'lit';
import visuallyHidden from './styles/visually-hidden.js';

export default css`
  glide-core-label::part(tooltips-and-label) {
    align-items: flex-start;
    margin-block-start: var(--glide-core-spacing-sm);
  }

  .textarea-container {
    display: flex;
  }

  textarea {
    appearance: none;
    background-color: var(--glide-core-surface-base-lighter);
    border: 1px solid var(--glide-core-border-base-light);
    border-radius: 0.5rem;
    color: var(--glide-core-text-body-1);
    cursor: inherit;
    display: block;
    flex-grow: 1;
    font-family: var(--glide-core-body-xs-font-family);
    font-size: var(--glide-core-body-sm-font-size);
    font-weight: var(--glide-core-body-xs-font-weight);
    min-block-size: 1.1875rem;
    padding: var(--glide-core-spacing-xs) var(--glide-core-spacing-sm);
    resize: vertical;
    transition: border-color 200ms ease-in-out;

    &:hover {
      border-color: var(--glide-core-border-base);
    }

    &:focus {
      outline: none;
    }

    &:focus-visible,
    &:focus-visible[readonly] {
      border-color: var(--glide-core-border-focus);
    }

    &.error {
      border-color: var(--glide-core-status-error);
    }

    &[readonly] {
      border-color: transparent;
      outline: none;
      transition: none;
    }

    &[disabled] {
      background-color: var(--glide-core-surface-disabled);
      border: 0.0625rem solid var(--glide-core-border-base-light);
      color: var(--glide-core-text-tertiary-disabled);
    }
  }

  .meta {
    column-gap: var(--glide-core-spacing-xs);
    display: flex;
    font-size: var(--glide-core-body-xs-font-size);
    justify-content: space-between;
  }

  .character-count {
    &.error {
      font-weight: var(--glide-core-font-weight-bold);
    }

    .hidden {
      ${visuallyHidden};
    }
  }
`;
