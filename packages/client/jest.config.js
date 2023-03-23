import dotenv from "dotenv";
dotenv.config();

export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/__tests__/setup.ts"],
  testMatch: ["<rootDir>/src/**/*.test.{ts,tsx}"],
  globals: {
    __SERVER_PORT__: process.env.SERVER_PORT,
    __API_ENDPOINT__: process.env.API_ENDPOINT,
  },
  transform: {
    ".+\\.(css|styl|less|sass|scss)$": "jest-css-modules-transform",
  },
  moduleNameMapper: {
    ".+\\.(svg|png|jpg|jpeg|webp)": "identity-obj-proxy",
    "^__tests__(.*)$": "<rootDir>/src/__tests__$1",
    "^services(.*)$": "<rootDir>/src/services$1",
    "^hooks(.*)$": "<rootDir>/src/hooks$1",
    "^utils(.*)$": "<rootDir>/src/utils$1",
    "^theme(.*)$": "<rootDir>/src/theme$1",
    "^pages(.*)$": "<rootDir>/src/pages$1",
    "^hoc(.*)$": "<rootDir>/src/hoc$1",
    "^components(.*)$": "<rootDir>/src/components$1",
  },
};
