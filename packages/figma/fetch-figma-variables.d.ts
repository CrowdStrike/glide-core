/**
 * Fetches the variables and variable collections from Figma's API¹
 * and returns them.
 *
 * 1: https://www.figma.com/developers/api?fuid=1111467023992153920#variables
 */
declare const _default: ({ token, fileId }: {
    fileId: string;
    token: string;
}) => Promise<{
    variables: {
        [key: string]: import("@figma/rest-api-spec").LocalVariable;
    };
    variableCollections: {
        [key: string]: import("@figma/rest-api-spec").LocalVariableCollection;
    };
}>;
export default _default;
