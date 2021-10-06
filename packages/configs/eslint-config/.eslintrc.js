module.exports = {
  env: {
    es2020: true,
    node: true,
    jest: true,
  },
  root: true,
  extends: [
    "airbnb-base",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "prettier",
    "plugin:prettier/recommended",
    "plugin:jest/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "import-helpers", "prettier"],
  ignorePatterns: [
    "**/config/*.js",
    "**/database/migrations/*.js",
    "**/database/seeders/*.js",
    "**/database/models/*.js",
  ],
  rules: {
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "no-useless-constructor": "off",
    "no-shadow": "off",
    "max-classes-per-file": "off",
    "class-methods-use-this": 0,
    "import/prefer-default-export": 0,
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "import-helpers/order-imports": [
      "error",
      {
        newlinesBetween: "always",
        groups: [
          "module",
          "/^lodash/",
          "/^@britania-crm-com/",
          ["parent", "sibling", "index"],
        ],
        alphabetize: {
          order: "asc",
          ignoreCase: true,
        },
      },
    ],
    quotes: ["error", "single"],
    semi: ["error", "never"],
    "prettier/prettier": 0,
    "template-curly-spacing": [2, "always"],
    "comma-dangle": ["error", "never"],
    "no-underscore-dangle": "off",
    "no-trailing-spaces": "error",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error"],
  },
  settings: {
    "import/resolver": {
      typescript: {},
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
};
