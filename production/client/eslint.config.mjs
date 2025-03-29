import boundaries from "eslint-plugin-boundaries";
import typescriptParser from "@typescript-eslint/parser";
import typescriptEslintPlugin from "@typescript-eslint/eslint-plugin";

// const compat = new FlatCompat({
//   // import.meta.dirname is available after Node.js v20.11.0
//   baseDirectory: import.meta.dirname,
// })
export default [{
  // ...compat.config({
  //   extends: ['next'],
  //   rules: {
  //     'react/no-unescaped-entities': 'off',
  //     '@next/next/no-page-custom-font': 'off',
  //   },
  // }),
  languageOptions: {
    parser: typescriptParser
  },
  plugins: {
    "@typescript-eslint": typescriptEslintPlugin,
    boundaries
  },
  settings: {
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true
      }
    }
  }
}];