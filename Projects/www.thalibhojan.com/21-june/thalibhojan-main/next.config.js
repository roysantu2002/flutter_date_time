require("dotenv").config();
const path = require("path");
const Dotenv = require("dotenv-webpack");
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

module.exports = withPWA({
  pwa: {
    dest: "public",
    runtimeCaching,
  },

  experimental: {
    optimizeFonts: true,
    optimizeImages: true,
  },

  generateEtags: false,
  serverRuntimeConfig: {
    // Will be available only on the server side
    secret: "777",
  },

  publicRuntimeConfig: {
    // This will be available on both server and client
    NProgressShowSpinner: false,
    pageTitle: process.env.PROJECT_NAME,
    pageDescription: process.env.PROJECT_DESCRIPTION,
    localStorageUserId: process.env.PROJECT_LOCAL_STORAGE_AUTHENTICATED_USER_ID,
  },

  webpack: (config) => {
    // config.resolve.modules.push(path.resolve("./"));
    config.plugins = config.plugins || [];
    config.plugins = [
      ...config.plugins,

      new Dotenv({
        path: path.join(__dirname, ".env.local"),
        systemvars: true,
      }),
    ];
    return config;
  },
});
