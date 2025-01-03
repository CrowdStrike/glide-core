import { signal } from '@lit-labs/signals';

export const split = signal<'left' | 'middle' | null>(null);
