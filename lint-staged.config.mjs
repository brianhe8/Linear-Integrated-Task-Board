export default {
  "app/backend/**/*.ts": (files) =>
    `eslint --config app/backend/eslint.config.js ${files.join(" ")}`,
  "app/frontend/**/*.{ts,tsx,js,jsx}": (files) =>
    `eslint --config app/frontend/eslint.config.js ${files.join(" ")}`,
  "*.{json,yml,yaml,md}": "prettier --check",
  "app/**/*.{json,yml,yaml,md}": "prettier --check",
};
