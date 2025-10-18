module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        "babel-preset-expo",
        {
          jsxImportSource: "nativewind",
          // Enable import.meta polyfill for Hermes
          unstable_transformImportMeta: true,
        },
      ],
      "nativewind/babel",
    ],
  };
};
