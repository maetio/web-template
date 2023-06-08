module.exports = {
  extends: [
    "airbnb",
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:storybook/recommended",
  ],
  parser: "@typescript-eslint/parser",
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      parserOptions: {
        project: ["./tsconfig.json"],
      },
    },
  ],
  rules: {
    // using arrow function components: https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/function-component-definition.md#rule-options
    "react/function-component-definition": [
      2,
      {
        namedComponents: "arrow-function",
      },
    ],
    // props spreading allowed for jsx components: https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-props-no-spreading.md#rule-details
    "react/jsx-props-no-spreading": [
      2,
      {
        custom: "ignore",
      },
    ],
    // jsx-filename-extension allowed
    "react/jsx-filename-extension": "off",
    // default exports not preferred
    "import/prefer-default-export": "off",
    // for managing state with redux toolkit: https://redux-starter-kit.js.org/usage/immer-reducers#linting-state-mutations
    "no-param-reassign": [
      "error",
      {
        props: true,
        ignorePropertyModificationsFor: ["state"],
      },
    ],
    // for throwing firebase errors: https://typescript-eslint.io/rules/no-throw-literal/#options
    "@typescript-eslint/no-throw-literal": [
      "error",
      {
        allowThrowingAny: true,
      },
    ],
    // allow inline iffs https://archive.eslint.org/docs/rules/no-unused-expressions
    "@typescript-eslint/no-unused-expressions": [
      "error",
      {
        allowTernary: true,
      },
    ],
    // discuss below w/ Kekoa
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-explicit-any": "off",
    // allow warning and errors
    "@typescript-eslint/ban-types": "off",
    // 'no-console': ['error', { allow: ['warn', 'error'] }],
    "no-console": "off",
    "react/button-has-type": "off",
    "react/function-component-definition": "off",
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: ["**/*.test.ts", "**/*.stories.tsx"],
      },
    ],
    indent: ["error", "tab"],
    "import/extensions": 0,
    // allow global variables to be unused
    "no-unused-vars": "off",
    "no-tabs": "off",
  },
};
