import { type PostcssResult } from 'stylelint';
import { type Root } from 'postcss';
declare function rule(actualOptions: unknown): (root: Root, result: PostcssResult) => void;
declare namespace rule {
    var ruleName: string;
    var messages: {
        rejected: (selector: string | number | boolean | RegExp) => string;
    };
    var meta: {
        url: string;
    };
}
export default rule;
