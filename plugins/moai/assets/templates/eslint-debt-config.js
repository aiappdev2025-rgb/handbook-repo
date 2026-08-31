/**
 * ESLint Technical Debt Detection Configuration
 * AI SaaS Handbook v3.0 - Technical Debt Management
 *
 * This configuration extends your existing ESLint setup to detect
 * and flag technical debt patterns. Add these rules to your project's
 * eslint.config.js (flat config) or .eslintrc.js (legacy config).
 *
 * Usage:
 * - For flat config (ESLint 9+): Import and spread into your config array
 * - For legacy config: Merge rules into your existing rules object
 */

// =============================================================================
// DEBT DETECTION RULES - Flat Config Format (ESLint 9+)
// =============================================================================

export const debtDetectionConfig = {
  name: 'technical-debt-detection',
  rules: {
    // -------------------------------------------------------------------------
    // COMPLEXITY RULES (Weight: 25% of debt score)
    // These rules identify overly complex code that's hard to maintain
    // -------------------------------------------------------------------------

    // Function length - Long functions are harder to understand and test
    'max-lines-per-function': ['error', {
      max: 30,
      skipBlankLines: true,
      skipComments: true,
      IIFEs: true,
    }],

    // File length - Large files often indicate poor separation of concerns
    'max-lines': ['warn', {
      max: 200,
      skipBlankLines: true,
      skipComments: true,
    }],

    // Nesting depth - Deep nesting reduces readability
    'max-depth': ['error', {
      max: 3,
    }],

    // Cyclomatic complexity - High complexity = more test cases needed
    'complexity': ['error', {
      max: 10,
    }],

    // Function parameters - Many parameters suggest function does too much
    'max-params': ['warn', {
      max: 4,
    }],

    // Statements per function - Another complexity indicator
    'max-statements': ['warn', {
      max: 15,
    }],

    // -------------------------------------------------------------------------
    // ERROR HANDLING RULES (Weight: 20% of debt score)
    // These rules ensure proper error handling throughout the codebase
    // -------------------------------------------------------------------------

    // Require return in callbacks - Prevents silent failures
    'callback-return': 'warn',

    // Handle callback errors - Node.js error-first callbacks
    'handle-callback-err': 'error',

    // No empty catch blocks - Swallowing errors hides bugs
    'no-empty': ['error', {
      allowEmptyCatch: false,
    }],

    // No unused catch binding - Ensure caught errors are handled
    'no-unused-vars': ['error', {
      caughtErrors: 'all',
      caughtErrorsIgnorePattern: '^_',
    }],

    // -------------------------------------------------------------------------
    // TYPE SAFETY RULES (Weight: 20% of debt score)
    // For TypeScript projects - ensure type safety
    // Note: These require @typescript-eslint/eslint-plugin
    // -------------------------------------------------------------------------

    // Uncomment these if using TypeScript:
    // '@typescript-eslint/no-explicit-any': 'error',
    // '@typescript-eslint/no-unsafe-assignment': 'warn',
    // '@typescript-eslint/no-unsafe-member-access': 'warn',
    // '@typescript-eslint/no-unsafe-call': 'warn',
    // '@typescript-eslint/no-unsafe-return': 'warn',
    // '@typescript-eslint/explicit-function-return-type': 'warn',
    // '@typescript-eslint/strict-boolean-expressions': 'warn',

    // -------------------------------------------------------------------------
    // CODE QUALITY RULES (General debt indicators)
    // -------------------------------------------------------------------------

    // No console statements in production code
    'no-console': ['warn', {
      allow: ['warn', 'error'],
    }],

    // No debugger statements
    'no-debugger': 'error',

    // No TODO/FIXME comments without tracking
    'no-warning-comments': ['warn', {
      terms: ['TODO', 'FIXME', 'HACK', 'XXX', 'BUG'],
      location: 'start',
    }],

    // Require consistent returns
    'consistent-return': 'error',

    // No magic numbers
    'no-magic-numbers': ['warn', {
      ignore: [0, 1, -1, 2, 100],
      ignoreArrayIndexes: true,
      enforceConst: true,
    }],

    // Prefer const over let when possible
    'prefer-const': 'error',

    // No var - use let/const
    'no-var': 'error',

    // Require === instead of ==
    'eqeqeq': ['error', 'always'],

    // No nested ternaries
    'no-nested-ternary': 'error',

    // Limit chained method calls
    'newline-per-chained-call': ['warn', {
      ignoreChainWithDepth: 3,
    }],
  },
};

// =============================================================================
// TYPESCRIPT-SPECIFIC DEBT RULES
// =============================================================================

export const typescriptDebtConfig = {
  name: 'typescript-debt-detection',
  files: ['**/*.ts', '**/*.tsx'],
  rules: {
    // Disallow any type - major type safety concern
    '@typescript-eslint/no-explicit-any': 'error',

    // Require explicit return types on public methods
    '@typescript-eslint/explicit-function-return-type': ['warn', {
      allowExpressions: true,
      allowTypedFunctionExpressions: true,
      allowHigherOrderFunctions: true,
    }],

    // Require explicit member accessibility
    '@typescript-eslint/explicit-member-accessibility': ['warn', {
      accessibility: 'explicit',
      overrides: {
        constructors: 'no-public',
      },
    }],

    // Prefer nullish coalescing
    '@typescript-eslint/prefer-nullish-coalescing': 'warn',

    // Prefer optional chaining
    '@typescript-eslint/prefer-optional-chain': 'warn',

    // No floating promises (unhandled async)
    '@typescript-eslint/no-floating-promises': 'error',

    // Require await in async functions
    '@typescript-eslint/require-await': 'warn',

    // Consistent type imports
    '@typescript-eslint/consistent-type-imports': 'warn',
  },
};

// =============================================================================
// TEST FILE OVERRIDES
// =============================================================================

export const testFileOverrides = {
  name: 'test-file-overrides',
  files: [
    '**/*.test.ts',
    '**/*.test.tsx',
    '**/*.spec.ts',
    '**/*.spec.tsx',
    '**/__tests__/**/*',
  ],
  rules: {
    // Relax some rules for test files
    'max-lines': 'off',
    'max-lines-per-function': ['warn', { max: 50 }],
    'no-magic-numbers': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
  },
};

// =============================================================================
// LEGACY CONFIG FORMAT (.eslintrc.js)
// =============================================================================

/**
 * For projects using legacy .eslintrc.js format, copy this object
 * and merge it into your existing configuration.
 */
export const legacyDebtRules = {
  rules: {
    // Complexity
    'max-lines-per-function': ['error', { max: 30, skipBlankLines: true, skipComments: true }],
    'max-lines': ['warn', { max: 200, skipBlankLines: true, skipComments: true }],
    'max-depth': ['error', { max: 3 }],
    'complexity': ['error', { max: 10 }],
    'max-params': ['warn', { max: 4 }],
    'max-statements': ['warn', { max: 15 }],

    // Error Handling
    'no-empty': ['error', { allowEmptyCatch: false }],
    'no-unused-vars': ['error', { caughtErrors: 'all', caughtErrorsIgnorePattern: '^_' }],

    // Code Quality
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-debugger': 'error',
    'no-warning-comments': ['warn', { terms: ['TODO', 'FIXME', 'HACK', 'XXX', 'BUG'] }],
    'consistent-return': 'error',
    'no-magic-numbers': ['warn', { ignore: [0, 1, -1, 2, 100], ignoreArrayIndexes: true }],
    'prefer-const': 'error',
    'no-var': 'error',
    'eqeqeq': ['error', 'always'],
    'no-nested-ternary': 'error',
  },
  overrides: [
    {
      files: ['**/*.test.*', '**/*.spec.*', '**/__tests__/**/*'],
      rules: {
        'max-lines': 'off',
        'max-lines-per-function': 'off',
        'no-magic-numbers': 'off',
      },
    },
  ],
};

// =============================================================================
// USAGE INSTRUCTIONS
// =============================================================================

/**
 * FLAT CONFIG (eslint.config.js) - ESLint 9+
 *
 * import { debtDetectionConfig, typescriptDebtConfig, testFileOverrides } from './templates/eslint-debt-config.js';
 *
 * export default [
 *   // ... your existing configs
 *   debtDetectionConfig,
 *   typescriptDebtConfig,  // Only if using TypeScript
 *   testFileOverrides,
 * ];
 *
 *
 * LEGACY CONFIG (.eslintrc.js)
 *
 * const { legacyDebtRules } = require('./templates/eslint-debt-config.js');
 *
 * module.exports = {
 *   // ... your existing config
 *   rules: {
 *     ...legacyDebtRules.rules,
 *     // your other rules
 *   },
 *   overrides: [
 *     ...legacyDebtRules.overrides,
 *     // your other overrides
 *   ],
 * };
 */

// =============================================================================
// DEBT SCORE CALCULATION REFERENCE
// =============================================================================

/**
 * When running ESLint with these rules, calculate your debt score as follows:
 *
 * COMPLEXITY DEBT (25%):
 * - 0 violations = 10 points
 * - 1-5 violations = 8 points
 * - 6-10 violations = 6 points
 * - 11-20 violations = 4 points
 * - 20+ violations = 2 points
 *
 * ERROR HANDLING DEBT (20%):
 * - All errors handled properly = 10 points
 * - 1-3 missing handlers = 7 points
 * - 4-10 missing handlers = 4 points
 * - 10+ missing handlers = 2 points
 *
 * TYPE SAFETY DEBT (20%):
 * - 0 'any' types = 10 points
 * - 1-5 'any' types = 7 points
 * - 6-15 'any' types = 4 points
 * - 15+ 'any' types = 2 points
 *
 * Weighted Score = (Complexity * 0.25) + (ErrorHandling * 0.20) + (TypeSafety * 0.20) + ...
 *
 * See Chapter 27 of the AI SaaS Handbook for complete scoring methodology.
 */

export default [debtDetectionConfig, typescriptDebtConfig, testFileOverrides];
