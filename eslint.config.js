import globals from "globals";
import jsPlugin from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      globals: globals.browser,
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,  // Explicitly include TypeScript plugin
    },
    rules: {
      // General JavaScript rules
      ...jsPlugin.configs.recommended.rules,
      // TypeScript-specific rules
      ...tsPlugin.configs.recommended.rules,
      // Custom rules
      "semi": ["error", "always"],
      "indent": ["error", 2],
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },
];
