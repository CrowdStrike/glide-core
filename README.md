# Glide Design System

This repository contains all packages for the Glide Design System.

## Development

### Contributing

Follow our [Contribution Guidelines](./CONTRIBUTING.md).

### Getting started

First you'll need to install the dependencies for the repository. We use [PNPM](https://pnpm.io). Run the following command from the root of the repository:

```bash
pnpm install
pnpm dlx playwright install
```

> If you have `ignore-scripts=true` in your `~/.npmrc`, you'll also need to run `pnpm prepare`, which will install some Git hooks for linting, formatting, typechecking, and testing.

### Running Storybook

Run the following command from the root of the repository:

```bash
pnpm start
```

After Storybook's build completes, your browser should navigate to the Storybook instance.
If this doesn't happen automatically, a URL will be shown in your terminal for you to browse to.
