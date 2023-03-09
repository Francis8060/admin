// @ts-check
const { defineConfig } = require('eslint-define-config')

module.exports = defineConfig({
    root: true,
    env: {
        browser: true,
		node: true,
		es6: true,
		'vue/setup-compiler-macros': true
    },
    plugins: ['@typescript-eslint', 'prettier'],
    extends: [
        'plugin:vue/vue3-recommended',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended'
    ],
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 2022,
        sourceType: 'module'
    },
    globals: {
        Res: true,
        Req: true
    },
    rules: {
        'prettier/prettier': 'off',
		'no-unused-vars': 'off',
		eqeqeq: 'warn',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'space-before-function-paren': 'off',
        'object-curly-spacing': 'off',
        'no-mixed-spaces-and-tabs': 'off',
        'no-useless-concat': 'off',
        'no-void': 'off',
        'no-new': 'off',
        'no-new-func': 'off',
        'accessor-pairs': 'off',
        'spaced-comment': 'off',
        camelcase: 'warn',
        'no-useless-escape': 'warn',
        'new-cap': [
            'warn',
            {
                capIsNewExceptions: ['ElMessage', 'Notify', 'Message', 'Toast'],
                properties: false,
            },
        ],
        'no-useless-call': 'warn',
        'no-unused-expressions': [
            'warn',
            { allowShortCircuit: true, allowTernary: true },
        ],
        'no-new-wrappers': 'warn',
        'no-array-constructor': 'warn',
        'no-plusplus': 'off',
        'no-nested-ternary': 'off',
        'vue/html-indent': 'off',
        'vue/html-self-closing': 'off',
        'vue/max-attributes-per-line': 'off',
        'vue/attributes-order': 'off',
        'vue/singleline-html-element-content-newline': 'off',
        'vue/attribute-hyphenation': 'warn',
        'vue/v-on-event-hyphenation': ['warn', 'always', { autofix: true }],
        'vue/multi-word-component-names': 'off',
        '@typescript-eslint/no-empty-function': 'warn'
    }
})