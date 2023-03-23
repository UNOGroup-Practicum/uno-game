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
    "^__tests__(.*)$": "<rootDir>/src/__tests__$1",
  },
};
