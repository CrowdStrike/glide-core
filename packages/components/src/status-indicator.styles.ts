import { css } from 'lit';
export default [
  css`
    :host {
      display: contents;
    }

    .component {
      block-size: var(--size, 1rem);
      inline-size: var(--size, 1rem);
    }

    .failed {
      color: var(--glide-core-status-failed);
    }

    .idle {
      color: var(--glide-core-status-unknown);
    }

    .in-progress {
      color: var(--glide-core-status-in-progress);
    }

    .queued {
      color: var(--glide-core-status-queued);
    }

    .scheduled {
      color: var(--glide-core-status-scheduled);
    }

    .success {
      color: var(--glide-core-status-success);
    }

    .warning-critical {
      color: var(--glide-core-status-warning-critical);
    }

    .warning-high {
      color: var(--glide-core-status-warning-high);
    }

    .warning-informational {
      color: var(--glide-core-status-warning-informational);
    }

    .warning-low {
      color: var(--glide-core-status-warning-low);
    }

    .warning-medium {
      color: var(--glide-core-status-warning-medium);
    }

    .warning-zero {
      color: var(--glide-core-status-success);
    }
  `,
];
