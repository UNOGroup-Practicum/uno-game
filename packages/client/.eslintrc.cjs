module.exports = {
  plugins: ["simple-import-sort"],
  rules: {
    "simple-import-sort/imports": [
      "warn",
      {
        groups: [
          ["^@?\\w"],
          ["^react"],
          ["^(services|hooks|utils|theme)(/.*|$)"],
          ["^(pages)(/.*|$)"],
          ["^hoc"],
          ["^components"],
          ["^assets(/.*|$)"],
          ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
          ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
          ["^styles(/.*|$)"],
          ["^.+\\.s?css$"],
        ],
      },
    ],
    "simple-import-sort/exports": "warn",
  },
};
