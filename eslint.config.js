import * as typescript from '@typescript-eslint/eslint-plugin';
import * as typescriptParser from '@typescript-eslint/parser';

export default [
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': [
        'warn'
      ],
      '@typescript-eslint/no-magic-numbers': [
        'error'
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          'argsIgnorePattern': '^_'
        }
      ],
      '@typescript-eslint/no-unused-expressions': [
        'error',
        {
          'allowTernary': true
        }
      ],
      quotes: [
        'error',
        'single'
      ],
      semi: [
        'error',
        'always'
      ],
      'no-extra-semi': 'off',
      'no-magic-numbers': [
        'error',
      ],
      'no-unused-vars': [
        'error',
      ],
      'no-empty': 'warn',
    },
  }
];
