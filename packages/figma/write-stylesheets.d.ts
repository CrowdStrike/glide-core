/**
 * Writes CSS variables to the provided directory.
 */
declare const _default: ({ cssVariables, directory, }: {
    cssVariables: Record<string, string[]>;
    directory: string;
}) => Promise<void>;
export default _default;
