import js from '@eslint/js';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist', 'src/locales'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      react.recommended,
      prettier.recommended,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      react: react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier: prettier,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      //Airbnb style
      'react/no-multi-comp': ['error', { ignoreStateless: true }],
      'react/prefer-es6-class': ['error'],
      'react/prefer-stateless-function': [
        'error',
        { ignorePureComponents: true },
      ],
      'react/jsx-pascal-case': ['error', { allowAllCaps: false, ignore: [] }],
      'react/display-name': ['error', { ignoreTranspilerName: false }],
      'react/no-string-refs': ['error'], //Methods and functions
      'react/jsx-no-bind': [
        'error',
        {
          allowArrowFunctions: true,
          allowBind: false,
          ignoreRefs: true,
        },
      ],
      'react/require-render-return': 'error',

      //Parentheses
      'react/jsx-wrap-multilines': [
        'error',
        {
          declaration: 'parens-new-line',
          assignment: 'parens-new-line',
          return: 'parens-new-line',
          arrow: 'parens-new-line',
          condition: 'parens-new-line',
          logical: 'parens-new-line',
          prop: 'parens-new-line',
        },
      ],

      //Self-closing of labels
      'react/self-closing-comp': ['error'],

      //Alignment
      'react/jsx-closing-bracket-location': [
        'error',
        { selfClosing: 'line-aligned', nonEmpty: 'line-aligned' },
      ],
      'react/jsx-closing-tag-location': ['error', { location: 'tag-aligned' }],

      //Use of inverted commas
      'jsx-quotes': ['error', 'prefer-double'],

      //JSX spacing
      'react/jsx-tag-spacing': [
        'error',
        {
          closingSlash: 'never',
          beforeSelfClosing: 'always',
          afterOpening: 'never',
        },
      ],
      'react/jsx-curly-spacing': ['error', { when: 'never', children: true }],

      // Properties
      'react/jsx-props-no-spreading': [
        'warn',
        { html: 'ignore', exceptions: [] },
      ],
      'react/jsx-boolean-value': ['error', 'never'],
      'react/no-array-index-key': ['error'],

      // Class order
      'react/sort-comp': [
        'error',
        {
          order: [
            'static-methods',
            'constructor',
            'instance-variables',
            'instance-methods',
            'lifecycle',
            'render',
          ],
          groups: {
            lifecycle: [
              'displayName',
              'contextTypes',
              'childContextTypes',
              'componentDidMount',
              'componentDidUpdate',
              'componentWillUnmount',
              'componentDidCatch',
              'componentWillMount',
              'componentWillReceiveProps',
              'componentWillUpdate',
              'shouldComponentUpdate',
            ],
          },
        },
      ],
      'sort-imports': [
        'error',
        {
          ignoreCase: false,
          ignoreDeclarationSort: false,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
          allowSeparatedGroups: false,
        },
      ],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  }
);
