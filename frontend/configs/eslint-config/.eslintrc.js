module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    }
  },
  env: {
    browser: true,
    es2020: true,
    node: true,
    jest: true
  },
  extends: [
    'standard',
    'plugin:react/recommended',
    'react-app'
  ],
  plugins: [
    'react',
    'import-helpers',
    'modules-newline'
  ],
  rules: {
    'template-curly-spacing': [2, 'always'],
    'jsx-quotes': ['error', 'prefer-double'],
    'react/display-name': 'off',
    'react/forbid-prop-types': 'off',
    'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
    'react/jsx-curly-spacing': [2, 'always'],
    'react/jsx-filename-extension': 0,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-closing-bracket-location': [1, 'tag-aligned'],
    'react/jsx-no-duplicate-props': [2, { ignoreCase: false }],
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'error',
    'react-hooks/exhaustive-deps': ['warn', { additionalHooks: '(useFormEffect)' }],
    'react/no-unused-prop-types': 'error',
    'import-helpers/order-imports': ['error', {
      newlinesBetween: 'always',
      groups: [
        '/^react/',
        '/^redux/',
        'module',
        '/^lodash/',
        '/^@material-ui/',
        '/^@britania-crm/',
        '/^~/',
        ['parent', 'sibling', 'index']
      ],
      alphabetize: {
        order: 'asc',
        ignoreCase: true
      }
    }],
    'import/no-extraneous-dependencies': 0,
    'import/prefer-default-export': 0,
    indent: ['warn', 2, { SwitchCase: 1 }],
    'arrow-body-style': ['error', 'as-needed'],
    'no-unused-vars': ['error', {
      vars: 'all',
      args: 'after-used',
      ignoreRestSiblings: true
    }],
    'generator-star-spacing': ['error', { before: false, after: true }],
    'space-before-function-paren': ['error', 'always'],
    'object-curly-newline': ['error', {
      ObjectExpression: { multiline: true, minProperties: 3 },
      ObjectPattern: { multiline: true, minProperties: 3 },
      ImportDeclaration: { multiline: true, minProperties: 3 },
      ExportDeclaration: { multiline: true, minProperties: 3 }
    }],
    'object-shorthand': ['error', 'always', { avoidExplicitReturnArrows: true }],
    'modules-newline/import-declaration-newline': 'error',
    'modules-newline/export-declaration-newline': 'error',
    'arrow-parens': ['error', 'always'],
    'import/no-unresolved': 2,
    'prefer-template': 'error'
  },
  settings: { react: { version: 'detect' } },
  globals: { __DEV__: true }
}
