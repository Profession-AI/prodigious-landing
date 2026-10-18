import nextVitals from "eslint-config-next/core-web-vitals"
import nextTypescript from "eslint-config-next/typescript"

const eslintConfig = [
  ...nextVitals,
  ...nextTypescript,
  { ignores: [".next/**", "next-env.d.ts", "node_modules/**", "out/**"] },
  {
    rules: {
      "react/no-unescaped-entities": "off",
      // I kicker "// la missione" sono testo voluto (pattern del sito), non commenti.
      "react/jsx-no-comment-textnodes": "off",
      "react-hooks/set-state-in-effect": "off",
    },
  },
]

export default eslintConfig
