import nextVitals from "eslint-config-next/core-web-vitals";

const config = [
  {
    ignores: [".chrome-*", "homepage-*.png"]
  },
  ...nextVitals
];

export default config;
