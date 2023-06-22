module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/all",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:unicorn/recommended",
    "plugin:jsx-a11y/recommended",
    "prettier",
  ],
  plugins: ["simple-import-sort", "import"],

  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },

  env: {
    browser: true,
    es2020: true,
  },
  root: true,
  settings: {
    propWrapperFunctions: ["exact"],
    react: {
      version: "18.2.0",
    },
  },
  globals: {
    proscenium: "readonly",
  },
  overrides: [
    {
      files: ["*.test.jsx"],
      rules: {
        "react/jsx-no-bind": "off",
        "no-undef": "off",
      },
      globals: {
        setup: "readonly",
      },
    },
  ],
  rules: {
    "simple-import-sort/imports": [
      "error",
      {
        groups: [
          // Packages. `react` related packages come first.
          ["^react", "^@?\\w"],
          // Parent imports. Put `..` last.  Other relative imports. Put same-folder imports and `.` last.
          [
            "^\\/",
            "^\\.\\.(?!/?$)",
            "^\\.\\./?$",
            "^\\./(?=.*/)(?!/?$)",
            "^bundle-all:\\.(?!/?$)",
            "^bundle:\\.(?!/?$)",
            "^\\.(?!/?$)",
            "^\\./?$",
          ],
          // Style imports.
          ["^.+\\.css$"],
        ],
      },
    ],
    "simple-import-sort/exports": "error",
    "import/first": "error",
    "import/exports-last": "error",
    "import/no-commonjs": "error",
    "import/no-amd": "error",
    "import/no-nodejs-modules": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",

    "unicorn/filename-case": ["error", { case: "snakeCase" }],
    "unicorn/prefer-spread": "off",
    "unicorn/no-array-method-this-argument": "off",
    "unicorn/prevent-abbreviations": "off",
    "unicorn/no-nested-ternary": "off",
    "unicorn/consistent-destructuring": "off",
    "unicorn/consistent-function-scoping": "off",
    "unicorn/expiring-todo-comments": "off",
    "unicorn/no-null": "off",
    "unicorn/no-fn-reference-in-iterator": "off",
    "unicorn/no-reduce": "off",
    "unicorn/no-array-for-each": "off",
    "unicorn/prefer-string-slice": "warn",

    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/mouse-events-have-key-events": "off",
    "jsx-a11y/no-onchange": "off",
    "jsx-a11y/label-has-for": "off",
    "jsx-a11y/label-has-associated-control": "off",

    indent: [
      "error",
      2,
      {
        ArrayExpression: "first",
        SwitchCase: 1,
        ignoredNodes: ["TemplateLiteral"],
      },
    ],
    "object-curly-spacing": ["error", "always"],
    "no-prototype-builtins": "warn",
    "no-var": "error",
    "space-infix-ops": "error",
    quotes: ["error", "single", { avoidEscape: true }],
    "no-unused-vars": ["error", { ignoreRestSiblings: true }],

    // TODO
    // 'react/display-name': [1, { ignoreTranspilerName: true }],
    // 'react/no-array-index-key': 1,
    // 'react/forbid-prop-types': 1,
    // 'react/jsx-no-bind': 1,
    // 'react/no-danger': 1,
    // 'react/require-default-props': 1,

    "react/function-component-definition": [
      2,
      { namedComponents: "arrow-function" },
    ],
    "react/forbid-component-props": [2, { forbid: ["style"] }],
    "react/jsx-handler-names": 0,
    "react/destructuring-assignment": 0,
    "react/hook-use-state": 0,
    "react/jsx-sort-default-props": 0,
    "react/jsx-props-no-spreading": 0,
    "react/jsx-sort-props": 0,
    "react/jsx-max-depth": 0,
    "react/jsx-no-literals": 0,
    "react/no-multi-comp": 0,
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
    "react/sort-prop-types": [
      2,
      {
        callbacksLast: true,
        ignoreCase: true,
        requiredFirst: true,
        sortShapeProp: true,
        noSortAlphabetically: true,
      },
    ],
  },
};
