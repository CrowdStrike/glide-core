import { type VariableCodeSyntax, type VariableScope } from '@figma/rest-api-spec';
interface BaseToken {
    $description?: string;
    $extensions?: {
        'com.figma'?: {
            codeSyntax?: VariableCodeSyntax;
            hiddenFromPublishing?: boolean;
            mode?: string;
            scopes?: VariableScope[];
        };
    };
}
interface ColorToken extends BaseToken {
    $type: 'color';
    $value: string;
}
interface DimensionToken extends BaseToken {
    $type: 'dimension';
    $value: {
        value: number;
        unit: 'rem';
    };
}
interface FontFamilyToken extends BaseToken {
    $type: 'fontFamily';
    $value: string;
}
interface FontWeightToken extends BaseToken {
    $type: 'fontWeight';
    $value: number;
}
interface NumberToken extends BaseToken {
    $type: 'number';
    $value: number;
}
interface StringToken extends BaseToken {
    $type: 'string';
    $value: string;
}
export type DesignToken = ColorToken | DimensionToken | FontFamilyToken | FontWeightToken | NumberToken | StringToken;
export interface TokenGroup {
    [key: string]: DesignToken | TokenGroup;
}
/**
 * Defines what we expect a Design Tokens file to look like.
 *
 * This format mostly adheres to the draft W3C spec for Design Tokens¹.
 * As mentioned at the top of this file, we did make a few changes to `$type`.
 *
 * We expect each tokens file to define tokens for a single variable collection and mode.
 * There isn't a way currently to represent modes or themes in the W3C community group
 * Design Token specification. Once the spec resolves how it wants to handle modes, we'll
 * need to update our code to reflect the new standard. For the time being, we add mode
 * information via the `$extensions['com.figma']` property.
 *
 * There's an open discussion² one can follow for more information.
 *
 * 1: https://tr.designtokens.org/format/#file-format
 * 2: https://github.com/design-tokens/community-group/issues/210
 */
export type TokensFile = TokenGroup;
export {};
