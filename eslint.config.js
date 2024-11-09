// eslint.config.js
import parser from "@typescript-eslint/parser";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";

export default [
  {
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": typescriptPlugin, // Load plugin rules directly
    },
    rules: {
      // General rules
      "no-unused-vars": "off",
      "linebreak-style": "off",
      "import/no-cycle": "off",
      "max-len": ["error", { code: 300 }],
      "no-await-in-loop": "off",
      "semi": ["error", "always"],
      "indent": ["error", 2],

      // TypeScript-specific rules
      "@typescript-eslint/ban-ts-comment": "error", // Enable the rule directly
    },
  },
];
