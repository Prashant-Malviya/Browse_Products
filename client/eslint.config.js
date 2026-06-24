import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      // This experimental React Compiler readiness rule currently flags the
      // standard "fetch on mount" effect pattern used by useCursorPagination
      // and useDatasetStats. Kept disabled until that pattern has a
      // non-awkward blessed alternative.
      'react-hooks/set-state-in-effect': 'off',
    },
  },
])
