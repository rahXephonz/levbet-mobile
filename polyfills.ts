/* eslint-disable @typescript-eslint/no-require-imports */
// polyfills.ts
import "react-native-get-random-values";
import "@ethersproject/shims";
import { Buffer } from "buffer";

// Make Buffer globally available
if (typeof global.Buffer === "undefined") {
  global.Buffer = Buffer;
}

// Polyfill for process
if (typeof process === "undefined") {
  (global as any).process = {
    env: {},
    nextTick: (fn: Function, ...args: any[]) => {
      setTimeout(() => fn(...args), 0);
    },
    platform: "darwin",
    version: "v16.0.0",
    versions: { node: "16.0.0" },
  };
} else {
  if (!process.nextTick) {
    process.nextTick = (fn: Function, ...args: any[]) => {
      setTimeout(() => fn(...args), 0);
    };
  }
}

// TextEncoder/TextDecoder polyfill
if (typeof global.TextEncoder === "undefined") {
  const textEncoding = require("text-encoding");
  global.TextEncoder = textEncoding.TextEncoder;
  global.TextDecoder = textEncoding.TextDecoder;
}

// Crypto polyfill for getRandomValues
if (typeof global.crypto === "undefined") {
  const getRandomValues = require("react-native-get-random-values");
  (global as any).crypto = {
    getRandomValues: (arr: any) => getRandomValues(arr),
  };
}

console.log("Polyfills loaded successfully");
console.log("Buffer:", typeof global.Buffer !== "undefined");
console.log("Process:", typeof process !== "undefined");
console.log("TextEncoder:", typeof global.TextEncoder !== "undefined");
console.log("Crypto:", typeof global.crypto !== "undefined");
