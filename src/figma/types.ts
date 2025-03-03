import {
  type VariableCodeSyntax,
  type VariableScope,
} from '@figma/rest-api-spec';

// A Token is an object in a standardized, machine-readable format.
//
// We follow the Design Tokens Format Module¹ W3C draft. It provides
// a technical specification for a file format to exchange design tokens
// between different tools. While we don't leverage additional tooling
// at the moment, this allows us to potentially leverage one in the future,
// while also putting our tokens in a format that is easily readable by humans
// and parseable by code.
//
// Tokens are distinct from Figma variables, in that a token² is a name/value
// pair (with other properties), while a variable in Figma stores multiple
// values, one for each mode.
//
// The `$type` property of a Token follows the format specified in the types
// documentation³.
//
// We support a subset of the types listed in the document. `duration` and
// `cubic-bezier` are not currently applicable to our variables.
//
// Adding support for these types would lead to additional code for
// processing them. It's better to be explicit in the types we support and
// keep an eye on the W3C document for updates. If a Figma variable is
// created using a currently unsupported type, we can add it then.
//
// Additionally, we diverge slightly from the draft W3C types by allowing
// for a `string` type. This is to better align with the resolved types
// for Figma variables.
//
// `font-style` CSS properties, for example, should use a `string` type until
// the specification provides additional guidance on these properties.
// At the moment, these types are being considered, but no
// guidance currently exists⁴.
//
// 1: https://tr.designtokens.org/format/
// 2: https://tr.designtokens.org/format/#design-token
// 3: https://tr.designtokens.org/format/#types
// 4: https://tr.designtokens.org/format/#additional-types

interface BaseToken {
  $description?: string;
  $extensions?: {
    // Used to store Figma-specific variable properties¹.
    //
    // 1: https://tr.designtokens.org/format/#extensions-0
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
  $value: { value: number; unit: 'rem' };
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

export type Token =
  | ColorToken
  | DimensionToken
  | FontFamilyToken
  | FontWeightToken
  | NumberToken
  | StringToken;

export interface TokenGroup {
  [key: string]: Token | TokenGroup;
}

/**
 * Defines what we expect a Design Tokens file to look like.
 *
 * This format mostly adheres to the draft W3C spec for Design Tokens¹.
 * As mentioned at the top of this file, we did make a few changes to `$type`.
 *
 * We expect each tokens file to define tokens for a single variable collection and mode.
 * There isn't a way currently to represent modes or themes in the W3C community group
 * design token specification. Once the spec resolves how it wants to handle modes, we'll
 * need to update our code to reflect the new standard. For the time being, we add mode
 * information via the `$extensions['com.figma']` property.
 *
 * There's an open discussion² one can follow for more information.
 *
 * 1: https://tr.designtokens.org/format/#file-format
 * 2: https://github.com/design-tokens/community-group/issues/210
 */
export type TokensFile = TokenGroup;
