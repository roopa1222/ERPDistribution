import js from "@eslint/js";

export default [
  js.configs.recommended,

  {
    rules: {
      "no-unused-vars": "off",
      "linebreak-style": "off",
      "import/no-cycle": "off",
      "max-len": ["error", { "code": 300 }],
      "no-await-in-loop": "off",
      // Enforce semicolons
      "semi": ["error", "always"],
      "indent": ["error", 2]
    }
  }
];
