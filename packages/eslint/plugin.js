"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const consistent_reference_element_declarations_js_1 = require("./rules/consistent-reference-element-declarations.js");
const consistent_test_fixture_variable_declarator_js_1 = require("./rules/consistent-test-fixture-variable-declarator.js");
const no_nested_template_literals_js_1 = require("./rules/no-nested-template-literals.js");
const no_only_tests_js_1 = require("./rules/no-only-tests.js");
const no_glide_core_prefixed_event_name_js_1 = require("./rules/no-glide-core-prefixed-event-name.js");
const no_redundant_property_attribute_js_1 = require("./rules/no-redundant-property-attribute.js");
const no_redundant_property_string_type_js_1 = require("./rules/no-redundant-property-string-type.js");
const no_skip_tests_js_1 = require("./rules/no-skip-tests.js");
const no_space_press_js_1 = require("./rules/no-space-press.js");
const no_to_have_attribute_js_1 = require("./rules/no-to-have-attribute.js");
const prefer_shadow_root_mode_js_1 = require("./rules/prefer-shadow-root-mode.js");
const prefer_to_be_true_or_false_js_1 = require("./rules/prefer-to-be-true-or-false.js");
const prefixed_lit_element_class_declaration_js_1 = require("./rules/prefixed-lit-element-class-declaration.js");
const public_member_return_type_js_1 = require("./rules/public-member-return-type.js");
const public_getter_default_comment_js_1 = require("./rules/public-getter-default-comment.js");
const event_dispatch_from_this_js_1 = require("./rules/event-dispatch-from-this.js");
const string_event_name_js_1 = require("./rules/string-event-name.js");
const slot_type_comment_js_1 = require("./rules/slot-type-comment.js");
const public_property_expression_type_js_1 = require("./rules/public-property-expression-type.js");
exports.default = {
    rules: {
        'consistent-reference-element-declarations': consistent_reference_element_declarations_js_1.consistentReferenceElementDeclarations,
        'consistent-test-fixture-variable-declarator': consistent_test_fixture_variable_declarator_js_1.consistentTestFixtureVariableDeclarator,
        'no-glide-core-prefixed-event-name': no_glide_core_prefixed_event_name_js_1.noPrefixedEventName,
        'no-nested-template-literals': no_nested_template_literals_js_1.noNestedTemplateLiterals,
        'no-only-tests': no_only_tests_js_1.noOnlyTests,
        'no-redundant-property-attribute': no_redundant_property_attribute_js_1.noRedudantPropertyAttribute,
        'no-redundant-property-string-type': no_redundant_property_string_type_js_1.noRedudantPropertyStringType,
        'no-skip-tests': no_skip_tests_js_1.noSkipTests,
        'no-space-press': no_space_press_js_1.noSpacePress,
        'no-to-have-attribute': no_to_have_attribute_js_1.noToHaveAttribute,
        'prefer-shadow-root-mode': prefer_shadow_root_mode_js_1.preferClosedShadowRoot,
        'prefer-to-be-true-or-false': prefer_to_be_true_or_false_js_1.preferToBeTrueOrFalse,
        'prefixed-lit-element-class-declaration': prefixed_lit_element_class_declaration_js_1.prefixedClassDeclaration,
        'public-member-return-type': public_member_return_type_js_1.publicMemberReturnType,
        'public-getter-default-comment': public_getter_default_comment_js_1.publicGetterDefaultComment,
        'event-dispatch-from-this': event_dispatch_from_this_js_1.eventDispatchFromThis,
        'string-event-name': string_event_name_js_1.stringEventName,
        'slot-type-comment': slot_type_comment_js_1.slotTypeComment,
        'public-property-expression-type': public_property_expression_type_js_1.publicPropertyExpressionType,
    },
};
