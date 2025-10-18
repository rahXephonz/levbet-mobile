// metro.config.js
const { withNativeWind } = require("nativewind/metro");
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Add polyfills for Node.js modules
config.resolver.extraNodeModules = {
  assert: require.resolve("assert"),
  buffer: require.resolve("buffer"),
  crypto: require.resolve("crypto-browserify"),
  events: require.resolve("events"),
  process: require.resolve("process/browser"),
  stream: require.resolve("readable-stream"),
  util: require.resolve("util"),
};

// Custom resolver to intercept crypto and other imports
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === "crypto") {
    return {
      filePath: require.resolve("crypto-browserify"),
      type: "sourceFile",
    };
  }

  // Use default resolution for everything else
  return context.resolveRequest(context, moduleName, platform);
};

// Apply NativeWind configuration
module.exports = withNativeWind(config, { input: "./global.css" });
