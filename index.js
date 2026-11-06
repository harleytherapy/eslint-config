import { fixupPluginRules } from '@eslint/compat'
import css from '@eslint/css'
import { defineConfig } from 'eslint/config'
import baselineJs from 'eslint-plugin-baseline-js'
import _import from 'eslint-plugin-import'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import reactPlugin from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'
import globals from 'globals'

// The browsers we support: Baseline 2023 (Chrome/Edge 120, Firefox 121, Safari 17.2). JS APIs, CSS
// selectors, properties and values are checked against it. The build (Proscenium/esbuild, target
// ES2022) lowers newer JS syntax and CSS nesting, so those never reach the browser as written.
//
// The lint can't see instance methods (`el.showPopover()`, `arr.toSorted()`) without type
// information, so test on the floor's real browsers too.
export const BASELINE = 2023

export default defineConfig([
  {
    ignores: ['vendor', 'public']
  },

  {
    settings: {
      react: {
        version: '18.2'
      }
    }
  },

  {
    files: ['**/*.js', '**/*.jsx'],

    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks,
      unicorn: eslintPluginUnicorn,
      'simple-import-sort': simpleImportSort,
      import: fixupPluginRules(_import),
      'jsx-a11y': jsxA11y,
      'baseline-js': baselineJs
    },

    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...globals.browser,
        Hue: true,
        App: true,
        Sentry: true,
        proscenium: 'readonly'
      },

      ecmaVersion: 'latest',
      sourceType: 'module'
    },

    settings: {
      propWrapperFunctions: ['exact']
    },

    rules: {
      ...eslintPluginUnicorn.configs.recommended.rules,
      ...reactPlugin.configs.flat.recommended.rules,
      ...reactPlugin.configs.flat['jsx-runtime'].rules,
      ...reactHooks.configs.flat.recommended.rules,
      ...jsxA11y.flatConfigs.recommended.rules,

      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^react', String.raw`^@?\w`],
            [
              String.raw`^\/`,
              String.raw`^\.\.(?!/?$)`,
              String.raw`^\.\./?$`,
              String.raw`^\./(?=.*/)(?!/?$)`,
              String.raw`^bundle-all:\.(?!/?$)`,
              String.raw`^bundle:\.(?!/?$)`,
              String.raw`^\.(?!/?$)`,
              String.raw`^\./?$`
            ],
            [String.raw`^.+\.css$`]
          ]
        }
      ],

      'simple-import-sort/exports': 'error',
      'import/first': 'error',
      'import/exports-last': 'error',
      'import/no-commonjs': 'error',
      'import/no-amd': 'error',
      'import/no-nodejs-modules': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',

      'unicorn/filename-case': [
        'error',
        {
          case: 'snakeCase'
        }
      ],

      'unicorn/prefer-spread': 'off',
      'unicorn/no-array-method-this-argument': 'off',
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/no-nested-ternary': 'off',
      'unicorn/consistent-destructuring': 'off',
      'unicorn/consistent-function-scoping': 'off',
      'unicorn/expiring-todo-comments': 'off',
      'unicorn/no-null': 'off',
      'unicorn/no-fn-reference-in-iterator': 'off',
      'unicorn/no-reduce': 'off',
      'unicorn/no-array-for-each': 'off',
      'unicorn/prefer-string-slice': 'warn',
      'unicorn/no-anonymous-default-export': 'off',
      // Their fixes reach for APIs newer than BASELINE (getHTML/setHTML, Promise.withResolvers,
      // iterator helpers).
      'unicorn/prefer-dom-node-html-methods': 'off',
      'unicorn/prefer-promise-with-resolvers': 'off',
      'unicorn/prefer-iterator-to-array': 'off',
      'unicorn/prefer-iterator-helpers': 'off',
      // Module state and globalThis hooks are deliberate here.
      'unicorn/no-top-level-assignment-in-function': 'off',
      'unicorn/no-global-object-property-assignment': 'off',
      'unicorn/no-this-outside-of-class': 'off',
      // Style-only renames and rewrites, mostly not autofixable.
      'unicorn/name-replacements': 'off',
      'unicorn/consistent-boolean-name': 'off',
      'unicorn/no-for-each': 'off',
      'jsx-a11y/click-events-have-key-events': 'off',
      'jsx-a11y/mouse-events-have-key-events': 'off',
      'jsx-a11y/no-onchange': 'off',
      'jsx-a11y/label-has-for': 'off',
      'jsx-a11y/label-has-associated-control': 'off',

      'baseline-js/use-baseline': [
        'error',
        {
          available: BASELINE,
          // Both default to off, which leaves only syntax checked.
          includeWebApis: { preset: 'auto' },
          includeJsBuiltins: { preset: 'auto' },
          // web-features lists Safari 27 for it, over a spec-conformance detail. Safari has run it
          // since 15, and ES2022 output keeps it as written.
          ignoreFeatures: ['top-level-await']
        }
      ],

      indent: [
        'error',
        2,
        {
          ArrayExpression: 'first',
          SwitchCase: 1,
          ignoredNodes: ['TemplateLiteral']
        }
      ],

      'object-curly-spacing': ['error', 'always'],
      'no-prototype-builtins': 'warn',
      'no-var': 'error',
      'space-infix-ops': 'error',

      quotes: [
        'error',
        'single',
        {
          avoidEscape: true
        }
      ],

      'no-unused-vars': [
        'error',
        {
          ignoreRestSiblings: true
        }
      ],

      'react/jsx-no-bind': [
        1,
        {
          allowArrowFunctions: true
        }
      ],

      'react/display-name': [
        1,
        {
          ignoreTranspilerName: true
        }
      ],

      'react/function-component-definition': [
        2,
        {
          namedComponents: 'arrow-function'
        }
      ],

      'react/forbid-component-props': [
        2,
        {
          forbid: ['style']
        }
      ],

      'react/forbid-prop-types': 0,
      'react/require-default-props': 0,
      'react/no-unused-prop-types': 0,
      'react/sort-default-props': 0,
      'react/jsx-handler-names': 0,
      'react/destructuring-assignment': 0,
      'react/hook-use-state': 0,
      'react/jsx-sort-default-props': 0,
      'react/jsx-props-no-spreading': 0,
      'react/jsx-sort-props': 0,
      'react/jsx-max-depth': 0,
      'react/jsx-no-literals': 0,
      'react/no-multi-comp': 0,
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',

      'react/sort-prop-types': [
        2,
        {
          callbacksLast: true,
          ignoreCase: true,
          requiredFirst: true,
          sortShapeProp: true,
          noSortAlphabetically: true
        }
      ]
    }
  },
  {
    files: ['**/*.test.jsx', '**/previews/*.jsx'],

    languageOptions: {
      globals: {
        setup: 'readonly'
      }
    },

    rules: {
      'react/jsx-no-bind': 'off',
      'no-undef': 'off'
    }
  },

  {
    files: ['**/*.css'],
    plugins: {
      css
    },
    language: 'css/css',
    languageOptions: {
      tolerant: true,
      customSyntax: {
        atrules: {
          'define-mixin': {
            prelude: '<custom-ident>'
          },
          mixin: {
            prelude: '<custom-ident> from <url>'
          }
        }
      }
    },
    rules: {
      'css/no-empty-blocks': 'error',
      'css/no-duplicate-imports': 'error',
      // Nesting is lowered by the build.
      'css/use-baseline': ['error', { available: BASELINE, allowSelectors: ['nesting'] }]
    }
  },

  eslintPluginPrettierRecommended
])
