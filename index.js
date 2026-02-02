import { defineConfig } from 'eslint/config'
import reactPlugin from 'eslint-plugin-react'
import { fixupConfigRules, fixupPluginRules } from '@eslint/compat'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import _import from 'eslint-plugin-import'
import globals from 'globals'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'
import reactHooks from 'eslint-plugin-react-hooks'
import css from '@eslint/css'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
})

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
      'jsx-a11y': jsxA11y
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
            ['^react', '^@?\\w'],
            [
              '^\\/',
              '^\\.\\.(?!/?$)',
              '^\\.\\./?$',
              '^\\./(?=.*/)(?!/?$)',
              '^bundle-all:\\.(?!/?$)',
              '^bundle:\\.(?!/?$)',
              '^\\.(?!/?$)',
              '^\\./?$'
            ],
            ['^.+\\.css$']
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
      'jsx-a11y/click-events-have-key-events': 'off',
      'jsx-a11y/mouse-events-have-key-events': 'off',
      'jsx-a11y/no-onchange': 'off',
      'jsx-a11y/label-has-for': 'off',
      'jsx-a11y/label-has-associated-control': 'off',

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
      'css/no-duplicate-imports': 'error'
    }
  },

  eslintPluginPrettierRecommended
])
