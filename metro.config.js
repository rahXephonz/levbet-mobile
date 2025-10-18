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

// Suppress noisy warnings
const originalConsoleWarn = console.warn;
const originalConsoleError = console.error;

console.warn = function (...args) {
  const message = args[0];

  // Suppress specific harmless warnings
  if (typeof message === "string") {
    // Multiformats warning - harmless, using fallback works fine
    if (message.includes("multiformats") && message.includes("Falling back to file-based resolution")) {
      return;
    }
    // React-native-compat warnings - optional features
    if (message.includes("react-native-compat:")) {
      return;
    }
  }

  originalConsoleWarn.apply(console, args);
};

// Suppress noisy errors (that are actually just warnings)
console.error = function (...args) {
  const message = args[0];

  if (typeof message === "string") {
    // React-native-compat errors - optional features, not actually breaking
    if (message.includes("react-native-compat:")) {
      return;
    }
  }

  originalConsoleError.apply(console, args);
};

// Apply NativeWind configuration
module.exports = withNativeWind(config, { input: "./global.css" });
